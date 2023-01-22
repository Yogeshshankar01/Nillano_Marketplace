import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
          
  
  products:any = [];
  categories:any = [];
  selectedCategory: string | undefined;
  selectedPriceRange: string | undefined;

  constructor() { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.products = this.getProducts1();
  }

  async getCategories() {
    this.categories = await this.getCategories1();
  }

  filterProducts() {
    this.getProducts();
    this.products = this.products.filter((product: { category: string; price: number; }) => {
      if (this.selectedCategory && product.category !== this.selectedCategory) {
        return false;
      }
      if (this.selectedPriceRange) {
        if (this.selectedPriceRange === 'low' && (product.price < 50)) {
          return true;
        } else if (this.selectedPriceRange === 'medium' && (product.price >= 50 && product.price <= 100)) {
          return true;
        } else if (this.selectedPriceRange === 'high' && (product.price > 100)) {
          return true;
        } else { 
          return false;
        }
      }
      return true;
    });
  }
          
          private products1 = [
            { id: 'p1', name: 'Product 1 Product 1 Product 1', price: 19.99, imageUrl: '../../../assets/images/electronics.jpg', category: 'Electronics' },
            { id: 'p2', name: 'Product 2', price: 69.99, imageUrl: '../../../assets/images/agric-food.jpg', category: 'Clothes' },
            { id: 'p3', name: 'Product 3', price: 509.99, imageUrl: '../../../assets/images/fashion.jpg', category: 'Books' },
            { id: 'p4', name: 'Product 4', price: 49.99, imageUrl: '../../../assets/images/toys-games.jpg', category: 'Electronics' },
            { id: 'p1', name: 'Product 1 Product 1 Product 1', price: 19.99, imageUrl: '../../../assets/images/electronics.jpg', category: 'Electronics' },
            { id: 'p2', name: 'Product 2', price: 69.99, imageUrl: '../../../assets/images/agric-food.jpg', category: 'Clothes' },
            { id: 'p3', name: 'Product 3', price: 509.99, imageUrl: '../../../assets/images/fashion.jpg', category: 'Books' },
            { id: 'p4', name: 'Product 4', price: 49.99, imageUrl: '../../../assets/images/toys-games.jpg', category: 'Electronics' },
            { id: 'p1', name: 'Product 1 Product 1 Product 1', price: 19.99, imageUrl: '../../../assets/images/electronics.jpg', category: 'Electronics' },
            { id: 'p2', name: 'Product 2', price: 69.99, imageUrl: '../../../assets/images/agric-food.jpg', category: 'Clothes' },
            { id: 'p3', name: 'Product 3', price: 509.99, imageUrl: '../../../assets/images/fashion.jpg', category: 'Books' },
            { id: 'p4', name: 'Product 4', price: 49.99, imageUrl: '../../../assets/images/toys-games.jpg', category: 'Electronics' }
          ];
        
          getProducts1() {
            return [...this.products1];
          }
        
          private categories1 = [
            { id: 'c1', name: 'Electronics' },
            { id: 'c2', name: 'Clothes' },
            { id: 'c3', name: 'Books' }
          ];
        
          getCategories1() {
            return [...this.categories1];
          }
        
          masonry:any

        ngAfterViewInit(){

            const grid = document.querySelector('.grid') as HTMLElement;
    this.masonry = new Masonry(grid, {
        itemSelector: '.grid-item'
    });

    // imagesLoaded( grid ).on( 'progress', () => {
    //   // layout Masonry after each image loads
    //   this.masonry.layout();
    // });

    // window.onload = ()=>{  
    //   this.masonry.layout()
    // }

    setTimeout(() => {
      this.masonry.layout()
    }, 1000);


        }

}
