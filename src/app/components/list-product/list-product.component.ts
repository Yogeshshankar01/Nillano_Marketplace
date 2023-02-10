import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {

  hasDiscount=false

  campus=false

  setDiscount(){
    this.hasDiscount = !this.hasDiscount

    if(!this.hasDiscount){
      this.createProductForm.get('discount_percent')?.setValue('')
    }

  }

  setCampus(){
    this.campus = !this.campus
    if(!this.campus){
      this.createProductForm.get('Campus')?.setValue('')
    }
  }

  createProductForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      discount_percent: [''],
      discount_price: [''],
      quantity: [''],
      image: [''],
      images: [''],
      category_id: [''],
      subcategory_id: [''],
      location: [''],
      Campus: [''],
      user_id: [''],
  })

  submitProduct(){
    console.log(this.createProductForm.value)
  }

  mainImage: File[] = [];

  onSelectMainImage(event: { addedFiles: any; }) {
		console.log(event);
    this.mainImage = []
		this.mainImage.push(...event.addedFiles);

	}

	onRemoveMainImage(event: File) {
		// console.log(event);
		this.mainImage.splice(this.files.indexOf(event), 1);
	}

  files: File[] = [];

	onSelect(event: { addedFiles: any; }) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event: File) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}

  constructor(private fb : FormBuilder,private modalCtrl : ModalController) { }

  dismissModal(){
    this.modalCtrl.dismiss()
  }

  ngOnInit() {}

}
