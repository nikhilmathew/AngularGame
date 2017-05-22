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
  quizdata: { quiz:string, options:string } 
  constructor(private router: Router,private ds: DataService) { }

  ngOnInit() {
    console.log('hello u just entered game component"')
    setTimeout(() => {
      this.fetchQuizDetails()
      //console.log(this.quizdata.quiz,this.quizdata.options)
    }, 3000);
  }
  returnHome() {
    this.router.navigate(['/'])
  }

  fetchQuizDetails() {
    //this.quizdata =this.ds.getQuizData();

  }
}
