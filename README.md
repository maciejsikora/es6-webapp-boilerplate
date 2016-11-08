# es6-webapp-boilerplate
Boilerplate for development of modern single page application with usage of babel, browserify and many good js staff. Boilerplate uses:
- es6
- babel
- browserify
- browser-sync
- sass

Some features:
- separation between development and production version of application
- development with watching and automatic browser refresh
- two simple commands, one for development, one for production
- ready to use with any modern framework like Angular or React
- simple gulp configuration with two separated files


# Installation

1. clone project from github
2. install dependencies

```
npm install
```

# Directory structure

```
src - directory with application development files - here write code
---app.js - root application file for browserify - init application here and add imports
---app - here js es6 files
---sass - here .scss files
dev
---dist - here js and css files are compiled from src //is ignored for git
---index.html - main file of project ( dev server starts from this file )
---assets - files like images, svgs or other resources
---other - example directory, create any directory You need
prod - directory with compiled production version //is ignored for git
gulp - directory with gulp configuration
--- dev.js - configuration for development
--- prod.js - configuration for production
--- config.js - main config file with paths

```

# Configuration

Boilerplate **config.js** is in gulp directory. This will be file which should be for sure modified for any project.

```javascript

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
  vendorCssFiles:[ //files which will be compressed to vendor.css - third party modules css
    /*
      SOME EXAMPLES - CSS FILES FROM NODE_MODULES
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
    */
  ]

```

In **vendorCssFiles** option add all css files which are from some third party modules, so for example if project 
uses material-ui add it css from node_modules here.

# Development

To start development of project run development web server, it watches changes in .scss and .js files so every change
is visible instantly in browser. To run development server with watching:

``` npm run development ```

Next write Your code in **src** directory. Remember that main file is **app.js**.

# Production

To build production version run:
```
npm run production
```

Script will compile and uglify js and css files, next will copy all files from dev directory to prod directory. After running ready
to use production version is in **prod** directory.

# Installation on production server

On production server project no need to have all dependencies, so install it by 
```
npm install --production
```

Compile by:
```
npm run production
```

Rememeber that development tasks will not work.



