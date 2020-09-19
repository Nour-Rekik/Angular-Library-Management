import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Abonne } from '../models/abonné';
import { Subscription } from 'rxjs';
import { AbonneService } from '../services/abonne.service';
import { Router } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-abonne-list',
  templateUrl: './abonne-list.component.html',
  styleUrls: ['./abonne-list.component.scss']
})
export class AbonneListComponent implements OnInit {

  membres: Abonne[];
  chaine="";
  searchResult:Abonne[];
  membreSubscription: Subscription;
  public disabledBackground : boolean = false;

  constructor(private AbonneService: AbonneService, private router: Router) {}

  ngOnInit() {
    this.membreSubscription = this.AbonneService.membresSubject.subscribe(
      (membres: Abonne[]) => {
        this.membres = membres ;
      }
    );
    this.AbonneService.getMembres().subscribe(
(membres:Abonne[])=>{
  this.membres=membres;
},
(error)=>{
  console.log(error);
}

    );
    this.AbonneService.emitAbonne();
  }
  
  onNewMembre() {
    this.router.navigate(['/membres', 'new']);
  }

  onDeleteMembre(membre:Abonne) {
    this.AbonneService.deletemembre(membre.id).subscribe(
(reponse)=>{
  console.log(reponse);
  this.router.navigate(['/membres']);
}

    );
    
  /*  const index =this.membres.findIndex(
      (membreEl)=>{
        if (membreEl==membre)
        {return true};
      }
    )
    this.membres.splice(index,1);
 this.AbonneService.saveMembre().subscribe(
(res)=>{
  console.log(res);
},
(erreur)=>{
console.log(erreur);
}

 )
    this.AbonneService.emitAbonne;*/
  }

  onViewMembre(id: number) {
    this.router.navigate(['/membres', 'view', id]);
    this.searchResult=[];
    this.chaine='';
  }
  
  search(){
    const name =this.chaine.trim();
    if(name.length){
    
    this.AbonneService.searchMembreByname(name).subscribe(
       (membres)=>{
         console.log(membres);
    this.searchResult=membres;
       }
    
    
    )}
      }
  
  ngOnDestroy() {
    this.membreSubscription.unsubscribe();
  }
}
