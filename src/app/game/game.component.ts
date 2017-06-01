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
  username: string = "nik";
  maxticks = 10
  ticks = 0
  timer2 = 600
  datafetched = false;
  commentary: boolean = true;
  constructor(private router: Router, private ds: DataService, private sfx: SFService) { }

  ngOnInit() {
    this.sfx.initiateSFX()
    console.log('hello u just entered game component"')
    let timer = Observable.timer(1, 1000);
    timer.subscribe(
      (t) => {
        if (this.ticks != 0) {
          this.ticks = this.maxticks - t
        }
      }
    );
    this.fetchQuizDetails()
    setInterval(() => {
      if (this.timer2 != 0) {
        this.timer2 -= 1
      }
    }, 1)
    setTimeout(() => {
      this.commentary = false
    }, 2000)
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
        this.datafetched = true
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
