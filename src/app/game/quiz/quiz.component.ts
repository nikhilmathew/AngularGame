import { SFService } from './../../services/sfs.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  @Input() questions: any;
  
  constructor(private sfx: SFService) { }

  ngOnInit() {
    
  }

  
}
