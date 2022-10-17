document.addEventListener('DOMContentLoaded', function(){
     document.querySelector('#submit').disabled = true;

     document.querySelector('#name').onkeyup = () => {
          if (document.querySelector('#name').value.length > 0){
               document.querySelector('#submit').disabled = false;
          }
          else {
               document.querySelector('#submit').disabled = true;
          }
     }
     document.querySelector('#submit').onclick = () => {
          const name = document.querySelector('#name').value.toLowerCase().trim();
          number = document.querySelector('#number').value;
          fetch(`https://api.coincap.io/v2/assets/${name}`)
          .then(response => response.json())
          .then(data => {
               try {
                    document.querySelector('h2').innerHTML = `${number} ${name}s costs $${(data.data.priceUsd * number).toFixed(3)}`;
               } catch(err){
                    document.querySelector('h2').innerHTML = 'Invalid Coin Name';
               }

          })
          document.querySelector('#name').value = '';
          document.querySelector('#number').value = '';
          document.querySelector('#submit').disabled = true;
          return false
     }
})