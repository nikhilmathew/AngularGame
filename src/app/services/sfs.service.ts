import { Injectable, EventEmitter } from '@angular/core';
import  { Observable } from 'rxjs/Observable'
import  'rxjs'
declare var SmartFox : any
import '../../assets/sfs2x-api-1.7.3.js'
@Injectable()
export class SFService {
    sfs:any;
    testSFX() {
        this.sfs = new SmartFox();
        console.log(this.sfs,this.sfs.isConnected())
       // this.sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection , this.sfs);
        //console.log(SFS2X.isConnected())
        this.sfs.connect('localhost', 8080)
        function onConnection(evtParams) {
            if (evtParams.success)
                console.log("Connected to SmartFoxServer 2X!");
            else
                console.log("Connection failed. Is the server running at all?");
        }

    }
    testSFXWorking(){
        console.log(this.sfs.isConnected());
    }
    loginSFS() {
        // this.sfs.addEventListener(SFS2X.SFSEvent.LOGIN, onLogin, this);
        // this.sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, onLoginError, this);

        // // Login
        // this.sfs.send(new SFS2X.LoginRequest("sportsunity", "", null, "sports1234"));
        // function onLogin(evtParams) {
        //     console.log("Login successful!");
        // }

        // function onLoginError(evtParams) {
        //     console.log("Login failure: " + evtParams.errorMessage);
        // }
    }
}