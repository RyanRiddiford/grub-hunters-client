/**
 * Restaurant profile component
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import { LitElement, html, css, TemplateResult } from '@polymer/lit-element';
import {anchorRoute, gotoRoute} from '../../Router';
import AuthAPI from '../../services/AuthAPI';
import App from '../../App';
import enumUtils from '../../utils/enum.utils';
import UserAPI from '../../services/UserAPI';
import ReviewAPI from '../../services/ReviewAPI';


//Define custom element
customElements.define('restaurant-profile', class RestaurantProfile extends LitElement {


  constructor(){
    super();   
  }

    //Configure the element's custom properties
    static get properties(){
      return {
        is_visitor: {
          type: String
        },
        is_report: {
type:String
        },
        restaurant: {
          type: Object
        },
        avgRating: {
          type: String
        },
        numReviewsMsg: {
          type: String
        },
        ratingDisplayTemplate: {
          type:TemplateResult
        }
      }
    }



    /**
     * Build average rating template and re-render after first component update
     */
    firstUpdated(){
      super.firstUpdated(); 
      this.getAvgRating();
      this.render();
    }


    /**
     * Find and setup template for average restaurant rating
     */
    async getAvgRating() {
      const data = await ReviewAPI.getAvgReviewScore(this.restaurant._id);
      this.avgRating = data.avgRating;
      this.numReviewsMsg = data.message;
      this.ratingDisplayTemplate = this.buildRatingDisplay();
    }




    /**
     * Builds template for average rating display
     * @returns Template for average rating display
     */
  buildRatingDisplay() {
//Render no rating display
if(this.avgRating == 0) {
    return html`
  <style>
    .rating-display {
      background:var(--no-rating);
      
    }
  </style>
  <span class="rating-display-text">N/A</span>`;
}
    //Render low rating display
else if (this.avgRating < 5 && this.avgRating > 0)
return html`
<style>
  .rating-display {
    background:var(--low-rating);
  }

</style><span class="rating-display-text">${this.avgRating}/10</span>`;
//Render mid rating display
else if (this.avgRating >= 5 && this.avgRating < 6.9)
return html`
<style>
  .rating-display {
    background:var(--mid-rating);
  }
</style><span class="rating-display-text">${this.avgRating}/10</span>`;
//Render high rating display
else if (this.avgRating >= 7)
return html`
<style>
  .rating-display {
    background:var(--high-rating);
  }
</style><span class="rating-display-text">${this.avgRating}/10</span>`;
  }

    /**
   * 
   * @returns Render of restaurant profile component
   */
    render() {  

      let demeritDisplay = html``;
      let deleteAccountBtn = html``;
      let reportAccountBtn = html``;
      let editProfileBtn = html``;

      //Render UI if this is your profile
      if (this.is_visitor == "false") {  

        demeritDisplay = html`
           <div class="point-display"><span class="bold-text">Demerits </span><span>${AuthAPI.currentUser.demerits}</span></div>
        `;

        deleteAccountBtn = html`
                  <sl-button id="delete-btn" @click="${() => this.shadowRoot.getElementById('delete-dialog').show()}">Delete Account</sl-button>      
        `;

editProfileBtn = html`
        <sl-icon-button id="edit-btn" name="pencil" label="Edit Profile" style="font-size: 2rem;" @click=${()=> gotoRoute('/edit-profile')}></sl-icon-button>
`;

      }
      //Render UI if this is not your profile
      else if (this.is_visitor == "true" && AuthAPI.currentUser._id != this.restaurant._id) {
//If this isn't flagged content on a report
        if (!this.is_report) { 
        reportAccountBtn = html`
        <sl-button id="report-btn" @click="${() => this.shadowRoot.getElementById('report-dialog').show()}">Report</sl-button>      
        `;
        }


      }


      let restaurantInfo = html``;
          
          
            restaurantInfo = html`
          
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
  .info-label, .rating-display-text {
    font-size:var(--label-font-size);
  font-weight:var(--label-font-weight);
  }

  .rating-display-text {
margin: 0 auto;
    }



            #restaurant-info {
            display: flex;
            flex-direction: column;
          align-items: center;
          justify-content: center;
          align-self: center;
          width: 900px;
          border: 4px solid var(--brand-color);
             padding:20px;
             gap:20px;
          border-radius:20px;
          }
          
          
            .top {
              display:flex;
              flex-direction: row;
            justify-content:space-between;
              align-items: center;
              padding-right:20px;
            }

            .mid {
              display:flex;
              flex-direction:row;
              align-items:start;
              gap:20px;
              padding-left:20px;
            }



            .rating-container {
                       display:flex;
              flex-direction:column;
              align-items:center;    
              padding:10px;
              box-shadow: var(--main-content-box-shadow); 
            }


            .rating-container h3 {
              margin-top:5px;
              text-align:center;
            }

            .rating-display {
              display:flex;
  flex-direction:column;
  justify-content:center;
  width:100px;
  height:100px;
  border:4px solid var(--brand-color);
  border-radius:80px;
  text-align:center; 
            }



            .point-display {
  display:flex;
  flex-direction:row;
  justify-content:center;
  gap:15px;
  width:150px;
  height:auto;
  background: var(--brand-color);
  color:var(--light-txt-color);
  margin-top:5px;
  margin-bottom:5px;
  padding:5px;
  padding-left:10px;
  border-radius:20px;
}
          
            .bot {
          display:flex;
          flex-direction:row;
          justify-content:center;
          gap:50px;
            }
          
          
            .bio-container {
              box-shadow: var(--main-content-box-shadow);
          width:60%;
          padding:20px;
            }
          
          
            .profile-info {
              box-shadow: var(--main-content-box-shadow);
              padding:20px;
            }

            ul {
              padding:0;
            }

            li {
              list-style-type:none;
              margin-top:5px;
              margin-bottom:5px;
            }


            #edit-btn {
              align-self:start;
            }




            #delete-btn {
  /*Right-align element to parent */
  margin-left: auto; 
margin-right: 0;

width:150px;
padding:5px;
height: auto;
text-align:center;
margin-top:40px;

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

sl-avatar {
  --size: 200px; 
  margin-bottom: 1em;
}







@media all and (max-width: 1000px){ 

  #restaurant-info {
          width: 90vw;
             border: none;
          }
        
          .bot {
            flex-direction:column-reverse;
            align-items:center;
          }

          .bio-container, .profile-info {
          width:80%;
            }


}


          </style>



<sl-dialog id="delete-dialog" label="Confirmation">
  <span>Are you sure you want to permanently delete your account?</span>
  <sl-button @click="${() => {this.shadowRoot.getElementById('delete-dialog').hide(); UserAPI.deleteById(AuthAPI.currentUser._id);}}" slot="footer">Yes</sl-button>
  <sl-button @click="${() => this.shadowRoot.getElementById('delete-dialog').hide()}" slot="footer">No</sl-button>
</sl-dialog>

<sl-dialog id="report-dialog" label="Submit Report">
  <report-form title=${document.title} target_id=${this.restaurant._id} target_type=${enumUtils.reportTargetType.restaurant} ></report-form>
</sl-dialog>
          
          
          
          <div id="restaurant-info">

            <div class="top">   
             <h1>${this.restaurant.restaurantName}</h1> 
              ${reportAccountBtn}
              ${editProfileBtn}
    </div>

    <div class="mid">
    ${AuthAPI.currentUser && AuthAPI.currentUser.avatar ? html`
                   <sl-avatar shape="rounded" image=${(AuthAPI.currentUser && AuthAPI.currentUser.avatar) ? `${enumUtils.BUCKET_URI}/${AuthAPI.currentUser.avatar}` : ''}></sl-avatar>
                 `:html`
                 <sl-avatar shape="rounded"></sl-avatar>
                 `}
                 <div class="rating-container">
                <div class="rating-display">${this.ratingDisplayTemplate}</div>
                <span class="rating-display-text">${this.numReviewsMsg}</span>
              </div>
    </div>         
        

            <div class="bot">
              <div class="bio-container">
                <h3>About Us</h3>
                <p>${this.restaurant.bio}</p>
</div>
                <div class="profile-info">
                 <h3>Business Information</h3>
                <ul>
                  <li><span class="info-label">Cuisine </span>${this.restaurant.cuisine}</li>
                  <li><span class="info-label">Address </span>${this.restaurant.location}</li>
                  <li><span class="info-label">Contact </span>${this.restaurant.phoneNumber}</li>
                  <li><span class="info-label">Established </span>${this.restaurant.established}</li>
                </ul>
                ${demeritDisplay}                 
                </div>
</div>
 ${deleteAccountBtn}
          </div>       
      `;
  
      
                return restaurantInfo;
        
      
        }


});