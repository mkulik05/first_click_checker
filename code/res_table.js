let wait = () => {
    let xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "http://192.168.100.7:5000/null");
        
    xhr2.send("");
    setTimeout(() =>{
        window.location="http://192.168.100.7:5000/static/result.html"
    },5000)
}
let putTextInTable = (score) => {
    for (let i=0; i<score.length; i++) {
        document.getElementById("name"+i).innerHTML = score[i][0]
        document.getElementById("score"+i).innerHTML = score[i][1]
    }
    wait()
}

let sort = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/data');
    xhr.send();
    xhr.onload = () => {
        let data = JSON.parse(xhr.responseText)
        let score=data["score"]
        let values=Object.values(score)
        let keys=Object.keys(score)
        let score_arr = []
        for(let i = 0; i<values.length; i++) {
            score_arr_min = []
            score_arr_min.push(keys[i])
            score_arr_min.push(values[i])
            score_arr.push(score_arr_min)
        }
        score_arr.sort((a, b) => {
            return b[1]-a[1]
        
        });
        putTextInTable(score_arr)
    }
    
}
sort()
