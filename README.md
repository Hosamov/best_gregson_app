# Best Gregson Sibling
A web app, using Node, Express, and MongoDB to vote for the best Gregson sibling

## Technologies & Libraries Used:
- Node.js
- Express
- MongoDB

## Dev Notes:
- This web app uses MongoDB operations to fetch and update votes for individual siblings within the database
- Routes:
  - '/' - GET (200 status code, returns a list of all Gregson siblings)
  - '/' - POST (201 status code, submits form/button data to the database based on user voted for)
- Siblings Schema:
  - name (String)
  - voteCount (Number)
  - rank (Number)

## Tracking Notes:
- Updated: 12/8/2021
