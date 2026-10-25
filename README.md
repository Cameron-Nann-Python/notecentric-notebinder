# NoteBinder

## Overview

Our product, NoteBinder, will be a web-based note taking platform that allows students to take and share notes for classes. The site will have administrators to ensure that malicious content and cheating are prevented and ensure a smooth note-taking experience. 

## Getting Started

To install the backend Django modules, run the following command:
```
pip install -r requirements.txt
```

To install axios for automatic url handling and to manage jwt tokens, run the following command:
```
npm install axios react-router-dom jwt-decode
```

## Run the Application and Server

To run the backend server, run the following command:
```
cd backend
python manage.py runserver
```

To run the frontend React page, run the following command:
```
cd frontend
npm run dev
```

To see login, enter the credentials below on the login page
username: cam_test2
password: 123123


## How to Run Tests

For the backend pytest tests run the following commands:
```
cd backend
pytest
```