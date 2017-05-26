import { DataService } from './../services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [DataService]
})
export class GameComponent implements OnInit {
  quizdata: any
  constructor(private router: Router, private ds: DataService) { }

  ngOnInit() {
    console.log('hello u just entered game component"')

    this.fetchQuizDetails()
    //console.log(this.quizdata.quiz,this.quizdata.options)
  }
  returnHome() {
    this.router.navigate(['/'])
  }

  fetchQuizDetails() {
    this.quizdata = this.ds.getQuizData().subscribe(
      data =>{
        this.quizdata = data
        console.log(this.quizdata)
      }
    )

  }
}
