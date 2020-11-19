let socket = io();
let clicked = () => {
    let url_string = window.location.href
    let url = new URL(url_string);
    let name = url.searchParams.get("name");
    send(name)    
}
let send = (msg) => {
      socket.emit('user_name', msg);
    };