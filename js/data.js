
import API from './api.js';
import { backendlessApp } from '../config.js';

const endpoints = {

    OFFERS: 'data/offers',
}

const api = new API(
    backendlessApp.APPLICATION_ID, 
    backendlessApp.REST_API_KEY
);

export const register = api.register.bind(api);
export const login = api.login.bind(api);
export const logout = api.logout.bind(api);

export async function updateUser(id) {

    return await api.put(endpoints.USER + '/' + id);
}

export async function getOffers() {

    return await api.get(endpoints.OFFERS);
}

export async function getOfferById(id) {

    return api.get(endpoints.OFFERS + '/' + id);
}

export async function createOffer(offer) {

    return api.post(endpoints.OFFERS, offer)
}

export async function getOwnOffers() {

    const ownerId = sessionStorage.getItem('userId');

    return api.get(endpoints.OFFERS + `?where=ownerId%3D%27${ownerId}%27`);
}

export async function updateOffer(id, updateProps) {

    return api.put(endpoints.OFFERS + '/' + id, updateProps);
}

export async function deleteOffer(id) {

    return api.delete(endpoints.OFFERS + '/' + id);
}