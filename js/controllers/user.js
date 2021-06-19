import {register as apiRegister, login as apiLogin, logout as apiLogout} from '../data.js';
import { showInfo, showError } from '../notifications.js';
import { getOffers } from '../data.js';

export async function profilePage() {

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    let offers = await getOffers();
    let userPurchases = offers.filter(offer => offer.buyer === this.app.userData.userId).length
    this.app.userData.userPurchases = userPurchases;
    this.partial('./templates/user/profile.hbs', this.app.userData);
    
}

export async function loginPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/user/login.hbs');
}

export async function registerPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/user/register.hbs');
}

export async function registerPost() {


    try {
        
        if(this.params.email.length === 0) {

            throw new Error('Email can not be empty');
        }
        if(this.params.password.length === 0) {

            throw new Error('Password can not be empty');
        }
        if(this.params.password !== this.params.repeatPassword) {

            throw new Error('Passwords don\'t match');
        }
        const result = await apiRegister(this.params.email, this.params.password);
        console.log(result);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error,result);
            throw error;
        }

        const loginResult = await apiLogin(this.params.email, this.params.password);
        console.log(loginResult);
        if(loginResult.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error,loginResult);
            throw error;
        }
        console.log('Successful registration');

        this.app.userData.email = loginResult.email;
        this.app.userData.userId = loginResult.objectId;
        this.app.userData.userToken = loginResult['user-token'];
        this.app.userData.loggedIn = true;

        showInfo(`Welcome ${loginResult.email}`)
        this.redirect('/');

    } catch (error) {
        
        showError(error.message)
        this.redirect('#/register');
    }
}

export async function loginPost() {


    try {
        
        const result = await apiLogin(this.params.email, this.params.password);
        if(result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error,result);
            throw error;
        }

        this.app.userData.email = result.email;
        this.app.userData.userId = result.objectId;
        this.app.userData.userToken = result['user-token'];
        this.app.userData.loggedIn = true;
        showInfo(`Welcome ${result.email}`)

        this.redirect('/')
    } catch (error) {
        
        showError(error.message)
        this.redirect('#/login')
    }

}

export async function logout() {


    const result = await apiLogout();
    this.app.userData.email = '';
    this.app.userData.userId = '';
    this.app.userData.userToken = '';
    this.app.userData.loggedIn = false;
    this.redirect('#/home');
    showInfo('Successfully logged out');
    return result;
}

