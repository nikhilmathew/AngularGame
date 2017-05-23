
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GameComponent } from './game/game.component';
import { UserdetailComponent } from './homepage/userdetail/userdetail.component';
import { MaterialModule } from '@angular/material'
import { ToasterService } from './services/toaster.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { QuizComponent } from './game/quiz/quiz.component';
import { SFService } from './services/sfs.service'
import { DataService } from './services/data.service';
const appRoutes : Routes = [
  { path:'game', component:GameComponent},
  { path:'', component: GameComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    GameComponent,
    UserdetailComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [ToasterService,SFService,DataService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
