module.exports = {
  dark:'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './helpers/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    colors: {
     primary:'#BF8900',
      secondary:'#005FB7',
      bg_light:'#f6f7fc',
      bg_dark:'#0e1621',//1C1C1C,3B3B3B,333333
      dark_primary:'#E0C27E',
      dark_secondary:'#568cea',
        white:'#FFFFFF',
        dark_accent:'#182533',
        light_accent:'#edeef8',
        faded_white:'#FFFFFF93',
        faded_black:'#2f2f2f',
        light_gray: '#EAE8E8',
        dark_gray: '#BABABA'
    },
    extend: {
      minHeight: {
          'custom': '234px',
          }
     },
  },
  plugins: [],
  important: true,
  fontFamily: {
  }
};
