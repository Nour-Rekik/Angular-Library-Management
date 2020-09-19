import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { Subscription } from 'rxjs';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
searchResult:Book[]
  books: Book[];
  booksSubscription: Subscription;
  public disabledBackground : boolean = false;

chaine='';
  constructor(private booksService: BookService, private router: Router) {}

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.getBooks().subscribe(
(books:Book[])=>{
  this.books = books;
},
(error)=>{
  console.log(error)
}

    );
    this.booksService.emitBooks();
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    
    this.booksService.deleteBook(book.id).subscribe(
(reponse)=>{
  console.log(reponse);
  this.router.navigate(['/books']);
 /* const index = this.books.findIndex (
    (bookEl)=>{
      if (bookEl==book)
     { return true;}
    }
  )

    this.books.splice(index, 1);
    

 /* this.booksService.saveBook().subscribe(
    (res)=>{
      console.log(res);
    },
    (erreur)=>{
      console.log(erreur)
    }
  );*/

},
(erreur)=>{
  console.log(erreur);
}

    );
    
     this.booksService.emitBooks;
  }
  search(){
    const name =this.chaine.trim();
    if(name.length){
    
    this.booksService.searchBookByname(name).subscribe(
       (books)=>{
         console.log(books);
    this.searchResult=books;
       }
    
    
    )}
      }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
    this.searchResult=[];
    this.chaine="";
  }
  
  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }
}