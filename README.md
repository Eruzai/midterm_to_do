# SMART TODO LIST

This app allows a logged in user to store todo items in automatically categorized lists for movies, books, restaurants or items to purchase! Items can be marked as completed, manually moved to other lists or deleted as required.

![Screenshot displaying list and categories](/docs/screen_captures/List_display.png "List display")

![Video showing how to move an item into a different category](/docs/screen_captures/Move_item.mov "Recategorizing an item")

## Getting Started

1. Use the .env_template file to create your .env file with:
  - API keys
    - you will have to supply your own keys:
      - YELP for restaurants
      - omdbapi.com for movies
  - db information
2. Install dependencies: `npm i`
3. Fix to binaries for sass: `npm rebuild node-sass`
4. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
5. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
6. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
