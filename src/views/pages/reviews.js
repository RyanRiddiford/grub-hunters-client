/**
 * Reviews view
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

//Imports
import App from './../../App';
import {
	html, render
}
from 'lit-html';
import AuthAPI from '../../services/AuthAPI';
import UserAPI from '../../services/UserAPI';
import ReviewAPI from '../../services/ReviewAPI';
import paginationUtils from '../../utils/pagination.utils';


//Displays your reviews as paginated listings
class ReviewsView {


	/**
	 * Initialise
	 */
	init() {
		document.title = 'Your Reviews';
	    //Reset page for new filter
		paginationUtils.setCurrentPage(0);
		this.render();	
		this.loadData();
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
		const numPages = await ReviewAPI.getNumPages(AuthAPI.currentUser._id);

		//Disable/enable pagination buttons
		paginationUtils.updatePaginationButtons(numPages);
		const data = await ReviewAPI.getPage(paginationUtils.getCurrentPage(), AuthAPI.currentUser._id, AuthAPI.currentUser.accessLevel);
		//Lett the user know no reviews exist
		if (data.length ==  0) {
						//Render review listing template array to reviews container
				render(html`<h3 style="margin-top:100px">No Reviews Found</h3>`, document.getElementById("reviews-container"));	
		}
		//Render data listing array to container element
		else {	
		this.renderListings(data);		
		}


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
	 * Render review page
	 */
	render() {

		const template = html `
       
       
        <app-header title="Reviews" user=${JSON.stringify(AuthAPI.currentUser)}></app-header>
        <div class="page-content main-container">
      
  <h1>Your Reviews</h1>

  <div class="pagination">
        <sl-button class="prev-page-btn prev hidden" @click=${()=> this.loadData(false)}>Previous</sl-button>
        <sl-button class="next-page-btn next hidden" @click=${()=> this.loadData(true)}>Next</sl-button>
      </div>


      <div id="reviews-container">
      </div>


      <div class="pagination">
	    <sl-button class="prev-page-btn prev hidden" @click=${()=> this.loadData(false)}>Previous</sl-button>
        <sl-button class="next-page-btn next hidden" @click=${()=> this.loadData(true)}>Next</sl-button>
      </div>

        </div>
<app-footer title=${document.title}></app-footer>


        
        `;

		render(template, App.rootEl);

	}



}

//Export the reviews view
export default new ReviewsView();