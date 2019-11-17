const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

//FAILED ATTEMPTS
// Create application/x-www-form-urlencoded parser
/*
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express()

// POST method route
app.post('/', urlencodedParser, function (req, res) {
  // Prepare output in JSON format
  response = {
     first_name:req.body.firstname,
     last_name:req.body.lastname
  };
  console.log(response);
  res.end(JSON.stringify(response));
})
/*
router.route('/getRate')

    // (accessed at POST http://localhost:3000/api/signup)
    .post(function(req, res) {
        var username = req.body.firstname;
        var password = req.body.lastname;
        res.json(
            { 
               message: 'signup success',
                username : username,
                 password : password,
            }
        );
    })
    .get(function(req,res){
        res.json({message: 'get request from getRate'});
});
*/

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api', router);



express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/getRate'))
  .get("/getRate", calculateRate)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  function calculateRate(request, response) {
    var realWeight = Number(request.query.weight);
    var weight = Math.abs(Math.floor(Number(request.query.weight)));
    var mail = request.query.mail;
    var pieces = Math.abs(Math.floor(Number(request.query.quantity)));
    var price;
    var cost = 0;
    switch (mail) {
      case "Letters Stamped":
        if (weight < 3){
          cost = (weight * 0.15) + 0.55;
        }
        else{
          cost = 1.00;
        }
        price = pieces * cost;
        break;

      case "Letters Metered":
        if (weight < 3){
          cost = (weight * 0.15) + 0.50;
        }
        else{
          cost = .95;
        }
        price = pieces * cost;
        break;

      case "Large Envelopes Flats":
        if (weight < 12){
          cost = (weight * 0.15) + 1.00;
        }
        else{
          cost = 2.80;
        }
        price = pieces * cost;
        break;

      case "First Class Package Service":
        if(weight <= 4){
          cost = 3.66;
        }
        else if(weight > 4 && weight <= 8){
          cost = 4.39;
        }
        else if(weight > 9 && weight <= 12){
          cost = 5.19;
        }
        else{
          cost = 5.71;
        }
        break;
    }

    console.log(price);
    var params = {
      weight: realWeight.toFixed(2),
      mail: mail,
      price: price.toFixed(2),
      quantity: pieces
    };
    response.render("pages/result", params);
};