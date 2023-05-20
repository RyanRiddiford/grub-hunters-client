/**
 * Report endpoint API service
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

//Import dependencies
import App from '../App';
import AuthAPI from './AuthAPI';
import Toast from '../Toast';



//Report API request methods
class ReportAPI {


	/**
	 * Create a new report
	 * @param {*} reportData New report data to send to server
	 * @returns The new report
	 */
	async create(reportData) {

		//If parameter values are missing, exit function
		if (!reportData)
			return;

		//Await POST request to server
		const response = await fetch(`${App.apiBase}/report/`, {
			headers: {
				"Authorization": `Bearer ${localStorage.accessToken}`
			},
			method: 'POST',
			body: reportData
		});

		//If response is not ok
		if (!response.ok) {
			//Log error to console
			const err = await response.json();
			if (err) console.log(err);
			//Throw new error    
			throw new Error('Problem creating report');
		}

		//Convert json and store as data
		const data = await response.json();

		//Return data
		return data;

	}



	/**
	 * Update the report by id
	 * @param {*} reportId The id of the report to update
	 * @param {*} reportData The report data to update the report with
	 * @returns The updated report
	 */
	async updateById(reportId, reportData) {

		//If parameter values are missing, exit function
		if (!reportId || !reportData)
			return;

		//Await PUT request on server
		const response = await fetch(`${App.apiBase}/report/${reportId}`, {
			method: "PUT",
			headers: {
				"Authorization": `Bearer ${localStorage.accessToken}`
			},
			body: reportData
		});


		//If response is not ok
		if (!response.ok) {
			//Log error to console
			const err = await response.json();
			if (err) console.log(err);
			//Throw new error   
			throw new Error('Problem updating report');
		}

		//Convert to json and store as data
		const data = await response.json();

		//Return data
		return data;
	}

	/**
	 * Get the report by id
	 * @param {*} reportId The id of the report
	 * @returns The report associated with the report id
	 */
	async getById(reportId) {

		//If parameter values are missing, exit function
		if (!reportId) return;

		//Await GET request to server
		const response = await fetch(`${App.apiBase}/report/${reportId}`, {
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
			throw new Error('Problem getting report');
		}

		//Convert json and store as data
		const data = await response.json();

		//Return data
		return data;
	}



	/**
	 * Get number of pages
	 */
	async getNumPages(report_status, target_type) {

		let endpoint = `${App.apiBase}/report/num/page/qty/${report_status}/${target_type}`;

		//Fetch json
		const response = await fetch(endpoint, {
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



	/**
	 * Delete the report by id
	 * @param {*} reportId The id of the report
	 * @returns Message indicating the success of the request
	 */
	async deleteById(reportId) {

		//If parameter values are missing, exit function
		if (!reportId) return;

		//Await DELETE request
		const response = await fetch(`${App.apiBase}/report/${reportId}`, {
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
			throw new Error('Failed to delete report');
		}

		Toast.show('report deleted');

	}


	//Close a report ticket
	async closeTicket(reportId) {

		//If parameter values are missing, exit function
		if (!reportId)
			return;

		//Await PUT request on server
		const response = await fetch(`${App.apiBase}/report/close-report/${reportId}/${AuthAPI.currentUser._id}`, {
			method: "PUT",
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
			throw new Error('Problem closing ticket');
		}

		//Convert to json and store as data
		const data = await response.json();

		//Return data
		return data;
	}




	/**
	 * Get array of ten reports max
	 * @param {*} page Specifies what page of ten to get from server
	 * @returns Array of reports
	 */
	async getPage(page, reportStatus, targetType) {

		//Fetch json array
		const response = await fetch(`${App.apiBase}/report/${page}/${reportStatus}/${targetType}`, {
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
			throw new Error('Problem getting reports');
		}

		//Convert json and store as data
		const data = await response.json();

		//Return data
		return data;

	}

}


//Export this api service for reports
export default new ReportAPI();