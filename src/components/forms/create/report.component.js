/**
 * Report form component
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import { LitElement, html, css } from '@polymer/lit-element';
import {anchorRoute, gotoRoute} from '../../../Router';
import Auth from '../../../services/AuthAPI';
import App from '../../../App';
import Toast from '../../../Toast';
import ReportAPI from '../../../services/ReportAPI';


//Define custom element
customElements.define('report-form', class ReportForm extends LitElement {


  constructor(){
    super()    
  }

  //Configure the element's custom properties
  static get properties(){
    return {
      title: {
        type: String
      },
      target_id: {
type:String
      },
      target_type: {
        type:String
      }
    }
  }

  /**
   * Handler for submitting report form
   * @param {*} e 
   */
  async createReportSubmitHandler(e){
    e.preventDefault();
    const formData = e.detail.formData;
    const submitBtn = this.shadowRoot.querySelector('#report-submit-btn');
    submitBtn.setAttribute('loading', '');
    try {
      const response = await ReportAPI.create(formData); 
      Toast.show('Report created')
    }catch(err){      
      Toast.show(err, 'error')
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


<sl-form class="page-form" @sl-submit=${this.createReportSubmitHandler.bind(this)}>

<input type="hidden" name="authorId" value="${Auth.currentUser._id}">
<input type="hidden" name="targetId" value="${this.target_id}" >

<sl-input label="Topic" type="text" name="topic" placeholder="Topic" required></sl-input>
<sl-input label="Description" type="text" name="text" placeholder="Details" required></sl-input>
<input type="hidden" name="targetType" value=${this.target_type} >

      <sl-button id="report-submit-btn" type="primary" class="submit-btn" submit>Post Report</sl-button>
    </sl-form>`;
  }
});