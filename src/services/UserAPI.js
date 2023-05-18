/**
 * User endpoint HTTP service
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import dependencies
import App from '../App';
import AuthAPI from './AuthAPI';
import Toast from '../Toast';
import { query } from '@polymer/lit-element';



//User API request methods
class UserAPI {

  
  /**
   * Update the user by id
   * @param {*} userId The id of the user to update
   * @param {*} userData The user data to update the user with
   * @returns The updated user
   */
  async updateById(userId, userData, isJson){



    let headerOptions;

    //If parameter values are missing, exit function
    if(!userId || !userData) 
                        return;

                        if (isJson) {
                        headerOptions = { "Authorization": `Bearer ${localStorage.accessToken}`,
                        "Content-Type": "application/json",                          
                        }                 
                      }
                      else {
                      headerOptions = { "Authorization": `Bearer ${localStorage.accessToken}`}  
                      
    if (userData.get("avatar")) { 
      console.log("found the form avatar name");
          let filename = userData.get("avatar").name;
console.log(filename);
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
    if(!response.ok){

      //Log error to console
      const err = await response.json();
      if(err) console.log(err);
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
    async giveDemerit(userId){
      
          //If parameter values are missing, exit function
          if(!userId) 
                              return;
          
          //Await PUT request on server
          const response = await fetch(`${App.apiBase}/user/give-demerit/${userId}`, {
            method: "PUT",
              headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
          });
      
      
          //If response is not ok
          if(!response.ok){
      
            //Log error to console
            const err = await response.json();
            if(err) console.log(err);
            //Throw new error   
            throw new Error('Problem giving user a demerit');
          }
      
          console.log("gave user demerit!");
          //Convert to json and store as data
          const data = await response.json();
          
          console.log(data.message);

          //Return data
          return data;
        }



    async updateWarningStatus(userId, userData) {


      let headerOptions = { "Authorization": `Bearer ${localStorage.accessToken}`,
      "Content-Type": "application/json",                          
      }     

    //If parameter values are missing, exit function
    if(!userId || !userData) 
                        return;
          
          //Await PUT request on server
          const response = await fetch(`${App.apiBase}/user/warning-status/${userId}`, {
            method: "PUT",
              headers: headerOptions,
              body:userData
          });
      
      
          //If response is not ok
          if(!response.ok) {
      
            //Log error to console
            const err = await response.json();
            if(err) console.log(err);
            //Throw new error   
            throw new Error('Problem updating warning status');
          }
      
          console.log("updated warning status!");
          //Convert to json and store as data
          const data = await response.json();
          
          console.log(data.message);

          //Return data
          return data;
        }



  /**
   * Get the user by id
   * @param {*} userId The id of the user
   * @returns The user associated with the user id
   */
  async getById(userId){

    
    console.log("getting user by id now");

    //If parameter values are missing, exit function
    if(!userId) return;
    
    //Await GET request to server
    const response = await fetch(`${App.apiBase}/user/${userId}`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    });

    //If response is not ok
    if(!response.ok){ 
      //Log error to console
      const err = await response.json();
      if(err) console.log(err);
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
    if(!userId) return;

        //Await DELETE request
        const response = await fetch(`${App.apiBase}/user/${userId}`, {
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
throw new Error('Failed to delete user');
}

//Log response message to console
console.log(await response.json());


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

  console.log(keywords);

       //Fetch json array
       const response = await fetch(`${App.apiBase}/user/${page}/${accessLevel}/${keywords}`, {
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
      })

    //If response is not ok
    if(!response.ok){ 
        //Log error to console
        const err = await response.json()
        if(err) console.log(err)
        //Throw new error  
        throw new Error('Problem getting restaurants')
      }

    //Convert json and store as data
    const data = await response.json();
    
    //Return data
    return data;

}


/**
 * Get number of pages that the user has posted
 */
async getNumPages(keywords = "", userType) {

  //Fetch json array
  const response = await fetch(`${App.apiBase}/user/${userType}/${keywords}`, {
   headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
 })     




//If response is not ok
if(!response.ok){ 
   //Log error to console
   const err = await response.json()
   if(err) console.log(err)
   //Throw new error  
   throw new Error('Problem getting number of review pages')
 }



 console.log("here is the data");


//Convert json and store as data
const data = await response.json();

//Return data
return data;
}


async getRestaurantName(restaurantId) {

      //Await GET request to server
      const response = await fetch(`${App.apiBase}/user/restaurant-name/${restaurantId}`, {
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
      });
  
      //If response is not ok
      if(!response.ok){ 
        //Log error to console
        const err = await response.json();
        if(err) console.log(err);
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
export default new UserAPI()