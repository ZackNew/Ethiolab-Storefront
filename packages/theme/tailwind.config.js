module.exports = {
  dark: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './helpers/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    colors: {
      primary: '#b6932f',
      secondary: '#3860a7',
      bg_light: '#f6f7fc',
      bg_dark: '#0e1621', //1C1C1C,3B3B3B,333333
      dark_primary: '#BB9B19',
      dark_secondary: '#568cea',
      white: '#FFFFFF',
      dark_accent: '#182533',
      light_accent: '#f0f7fc',
      faded_white: '#FFFFFF93',
      faded_black: '#2f2f2f',
      light_gray: '#EAE8E8',
      dark_gray: '#BABABA',
    },
    extend: {
      minHeight: {
        custom: '234px',
      },
    },
  },
  plugins: [],
  important: true,
  fontFamily: {},
};
