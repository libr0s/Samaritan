import requests
import json

def post(body):
	headers = {'charset': 'utf-8'}
	myurl = "http://127.0.0.1:8000/registration"
	return requests.post(myurl,json=body, headers=headers)

def test_loginSuccess():
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


def test_loginFail():
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
