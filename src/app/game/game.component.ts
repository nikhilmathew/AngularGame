import { SFService } from './../services/sfs.service';
import { DataService } from './../services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [DataService]
})
export class GameComponent implements OnInit {
  @Output() quizdata: any
  username: string="nik";
  maxticks = 60
  ticks = 0
  timer2 = 60000
  datafetched =false;
  constructor(private router: Router, private ds: DataService, private sfx: SFService) { }

  ngOnInit() {
    this.sfx.initiateSFX()
    console.log('hello u just entered game component"')
    let timer = Observable.timer(1, 1000);
    timer.subscribe(t => this.ticks = this.maxticks - t);
    this.fetchQuizDetails()
    setInterval(() => {
      this.timer2 -= 1
    }, 1)

    //console.log(this.quizdata.quiz,this.quizdata.options)
  }
  returnHome() {
    this.router.navigate(['/'])
  }

  fetchQuizDetails() {
    this.quizdata = this.ds.getQuizData().subscribe(
      data => {
        this.quizdata = data
        console.log(this.quizdata.questions)
        this.datafetched=true
      }
    )

  }
  testSFSWorking() {
    this.sfx.testSFXWorking()
  }
  loginSFS() {
    this.sfx.loginSFS(this.username);
  }

}
