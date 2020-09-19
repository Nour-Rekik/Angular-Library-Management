import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

 book: Book;
id : number=0;

  constructor(private route: ActivatedRoute, private booksService: BookService,
              private router: Router) {}

  ngOnInit() {
   this.book=new Book();
    this.id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(this.id).subscribe(
      (book: Book) => {
        this.book = book;
      },
      (erreur)=>{
        console.log(erreur);
      }
    );
  }
  /*ngOnInit() {
      this.booksService.getSingleBook(this.book.id).subscribe(
          (book) => this.book = book,
          (error) => {
            console.log(error)
            this.router.navigate(['/books']);
          }
        );
      
    
  }*/

  onBack() {
    this.router.navigate(['/books']);
  }
}