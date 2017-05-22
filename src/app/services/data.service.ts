import { Injectable } from '@angular/core';
import { HttpModule,Http,Response } from '@angular/http';
import 'rxjs';
@Injectable()
export class DataService {
       
constructor(private http:Http){

}
    getQuizData() {
        return this.http.get('http://54.169.217.88/questions/fetch/?unique_key=')
        .map((response:Response)=>{
                const data= response.json();
                return data;

        })
    }

}