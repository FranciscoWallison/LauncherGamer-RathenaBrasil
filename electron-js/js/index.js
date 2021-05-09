require('dotenv').config();

const container = document.getElementById('container');
const loading = document.getElementById('loading');
const windowLogin = document.getElementById('windowLogin');
const update = document.getElementById('update');
const simpleGit = require('simple-git');
const git = simpleGit();
const exec = require('child_process').exec;
window.exec = exec;
//ativando links
const esqueceu_senha = document.getElementById('esqueceu-senha');
const criar_conta = document.getElementById('criar-conta');	
if(process.env.URL_ESQUECI_SENHA != "" && esqueceu_senha != null){
	esqueceu_senha.classList.remove("hidden");
}
if(process.env.URL_CREATE_ACCOUNT != "" && criar_conta != null){
	criar_conta.classList.remove("hidden");
}
//ativando API
const create_form = document.getElementById('create-form');
const login_form = document.getElementById('login-form');	
if(process.env.URL_CREATE_ACCOUNT_API == "" && 
	process.env.URL_LOGIN_API == "" &&
	create_form != null
	){
	create_form.classList.add("hidden");
	login_form.style.width  = '100%';
	
	const usuario = document.getElementById('usuario');
	const senha = document.getElementById('senha');
	usuario.style.width  = '70%';
	senha.style.width  = '70%';
	container.style.width  = '500px';
}

if(process.env.GIT_UPDATE == "true"){
	//validar de o arquivo .git estar ok
	preloadDeLoginStart();
	validGit();	
}else{
	container.classList.add("container");
	container.classList.remove("container-load");
	windowLogin.classList.remove("hidden");
	update.classList.add("hidden");
}

function validGit(){
	let dirRepo = __dirname.replace("\\resources", "").replace("\\app.asar", "").replace("\\template2", "").replace("\\template1", "");
	const fs = require("fs"); // Or `import fs from "fs";` with ESM
	if (!fs.existsSync(dirRepo+"\\.git\\config")) {

		let pastaRepor = process.env.GIT_REPO_PATH.replace("https://github.com/", "")
						.replace(".git", "");
		
		pastaRepor = pastaRepor.split("/");
		
		git.clone(process.env.GIT_REPO_PATH)
		.then( async () => {
			setTimeout(async () => {
				let copy = `xcopy "`+dirRepo+`\\`+pastaRepor[1]+`" "`+dirRepo+`" /s /e /h /y`;
				await window.exec(copy, CallbackSetup)
			}, 3000)

			await window.exec(`cd `+dirRepo+`\\ && rd /s /q `+ pastaRepor[1], CallbackSetup)
			
			validGit();
		})
		.catch((err) => {
			window.exec(`cd `+dirRepo+`\\ && rd /s /q `+ pastaRepor[1], CallbackSetup);
			validGit();
			console.log("error", err)
			console.error('failed: ', err)
		});
	}else{
		updateAutoPatch()
	}
}

function updateAutoPatch(){
	loading.classList.remove("hidden");
	git.clean("f");
	git.reset('hard');
	
	git.fetch("--all").then( async  (e) => {
		let valid = await git.log(["..origin/main"]).then(  async (e) => {
			// preloadDeLoginStart();
			container.classList.add("container");
			container.classList.remove("container-load");
			windowLogin.classList.remove("hidden");
			update.classList.add("hidden");
			let array = Object.entries(e.all);
			let index = (array.length);
			commitLoop(index, array, git);
			
		})
		.catch((err) => {
			console.log('log-err', err)
			finalizarAutoLoas();
		});
		
	})
	.catch((err) => {
		console.log('fetch-err', err)
		finalizarAutoLoas();
	});
}

function commitLoop(index, array, git) {		
	let text = document.querySelector('.text');
	let percent = document.querySelector('.percent');
	let progress = document.querySelector('.progress');
	let per = 0;
	let count_per = 0;
	let element = [];
	element = array[(index-1)];
	index--; 
	if (0 < (index)) {
		// git merge <commit_hash>
		git.merge([element["1"].hash]).then( async (e) => {
			debugger;
			count_per = (((array.length+1)-index)*100)/(array.length);
			text.textContent = element["1"].message;
			per = (count_per*4);
			progress.style.width = per + 'px';
			percent.textContent = count_per + '%';
			console.log("count_per", element["1"].hash);
			commitLoop(index, array, git);
		})
		.catch((err) => {
			text.textContent = "Completo";
			percent.textContent = 100 + '%';
			text.classList.add("add");
			preloadDeLoginStop();
		});
		
	
	}else{

		git.merge([element["1"].hash]).then( async (e) => {
			percent.textContent = 100 + '%';
			text.textContent = "Completo";
			text.classList.add("add");
			preloadDeLoginStop();
		})
		.catch((err) => {
			text.textContent = "Completo";
			percent.textContent = 100 + '%';
			text.classList.add("add");
			preloadDeLoginStop();
		});
		
	}
}

function finalizarAutoLoas(){
	let text = document.querySelector('.text');
	let percent = document.querySelector('.percent');
	text.textContent = "Completo";
	percent.textContent = 100 + '%';
	text.classList.add("add");
	preloadDeLoginStop();
	
}

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');

let dir = __dirname.replace("\\resources", "").replace("\\app.asar", "").replace("\\template2", "").replace("\\template1", "");
let logo = 	dir = dir+'\\'+process.env.LOGO;	
// let backgroundImage = dir = dir+'\\'+process.env.IMAGE_BACKGROUND;

document.title = process.env.TITLE_RO
document.getElementById("logo").src = "file:///"+logo;
document.getElementById("logo").ondragstart = function() { return false; };
document.body.style.backgroundImage = "url("+process.env.IMAGE_BACKGROUND+")";
document.body.ondragstart = function() { return false; };

async function postData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
		'Content-Type': 'application/json', 'Accept' : 'application/json'
		// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}

function Callback(err, stdout, stderr) {
	if (err) {
		console.log(`exec error: ${err}`);
		return;
	}else{
		console.log(`${stdout}`);
		window.close();
	}
}

function CallbackSetup(err, stdout, stderr) {
	if (err) {
		console.log(`exec error: ${err}`);
		return;
	}else{
		console.log(`${stdout}`);			
	}
}


if(signUpButton != null){
	signUpButton.addEventListener('click', () => {
		container.classList.add("right-panel-active");
	});
	signInButton.addEventListener('click', () => {
		container.classList.remove("right-panel-active");
	});	
}

function setup(){
	let dirSetup = __dirname.replace("\\resources", "").replace("\\app.asar", "").replace("\\template2", "").replace("\\template1", "");
	dirSetup = dirSetup+'\\';	
	window.exec(`cd `+dirSetup+` && start `+process.env.EXE_SETEUP, CallbackSetup);
}

function iniciar(validUser){

	if(validUser){
		const usuario = document.getElementById('usuario');
		const senha = document.getElementById('senha');
		let exitErro = false;
		const validUP = (usuario.value.length < 1 && senha.value.length < 1) ? true : false;
		removendoErros();
		if(validUP){
			document.getElementById('result-usuario-senha').innerHTML = 'Preencha os campos Usuário e Senha.';
			usuario.classList.add('input-error');
			senha.classList.add('input-error');
			exitErro = true;
		}
		//PASSWORD
		if(usuario.value.length < 1 && !validUP) {
			document.getElementById('result-usuario').innerHTML = 'Digite a seu Usuário.';
			usuario.classList.add('input-error');
			exitErro = true;
		}
		if(senha.value.length < 1 && !validUP) {
			document.getElementById('result-senha').innerHTML = 'Digite a sua Senha.';			
			senha.classList.add('input-error');
			exitErro = true;
		}

		if(exitErro){
			tremer();
			return;
		}
	}
	
	preloadDeLoginStart();
	if(process.env.URL_CREATE_ACCOUNT_API == "" &&  process.env.URL_LOGIN_API == "" ){
		preloadDeLoginStop();
		if(validUser){
			iniciarLoginSenha(process.env.EXE_RO, senha.value, usuario.value);
		}else{
			iniciarLoginSenha(process.env.EXE_RO, null, null);
		}
		return;
	}
	if(validUser){
	// Consultar a api
		postData(process.env.URL_LOGIN_API,{ userid: usuario.value, password: senha.value })
		.then(data => {
			
			if(data != ""){
				if(
				(data.error != "" && typeof(data.error) != "undefined")
				||
				(	data.password != "" 
				&& typeof(data.password) != "undefined")
				|| 
				(	data.userid != "" 
				&& typeof(data.userid) != "undefined")

				){
					let error_message = ""
					if(typeof(data.error) != "undefined")
					{
						error_message = "Usuário ou Senha incorreto."
					}else{
						error_message = data.error[0];
					}
					

					document.getElementById('result-usuario-senha').innerHTML = error_message;
					usuario.classList.add('input-error');
					senha.classList.add('input-error');
					exitErro = true;
				}
			
			}
			if(exitErro){
				tremer();
			}else{
				iniciarLoginSenha(process.env.EXE_RO, senha.value, usuario.value);
			}
			preloadDeLoginStop();
		}).catch(e => {			
			usuario.classList.add('input-error');
			senha.classList.add('input-error');			
			tremer();
			preloadDeLoginStop();
		});
	}

}

function iniciarLoginSenha(exeRO, senha, user){
	let dir = __dirname.replace("\\resources", "").replace("\\app.asar", "").replace("\\template2", "").replace("\\template1", "");
	if(senha === null && user === null){
		window.exec(`cd `+dir+` && start `+ exeRO, Callback);	
		return;
	}
	//pasta do servidor
	window.exec(`cd `+dir+` && start `+ exeRO+ ` -t:`+senha+` `+user+` -1rag1`, Callback);	
} 

function preloadDeLoginStart(){
	const btn = document.getElementById('btnLogar');
	const usuario = document.getElementById('usuario');
	const senha = document.getElementById('senha');

	btn.classList.add('preLoadLogin');
	btn.setAttribute("disabled","true");
	if(usuario != null && senha != null){
		usuario.setAttribute("disabled","true");
		senha.setAttribute("disabled","true");
	}

	const icoPreload = document.getElementById('icoPreload');
	icoPreload.classList.remove('hidden');
}

function preloadDeLoginStop(){
	const btn = document.getElementById('btnLogar');
	const usuario = document.getElementById('usuario');
	const senha = document.getElementById('senha');

	btn.classList.remove('preLoadLogin');
	btn.removeAttribute("disabled");
	if(usuario != null && senha != null){
		usuario.removeAttribute("disabled");
		senha.removeAttribute("disabled");
	}

	const icoPreload = document.getElementById('icoPreload');
	icoPreload.classList.add('hidden');	
}


function submitCreatedAccount(){
	const email = document.getElementById('email');
	const username = document.getElementById('username');
	const password = document.getElementById('password');
	let exitErro = false;

	const createdAccount = document.getElementById('created-account');
	const loader = document.getElementById('loader-create');
	const createSuccess = document.getElementById('create-success');		
	createdAccount.classList.add('hidden');
	loader.classList.remove('hidden');

	removeTremer();
	//EMAIL
	if(validarEmail(email.value) ) {
		document.getElementById('result-email').innerHTML = 'Email Invalido';
		email.classList.add('input-error');
		exitErro = true;
	}else{
		document.getElementById('result-email').innerHTML = '';
		email.classList.remove('input-error');
	}
	//USER-NAME
	if(validarUsername(username.value) ) {
		document.getElementById('result-username').innerHTML = 'Usuário Invalido';
		username.classList.add('input-error');
		exitErro = true;
	}else{
		document.getElementById('result-username').innerHTML = '';
		username.classList.remove('input-error');
	}
	//PASSWORD
	if(password.value.length < 1) {
		document.getElementById('result-password').innerHTML = 'Senha Invalido';
		password.classList.add('input-error');
		exitErro = true;
	}else{
		document.getElementById('result-password').innerHTML = '';
		password.classList.remove('input-error');
	}

	
	if(exitErro){
		tremer();
		loader.classList.add('hidden');
		createdAccount.classList.remove('hidden');
		return;
	}

	postData(process.env.URL_CREATE_ACCOUNT_API,{ 
		email: email.value, 
		userid: username.value,
		password: password.value,
		password_confirmation: password.value,
	})
	.then(data => {
		if(data != ""){
			if(
			(	data.password != "" 
			&& typeof(data.password) != "undefined")
			|| 
			
			(data.password_confirmation != ""
			&& typeof(data.password_confirmation) != "undefined")
			){
				document.getElementById('result-password').innerHTML = data.password[0].replace("password", "senha");
				password.classList.add('input-error');
				exitErro = true;
			}

			if(data.email != "" && typeof(data.email) != "undefined"){
				document.getElementById('result-email').innerHTML = data.email[0];
				email.classList.add('input-error');
				exitErro = true;
			}

			if(data.userid != "" && typeof(data.userid) != "undefined"){
				document.getElementById('result-username').innerHTML =  data.userid[0].replace("userid", "Username");
				username.classList.add('input-error');
				exitErro = true;
			}
		}
		
		if(exitErro){
			tremer();
			loader.classList.add('hidden');
			createdAccount.classList.remove('hidden');
		}else{
			loader.classList.add('hidden');
			createSuccess.classList.remove('hidden');
		}

	});
	
}


function contaCriada(){
	const container = document.getElementById('container');
	const createdAccount = document.getElementById('created-account');
	const createSuccess = document.getElementById('create-success');
	
	const email = document.getElementById('email');
	const username = document.getElementById('username');
	const password = document.getElementById('password');
	const usuario = document.getElementById('usuario');
	const senha = document.getElementById('senha');
	
	//login
	usuario.value = username.value;
	senha.value = password.value;
	console.log(username.value, password.value);
	//create
	username.value = ""
	password.value = ""
	email.value = ""

	createSuccess.classList.add('hidden');
	createdAccount.classList.remove('hidden');
	container.classList.remove("right-panel-active");		
}

function onFocus(x) {
	document.getElementById('result-'+x.name).innerHTML = '';
	x.classList.remove('input-error');
}

function validarEmail(email){
	if(validateEmail(email) || email.length < 1){
		return true
	}
	return false;
}

function validarUsername(username){
	if(usernameIsValid(username) || username.length < 1){
		return true
	}
	return false;
}

// Validador de erros
function usernameIsValid(username) {
	return !(/^[0-9a-zA-Z_.-]+$/.test(username));
}
function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return !re.test(email);
}
//Eventos e Styles
function removeTremer(){
	let container = document.getElementById("container");
	container.classList.remove("tremer");
}
function tremer() {
	let container = document.getElementById("container");
	container.classList.remove("tremer");
	container.classList.add("tremer");		
	setTimeout(function(){ container.classList.remove("tremer"); }, 1000);
}

function errorAddLogin(){
	tremer();
	errorRemove();
	var element = document.getElementsByClassName('login');

	// Iterate through the retrieved elements and add the necessary class names.
	for(var i = 0; i < element.length; i++)
	{
		element[i].classList.add('input-error');
		
	}
}

function errorRemove(){
	var element = document.getElementsByClassName('login');

	// Iterate through the retrieved elements and add the necessary class names.
	for(var i = 0; i < element.length; i++)
	{
		element[i].classList.remove('input-error');			
	}
}


function removendoErros()
{
	const usuario = document.getElementById('usuario');
	const senha = document.getElementById('senha');
	usuario.classList.remove('input-error');
	senha.classList.remove('input-error');
	document.getElementById('result-usuario-senha').innerHTML = '';
	document.getElementById('result-senha').innerHTML = '';
	document.getElementById('result-usuario').innerHTML = '';
}

function exit(){
	window.close();
}

function openInNewTab(url) {
	require('electron').shell.openExternal(url);
}