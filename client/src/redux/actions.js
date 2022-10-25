import axios from "axios";
import { FILTER_BY_ACTIVITIES, FILTER_COUNTRIES, GET_COUNTRIES, GET_COUNTRIES_BY_NAME, GET_COUNTRIES_QUERY, GET_COUNTRY_ID, GET_TOURIST_ACTIVITIES, ORDER_COUNTRIES_ALF, ORDER_COUNTRIES_POP } from './constants.js';

//get all countries
export function getCountries() {
    return async (dispatch) => {
        try {
            let json = await axios.get('http://localhost:3001/countries');
            return dispatch({
                type: GET_COUNTRIES,
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        }
    }
};

//filter by continents
export function filterByContinents(payload) {
    return {
        type: FILTER_COUNTRIES,
        payload
    }
};

//order by name
export function orderByName(payload) {
    return {
        type: ORDER_COUNTRIES_ALF,
        payload
    }
};

//order by population
export function orderByPop(payload) {
    return {
        type: ORDER_COUNTRIES_POP,
        payload
    }
};

//get ids
export function getCountriesIds(id) {
    return async (dispatch) => {
        try {
            let json = await axios.get(`http://localhost:3001/countries/${id}`);
            return dispatch({
                type: GET_COUNTRY_ID,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

//get by query (default?)
export function getCountriesQuery(name) {
    return async (dispatch) => {
        try {
            let json = await axios.get(`http://localhost:3001/countries?name=${name}`);
            return dispatch({
                type: GET_COUNTRIES_QUERY,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

//filter by activities
export function filterByAct(activity) {
    return {
        type: FILTER_BY_ACTIVITIES,
        payload: activity
    }
};

//get all activities
export function getActivities() {
    return async (dispatch) => {
        try {
            let json = axios.get(`http://localhost:3001/activities`);
            return dispatch({
                type: GET_TOURIST_ACTIVITIES,
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        }
    }
};

//post activity
export function postActivity(payload) {
    return async () => {
        try {
            let json = await axios.post(`http://localhost:3001/activities`, payload);
            return json;
        } catch (error) {
            console.log(error);
        }
    }
};

//get countries by name
export function getCountriesByName(name) {
    return {
        type: GET_COUNTRIES_BY_NAME,
        payload: name,
    }
};