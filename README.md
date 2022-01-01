# Udacity Hub

Udacity Hub is a work in progress live project that is created along with my Udacity students to apply their knowledge in Fullstack development as part of their Full Stack JavaScript Nanodegree

## Installation

Use the following command to install the dependencies.

```bash
npm install
```

## Configuration

Replace the following information.
```
    database,
    host,
    user,
    password
```
In the PostgreSQL configuration file located at **src/database.ts**  
And in the db-migrate **database.json** located in the **root** of the project.

Starting from **next week** we will move away from hardcoded credentials and move to a dot env file.

## Running the project

Simply use:
```
npm run dev
```