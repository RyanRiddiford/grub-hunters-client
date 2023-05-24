/**
 * Login form component
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import {
	LitElement, html, css
}
from '@polymer/lit-element';
import AuthAPI from '../../../services/AuthAPI';


//Define custom element
customElements.define('login-form', class LoginForm extends LitElement {


	constructor() {
		super();
	}

	/**
	 * Send form data for signing in
	 * @param {*} e The event object
	 */
	signInSubmitHandler(e) {
		e.preventDefault();
		const formData = e.detail.formData;
		const submitBtn = this.shadowRoot.querySelector('#login-btn');
		submitBtn.setAttribute('loading', '');
		// sign in using AuthAPI    
		AuthAPI.signIn(formData, () => {
			submitBtn.removeAttribute('loading');
		});
	}


	/**
	 * Renders the login form html
	 * @returns Render of login form
	 */
	render() {

		return html `


<style>

sl-input {
--label-width:6rem;
--gap-width:2rem;
}

sl-input , sl-textarea {
  margin-top: var(--sl-spacing-large);
  font-size:var(--label-font-size);
  font-weight:var(--label-font-weight);
}

sl-input::part(input) {
  font-size:var(--input-font-size);
  font-weight:var(--input-font-weight);
}


sl-input::part(form-control-label) {
  text-align: right;
  align-self: center;
  margin-right:20px;
}


sl-input::part(form-control) {
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
  font-size:var(--button-font-size);
  font-weight:var(--button-font-weight);
}

.form-signin {
  display:flex;
  flex-direction: column;
  align-items:center;
}


</style> 



<sl-form class="form-signin" @sl-submit=${this.signInSubmitHandler}>    
<sl-input label="Email" name="email" type="email" value="nick@reviewer.com.au" placeholder="Email" required></sl-input>         
 <sl-input label="Password" name="password" type="password" value="reviewer123" placeholder="Password" required toggle-password></sl-input>

 <sl-button id="login-btn" type="primary" class="submit-btn" submit>Login</sl-button>
          </sl-form>`;
	}
});
