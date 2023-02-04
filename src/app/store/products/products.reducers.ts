import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { filterProducts, filterProductsFailure, filterProductsSuccess, getProducts, getProductsFailure, getProductsSuccess } from "./products.action";
import { productsState } from "./productsState";

const initialState:productsState = AppInitialState.products

export const productsReducers = createReducer(initialState,
    on(getProducts,(state)=>({...state,process:true,success:false,failure:false,products:[],message:'',filter:false})),
    on(getProductsSuccess,(state,action:any)=>{
        return {...state,process:false,success:true,failure:false,products:action.products,message:action.message,filter:false}
    }),
    on(getProductsFailure,(state,action)=>({...state,process:false,success:false,failure:true,products:[],message:action.error,filter:false})),
    on(filterProducts,(state)=>({...state,process:true,success:false,failure:false,products:[],filter:true})),
    on(filterProductsSuccess,(state,action)=>({...state,process:false,success:true,failure:false,products:action.products,message:action.message,filter:true})),
    on(filterProductsFailure,(state,action)=>({...state,process:false,success:false,failure:true,products:[],message:action.error,filter:false}))

    )