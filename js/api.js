import { beginRequest, endRequest } from './notifications.js';

export default class API {

    constructor(appId, apiKey) {

        this.appId = appId;
        this.apiKey = apiKey;
        this.endpoints = {
            REGISTER: 'users/register',
            LOGIN: 'users/login',
            LOGOUT: 'users/logout',
        };

    }

    host(endpoint) {

        return `https://api.backendless.com/${this.appId}/${this.apiKey}/${endpoint}`
    }
    
    
    
    getOptions(headers) {
    
        const token = sessionStorage.getItem('userToken');
        const options = { headers: headers || {} };
    
        if(token !== null) {
    
            Object.assign( options.headers, {'user-token': token} )    
        }
    
        return options;
    }
    

    
    async get(endpoint) {
    
        const result = (await fetch(this.host(endpoint), this.getOptions()));
       

        try {

            return await result.json();
        } catch (err) {
            
            return result;
        }
    }
    
    async post(endpoint, body) {
    
        const options = this.getOptions( {'Content-type': 'application/json' } );
        options.method = 'POST';
        options.body = JSON.stringify(body);
    
        beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        
        endRequest();
        return result;
    }

    async put(endpoint, body) {
    
        const options = this.getOptions( {'Content-type': 'application/json' } );
        options.method = 'PUT';
        options.body = JSON.stringify(body);
    
        beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        
        endRequest();
        return result;
    }


    async delete(endpoint) {
    
        const options = this.getOptions();
        options.method = 'DELETE';
    
        beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        

        endRequest();
        return result;
    }
    
    async register(email, password) {
    
        beginRequest();
        const result = this.post(this.endpoints.REGISTER, {
            email,
            password,
        });

        endRequest();
        return result;
    }
    
    async login(email, password) {
    
        beginRequest();
        const result = await this.post(this.endpoints.LOGIN, {
            login: email,
            password,
        });

        console.log(result)

        sessionStorage.setItem('userToken', result['user-token']);
        sessionStorage.setItem('email', result.email);
        sessionStorage.setItem('userId', result.objectId);
        sessionStorage.setItem('loggedIn', true);  
        endRequest();
        return result;
    }
    
    async logout() {
    
        beginRequest();
        const result = await this.get(this.endpoints.LOGOUT);
        sessionStorage.clear();

        endRequest();
        return result;
    }
    
}

