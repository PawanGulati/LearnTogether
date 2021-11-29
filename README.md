# <div align='center'> <img src='https://github.com/PawanGulati/LearnTogether/blob/main/client/src/constants/images/logo-black.png' width='70' height='50'/> LEARN TOGETHER</div>

### <div align='center'>You’ll never study alone again</div> 
#### <div align='center'>Join the *largest global student community* online and say goodbye to lack of motivation</div>
<br><br>

<div align='center'>

### What is this APP?
A platform which brings together students and mentors to have sessions of their choice. This platform provide both the functionality of an online forum(as students and mentor interact each other, students requests events, mentor schedule it) and a scheduler(mentor can schedule a requested event or can manually create one ot have a session). <br>
Platform let students to request certain topics and if gotten upvoted by at least one more of a fellow student on the platform a requested event can display to all the other mentors, who then can choose which requested event they want to schedule and have a session for.
</div>

### App Services
- Requestings done by Students
- Bookings down by Mentor
- Following done by any user

<img src='https://github.com/PawanGulati/LearnTogether/blob/main/snapshots/Flow_of_App.png' align='center' />


## Request Creation
<div align="center">
<a href="https://ibb.co/WWNW77f"><img src="https://i.ibb.co/TBDBJJt/image.png" alt="image" align="center" border="0"></a><br />
</div>

## Rooms and Sessions
<div align="center">
<a href="https://ibb.co/fX0gWxj"><img src="https://i.ibb.co/cyTB9r4/image.png" alt="image" border="0"></a>
</div>

## Scheduling
<div align="center">
<a href="https://ibb.co/MB3PbfN"><img src="https://i.ibb.co/sWMshC3/image.png" alt="image" border="0"></a>
</div>


## Profiles
<div align="center">
  
<img src="https://user-images.githubusercontent.com/44312129/143803634-ec9e5e05-ae1d-4ff2-a1f5-7a48db6f9218.png" alt="image" width=690 />

</div>
<div align="center">

# Features to `STUDENT`
![image](https://user-images.githubusercontent.com/44312129/143813645-75c585a9-2195-4a99-a8f5-a3cd886694aa.png)

</div>
<div align="center">

# Features to `MENTOR`
![image](https://user-images.githubusercontent.com/44312129/143813947-84d86c92-0955-4218-9ca8-802b9f797a68.png)


</div>

### Tech Used
- ReactJS
- NodeJS
- ExpressJS
- MongoDB
- REDUX
- Material UI
- Jest
- Heroku


## SETUP

### Installs and Configs
- Make sure that `NodeJS` is installed on your machine (you can refer .nvmrc file for node version on which this project was build on)
- Clone the repo from `main` branch to your local machine
- To install all dependencies both on front and backend you can run
```javascript
npm install // for backend
npm install --prefix client // for frontend
```
- setup environment variables for the project
  - copy `.env.example` file
  - change its name to `.env`
  - change values of variables accordingly, required variables here are `MONGO_URL` & `SECRET_JWT`
- To run the project
```javascript
npm run dev
```
> NOTE: If you encounter babel-jest dependency error, follow below steps
> - make a `.env` file in client folder
> - add `SKIP_PREFLIGHT_CHECK=true` in it
> - now try run the above command again

- App would be up and running on your browser

### Testing
- Framework used in this repo is `JEST`
<div align="center">
  
  !["image"](https://github.com/PawanGulati/LearnTogether/blob/main/tests/fixtures/testing_db_flow.png)
</div>
<br>

- Before running test, setup environment variables for it
- replace values of variable according to you in `.env.test` file
> NOTE: Try to make a different database for testing purpose as database will get drop in tests multiple times
- now to run tests, run
```javascript
npm test
```
- you would be seeing approximatly 30 test cases would be passing

<br><br>

<div align="center">

## Thank you for visiting my repository, feel free to contribute and open issues and PRs if you like
</div>
