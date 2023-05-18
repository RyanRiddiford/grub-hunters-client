/**
 * Edit profile form component
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import { LitElement, html } from '@polymer/lit-element';
import ReviewAPI from '../../../services/ReviewAPI';


//Define custom element
customElements.define('edit-review-form', class EditReviewForm extends LitElement {


  constructor(){
    super();    
  }

  //Configure the element's custom properties
  static get properties(){
    return {
      title: {
        type: String
      },
      review: {
        type: Object
      },
    }
  }

  /**
   * Handler for edit review form
   * @param {*} e 
   * @param {*} reviewId 
   */
  async updateReviewSubmitHandler(e, reviewId){
    e.preventDefault()
    const formData = e.detail.formData;
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.setAttribute('loading', '');
    try {
      const updatedReview = await ReviewAPI.updateById(reviewId, formData, false);      
      console.log(updatedReview);
      this.render();
      Toast.show('review updated');
    }catch(err){      
      Toast.show(err, 'error');
    }
    submitBtn.removeAttribute('loading');
  }


  /**
   * Renders the edit review form
   * @returns Render of edit review form
   */
  render(){

    return html`
          <sl-form class="page-form" @sl-submit=${this.updateReviewSubmitHandler.bind(this, this.review._id)}>
            ${content}
            <sl-button type="primary" class="submit-btn" submit>Update Review</sl-button>
          </sl-form>
    `;
  }

});