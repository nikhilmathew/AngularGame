import { Injectable, EventEmitter ,OnInit } from '@angular/core';

declare var window: any;
declare var SFS2X: any;
// import {SFS2X,SmartFox} from '../assets/sfs2x-api-1.7.3.js'
@Injectable()
export class SFService {
    sfs: any;
    ngOnInit(){

    }
    testSFX() {
        
        //
        let config: any = {};
        config.host = '192.168.0.11';// "stg-sf.sportsunity.co";
        config.port = 8888;
        config.useSSL = false;
        config.zone = "SportsUnity"//"BasicExamples";
        config.debug = true;
        //
        this.sfs = new SFS2X.SmartFox(config);
        //
        console.log(this,window) 
        this.sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, window);
        this.sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost, this);
        
        function onConnection(evtParams,self=this) {
            if (evtParams.success)
                console.log("Connected to SmartFoxServer 2X!");
            else
                console.log("Connection failed. Is the server running at all?");
        }
        function onConnectionLost(evtParams) {
            var reason = evtParams.reason;

            if (reason != SFS2X.Utils.ClientDisconnectionReason.MANUAL) {
                if (reason == SFS2X.Utils.ClientDisconnectionReason.IDLE)
                    console.log("A disconnection occurred due to inactivity");
                else if (reason == SFS2X.Utils.ClientDisconnectionReason.KICK)
                    console.log("You have been kicked by the moderator");
                else if (reason == SFS2X.Utils.ClientDisconnectionReason.BAN)
                    console.log("You have been banned by the moderator");
                else
                    console.log("A disconnection occurred due to unknown reason; please check the server log");
            }
            else {
                // Manual disconnection is usually ignored
            }
        }
        this.sfs.connect()
        
    }
    testSFXWorking() {
        console.log(this.sfs.isConnected());
    }
    loginSFS(username:string) {
        this.sfs.addEventListener(SFS2X.SFSEvent.LOGIN, onLogin, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, onLoginError, this);

        // Login
        this.sfs.send(new SFS2X.Requests.System.LoginRequest(username, "", null, "SportsUnity"));


        function onLogin(evtParams) {
            console.log("Login successful!");
        }

        function onLoginError(evtParams) {
            console.log("Login failure: " + evtParams.errorMessage);
        }
    }
}