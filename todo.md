### high priority
- first shot at less than distance not work
- square photos not showing correctly
- delete account not working on Samsung
- useOutsideClick on harpsearch not working when filteredProducts is empty (weird one)
- check if delete account is done after update account without leaving user profile

### internal
- figure out option to dangerinnerhtml in store partners
- separate store partner program info into a component
- check do we need to pass all open/close functions to Product
- add findaharp known finish listing to Mongo
- refactor getFilteredProducts
- getDrivingDistance in Product Model needs to be imported from helpers.js

### UI/UX
- footer messed up on my phone
- email verifictaion error not correct on remote deploy
- When update user encounters problem on backend, spinner persists, needs to show error message
- if no user, userProfile needs to divert to login
- make upload ad look like login
- logout button

### functionality
- rebuild site once a day https://pomb.us/nextjs-static-props/
- logout button
- tweak filtering so it prioritizes matching exactly all model fields, then goes to aliases and finds first match so last alias can just be maker name in case no model present
- resend verification email is hacked
- CRUD operations on upload listings

### AUTHENTICATION
- add validate email on edit profile
- Remember me
- readd email encryption on reset email and activate email (is encrypted in send email and decrypted in post verify email, both in backend)
- signout
- check on encryption for signup password (does it show up in devtools console upon submit when no localhost used)
- add default name if no name found on login
- when Activate Email and reset email come back via params, make sure index page is frozen, maybe a spinner?

### SEO
- All SEO checks in Google Guide

### PERFORMANCE
- cache images with service worker
- Lighthouse

### TESTING

- finish writing tests for helper file

<div>Font made from <a href="http://www.onlinewebfonts.com">online Web Fonts</a>is licensed by CC BY 3.0</div>

### FUTURE IDEAS:

- list of all makers and models
- add edit pencils to user profile and disable fields
- New Listings Page
- From Rachael, I feel that there should be a way for the user to flick back and forth between the form and the harp information, and without losing anything that they've already typed in if possible. Right now if one clicks on "Contact Seller" the only way to look at the full harp information again is to close the form and click on the harp again. 
