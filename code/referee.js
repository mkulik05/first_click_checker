let socket = io();
let recursion = () => {
    setTimeout(() => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/data');
        xhr.send();
        xhr.onload = () => {
            console.log(xhr.responseText)
        let data = JSON.parse(xhr.responseText)
        if (typeof data["sequence"][0] != "undefined"){
            document.getElementById("currentName").innerHTML = data["sequence"][0]
        } else {
            document.getElementById("currentName").innerHTML = ""
        }
        }

        recursion()
    },500)
}
recursion()
let clicked = (yes) => {
    let xhr2 = new XMLHttpRequest();
    xhr2.open('GET', '/data');
    xhr2.send();
    xhr2.onload = () => {
        console.log(xhr2.responseText)
        let data = JSON.parse(xhr2.responseText)
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
                        socket.emit('change_score', score);
                    }

            } else {
                    socket.emit('del_data', "");
            }
        }
    }
}
//document.getElementById("text").innerHTML = "some text"
