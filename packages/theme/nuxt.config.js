import webpack from 'webpack';
import { getRoutes } from './routes';
import theme from './themeConfig';

export default {
  server: {
    port: process.env.PORT || 3001,
    host: '0.0.0.0',
    // protocol:'https'
  },
  env: {
    GRAPHQL_API: process.env.GRAPHQL_API || 'http://localhost:3000/shop-api',
    SECRET_KEY: process.env.SECRET_KEY,
    ACCESS_KEY: process.env.ACCESS_KEY,
    PROFILE_ID: process.env.PROFILE_ID,
    TELEBIRR_APPKEY: process.env.TELEBIRR_APPKEY,
    TELEBIRR_APPID: process.env.TELEBIRR_APPID,
  },
  head: {
    title: 'Ethio Labs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        'http-equiv': 'Content-Security-Policy',
        content: 'upgrade-insecure-requests',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
        crossorigin: 'anonymous',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com/',
        crossorigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Alumni+Sans+Collegiate+One&family=Dancing+Script&family=Josefin+Sans&family=Roboto&family=Roboto+Slab&display=swap',
      },
    ],
  },
  loading: { color: '#fff' },
  plugins: [{ src: '~/plugins/vuex-persist', ssr: false }],
  css: ['@/assets/styles.scss'],
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    '@nuxtjs/google-fonts',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    [
      '@vue-storefront/nuxt',
      {
        // @core-development-only-start
        coreDevelopment: true,
        // @core-development-only-end
        useRawSource: {
          dev: ['@vue-storefront/vendure', '@vue-storefront/core'],
          prod: ['@vue-storefront/vendure', '@vue-storefront/core'],
        },
      },
    ],
    // @core-development-only-start
    [
      '@vue-storefront/nuxt-theme',
      {
        generate: {
          replace: {
            apiClient: '@vue-storefront/vendure-api',
            composables: '@vue-storefront/vendure',
          },
        },
        routes: false,
      },
    ],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    [
      '@vue-storefront/vendure/nuxt',
      {
        i18n: { useNuxtI18nConfig: true },
      },
    ],
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxt/postcss8',
    '@nuxtjs/svg',
  ],
  // auth: {
  //   redirect: false,
  //   strategies: {
  //     google: {
  //       //   scope: ['profile', 'email'],
  //       //accessType: 'offline',
  //       clientId:
  //         '1026633699260-dsqo7t7ucf6km4ktb1340fs2l7ao97rb.apps.googleusercontent.com',
  //       codeChallengeMethod: '',
  //       responseType: 'code',
  //       redirectUri: 'http://localhost:3001/login',
  //     },
  //     facebook: {
  //       // endpoints: {
  //       //   userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}'
  //       // },
  //       responseType: 'code',
  //       clientId: '980997845873215',
  //       scope: ['public_profile', 'email'],
  //       redirectUri: 'http://localhost:3001/login_facebook',
  //     },
  //   },
  // },
  modules: [
    [
      'nuxt-i18n',
      {
        baseUrl: process.env.BASE_URL,
      },
    ],
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@vue-storefront/middleware/nuxt',
    'nuxt-user-agent',
    '@nuxtjs/axios',
    'nuxt-helmet',
  ],
  axios: {
    // Axios options here
    baseURL: process.env.GRAPHQL_API,
    https: false,
  },
  i18n: {
    currency: 'ETB',
    country: 'UETS',
    countries: [
      {
        name: 'ET',
        label: 'Ethiopia',
        states: ['Tigray', 'Benshangul', 'Amhara', 'Oromia'],
      },
    ],
    currencies: [
      { name: 'ETB', label: 'Birr' },
      { name: 'USD', label: 'Dollar' },
    ],
    locales: [
      { code: 'en', label: 'English', file: 'en.js', iso: 'en' },
      { code: 'am', label: 'Amharic', file: 'am.js', iso: 'am' },
    ],
    defaultLocale: 'en',
    lazy: true,
    seo: true,
    langDir: 'lang/',
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'en',
      numberFormats: {
        en: {
          currency: {
            style: 'currency',
            currency: 'ETB',
            currencyDisplay: 'symbol',
          },
        },
        am: {
          currency: {
            style: 'currency',
            currency: 'ETB',
            currencyDisplay: 'symbol',
          },
        },
      },
    },
  },
  styleResources: {
    scss: [
      require.resolve('@storefront-ui/shared/styles/_helpers.scss', {
        paths: [process.cwd()],
      }),
    ],
  },
  router: {
    extendRoutes(routes) {
      getRoutes(`${__dirname}/_theme`).forEach((route) =>
        routes.unshift(route)
      );
    },
    middleware: ['checkout'],
  },
  publicRuntimeConfig: {
    theme,
  },
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },
    transpile: ['vee-validate/dist/rules'],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || '',
        }),
      }),
    ],
  },
  pwa: {
    meta: {
      // eslint-disable-next-line camelcase
      theme_color: '#5ECE7B',
    },
  },
  googleFonts: {
    families: {
      Raleway: {
        wght: [300, 400, 500, 600, 700],
        ital: [400],
      },
      Roboto: {
        wght: [300, 400, 500, 700],
        ital: [300, 400],
      },
    },
    display: 'swap',
  },
  // serverMiddleware: [
  //   { path: '/api/hook', handler: '~/api/hook.js' },
  //   { path: '/api/axios', handler: '~/api/axios.js' }

  // ]
  serverMiddleware: ['~/api/index.js'],
  svg: {
    vueSvgLoader: {
      // vue-svg-loader options
    },
    svgSpriteLoader: {
      // svg-sprite-loader options
    },
    fileLoader: {
      // file-loader options
    },
  },
  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", 'https://www.youtube-nocookie.com/'],
        connectSrc: [
          "'self'",
          "'unsafe-inline'",
          'data:',
          'https://admin.ethiolab.et/shop-api',
          'https://www.youtube-nocookie.com/',
        ],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        fontSrc: ["'self'", 'https:'],
        upgradeInsecureRequests: [],
        baseUri: ['https://fonts.googleapis.com'],
      },
    },
  },
};
