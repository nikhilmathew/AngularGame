import { DataService } from './../../services/data.service';
import { SFService } from './../../services/sfs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
question :any;
  constructor(private sfx :SFService,private ds: DataService) { }

  ngOnInit() {
    //console.log(this.sfx.testSFX())
    //  this.question = this.ds.getQuizData()
    //  console.log(this.question)
    this.ds.getQuizData()
    .subscribe(
      (questions:any) =>{
        console.log(questions)
      }
    )
}

}
