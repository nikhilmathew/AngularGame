import { ToasterService } from './../../services/toaster.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  @Output() passUsername = new EventEmitter<string>();
  user: string = "";
  constructor(private ts: ToasterService) { }

  ngOnInit() {

  }

  onSelected() {
    if (this.user == "") {
      this.ts.showToaster("You still haven't entered a username, username is required to proceed", 6000)
    } else {
      this.passUsername.emit(this.user);
    }
  }
}
