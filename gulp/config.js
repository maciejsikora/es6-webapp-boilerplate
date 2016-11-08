module.exports = {

  //global vars for dev and prod
  global:{
      entryJs:'./src/app.js', //root js file for browserfiy
      entrySass:'./src/sass/**/*.scss', //files to be compileted from sass to app.css

      outputJs: 'app.js', //name of compiled js from src directory
      outputCss:'app.css', //name of compiled css from src directory
      outputVendorCss:'vendor.css',//name of compiled vendorCssFiles
      devServerPort:8000 //development browser-sync server port

  },
  //paths for production
  prod:{

    outputDir:'./prod/dist/', //output for compiled css and js
    indexDir:'./prod/' //main directory for production

  },
  //paths for development
  dev:{
    outputDir:'./dev/dist/', //output for concatenated js and compiled css
    indexDir:'./dev/' //development root directory
  },
  vendorCssFiles:[ //files which will be compressed to vendor.css - third part modules css
    /*
      SOME EXAMPLES - CSS FILES FROM NODE_MODULES
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
    */
  ]
};
