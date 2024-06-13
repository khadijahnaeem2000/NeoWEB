module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: { 
      screens: {
        '7xl':'3441px',
        '6xl': {'max': '3440px'},
        // => @media (max-width: 3440px) { ... }
        '5xl': {'max':'2700px'},
        // => @media (min-width: 1920px) { ... }
        '4xl': {'max':'2150px'},
        '3xl': {'max':'1700px'},
        'desktop': {'max':'1300px'},
        'laptop': {'max':'1050px'},
        // => @media (min-width: 1024px) { ... }

        'xs': {'max': '800px'},
        // => @media (max-width: 640px) { ... }
        '2xs': {'max': '630px'},
        // => @media (max-width: 580px) { ... }
        '3xs': {'max': '530px'},
        // => @media (max-width: 480px) { ... }

        '4xs': {'max': '480px'},
        // => @media (max-width: 480px) { ... }
        
        'sm': {'max':'900px'},
      // => @media (min-width: 640px) { ... }

      //'md': '768px',
      // => @media (min-width: 768px) { ... }

      //'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      //'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      // => @media (min-width: 1536px) { ... }
      },
      width: {
        '15': '13.5%',
        '28': '28%',
        '40': '35%',
        '80': '45%',
      },
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
