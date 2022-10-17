document.addEventListener('DOMContentLoaded', function(){
     let username = "{{username}}"
     var list;
     var newlist;
     let url = window.location.origin

     let request = new XMLHttpRequest();
     request.open("GET", url + "/api/{{recipient}}");
     request.send();
     request.onload = () => {
         if (request.status === 200) {
             let body = document.querySelector('#body');
             list = JSON.parse(request.response);
             newlist = list;
             for (let obj of JSON.parse(request.response)) {
                    if (obj[0] === username ) {
                         var tag = document.createElement('h5');
                         tag.textContent = obj[2];
                         tag.setAttribute('style', 'text-indent: 85%;')
                         body.appendChild(tag);
                         var date = document.createElement('p');
                         date.textContent = obj[3];
                         date.setAttribute('style', 'text-indent: 85%;')
                         body.appendChild(date);
                    } else {
                         var tag = document.createElement('h5');
                         tag.textContent = obj[2];
                         body.appendChild(tag);
                         var date = document.createElement('p');
                         date.textContent = obj[3];
                         body.appendChild(date);
                    }
             }
         }
     }
     function refresh() {
         let request = new XMLHttpRequest();
         request.open("GET", url + "/api/{{recipient}}");
         request.send();
         request.onload = () => {
             if (request.status === 200) {
                 newlist = JSON.parse(request.response);
                 if (newlist.length > list.length){
                     var count = newlist.length - list.length;
                     for (let i = list.length -1; i < newlist.length-1; i++){
                         if (newlist[i+1][0] === username ) {
                             var tag = document.createElement('h5');
                             tag.textContent = newlist[i+1][2];
                             tag.setAttribute('style', 'text-indent: 85%;')
                             body.appendChild(tag);
                             var date = document.createElement('p');
                             date.textContent = newlist[i+1][3];
                             date.setAttribute('style', 'text-indent: 85%;')
                             body.appendChild(date);
                         } else{
                             var tag = document.createElement('h5');
                             tag.textContent = newlist[i+1][2];
                             body.appendChild(tag);
                             var date = document.createElement('p');
                             date.textContent = newlist[i+1][3];
                             body.appendChild(date);
                         }
                     }
                     list = newlist;
                 }
             }
         }
     }
     setInterval(refresh, 1000);
     document.querySelector('#submit').disabled = true;

     document.querySelector('#message').onkeyup = () => {
          if (document.querySelector('#message').value.length > 0){
               document.querySelector('#submit').disabled = false;
          }
          else {
               document.querySelector('#submit').disabled = true;
          }
     }
     document.querySelector('#form').onsubmit = () => {
          let message = document.querySelector('#message').value;
          let newmessage = new XMLHttpRequest();
          newmessage.open("POST", url + "/messages/{{recipient}}:" + message);
          newmessage.send();
          request.onload = () => {
               if (request.status !== 200) {
                    alert("You Are Disconnected...")
               }
          }
          document.querySelector('#message').value = '';
          document.querySelector('#submit').disabled = true;
          return false
     }
});