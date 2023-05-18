/**
 * Administrator profile component
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import { LitElement, html, css } from '@polymer/lit-element';
import {anchorRoute, gotoRoute} from '../../Router';
import AuthAPI from '../../services/AuthAPI';
import App from '../../App';
import moment from 'moment';
import UserAPI from '../../services/UserAPI';


//Define custom element
customElements.define('admin-profile', class AdminProfile extends LitElement {


  constructor(){
    super();   
  }


  /**
   * 
   * @returns Render of admin profile component
   */
  render() {  

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


    
    .profile {
        display:flex;
        flex-direction: column;
        justify-content:center;
        width: 700px;
        align-items: center;
        border: 4px solid var(--brand-color);
        background:var(--body-bg);
        margin:auto;
        border-radius: 20px;
        padding:30px;
       
      }
    
    
      .bold-text {
        font-weight: 700;
      }
    
    
      .top {
        display:flex;
        flex-direction:row;
        width:600px;
        justify-content:space-between;
      }
    
    .mid {
      display:flex;
      flex-direction:row;
      align-items:top;
      gap:30px;
      margin-bottom:20px;
    }
    
    .main-info {
      display:flex;
      flex-direction:column;
      box-shadow: var(--main-content-box-shadow);
    width: 300px;
    border-radius:20px;
    padding:30px;
    }
    
    .bot {
      display:flex;
      flex-direction:column;
      gap:50px;
    }
    
    .bio-display {
     display:flex;
     flex-direction:column; 
     box-shadow: var(--main-content-box-shadow);
     width:600px;
     border-radius:20px;
     padding:30px;
    }
    
    .bio-display h3 {
      text-align:left;
      margin-bottom:0px;
    }
    
    p {
      overflow-y: scroll;
    }
    
    a {
      text-decoration:none;
      color:var(--base-txt-color);
      font-weight:700;
    }
    
    
    .point-display {
      display:flex;
      flex-direction:row;
      justify-content:center;
      gap:15px;
      width:150px;
      height:auto;
      background: var(--brand-color);
      color:#FFFFFF;
      margin-top:5px;
      margin-bottom:5px;
      padding:5px;
      padding-left:10px;
      border-radius:20px;
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



    @media all and (max-width: 768px){ 

.profile {
  display:flex;
  flex-direction: column;
  justify-content:center;
  width: 100vw;
  align-items: center;
  border:none;
  border-radius:0px;
  padding:20px;
}

.top {
  width:90%;
}

.mid {
display:flex;
flex-direction:column;
width:90%;
align-items:left;
}

.bot {
width:90%;
gap:100px;
}

.bio-display {
width:90%;
border-radius:20px;
padding:20px;
}


}


  
    
    </style>
    
    
              <div class="profile">
          <div class="top">
            <h1>Your Profile</h1>
            <sl-icon-button name="pencil" label="Edit Profile" style="font-size: 2rem;" @click=${()=> gotoRoute('/edit-profile')}></sl-icon-button>
          </div>
          
          <div class="mid">
                 ${AuthAPI.currentUser && AuthAPI.currentUser.avatar ? html`
                   <sl-avatar shape="rounded" style="--size: 200px; margin-bottom: 1em;" image=${(AuthAPI.currentUser && AuthAPI.currentUser.avatar) ? `${App.apiBase}/images/${AuthAPI.currentUser.avatar}` : ''}></sl-avatar>
                 `:html`
                 <sl-avatar shape="rounded" style="--size: 200px; margin-bottom: 1em;"></sl-avatar>
                 `}
                 <div class="main-info">
                  <div><span class="bold-text">Username </span><span>${AuthAPI.currentUser.username}</span></div>
                  <div><span class="bold-text">Name </span><span>${AuthAPI.currentUser.firstName} ${AuthAPI.currentUser.lastName}</span></div>
                  <div><span class="bold-text">Email </span><span>${AuthAPI.currentUser.email}</span></div>
                 </div>
          </div>
          <div class="bot">
            <div class="bio-display"><h3>Bio</h3>
            <p>${AuthAPI.currentUser.bio}</p></div>
  
          </div>
        </div>
    
                
        `;
    
      }


});