import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{Emprunt}from '../models/emprunt';
const link='http://localhost:3000/api/emprunts';

@Injectable()

export class EmpruntService{
    emprunts : Emprunt[];

    empruntsSubject =new Subject<Emprunt[]>();
    
    constructor(private http: HttpClient) {   
      this.getLoan().subscribe(
      (empruntE:Emprunt[])=>{
        this.emprunts=empruntE;
      },
      (erreur)=>{
        console.log(erreur)
      }
    );
  }

    emitEmprunts() {
        this.empruntsSubject.next(this.emprunts);
      }
    
    saveLoan(Loan: Emprunt): Observable<Emprunt>{
      this.emprunts.push(Loan);
        return this.http.post<Emprunt>(link, Loan);
    }

    searchLoansById(id: number): Observable<Emprunt[]>{
      const filter=`{"where":{"id":"${id}"}}`;
      const params=new HttpParams().set("filter", filter);
        return  this.http.get<Emprunt[]>(link, {params});
    }
    searchLoansByDate_res(date_res: Date): Observable<Emprunt[]>{
      const filter=`{"where":{"date_reservation":"${date_res}"}}`;
      const params=new HttpParams().set("filter", filter);
        return  this.http.get<Emprunt[]>(link, {params});
    }
    getLoan ():Observable<Emprunt[]>{
        return this.http.get<Emprunt[]>(link);
    }
    getSingleLoan(id : number ):Observable<Emprunt>{
      return this.http.get<Emprunt>(link +`/${id}`);
    }

    searchLoansByMaximumDate(maxDate: Date): Observable<Emprunt[]>{
        let month : string = maxDate.getMonth() < 10 ? '0'+(maxDate.getMonth()+1): ''+(maxDate.getMonth()+1);
        let dayOfMonth : string = maxDate.getDate() < 10 ? '0'+maxDate.getDate(): ''+maxDate.getDate();
        let maxDateStr : string = maxDate.getFullYear() + '-' + month + '-' + dayOfMonth;
       return  this.http.get<Emprunt[]>(link+`/${maxDateStr}`);
   }
   closeLoan(simpleLoan: Emprunt): Observable<Boolean>{
    return this.http.post<Boolean>(link, simpleLoan);
}

deleteLoan (id: number) {
  return this.http.delete(link+`/${id}`)
  }
  
    










}

