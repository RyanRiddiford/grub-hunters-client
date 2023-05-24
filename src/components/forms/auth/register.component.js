/**
 * Register form component
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
from '../../../Router';
import Auth from '../../../services/AuthAPI';


//Define custom element
customElements.define('register-form', class RegisterForm extends LitElement {


	constructor() {
		super();
		//Set reviewer register form as default
		this.currentForm = "Reviewer";
	}

	/**
	 * Send form data for signing in
	 * @param {*} e The event object
	 */
	async registerSubmitHandler(e) {
		e.preventDefault();
		const formData = e.detail.formData;
		const submitBtn = this.shadowRoot.querySelector('#register-btn');
		submitBtn.setAttribute('loading', '');
		Auth.signUp(formData, () => {}).then(() => {
			submitBtn.removeAttribute('loading');
		});
	}


	/**
	 * Switch between fields for reviewer and restaurant accounts
	 * @param {*} e 
	 */
	updateFormFields(e) {
		//Switch between restaurant and reviewer form fields
		if (e.target.getAttribute("checked") == "")
			e.target.innerHTML = "Restaurant";
		else if (e.target.getAttribute("checked") == null)
			e.target.innerHTML = "Reviewer";
		//Assign form elements to variables
		let revFields = this.shadowRoot.querySelector('#reviewer-fields');
		let resFields = this.shadowRoot.querySelector('#restaurant-fields');
		let accessLevelInput = this.shadowRoot.querySelector('#access-level-input');

		//Toggle account-specific fields
		revFields.classList.toggle('hidden');
		resFields.classList.toggle('hidden');

		//If restaurant fields are enabled
		if (revFields.classList.contains('hidden')) {
			accessLevelInput.value = 2;
			//Turn required on for restaurant fields
			for (let field of resFields.querySelectorAll('.required')) {
				field.setAttribute("required", "");
			}
			//Turn required off for review fields
			for (let field of revFields.querySelectorAll('.required')) {
				field.removeAttribute("required");
			}
		}
		//If review fields are enabled
		else if (resFields.classList.contains('hidden')) {
			accessLevelInput.value = 1;
			//Turn required off for restaurant fields
			for (let field of resFields.querySelectorAll('.required')) {
				field.removeAttribute("required");
			}
			//Turn required on for review fields
			for (let field of revFields.querySelectorAll('.required')) {
				field.setAttribute("required", "");
			}
		}




	}


	/**
	 * Renders the register form html
	 * @returns Render of register form
	 */
	render() {

		//Reviewer fields
		this.reviewerFields = html `
  <div id="reviewer-fields">
<sl-input class="required" label="First Name" name="firstName" type="text" placeholder="First Name" required></sl-input>
<sl-input class="required" label="Surname" name="lastName" type="text" placeholder="Surname" required></sl-input>
<sl-input class="required" label="Username" name="username" type="text" placeholder="Username" required></sl-input>
  </div>
  `;

		//Restaurant fields
		this.restaurantFields = html `

      <div id="restaurant-fields" class="hidden">

        <sl-input class="required" label="Restaurant Name" name="restaurantName" type="text" placeholder="Restaurant Name"></sl-input>


        <sl-input class="required" label="Phone Number" name="phoneNumber" type="tel" placeholder="Phone Number"></sl-input>


        <sl-input class="required" label="Location" name="location" type="text" placeholder="Location"></sl-input>


        <sl-input class="required" label="Date Established" name="established" type="text" placeholder="Date Established"></sl-input>


        <sl-input class="required" label="Owner" name="owner" type="text" placeholder="Owner"></sl-input>


        <sl-input class="required" label="Cuisine" name="cuisine" type="text" placeholder="Cuisine"></sl-input>

      </div>`;



		return html `

<style>

.hidden {
    visibility: hidden;
    display:none;
}

.form-signup {
  display:flex;
  flex-direction: column;
  align-items:center;
}

sl-form {
  align-items:center;
}

sl-input::part(input) {
  font-size:var(--input-font-size);
  font-weight:var(--input-font-weight);
}

sl-button {
  width:50%;
  margin-top:40px;
  left:25%;
  right:25%;
}

sl-button::part(base) {
  font-size:var(--button-font-size);
  font-weight:var(--button-font-weight);
}

sl-input , sl-textarea {
  --label-width:6rem;
--gap-width:2rem;
  margin-top: var(--sl-spacing-large);  
}


label, sl-input, sl-textarea {
    font-size:var(--label-font-size);
  font-weight:var(--label-font-weight);
}



sl-input::part(form-control-label), sl-textarea::part(form-control-label) {
  text-align: right;
  align-self: center;
  margin-right:20px;
}


sl-input::part(form-control), sl-textarea::part(form-control) {
  display:grid;
  grid: auto / var(--label-width) 1fr;
  gap: 20px;
  
}



sl-button {
  width:50%;
  margin-top:40px;
  left:25%;
  right:25%;
}

sl-button::part(base) {
  font-size:1.5rem;
  font-weight:600; 
  
}

sl-switch {
  --width:100px;
  --height:50px;
  --thumb-size:40px;
  margin-bottom: var(--sl-spacing-large);
}

</style>





<sl-form class="form-signup" @sl-submit=${this.registerSubmitHandler} enctype="multipart/form-data">  


<sl-switch checked @sl-change="${this.updateFormFields}">${this.currentForm}</sl-switch><br>

              <input id="access-level-input" name="accessLevel" type="hidden" value="1">

                  <label>Avatar
                     <input type="file" name="avatar" />
                  </label>
               
                  

       
              <sl-input class="required" label="Email" name="email" type="email" placeholder="Email" required></sl-input>
     

   
              <sl-input class="required" label="Password" name="password" type="password" placeholder="Password" required toggle-password></sl-input>
     


<sl-textarea class="required" label="Bio" rows="2" resize="none" name="bio" type="text" placeholder="Bio" required></sl-textarea>




  ${this.reviewerFields}
  ${this.restaurantFields}


  <sl-button id="register-btn" type="primary" class="submit-btn" submit>Register</sl-button>

          
          </sl-form>`;
	}
});