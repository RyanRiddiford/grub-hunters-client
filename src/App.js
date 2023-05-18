/**
 * Initialises the app
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import Router from './Router';
import AuthAPI from './services/AuthAPI';
import Toast from './Toast';

//Initialises the client app
class App {
  constructor(){
    this.name = "Grub Hunters";
    this.version = "1.0.0";//'http://localhost:3000'
    this.apiBase = 'https://grub-hunters-api.herokuapp.com/';
    this.rootEl = document.getElementById("root");
  }
  
  init() { 
    //Initialise the toaster notification object
    Toast.init();   
    //Check for valid access token    
    AuthAPI.check(() => {
    //Initialise the router object
      Router.init();
    })    
  }
}

export default new App();