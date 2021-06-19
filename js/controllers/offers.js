import {getOffers, getOfferById, createOffer, deleteOffer, updateOffer} from '../data.js';

//get pages
export async function dashboardPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        offer: await this.load('./templates/offer/offer.hbs'),
    };

    try {
        
        const offers = await getOffers();
        if(offers.hasOwnProperty('errorData')){

            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        this.app.userData.offers = offers;
        this.app.userData.offers.map(offer => {

            offer.isOwnOffer = offer.ownerId === this.app.userData.userId;
        })

    } catch (error) {
        

        console.log(error);
    }
    

    
    
    this.partial('./templates/offer/dashboard.hbs', this.app.userData);
}



export async function createOfferPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    this.partial('./templates/offer/create.hbs', this.app.userData);
}

export async function editOfferPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const offer = await getOfferById(this.params.id);
    const context = Object.assign({offer}, this.app.userData)
    

    this.partial('./templates/offer/edit.hbs', context);
}

export async function detailsOfferPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const offer = await getOfferById(this.params.id);
    const context = Object.assign({offer}, this.app.userData)

    this.partial('./templates/offer/details.hbs', context);
}

export async function deleteOfferPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };

    const offer = await getOfferById(this.params.id);
    const context = Object.assign({offer}, this.app.userData)

    this.partial('./templates/offer/delete.hbs', context);

 
}

//post requests
export async function postCreateOffer() {
    
    try {
        
        if(this.params.product.length === 0) {

            throw new Error('Product field can\'t be empty');
        }
        if(this.params.description.length === 0) {

            throw new Error('Description field can\'t be empty');
        }
        if(this.params.price.length === 0) {

            throw new Error('Price field can\'t be empty');
        }

        const offer = {

            
            product: this.params.product,
            description: this.params.description,
            price: this.params.price,
            imageUrl: this.params.imageUrl,
            buyer: '',
            sold: false,
        }

        const result = await createOffer(offer);
        if(result.hasOwnProperty('errorData')) {

            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        console.log('New offer is created', offer);
        this.redirect('#/dashboard');
    } catch (error) {
        
        console.log(error);
        this.redirect('#/create')
    }
}



export async function postEditOffer() {

    try {

        if(this.params.product.length === 0){

            throw new Error('Product field can\'t be empty');
        }
        if(this.params.description.length === 0) {

            throw new Error('Description field can\'t be empty');
        }
        if(this.params.price.length === 0) {

            throw new Error('Price field can\'t be empty');
        }


        const updatedOffer = {

            product: this.params.product,
            description: this.params.description,
            price: this.params.price,
            imageUrl: this.params.imageUrl,
        }
        

        const result = await updateOffer(this.params.id, updatedOffer);

        if(result.hasOwnProperty('errorData')) {

            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        console.log('UPDATED');
        this.redirect('#/dashboard')

    } catch (error) {
        
        console.log(error);
        this.redirect(`#/edit/${this.params.id}`)
    }
}

export async function postDeleteOffer() {
    
    try {
        
        const result = await deleteOffer(this.params.id);
        if(result.hasOwnProperty('errorData')) {

            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        console.log('DELETED');
        this.redirect('#/dashboard')

    } catch (error) {
        
        console.log(error);
        this.redirect(`#/delete/${error.objectId}`)
    }
}

export async function buyOffer() {


    const offerId = this.params.id;
    const offer = await getOfferById(offerId);
    offer.buyer = this.app.userData.userId;
    offer.sold = true;
    console.log(offer);

    const updateOnBuyResult = await updateOffer(offerId, offer);
    console.log(updateOnBuyResult);
    this.redirect('#/dashboard');
    // this.app.userData.offersBought++;
    // const newUserData = this.app.userData;
    
    // await updateUser(this.app.userData.userId, newUserData)
    // this.redirect('#/dashboard');
}