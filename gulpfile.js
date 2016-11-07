var envs = require('gulp-environments');

if (envs.production()){

  //prod
  require("./gulp/prod.js");

}else{
  //dev
  require("./gulp/dev.js");

}
