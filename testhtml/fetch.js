/* eslint-disable prettier/prettier */
const createUser = document.querySelector('.reg_sent');

createUser.addEventListener('click', async () => {
	const username = document.querySelector('.reg_name');
	const userpass = document.querySelector('.reg_pass');
	const regemail = document.querySelector('.reg_email');

	//registration

	fetch('http://localhost:7000/api/register', {
		method: 'POST',
		cache: 'force-cache',
		credentials: 'same-origin',
		mode: 'cors',
		origin: 'http://http://127.0.0.1:5500/',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: 'Arnold',
			password: 'passsword',
			email: 'terminator@sky.net',
		}),
	})
		.then((response) => response.json())
		.then((data) => console.log(data));
});

const login = document.querySelector('.login');
login.addEventListener('click', async () => {
	const objToSent = {
		password: 'passsword',
		email: '2312fdfgfg@gasdsddassfdfsddsdsfdm.by',
	};

	//login
	await fetch('http:/localhost:7000/api/login', {
		method: 'POST',
		credentials: 'same-origin',
		cache: 'force-cache',
		mode: 'cors',
		origin: 'http://http://127.0.0.1:5500/',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: 'terminator@sky.net',
			password: 'passsword',
		}),
	})
		.then((response) => response.json())
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
});

//get

fetch('http:/localhost:7000/api/user', {
	method: 'GET',
	credentials: 'same-origin',
	cache: 'force-cache',
	mode: 'cors',
	origin: 'http://http://127.0.0.1:5500/',
	headers: {
		'Content-Type': 'application/json',
	},
})
	.then((response) => response.json())
	.then((data) => console.log(data))
	.catch((err) => console.log(err));
