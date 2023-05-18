/**
 * Auth View. Contains both Login and Register forms
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

//Import  dependencies
import App from '../../App';
import {html, render } from 'lit-html';
import AuthAPI from '../../services/AuthAPI';



/**
 * Sign-in/Sign-up page which contains both the login and register forms
 */
class AuthView {

  /**
   * Initialise the page
   */
  init(){
    document.title = 'Auth';
    this.render();
  }


  /**
   * Render the page's html
   */
  render() {    

    const template = html`    
    <app-header title=${document.title} user="${JSON.stringify(AuthAPI.currentUser)}"></app-header>

    <sl-tab-group  class="page-content">
    <sl-tab slot="nav" panel="login"><h3>Login</h3></sl-tab>
    <sl-tab slot="nav" panel="register"><h3>Register</h3></sl-tab>
  <sl-tab-panel name="login">          
  <login-form></login-form>
  </sl-tab-panel>
  <sl-tab-panel name="register">
<register-form></register-form>
  </sl-tab-panel>
    </sl-tab-group> 

    <app-footer title=${document.title}></app-footer>
    `;


    render(template, App.rootEl);    
  
  }

}

 export default new AuthView();     
