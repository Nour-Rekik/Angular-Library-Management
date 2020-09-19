export class Abonne{
   public photo:string ;
   public  id : number;
    constructor(
      
      public nom:string='' ,
      public prenom: string  ='',
      public adresse :string ='',
      public cin : number =0 ,

      public date_adhesion : Date= new Date() ,
      public date_naiss : Date= new Date() ){}
                
    }