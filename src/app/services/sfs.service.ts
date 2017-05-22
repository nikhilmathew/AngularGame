import { Injectable } from '@angular/core';
declare var SFS2X: any;
import '../../assets/SFS2X_API_JS.js'
@Injectable()
export class SFService {
    sfs:any;
    testSFX() {
        this.sfs = new SFS2X.SmartFox();
        console.log(this.sfs)
        this.sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);

        this.sfs.connect('stg-sf.sportsunity.co', 8080);

        function onConnection(evtParams) {
            if (evtParams.success)
                console.log("Connected to SmartFoxServer 2X!");
            else
                console.log("Connection failed. Is the server running at all?");
        }

    }
    loginSFS() {
        this.sfs.addEventListener(SFS2X.SFSEvent.LOGIN, onLogin, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, onLoginError, this);

        // Login
        this.sfs.send(new SFS2X.LoginRequest("sportsunity", "", null, "sports1234"));
        function onLogin(evtParams) {
            console.log("Login successful!");
        }

        function onLoginError(evtParams) {
            console.log("Login failure: " + evtParams.errorMessage);
        }
    }
}