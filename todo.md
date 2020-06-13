### prelaunch

- contact functionality
- extensive testing

### internal
- cleanup activate email
- make it easier to change api on deployment
- check do we need to pass all open/close functions to Product
- make addPlaceholders remove any placeholders that may be there already
- add findaharp known finish listing to Mongo
- refactor getFilteredProducts
- in login/signup, install reducer for result states
- getDrivingDistance in Product Model needs to be imported from helpers.js

### UI/UX

- email verification can be prettier
- email verifictaion error not correct on remote deploy
- Have have user context be object with firstname, lastname, then fill in form fields automatically in contact us 
- Contact Seller button moved to top and centered (use a scroll down for more type thing)
- When update user encounters problem on backend, spinner persists, needs to show error message

### functionality
- contact emails
- trouble shoot distance needing two clicks
- CRUD operations on upload listings
- add close form to private listings
- implement email text communication through website

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
- cache images
- Lighthouse

### TESTING

- finish writing tests for helper file

<div>Font made from <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>is licensed by CC BY 3.0</div>

### FUTURE IDEAS:

- add edit pencils to user profile and disable fields
- on mobile menu highlight, put in fancy corners
- New Listings Page
- From Rachael, I feel that there should be a way for the user to flick back and forth between the form and the harp information, and without losing anything that they've already typed in if possible. Right now if one clicks on "Contact Seller" the only way to look at the full harp information again is to close the form and click on the harp again. 
