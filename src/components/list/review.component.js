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
import App from '../../App';
import AuthAPI from '../../services/AuthAPI';
import ReviewAPI from '../../services/ReviewAPI';
import Toast from '../../Toast';
import UserAPI from '../../services/UserAPI';
import enumUtils from '../../utils/enum.utils';


//Define custom element
customElements.define('review-listing', class ReviewListing extends LitElement {


	constructor() {
		super();
	}


	//Configure the element's custom properties
	static get properties() {
		return {
			review: {
				type: Object
			},
			restaurant_name: {
				type: String
			},
			upvotes: {
				type: Number
			},
			downvotes: {
				type: Number
			},
			is_report: {
				type: String
			},
			index: {
				type: undefined
			}
		};
	}


	firstUpdated() {
		super.firstUpdated();
		//Find restaurant name of review if it is undefined
		if (!this.restaurant_name)
			this.getRestaurantName();
		//Set initial vote count displays for the listing
		this.upvotes = this.review.upvotes;
		this.downvotes = this.review.downvotes;
	}

	/**
	 * Get the restaurant's name for the review
	 */
	async getRestaurantName() {
		const data = await UserAPI.getRestaurantName(AuthAPI.currentTarget.restaurantId);
		this.restaurant_name = data.restaurantName;
	}


	/**
	 * Updates the review
	 * @param {*} e Event object 
	 */
	async updateReviewSubmitHandler(e) {
		e.preventDefault();
		const formData = e.detail.formData;
		try {
			const response = await ReviewAPI.updateById(this.review._id, formData, false);
			Toast.show('Review created');
			this.shadowRoot.getElementById('edit-dialog').hide();
		} catch (err) {
			Toast.show(err, 'error');
		}
	}



	/**
	 * Builds template for review rating display
	 * @returns Template of rating display
	 */
	buildRatingDisplay() {
		//Render low rating display
		if (this.review.rating < 5 && this.review.rating > 0)
			return html`
    <style>
      .rating-display {
        background:var(--low-rating);
      }
</style>
<div class="rating-display"><span class="rating-display-text">${this.review.rating}/10</span></div>`;
		//Render mid rating display
		else if (this.review.rating >= 5 && this.review.rating < 6.9)
			return html`
<style>
  .rating-display {
    background:var(--mid-rating);
  }
</style>
<div class="rating-display"><span class="rating-display-text">${this.review.rating}/10</span></div>`;
		//Render high rating display
		else if (this.review.rating >= 7)
			return html`
<style>
  .rating-display {
    background:var(--high-rating);
  }
</style>
<div class="rating-display"><span class="rating-display-text">${this.review.rating}/10</span></div>`;

	}



	/**
	 * Builds template for review actions (edit/delete/report)
	 * @returns Template of review actions
	 */
	buildReviewActions() {
		//Build actions for author
		if (AuthAPI.currentUser._id == this.review.authorId) {
			return html`       
      <sl-button id="edit-btn" @click="${() => this.shadowRoot.getElementById('edit-dialog').show()}">Edit</sl-button>  
 <sl-button id="delete-btn" @click="${() => this.shadowRoot.getElementById('delete-dialog').show()}">Delete</sl-button>`;
		}
		//Build actions for non-authors and not viewed in report
		else if (AuthAPI.currentUser._id != this.review.authorId && this.is_report != "true") {
			return html`<sl-button id="report-btn" @click="${() => this.shadowRoot.getElementById('report-dialog').show()}">Report</sl-button>`;
		}
	}

	/**
	 * Upvotes/Downvotes a review
	 * @param {*} vote 
	 * @param {*} review 
	 */
	async voteReview(vote) {
		//Upvote the review, remove downvote if it exists
		if (vote == "upvote") {
			this.review.upvotes++;
			this.review.upvoters.push(AuthAPI.currentUser._id);
			this.upvotes++;
			//Remove downvote if it exists
			if (this.review.downvoters.includes(AuthAPI.currentUser._id)) {
				this.review.downvotes--;
				this.review.downvoters = this.review.downvoters.slice(AuthAPI.currentUser._id, -1);
				this.downvotes--;
			}
			//Disable upvoting, enable downvoting
			this.shadowRoot.getElementById('downvote-btn').removeAttribute('disabled');
			this.shadowRoot.getElementById('upvote-btn').setAttribute('disabled', '');
		}
		//Downvote the review, remove upvote if it exists
		else if (vote == "downvote") {
			this.review.downvotes++;
			this.review.downvoters.push(AuthAPI.currentUser._id);
			this.downvotes++;
			//Remove upvote if it exists
			if (this.review.upvoters.includes(AuthAPI.currentUser._id)) {
				this.review.upvotes--;
				this.review.upvoters = this.review.upvoters.slice(AuthAPI.currentUser._id, -1);
				this.upvotes--;
			}
			//Disable downvoting, enable upvoting
			this.shadowRoot.getElementById('upvote-btn').removeAttribute('disabled');
			this.shadowRoot.getElementById('downvote-btn').setAttribute('disabled', '');
		} else
			return;

		//Update the review with updated voting fields
		await ReviewAPI.updateById(this.review._id, JSON.stringify(this.review), true);

	}



	/**
	 * Builds template of vote display
	 * @returns Template of vote display
	 */
	buildVoteDisplay() {
		//Disable voting for author and as flagged content in report
		if (this.review.authorId == AuthAPI.currentUser._id || this.is_report == "true") {
			return html`    
      <div class="vote-container"><sl-button id="upvote-btn" disabled>Upvote</sl-button><div>Upvotes: ${this.review.upvotes}</div></div>
  <div class="vote-container"><sl-button id="downvote-btn" disabled>Downvote</sl-button><div>Downvotes: ${this.review.downvotes}</div></div>`;
		}
		//Enable voting for non-authors 
		else {
			return html`
      ${(this.review.upvoters.includes(AuthAPI.currentUser._id) ? 
        html` <div class="vote-container">
			<sl-button id="upvote-btn"
			disabled @click=${() => {this.voteReview('upvote');}}>Upvote</sl-button>
			<div>Upvotes: ${this.review.upvotes}</div>
		</div>` : 
        html` <div class="vote-container">
			<sl-button id="upvote-btn" @click=${() => {this.voteReview('upvote');}}>Upvote</sl-button>
			<div>Upvotes: ${this.review.upvotes}</div>
		</div>`)}
      
        ${(this.review.downvoters.includes(AuthAPI.currentUser._id) ? 
        html`<div class="vote-container">
			<sl-button id="downvote-btn" disabled @click=${()=>{this.voteReview('downvote');}}>Downvote</sl-button>
			<div>Downvotes: ${this.review.downvotes}</div>
		</div>` : 
        html`<div class="vote-container">
			<sl-button id="downvote-btn" @click=${() => {this.voteReview('downvote');}}>Downvote</sl-button>
			<div>Downvotes: ${this.review.downvotes}</div>
		</div>`)}`;
		}
	}




	/**
	 * Renders review listing
	 * @returns Render of review listing
	 */
	render() {

 let reviewArr = JSON.parse(localStorage.getItem("restaurantReviews"));
		if (this.index && this.review == undefined) {
	this.review = reviewArr[this.index];
}

		//Review actions if the user authored the review
		const reviewActions = this.buildReviewActions();
		//Review rating UI display
		let ratingDisplay = this.buildRatingDisplay();
		//Upvote and downvote UI display
		let voteDisplay = this.buildVoteDisplay();


		return html`

<style>


p {
     font-family: var(--base-font-family);
     font-weight: 300;
}
 h1,h2,h3 {
     margin: 0 0 .5em;
     color: var(--heading-txt-color);
}
 h1 {
     font-size: var(--h1-font-size);
     font-weight:var(--h1-font-weight);
     font-family:var(--heading-font-family);
}
 h2 {
     font-size: var(--h2-font-size);
     font-weight:var(--h2-font-weight);
     font-family:var(--heading-font-family);
}
 h3 {
     font-size: var(--h3-font-size);
     font-weight:var(--h3-font-weight);
     font-family:var(--heading-font-family);
}
 .rating-display {
     display:flex;
     flex-direction:column;
     justify-content:center;
     width:80px;
     height:80px;
     border:4px solid var(--brand-color);
     border-radius:80px;
     text-align:center;
}
 .review-listing {
     display:flex;
     flex-direction: column;
     width:500px;
     margin:10px;
     justify-content: space-evenly;
     align-items:center;
     box-shadow: var(--main-content-box-shadow);
     border-radius: 10px;
}
 .top {
     display:flex;
     flex-direction: row;
     width:100%;
     margin:20px;
     justify-content: space-evenly;
     align-items:center;
     padding-bottom:20px;
     border-bottom:var(--main-content-border);
}
 .bot {
     display:flex;
     flex-direction:column;
     width:100%;
}
 .bot h3, .bot p {
     padding-left:20px;
     padding-right:20px;
     text-align:left;
}
 .top .left .bot {
     display:flex;
     flex-direction:row;
     gap:10px;
}
 .top .right {
     display:flex;
     flex-direction:column;
     justify-content:left;
     gap:20px;
}
 #delete-btn {
    /*Right-align element to parent */
     margin-left: auto;
     margin-right: 0;
     width:150px;
     padding:5px;
     height: auto;
     text-align:center;
}
 #delete-btn::part(base) {
     background:red;
     border: 2px solid black;
     border-radius:10px;
     color:black;
     font-weight:600;
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
 sl-form {
     align-items:center;
}
 sl-input::part(input) {
     font-size:var(--input-font-size);
     font-weight:var(--input-font-weight);
}
 sl-input, sl-range::part(form-control-label) {
     --label-width:6rem;
     --gap-width:2rem;
     margin-top: var(--sl-spacing-medium);
}
 label, sl-input, sl-range {
     font-size:var(--label-font-size);
     font-weight:var(--label-font-weight);
}
 sl-input::part(form-control-label), sl-range::part(form-control-label) {
     text-align: right;
     align-self: center;
     margin-right:20px;
}
 sl-input::part(form-control) {
     display:grid;
     grid: auto / var(--label-width) 1fr;
     gap: 20px;
}
 .info-label, .rating-display-text {
     font-size:var(--label-font-size);
     font-weight:var(--label-font-weight);
}
 @media all and (max-width: 1000px){
     .review-listing {
         width:90vw;
    }
     .top .right {
         gap:10px;
    }
     sl-button, #delete-btn {
         width:100px;
         padding:10px;
    }
}



</style>


<sl-dialog id="edit-dialog" label="Edit Review" class="dialog-overview">
<sl-form class="page-form" @sl-submit=${this.updateReviewSubmitHandler.bind(this)} enctype="multipart/form-data">
 
 <sl-input label="Title" type="text" name="title" placeholder="Title" value=${this.review.title} required></sl-input>
 <sl-input label="Description" type="text" name="text" placeholder="Text" value=${this.review.text} required></sl-input>
 <label for="name">Rating
 <sl-range min="0.1" max="10" step="0.1" name="rating" value=${this.review.rating} required></sl-range>  
 </label>

             <sl-button type="primary" class="submit-btn" submit>Update Review</sl-button>
           </sl-form>
</sl-dialog>


<sl-dialog id="delete-dialog" label="Confirmation" class="dialog-overview">
  <span>Are you sure you want to permanently delete this review?</span>
  <sl-button @click="${() => {this.shadowRoot.getElementById('delete-dialog').hide(); ReviewAPI.deleteById(this.review._id);}}" slot="footer">Yes</sl-button>
  <sl-button @click="${() => this.shadowRoot.getElementById('delete-dialog').hide()}" slot="footer">No</sl-button>
</sl-dialog>



<sl-dialog id="report-dialog" label="Report Review" class="dialog-overview">
<report-form title=${document.title} target_id=${this.review._id} target_type=${enumUtils.reportTargetType.review}></report-form>
</sl-dialog>



<div class="review-listing">
  <div class="top">

<div class="left"> 

    ${this.restaurant_name ? html` <div class="target-details"><h3>${this.restaurant_name}</h3></div> ` : html``}
    <div class="bot">
      <div class="left">
 ${voteDisplay}       
      </div>
${ratingDisplay}
    </div>

  </div>

<div class="right">
${reviewActions}
</div>  
  </div>


  <div class="bot">
<h3>${this.review.title}</h3>
<p>${this.review.text}</p>
</div>

</div>
`;

	}


});