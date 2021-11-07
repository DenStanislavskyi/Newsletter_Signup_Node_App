const express = require("express");
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res){

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

    let data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    let jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/9e03a0747f";
    const options = {
        method: 'POST',
        auth: 'deny:34ee07f20bdf5a4945a79aa7f48bcafc-us20'
    };

const request = https.request(url, options, function(response){
        
        if (response.statusCode === 200)
            res.sendFile(__dirname + '/success.html');
        else res.sendFile(__dirname + '/failure.html');

        response.on('data', function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
    console.log(firstName, lastName, email);
});

app.post('/failure', function(req, res){
    res.redirect();
});

app.listen(3000 || process.env.PORT, function(){
    console.log('Server is running on port 3000.');
});

//
//