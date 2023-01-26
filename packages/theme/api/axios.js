// api/hook.js

// import client from '@sendgrid/mail';
import axios from 'axios';
// import { PaymentMethodHandler, VendureConfig, CreatePaymentResult, SettlePaymentResult, SettlePaymentErrorResult } from '@vendure/core';
// import { sdk } from 'payment-provider-sdk';

export default function (req, res, next) {
  //   client.setApiKey(process.env.SENDGRID_API_KEY)

  if (req.method === 'POST') {
    let body = [];
    req.on('data', async (chunk) => {
      body.push(chunk);
      const newbody = JSON.parse(body);

      try {
        await axios
          .post(
            'http://196.188.120.3:10443/service-openup/toTradeWebPay',
            newbody
          )
          .then((resp) => {
            // res.statusCode=200
            res.json = { data: resp.data };
          });
      } catch (err) {
        res.send('failed');
      }
      //   body = chunk.toString();
      //   const event =  JSON.parse('{"' + body.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    });
    req.on('end', async () => {
      //  res.statusCode=500
      //   res.json= {data: "some response"};
    });
  }

  res.statusCode = 200;
  res.JSON = { data: 'success' };
  res.end();
}
