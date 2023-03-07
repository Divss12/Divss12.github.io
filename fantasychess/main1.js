var peer = new Peer();
peer.on('open', function (id){
    console.log(id)
    const idElement = document.createElement('p')
    const node = document.createTextNode('ID: ' + id)
    idElement.appendChild(node);
    document.body.appendChild(idElement);
})

var connection;

function connect(){
    var id = document.getElementById("peer_id").value
    connection = peer.connect(id)
    connection.send("hiii!")
}

peer.on("connection", function(conn){
    console.log("hi")
    connection = conn;
})

connection.on('data', function(data){
    console.log("data recieved")
})