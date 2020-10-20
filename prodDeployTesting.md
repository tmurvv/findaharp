# Production Deploy Checklist
Double letter before 'y' means stays checked when resetting for ipad and android phone

    [] first do regular deploy checklist

### macro
    [] Local
        [] test all responsive
            [] NavBar
            [] Search
            [] ProdCont
            [] Footer
    [] Staging
        [] Done on PC
        [] Done on iPad
            [] reponsive landscape   
            [] reponsive portrait
        [] Done on android 
            [] reponsive portrait

    [] Production
        [] Done on PC
        [] Done on iPad
            [] reponsive landscape   
            [] reponsive portrait
        [] Done on android phone
            [] reponsive landscape 
### page by page links
    [] home page
        [] NavBar
        [] Search
        [] ProdCont
        [] Footer
    [] become store partner
        [] contact page
        [] store partner page
    [] buyers guide
        [] survey

### functionality - search
    [] each menu
    [] menu combos
    [] driving distance
    [] clear one, clear all

### functionality - auth
    [] cookie
    [] logout
    [] all login
        [] success
        [] errors
            [] email not found
            [] password not long enough
            [] password incorrect
            [] email not verified
                [] resend verification resends email
                [] resend verification email works
    [] all signup
        [] success 
            [] verify email sent
            [] verify email works
            [] verify all data correct
            [] customer can log in
        [] errors
            [] duplicate email
            [] password not long enough
            [] passwords do not match
    [] forgot password
        [] email not entered
        [] reset email gets sent
        [] success
            [] success message displayed
            [] new password works in login
        [] error       
            [] password not long enough
            [] passwords do not match
    [] change password
        [] success
            [] success message
            [] new password works
        [] error
            [] old password incorrect
            [] password not long enough
            [] passwords do not match       
    [] edit profile
        [] success
        [] error
            [] old password incorrect
            [] password not long enough
    [] delete account
        [] success
        [] error
            [] old password incorrect
            [] password not long enough

### functionality - contacts
    [] contact seller
    [] contact findaharp

# store testing
    [ ] desktop
    [ ] phone
    [] tablet

## main page
    [x] container layout
    [x] add to cart button
    [x] view cart button
    [x] open modal via image
    [x] open modal via more...
    
    ### search
    [x] category
    [x] search input
    [x] ens
    [x] level
    [x] publication type
    [x] combinations
    [x] clear one filter
    [x] clear all filters

    ### modal

    [x] add to cart button works
    [x] condition etc, headers appear only for music
    [x] spacing looks good
    [x] close button closes

    ### cart
    [x] only 1 in stock appears for used
    [x] add and sub item works
    [x] remove item works
    [x] select country works
    [x] back to shopping works
    [x] continue to checkout works

    ### shipping
    [x] all fields work
    [x] country field fills in shipping correctly
    [x] region field fills in taxes correctly
    [x] continue to payment button works
    [x] continue to payment button works correctly for international

    ### payment

    [x] enter us cc
    [x] enter CAD cc
    [x] paypal link
    [x] after Stripe payment goes to correct page
    [] after paypal link payment goes to correct page

    ### receipt page
    [x] looks ok
    [x] back to shopping works
    [x] back to harps works

    ### receipt email
