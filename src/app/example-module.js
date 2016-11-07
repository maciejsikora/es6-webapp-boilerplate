/*
Example ES6 class which is printing text on chosen DOM element
*/
class ExampleModule{

  constructor(selector){

      this.element=document.querySelector(selector);
  }

  print(){

    this.element.innerHTML=`
    <p>###############################################</p>
    <h2>Welcome to es6-webapp-boilerplate</h2>
    <p>###############################################</p>
    <hr>
    <p>Hi, this text was printed using instance of ES6 class</p>
    <p>Thanks <b>browserSync</b> every change in code will refresh it in browser! Try it</p>
    <hr>`;

  }

}

export default ExampleModule;
