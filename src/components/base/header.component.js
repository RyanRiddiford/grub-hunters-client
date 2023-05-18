/**
 * Header component
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import { LitElement, html, css } from '@polymer/lit-element';
import {anchorRoute, gotoRoute} from '../../Router';
import Auth from '../../services/AuthAPI';
import App from '../../App';
import enumUtils from '../../utils/enum.utils';
import mascot from '../../views/partials/mascot.partial';
import gsap from 'gsap';

//Define the header element as a custom element
customElements.define('app-header', class AppHeader extends LitElement {


  constructor(){
    super()    
  }

  //Configure the element's custom properties
  static get properties(){
    return {
      title: {
        type: String
      },
      user: {
        type: Object
      }
    }
  }


  /**
   * Runs on first update of the component
   */
  firstUpdated(){
    super.firstUpdated();
    //Setup navigation active link handling
    this.navActiveLinks();    
    //Setup header mascot animation
    this.initMascotAnim(this.shadowRoot.querySelectorAll('.header-logo-container'));
  }

  initMascotAnim(headerLogos) {
    //Timeline options
    let tlOptions = {
      //Repeats indefinitely
       repeat:-1, 
       //Loops animation by alternating direction
       yoyo:true,
       //Set default tween variables
       defaults: {
        ease:'power0',
        duration:0.5
       }
    }

    //Initialise timeline
var mascotTimeline = gsap.timeline(tlOptions);

//Find mascot body part elements
const firstBody = this.shadowRoot.querySelectorAll('.body-part-one');
const secondBody = this.shadowRoot.querySelectorAll('.body-part-two');
const thirdBody = this.shadowRoot.querySelectorAll('.body-part-three');
const fourthBody = this.shadowRoot.querySelectorAll('.body-part-four');
const fifthBody = this.shadowRoot.querySelectorAll('.body-part-five');
//Find mascot eyes
const leftEye = this.shadowRoot.querySelectorAll('.left-eye');
const rightEye = this.shadowRoot.querySelectorAll('.right-eye');

//Add animation for body parts (from left --> right)
mascotTimeline.to(firstBody,
  {
    translateX:2,
    translateY:34,
  },
  //All tweens start at the beginning of the timeline
  0
  );
  mascotTimeline.to(secondBody,
  {
    translateX:20,
    translateY:30,
  },
    0
  );
  mascotTimeline.to(thirdBody,
  {
    translateX:44,
    translateY:28,
  },
    0
);
mascotTimeline.to(fourthBody,
  {
    translateX:64,
    translateY:26,
  },
    0
  );
  mascotTimeline.to(fifthBody,
  {
    translateX:87,
    translateY:24,
  },
    0
  );
//Add animation for eyes
mascotTimeline.to(leftEye,
  {
    translateX:98,
    translateY:38,
  },
    0
  );
 mascotTimeline.to(rightEye,
    {
      translateX:118,
      translateY:38,
    },
      0
    );

    //Pause mascot animation by default
  mascotTimeline.pause();

  //Add hover events for animating header mascot
  for (let item of headerLogos) {
    //When mouse enters, start mascot animation
    item.addEventListener('mouseenter', (event) => {
      mascotTimeline.play();
    });
    //When mouse leaves, end mascot animation
         item.addEventListener('mouseleave', (event) => {
          mascotTimeline.restart();
mascotTimeline.pause();
         });
  }

}

  /**
   * Adds selector for active navigation link
   */
  navActiveLinks() {	
    const currentPath = window.location.pathname;
    const navLinks = this.shadowRoot.querySelectorAll('.nav-links a');
    navLinks.forEach(navLink => {
      if(navLink.href.slice(-1) == '#') return;
      if(navLink.pathname === currentPath){			
        navLink.classList.add('active');
      }
    });
  }


  /**
   * Renders the top header component
   * @returns The top header component
   */
  render(){  
    //Stores the available header links
    let headerLinks;



if (this.user)
          //Setup reviewer and restaurant level navigation
    if (this.user.accessLevel == enumUtils.accessLevels.reviewer || this.user.accessLevel == enumUtils.accessLevels.restaurant) {
headerLinks = html`
<a href="/search" @click="${anchorRoute}">Search Restaurants</a> 
<a href="/reviews" @click="${anchorRoute}">Your Reviews</a> 
<a href="/profile" @click="${anchorRoute}">Your Profile</a> 
`;
    }
    //Setup admin level navigation
    else if (this.user.accessLevel == enumUtils.accessLevels.administrator) {
      headerLinks = html`
      <a href="/search" @click="${anchorRoute}">Search Restaurants</a> 
      <a href="/active-tickets" @click="${anchorRoute}">Search Tickets</a> 
      <a href="/profile" @click="${anchorRoute}">Your Profile</a> 
      `;
    }


    //Return the header component
    return html`

    <style>


h1 {
  font-size: var(--h1-font-size);
    font-weight:var(--h1-font-weight);
    font-family:var(--heading-font-family);
  color:var(--light-txt-color);
  margin:0;
}



    header {
      overflow: hidden;
      position:fixed;
      top:0;
      z-index: 1;
       width:100%;
      height: 150px;
      background: var(--brand-color);
        display:flex;
       flex-direction:row;
      justify-content: space-between; 
       align-items: center;
       margin-bottom: 50px;
       padding:10px;
    }

.header-logo {
  color:var(--heading-txt-color);
  text-align: center;
  text-decoration: none;
}

    .header-logo-container {
      display:flex;
      flex-direction:column;
      align-items:center;
    }


p, span, a {
  font-family:var(--txt-font-family);
}
    


    nav {    
      display: flex;
      flex-direction: row;
      align-items:center;
      justify-content:space-between;
      padding-right:20px;
      width:500px;
    }

    .nav-links {
      display: flex;
      flex-direction: row;
      width:500px;
      gap:5px;
    }

   .nav-links a {
      display:flex;
      flex-direction:column;
      width:140px;
      height: 50px;
      background: #FFFFFF;
      margin-left: 15px;
      margin-right: 15px;
      padding:5px;
      border-radius: 20px;
      text-align: center;
      justify-content: center;
      font-weight: var(--nav-font-weight);
      font-size: var(--nav-font-size);
      color:var(--base-txt-color);
    }

    .nav-links a, .header-logo {
      text-decoration:none;
    }

    .signout-link {
      font-size:var(--signout-font-size);
      font-weight:var(--signout-font-weight);
      color:var(--light-txt-color);
          align-self:start;
          position:fixed;
          top:10px;
          right:20px;
    }






    .active {
      background:var(--secondary-brand-color);
    }


    /* RESPONSIVE - MOBILE -------------------*/
@media all and (max-width: 768px)  { 

  .header-logo h1 {
    display:none;
  }

  .header-logo {
    float: none;
    display: block;
  }

  nav {
    width:100vw;
    justify-content:center;
  }

  .nav-links {
    width:100%;
  }



  header {
    display:flex;
    flex-direction:column;
    gap:5px;
    padding:5px;
  }


  .signout-link {
    margin-left:15px;
  }

  }



    </style>

    <header class="app-header">
    ${localStorage.getItem('accessToken') ? 
    html` 

    <a class="header-logo" href="/" 
    @click="${() => {document.querySelector('.active').classList.remove('active');anchorRoute} }">
    <div class="header-logo-container">
    ${mascot}
   <h1>Grub Hunters</h1>
  </div>
</a>

        <nav class="app-top-nav">  
          <div class="nav-links">
     ${headerLinks}       
          </div>    
    </nav>
    <a class="signout-link" href="#" @click="${() => Auth.signOut()}">Sign Out</a>
    ` :
    html`
    
    <style>
  header {
             margin:0;   
      justify-content:center;        
  }
    </style>

    
    <div class="header-logo-container">${mascot}<h1>Grub Hunters</h1></div>`
  }  
</header>
    `
  }
})