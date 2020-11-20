let socket = io();
let wait = () => {
    socket.emit('null', '');
    setTimeout(() =>{
        window.location="http://192.168.100.7:5000/static/result.html"
    },2000)
}
let putTextInTable = (score) => {
    for (let i=0; i<score.length; i++) {
        document.getElementById("name"+i).innerHTML = score[i][0]
        document.getElementById("score"+i).innerHTML = score[i][1]
    }
    wait()
}

let create_table = (score_arr) => {
    let a = []
    for(let i = 0; i<score_arr.length; i++) {
        console.log("debug")
        a.push(document.createElement("tr"))
        a[i].innerHTML = " <td id='name"+i+"'></td><td id='score"+i+"'></td>"; 
        table = document.getElementById("table")
        table.appendChild(a[i]);
    }
    putTextInTable(score_arr)
}


let sort = () => {
    let sorted = false
    socket.emit('get_data', "");
    socket.once('data', (data) => {
        let score=data["score"]
        let values=Object.values(score)
        let keys=Object.keys(score)
        let score_arr = []
        console.log(score)
        for(let i = 0; i<values.length; i++) {
            score_arr_min = []
            score_arr_min.push(keys[i])
            score_arr_min.push(values[i])
            score_arr.push(score_arr_min)
        }
        console.log(score_arr)
        score_arr.sort((a, b) => {
            return b[1]-a[1]
        
        });

        if (!sorted){
            create_table(score_arr)
        }
        sorted=true
      });
    
}
sort()
