# Recycl. - Server

## Description

This is the API utilized by the Recycl app. Recycl is an app that helps you find places to recycle your materials when you might not be sure where. This API retrieves the necessary data from a database and relays it to the client.

## Client
- [Recycl.](https://recycl.vercel.app/)
- [Client Repository](https://github.com/manniecut/recycl-client)

## Table of contents

*  [Technologies](#technologies)
*  [Endpoints](#endpoints)
*  [Scripts](#scripts)
*  [Deploying](#deploying)

## Technologies

- **JS ES6**
- **Node**
- **Express**
- **PostgreSQL**

## Endpoints

Recycl's API provides it with access to its database of users, recyclable materials, scheduled pickups, and user feedback. Each endpoint deals with its own table within the database, and the information in the tables works together to create the user's experience. In this section you can find information on what each endpoint does.

### Users:
The users endpoint is used for creating, reading, updating, and deleting users. In Recycl, you cannot do anything without a user account, and the rest of the database is reliant on the users table.
 - GET `/api/users`\
 This endpoint returns a list of all users. Recycl has user login functionality so a users table is necessary. NOTE: This does not return user passwords.
 - POST `/api/users`\
 This endpoint is used to create a new user. The account is a vital part of Recycl, and this endpoint is required to create it. 
 - GET `/api/users/:id`\
 This endpoint will return the information of a specific user. The user table contains vital information that is often referenced throughout the app.
 - PATCH `/api/users/:id`\
 This endpoint is used to update a specific user's database entry. This endpoint is useful for updating passwords, emails, and location.
 - DELETE `/api/users/:id`\
 This endpoint is used to remove a user.
 
### Recyclables:
The recyclables endpoint is used for retrieving the various recyclable materials within the Recycl app. These materials are stored in their own table in the database to easily add more materials that might not be available at first.
 - GET `/api/recyclables`\
 This endpoint will return all of the recyclables in the database. Useful for the recyclable select page.
  - POST `/api/recyclables`\
 This endpoint will allow the addition of new recyclable categories in the database.
 - DELETE `/api/recyclables/:recyclable`\
 This endpoint allows the the removal of recyclable categories for admin purposes.

### Pickups:
The messages endpoint is used for creating, reading, and deleting messages. Messages are an important part of GutHub because they allow you to communicate recipes easily with your co-cookers.
 - GET `/api/pickups`\
 This endpoint returns all of the messages in the database. This endpoint is not actually used in the app. There is no personal information within a GutHub message due to GutHub's simplicity.
 - POST `/api/pickups`\
 This endpoint will create a new message. This is used when a recipe is being sent.
 - GET `/api/pickups/:id`\
 This endpoint will return a specific message. This is used when the client is populating a user's message list.
 - DELETE `/api/pickups/:id`\
 This endpoint will delete a specific message. Users can easily clean up their received messages with a delete button in the client.

### Feedback:
The messages endpoint is used for creating, reading, and deleting messages. Messages are an important part of GutHub because they allow you to communicate recipes easily with your co-cookers.
 - GET `/api/feedback`\
 This endpoint returns all of the messages in the database. This endpoint is not actually used in the app. There is no personal information within a GutHub message due to GutHub's simplicity.
 - POST `/api/feedback`\
 This endpoint will create a new message. This is used when a recipe is being sent.
 - GET `/api/feedback/:id`\
 This endpoint will return a specific message. This is used when the client is populating a user's message list.
 - DELETE `/api/feedback/:id`\
 This endpoint will delete a specific message. Users can easily clean up their received feedback with a delete button in the client.

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

Run tests and continue watching `npm watch`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.