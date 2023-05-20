/**
 * Review form component
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import { LitElement, html, css } from '@polymer/lit-element';
import {anchorRoute, gotoRoute} from '../../../Router';
import App from '../../../App';
import Toast from '../../../Toast';
import ReviewAPI from '../../../services/ReviewAPI';
import AuthAPI from '../../../services/AuthAPI';


//Define custom element
customElements.define('review-form', class ReviewForm extends LitElement {


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
   * Handler for submitting review form
   * @param {*} e 
   */
  async createReviewSubmitHandler(e){
    e.preventDefault();
    const formData = e.detail.formData;
    const submitBtn = this.shadowRoot.querySelector('#review-btn');
    submitBtn.setAttribute('loading', '');
    try {
      const response = await ReviewAPI.create(formData);      
      Toast.show('review created');
    }catch(err){      
      Toast.show(err, 'error');
    }
    submitBtn.removeAttribute('loading');
  }


  /**
   * Renders the register form html
   * @returns Render of register form
   */
  render(){  
return html`


<style>

sl-form {
  align-items:center;
}

sl-input::part(input) {
  font-size:var(--input-font-size);
  font-weight:var(--input-font-weight);
}

sl-input {
  --label-width:6rem;
--gap-width:2rem;
  margin-top: var(--sl-spacing-medium);  
}


label, sl-input {
    font-size:var(--label-font-size);
  font-weight:var(--label-font-weight);
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


<sl-form class="page-form" @sl-submit=${this.createReviewSubmitHandler.bind(this)}>
 
<input type="hidden" name="authorId" value="${AuthAPI.currentUser._id}" >
<input type="hidden" name="targetType" value="${AuthAPI.currentUser.accessLevel}" >
<input type="hidden" name="restaurantId" value="${AuthAPI.currentRestaurant._id}" >

<sl-input label="Title" type="text" name="title" placeholder="Title" required></sl-input>
<sl-input label="Description" type="text" name="text" placeholder="I found this restaurant to be..." required></sl-input>


<sl-range label="Rating" min="0.1" max="10" step="0.1" name="rating" required></sl-range>

            <sl-button id="review-btn" type="primary" class="submit-btn" submit>Post Review</sl-button>
          </sl-form>`;
  }
 });