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
        message : null
    }
}