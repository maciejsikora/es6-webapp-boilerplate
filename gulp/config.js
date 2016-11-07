module.exports = {

  //global vars for dev and prod
  global:{
      entryJs:'./src/app.js',
      entrySass:'./src/sass/**/*.scss',

      outputJs: 'app.js', //name of compiled js from src directory
      outputCss:'app.css', //name of compiled css from src directory
      outputVendorCss:'vendor.css'//name of compiled vendorCssFiles
  },
  //paths for production
  prod:{

    outputDir:'./prod/dist/',
    indexDir:'./prod/'

  },
  //paths for development
  dev:{
    outputDir:'./dev/dist/',
    indexDir:'./dev/'
  },
  vendorCssFiles:[ //files which will be compressed to vendor.css
    /*
      SOME EXAMPLES - CSS FILES FROM NODE_MODULES
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
    */
  ]
};
