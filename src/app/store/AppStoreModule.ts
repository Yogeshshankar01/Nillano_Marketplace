import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { loginEffects } from "./login/login.effects";
import { loginReducers } from "./login/login.reducers";
import { registerReducers } from "./register/register.reducers";
import { registerEffects } from "./register/register.effects";
import { productsReducers } from "./products/products.reducers";
import { ProductsEffect } from "./products/products.effects";

export const AppStoreModule = [
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature("login",loginReducers),
    StoreModule.forFeature("register",registerReducers),
    StoreModule.forFeature("products",productsReducers),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([
        loginEffects,
        registerEffects,
        ProductsEffect
    ])
]