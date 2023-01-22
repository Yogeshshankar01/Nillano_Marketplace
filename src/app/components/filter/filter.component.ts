import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {

  selectedCategory: any;
  selectedSubcategory: any;
  priceRange: any;
  categories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
  subcategories = [{ id: 1, name: 'Subcategory 1' }, { id: 2, name: 'Subcategory 2' }];

  constructor(private navParams: NavParams, private popoverController: PopoverController) {
    this.selectedCategory = navParams.get('selectedCategory');
    this.selectedSubcategory = navParams.get('selectedSubcategory');
    this.priceRange = navParams.get('priceRange');
  }

  onCategoryChange() {
    // logic to update subcategories based on selected category
  }

  onPriceChange() {
    // logic to update price range
  }

  applyFilter() {
    // logic to apply filter and dismiss popover
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
