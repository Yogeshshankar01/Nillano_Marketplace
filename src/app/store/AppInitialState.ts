import { AppState } from "../types/AppState";

export const AppInitialState:AppState = {
    loading : {
        isLoading : false
    },
    login : {
        isLogingIn : false,
        isLogedIn : false,
        isLogingInFailure : false,
        message : null
    },
    register : {
        registered : false,
        registering : false,
        registrationFail : false,
        message : null
    },
    products:{
        process : false,
        success : false,
        failure : false,
        products : [],
        message : null,
        filter : false
    },
    product:{
        process : false,
        success : false,
        failure : false,
        product : [],
        message : null,
    },
    addProduct:{
        process : false,
        success : false,
        failure : false,
        message : null
    },
    userProducts : {
        process : false,
        success : false,
        failure : false,
        message : null,
        products : []
    },
    editProduct:{
        process : false,
        success : false,
        failure : false,
        message : null
    },
}