import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss'],
})
export class EditproductComponent implements OnInit {

  hasDiscount=false

  campus=false

  setDiscount(){
    this.hasDiscount = !this.hasDiscount

    if(!this.hasDiscount){
      this.editProductForm.get('discount_percent')?.setValue('')
    }

  }

  setCampus(){
    this.campus = !this.campus
    if(!this.campus){
      this.editProductForm.get('Campus')?.setValue('')
    }
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

  product: any;


  constructor(private fb : FormBuilder,private modalCtrl : ModalController,private navParams: NavParams) { 
    
  }

  submitted = false

  editProductForm = this.fb.group({
    name: ['',Validators.required],
    description: ['',Validators.required],
    price: ['',Validators.required],
    discount_percent: [''],
    discount_price: [''],
    quantity: ['',Validators.required],
    image: ['',Validators.required],
    images: ['',Validators.required],
    category_id: ['',Validators.required],
    subcategory_id: ['',Validators.required],
    location: ['',Validators.required],
    Campus: [''],
    user_id: ['',Validators.required],
})

makeChanges(){

}


dismissModal(){
  this.modalCtrl.dismiss()
}

  ngOnInit() {
    
    this.product = this.navParams.get('product')

    this.mainImage.push(this.product.image)

    if(this.product.discount_percent){
      this.hasDiscount = true
    }

    if(this.product.Campus){
      this.campus = true
    }

    this.editProductForm.setValue({
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      discount_percent: this.product.discount_percent,
      discount_price: this.product.discount_price,
      quantity: this.product.quantity,
      image: this.product.image,
      images: this.product.images,
      category_id: this.product.category_id,
      subcategory_id: this.product.subcategory_id,
      location: this.product.location,
      Campus: this.product.Campus,
      user_id: this.product.user_id
    });
    
  }

}
