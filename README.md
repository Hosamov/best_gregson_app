# Best Gregson Sibling

A web app, using Node, Express, and MongoDB to vote for the best Gregson sibling

## Technologies & Libraries Used:
- Node.js
- Express
- MongoDB
- Pug

### Other Libraries Used:
- connect-timeout
- body-parser

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

- Save CPM on the back end/db vs the front end. Use front end code to verify the
  human user based on CPM treshold.
  - Each sibling listed will have a recaptcha field added to their collection
  - Each sibling will require a recaptcha (randomly generated) to be completed by the user in
    order to continue with voting.

## Tracking Notes:

- Updated: 9/13/2022
