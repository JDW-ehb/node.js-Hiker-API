Hikers and Mountains API
Introduction
This project is a Node.js API designed for hiking enthusiasts. It integrates with a MySQL database and provides information about various hiking trails and mountains. This project was created as part of a college assignment and showcases the use of Node.js in building RESTful APIs.

Getting Started
To run this project, you need to have Node.js and XAMPP (for MySQL) installed on your machine.

Prerequisites
Node.js - Download & Install Node.js
XAMPP - Download & Install XAMPP
Installation
Clone the repository to your local machine:

git clone [repository-url]
Navigate to the project directory and install dependencies:

cd [project-name]
npm install
Setting up the Database
Make sure XAMPP is installed and the MySQL service is running. You will need to create a database for this project in MySQL.

Configuration
Create a .env file in the root directory of the project and add your database credentials:


DB_HOST=[your host]
DB_PORT=[your port]
DB_USER=[your username]
DB_NAME=[database name]
DB_PASS=[your password]


After setting up your environment and database, you can start the server with:
npm start

Inspirations and Sources
Node.js Documentation: https://nodejs.org/docs/latest/api/
Guidance from ChatGPT on Node.js functionality
YouTube Tutorial: Node.js for Beginners
