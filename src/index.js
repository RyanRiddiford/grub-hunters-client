/**
 * Import components and initialise the SPA
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

//Import dependencies
import App from './App.js';

//Custom components
import './components/base/header.component.js';
import './components/base/footer.component.js';
//Custom form components
import './components/forms/auth/login.component.js';
import './components/forms/auth/register.component.js';
import './components/forms/create/report.component.js';
import './components/forms/create/review.component.js';
import './components/forms/edit/profile.component.js';
//Dynamic data UI components
import './components/list/review.component.js';
import './components/list/restaurant.component.js';
import './components/list/report.component.js';
import './components/profile/reviewer.component.js';
import './components/profile/restaurant.component.js';
import './components/profile/admin.component.js';
//Styling
import './scss/master.scss';

//When DOM finishes loading, initialize the app
document.addEventListener('DOMContentLoaded', () => {
  App.init();
})