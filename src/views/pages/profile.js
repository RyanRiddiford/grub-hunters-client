/**
 * Profile View
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import AuthAPI from '../../services/AuthAPI'
import moment from 'moment'
import UserAPI from '../../services/UserAPI';
import enumUtils from '../../utils/enum.utils';
import Toast from '../../Toast';
import mascot from '../partials/mascot.partial';


//Profile view
class ProfileView {

  /**
   * Initialise
   */
  init(){
    document.title = 'Profile';    
    this.render();    
    //Show warning dialog to user with first demerit
    this.showWarning();
    
  }


  /**
   * Shows one-time warning if user just received first demerit
   */
  showWarning() {
    //Admin cannot get warnings
        if (AuthAPI.currentUser.accessLevel != enumUtils.accessLevels.administrator)
        //If warning has yet to be shown
    if (AuthAPI.currentUser.warningStatus) {
     let warningDialog = document.getElementById("warning-dialog");
     warningDialog.show();
    }
  }


/**
 * Unsets warning flag once the user has acknowledged the warning
 * @param {*} e 
 */
  async warningReceived(e) {
    e.preventDefault();
    const warningBtn = document.getElementById("warning-btn");
    let warningDialog = document.getElementById("warning-dialog");
    warningBtn.setAttribute('loading', '');
    //Set warning status to false on server
    try {
      const updatedUser = await UserAPI.updateById(AuthAPI.currentUser._id, JSON.stringify({"warningStatus":false}), true);      
      delete updatedUser.password;       
      AuthAPI.currentUser = updatedUser;     
      AuthAPI.currentUser = updatedUser;
    }catch(err){      
      console.log(err);
    }
     warningBtn.removeAttribute('loading');
    warningDialog.hide(); 
  }



    /**
   * Renders the profile page
   */
    render(){

      let content;
     
      //Render reviewer profile content
         if (AuthAPI.currentUser.accessLevel == enumUtils.accessLevels.reviewer) 
              content = html`<reviewer-profile></reviewer-profile>`;     
              //Render restaurant profile content
         else if (AuthAPI.currentUser.accessLevel == enumUtils.accessLevels.restaurant) {
          console.log("should be false");
                     content = html`<restaurant-profile restaurant=${JSON.stringify(AuthAPI.currentUser)} is_visitor="false"></restaurant-profile>`;    
         }
           //Render administrator profile content
         else if (AuthAPI.currentUser.accessLevel == enumUtils.accessLevels.administrator) 
         content = html`<admin-profile></admin-profile>`;  
         
       
         const template = html`



<sl-dialog id="warning-dialog" label="Confirmation" class="dialog-overview">
   <span>Your account has received a demerit point. A second demerit point will lead to a 1 week suspension. A third demerit point will lead to a permanent account ban!</span>
  <sl-form @sl-submit=${this.warningReceived.bind(this)}>
<input type="hidden" value=${false} name="warningStatus">
<sl-button id="warning-btn" type="primary" class="submit-btn" submit>Okay</sl-button>
  </sl-form>
  <sl-button @click="${() => {this.shadowRoot.getElementById('warning-dialog').hide();}}" slot="footer">Ok</sl-button>
</sl-dialog>

           <app-header title=${document.title} user="${JSON.stringify(AuthAPI.currentUser)}"></app-header>

           <div class="page-content">
             ${content}
           </div>
           
           <app-footer title=${document.title}></app-footer>
         `;



     
         render(template, App.rootEl);
       }

}

export default new ProfileView();