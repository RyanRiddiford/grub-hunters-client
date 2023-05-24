/**
 * Introduction page when user logs in for first time
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import App from './../../App';
import {html, render } from 'lit-html';
import AuthAPI from '../../services/AuthAPI';
import UserAPI from '../../services/UserAPI';
import enumUtils from '../../utils/enum.utils';

//Introduction page
class IntrodoctionView {


  /**
   * Initialise the view
   */
  init(){
    document.title = 'Introduction';    
    this.render();
    this.unsetIntroFlag();
  }



/**
 * Sets show intro flag for intro page to false
 */
  async unsetIntroFlag() {
            try {
      const updatedUser = await UserAPI.updateById(AuthAPI.currentUser._id, JSON.stringify({"showIntro":false}), true);      
      delete updatedUser.password;       
      AuthAPI.currentUser = updatedUser;     
      AuthAPI.currentUser = updatedUser;
    }catch(err){      
      console.log(err);
    }  
  }


/**
 * Template containing guide for new reviewers
 */
  reviewerTemplate() {

    return html`
    <h1>Reviewer Guide</h1>
    <div class="overview-container">
    <h2>Overview</h2>
    <p>Welcome ${AuthAPI.currentUser.username}.</p> 
     <p>At Grub Hunters, you can view nearby Australian restaurants and make an informed decision on restaurants you dine at!</p> 
     <p>Don't forget to leave helpful reviews on restaurants you visit. </p>
     <p>Your voice can improve and support restaurants, and assist other reviewers in finding good grub!</p>     
    </div>

    <div class="features-container">
    <h2>Current Features</h2>  
    <ul>
      <li>Upload a profile image</li>
      <li>Edit profile details</li>
      <li>Delete your account</li>
      <li>View restaurants and reviews</li>
      <li>Create, edit, and delete restaurant reviews</li>
      <li>Vote on other user reviews</li>
    </ul>
    </div>

    <div class="demerits-container">
    <h2>About Demerits</h2>  
    <ul>
      <li>Breaches in the user guidelines can result in the accumulation of demerit points.</li>
      <li>Having 1 demerit point will result in a one-time warning message.</li>
      <li>Having 2 demerit points will result in a 7-day account suspension.</li>
      <li>Having 3 demerit points will result in an indefinite account ban</li>
    </ul>       
    </div>
    `;

  }

/**
 * Template containing guide for new restaurants
 */
  restaurantTemplate() {
    return html`
    
    <h1>Restaurant Guide</h1>
    <div class="overview-container">
    <h2>Overview</h2>
    <p>Welcome ${AuthAPI.currentUser.resaurantName}.</p> 
      <p>At Grub Hunters, you can better engage with consumers by having them view your profile and engage with reviews!</p>
   
  </div>
    <div class="features-container">
    <h2>Current Features</h2>  
    <ul>
      <li>Upload a profile image</li>
      <li>Edit profile details</li>
      <li>Delete your account</li>
      <li>View restaurants and reviews</li>
      <li>Create, edit, and delete restaurant reviews</li>
    </ul> 
  </div>
    <div class="demerits-container">
    <h2>About Demerits</h2>  
    <ul>
      <li>Breaches in the user guidelines can result in the accumulation of demerit points.</li>
      <li>Having 1 demerit point will result in a one-time warning message.</li>
      <li>Having 2 demerit points will result in a 7-day account suspension.</li>
      <li>Having 3 demerit points will result in an indefinite account ban</li>
    </ul>     
    </div>
    `;
  }


/**
 * Template containing guide for new admins
 */
  adminTemplate() {
    return html`
    
    <h1>Administrator Guide</h1>
    <div class="overview-container">
    <h2>Overview</h2>
    <p>Welcome ${AuthAPI.currentUser.username}.</p>
    <p>At Grub Hunters, you can view nearby Australian restaurants and make an informed decision on restaurants you dine at!</p>
    <p>As an administrator, your main role is to assess report tickets and determine the correct course of action.</p>
  </div>
  <div class="features-container">
    <h2>Current Features</h2>  
    <ul>
      <li>Upload a profile image</li>
      <li>Edit profile details</li>
      <li>View restaurants and reviews</li>
      <li>Assess report tickets</li>
    </ul> 
  </div>
    `;
  }


/**
 * Render the view
 */
  render(){

    let content;

    //Build the reviewer template
    if (AuthAPI.currentUser.accessLevel == enumUtils.accessLevels.reviewer)
    content = this.reviewerTemplate();
    //Build the restaurant template
    else if (AuthAPI.currentUser.accessLevel == enumUtils.accessLevels.restaurant)
    content = this.restaurantTemplate();
    //Build the admin template
    else if (AuthAPI.currentUser.accessLevel == enumUtils.accessLevels.administrator)
    content = this.adminTemplate();


    const template = html`   


    <app-header title="Introduction" user=${JSON.stringify(AuthAPI.currentUser)}></app-header> 
<div class="page-content">
  <div class="intro-guide">
${content}
  </div>

</div>
  
      <app-footer title=${document.title}></app-footer>
    `;

    render(template, App.rootEl);
  }
}


//Export the view
export default new IntrodoctionView();