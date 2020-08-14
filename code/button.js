let clicked = () => {
    let url_string = window.location.href
    let url = new URL(url_string);
    let c = url.searchParams.get("name");
    let time = Date.now()
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://192.168.100.7:5000/data?name="+c+"&time="+time);
  
    xhr.send("");
    
}
