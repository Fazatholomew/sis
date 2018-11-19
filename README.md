# Should I Stay? #

Marlboro College car-pooling website created by Faza Byandika Hikmatullah, Marlboro College student. Class 2021.

The website will be a medium for those who need a ride, and for those who are willing to lend their car or drive people places.  

## Why?

Located in a rural area of Southern Vermont, Marlboro College students always struggle to get off of campus. The situation gets worse when winter hits; snow storms will shut down access to the nearest town and the availabilty of the <i>Moover</i>, which is the only public transportation avaiable. Most of the students at Marlboro College do not have personal vehicles, and these students often feel isolated from the outside world.

## How?

The project is separated in Front-End and Back-End side. Front-End is hosted on [Surge](https://sis-marlboro.surge.sh) and Back-End is hosted on [Heroku](https://dashboard.heroku.com/apps/sis-marlboro).

### Front-End

All of the front-end related files is located in static/. The project is based on this [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate). Due to creator preference and knowledge, there are many changes in the file and project structure. Some technologies used in the project: 

* ES6 with Babel 6
* Webpack 4
* React 16
* React-router
* Redux and Redux Saga
* Jest with Enzyme for testing
* React Material UI for Component Styling

### Back-End

All of the front-end related files is located in the root folder. The project is based on this [React-Flask Boilerplate](https://github.com/dternyak/React-Redux-Flask). For simplycity of the project, Flask and SQLAlchemy are used to serve the Back-End. In the earlier stage, Raspberry Pi 3 was used to run the Flask server in local campus network. Then, the server runs in Heroku App to be accesible anywhere in the internet.


## Future Improvements

Currently, only Marlboro campus email owner who can register to the website because the security system is not ready for larger mass. In the future, the website will implement some featured collected from the community feedback:

* Reoccuring events
* Additional detail description of each entries









