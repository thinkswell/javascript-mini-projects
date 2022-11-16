const strengthMeter = document.getElementById("strengthmeter");
const passwordInput = document.getElementById("passwordinput");
const reasons = document.getElementById("reasons");
const percentage = document.getElementById('percentage')

const calculatePasswordStrength = (password) => {
  const weaknes = [];
  weaknes.push(lengthWeakness(password));
  weaknes.push(lowercaseWeakness(password));
  weaknes.push(uppercaseWeaknes(password));
  weaknes.push(numberWeaknes(password));
  weaknes.push(specailCharacterWeaknes(password));
  weaknes.push(repeatWords(password))
  weaknes.push(notAllowed(password))
  return weaknes;
};


const lengthWeakness = (password) => {
  const length = password.length;
  if (length <= 2 && length > 0) {
    return {
      message: "Your Password Is Super Short",
      deduction: 80,
    };
  }
  if (length <= 5 && length >2) {
    return {
      message: "Your Password Is Super Short",
      deduction: 60,
    };
  }
  if (length <= 8 && length > 5) {
    return {
      message: "Your Password Can be Bigger",
      deduction: 40,
    };
  }
  if (length < 10 && length > 8) {
    return {
      message: "Your Password Can be Bigger",
      deduction: 20,
    };
  }
  if (!length) {
    return {
      message: "Type Password",
      deduction: 100,
    };
  }
};


const updateStrengthMeter = () => {
  if(passwordInput.value){
  const weaknes = calculatePasswordStrength(passwordInput.value);
  let strength = 100;
  reasons.innerHTML = "";

  weaknes.forEach((weaknes) => {
    if (weaknes == null) return;
    strength -= weaknes.deduction;
    const message = document.createElement("div");
    reasons.appendChild(message);
    message.innerHTML = weaknes.message;
  });
  strengthMeter.style.setProperty("--strength", strength);
  if(strength>0)percentage.innerHTML = strength+'%'
  else percentage.innerHTML = 0 +'%'
}
else{
  reasons.innerHTML = 'Type Password'
  percentage.innerHTML = 0 +'%'
}
};


const lowercaseWeakness = (password) => {
  return characterTypeWeakness(password, /[a-z]/g, "Lowercase Character");
};


const uppercaseWeaknes = (password) => {
  return characterTypeWeakness(password, /[A-Z]/g, "Uppercase Character");
};


const numberWeaknes = (password) => {
  return characterTypeWeakness(password, /[0-9]/g, "Number Character");
};
const notAllowed = (password)=>{
  const match = password.match(/[\s]/) ||[]
  if(match.length>0){
    return{
      message: 'Spaces Are Not Allowed',
      deduction:100
    }
  }
}

const specailCharacterWeaknes = (password) => {
  const match = password.match(/[^0-9a-zA-Z\s]/) || [];
  if (match.length == 0) {
    return {
      message: "Need Atleast One Special Character",
      deduction:10
    };
  }
};


const characterTypeWeakness = (password, regex, type) => {
  const match = password.match(regex) || [];
  if (match.length === 0) {
    return {
      message: "Your Password Had no " + type,
      deduction: 20,
    };
  }
  // if (match.length <= 1) {
  //   return {
  //     message: "Your Password Could Use More " + type,
  //     deduction: 5,
  //   };
  // }
};


const repeatWords = (password)=>{
const match = password.match(/(.)\1/g)
if(match){
  return{
    message:"Password has Repeated Characters",
    deduction:match.length*2
  }
}
}

passwordInput.addEventListener("input", updateStrengthMeter);
