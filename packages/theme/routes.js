const path = require('path');

export function getRoutes(themeDir = __dirname) {
  return [{
    name: 'home',
    path: '/',
    component: path.resolve(themeDir, 'pages/Home.vue')
  },
  {
    name: 'testTailWind',
    path: '/testTailWind',
    component: path.resolve(themeDir, 'pages/tailwindtest.vue')
  },
  {
    name: 'product',
    path: '/p/:id/:slug/',
    component: path.resolve(themeDir, 'pages/Product.vue')
  },
  {
    name: 'category',
    path: '/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
    component: path.resolve(themeDir, 'pages/Category.vue')
  },
  {
    name: 'static',
    path: '/page/:pageName?',
    component: path.resolve(themeDir, 'pages/Static.vue')
  },
  {
    name: 'my-account',
    path: '/my-account/:pageName?',
    component: path.resolve(themeDir, 'pages/MyAccount.vue')
  },
  {
    name: 'helpAndFAq',
    path: '/pages/helpAndFAQ',
    component: path.resolve(themeDir, 'pages/HelpAndFAQ.vue')
  },
  {
    name: 'contact',
    path: '/pages/contact',
    component: path.resolve(themeDir, 'pages/ContactUs.vue')
  },
  {
    name: 'checkout',
    path: '/checkout',
    component: path.resolve(themeDir, 'pages/Checkout.vue'),
    children: [
      {
        path: 'customer',
        name: 'customer',
        component: path.resolve(themeDir, 'pages/Checkout/Customer.vue')
      },
      {
        path: 'shipping',
        name: 'shipping',
        component: path.resolve(themeDir, 'pages/Checkout/Shipping.vue')
      },
      {
        path: 'billing',
        name: 'billing',
        component: path.resolve(themeDir, 'pages/Checkout/Billing.vue')
      },
      {
        path: 'payment',
        name: 'payment',
        component: path.resolve(themeDir, 'pages/Checkout/Payment.vue')
      },
      {
        path: 'thank-you',
        name: 'thank-you',
        component: path.resolve(themeDir, 'pages/Checkout/ThankYou.vue')
      }
    ]
  }
  ];
}
