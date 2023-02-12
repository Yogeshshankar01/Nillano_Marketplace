import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import Masonry from 'masonry-layout';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {

  hasDiscount = false

  campus = false

  setDiscount() {
    this.hasDiscount = !this.hasDiscount

    if (!this.hasDiscount) {
      this.createProductForm.get('discount_percent')?.setValue('')
    }

  }

  setCampus() {
    this.campus = !this.campus
    if (!this.campus) {
      this.createProductForm.get('Campus')?.setValue('')
    }
  }

  createProductForm: any = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    discount_percent: [''],
    discount_price: [''],
    quantity: ['', Validators.required],
    image: [''],
    images: [''],
    category_id: ['', Validators.required],
    subcategory_id: ['', Validators.required],
    location: ['', Validators.required],
    Campus: [''],
    user_id: ['1', Validators.required],
  })

  get createProductFormControls() {
    return this.createProductForm.controls
  }

  submitted = false

  submitProduct() {

    this.submitted = true

    const formValue = this.createProductForm.value;

    if (this.createProductForm.invalid) {

      this.toastController.create({
        message: "Please fill in the required fields",
        duration: 3000,
        header: "Validation Error",
        color: 'danger',
        position: 'top'
      }).then((toast) => {
        toast.present()
      })

      return
    }

    else if (this.hasDiscount && !formValue.discount_percent) {

      this.toastController.create({
        message: "Please specify if this product has discount or not, if yes provide a discount percentage.",
        duration: 3000,
        header: "Validation Error",
        color: 'danger',
        position: 'top'
      }).then((toast) => {
        toast.present()
      })

      return

    }

    else if (!this.mainImage) {

      this.toastController.create({
        message: "Please select a main image for your product",
        duration: 3000,
        header: "Validation Error",
        color: 'danger',
        position: 'top'
      }).then((toast) => {
        toast.present()
      })

      return

    }

    else if (this.otherImages.length < 1) {

      this.toastController.create({
        message: "Please select at least one(1) other image for your product",
        duration: 3000,
        header: "Validation Error",
        color: 'danger',
        position: 'top'
      }).then((toast) => {
        toast.present()
      })

      return

    }

    const formData = new FormData()

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
    formData.append('image', this.mainImage.file)

    this.otherImages.forEach((element: any) => {

      formData.append('images', element.file)

    });

    this.http.post(`${environment.server}/products/trial`, formData).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )

  }

  mainImage: any

  onSelectMainImage(event: any) {

    const file = event.target.files[0];;
    if (file.type.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      this.mainImage = {
        img: reader.result,
        file: file
      }

    };

  }

  otherImages: any = []

  onSelectOtherImage(event: any) {

    // console.log(event.target.files)

    const validateLength = event.target.files.length + this.otherImages.length

    if(this.otherImages.length > 0 && validateLength >= 6){

      this.toastController.create({
        message: "Please select a maximum of six(6) other images for your product",
        duration: 3000,
        header: "Images Error",
        color: 'danger',
        position: 'top'
      }).then((toast) => {
        toast.present()
      })

      return

    }
    
    else if(event.target.files.length > 6){

      this.toastController.create({
        message: "Please select a maximum of six(6) other images for your product",
        duration: 3000,
        header: "Images Error",
        color: 'danger',
        position: 'top'
      }).then((toast) => {
        toast.present()
      })

      return

    }

    for (let index = 0; index < event.target.files.length; index++) {

      const file = event.target.files[index];
      if (file.type.match(/image\/*/) == null) {
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {

        this.otherImages.push({
          img: reader.result,
          file: file
        })

        setTimeout(() => {
          let otherimages = document.querySelector('.otherimages') as HTMLElement
          let masonry = new Masonry(otherimages, {
            itemSelector: '.otherImagesPreview'
          })
        }, 500);

      };

    }

  }

  async removeOtherImage(imageIndex: any) {

    this.otherImages.splice(imageIndex, 1);

    setTimeout(() => {
      let otherimages = document.querySelector('.otherimages') as HTMLElement
      let masonry = new Masonry(otherimages, {
        itemSelector: '.otherImagesPreview'
      })
    }, 500);

  }

  constructor(private fb: FormBuilder, private modalCtrl: ModalController, private toastController: ToastController, private http: HttpClient) { }

  dismissModal() {
    this.modalCtrl.dismiss()
  }

  ngOnInit() { }

}
