var express = require("express"); //requiring express module
var app = express(); //creating express instance
var querystring = require('querystring');
const axios = require('axios');
const PORT = process.env.PORT || 5000





var data = querystring.stringify({
    grant_type: "client_credentials",
    client_id: "watson-orchestrate",
    client_secret:"ca81109d-312d-4ed3-9cf0-19398e26ea9d"
  });

app.get('/screeningAI',async (req,res) => {

    

try {
    const jwt_token= await axios.post('https://keycloak-edu-keycloak.apps.openshift-01.knowis.cloud/auth/realms/education/protocol/openid-connect/token',data,{
          headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(data)
        }
    }
    );
    const axiosInstance = axios.create({
        headers: { 
            'Authorization': 'Bearer '+jwt_token.data.access_token
        }
    });
    const response = await axiosInstance.get('https://education-dev.apps.openshift-01.knowis.cloud:443/screenedcandidates/api/screen/screeningAI');
    res.send(response.data)
} catch (error) {
    console.log(error);
}

        });


app.listen(PORT, function() {
 console.log("Node server is running..");
});



