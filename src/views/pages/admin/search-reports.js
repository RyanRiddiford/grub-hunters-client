/**
 * Search reports view
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import App from '../../../App';
import {html, render} from 'lit-html';
import AuthAPI from '../../../services/AuthAPI';
import UserAPI from '../../../services/UserAPI';
import enumUtils from '../../../utils/enum.utils';
import ReportAPI from '../../../services/ReportAPI';
import ReviewAPI from '../../../services/ReviewAPI';
import paginationUtils from '../../../utils/pagination.utils';
import Toast from '../../../Toast';


//Search reports view
class SearchTicketsView {


  /**
   * Initialise
   */
  init(){
    document.title = 'Search Tickets';    
    this.render();
    //Set default values for dropdown options
    this.status = "all";
    this.targetType = "all";    
    this.setupDropdownEvents();
    paginationUtils.disableButton('.prev-page-btn, .next-page-btn');
  }


/**
 * Setup event listeners for getting dropdown values
 */
  setupDropdownEvents() {
    const statusDropdown = document.querySelector('#status-dropdown');
    const targetTypeDropdown = document.querySelector('#target-type-dropdown');
    statusDropdown.addEventListener('sl-select', event => {
      //Set value for form submission
      this.status = event.detail.item.value;

         let oldEl = statusDropdown.querySelector(".active-item");
         //Remove active class from old selected option
   if(oldEl)
       oldEl.classList.remove("active-item");
   let newEl = statusDropdown.querySelector(`sl-menu .${event.detail.item.value}`);
   newEl.classList.add("active-item");
    });
    targetTypeDropdown.addEventListener('sl-select', event => {
      //Set value for form submission
      this.targetType = event.detail.item.value;

      let oldEl = targetTypeDropdown.querySelector(".active-item");
      //Remove active class from old selected option
      if(oldEl)
      oldEl.classList.remove("active-item");
      //Add active class to current selected option
      let newEl = targetTypeDropdown.querySelector(`sl-menu .${event.detail.item.value}`);
      newEl.classList.add("active-item");
    });
  }


      /**
   * Send form data for searching data
   * @param {*} e The event object
   */
      async searchSubmitHandler(e) {
		    //Reset page for new filter
		    paginationUtils.setCurrentPage(0);
        e.preventDefault();
        let submitBtn = document.querySelector('.submit-btn');
        submitBtn.setAttribute('loading', '');
        this.loadData().then(() => {
          submitBtn.removeAttribute('loading');  
        });
               
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
    const numPages = await ReportAPI.getNumPages(this.status, this.targetType);     

  //Disable/enable pagination buttons
  paginationUtils.updatePaginationButtons(numPages);

      //Get page of data
      const data = await ReportAPI.getPage(paginationUtils.getCurrentPage(), this.status, this.targetType);    
      
      //Alert user to no matching results found
		  if (data.length == 0)
		  Toast.show("No results found");
      
      //Render data listing array to container element
      await this.renderListings(AuthAPI.reportPage);

}


/**
 * Render the data listings to container element
 * @param {*} data array of data to render listings with
 */
async renderListings(data) {
  const listingTemplates = [];
  AuthAPI.targets = [];
  let count = 0;
  for (const item of data) {
    let target;
    if (item.targetType == enumUtils.reportTargetType.review) {
        target = await ReviewAPI.getById(item.targetId); 
        AuthAPI.targets.push(target);
    }
     
    else if (item.targetType == enumUtils.reportTargetType.restaurant) {
       target = await UserAPI.getById(item.targetId);
       AuthAPI.targets.push(target);
    }
        

listingTemplates.push(html`<report-listing index=${count}></report-listing>`);

count++;

}

 render(listingTemplates, document.getElementById('reports-container'));
}

      /**
       * Render the view
       */
  render() {

    const template = html`



<style>

.active-item {
  background:var(--secondary-brand-color);
  color:var(--light-txt-color);
}

</style> 


    
    <app-header title="${document.title}" user="${JSON.stringify(AuthAPI.currentUser)}"></app-header>

    <div class="page-content">

    <div class="search-container">
      <h1>Search Tickets</h1>
     <sl-form class="form-search" @sl-submit=${this.searchSubmitHandler.bind(this)}>   
     <div class="dropdown-container">
           <sl-dropdown id="status-dropdown">
   <sl-button slot="trigger" caret>Ticket Status</sl-button>
   <sl-menu>
     <sl-menu-item class="all active-item" value="all">All</sl-menu-item>
     <sl-menu-item class="active" value="active">Active</sl-menu-item>
     <sl-menu-item class="closed" value="closed">Closed</sl-menu-item> 
   </sl-menu>
 </sl-dropdown>   

 <sl-dropdown id="target-type-dropdown">
   <sl-button slot="trigger" caret>Target Type</sl-button>
   <sl-menu>
     <sl-menu-item class="all active-item" value="all">All</sl-menu-item>
     <sl-menu-item class="review" value="review">Review</sl-menu-item>
     <sl-menu-item class="restaurant" value="restaurant">Restaurant</sl-menu-item>
   </sl-menu>
 </sl-dropdown> 

         
     </div> 
 
               <sl-button class="submit-btn" id="search-submit-btn" type="primary" submit>Search Reports</sl-button>
           </sl-form>      
    </div>
    <div class="pagination">
        <sl-button class="prev-page-btn" @click=${()=> this.loadData(false)} class="prev">Previous</sl-button>
        <sl-button class="next-page-btn" @click=${()=> this.loadData(true)} class="next">Next</sl-button>
      </div>


           <div id="reports-container">
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


//Export the view
export default new SearchTicketsView();