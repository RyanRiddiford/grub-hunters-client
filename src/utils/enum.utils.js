/**
 * Enum helpers
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Collection of enums for global use
class EnumUtils {

//Enum of access levels
accessLevels = {
    reviewer: 1,
    restaurant: 2,
    administrator: 3
}

//Enum of ticket statuses
ticketStatus = {
    active:"active",
    closed:"closed",
}

//Enum of user account statuses
accountStatus = {
    active:"active",
    banned:"banned",
    warned:"warned",
    suspended:"suspended"
}

//Enum of report target types
reportTargetType = {
    restaurant:"restaurant",
    review:"review",
    all:""
}

}


//Export EnumUtils
module.exports = new EnumUtils();