/**
 * Edit Profile View
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

//Import dependencies
import App from '../../App';
import {html, render } from 'lit-html';
import {gotoRoute, anchorRoute} from '../../Router';
import AuthAPI from '../../services/AuthAPI';
import UserAPI from '../../services/UserAPI';
import Toast from '../../Toast';
import moment from 'moment';


//Edit profile view
class EditProfileView {

  /**
   * Initialise
   */
  init(){
    document.title = 'Edit Profile';    
    this.render();    
  }


  /**
   * Render the edit profile view
   */
  render(){
    const template = html`
      <app-header title=${document.title} user=${JSON.stringify(AuthAPI.currentUser)}></app-header>
      <div class="page-content">        
        ${(AuthAPI.currentUser == null) ? html`
          <sl-spinner></sl-spinner>
        `:html`
  <edit-profile-form title=${document.title}></edit-profile-form>
        `}
      </div>

      <app-footer title=${document.title}></app-footer>
    `
    render(template, App.rootEl);
  }


}

export default new EditProfileView();