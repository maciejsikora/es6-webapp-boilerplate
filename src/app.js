/*######## MAIN APPLICATION FILE ############
browserify manage dependencies started from this file so init
Your application here and import needed files from app directory

USE ES6 - it uses Babel

*/


import ExampleModule from './app/example-module';

const exModule=new ExampleModule("#main");
exModule.print();
