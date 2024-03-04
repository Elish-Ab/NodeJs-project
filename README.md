# Reddme Clone

Welcome to the Reddme Clone project! This is a web application built using Node.js that aims to replicate some of the core features of Reddit. It utilizes MongoDB Cloud as the database to store and retrieve data.

## Features

- User registration and authentication
- Create, read, update, and delete posts
- Upvote and downvote posts
- Comment on posts
- Sorting posts by popularity, date, or category
- Search for posts
- User profiles with post history and activity

## Installation

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Elish-Ab/NodeJs-project.git`
2. Navigate to the project directory: `cd My Reddit Project-node `
3. Install the dependencies: `npm install`
4. Set up the database:
   - Create a MongoDB Cloud account at https://cloud.mongodb.com/
   - Create a new cluster and obtain the connection string
   - Duplicate the `.env.example` file and rename it to `.env`
   - Update the `MONGODB_URI` variable in the `.env` file with your MongoDB connection string
5. Start the server: `npm start`
6. Open your browser and visit `http://localhost:3000` to see the application.

## Technologies Used

- Node.js
- Express.js
- MongoDB Cloud
- Mongoose ODM
- Passport.js for authentication
- EJS for server-side templating

## Contributing
Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## Contact
If you have any questions or feedback, feel free to contact me at elishabu28@gmail.com.

Happy discussing!
