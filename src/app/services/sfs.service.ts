import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

declare var window: any;
declare var SFS2X: any;
// import {SFS2X,SmartFox} from '../assets/sfs2x-api-1.7.3.js'
@Injectable()
export class SFService {
    sfs: any;
    roomId:string;
     tosend = new BehaviorSubject<any>(0);
    
    initializeEventListeners() { // try to add all event listeners here
        this.sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, window);
        this.sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost, window);
        this.sfs.addEventListener(SFS2X.SFSEvent.LOGIN, onLogin, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, onLoginError, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, onExtensionResponse, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.ROOM_ADD, onRoomCreated, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.ROOM_CREATION_ERROR, onRoomCreationError, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, this.onRoomJoined, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, onRoomJoinError, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.USER_COUNT_CHANGE, this.sendReady, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.USER_ENTER_ROOM, onUserEnterRoom, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.USER_EXIT_ROOM, onUserExitRoom, this);

        function onConnection(evtParams) {
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
        function onLoginError(evtParams) {
            console.log("Login failure: " + evtParams.errorMessage);
        }
        function onExtensionResponse(evtParams) {
            console.log(evtParams);
        }
        function onLogin(evtParams) {
            console.log("Login successful!");
            
        }
        function onRoomCreated(evtParams) {
            console.log("Room created: " + evtParams.room);
        }

        function onRoomCreationError(evtParams) {
            console.log("Room creation failure: " + evtParams.errorMessage);
        }
        function onRoomJoined(evtParams) {
            console.log("Room joined successfully: " + evtParams.room);
        }

        function onRoomJoinError(evtParams) {
            console.log("Room joining failed: " + evtParams.errorMessage);
        }
        function onUserCountChange(evtParams,self=this) {
            var room = evtParams.room;
            var uCount = evtParams.uCount;
            var sCount = evtParams.sCount;
            if (uCount == 2) {
                //call ready request
                              
            }
            console.log("Room: " + room.name + " now contains " + uCount + " users and " + sCount + " spectators");
        }
        function onUserEnterRoom(evtParams) {
            var room = evtParams.room;
            var user = evtParams.user;
             
            console.log("User " + user.name + " just joined Room " + room.name);
        }
        function onUserExitRoom(evtParams) {
            var room = evtParams.room;
            var user = evtParams.user;

            console.log("User " + user.name + " just left Room " + room.name);
        }

    }
    initiateSFX() {

        //
        let config: any = {};
        config.host = 'stg-sf.sportsunity.co';// "stg-sf.sportsunity.co";
        config.port = 8888;
        config.useSSL = false;
        config.zone = "SportsUnity"//"BasicExamples";
        config.debug = false;
        //
        this.sfs = new SFS2X.SmartFox(config);
        //
        this.initializeEventListeners();
        //console.log(this, window)

        this.sfs.connect()

    }
    testSFXWorking() {
        console.log(this.sfs.isConnected());
    }
    sendGameRoomRequest() {
        var object: any = {}
        object.rg = "g1";
        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
        object.rn = randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        this.sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, onExtensionResponse, window);

        this.sfs.send(new SFS2X.Requests.System.ExtensionRequest("g", object));

        // Send two integers to the Zone extension and get their sum in return

        function onExtensionResponse(evtParams) {
            if (evtParams.cmd == "g") {
                var responseParams = evtParams.params;

                // We expect a number called "sum"
                console.log(responseParams);
            }
        }


    }
    onRoomJoined(evtParams) {
            console.log("Room joined successfully: " + evtParams.room);
            this.roomId = evtParams.room
            this.tosend.next(evtParams);
        }
    sendReady(evtParams:any) {
        var room = evtParams.room;
            var uCount = evtParams.uCount;
            var sCount = evtParams.sCount;
            if (uCount == 2) {
                //call ready request
                let obj = {
                    REMATCH:null
                }
                this.sfs.send(new SFS2X.Requests.System.ExtensionRequest("r",obj,this.roomId));
                console.log("paHUCH GAYA CHUTYA ")
                
            }
            console.log("Room: " + room.name + " now contains " + uCount + " users and " + sCount + " spectators");
        
    }
    sendReady2() {
                //call ready request
                let obj = {
                    REMATCH:''
                }
                this.sfs.send(new SFS2X.Requests.System.ExtensionRequest("r",obj,this.roomId));
                console.log("paHUCH GAYA CHUTYA 2")
                
            
            //console.log("Room: " + room.name + " now contains " + uCount + " users and " + sCount + " spectators");
        
    }
    sendQA(questionno) {
                //call ready request
                let obj = {
                    qn:questionno ,
                    ao:"no_answer",
                    d:80000
                }
                this.sfs.send(new SFS2X.Requests.System.ExtensionRequest("q",obj,this.roomId));
                console.log("qa request")
                
            
            //console.log("Room: " + room.name + " now contains " + uCount + " users and " + sCount + " spectators");
        
    }
    loginSFS(username: string, self = this) {


        // Login
        this.sfs.send(new SFS2X.Requests.System.LoginRequest(username, "", null, "SportsUnity"));


        function onLogin(evtParams) {
            var params: any = {};
            params.n1 = 26;
            params.n2 = 16;
            console.log("Login successful!");


            // public void randomOpponent(String jid, String level) {
            // GameKeyGenerator.getInstance().generateRoomKey();
            // String roomName = GameKeyGenerator.getInstance().getRoomKey(jid);
            // ISFSObject object = new SFSObject();
            // object.putUtfString(GameConstant.PARAM_NAME_ROOM_GROUP, ROOM_GROUP_ID+level);
            // object.putUtfString(GameConstant.PARAM_ROOM_NAME, roomName);
            // SFSController.getSFSClient().send(new ExtensionRequest(GameConstant.GAME_REQUEST_ID, object));
            // }

            // public void randomOpponent(String jid, String level) {
            // GameKeyGenerator.getInstance().generateRoomKey();
            // String roomName = GameKeyGenerator.getInstance().getRoomKey(jid);
            // ISFSObject object = new SFSObject();
            // object.putUtfString("rg", "g1");
            // object.putUtfString("rn", roomName);
            // SFSController.getSFSClient().send(new ExtensionRequest("g", object));
            // }

        }

    }
}