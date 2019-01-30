import requests
import json

def post(body):
	headers = {'charset': 'utf-8'}
	myurl = "http://127.0.0.1:8000/registration"
	return requests.post(myurl,json=body, headers=headers)

def test_registrationSuccess():
	body = {"email": "d@wp.pl",
		"password":"pass1234",
		"type":"organisation",
		"name":"kamila",
		"city":"wroclaw",
		"post_code":"50-520"}

	response = post(body)
	code = response.status_code
	json = response.json()['message']
	assert(json) == "Account created successfully"


def test_registrationFail():
	body = {"email": "kamila1@wp.pl",
		"password":"pass1234",
		"type":"organisation",
		"name":"kamila",
		"city":"wroclaw",
		"post_code":"50-520"}

	response = post(body)
	response = post(body)
	code = response.status_code
	json = response.json()['message']['email'][0]
	assert(json) == "The e-mail address kamila1@wp.pl is already taken."

def test_wrongEmail():
	body = {"email": "@wp.pl",
		"password":"pass1234",
		"type":"organisation",
		"name":"kamila",
		"city":"wroclaw",
		"post_code":"50-520"}

	response = post(body)
	code = response.status_code
	json = response.json()['message']['email'][0]
	assert(json) == "Invalid email address."

def test_wrongPostCode():
	body = {"email": "d12@wp.pl",
		"password":"12345",
		"type":"organisation",
		"name":"kamila",
		"city":"wroclaw",
		"post_code":"12345"}

	response = post(body)
	code = response.status_code
	json = response.json()['message']['post_code'][0]
	assert(json) == "Not a valid post code!"

def postLogin(body):
	headers = {'charset': 'utf-8'}
	myurl = "http://127.0.0.1:8000/login"
	return requests.post(myurl,json=body, headers=headers)

def test_loginSuccess():
	body = {"email": "u1@wp.pl",
		"password":"test1234"}

	response = postLogin(body)
	code = response.status_code
	json = response.json()['message']
	assert(json) == "Successfully logged in"



def test_loginFail():
	body = {"email": "u1@wp.pl",
		"password":"1234"}

	response = postLogin(body)
	code = response.status_code
	json = response.json()['message']
	assert(code) == 400


def test_logout():
	headers = {'charset': 'utf-8'}
	myurl = "http://127.0.0.1:8000/login"
	myurl2 = "http://127.0.0.1:8000/logout"
	body ={"email": "u1@wp.pl",
		"password":"test1234"}
	response = requests.post(myurl, json=body, headers=headers)
	token = response.json()['access_token']
	h = {'Authorization': 'Bearer '+token}
	response1=requests.post(myurl2, json=body, headers=h)
	assert(response1.json()['message']) == "You have been logged out !"
