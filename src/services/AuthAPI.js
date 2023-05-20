/**
 * Auth endpoint API service
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

//Import dependencies
import App from '../App';
import Router, {
	gotoRoute
}
from '../Router';
import Toast from '../Toast';
import enumUtils from '../utils/enum.utils';

//Auth endpoint API service
class AuthAPI {

	constructor() {
		//Data of the logged in user
		this.currentUser = {};
		//Restaurant object being viewed
		this.currentRestaurant = {};
		//Report object being viewed
		this.currentReport = {};
		//Report target (restaurant or review) object being viewed
		this.currentTarget = {};
	}

	/**
	 * Attempt to register a new user
	 * @param {*} userData 
	 * @param {*} fail 
	 */
	async signUp(userData, fail = false) {

		if (userData.get("avatar")) {
			let filename = userData.get("avatar").name;
			userData.append("filename", filename);
		}

		const response = await fetch(`${App.apiBase}/user/`, {
			method: 'POST',
			body: userData
		});

		//If response not ok
		if (!response.ok) {
			const err = await response.json();
			if (err) console.log(err);
			//Show error      
			Toast.show(`Problem getting user: ${response.status}`);
			//Run fail() functon if set
			if (typeof fail == 'function') fail();
		}
		//Sign up success - show toast and redirect to sign in page
		Toast.show('Account created, please sign in');
	}


	/**
	 * Sign the user in
	 * @param {*} userData 
	 * @param {*} fail 
	 */
	async signIn(userData, fail = false) {

		let email = userData.get("email");
		let password = userData.get("password");
		let bodyData = {
			email: email,
			password: password
		};

		const response = await fetch(`${App.apiBase}/auth/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bodyData)
		});

		//If response not ok
		if (!response.ok) {
			const err = await response.json();
			if (err) console.log(err);
			//Show error      
			Toast.show(`Problem signing in: ${err.message}`, 'error');
			//Run fail() functon if set
			if (typeof fail == 'function') fail();
		} else {
			//Sign in success
			const data = await response.json();

			//Check for demerit handling
			if (data.code) {
				//Warn the user with popup on login
				if (data.code == "WARNED") {
					//Welcome an admin/reviewer
					if (data.user.accessLevel != enumUtils.accessLevels.restaurant)
						Toast.show(`Welcome,  ${data.user.firstName}`);
					//Welcome a restaurant
					else if (data.user.accessLevel == enumUtils.accessLevels.restaurant)
						Toast.show(`Welcome,  ${data.user.restaurantName}`);
					//Save access token (jwt) to local storage
					localStorage.setItem('accessToken', data.accessToken);
					//Set current user
					this.currentUser = data.user;
					//Redirect to home
					Router.init();
					gotoRoute('/');
				}
				//Inform user of suspension and for the span
				else if (data.code == "SUSPENDED") {
					Toast.show(data.message);
					fail();
					gotoRoute('/login');
				}
				//Inform user of their indefinite ban
				else if (data.code == "BANNED") {
					Toast.show(data.message);
					fail();
				}
			}
			//No demerits to handle
			else {
				//Welcome an admin/reviewer
				if (data.user.accessLevel != enumUtils.accessLevels.restaurant)
					Toast.show(`Welcome,  ${data.user.firstName}`);
				//Welcome a restaurant
				else if (data.user.accessLevel == enumUtils.accessLevels.restaurant)
					Toast.show(`Welcome,  ${data.user.restaurantName}`);
				//Save access token (jwt) to local storage
				localStorage.setItem('accessToken', data.accessToken);
				//Set current user
				this.currentUser = data.user;
				//Redirect to home
				Router.init();
				//Direct to the intro page on first time login
				if (this.currentUser.showIntro == true)
					gotoRoute('/intro');
				//Direct to the home/profile page on login
				else
					gotoRoute('/');
			}

		}

	}


	/**
	 * Check the client for valid access token
	 * @param {*} success 
	 * @returns 
	 */
	async check(success) {

		//Check local token is there
		if (!localStorage.accessToken) {
			//No local token!
			Toast.show("Please sign in");
			//Redirect to sign in page      
			gotoRoute('/login');
			return;
		}

		//Token must exist - validate token via the backend
		const response = await fetch(`${App.apiBase}/auth/validate`, {
			method: 'GET',
			headers: {
				"Authorization": `Bearer ${localStorage.accessToken}`
			}
		});

		//If response not ok
		if (!response.ok) {
			const err = await response.json();
			if (err) console.log(err);
			//Delete local token
			localStorage.removeItem('accessToken');
			Toast.show("session expired, please sign in");
			//Redirect to sign in      
			gotoRoute('/login');
			return;
		}

		//Token is valid!
		const data = await response.json();
		//Set currentUser obj
		this.currentUser = data.user;
		//Run success
		success();
	}

	/**
	 * Sign the user out and clear client-side data
	 * @param {*} message 
	 */
	signOut(message = "You are signed out") {
		Toast.show(message);
		// delete local token
		localStorage.removeItem('accessToken');
		//Clear the entire local storage
		localStorage.clear();
		// redirect to sign in    
		gotoRoute('/login');
		//Unset global objects
		this.currentUser = null;
		this.currentRestaurant = null;
		this.currentReport = null;
		this.currentTarget = null;

	}
}


//Export API Service
export default new AuthAPI();