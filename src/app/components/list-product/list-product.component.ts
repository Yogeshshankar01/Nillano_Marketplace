import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

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

  get createProductFormControls(){
    return this.createProductForm.controls
  }

  submitted=false

  submitProduct(){
    this.submitted = true

    this.toastController.create({
      message:"Please fill in the required fields",
      duration:3000,
      header:"Validation Error",
      color:'danger',
      position : 'top'
    }).then((toast)=>{
      toast.present()
    })

    if(this.createProductForm.invalid){
      return
    }

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

  constructor(private fb : FormBuilder,private modalCtrl : ModalController,private toastController:ToastController) { }

  dismissModal(){
    this.modalCtrl.dismiss()
  }

  ngOnInit() {}

}
