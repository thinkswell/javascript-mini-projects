
<h1 align='center'>Quiz-app</h1>

## Light mode:

![Screenshot from 2021-10-03 14-59-41](https://user-images.githubusercontent.com/58719884/135747992-942328a0-3cf4-45eb-906e-d862d2b98c09.png)

## Dark mode:
![Screenshot from 2021-10-03 14-58-42](https://user-images.githubusercontent.com/58719884/135747965-89c60f7b-0cb7-400f-9775-54e6f899b8b2.png)

A quiz app build using OPENTB api and Javascript.

Limited resource application

## Specifications

    * Dark and light theme
    * Easy medium hard levels
    * Questions based on different topics

## Docker Instructions

If you haven't installed [Docker](https://www.docker.com/products/docker-desktop) already, then you can get it from [here](https://www.docker.com/products/docker-desktop). After installing it, create an account in Docker and copy the username.

To run the app in a docker container, follow the given steps:

- Clone this repository

  ```bash
  git clone https://github.com/{your USER_NAME}/quiz-app.git
  ```

- Navigate to the project directory
  ```bash
  cd quiz-app
  ```
- Replace <strong>USERNAME</strong> with your own username and build the docker image
  ```bash
  docker build -t <USERNAME>/quiz-app:1.0 .
  ```
- Open up the terminal at the project directory, replace <strong>USERNAME</strong> with your own username and run the following command:
  ```bash
  docker run -d -p 8080:8080 <USERNAME>/quiz-app:1.0
  ```
- Now the project is running in local server on port 8080.  You can see the app running by visiting `localhost:8080` from your browser

# Doubts

- Send a mail to the johnbabu021@gmail.com
- Or by creating [wiki](https://github.com/johnbabu021/quiz-app/wiki)

# Contribution

- Open for contribution
- To contribute:
  - Fork the repo
  - Clone the repo
  - Make your changes
  - Commit and push the changes
  - Generate a Pull Request
  - on commit name must be like #issue number

### Sit back and relax while your PR gets merged

### Don't just fork start it too

### Smash the star button

### Leave a star if you liked the app!

# Contribution

- Open for contribution
- To contribute:
  - Fork the repo
  - Clone the repo
  - Make your changes
  - Commit and push the changes
  - Generate a Pull Request
  - on commit name must be like #issue number

