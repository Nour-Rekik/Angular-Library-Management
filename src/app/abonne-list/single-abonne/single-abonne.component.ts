import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Abonne } from 'src/app/models/abonné';
import { ActivatedRoute, Router } from '@angular/router';
import { AbonneService } from 'src/app/services/abonne.service';

@Component({
  selector: 'app-single-abonne',
  templateUrl: './single-abonne.component.html',
  styleUrls: ['./single-abonne.component.scss']
})
export class SingleAbonneComponent implements OnInit {

  abonne: Abonne;
  id : number=0;


  constructor(private route: ActivatedRoute, private abonnesService: AbonneService,
              private router: Router) {}

  ngOnInit() {
    this.abonne = new Abonne();
     this.id = this.route.snapshot.params['id'];
    this.abonnesService.getAbonne(this.id).subscribe(
      (abonne: Abonne) => {
        this.abonne = abonne;
      },
      (erreur)=>{
        console.log(erreur)
      }
    );
  }
 
  onBack() {
    this.router.navigate(['/membres']);
  }

}
