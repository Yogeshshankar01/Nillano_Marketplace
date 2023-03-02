import { Component, OnInit } from '@angular/core';
import { NavParams, Platform, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {

  categoriesAndSubcategories:any

  selectedCategory: any;
  selectedSubcategory: any;
  priceRange: any;
  
  subcategories:any;
  
  // isIOS:boolean

  constructor(private navParams: NavParams, private popoverController: PopoverController,private platform: Platform) {

    // this.isIOS = this.platform.is('ios');

    this.selectedCategory = navParams.get('selectedCategory');
    this.selectedSubcategory = navParams.get('selectedSubcategory');
    this.priceRange = navParams.get('priceRange');
    this.categoriesAndSubcategories = navParams.get('categoriesAndSubcategories');

    console.log(this.categoriesAndSubcategories)

    if(this.selectedCategory){
      let category = this.categoriesAndSubcategories.find((cat:any) => cat.id === this.selectedCategory);

      this.subcategories = category.Subcategories
    } 
    // console.log(this.categoriesAndSubcategories)

  }

  onCategoryChange() {
    console.log('cat change')
    console.log('Selected Cat',this.selectedCategory)

    this.selectedSubcategory = undefined

    let category = this.categoriesAndSubcategories.find((cat:any) => cat.id === this.selectedCategory);

    this.subcategories = category.Subcategories
    // logic to update subcategories based on selected category
  }

  onPriceChange() {
    console.log(this.priceRange)
    // logic to update price range
  }

  applyFilter() {
    // logic to apply filter and dismiss popover
    // this.selectedCategory = this.selectedCategory ? this.selectedCategory:''
    // this.selectedSubcategory = this.selectedSubcategory ? this.selectedSubcategory:''
    // this.priceRange = this.priceRange ? this.priceRange:''

    this.popoverController.dismiss({
      selectedCategory: this.selectedCategory,
      selectedSubcategory: this.selectedSubcategory,
      priceRange: this.priceRange
    });
  }

  clearFilter() {
    // logic to clear filter options and dismiss popover
    this.popoverController.dismiss();
  }

  dismiss() {
    // logic to dismiss popover without applying filter
    this.popoverController.dismiss();
  }

}
