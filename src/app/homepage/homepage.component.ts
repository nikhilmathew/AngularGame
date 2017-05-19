import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
   user :string="nikhil"

  constructor(private router: Router) { }

  ngOnInit() {
  }

startFreeMatchCall(){
  console.log("has to call new component to replace homepage ");
  this.router.navigate(['/game'])
}
}
