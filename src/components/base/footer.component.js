/**
 * Footer component
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import { LitElement, html, css } from '@polymer/lit-element';
import {anchorRoute, gotoRoute} from '../../Router';
import Auth from '../../services/AuthAPI';
import App from '../../App';


//Define the footer element as a custom element
customElements.define('app-footer', class AppFooter extends LitElement {


  constructor(){
    super();    
  }

  //Configure the element's custom properties
  static get properties(){
    return {
      title: {
        type:String
      }
    }
  }


  firstUpdated(){
    super.firstUpdated(); 
  }

  /**
   * Renders the footer
   * @returns The footer component render
   */
  render(){  
    
    //Return the header component
    return html`

    <style> 
    footer {
    position: fixed;
    width:100%;
    bottom:0px;    
    z-index:1;
    height: 100px;
    background: var(--brand-color);
  }


  
@media all and (max-width: 768px){ 

  footer {
    position: sticky;
   z-index:0;
  }
  
 }

    </style>

<footer>
</footer>
    `;

}
 
});