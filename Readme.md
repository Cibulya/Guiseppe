# MVC Coffee Api

Aplication builded on Nest JS platform.

## For launch this api you must follow few steps:

    1. Clone repository from <auth> branch
    2. Create own .env file and put it in root folder of downloaded rep. (example here).
    3. npm install
    4. npm run start or npm run start dev
    5. application runs on http://localhost:7000/
    
## .env file example
``` 
    DB_URI = link to yours MongoDB cluster
    PORT =7000
    SECRET =yoursecret
    SERVER =http://localhost:7000/
    CLIENT =your frontend deploy adress
    ACCESSTOKEN =some secret strin
    REFRESHTOKEN =some secret strin
    SMTP_HOST =smtp.gmail.com
    SMTP_PORT =465
    SMTP_USER =your gmail adress
    SMTP_PASSWORD =gmail secret to access to email
    SMTP_SERVICE =gmail
    DEPLOYED_SERVER =https://your deployed server 
```

# Please don't run app with my credentials!

## Cors request example 
  # For postman: 
   
1.Url:http://localhost:7000/coffees

2.Method: 'GET'

3. It should return all coffees collection

# For Fetch Api

```
fetch('http://localhost:7000/coffees', {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((response) => response.json()).then((data) => console.log(data))

```

## Also I record  video how test HTTP Requests from Swagger Api.

If you successfully launch app it will be able on http://localhost:7000/api/docs
It also available from deployed app [adress](https://guiseppe-production.up.railway.app/api/docs)
[How to test requests without POSTMAN](https://youtu.be/X4vlwm4xzVk)

