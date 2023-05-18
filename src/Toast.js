/**
 * Toaster notification
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

//Import dependencies
import { gsap } from 'gsap';

//Toast notification
export default class Toast {

  /**
   * Initialise the Toast object
   */
  static init(){
    this.showDuration = 3;
    this.containerEl = document.createElement('div');
    this.containerEl.id = 'toasts';    
    document.body.appendChild(this.containerEl);    
  }

  /**
   * Show Toast notification
   * @param {*} content Message to display
   * @param {*} type Notification type
   * @returns Void if content is empty
   */
  static show(content, type = ''){   
    if(!content) return;
    //Create the toast element
    const toastEl = document.createElement('div');
    toastEl.className = 'toast-entry';
    if(type != "") toastEl.classList.add('is-error');
    toastEl.innerText = content;
    //Append to toast container
    this.containerEl.appendChild(toastEl);
    //Animate with GSAP timeline
    const tl = gsap.timeline();  
    tl.from(toastEl, { y: 60, opacity: 0, duration: 0.5, ease: "power4.out"});
    tl.to(toastEl, { marginTop: -250, opacity: 0, delay: this.showDuration, duration: 0.5, onComplete: () => {
      toastEl.remove();
    }}); 
  }

}
