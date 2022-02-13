const form = document.querySelector(".typing-area"),
incoming_id = form.querySelector(".incoming_id").value,
inputField = form.querySelector(".input-field"),
sendBtn = form.querySelector("button"),
chatBox = document.querySelector(".chat-box");

form.onsubmit = (e)=>{
    e.preventDefault();
}

inputField.focus();
inputField.onkeyup = ()=>{
    if(inputField.value != ""){
        sendBtn.classList.add("active");
    }else{
        sendBtn.classList.remove("active");
    }
}

sendBtn.onclick = ()=>{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/insert-chat.php", true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
              inputField.value = "";
              scrollToBottom();
          }
          play_send();
      }
    }
    let formData = new FormData(form);
    xhr.send(formData);
}
chatBox.onmouseenter = ()=>{
    chatBox.classList.add("active");
}

chatBox.onmouseleave = ()=>{
    chatBox.classList.remove("active");
}

setInterval(() =>{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/get-chat.php", true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){  
          if(xhr.status === 200){
            let data = xhr.response;
            chatBox.innerHTML = data; 
            if(!chatBox.classList.contains("active")){
                scrollToBottom(); 
                play_receive();
              }
          }
      }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("incoming_id="+incoming_id); 
}, 500);

function scrollToBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
var receivedUrl = 'http://localhost/chatwithchb/javascript/received.mp3';
var sendUrl = 'http://localhost/chatwithchb/javascript/send.mp3';
  
  function play_send() {
    $('<audio id="openAudio"><source src="'+sendUrl+'" type="audio/mpeg">').appendTo('body');
    $('#openAudio').play();
  }

  function play_receive() {
    $('<audio id="closeAudio"><source src="'+receivedUrl+'" type="audio/mpeg">').appendTo('body');
    $('#closeAudio').play();
  }