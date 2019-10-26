# Frontend application for simulating stocktrading

[![Build Status](https://travis-ci.org/jespernyhlen/project-frontend.svg?branch=master)](https://travis-ci.org/jespernyhlen/project-frontend) [![Build Status](https://scrutinizer-ci.com/g/jespernyhlen/project-frontend/badges/build.png?b=master)](https://scrutinizer-ci.com/g/jespernyhlen/project-frontend/build-status/master) [![Code Coverage](https://scrutinizer-ci.com/g/jespernyhlen/project-frontend/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/jespernyhlen/project-frontend/?branch=master) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/jespernyhlen/project-frontend/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/jespernyhlen/project-frontend/?branch=master)

# Readme

### Get started

To start the app, simply use the commands `npm install` followed by `npm start`.

### `npm install`

This command will install all modules listed as dependencies and is a first step to run the app.

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `npm build`

Creates a production build of the application

### `npm test`

This will run several tests using Selenium. Report output in ./coverage.

### Projekt frontend

Som grund är applikationen byggd med JavaScript-ramverket React. Ett smidigt verktyg som jag hållt mig till genom hela kursen. Det är smidigt att arbeta med states och bygga in applikationen i olika komponenter, vilket är bra ämnat för detta moment.

Som helhet är det en mindre typ av applikation och innehåller inte särskilt många delar. Som användare kommer du åt delarna login, register, logout, profile samt trading. Detta är då delarna som vi utgår ifrån.

För att få en fungerande inlogging och medvetenhet om användarens status använder jag mig av jwt-tokens. För tillfället sparas denna token i localstorage efter att en lyckad inloggning till APIet gjorts. En metod som det säkerhetsmässigt finns delade åsikter om, vilket jag har full förståelse för. Det skapar dock möjligheten för att enkelt bygga applikationen runt om användarens inloggningsstatus. T.ex. för att med en enkel metod välja vilka routes som ska vara tillgängliga och samtidigt spara statusen vid en sidomladdning.

Login, register, profile samt logout är alla mindre komponenter som kommunicerar med backend-APIet. Vi hämtar och manipulerar datan från APIets databas genom att kalla på olika routes, med olika värden medskickade. Under "Login" autentiserar du användaren. "Register" används för att skapa en ny användare. "Profile" ger tillgång till dina tillgängliga medel som sparas i databasen, och kan utökas via denna sida. "Logout" loggar ut din användare och återställer localstorage till sitt ursprungsläge.

### Trading/socket.io

Trading är den del av applikationen som uppvisar en grafisk representation av min backend-socket. Här har jag valt verktyget graph.js som grund. Det är ett populärt open-source projekt som gör det enkelt att grafisk representera priserna i realtid. Det är byggt för att fungerar på alla moderna webbläsare och har ett inbyggt stöd för att fungera responsivt. Detta i kombination till en väl strukturerad dokumentation gjorde det till bra val. Denna del är uppdelad i flera komponenter för att förenkla och separera koden. Det finns komponenter för t.ex. grafen, samtliga objekt och de enskilda objekten.
I kombination med verktyget socket.io client hämtas data och tillförs i denna graf. I samband med denna inhämtning jobbar jag parallelt med det aktuella backend-APIet för att även visa och manipulera användarens information i realtid.

Micro-servicen som brukar socket.io används som bas för att skicka ut realtidsdata till applikationen. Den är uppbyggd genom att skapa en connection när klienten ansluter sig. Sedan sänder servicen ut slumpmässig data som representerar objekt-priser via en förbestämd intervall. Klienten lyssnar genom anslutningen och kan vid ett utskick ta emot inkommande data för att uppdatera sin egen uppvisning till användaren. Det fungerar på ungefär samma sätt som att hämta data från ett API. Men istället för att klienten kallar på ett API varje gång den vill få data, bestämmer servicen när datan ska skickas ut. Sedan får vi på klientsidan bestämma när och hur datan ska användas, och i detta fall visas de 40 senaste priserna upp.

Kombinationen fungerar bra, även om jag borde fått databasen och min micro-service för grafens data att samverka mer. T.ex. för att spara historik och kunna visa upp för användaren, utöver realtids aspekten.

### Selenium tester

Det är fem olika usecases som jag testat genom Selenium.

**Use-case 1.** "Från route "/login" ska inlogginsform med e-post, lösenord och en submit knapp finnas. Vid rätt ifyllnad uppvisas en laddnings-ikon."
**Use-case 2.** "Från route "/register" ska inlogginsform med namn, efternamn, datum, e-post, lösenord och en submit knapp finnas. Vid rätt ifyllnad uppvisas en laddnings-ikon."
**Use-case 3.** "Om användaren ej är inloggad ska den se nav-länkarna login samt register."
**Use-case 4.** "Om användaren är inloggad ska den se nav-länkarna profile, trading samt logout."
**Use-case 5.** "Om användaren är inloggad ska route "/chart" vara tillgänglig och visa en laddnings-ikon för datan samt en canvas för graf-representation."
