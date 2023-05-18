/**
 * Error page view
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

//Import dependencies
import App from './../../App';
import {html, render } from 'lit-html';
import AuthAPI from '../../services/AuthAPI';

/**
 * Error page view
 */
class ErrorView {
  
  /**
   * Initialise
   */
  init(){  
    document.title = 'Error';    
    this.render();
  }

  /**
   * Render the error view
   */
  render(){
    const template = html`   
    <app-header title=${document.title} user=${JSON.stringify(AuthAPI.currentUser)}></app-header> 
      <div class="page-content">
        <h1>Opps!</h1>
        <p>Sorry, we couldn't find that.</p>
      </div>
      <app-footer title=${document.title}></app-footer>
    `
    render(template, App.rootEl);
  }
}


//Export the view
export default new ErrorView();