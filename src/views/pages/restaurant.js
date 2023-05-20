/**
 * Restaurant view
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

//Import dependencies
import App from './../../App'
import {html, render } from 'lit-html'
import AuthAPI from '../../services/AuthAPI'
import UserAPI from '../../services/UserAPI';
import ReviewAPI from '../../services/ReviewAPI';
import enumUtils from '../../utils/enum.utils';
import paginationUtils from '../../utils/pagination.utils';


//Renders restaurant view for other users
class RestaurantView {


  /**
   * Initialise
   */
  init(){
    document.title = 'Restaurant';   
    this.render();  
    this.loadData();  
    paginationUtils.disableButton('.prev-page-btn, .next-page-btn');
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
   const numPages = await ReviewAPI.getNumPages(AuthAPI.currentRestaurant._id);

  //Disable/enable pagination buttons
  paginationUtils.updatePaginationButtons(numPages);

      //Get page of data
      const data = await ReviewAPI.getPage(this.currPage, AuthAPI.currentRestaurant._id, enumUtils.accessLevels.restaurant);           
      //Render data listing array to container element
      this.renderListings(data);

}


/**
 * Render the data listings to container element
 * @param {*} data array of data to render listings with
 */
async renderListings(data) {
  //Build template array of review listings
  const listingTemplates = [];
  for (const item of data) {
    const restaurant = await UserAPI.getRestaurantName(item.restaurantId);

    listingTemplates.push(html`<review-listing is_report="false" restaurant_name=${restaurant.restaurantName} review=${JSON.stringify(item)}></review-listing>`);
  }

  //Render review listing template array to reviews container
render(listingTemplates, document.getElementById("reviews-container"));
}


  /**
   * Renders the restaurant page
   */
  render() {

    const template = html`





     <sl-dialog id="create-dialog" label="Create Review" class="dialog-overview">
<review-form title=${document.title}></review-form>
</sl-dialog>   


      <app-header title="Restaurant" user="${JSON.stringify(AuthAPI.currentUser)}"></app-header>

      <div class="page-content">

      <restaurant-profile is_visitor="true" restaurant=${JSON.stringify(AuthAPI.currentRestaurant)}></restaurant-profile>

      <div id="reviews-section">

<div class="top">
  <h2>Reviews</h2>
  ${(AuthAPI.currentUser.accessLevel == "1") ? html`
        <sl-button class="create-review-btn" @click="${() => document.getElementById('create-dialog').show()}">Create Review</sl-button>  
        `:html`
        `}
</div>

<div class="pagination">
        <sl-button class="prev-page-btn" @click=${()=> this.loadData(false)} class="prev">Previous</sl-button>
        <sl-button class="next-page-btn" @click=${()=> this.loadData(true)} class="next">Next</sl-button>
      </div>

<div id="reviews-container"></div>

<div class="pagination">
        <sl-button class="prev-page-btn" @click=${()=> this.loadData(false)} class="prev">Previous</sl-button>
        <sl-button class="next-page-btn" @click=${()=> this.loadData(true)} class="next">Next</sl-button>
      </div>
      </div>

      </div>


      <app-footer title=${document.title}></app-footer>
    `

    render(template, App.rootEl);
  }

}


//Export the view
export default new RestaurantView();