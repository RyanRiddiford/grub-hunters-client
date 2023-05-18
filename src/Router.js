/**
 * Configure SPA routing of views
 * 
 * Author: Ryan Riddiford
 * Student ID: 20862086
 */


//Import views
import errorView from './views/pages/404'
import loginView from './views/pages/auth'
import profileView from './views/pages/profile'
import searchRestaurantsView from './views/pages/search-restaurants';
import searchTicketsView from './views/pages/admin/search-reports';
import reportView from './views/pages/admin/report';
import editProfileView from './views/pages/edit-profile';
import reviewsView from './views/pages/reviews';
import restaurantView from './views/pages/restaurant';
import introductionView from './views/pages/introduction';

// define routes
const routes = {
	'/': profileView,	
	'/home':profileView,
	'/profile': profileView,
	'404' : errorView,
	'/login': loginView,	
	'/search-restaurants': searchRestaurantsView,
	'/edit-profile': editProfileView,
	'/reviews':reviewsView,
	'/restaurant':restaurantView,
	'/search-tickets':searchTicketsView,
'/report':reportView,
'/intro': introductionView
}

class Router {
	constructor(){
		this.routes = routes
	}
	
	init(){
		// initial call
		this.route(window.location.pathname)

		// on back/forward
		window.addEventListener('popstate', () => {
			this.route(window.location.pathname)
		})
	}
	
	route(fullPathname){
		// extract path without params
		const pathname = fullPathname.split('?')[0]
		const route = this.routes[pathname]
		
		if(route){
			// if route exists, run init() of the view
			this.routes[window.location.pathname].init()
		}else{			
			// show 404 view instead
			this.routes['404'].init()			
		}
	}

	gotoRoute(pathname){
		
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
	}	
}

// create appRouter instance and export
const AppRouter = new Router()
export default AppRouter


// programmatically load any route
export function gotoRoute(pathname){
	AppRouter.gotoRoute(pathname);
}


// allows anchor <a> links to load routes
export function anchorRoute(e){
	e.preventDefault()	
	const pathname = e.target.closest('a').pathname
	AppRouter.gotoRoute(pathname)
}
