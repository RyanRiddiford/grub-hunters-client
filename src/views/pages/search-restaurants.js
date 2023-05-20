/**
 * Search restaurants view
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

//Imports
import App from '../../App';
import {html, render } from 'lit-html';
import AuthAPI from '../../services/AuthAPI';
import UserAPI from '../../services/UserAPI';
import enumUtils from '../../utils/enum.utils';
import paginationUtils from '../../utils/pagination.utils';



//Search restaurants view
class SearchRestaurantsView {



  /**
   * Initialise the view
   */
  init(){
    document.title = 'Search Restaurants';    
    this.render();   
    paginationUtils.disableButton('.prev-page-btn, .next-page-btn');
  }





      /**
       * Render the view
       */
  render() {

    const template = html`

    <app-header title="${document.title}" user="${JSON.stringify(AuthAPI.currentUser)}"></app-header>

    <div class="page-content">


           
    
    </div>

    <app-footer title=${document.title}></app-footer>
    
    `;


render(template, App.rootEl);


  }



}

//Export the view
export default new SearchRestaurantsView();