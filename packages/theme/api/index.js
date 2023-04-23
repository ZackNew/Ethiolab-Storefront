// api/index.js

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/telebirr', async function (req, res) {
  const body = req.body;

  try {
    await axios
      .post('http://196.188.120.3:11443/service-openup/toTradeWebPay', body)
      .then((resp) => {
        res.status(200).json({ data: resp.data });
      });
  } catch (err) {
    res.send('failed');
  }
});

app.post('/shop', async function (req, res) {
  let csrfToken = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    csrfToken += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  let etech_auth_token = '';
  let cookies = req.headers.cookie.split('; ');

  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].startsWith('etech-auth-token=')) {
      etech_auth_token = cookies[i].split('=')[1];
      break;
    }
  }
  const body = req.body;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      authorization: `Bearer ${etech_auth_token}`,
      'X-CSRF-TOKEN': csrfToken,
    },
  };

  try {
    await axios
      .post('https://admin.ethiolab.et/shop-api', body, options)
      .then((resp) => {
        res.status(200).json({ data: resp.data });
      })
      .catch((err) => {
        res.send({ msg: err });
      });
  } catch (err) {
    res.send('failed');
  }
});

export default {
  path: '/api',
  handler: app,
};
