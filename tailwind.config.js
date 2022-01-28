const path = require('path');

const fromRoot = (p) => path.join(__dirname, p);

module.exports = {
  darkMode: false,
  theme: {
    extend: {
      colors: {
        current: 'currentColor'
      }
    }
  },
  content: [fromRoot('./+(src|content)/**/*.+(js|ts|tsx|mdx|md)')],
  plugins: [require('daisyui')]
};
