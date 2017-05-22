import { ToasterService } from './../services/toaster.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
 @Input() user
showUserField :boolean = false;
  constructor(private router: Router,private toasterService :ToasterService) { }

  ngOnInit() {
    this.toasterService.showToaster('hello',10000);
    this.user=""
  }

startFreeMatchCall(){
  console.log("has to call new component to replace homepage ");
  if(this.user!=""){
    this.router.navigate(['/game'])
   
  }else{
     this.toasterService.showToaster('Username has Not been entered, Please enter a username',10000);
     this.showUserField=true
  }

}
catchUsername(user){
  this.user=user;
  console.log(user);
}
}
