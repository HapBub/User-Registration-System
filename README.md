# Registration System

A simple web-based user registration system built with JavaScript, Node.js, MySQL, and Nginx. The application accepts user registration through an HTML form, processes the submitted information, and stores it in a MySQL database.

## 📌 Overview

This project demonstrates a basic registration workflow involving frontend form handling, server-side JavaScript, database integration, and web server configuration.

Users can submit their information through a registration page, which sends an HTTP POST request for processing. The submitted information is then stored in a MySQL database.

## 🛠️ Technologies

- **JavaScript** – Registration logic and request handling
- **Node.js** – JavaScript runtime
- **HTML** – Registration form
- **MySQL** – Database for storing user information
- **Nginx** – Web server configuration

## 📁 Project Structure

```text
Register/
│
├── .gitignore
├── README.md
├── package.json
├── reg.js
├── register.nginx
├── registration.html
└── schema.sql
```

## ⚙️ Setup & Execution

### Prerequisites

Make sure the following are installed and configured:

- Node.js
- MySQL Server
- Nginx

### 1. Start the MySQL Server

Restart the MySQL service:

```bash
sudo service mysql restart
```

Alternatively:

```bash
sudo systemctl restart mysql
```

### 2. Run the JavaScript Application

Execute the registration script:

```bash
node reg.js
```

### 3. Restart Nginx

Restart the Nginx service:

```bash
sudo service nginx restart
```

Alternatively:

```bash
sudo systemctl restart nginx
```

### 4. Access the Registration Page

Open the registration page in your browser using the address configured in your Nginx configuration.

Complete and submit the registration form.

### 5. Verify Database Storage

If everything is configured correctly, the submitted user information should be stored in the corresponding MySQL database table.

## ⚠️ Configuration Notes

- `registration.html` and `reg.js` should be located in the same directory specified in the Nginx server configuration (in this case, `register`).
- If the files are stored elsewhere, update the JavaScript file path referenced in `registration.html`.
- Make sure the MySQL database and required table have been created using the provided `schema.sql` file.
- Ensure that the database connection settings in the application match your local MySQL configuration.

## 🎯 Learning Objectives

This project explores several fundamental web development concepts:

- Handling HTTP POST requests
- Connecting JavaScript applications to a relational database
- Working with MySQL and SQL schemas
- Configuring Nginx as a web server
- Building a basic frontend-to-backend registration workflow

---

*Developed as a practical web development project.*
