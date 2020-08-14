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
        if (yes) {
            score=data["score"]
            
            if (typeof score[name] != "undefined"){
                score[name]=parseInt(score[name])+1
            } else {
                score[name]='1'
            }
            let xhr4 = new XMLHttpRequest();
            xhr4.open("POST", "http://192.168.100.7:5000/change_score?name="+name+"&score="+score[name]);
            console.log(score[name])
                
            xhr4.send("");
        } else {
            let xhr3 = new XMLHttpRequest();
            xhr3.open("POST", "http://192.168.100.7:5000/del_data?name="+name);
                
            xhr3.send("");
        }
    }
}
//document.getElementById("text").innerHTML = "some text"
