/**
 * Review endpoint API service
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */

//Import dependencies
import App from '../App';
import AuthAPI from './AuthAPI';
import Toast from '../Toast';


//Review API request methods
class ReviewAPI {

    /**
 * Create a new review
 * @param {*} reviewData New review data to send to server
 * @returns The new review
 */
  async create(reviewData) {

    //If parameter values are missing, exit function
    if (!reviewData)
    return; 

        //Await POST request to server
        const response = await fetch(`${App.apiBase}/review/`, {
          headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
          method: 'POST',
          body: reviewData
        });
    
    //If response is not ok
    if(!response.ok){ 
      //Log error to console
      const err = await response.json();
      if(err) {
         console.log(err);
      }
      if (err.message) {
Toast.show(err.message,'error')
      }
      else {
           //Throw new error    
      throw new Error('Problem creating review');   
      }

    }
    
    //Convert json and store as data
    const data = await response.json();
    
    //Return data
    return data;

  }


  
  /**
   * Update the review by id
   * @param {*} reviewId The id of the review to update
   * @param {*} reviewData The review data to update the review with
   * @returns The updated review
   */
  async updateById(reviewId, reviewData, isVote){

    let response;

    //If parameter values are missing, exit function
    if(!reviewId || !reviewData) 
                        return;
    
                        if(isVote) {
                                 //Await PUT request on server
    response = await fetch(`${App.apiBase}/review/${reviewId}`, {
      method: "PUT",
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`,
        "Content-Type":"application/json"},
        body: reviewData
    });                     
                        }
                        else {
              //Await PUT request on server
    response = await fetch(`${App.apiBase}/review/${reviewId}`, {
      method: "PUT",
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
        body: reviewData
    });                
                        }


    //If response is not ok
    if(!response.ok){

      //Log error to console
      const err = await response.json();
      if(err) console.log(err);
      //Throw new error   
      throw new Error('Problem updating review');
    }

    //Convert to json and store as data
    const data = await response.json();
    
    //Return data
    return data;
  }

  /**
   * Get the review by id
   * @param {*} reviewId The id of the review
   * @returns The review associated with the review id
   */
  async getById(reviewId){
    
    //If parameter values are missing, exit function
    if(!reviewId) return;
    
    //Await GET request to server
    const response = await fetch(`${App.apiBase}/review/${reviewId}`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    });

    //If response is not ok
    if(!response.ok){ 
      //Log error to console
      const err = await response.json();
      if(err) console.log(err);
      //Throw new error    
      throw new Error('Problem getting review');
    }
    
    //Convert json and store as data
    const data = await response.json();
    
    //Return data
    return data;
  }


    /**
   * Get the restaurant's average review score
   * @param {*} restaurantId The id of the restaurant
   * @returns Average review score
   */
    async getAvgReviewScore(restaurantId){

      //If parameter values are missing, exit function
      if(!restaurantId) return;
      
      //Await GET request to server
      const response = await fetch(`${App.apiBase}/review/avg-score/${restaurantId}`, {
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
      });
  
      //If response is not ok
      if(!response.ok){ 
        //Log error to console
        const err = await response.json();
        if(err) console.log(err);
        //Throw new error    
        throw new Error('Problem getting review score');
      }
      
      //Convert json and store as data
      const data = await response.json();

      //Return data
      return data;
    }



  /**
   * Delete the review by id
   * @param {*} reviewId The id of the review
   * @returns Message indicating the success of the request
   */
  async deleteById(reviewId) {

    //If parameter values are missing, exit function
    if(!reviewId) return;

        //Await DELETE request
        const response = await fetch(`${App.apiBase}/review/${reviewId}`, {
            headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
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
throw new Error('Failed to delete review');
}

Toast.show('Review deleted');
    
}




/**
 * Get array of ten reviews max
 * @param {*} page Specifies what page of ten to get from server
 * @returns Array of reviews
 */
async getPage(page, restaurantId, accessLevel) {


             //Fetch json array
       const response = await fetch(`${App.apiBase}/review/pagination/${restaurantId}/${page}/${accessLevel}`, {
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
      });     
  

    //If response is not ok
    if(!response.ok){ 
        //Log error to console
        const err = await response.json();
        if(err) console.log(err);
        //Throw new error  
        throw new Error('Problem getting reviews');
      }

    //Convert json and store as data
    const data = await response.json();

    AuthAPI.restaurantReviews = data;
    
    //Return data
    return data;

}



/**
 * Get number of pages that the user has posted
 */
async getNumPages(id) {

             //Fetch json array
             const response = await fetch(`${App.apiBase}/review/${id}/${AuthAPI.currentUser.accessLevel}`, {
              headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
            });        
      
      
          //If response is not ok
          if(!response.ok){ 
              //Log error to console
              const err = await response.json();
              if(err) console.log(err);
              //Throw new error  
              throw new Error('Problem getting number of review pages');
            }
      
          //Convert json and store as data
          const data = await response.json();
          
          //Return data
          return data;
}




}



//Export this api service for reviews
export default new ReviewAPI();