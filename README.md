# Master your champions
An ExpressJS and ReactJS web application.

- Masteries Page:

Displays your top champion masteries with YouTube videos of a given champion. Arrows at the bottom of the page let you navigate the videos. The champion icons and slider let you navigate the champions displayed.

- Info Page:

Displays the roles you play, with the number of champion mastery points per role by champion. The table is sortable by column (Roles, Total Points, Average Points). The champions column shows the champions contributing to a particular role, with the champion contributing the most points first.


## To build and run:

Dependency Installation:
```
npm install
npm install -g webpack
```

Use Webpack to transpile frontend javascript:
`webpack`

Start up the express server:
`node ./server.js`

Navigate to `http://localhost:8000/`
