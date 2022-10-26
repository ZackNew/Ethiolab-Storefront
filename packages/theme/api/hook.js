// api/hook.js

// import client from '@sendgrid/mail';
// import axios from 'axios';
// import { PaymentMethodHandler, VendureConfig, CreatePaymentResult, SettlePaymentResult, SettlePaymentErrorResult } from '@vendure/core';
// import { sdk } from 'payment-provider-sdk';

export default  function(req, res, next) {
  console.log("req value is ", req)
//   client.setApiKey(process.env.SENDGRID_API_KEY)

  if (req.method === 'POST') {
    let body = []
    req.on('data', (chunk) => {
       body.push(chunk)
       console.log("body is ", body)
      // body = chunk.toString();
      // const event =  JSON.parse('{"' + body.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
      // console.log("webhook end body value", event)
      // console.log("webhook end body value", event.decision)


      // console.log("webhook data body value", JSON.parse(body))
    })
    req.on('end', async() => {

        // settlePayment: async (ctx, order, payment, args)=> {
    // try {
    //   const result = await sdk.charges.capture({
    //     apiKey: args.apiKey,
    //     id: payment.transactionId,
    //   });
    //   console.log("sucessssssssssssssssssssssssssssss")
    //   return { success: true };
    // } catch (err) {
    //   console.log("failllllllllllllllllllllllllllll")
    //   return {
    //     success: false,
    //     errorMessage: err.message,
    //   }
    // }
  // }
    //   if(event.decision == "ACCEPT"){
    // const body = {
    //       query: `mutation{
    //               transitionOrderToState(state: "PaymentAuthorized"){
    //                 ... on Order{
    //                   billingAddress{
    //                     fullName
    //                   }
    //                 }
    //                 ... on OrderStateTransitionError{
    //                   errorCode
    //                   message
    //                 }
    //               }
    //             }`
    //     };
    //     const options = {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*',
    //       },
    //     };
    //     let baseUrl = process.env.GRAPHQL_API;
    //     const acat = await axios
    //       .post(baseUrl, body, options)
    //       .then(async (res) => {
    //         console.log("the response value mutation updating state is ", res.data);
    //       }).catch(err => {
    //         console.log("error occured while updating the state and err is ", err);
    //       })
    //   }

    

    //  const event =  JSON.parse('{"' + body.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })

      //  const event = JSON.parse(body)
      // console.log("webhook end body value", event)


    //   const msg = {
    //     to: event.payload.customer.email,
    //     from: event.payload.merchant.support_email,
    //     subject: 'Thank you for your purchase!',
    //     text: `Hi ${event.payload.customer.firstname},
    //           thank you for your purchase. Here is your order reference: 
    //           ${event.payload.customer_reference}`
    //   }

    //   client.send(msg)
    })
  }

  res.statusCode = 200
  res.end()
}