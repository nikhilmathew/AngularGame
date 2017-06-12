import { SFService } from './../services/sfs.service';
import { DataService } from './../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [DataService]
})
export class GameComponent implements OnInit {
  @Output() quizdata: any
  @Output('catchme') ev2 = new EventEmitter<string>();
  username: string = "nik";
  maxticks = 30
  ticks = 30
  timer2 = 600
  timer;
  datafetched = false;
  commentary: boolean = true;
  question:number =0;
  constructor(private router: Router,private route: ActivatedRoute, private ds: DataService, private sfx: SFService) { }

  ngOnInit() {
    this.username = this.route.snapshot.params['username']
    this.sfx.initiateSFX()
    console.log('hello u just entered game component"')
    this.timer = Observable.timer(1000,1000);
    this.timer.subscribe(
      t => {
       if (this.ticks != 0) {
        
          this.ticks = this.maxticks - t
        }
      }
    );
    
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
  stopTimer(){
    this.timer.unsubscribe()
  }
  returnHome() {
    this.router.navigate(['/'])
  }

  fetchQuizDetails() {
    this.quizdata = this.ds.getQuizData(this.sfx.roomId).subscribe(
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
sendGameRoomRequest(){
  this.sfx.sendGameRoomRequest();
  this.loadQuestions();
}
sendReady(){
  this.sfx.sendReady2();
  this.ev2.emit('hello')
}
catchev(event){
  console.log(event)
}
sendQA(option){
  this.sfx.sendQA(this.question++,option);
}
loadQuestions(){
console.log(  this.fetchQuizDetails())
}
}
