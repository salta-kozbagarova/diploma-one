import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TransportService } from '../_services';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

    public carForm: FormGroup;
    //public name: AbstractControl;
    //public description: AbstractControl;
    //public productimage_related: AbstractControl;
    public productImage: File[];
    @ViewChild('fileInput') fileInput: ElementRef;
    public formData: FormData = new FormData(); 

  constructor(private transportService: TransportService,
                private fb: FormBuilder) {
    this.carForm = this.fb.group({
        'name': ['', Validators.compose([Validators.required])],
        'description': ['', Validators.compose([Validators.required])],
        'productimagerelated': null
    });
  }

  ngOnInit() {
      //this.postTest();
  }

  postTest(data){
    this.formData.append('name', data.name); 
    this.formData.append('description', data.description);
    this.transportService.postTest(this.formData).subscribe(data => {
        console.log(data);
    });
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log(file);
      let files = event.target.files;
      console.log(event.target.files);
      this.productImage = files;
      for(let i=0; i<this.productImage.length; i++){
        this.formData.append('image['+i+']', files[i]);//productimage_related
      }
      console.log(this.formData);
    }
  }

  clearFile() {
    this.carForm.get('productimagerelated').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
