import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.service';

// ,canLoad : [AuthGuard]

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./pages/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),canLoad : [AuthGuard]
  },
  {
    path: 'my-products',
    loadChildren: () => import('./pages/my-products/my-products.module').then( m => m.MyProductsPageModule),canLoad : [AuthGuard]
  },
  {
    path: 'order-history',
    loadChildren: () => import('./pages/order-history/order-history/order-history.module').then( m => m.OrderHistoryPageModule),canLoad : [AuthGuard]
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./pages/my-orders/my-orders/my-orders.module').then( m => m.MyOrdersPageModule),canLoad : [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'saveditems',
    loadChildren: () => import('./pages/saveditems/saveditems.module').then( m => m.SaveditemsPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,useHash: false }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
