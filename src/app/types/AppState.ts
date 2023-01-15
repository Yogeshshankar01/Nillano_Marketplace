import { loadingStateInterface } from "../store/loading/loadingStateInterface";
import { LoginStateInterface } from "../store/login/LoginState";
import { registerState } from "../store/register/registerState";

export interface AppState{
    loading : loadingStateInterface,
    login : LoginStateInterface,
    register : registerState
}