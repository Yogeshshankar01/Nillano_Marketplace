import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionSheetController, ModalController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss'],
})
export class EditproductComponent implements OnInit {

  hasDiscount = false

  campus = false

  setDiscount() {
    this.hasDiscount = !this.hasDiscount

    if (!this.hasDiscount) {
      this.editProductForm.get('discount_percent')?.setValue('')
    }

  }

  setCampus() {
    this.campus = !this.campus
    if (!this.campus) {
      this.editProductForm.get('Campus')?.setValue('')
    }
  }

  imagePreview: any


  mainImage: File[] = [];

  removedImagesPublicID: any = []

  onChangeMainImage(event: any) {

    const file = event.target.files[0];;
    if (file.type.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
      if (typeof (this.editProductForm.get('image').value) == 'string') this.removedImagesPublicID.push(this.editProductForm.get('image').value)
      // console.log(this.removedImagesPublicID)
      this.editProductForm.get('image').setValue(file)
      // this.editProductForm.get('image')
      // console.log({file})
      
    };

  }

  onChangeOtherImage(event: any) {

    const file = event.target.files[0];;
    if (file.type.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagesPreviewArray.push(reader.result)
      this.imagesArray.push(file)
      // console.log(this.imagesArray)
      this.editProductForm.get('images').setValue(this.imagesArray)
      // if(typeof(this.editProductForm.get('image').value)=='string') this.removedImagesPublicID.push(this.editProductForm.get('image').value)
      // console.log(this.removedImagesPublicID)
      // this.editProductForm.get('image').setValue(file)
    };

  }

  removedImages:any = []

  async removeOtherImage(imageIndex: any) {
    // this.imagesArray.
    // alert("remove: "+image)
    const actionSheet = await this.actionSheetController.create({
      header: 'Are you sure you want to delete this Image?',
      subHeader: 'This action cannot be undone.',
      cssClass: 'aa',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          console.log('Cancel clicked');
        }
      }, {
        text: 'Delete',
        icon: 'trash',
        role: 'destructive',
        handler: () => {
          // console.log('Delete clicked');

          this.removedImages.push(imageIndex)
          
          this.imagesPreviewArray.splice(imageIndex, 1);
          // Place your logic for deleting the product here
        }
      }]
    });
    await actionSheet.present();

  }


  product: any;


  constructor(private fb: FormBuilder, private modalCtrl: ModalController, private navParams: NavParams, private http: HttpClient, private actionSheetController: ActionSheetController) {

  }

  submitted = false

  editProductForm: any = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    discount_percent: [''],
    discount_price: [''],
    quantity: ['', Validators.required],
    image: ['', Validators.required],
    images: ['', Validators.required],
    category_id: ['', Validators.required],
    subcategory_id: ['', Validators.required],
    location: ['', Validators.required],
    Campus: [''],
    user_id: ['', Validators.required],
    removedImages: ['']
  })

  async makeChanges() {

    const formData = new FormData()
    this.editProductForm.get('removedImages').setValue(this.removedImages)
    const formValue = this.editProductForm.value;
    formData.append('name', formValue.name);
    formData.append('description', formValue.description);
    formData.append('price', formValue.price);
    formData.append('discount_percent', formValue.discount_percent);
    formData.append('discount_price', formValue.discount_price);
    formData.append('quantity', formValue.quantity);
    formData.append('category_id', formValue.category_id);
    formData.append('subcategory_id', formValue.subcategory_id);
    formData.append('location', formValue.location);
    formData.append('Campus', formValue.Campus);
    formData.append('user_id', formValue.user_id);
    // formData.append('removedImages', formValue.removedImages);
    const imageFile = this.editProductForm.get('image').value;
    formData.append('image', imageFile);

    this.imagesArray.forEach((image:any) => {
      formData.append('images',image)
    });

    formValue.removedImages.forEach((image:any) => {
      formData.append('removedImages',image)
    });

    console.log(this.editProductForm.value)
    
    this.http.post(`${environment.server}/products/trial`, formData).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }


  dismissModal() {
    this.modalCtrl.dismiss()
  }

  imagesPreviewArray: any
  imagesArray:any

  ngOnInit() {

    this.product = this.navParams.get('product')

    // this.mainImage.push(this.product.image)

    if (this.product.discount_percent) {
      this.hasDiscount = true
    }

    if (this.product.Campus) {
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
      user_id: this.product.user_id,
      removedImages: ''
    });

    this.imagePreview = this.editProductForm.get('image').value

    this.imagesArray = JSON.parse(this.editProductForm.get('images')?.value)
    this.imagesPreviewArray = JSON.parse(this.editProductForm.get('images')?.value)

  }

}
