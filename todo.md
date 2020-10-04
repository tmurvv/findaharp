### high priority
- first shot at less than distance not work
- delete account not working on Samsung
- useOutsideClick on harpsearch not working when filteredProducts is empty (weird one)

### internal
- getTotal, subTotal figure out whether to return string or number, be consistent, toFixed returns string
- figure out option to dangerinnerhtml in store partners
- separate store partner program info into a component
- check do we need to pass all open/close functions to Product
- add findaharp known finish listing to Mongo
- refactor getFilteredProducts
- getDrivingDistance in Product Model needs to be imported from helpers.js

### UI/UX
- country/region not styled on ios
- get NavBar to show Name (doesn't work on cookie check)
- When update user encounters problem on backend, spinner persists, needs to show error message
- if no user, userProfile needs to divert to login
- make upload ad look like login
- logout button
- make it so we don't have to log in again to upload a second harp listing (cookies?)
- cancel button on upload harp listing

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

### HEAD-SCRATCHERS
- JWT Cookie check sometimes trips CORS
- Click outside menus
- Signup newsletter not working if error encountered. Not resetting properly. If no error on signup, it works.
- NaN still not working

### TESTING

- finish writing tests for helper file

<div>Font made from <a href="http://www.onlinewebfonts.com">online Web Fonts</a>is licensed by CC BY 3.0</div>

### FUTURE IDEAS:

- list of all makers and models
- add edit pencils to user profile and disable fields
- New Listings Page
- From Rachael, I feel that there should be a way for the user to flick back and forth between the form and the harp information, and without losing anything that they've already typed in if possible. Right now if one clicks on "Contact Seller" the only way to look at the full harp information again is to close the form and click on the harp again. 
