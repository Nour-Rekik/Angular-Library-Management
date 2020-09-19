export class Book{
   public photo:string;
    public id:number
    constructor(
       
        public titre:string='', 
                public auteurs: string ='' , 
                public maison_edition :string ='', 
               
                public code_R : number=0 ){}
                
    }