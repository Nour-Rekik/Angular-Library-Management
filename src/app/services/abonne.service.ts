import { Injectable } from '@angular/core';
import { Abonne } from '../models/abonné';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
const API_LINK = 'http://localhost:3000/api/abonnes';
@Injectable({
  providedIn: 'root'
})
export class AbonneService {

  membres: Abonne[] = [];
  membresSubject = new Subject<Abonne[]>();

  constructor( private http: HttpClient ) {}


  emitAbonne () {
    this.membresSubject.next(this.membres);
  }

  addMembre (abonne:Abonne) : Observable<Abonne>{
    this.membres.push(abonne);
    console.log(this.membres.length);
    
  //  abonne.id=( this.membres[this.membres.length -1].id )+ 1;
     
  //const token = localStorage.getItem('token');
  // const headers = new HttpHeaders().set(
   // 'authorization', token
   // );
    return this.http.post<Abonne>(API_LINK, abonne/*, {headers}*/);
  }

getMembres () : Observable<Abonne[]> {
  return this.http.get<Abonne[]>(API_LINK);
}
  
searchMembreByname(name:string): Observable<Abonne[]>{
  const filter=`{"where":{"nom":"${name}"}}`;
  const params=new HttpParams().set("filter", filter);
    return  this.http.get<Abonne[]>(API_LINK, {params});
}

getAbonne(id: number) : Observable<Abonne> {
  return this.http.get<Abonne>(API_LINK + `/${id}`);
}
 
saveMembre():Observable<Abonne[]>{
  return this.http.put<Abonne[]>(API_LINK,this.membres)
  }
deletemembre (id:number) {
  return this.http.delete(API_LINK+`/${id}`)
}
updateMembre(customer: Abonne): Observable<Abonne>{
  return this.http.put<Abonne>(API_LINK, customer);
}

}
