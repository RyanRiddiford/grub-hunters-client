/**
 * Search restaurants view
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute, routes} from '../../Router'
import AuthAPI from '../../services/AuthAPI'
import moment from 'moment'
import UserAPI from '../../services/UserAPI';
import enumUtils from '../../utils/enum.utils';
import paginationUtils from '../../utils/pagination.utils';



//Search restaurants view
class SearchRestaurantsView {


  init(){
    document.title = 'Search Restaurants';    
    this.render();   
    paginationUtils.disableButton('.prev-page-btn, .next-page-btn');
  }


   /**
   * Send form data for searching data
   * @param {*} e The event object
   */
      async searchSubmitHandler(e){

        if (!this.currPage)
        this.currPage = 0; 

        e.preventDefault();

        const formData = e.detail.formData;

          this.keywords = formData.get("keywords");
          console.log("keywords = " + this.keywords);

        let submitBtn = document.getElementById('search-submit-btn');
        submitBtn.setAttribute('loading', '');

        this.loadData();

          submitBtn.removeAttribute('loading');
        
      }



      /**
 * Load a page of data
 * @param {*} isNextPage 
 */
async loadData(isNextPage) {
  //If loading a subsequent page
  if (isNextPage == true || isNextPage == false) {
      //Increment for next page
      if (isNextPage == true) {   
        paginationUtils.incrementPage();
          }
          //Decrement for previous page
          else if (isNextPage == false) {  
             paginationUtils.decrementPage();
          }
  }
    //Find number of pages
    const numPages = await UserAPI.getNumPages(this.keywords, enumUtils.accessLevels.restaurant);
  //Disable/enable pagination buttons
  paginationUtils.updatePaginationButtons(numPages);
      //Get page of data
      const data = await UserAPI.getPage(this.currPage, enumUtils.accessLevels.restaurant, this.keywords);
      //Render data listing array to container element
this.renderListings(data);
}


/**
 * Render the data listings to container element
 * @param {*} data array of data to render listings with
 */
async renderListings(data) {
        //Build template array of restaurant listings
          const listingTemplates = [];
          for (const item of data) {
        listingTemplates.push(html`<restaurant-listing restaurant=${JSON.stringify(item)}></restaurant-listing>`);
          }

        //Render review listing template array to restaurants container
  render(listingTemplates, document.getElementById("restaurants-container"));
}


      /**
       * Render the view
       */
  render() {

    const template = html`

    <app-header title="${document.title}" user="${JSON.stringify(AuthAPI.currentUser)}"></app-header>

    <div class="page-content">

    <div class="search-container">
      <h1>Search Restaurants</h1>



     <sl-form class="form-search" @sl-submit=${this.searchSubmitHandler.bind(this)}>       
        
               <sl-input name="keywords" type="text" placeholder="Restaurant Name"></sl-input>
            <sl-button class="submit-btn" id="search-submit-btn" type="primary" submit>Search Restaurants</sl-button>
           </sl-form>      
    </div>


        <div class="pagination">
        <sl-button class="prev-page-btn" @click=${()=> this.loadData(false)} class="prev">Previous</sl-button>
        <sl-button class="next-page-btn" @click=${()=> this.loadData(true)} class="next">Next</sl-button>
      </div>
           <div id="restaurants-container">
           </div>


           <div class="pagination">
        <sl-button class="prev-page-btn" @click=${()=> this.loadData(false)} class="prev">Previous</sl-button>
        <sl-button class="next-page-btn" @click=${()=> this.loadData(true)} class="next">Next</sl-button>
      </div>
           
    
    </div>

    <app-footer title=${document.title}></app-footer>
    
    `;


render(template, App.rootEl);


  }



}


export default new SearchRestaurantsView();