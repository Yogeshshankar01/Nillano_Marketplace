import { loadingStateInterface } from "../store/loading/loadingStateInterface";
import { LoginStateInterface } from "../store/login/LoginState";
import { productState } from "../store/product/productState";
import { productsState } from "../store/products/productsState";
import { registerState } from "../store/register/registerState";

export interface AppState{
    loading : loadingStateInterface,
    login : LoginStateInterface,
    register : registerState,
    products : productsState,
    product : productState
}