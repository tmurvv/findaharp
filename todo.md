### high priority
- first shot at less than distance not work
- delete account not working on Samsung
- useOutsideClick on harpsearch not working when filteredProducts is empty (weird one)

### internal
- update styles according to https://nextjs.org/docs/basic-features/built-in-css-support
- update all results info to ResultsWindow
- record keeping on sellers needs to be improved
- separate store partner program info into a component
- check do we need to pass all open/close functions to Product
- add findaharp known finish listing to Mongo
- refactor getFilteredProducts
- getDrivingDistance in Product Model needs to be imported from helpers.js

### UI/UX
- make all alerts resultsWindow
- make userharp cookie work
- make all menus roll down like store makes/models submenu functionality
- for modal take out border and do opacity thing
- add search term to breadcrumbs
- clear all next to breadcrumbs should go back to carousels
- the more you scroll, the slower it is
- When update user encounters problem on backend, spinner persists, needs to show error message
- troubleshoot these steps: change password, check old password-should fail, choose try again, check new password, gets 'Network Error?'
- after delete account, should return to main-page

### functionality
- change currency on Germaine Strings
- four times a bug when switching harps
- back-button from PayPal page loses cart - cookie??
- store cart saving in db instead of cookie, from stackoverflow No large sites would dare store a user's cart in a session or cookie - that data is just to valuable. Use a database table to store this information and then link it to the user's session. 
- add option to create account on shipping page
- rebuild site once a day https://pomb.us/nextjs-static-props/
- tweak filtering so it prioritizes matching exactly all model fields, then goes to aliases and finds first match so last alias can just be maker name in case no model present
- resend verification email is hacked

### AUTHENTICATION
- add validate email on edit profile
- Remember me
- readd email encryption on reset email and activate email (is encrypted in send email and decrypted in post verify email, both in backend)
- check on encryption for signup password (does it show up in devtools console upon submit when no localhost used)

### SEO
- All SEO checks in Google Guide

### PERFORMANCE
- Lighthouse

### HEAD-SCRATCHERS
- Click outside menus

### TESTING

- finish writing tests for helper file

<div>Font made from <a href="http://www.onlinewebfonts.com">online Web Fonts</a>is licensed by CC BY 3.0</div>

### FUTURE IDEAS:

- list of all makers and models
- add edit pencils to user profile and disable fields
- New Listings Page