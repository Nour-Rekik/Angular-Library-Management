import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AbonneService } from 'src/app/services/abonne.service';
import { Router } from '@angular/router';
import { Abonne } from 'src/app/models/abonné';
import { error } from 'protractor';

@Component({
  selector: 'app-abonne-form',
  templateUrl: './abonne-form.component.html',
  styleUrls: ['./abonne-form.component.scss']
})
export class AbonneFormComponent implements OnInit {

  abonneForm : FormGroup ;
  public displayMessageModal: boolean = false;
  public messageModal: string;
 // public customer = new Abonne();
  public actionButton: string = 'Save';
  public titleSaveOrUpdate: string = 'Add New Customer Form';


  constructor(private formBuilder: FormBuilder, private AbonnesService: AbonneService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.abonneForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', Validators.required],
      adresse: ['', Validators.required],
      photo: ['', Validators.required],
      date_adhesion: ['', Validators.required],
      date_naiss: ['', Validators.required],

    });
  }
 /* saveNewMembre(customer: Abonne){
   
    this.AbonnesService.addMembre(customer).subscribe(
            (result: Abonne) => {
               if(result.id)
               {
                   console.log(customer);
                   this.router.navigate(['/membres']);
               }
            },
            error => {
              console.log(error);
                this.messageModal='An error occurs when saving the customer data';
            }
    );
}*/

  /*saveOrUpdateMembre(addCustomerForm: NgForm){

    this.displayMessageModal = false;

    if(!addCustomerForm.valid){
      this.messageModal='Error in the form';
      console.log (this.messageModal);
    }
    if(this.actionButton && this.actionButton === 'Save'){
        this.saveNewMembre(this.customer);
    }else if(this.actionButton && this.actionButton === 'Update'){
        this.AbonnesService.updateMembre(this.customer).subscribe(
(resultat)=>{
  console.log ("membre updated successfully");
},
(error)=>{
  console.log (error);
}        );
    }
    this.titleSaveOrUpdate = 'Add New Customer Form';
    this.actionButton = 'Save';
}*/

  SaveAbonne(formulaire: NgForm) {
  
 
   /* const nom = this.abonneForm.get('nom').value;
    const prenom = this.abonneForm.get('prenom').value;
    const cin = this.abonneForm.get('cin').value;
    const adresse = this.abonneForm.get('adresse').value;
    const date_naiss = this.abonneForm.get('date_naiss').value;
    const date_adhesion = this.abonneForm.get('date_adhesion').value;
   
    const newMembre = new Abonne(nom,prenom,adresse,cin,date_adhesion,date_naiss);*/

  /*  if(this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }*/
    this.AbonnesService.addMembre(formulaire.value).subscribe(
      (abonne) => {
        console.log(abonne);
        this.router.navigate(['/membres']);
      },

      (erreur) => console.log(erreur)
    );
  
  
   
  }

}
