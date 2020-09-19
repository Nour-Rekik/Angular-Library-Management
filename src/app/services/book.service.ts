import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
const API_LINK = 'http://localhost:3000/api/books';


@Injectable({
  providedIn: 'root'
})
export class BookService {
index:number=0;
  books: Book[] =[];
  booksSubject = new Subject<Book[]>();
  constructor( private http: HttpClient ) {
    this.getBooks().subscribe(
      (booksE:Book[])=>{
        this.books=booksE;
      },
      (erreur)=>{
        console.log(erreur)
      }
    );
  }


  emitBooks() {
    this.booksSubject.next(this.books);
  }

  addBooks(book:Book) : Observable<Book>{
    
    this.books.push(book);
    console.log(this.books.length);  
  
    return this.http.post<Book>(API_LINK, book/*,{headers:headers}*/);
  }
 

getBooks() : Observable<Book[]> {
  return this.http.get<Book[]>(API_LINK);
}
searchBookByname(name:string): Observable<Book[]>{
  const filter=`{"where":{"titre":"${name}"}}`;
  const params=new HttpParams().set("filter", filter);
    return  this.http.get<Book[]>(API_LINK, {params});
}
  

/*saveBook():Observable<Book[]>{
return this.http.put<Book[]>(API_LINK,this.books)
}*/
getSingleBook(id: number) : Observable<Book> {
  return this.http.get<Book>(API_LINK + `/${id}`);
}
deleteBook(id:number) {
  return this.http.delete(API_LINK+`/${id}`)
}
 
/*deleteBook (book: Book) {
  const index = this.books.findIndex (
    (bookEl)=>{
      if (bookEl==book)
     { return true;}
    }
  )

    this.books.splice(index, 1);
   this.emitBooks;
}*/

/*
removeBook(book: Book) {
  if(book.photo) {
    const storageRef = firebase.storage().refFromURL(book.photo);
    storageRef.delete().then(
      () => {
        console.log('Photo removed!');
      },
      (error) => {
        console.log('Could not remove photo! : ' + error);
      }
    );
  }
  const bookIndexToRemove = this.books.findIndex(
    (bookEl) => {
      if(bookEl === book) {
        return true;
      }
    }
  );
  this.books.splice(bookIndexToRemove, 1);
  this.saveBooks();
  this.emitBooks();
}*/


/*uploadFile(file: File) {
  return new Promise (
    (resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase.storage().ref()
        .child('images/' + almostUniqueFileName + file.name).put(file);
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('Chargement…');
        },
        (error) => {
          console.log('Erreur de chargement ! : ' + error);
          reject();
        },
        () => {
          resolve(upload.snapshot.ref.getDownloadURL());
        }
      );
    }
  );
}*/

}
