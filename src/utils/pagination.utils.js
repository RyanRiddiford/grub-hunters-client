/**
 * Pagination utility functions
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

//Utility function for pagination controls
class PaginationUtils {

  /**
   * Increment current page by 1
   */
  incrementPage() {
  this.currPage++;
  }
  
  /**
   * Decrement current page by 1
   */
  decrementPage() {
  this.currPage--;
  }
    
    /**
     * Disables/enables pagination buttons depending on if content exists
     */
    async updatePaginationButtons(numPages) {
  
      //Initialise the current page index
      if (!this.currPage)
      this.currPage = 0;
    
    //Class selectors for previous and next buttons
      const prevBtnSelector = '.prev-page-btn';
      const nextBtnSelector = '.next-page-btn';
    
    //No content --> disable previous and next buttons
    if (!numPages) {
    this.disableButton(`${prevBtnSelector}, ${nextBtnSelector}`);
    }
  
    //Viewing first page -> disable previous buttons
    if (this.currPage == 0 && numPages > 1) {
      this.disableButton(prevBtnSelector);
    }
      //Viewing second page -> enable previous buttons
      else if (this.currPage == 1) {
    this.enableButton(prevBtnSelector);
      }
    
      //Viewing second last page -> enable next buttons
      if ((this.currPage + 2) && numPages) {
        this.enableButton(nextBtnSelector);
      }
      //Viewing last page -> disable next buttons
      if ((this.currPage + 1) == numPages) {
        this.disableButton(nextBtnSelector);
      }
    
    }
    
    /**
     * Disable a button
     * @param {*} querySelector Stylesheet selector of buttons
     */
    disableButton(querySelector) {
      const pageBtns = document.querySelectorAll(querySelector);
      pageBtns.forEach((el) => {
    el.classList.add("hidden");
      });
    }
    
    /**
     * Enable a button
     * @param {*} querySelector Stylesheet selector of buttons
     */
    enableButton(querySelector) {
      const pageBtns = document.querySelectorAll(querySelector);
      pageBtns.forEach((el) => {
    el.classList.remove("hidden");
      });
    }
    
  }
  
  
  //Export the utility class
  export default new PaginationUtils();