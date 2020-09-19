import { Component, OnInit } from '@angular/core';
import { EmpruntService } from 'src/app/services/emprunt.service';
import { BookService } from 'src/app/services/book.service';
import { AbonneService } from 'src/app/services/abonne.service';
import { Book } from 'src/app/models/book';
import { HttpClient } from '@angular/common/http';
import { Abonne } from 'src/app/models/abonné';
import { Emprunt } from 'src/app/models/emprunt';
import { NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
const link='http://localhost:3000/api/books';
const api_link="http://localhost:3000/api/abonnes";
@Component({
  selector: 'app-emprunt-form',
  templateUrl: './emprunt-form.component.html',
  styleUrls: ['./emprunt-form.component.scss']
})
export class EmpruntFormComponent implements OnInit {

  public searchLoansResult: Emprunt[] ;
  searchText;


  public displayMessageModal: boolean = false;
  public simpleLoan =new  Emprunt();
  public messageModal: string;
  public id : number;
  public displayType : string = 'Id';
  public maxDate: Date;
  public isFormSubmitted: boolean = false;
  public titleSaveOrUpdate: string = 'Add New Loan Form';
  public headsTab = ['ID', 'TITLE', 'EMAIL', 'LAST NAME', 'date_reservation', 'date_retour'];
  public customerId: number;
  public isDisplaySendEmailForm: boolean = false;
  public disabledBackground : boolean = false;
  public isNoResult: boolean = true;
  public types = [ 'id', 'Maximum date'];
  public actionButton: string = 'Save';

  constructor(private empruntService: EmpruntService, private bookService: BookService, 
    private abonneService: AbonneService, private http: HttpClient, private router :Router
  ) { }

  ngOnInit(): void {
  }
  saveLoan(addLoanForm: NgForm){
    this.displayMessageModal = false;
    if(!addLoanForm.valid){
        window.alert('Error in the form');
    }
    let book = this.http.get<Book>(link + `/${this.simpleLoan.code_livre}`);
    let membre = this.http.get<Abonne>(api_link+`/${this.simpleLoan.id_membre}`);
    forkJoin([book, membre]).subscribe(
      (results) => {
      if((results[0] && results[0].id) && (results[1] && results[1].id)){
        this.simpleLoan.code_livre = results[0].id;
        this.simpleLoan.id_membre = results[1].id;
        this.saveNewLoan(this.simpleLoan);
      }else{
        
       this.messageModal='An error occurs when saving the loan data. May be data are not correct';
        
    }
    },
      (err)=>{console.log(err);
       


    });   



  }

saveNewLoan(simpleLoan: Emprunt){
  simpleLoan.date_reservation = this.setLocalDateDatePicker(simpleLoan.date_reservation);
  simpleLoan.date_retour = this.setLocalDateDatePicker(simpleLoan.date_retour);
  
  this.empruntService.saveLoan(simpleLoan).subscribe(
          (result: Emprunt) => {
             if(result){
              this.messageModal='Save operation correctly done';
              this.router.navigate(['/emprunt']);
             }
          },
          error => {
            console.log(error);
           
            this.messageModal='An error occurs when saving the loan data maybe the loan is already reserve';
          }
  );
}
setLocalDateDatePicker(date: Date): Date {
  var localDate = new Date(date);
  if(localDate.getTimezoneOffset() < 0){
      localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset() );
  }else{
    localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset() );
  }
  return localDate;
}

searchLoansByType(searchLoanForm : NgForm){

  this.displayMessageModal = false;
  if(!searchLoanForm.valid){
      window.alert('Error in the form');
  }
  if(this.displayType === 'Id'){
      this.searchLoansResult = [];
      this.empruntService.searchLoansById(this.id).subscribe(
              (result: Emprunt[]) => {
                if(result && result != null){
                  this.searchLoansResult = result;
            }
              error => {
                console.log(error);
                this.messageModal='An error occurs when searching the loan data';
              } })
            
  } else if(this.displayType === 'Maximum date'){
      this.searchLoansResult = [];
      this.empruntService.searchLoansByMaximumDate(this.maxDate).subscribe(
              (result: Emprunt[]) => {
                if(result && result != null){
                  this.searchLoansResult = result;
              }
              },
              error => {
                    this.messageModal='An error occurs when searching the loan data';
              }
      );
  }
  this.isFormSubmitted = searchLoanForm.submitted;
}  

clearForm(addLoanForm: NgForm){
  addLoanForm.form.reset(); 
  this.displayMessageModal = false;
}

closeLoan(loan: Emprunt){
  
  this.displayMessageModal = false;
  let simpleLoan : Emprunt ;
  let book = this.http.get<Book>(link+loan.code_livre);
  let customer = this.http.get<Abonne>(api_link +loan.id_membre);
  forkJoin([book, customer]).subscribe(results => {
    if((results[0] && results[0].id) && (results[1] && results[1].id)){
      simpleLoan.code_livre = results[0].id;
      simpleLoan.id_membre = results[1].id;
      this.empruntService.closeLoan(simpleLoan).subscribe(
        result => {
           if(result){
              
              this.messageModal='Loan closed';
           }
        },
        (erreur)=>{console.log(erreur);}
        );
    }
  });   
    
}
displaySendEmailForm(id: number){
  this.customerId = id;
  this.isDisplaySendEmailForm = true;
  this.disabledBackground = true;
  this.displayMessageModal = false;
 }



}
