import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  title = 'Library Administration';
    
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit() {
  }
  
  gotoBookPage(){
      this.router.navigateByUrl('/books');
  }
  
  gotoCustomerPage(){
      this.router.navigateByUrl('/membres');
  }
  
  gotoLoanPage(){
      this.router.navigateByUrl('/emprunt');
  }

}
