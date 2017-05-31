import { Injectable, EventEmitter, OnInit } from '@angular/core';

declare var window: any;
declare var SFS2X: any;
// import {SFS2X,SmartFox} from '../assets/sfs2x-api-1.7.3.js'
@Injectable()
export class SFService {
    sfs: any;
    ngOnInit() {

    }
    initializeEventListeners() {

    }
    initiateSFX() {

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
        console.log(this, window)
        this.sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, window);
        this.sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost, this);

        function onConnection(evtParams, self = this) {
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
    loginSFS(username: string) {
        this.sfs.addEventListener(SFS2X.SFSEvent.LOGIN, onLogin, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, onLoginError, this);
        this.sfs.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, onExtensionResponse, this);

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

            function randomString(length, chars) {
                var result = '';
                for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
                return result;
            }
            var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            var object: any = {}
            object.rg = "g1";
            object.rn = randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');


            this.sfs.send(new SFS2X.Requests.System.ExtensionRequest("g", object));
        }

        function onLoginError(evtParams) {
            console.log("Login failure: " + evtParams.errorMessage);
        }
        function onExtensionResponse(evtParams) {
            if (evtParams.cmd == "add") {
                var responseParams = evtParams.params;

                // We expect a number called "sum"
                console.log("The sum is: " + responseParams.sum);
            }
        }
    }
}