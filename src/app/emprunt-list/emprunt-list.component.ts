import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpruntService } from '../services/emprunt.service';
import{Emprunt} from 'src/app/models/emprunt';
import { Subscription, Subject } from 'rxjs';


@Component({
  selector: 'app-emprunt-list',
  templateUrl: './emprunt-list.component.html',
  styleUrls: ['./emprunt-list.component.scss']
})
export class EmpruntListComponent implements OnInit {

  constructor(private empruntService:EmpruntService , private router :Router) { }

  emprunts : Emprunt[];
  empruntsSubscription: Subscription;
  searchResult :Emprunt[];
  chaine:number ;
  date : Date;
  public disabledBackground : boolean = false;
  public displayType : string = 'Id';
  DISPLAY_ID = 'ID';
  DISPLAY_DATE='DATE';
  selectedType:string;

  ngOnInit() {
    console.log(this.displayType);
    this.empruntsSubscription = this.empruntService.empruntsSubject.subscribe(
      (emprunts: Emprunt[]) => {
        this.emprunts = emprunts;
      },
    
      (erreur)=>{console.log(erreur)}
      );
    this.empruntService.getLoan().subscribe(
(emprunts:Emprunt[])=>{
  this.emprunts=emprunts;
},
(erreur)=>{console.log(erreur);}


    );
    this.empruntService.emitEmprunts();
    this.searchResult=[];
  }

  onNewLoan() {
    this.router.navigate(['/emprunt', 'new']);
  }

  onDeleteLoan(emprunt: Emprunt) {
    this.empruntService.deleteLoan(emprunt.id).subscribe(
(reponse)=>{
  console.log(reponse);
  this.router.navigate(['/emprunt']);
},
(erreur)=>{console.log(erreur);}


    );
  }
  searchId(){
const id=this.chaine;

this.empruntService.searchLoansById(id).subscribe(
   (empruntes)=>{
     console.log(empruntes);
this.searchResult=empruntes;
   }


)
  }
  searchDate(){
    const date=this.date;
    
    this.empruntService.searchLoansByDate_res(date).subscribe(
       (empruntes)=>{
         console.log(empruntes);
    this.searchResult=empruntes;
       }
    
    
    )
      }

  onViewLoan(code_livre: number) {
    this.router.navigate(['/emprunt', 'view', code_livre]);
    this.searchResult=[];
    this.chaine=0;
    this.date = new Date()
  }
  
  ngOnDestroy() {
    this.empruntsSubscription.unsubscribe();
  }
  
  changeSuit(event) {
    console.log(this.selectedType);
    this.displayType = this.selectedType;
  }

}
