
window.onload = function(){
	const input = document.querySelector('input');
	const eye = document.querySelector('#password-eye');
	const eyeBtn = eye.closest('button');

	eyeBtn.onclick = function() {
		if (input.type === 'password') {
			input.type = 'text';
			eye.classList.remove('fa-eye');
			eye.classList.add('fa-eye-slash');
		} else {
			input.type = 'password';
			eye.classList.add('fa-eye');
			eye.classList.remove('fa-eye-slash');
		}
	}
}