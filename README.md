# Best Gregson Sibling

A web app, using Node, Express, and MongoDB to vote for the best Gregson sibling

## Technologies & Libraries Used:

- Node.js
- Express
- MongoDB
- Pug

## Dev Notes:

- This simple web app uses MongoDB operations to fetch and update votes for individual siblings within the database
- Routes:
  - '/' - GET returns a list of all Gregson siblings, renders home template
  - '/' - POST submits form/button data to the database based on user voted for, redirects to '/' route
- Siblings Schema:
  - name (String)
  - voteCount (Number)
  - rank (Number)

### TODOS:

- Save CPM on the back end/db vs the front end. Use front end code to verify the human user based on CPM treshold.

## Tracking Notes:

- Updated: 9/12/2022
