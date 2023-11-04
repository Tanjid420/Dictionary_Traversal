const nodemailer=require('nodemailer');
const dotenv =require('dotenv').config();
const {google} =require('googleapis');




 module.exports.generateToken=() => {
    let token='';

    for(let i=0;i<4;++i){
        const val = Math.round(Math.random()*8);
        token+=val;
    }

    return token;
};


 module.exports.mailSender = async() =>  {
    console.log("x1");
    const oauth2client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI);
oauth2client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});
//fix .env to get data from .env otherwise use localstorage
    try {
        //const accessToken = await oauth2client.getAccessToken();
     //  console.log(process.env.CLIENT_ID,);
        var transport =  nodemailer.createTransport({
            service:'gmail',
            auth: {
              type: 'OAuth2',
              user: process.env.MAIL_USER,
             clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN,
              accessToken: "ya29.a0ARrdaM8_SFO0U-1HSHcCglVaulJT5G3pRy42vmCldNwxuDKAx5v9akWEpgy88oZ4k6ZR9s1FhUafjmICyrrfW-14rVL_O6P7IT8DDttteFlcTnM1YAEUdOlcHIouNvyzx_FN0VBy7HMNRfjLziPZNdSN79yq"
            }
        });
        console.log("x2");
    } catch (error) {
        //console.log("hello puttaer")
        console.log(error.message)
    }
   // console.log("fuccck you")
    // console.log(transport)
    return transport;
};
//generateToken();
//mailSender();

 
 