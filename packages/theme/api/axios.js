// api/hook.js

// import client from '@sendgrid/mail';
import axios from 'axios';
// import { PaymentMethodHandler, VendureConfig, CreatePaymentResult, SettlePaymentResult, SettlePaymentErrorResult } from '@vendure/core';
// import { sdk } from 'payment-provider-sdk';

export default  function(req, res, next) {
  console.log("req value is ", req)
//   client.setApiKey(process.env.SENDGRID_API_KEY)

  if (req.method === 'POST') {
    let body = []
    req.on('data', async (chunk) => {
       body.push(chunk)
       console.log("body is ", body)
       const newbody = JSON.parse(body)
       console.log("converted value", newbody)

       try{
        await axios.post("http://196.188.120.3:10443/service-openup/toTradeWebPay",newbody).then((resp) => {
                console.log("response value is ", resp.data)
                // res.statusCode=200
                 res.json= {data: resp.data};
            })

    }catch(err){ 
        console.log("the error is ", err)
        res.send("failed")
    }
    //   body = chunk.toString();
    //   const event =  JSON.parse('{"' + body.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    //   console.log("webhook end body value", event)
    //   console.log("webhook end body value", event.decision)


      // console.log("webhook data body value", JSON.parse(body))
    })
    req.on('end', async() => {
              //  res.statusCode=500
              //   res.json= {data: "some response"};

    })
  }

  res.statusCode = 200
  res.JSON= {data : "success"}
  res.end()
}