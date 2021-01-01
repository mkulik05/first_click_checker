let socket = io("http://3.126.139.85/");
let recursion = () => {
    setTimeout(() => {
        socket.emit('get_data', "");
        socket.once('data', (data) => {
            if (data["ready_to_redirect"]){
                window.location="http://192.168.100.7:5000/static/res_table.html"
            }
            if (typeof data["sequence"][0] != "undefined"){
                document.getElementById("text").innerHTML = data["sequence"][0]
                
            } else {
                document.getElementById("text").innerHTML = ""
            }
            if (typeof data["sequence"][1] != "undefined"){
                document.getElementById("text2").innerHTML = data["sequence"][1]
                
            } else {
                document.getElementById("text2").innerHTML = ""
            }
            if (typeof data["sequence"][2] != "undefined"){
                document.getElementById("text3").innerHTML = data["sequence"][2]
                
            } else {
                document.getElementById("text3").innerHTML = ""
            }
          });
        recursion()
    },500)
}
recursion()
//document.getElementById("text").innerHTML = "some text"
