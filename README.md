# Scoreboard Manager

## Problem to solve

This project is created to automate so that you can switch between which scoreboard you are showing.
It render a page from score.volleystream.no [github](https://github.com/nvbf/volley-score) that shows a scoreboard.
When you have a lot of matches then you need to go into OBS, or your similar streaming service and update the url that should be displayed. This means that you need people to do this monkeywork!

## Solution (or at least our suggestion on a way to solve it)

When we run our tournaments the secretariat holds track over all matches and their state in a google sheets!
So what if we just look into that sheet, find the court we want to show scoreboard for and render the correct scoreboard trough
creating an iframe of score.volleystream.no. And then we simply auto refresh the page now and then so that always have the correct scoreboard showing.

## Usage

http://localhost:3000/court?type=<pageToRender>&spredsheetId=<spreadsheetID>&courtId=<courtID>

See https://github.com/nvbf/volley-score/tree/master/pages for types of scoreboard to render.

## Setup

1. Turn on Google Sheets api [here](https://developers.google.com/sheets/api/quickstart/nodejs)
1. it will generate a file for you, download and store it in the folder for this repo.
1. Run `node auth.js` - or follow googles instructions.
1. This should generate a new file token.js, and makes a test api call to see that everything works

## Run

node server.js

## Debug

Check the api responds from the api `/api/court/<spreadsheetId>/<courtId>`
