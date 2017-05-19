import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
 @Input() user

  constructor(private router: Router) { }

  ngOnInit() {
  }

startFreeMatchCall(){
  console.log("has to call new component to replace homepage ");
  if(this.user!="")
  this.router.navigate(['/game'])
}
catchUsername(user){
  this.user=user;
}
}
