import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import Masonry from 'masonry-layout';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import { FilterComponent } from 'src/app/components/filter/filter.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
          
  
  products:any = [];
  categories:any = [];
  // selectedCategory: string | undefined;
  // selectedPriceRange: string | undefined;

  selectedCategory:any
  selectedSubcategory:any
  priceRange:any

  constructor(private popoverController: PopoverController) { }

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
      if (this.selectedCategory && product.category != this.selectedCategory) {
        return false;
      }
      if (this.priceRange) {
        if (this.priceRange === 'low' && (product.price < 50)) {
          return true;
        } else if (this.priceRange === 'medium' && (product.price >= 50 && product.price <= 100)) {
          return true;
        } else if (this.priceRange === 'high' && (product.price > 100)) {
          return true;
        } else { 
          return false;
        }
      }
      
      return true;
    });
  }
          
          private products1 = [
            { id: 'p1', name: 'Product 1 Product 1 Product 1', price: 19.99, imageUrl: '../../../assets/images/electronics.jpg', category: '1' },
            { id: 'p2', name: 'Product 2', price: 69.99, imageUrl: '../../../assets/images/agric-food.jpg', category: '2' },
            { id: 'p3', name: 'Product 3', price: 509.99, imageUrl: '../../../assets/images/fashion.jpg', category: '3' },
            { id: 'p4', name: 'Product 4', price: 49.99, imageUrl: '../../../assets/images/toys-games.jpg', category: '1' },
            { id: 'p1', name: 'Product 1 Product 1 Product 1', price: 19.99, imageUrl: '../../../assets/images/electronics.jpg', category: '2' },
            { id: 'p2', name: 'Product 2', price: 69.99, imageUrl: '../../../assets/images/agric-food.jpg', category: '3' },
            { id: 'p3', name: 'Product 3', price: 509.99, imageUrl: '../../../assets/images/fashion.jpg', category: '1' },
            { id: 'p4', name: 'Product 4', price: 49.99, imageUrl: '../../../assets/images/toys-games.jpg', category: '2' },
            { id: 'p1', name: 'Product 1 Product 1 Product 1', price: 19.99, imageUrl: '../../../assets/images/electronics.jpg', category: '3' },
            { id: 'p2', name: 'Product 2', price: 69.99, imageUrl: '../../../assets/images/agric-food.jpg', category: '1' },
            { id: 'p3', name: 'Product 3', price: 509.99, imageUrl: '../../../assets/images/fashion.jpg', category: '2' },
            { id: 'p4', name: 'Product 4', price: 49.99, imageUrl: '../../../assets/images/toys-games.jpg', category: '3' }
          ];
        
          getProducts1() {
            return [...this.products1];
          }
        
          private categories1 = [
            { id: '1', name: 'Electronics' },
            { id: '2', name: 'Clothes' },
            { id: '3', name: 'Books' }
          ];
        
          getCategories1() {
            return [...this.categories1];
          }

          openFilter() {
            this.popoverController.create({
              component: FilterComponent,
              componentProps: {
                selectedCategory: this.selectedCategory,
                selectedSubcategory: this.selectedSubcategory,
                priceRange: this.priceRange
              }
            }).then((popover:any) => {
              console.log({cat:this.selectedCategory,sub:this.selectedSubcategory,price:this.priceRange})
              popover.onDidDismiss().then((data:any) => {
                if (data && data.data) {
                  this.selectedCategory = data.data.selectedCategory;
                  this.selectedSubcategory = data.data.selectedSubcategory;
                  this.priceRange = data.data.priceRange;

                  this.filterProducts()

                  console.log({cat:this.selectedCategory,sub:this.selectedSubcategory,price:this.priceRange})
                  // Filter your products here using the selected values of category, subcategory and price
                }
              });
              popover.present();
            });
          }

}
