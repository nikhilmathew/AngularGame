import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
@Output() passUsername = new EventEmitter<string>();
user :string="";
  constructor() { }

  ngOnInit() {
    
  }

onSelected(){
  this.passUsername.emit(this.user);
}
}
