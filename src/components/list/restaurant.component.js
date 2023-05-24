/**
 * Restaurant Listing Component
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
import App from '../../App';
import AuthAPI from '../../services/AuthAPI';
import enumUtils from '../../utils/enum.utils';


//Define custom element
customElements.define('restaurant-listing', class RestaurantListing extends LitElement {


	constructor() {
		super();
	}

	//Configure the element's custom properties
	static get properties() {
		return {
			restaurant: {
				type: Object
			}
		};
	}


	/**
	 * Renders a restaurant listing
	 * @returns Render of restaurant listing
	 */
	render() {

		return html `

<style>

h3 {
     font-size: var(--h3-font-size);
     font-weight:var(--h3-font-weight);
     font-family:var(--heading-font-family);
     color:var(--light-txt-color);
     margin:10px;
     padding:0px;
     text-align:left;
}
 .bold-text {
     font-size:var(--label-font-size);
     font-weight:var(--label-font-weight);
}
 .info-header {
    font-size:1.3rem;
    color:var(--light-txt-color);
    background:var(--secondary-brand-color);
    text-align:center;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
 }
 .restaurant-listing {
     display:flex;
     flex-direction: column;
     width:500px;
     margin:20px;
     box-shadow: var(--main-content-box-shadow);
     border-radius: 20px;
}

.restaurant-listing .top {
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    padding-left:20px;
    padding-right:20px;

    background:var(--secondary-brand-color);
    border-top-left-radius:20px;
    border-top-right-radius:20px;
}


.restaurant-listing .bot {
    display:flex;
    flex-direction:row;
align-items:center;
gap:50px;
padding:20px;
}


 .restaurant-listing .bot .left {
     display:flex;
     flex-direction: column;
     align-items:center;
     justify-content:center;
     box-shadow:var(--main-content-box-shadow);
}
.restaurant-listing .bot .mid {
     display:flex;
     flex-direction:column;
     box-shadow:var(--main-content-box-shadow);
     border-radius:10px;
}
.restaurant-listing .bot .mid .info-container {
    padding:20px;
}
 sl-button {
     padding:10px;
}
 sl-button::part(base) {
     font-size:1rem;
     font-weight:600;
}
 sl-avatar {
     --size: 100px;
     margin:10px;
}
 @media all and (max-width: 768px){
     .restaurant-listing {
         width:80vw;
    }
     sl-button {
         width:100%;
         height:100px;
    }
     sl-button::part(base) {
         font-size:1rem;
         font-weight:600;
    }
     .mid {
         border:none;
         margin:0;
         padding:0;
    }
     sl-avatar {
         --size: 80px;
         margin: 1em;
    }
}

  

</style>



<div class="restaurant-listing">

<div class="top">
  <h3>${this.restaurant.restaurantName}</h3> 
  <sl-button class="view-btn" @click=${(event) => {
   AuthAPI.currentRestaurant = this.restaurant;
   localStorage.setItem("currentRestaurant", JSON.stringify(AuthAPI.currentRestaurant));
 gotoRoute('/restaurant');
    }}>View Restaurant</sl-button>
</div>


<div class="bot">

  <div class="left"> 
     ${AuthAPI.currentRestaurant && AuthAPI.currentRestaurant.avatar ? html` <sl-avatar shape="rounded"
		image=${
			(AuthAPI.currentRestaurant && AuthAPI.currentRestaurant.avatar) ? `${enumUtils.BUCKET_URI}/${AuthAPI.currentUser.avatar}` : ''
		} > </sl-avatar>
		`:html` <sl-avatar shape="rounded"></sl-avatar>
		`}
  </div>

  <div class="mid">
    <div class="bold-text info-header">Information</div>
  <div class="info-container">
    <div><span class="bold-text">Location </span>${this.restaurant.location}</div>
  <div><span class="bold-text">Cuisine </span>${this.restaurant.cuisine}</div>
  </div>
</div>



</div>

</div>

`;

	}


});