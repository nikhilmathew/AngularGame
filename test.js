var config = {};
	config.host = "stg-sf.sportsunity.co";
	config.port = 9933;
    config.useSSL = false;
	config.zone = "SportsUnity";
	config.debug = true;
sfs = new SmartFox(config);
sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);

sfs.connect();

function onConnection(evtParams) {
    if (evtParams.success)
        console.log("Connection established");
    else
        console.log("Connection failed");
}

$('#clickme').on('click',function clickme (){
    console.log("Am I connected? " + sfs.isConnected());
})

