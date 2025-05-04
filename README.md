# This is a Simple Blog Application

This is a dynamic web application that uses Node.js, Express.js, and MySQL.
This allows users to create, view, and delete blog posts through a simple web interface in real time.

Features
- Create New blog posts
- View all blog posts (newest first)
- Update them 
- Delete them
- Basic front-end
- Simple error handling and security checks

## Project Setup!

Follow these steps to set up and run the project on your own machine after downloading this repo as a zip!

### (1) Install Dependencies

We need dotenv, express, and mysql2 to be installed!
This may vary depending on what you are using, but if using Replit like me, then it is

npm init -y
npm install express mysql2 dotenv

### (2) Set up the database

This must be done on your own manually with whatever MySQL you are using, I am using FreeSQLDatabase, so my database name cannot be changed.

1. Log in to your SQL
2. Create your database(or if you are using MySQL, skip this step.)
3. Run the following SQL code to create the required table:
```sql
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### (3) Configue the .env file

Create a file named .env in the project root **with your own MySQL creds** 

```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
```

Replace the above with your own information!!!
Do not share this information!!!

### (4) Run the Application

Start the server, if using Replit, it will be:
node server.js

You should see:
```
Server running on http://localhost:3000
Connected to database

```
Or you will see error messages!

If in Replit, it will open a preview tab; otherwise, use your preferred browser and go to http://localhost:3000

## How to use

- Use the form at the top to add new blog posts (both title and content are required).
- Existing posts will appear below, showing the most recent posts first.
- Press delete to remove a post!

Thank you for checking out my project!

Side note, my .env has been removed from this project
