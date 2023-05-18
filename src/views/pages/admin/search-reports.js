/**
 * Search reports view
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import App from '../../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute, routes} from '../../../Router'
import AuthAPI from '../../../services/AuthAPI'
import moment from 'moment'
import UserAPI from '../../../services/UserAPI';
import enumUtils from '../../../utils/enum.utils';
import ReportAPI from '../../../services/ReportAPI';
import ReviewAPI from '../../../services/ReviewAPI';
import paginationUtils from '../../../utils/pagination.utils';



//Search reports view
class ActiveTicketsView {


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
      this.status = event.detail.item.value;
      console.log(this.status);
    });
    targetTypeDropdown.addEventListener('sl-select', event => {
      this.targetType = event.detail.item.value;
      console.log(this.targetType);
    });
  }


      /**
   * Send form data for searching data
   * @param {*} e The event object
   */
      async searchSubmitHandler(e) {
        if (!this.currPage)
        this.currPage = 0; 

        e.preventDefault();
        //const formData = e.detail.formData;
          //this.status = document.getElementById().value;
          //this.targetType = formData.get("target-type");
          console.log("submit begin");
          console.log(this.status);
          console.log(this.targetType);
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
    const numPages = await ReportAPI.getNumPages(this.status, this.targetType);     

  //Disable/enable pagination buttons
  paginationUtils.updatePaginationButtons(numPages);

      //Get page of data
      const data = await ReportAPI.getPage(this.currPage, this.status, this.targetType);           
      //Render data listing array to container element
this.renderListings(data);

}


/**
 * Render the data listings to container element
 * @param {*} data array of data to render listings with
 */
async renderListings(data) {
  const listingTemplates = [];
  for (const item of data) {
    let target;
    if (item.targetType == enumUtils.reportTargetType.review) 
      target = await ReviewAPI.getById(item.targetId);  
    else if (item.targetType == enumUtils.reportTargetType.restaurant) {
       target = await UserAPI.getById(item.targetId);
       console.log("this is a restaurant: " + target);
    }
        

listingTemplates.push(html`<report-listing target=${JSON.stringify(target)} report=${JSON.stringify(item)}></report-listing>`);
  }

 render(listingTemplates, document.getElementById('reports-container'));
}



      /**
       * Render the view
       */
  render() {

    const template = html`


    
    <app-header title="${document.title}" user="${JSON.stringify(AuthAPI.currentUser)}"></app-header>

    <div class="page-content">

    <div class="search-container">
      <h1>Search Tickets</h1>
     <sl-form class="form-search" @sl-submit=${this.searchSubmitHandler.bind(this)}>   
     <div class="dropdown-container">
     <sl-dropdown id="status-dropdown">
  <sl-button slot="trigger" caret>Ticket Status</sl-button>
  <sl-menu>
    <sl-menu-item value="all">All</sl-menu-item>
    <sl-menu-item value="active">Active</sl-menu-item>
    <sl-menu-item value="closed">Closed</sl-menu-item> 
  </sl-menu>
</sl-dropdown>   

<sl-dropdown id="target-type-dropdown">
  <sl-button slot="trigger" caret>Target Type</sl-button>
  <sl-menu>
    <sl-menu-item value="all">All</sl-menu-item>
    <sl-menu-item value="review">Review</sl-menu-item>
    <sl-menu-item value="restaurant">Restaurant</sl-menu-item>
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


export default new ActiveTicketsView();