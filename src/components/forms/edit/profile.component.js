/**
 * Edit profile form component
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import { LitElement, html, css } from '@polymer/lit-element';
import {anchorRoute, gotoRoute} from '../../../Router';
import AuthAPI from '../../../services/AuthAPI';
import App from '../../../App';
import Toast from '../../../Toast';
import UserAPI from '../../../services/UserAPI';
import enumUtils from '../../../utils/enum.utils';

//Define custom element
customElements.define('edit-profile-form', class EditProfileForm extends LitElement {


  constructor(){
    super()    
  }

  //Configure the element's custom properties
  static get properties(){
    return {
      title: {
        type: String
      }
    }
  }

  /**
   * Handler for profile update form
   * @param {*} e 
   */
  async updateProfileSubmitHandler(e) {
    e.preventDefault();
    const formData = e.detail.formData;
    try {
      const updatedUser = await UserAPI.updateById(AuthAPI.currentUser._id, formData);      
      delete updatedUser.password;       
      AuthAPI.currentUser = updatedUser;     
      AuthAPI.currentUser = updatedUser;
      this.render();
      Toast.show('profile updated');
      gotoRoute('/profile');
    }catch(err){      
      Toast.show(err, 'error');
    }
  }


  /**
   * Renders the edit profile form
   * @returns Render of edit profile form
   */
  render(){

    let content;

    if (AuthAPI.currentUser.type == "reviewer") 
      content = this.reviewerTemplate();
 else if (AuthAPI.currentUser.type == "restaurant") 
   content = this.restaurantTemplate();
 else if (AuthAPI.currentUser.type == "admin")
   content = this.adminTemplate();

    return html`


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

  label, sl-input, sl-textarea {
    font-size:var(--label-font-size);
  font-weight:var(--label-font-weight);
}





.form-edit-profile {
  display:flex;
  flex-direction: column;
  align-items:center;
  border:var(--main-content-border);
  width:700px;
  border-radius:20px;
  padding:40px;
}


sl-textarea {
--label-width:6rem;
--gap-width:2rem;
  margin-top: var(--sl-spacing-large);
  overflow-y:scroll;
}


sl-textarea::part(form-control-label) {
  text-align: right;
  align-self: center;
  margin-right:20px;
}

sl-textarea::part(form-control) {
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

.avatar-input-container {
  display:flex;
  flex-direction:row;
}

.avatar-input-container label {
padding-right:80px;
}


h1 {
  text-align:center;
}


@media all and (max-width: 768px){ 




  .form-edit-profile {
  display:flex;
  flex-direction: column;
  align-items:center;
  border:none;
  width:100vw;
  border-radius:0px;
  padding:20px;
}

}
 
</style>




          <sl-form class="form-edit-profile" @sl-submit=${this.updateProfileSubmitHandler.bind(this)}>
<h1>${document.title}</h1>
          <div class="avatar-input-container">
                               ${(AuthAPI.currentUser.avatar) ? html`
<sl-avatar image="${enumUtils.BUCKET_URI}/${AuthAPI.currentUser.avatar}"></sl-avatar>
    <label for="avatar">Avatar</label><br>   
<input type="file" name="avatar" />
`: html`
    <label for="avatar">Avatar</label><br>   
<input type="file" name="avatar" />
`}   
          </div>

                  


          <sl-textarea label="Bio" rows="2" resize="none" type="text" name="bio" value="${AuthAPI.currentUser.bio}" placeholder="Bio"></sl-textarea>
          ${content}
            <sl-button id="edit-profile-submit-btn" type="primary" class="submit-btn" submit>Update Profile</sl-button>
          </sl-form>
    `; 
  }


    /**
   * Renders reviewer-specific form inputs
   * @returns Render of reviewer-specific form inputs
   */
  reviewerTemplate() {
    return html`   


<style>
sl-input {
--label-width:6rem;
--gap-width:2rem;
}

sl-input {
  margin-top: var(--sl-spacing-large);
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

</style>

<sl-input label="First Name" type="text" name="firstName" value="${AuthAPI.currentUser.firstName}" placeholder="First Name"></sl-input>
<sl-input label="Surname" type="text" name="lastName" value="${AuthAPI.currentUser.lastName}" placeholder="Surname"></sl-input>
<sl-input label="Username" type="text" name="username" value="${AuthAPI.currentUser.username}" placeholder="Username"></sl-input>
`;
  }



  /**
   * Renders restaurant-specific form inputs
   * @returns Render of restaurant-specific form inputs
   */
  restaurantTemplate() {
return html`   

<style>
sl-input {
--label-width:6rem;
--gap-width:2rem;
}

sl-input {
  margin-top: var(--sl-spacing-large);
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






</style>

<sl-input label="Restaurant Name" type="text" name="restaurantName" value="${AuthAPI.currentUser.restaurantName}" placeholder="Restaurant Name"></sl-input>
<sl-input label="Phone Number" type="text" name="phoneNumber" value="${AuthAPI.currentUser.phoneNumber}" placeholder="Phone Number"></sl-input>
<sl-input label="Location" type="text" name="location" value="${AuthAPI.currentUser.location}" placeholder="Location"></sl-input>
<sl-input label="Established" type="text" name="established" value="${AuthAPI.currentUser.established}" placeholder="Established"></sl-input>
<sl-input label="Owner" type="text" name="owner" value="${AuthAPI.currentUser.owner}" placeholder="Owner"></sl-input>
<sl-input label="Cuisine" type="text" name="cuisine" value="${AuthAPI.currentUser.cuisine}" placeholder="Cuisine"></sl-input>
<sl-input label="Demerits" type="text" name="demerits" value="${AuthAPI.currentUser.demerits}" placeholder="Demerits"></sl-input>

`;
  }


    /**
   * Renders admin-specific form inputs
   * @returns Render of admin-specific form inputs
   */
  adminTemplate() {
   return html` 

<style>
sl-input {
--label-width:6rem;
--gap-width:2rem;
}

sl-input {
  margin-top: var(--sl-spacing-large);
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

</style>


<sl-input label="First Name" type="text" name="firstName" value="${AuthAPI.currentUser.firstName}" placeholder="First Name"></sl-input>
<sl-input label="Surname" type="text" name="lastName" value="${AuthAPI.currentUser.lastName}" placeholder="Surname"></sl-input>

<sl-input  label="Username" type="text" name="username" value="${AuthAPI.currentUser.username}" placeholder="Username"></sl-input>  
`;
  }
});