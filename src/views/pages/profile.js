/**
 * Profile View
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

import App from './../../App';
import {
	html, render
}
from 'lit-html';
import AuthAPI from '../../services/AuthAPI';
import UserAPI from '../../services/UserAPI';
import enumUtils from '../../utils/enum.utils';


//Profile view
class ProfileView {

	/**
	 * Initialise
	 */
	init() {
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
			if (AuthAPI.currentUser.warningStatus == true) {
			let warningDialog = document.getElementById("warning-dialog");
			warningDialog.show();
		}
	}


	/**
	 * Unsets warning flag once the user has acknowledged the warning
	 */
	async warningReceived() {
		let warningDialog = document.getElementById("warning-dialog");
		//Set warning status to false on server
		try {
			const updatedUser = await UserAPI.updateById(AuthAPI.currentUser._id, JSON.stringify({
				"warningStatus": false
			}), true);
			delete updatedUser.password;
			AuthAPI.currentUser = updatedUser;
			AuthAPI.currentUser = updatedUser;
		} catch (err) {
			console.log(err);
		}
		warningDialog.hide();
	}



	/**
	 * Renders the profile page
	 */
	render() {

		let content;

		//Render reviewer profile content
		if (AuthAPI.currentUser.accessLevel == enumUtils.accessLevels.reviewer)
			content = html `<reviewer-profile></reviewer-profile>`;
		//Render restaurant profile content
		else if (AuthAPI.currentUser.accessLevel == enumUtils.accessLevels.restaurant) {
			content = html `<restaurant-profile restaurant=${JSON.stringify(AuthAPI.currentUser)} is_visitor="false"></restaurant-profile>`;
		}
		//Render administrator profile content
		else if (AuthAPI.currentUser.accessLevel == enumUtils.accessLevels.administrator)
			content = html `<admin-profile></admin-profile>`;


		const template = html `

<sl-dialog @sl-after-hide=${() => {this.warningReceived();}} id="warning-dialog" label="Confirmation" class="dialog-overview">
   <span>Your account has received a demerit point. A second demerit point will lead to a 1 week suspension. A third demerit point will lead to a permanent account ban!</span>
<sl-button @click=${() => document.getElementById('warning-dialog').hide()} id="warning-btn" slot="footer" submit>Ok</sl-button>
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


//Export the view
export default new ProfileView();