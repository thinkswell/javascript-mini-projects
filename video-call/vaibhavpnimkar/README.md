# P2P Video Call Using WebRTC and Socket.IO


## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Step 1: Input User Email and Room ID](#step-1-input-user-email-and-room-id)
  - [Step 2: Connect Users via Socket.IO](#step-2-connect-users-via-socketio)
  - [Step 3: Initiate a Call](#step-3-initiate-a-call)
  - [Step 4: Send Video Stream](#step-4-send-video-stream)

## Introduction
This project is a real-time P2P video call application that utilizes WebRTC and Socket.IO for connecting users over video calls. Users can initiate calls, send and receive video streams, and communicate seamlessly in a secure environment.

## Features
- User-friendly interface
- Real-time video calls
- Secure user authentication and room creation
- Easily extendable and customizable

## Getting Started
### Prerequisites
Before running this application, ensure you have the following dependencies installed:

- Node.js: [Download Node.js](https://nodejs.org/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/vaibhavpnimkar/P2P-VideoCall
   cd your-repo
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

## Usage
### Step 1: Input User Email and Room ID
![Step 1 Screenshot](https://github.com/vaibhavpnimkar/P2P-VideoCall/blob/main/screenshots/1.png)

- Open the application and enter your email.
- Create or join a room by entering a room ID.

### Step 2: Connect Users via Socket.IO
![Step 2 Screenshot](https://github.com/vaibhavpnimkar/P2P-VideoCall/blob/main/screenshots/2.png)

- Click the "Connect" button to establish a connection with the other user in the same room using Socket.IO.

### Step 3: Initiate a Call
![Step 3 Screenshot](https://github.com/vaibhavpnimkar/P2P-VideoCall/blob/main/screenshots/3.png)

- Once connected, click the "Call" button to initiate a video call.

### Step 4: Send Video Stream
![Step 4 Screenshot](https://github.com/vaibhavpnimkar/P2P-VideoCall/blob/main/screenshots/4.png)

- After the call is initiated, click the "Send Stream" button to start sending your video stream to the other user.


