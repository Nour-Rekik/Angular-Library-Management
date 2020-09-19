import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading = false;
fileUrl: string;
fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private booksService: BookService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.bookForm = this.formBuilder.group({
      titre: ['', Validators.required],
      auteurs: ['', Validators.required],
      code_R: ['', Validators.required],
      photo:['',Validators.required],
      maison_edition: ['', Validators.required],
    });
  }
  
  onSaveBook(formulaire:NgForm) {

    this.booksService.addBooks(formulaire.value).subscribe(
      (book) => {
        console.log(book);
        this.router.navigate(['/books']);
      },
      err => {
         console.log(err);
      }
    );
    
  }
  /*onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
}
detectFiles(event) {
  this.onUploadFile(event.target.files[0]);
}*/
}

