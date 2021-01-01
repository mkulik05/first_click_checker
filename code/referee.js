let socket = io("http://3.126.139.85/");
let recursion = () => {
    setTimeout(() => {
        socket.emit('get_data', "");
        socket.once('data', (data) => {
            if (typeof data["sequence"][0] != "undefined"){
                document.getElementById("currentName").innerHTML = data["sequence"][0]
            } else {
                document.getElementById("currentName").innerHTML = ""
            }
          });
        recursion()
    },500)
}

recursion()

let clicked = (yes) => {
    flag=false
    socket.emit('get_data', "");
    socket.once('data', (data) => {
        let name=data["sequence"][0]
        if (typeof name != "undefined" && name != "undefined") {
            if (yes) {

                score=data["score"]
                
                    if (typeof score[name] != "undefined"){
                        score[name]=parseInt(score[name])+parseInt(document.getElementById("selectPoints").value)
                    } else {
                        score[name]=document.getElementById("selectPoints").value
                    }
                    if (typeof name !="undefined") {
                        if (!flag){
                            socket.emit('delay', parseInt(document.getElementById("change_delay").value));
                            socket.emit('change_score', score);
                            flag = true
                        }
                        
                    }

            } else {
                if (!flag){
                    flag = true
                    socket.emit('del_data', "");
                }
            }
        }
      });
}
//document.getElementById("text").innerHTML = "some text"
