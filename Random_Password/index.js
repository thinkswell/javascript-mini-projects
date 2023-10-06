//Selector
const $ = (selector) => document.querySelector(selector);

//Range
const range = $('#range'),
      length = $('#length');

range.addEventListener('input', function(){
  const value = this.value;
  length.innerHTML = value;
});

//Methods
const getLower = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97),
      getUpper = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65),
      getNumber = () => Math.floor(Math.random() * 10),
      getSymbol = () => '~!@#$%^&*()_+{}":?><;.,'[Math.floor(Math.random() * 23)];

//Password
const password_field = $('#password'),
      generate_button = $('#generate_button');

//Generate Password
const generatePassword = () => {
  //Toggles
  const uppercase = Number($('#uppercase').checked),
        numbers = Number($('#number').checked),
        symbols = Number($('#symbols').checked);
  
  //Password
  let password = '';
  
  //Looping
  const methodLength = uppercase + numbers + symbols,
        methods = [
          getLower, 
          uppercase && getUpper, 
          numbers && getNumber, 
          symbols && getSymbol
        ].filter((method) => Boolean(method));
  
  for(var i = 0; i < range.value; i++){
    const random = Math.floor(Math.random() * methods.length);
    password += methods[random]();
  };
  
  password_field.value = password;
};

//Call to action
generate_button.addEventListener('click', generatePassword);
generatePassword();

//Clipboard
const clipboard = $('#clipboard'),
      message = $('#message');

clipboard.addEventListener('click', () => {
  const value = password_field.value;
  navigator.clipboard.writeText(value);
  message.innerText = "Copied"
  setTimeout(() => {
    message.innerText = "";
  }, 3000);
});