import home from './controllers/home.js'
import {dashboardPage,
    createOfferPage, 
    editOfferPage, 
    detailsOfferPage, 
    deleteOfferPage,
    postCreateOffer,
    postEditOffer,
    postDeleteOffer,
    buyOffer
    } from './controllers/offers.js'
import {profilePage, loginPage, registerPage, registerPost, logout, loginPost} from './controllers/user.js'

window.addEventListener('load', () => {


    const app = Sammy('#body', function() {

        this.use('Handlebars', 'hbs');
        Handlebars.registerHelper("inc", function(value, options){
            return parseInt(value) + 1;
        });

        this.userData = {

            loggedIn: sessionStorage.getItem('loggedIn') || false,
            email: sessionStorage.getItem('email') || '',
            userId: sessionStorage.getItem('userId') || '',
            offers: []
        }

        this.get('/', home)
        this.get('index.html', home)
        this.get('#/home', home)

        this.get('#/profile', profilePage)

        this.get('#/dashboard', dashboardPage);
        this.get('#/create', createOfferPage);
        this.post('#/create', ctx => { postCreateOffer.call(ctx) });
        this.get('#/delete/:id', deleteOfferPage);
        this.post('#/delete/:id', ctx => { postDeleteOffer.call(ctx) });
        this.get('#/edit/:id', editOfferPage);
        this.post('#/edit/:id', ctx => { postEditOffer.call(ctx) });
        this.get('#/details/:id', detailsOfferPage);

        this.get('#/login', loginPage);
        this.post('#/login', ctx => { loginPost.call(ctx) });
        this.get('#/register', registerPage);
        this.post('#/register', ctx => { registerPost.call(ctx) });
        this.get('#/logout', logout);

        this.get('#/buy/:id', buyOffer);

        // this.get('#/login', login)
        // this.post('#/login', ctx => { loginPost.call(ctx) });

        // this.get('#/logout', logout);


        // this.get('#/register', register)
        // this.post('#/register', ctx => { registerPost.call(ctx) })


        

        // this.get('#/catalog', catalog)

        // this.get('#/my_movies', myMovies)

        // this.get('#/create', createMovie)
        // this.post('#/create', ctx => { createMoviePost.call(ctx) });

        // this.get('#/details/:id', details);

        // this.get('#/edit/:id', edit);
        // this.post('#/edit/:id', ctx => { editPost.call(ctx) });

        // this.get('#/delete/:id', deleteMovie);

        // this.get('#/buy/:id', buyTicket);
    })

    app.run();

})