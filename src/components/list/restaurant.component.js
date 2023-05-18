/**
 * Restaurant Listing Component
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import { LitElement, html } from '@polymer/lit-element';
import gotoRoute from '../../Router';
import App from '../../App';
import AuthAPI from '../../services/AuthAPI';


//Define custom element
customElements.define('restaurant-listing', class RestaurantListing extends LitElement {


  constructor(){
    super();   
  }

  //Configure the element's custom properties
  static get properties(){
    return {
      restaurant: {
        type: Object
      }
    }
  }


  /**
   * Renders a restaurant listing
   * @returns Render of restaurant listing
   */
  render(){  

return html`

<style>

h3 {
  font-size: var(--h3-font-size);
    font-weight:var(--h3-font-weight);
    font-family:var(--heading-font-family);
  color:var(--heading-txt-color);
  margin:10px;
  padding:0px;
  text-align:center;
}
  .bold-text {
    font-size:var(--label-font-size);
  font-weight:var(--label-font-weight);
  }

.restaurant-listing {
  display:flex;
  flex-direction: row;
  width:700px;
  height:250px;
  margin:20px;
  justify-content: space-between;
  box-shadow: var(--main-content-box-shadow);
  border-radius: 20px;
}

.left {
  display:flex;
  flex-direction: column;
   align-items:center;
   justify-content:center;
}

.mid {
  border-left: 4px solid var(--brand-color);
  border-right: 4px solid var(--brand-color);

  overflow-y:scroll;
}

.mid p {  
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
    flex-direction:column;
  width:80vw;
  padding:10px;
  height:200px;
}

.left {
  flex-direction:row-reverse;
  padding:10px;
}

.right {

 align-items:end;
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

  .mid p {
    display:none;
  }

  .right {
    align-items:start;
  }

  
sl-avatar {
  --size: 80px; 
  margin: 1em;
}

  }
  

</style>



<div class="restaurant-listing">



  <div class="left">
     <h3>${this.restaurant.restaurantName}</h3>  
  <sl-avatar image=${(this.restaurant.avatar) ? `${App.apiBase}/images/${this.restaurant.avatar}` : ''}></sl-avatar>
  </div>
  <div class="mid">
  <p>${this.restaurant.bio}</p>
</div>
<div class="right">
<sl-button class="view-btn" @click=${(event) => {
   AuthAPI.currentRestaurant = this.restaurant;
 gotoRoute('/restaurant');
    }}>View Restaurant</sl-button>
</div>
</div>
`;

  }


});