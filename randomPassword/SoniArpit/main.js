const result = document.querySelector("#result")
const UNInum = [48, 57]
const UNIupper = [65, 90]
const UNIlower = [97, 122]
const UNIsym = [33, 47]
const clipboard = document.querySelector("#clipboard")
const copy_btn = document.querySelector("#copy-text")

clipboard.addEventListener('click', () => {
	
	const password = result.value;
	
	if(!password) { return; }
	
	result.value = password;
	result.select();
	document.execCommand('copy');
	// alert('Password copied to clipboard');
    copy_btn.innerText = "Copied"
});



document.querySelector("#generate").addEventListener("click",()=>{
    const length = document.querySelector("#length").value
    const upper = document.querySelector("#uppercase").checked
    const lower = document.querySelector("#lowercase").checked 
    const numbers = document.querySelector("#numbers").checked 
    const symbols = document.querySelector("#symbols").checked 

    const rand_selector = []
    const password = []

    if(upper === true){
        for(let i=UNIupper[0]; i<UNIupper[1]; i++){
            rand_selector.push(i)
        }
    }

    if(lower === true){
        for(let i=UNIlower[0]; i<UNIlower[1]; i++){
            rand_selector.push(i)
        } 
    }

    if(numbers === true){
        for(let i=UNInum[0]; i<UNInum[1]; i++){
            rand_selector.push(i)
        }
    }

    if(symbols === true){
        for(let i=UNIsym[0]; i<UNIsym[1]; i++){
            rand_selector.push(i)
        }
    }

    for(let i = 0; i< length; i++){
        password.push(String.fromCharCode(rand_selector[Math.floor(Math.random()*rand_selector.length)]))
    }
    result.value=password.join("")

    copy_btn.innerText = "Copy"
})