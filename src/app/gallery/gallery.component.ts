import {Component, OnInit} from '@angular/core';
import {GalleryService} from '../services/gallery.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Gallery} from '../models';

@Component({
  templateUrl: 'gallery.component.html'
})
export class GalleryComponent implements OnInit {
  form: FormGroup;
  private response: any;
  storeID: any;
  items: Gallery[]

  constructor(private formBuilder: FormBuilder, private galleryService: GalleryService) {
  }

  ngOnInit() {
    this.storeID = localStorage.getItem('storeID');
    this.loadGallery(this.storeID);
    this.form = this.formBuilder.group({
      profile: ['']
    });
  }

  onChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('profile').setValue(file);
    }
  }

  onSubmit(title, description) {
    const formData = new FormData();
    formData.append('file', this.form.get('profile').value);
    formData.append('storeID', localStorage.getItem('storeID'));
    formData.append('title', title);
    formData.append('description', description);

    this.galleryService.upload(formData).subscribe(
      (res) => {
        if (res === 'success') {
          this.loadGallery(this.storeID);
        } else {

        }
      });
  }

  loadGallery(storeID) {
    this.galleryService.loadGallery(storeID).subscribe((images: Gallery[]) => {
      if (images) {
        this.items = images
        console.log(images);
      }
    });
  }

  deleteImage(imageID) {
    this.galleryService.deleteImage(this.storeID, imageID).subscribe((res: string) => {
      if (res === 'success') {
        this.loadGallery(this.storeID);
      } else {

      }
    });
  }
}
