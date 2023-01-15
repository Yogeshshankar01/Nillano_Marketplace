import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { loginEffects } from "./login/login.effects";
import { loginReducers } from "./login/login.reducers";
import { registerReducers } from "./register/register.reducers";
import { registerEffects } from "./register/register.effects";

export const AppStoreModule = [
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature("login",loginReducers),
    StoreModule.forFeature("register",registerReducers),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([
        loginEffects,
        registerEffects
    ])
]