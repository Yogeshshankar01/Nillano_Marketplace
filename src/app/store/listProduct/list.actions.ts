import { createAction, props } from "@ngrx/store";

export const listProduct = createAction("[List Product] list",props<{formData:FormData}>())

export const listProductSuccess = createAction("[List Product] Success",props<{message:string}>())

export const listProductFailure = createAction("[List Product] Failed",props<{error:string}>())