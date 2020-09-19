export class Emprunt{
    public id : number ;
   
    constructor(public code_livre : number=0 ,
        public id_membre : number=0 ,
        public date_reservation: Date= new Date(),
        public date_retour : Date= new Date()  ){}
                
    }