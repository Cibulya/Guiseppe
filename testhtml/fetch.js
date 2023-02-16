/* eslint-disable prettier/prettier */
const createUser = document.querySelector('.reg_sent');

createUser.addEventListener('click', async () => {
	const username = document.querySelector('.reg_name');
	const userpass = document.querySelector('.reg_pass');
	const regemail = document.querySelector('.reg_email');
	const objToSent = {
		name: 'asdssdddsddsadassdddss',
		password: 'passsword',
		email: '2312fdfgfg@gasfdfsdfdm.by',
	};
	await fetch('http://localhost:7000/api/register', {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(objToSent),
	});
});

const login = document.querySelector('.login');
login.addEventListener('click', async () => {
	const objToSent = {
		name: 'Arnold',
		password: 'password',
		email: '121@gmail.com',
	};
	await fetch('http://localhost:7000/api/login', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(objToSent),
	});
});
