/**
 * User endpoint API service
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import App from '../App';
import AuthAPI from './AuthAPI';


//User API request methods
class UserAPI {


	/**
	 * Update the user by id
	 * @param {*} userId The id of the user to update
	 * @param {*} userData The user data to update the user with
	 * @returns The updated user
	 */
	async updateById(userId, userData, isJson) {

		let headerOptions;
		//If parameter values are missing, exit function
		if (!userId || !userData)
			return;

		if (isJson) {
			headerOptions = {
				"Authorization": `Bearer ${localStorage.accessToken}`,
				"Content-Type": "application/json",
			};
		} else {
			headerOptions = {
				"Authorization": `Bearer ${localStorage.accessToken}`
			};

			if (userData.get("avatar")) {
				let filename = userData.get("avatar").name;
				userData.append("filename", filename);
			}

		}


		//Await PUT request on server
		const response = await fetch(`${App.apiBase}/user/${userId}`, {
			method: "PUT",
			headers: headerOptions,
			body: userData
		});


		//If response is not ok
		if (!response.ok) {
			//Log error to console
			const err = await response.json();
			if (err) console.log(err);
			//Throw new error   
			throw new Error('Problem updating user');
		}

		//Convert to json and store as data
		const data = await response.json();

		//Return data
		return data;
	}


	/**
	 * Update the user by id
	 * @param {*} userId The id of the user to update
	 * @returns The updated user
	 */
	async giveDemerit(userId) {

		//If parameter values are missing, exit function
		if (!userId)
			return;

		//Await PUT request on server
		const response = await fetch(`${App.apiBase}/user/give-demerit/${userId}`, {
			method: "PUT",
			headers: {
				"Authorization": `Bearer ${localStorage.accessToken}`
			}
		});


		//If response is not ok
		if (!response.ok) {
			//Log error to console
			const err = await response.json();
			if (err) console.log(err);
			//Throw new error   
			throw new Error('Problem giving user a demerit');
		}

		//Convert to json and store as data
		const data = await response.json();

		//Return data
		return data;
	}



	/**
	 * Get the user by id
	 * @param {*} userId The id of the user
	 * @returns The user associated with the user id
	 */
	async getById(userId) {

		//If parameter values are missing, exit function
		if (!userId) return;

		//Await GET request to server
		const response = await fetch(`${App.apiBase}/user/${userId}`, {
			headers: {
				"Authorization": `Bearer ${localStorage.accessToken}`
			}
		});

		//If response is not ok
		if (!response.ok) {
			//Log error to console
			const err = await response.json();
			if (err) console.log(err);
			//Throw new error    
			throw new Error('Problem getting user');
		}

		//Convert json and store as data
		const data = await response.json();

		//Return data
		return data;
	}



	/**
	 * Delete the user by id
	 * @param {*} userId The id of the user
	 * @returns Message indicating the success of the request
	 */
	async deleteById(userId) {

		//If parameter values are missing, exit function
		if (!userId) return;

		//Await DELETE request
		const response = await fetch(`${App.apiBase}/user/${userId}`, {
			headers: {
				"Authorization": `Bearer ${localStorage.accessToken}`
			},
			method: 'DELETE'
		});

		//If the response is not ok
		if (!response.ok) {
			//Log error to console
			const err = await response.json();
			if (err) {
				console.log(err);
			}
			//Throw new error
			throw new Error('Failed to delete user');
		}

		//Sign the user out
		AuthAPI.signOut("Your account has been deleted");

	}




	/**
	 * Get array of ten users max
	 * @param {*} page Specifies what page of ten to get from server
	 * @param {*} accessLevel Contains access level for users to bring back
	 * @returns Array of users that are a part of one of the access levels specified
	 */
	async getPage(page, accessLevel, keywords = "") {
		//Fetch json array
		const response = await fetch(`${App.apiBase}/user/paginated/${page}/${accessLevel}/${keywords}`, {
			headers: {
				"Authorization": `Bearer ${localStorage.accessToken}`
			},
		});

		//If response is not ok
		if (!response.ok) {
			//Log error to console
			const err = await response.json();
			if (err) console.log(err);
			//Throw new error  
			throw new Error('Problem getting restaurants');
		}

		//Convert json and store as data
		const data = await response.json();
		AuthAPI.restaurantPage = data;

		//Return data
		return data;

	}


	/**
	 * Get number of pages that the user has posted
	 */
	async getNumPages(keywords = "", userType) {

		//Fetch json array
		const response = await fetch(`${App.apiBase}/user/${userType}/${keywords}`, {
			headers: {
				"Authorization": `Bearer ${localStorage.accessToken}`
			},
		});

		//If response is not ok
		if (!response.ok) {
			//Log error to console
			const err = await response.json();
			if (err) console.log(err);
			//Throw new error  
			throw new Error('Problem getting number of review pages');
		}


		//Convert json and store as data
		const data = await response.json();

		//Return data
		return data;
	}


	async getRestaurantName(restaurantId) {

		//Await GET request to server
		const response = await fetch(`${App.apiBase}/user/restaurant-name/${restaurantId}`, {
			headers: {
				"Authorization": `Bearer ${localStorage.accessToken}`
			}
		});

		//If response is not ok
		if (!response.ok) {
			//Log error to console
			const err = await response.json();
			if (err) console.log(err);
			//Throw new error    
			throw new Error('Problem getting restaurant name');
		}

		//Convert json and store as data
		const data = await response.json();

		//Return data
		return data;

	}


}


//Export this api service for users
export default new UserAPI();