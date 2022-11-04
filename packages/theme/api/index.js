// api/index.js

const express = require('express')
const axios = require("axios");

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/telebirr',  async function (req, res) {
  console.log("request value is ", req.body);
  const body = req.body;

   

  try{
      await axios.post("http://196.188.120.3:10443/service-openup/toTradeWebPay",body).then((resp) => {
              console.log("response value is ", resp.data)
              res.status(200).json({data: resp.data});
          })

  }catch(err){ 
      console.log("the error is ", err)
      res.send("failed")
  }

})


export default {
  path: '/api',
  handler: app
}