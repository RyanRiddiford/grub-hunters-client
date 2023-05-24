/**
 * Reviewer profile component
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import {
	LitElement, html
}
from '@polymer/lit-element';
import {
	anchorRoute, gotoRoute
}
from '../../Router';
import AuthAPI from '../../services/AuthAPI';
import App from '../../App';
import UserAPI from '../../services/UserAPI';
import enumUtils from '../../utils/enum.utils';


//Define custom element
customElements.define('reviewer-profile', class ReviewerProfile extends LitElement {


	constructor() {
		super();
	}


	/**
	 * 
	 * @returns Render of reviewer profile component
	 */
	render() {


		return html `   

<style>

h1 {
     font-size: var(--h1-font-size);
     font-weight:var(--h1-font-weight);
     font-family:var(--heading-font-family);
     color:var(--heading-txt-color);
}
 h2 {
     font-size: var(--h2-font-size);
     font-weight:var(--h2-font-weight);
     font-family:var(--heading-font-family);
     color:var(--heading-txt-color);
}
 h3 {
     font-size: var(--h3-font-size);
     font-weight:var(--h3-font-weight);
     font-family:var(--heading-font-family);
     color:var(--heading-txt-color);
}
 .bold-text {
     font-size:var(--label-font-size);
     font-weight:var(--label-font-weight);
}
 .profile {
     display:flex;
     flex-direction: column;
     justify-content:center;
     width: 700px;
     align-items: center;
     border: 4px solid var(--brand-color);
     background:var(--body-bg);
     margin:auto;
     border-radius: 20px;
     padding:30px;
}
 .top {
     display:flex;
     flex-direction:row;
     width:600px;
     justify-content:space-between;
}
 .mid {
     display:flex;
     flex-direction:row;
     align-items:top;
     gap:30px;
     margin-bottom:20px;
}
 .main-info {
     display:flex;
     flex-direction:column;
     box-shadow: var(--main-content-box-shadow);
     width: 300px;
     border-radius:20px;
     padding:30px;
}
 .bot {
     display:flex;
     flex-direction:column;
     gap:50px;
}
 .bio-display {
     display:flex;
     flex-direction:column;
     box-shadow: var(--main-content-box-shadow);
     width:600px;
     border-radius:20px;
     padding:30px;
}
 .bio-display h3 {
     text-align:left;
     margin-bottom:0px;
     margin-top:0px;
}
 p {
     overflow-y: scroll;
}
 a {
     text-decoration:none;
     color:var(--base-txt-color);
     font-weight:700;
}
 .point-display {
     display:flex;
     flex-direction:row;
     justify-content:center;
     gap:15px;
     width:150px;
     height:auto;
     background: var(--brand-color);
     color:var(--light-txt-color);
     margin-top:5px;
     margin-bottom:5px;
     padding:5px;
     padding-left:10px;
     border-radius:20px;
}
 .delete-btn {
    /*Right-align element to parent */
     margin-left: auto;
     margin-right: 0;
     width:150px;
     padding:5px;
     height: auto;
     text-align:center;
}
 .delete-btn::part(base) {
     background:red;
     border: 2px solid black;
     border-radius:10px;
     color:black;
     font-weight:600;
}
.delete-btn::part(base):hover {
	opacity:0.8;
}
 sl-dialog::part(panel) {
     border-radius:20px;
     box-shadow:var(--dialog-box-shadow);
}
 sl-dialog::part(overlay) {
     height:100vh;
}
 sl-dialog::part(header) {
     padding:5px;
     background: var(--brand-color);
     border-top-left-radius:20px;
     border-top-right-radius:20px;
}
 sl-dialog::part(title) {
     font-size: var(--h2-font-size);
     font-weight:var(--h2-font-weight);
     font-family:var(--heading-font-family);
     text-align:center;
     color:var(--light-txt-color);
}
 sl-dialog::part(body) {
     font-size: 1rem;
     font-weight:600;
     font-family: var(--base-font-family);
     text-align:center;
     color:var(--base-txt-color);
}
 sl-dialog::part(footer) {
     display:flex;
     flex-direction:row;
     justify-content:space-between;
     margin-left:50px;
     margin-right:50px;
}
 sl-avatar {
     --size: 200px;
     margin-bottom: 1em;
}
 @media all and (max-width: 768px){
     .profile {
         display:flex;
         flex-direction: column;
         justify-content:center;
         width: 100vw;
         align-items: center;
         border:none;
         border-radius:0px;
         padding:20px;
    }
     .top {
         width:90%;
    }
     .mid {
         display:flex;
         flex-direction:column;
         width:90%;
         align-items:left;
    }
     .bot {
         width:90%;
         gap:100px;
    }
     .bio-display {
         width:90%;
         border-radius:20px;
         padding:20px;
    }
}


</style>




<sl-dialog id="delete-dialog" label="Confirmation" class="dialog-overview">
  <span>Are you sure you want to permanently delete your account?</span>
  <sl-button @click="${() => {this.shadowRoot.getElementById('delete-dialog').hide(); UserAPI.deleteById(AuthAPI.currentUser._id);}}" slot="footer">Yes</sl-button>
  <sl-button @click="${() => this.shadowRoot.getElementById('delete-dialog').hide()}" slot="footer">No</sl-button>
</sl-dialog>



          <div class="profile">
      <div class="top">
        <h1>Your Profile</h1>
        <sl-icon-button name="pencil" label="Edit Profile" style="font-size: 2rem;" @click=${()=> gotoRoute('/edit-profile')}></sl-icon-button>
      </div>
      
      <div class="mid">
      ${AuthAPI.currentUser && AuthAPI.currentUser.avatar ? html` <sl-avatar shape="rounded" image=${
			(AuthAPI.currentUser && AuthAPI.currentUser.avatar) ? `${enumUtils.BUCKET_URI}/${AuthAPI.currentUser.avatar}` : ''
		} > </sl-avatar>
		`:html` <sl-avatar shape="rounded" > </sl-avatar>
		`}
             <div class="main-info">
              <div><span class="bold-text">Username </span><span>${AuthAPI.currentUser.username}</span></div>
              <div><span class="bold-text">Name </span><span>${AuthAPI.currentUser.firstName} ${AuthAPI.currentUser.lastName}</span></div>
              <div><span class="bold-text">Email </span><span>${AuthAPI.currentUser.email}</span></div>
              <div class="point-display"><span class="bold-text">Demerits </span><span>${AuthAPI.currentUser.demerits}</span></div>
             </div>
      </div>
      <div class="bot">
        <div class="bio-display"><h3>Bio</h3>
        <p>${AuthAPI.currentUser.bio}</p></div>
          <sl-button class="delete-btn" @click="${() => this.shadowRoot.getElementById('delete-dialog').show()}">Delete Account</sl-button>      
      </div>

       
    </div>

            
    `;

	}


});