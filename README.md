# IND Appointments

### TL;DR;
This message is for folks who are trying to get the best appointment slots for their Biometric or Doc collection.

https://ind-api.000webhostapp.com/ \
https://ind-appointments.web.app/

I had this difficulty when I was looking for appointments for the same. Finding an appointment for the dates you like is very stressful. It is very difficult to know if any new slots might open up. Possible chance you may miss the opportunity to get an earlier date. Keeping this in mind one weekend I randomly decided to build an application that can help me. It was easier to write a python script, but not everyone has the expertise to run the script. So I built a web application. This application gives you the following benefits:
- Book the appointment on the earliest possible date.
- Select more than one location at once.
- Book an appointment with ease for one or more people.
- Let the application do the work for you. You can schedule a timer, which will query for appointments every 5 to 45 minutes, and book a slot as soon as one is available.

I wish it helps everyone. 🙂 I will be improving the website regularly.

P.S: the preferred device to access would be a computer or laptop. But works OK with mobile.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Technologies
- ReactJS
- PHP

## Details

This repo has two pieces to it.
- client
- server

*Client* is written in ReactJS (create-react-app)
- You can set up CRA from [here](https://reactjs.org/docs/create-a-new-react-app.html)
- Execute `npm start` to start the application

**Server** is written in php. 
- You can set up php from [here](https://www.php.net/manual/en/install.macosx.php). 
- You can run the server with command `php server/index.php`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

TBD

### `npm run build`

Builds the app for production to the `build` folder.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

