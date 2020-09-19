import { Component, OnInit } from '@angular/core';
import { Emprunt } from 'src/app/models/emprunt';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpruntService } from 'src/app/services/emprunt.service';

@Component({
  selector: 'app-single-emprunt',
  templateUrl: './single-emprunt.component.html',
  styleUrls: ['./single-emprunt.component.scss']
})
export class SingleEmpruntComponent implements OnInit {

  
 emprunt:Emprunt;
 id : number=0;
 
   constructor(private route: ActivatedRoute, private empruntService: EmpruntService,
               private router: Router) {}
 
   ngOnInit() {
    this.emprunt=new Emprunt();
     this.id = this.route.snapshot.params['id'];
     this.empruntService.getSingleLoan(this.id).subscribe (
       (emprunt: Emprunt) => {
         this.emprunt = emprunt;
       },
       (erreur)=>{
         console.log(erreur);
       }
     );
   }
   onBack() {
    this.router.navigate(['/emprunt']);
  }
}
