/**
 * Review listing component
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import {
	LitElement, html, css
}
from '@polymer/lit-element';
import {
	anchorRoute, gotoRoute
}
from '../../Router';
import AuthAPI from '../../services/AuthAPI';
import App from '../../App';
import ReviewAPI from '../../services/ReviewAPI';
import Toast from '../../Toast';
import enumUtils from '../../utils/enum.utils';


//Define custom element
customElements.define('report-listing', class ReportListing extends LitElement {

	constructor() {
		super();
	}


	//Configure the element's custom properties
	static get properties() {
		return {
      index: {
        type: Number
      },
      currentTarget: {
        type:Object
      },
      currentReport: {
        type:Object
      }
		};
	}



	firstUpdated() {
    console.log("first updated");
		this.render();
	}






	/**
	 * Renders report listing
	 * @returns Render of report listing
	 */
	render() {

		return html `

<style>

.bold-text {
     font-size:var(--label-font-size);
     font-weight:var(--label-font-weight);
}
 .report-listing {
     display:flex;
     flex-direction: row;
     width:400px;
     margin:20px;
     max-width:80vw;
     padding:10px;
     justify-content: space-between;
     box-shadow: var(--main-content-box-shadow);
     border-radius: 20px;
}
 .left, .mid, .right {
     display:flex;
     flex-direction: column;
     align-items:center;
}
 .right {
     justify-content:center;
}
 sl-button {
     width:100px;
}
 sl-button::part(base) {
     font-size:1rem;
     font-weight:600;
}


</style>


<div class="report-listing">
  <div class="left">
    <span class="bold-text">Topic: ${AuthAPI.reportPage[this.index].topic}</span>
  </div>
  <div class="mid">
  <span class="bold-text">${AuthAPI.reportPage[this.index].status}</span>  
</div>
<div class="right">
    <sl-button class="view-btn" @click=${(event) => {
      AuthAPI.currentReport = AuthAPI.reportPage[this.index];
      AuthAPI.currentTarget = AuthAPI.targets[this.index];

      localStorage.setItem("currentReport", JSON.stringify(AuthAPI.reportPage[this.index]));
      localStorage.setItem("currentTarget", JSON.stringify(AuthAPI.targets[this.index]));

      gotoRoute('/report');
    }}>View Report</sl-button>
</div>
</div>`;

	}


});