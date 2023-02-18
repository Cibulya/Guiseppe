const form = document.querySelector('form');
console.log(form);
const file = document.querySelector('.file');
console.log(file.getAttribute('value'));
const button = document.querySelector('button');

button.addEventListener('click', (e) => {
	e.preventDefault();
	let a = new FormData(form);
	console.log(a.get('file').arrayBuffer());
	fetch('http://localhost:7000/api/setpicture', {
		method: 'PUT',
		credentials: 'same-origin',
		mode: 'cors',
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		body: JSON.stringify({
			userImage: a.get('file').arrayBuffer(),
			email: 'cibulyadev@gmail.com',
		}),
	});
});
