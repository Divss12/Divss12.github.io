var peerId = null;
var connected = false;
var peer = null; // own peer object
var conn = null;

function init() {
    peer = new Peer();
    
    peer.on('open', function(id){
        peerId = id;
        console.log(id)
        //
    });
    peer.on('connection', function(c) {
        if(connected){c.close();}
        else{
            connected = true;
            conn = c;
            initConnection(true);
        }
    });
    peer.on('disconnected', function(){
        peer.reconnect();
    });
    peer.on('close', function(){
        conn = 'null'
    });
    peer.on('error', function(err){console.log(err)});
}

function connect(){
    if(conn){conn.close();}
    var id = document.getElementById("peer_id").value
    conn = peer.connect(id);
    initConnection(false);
}

function initConnection(black){
    conn.on('open', function(){
        console.log("connected")

        initGame(black);
    })
    
}

init();

function initGame(black){
    chess = new Chess(conn, black);
    chess.display(chess.board, black);
    chess.start();

    conn.on('data', function (data){
        let start = data[0]+data[1]
        let end = data[2]+data[3]
        console.log("data received ", start, end)
        chess.move(start, end, true)
    })
}

