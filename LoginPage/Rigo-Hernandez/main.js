const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const themes = document.getElementById('icon')
const body = document.getElementById('body')
const sine = document.getElementById('sine')

themes.addEventListener('click', ()=>{
	console.log('clicked!!')
	body.classList.toggle('nite')
	sine.classList.toggle('nite1')

})

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});