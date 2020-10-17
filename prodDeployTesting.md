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
    [xx] desktop
    [] phone
    [] tablet

## main page
    [] container layout
    [] add to cart button
    [] view cart button
    [] open modal via image
    [] open modal via more...
    
    ### search
    [] category
    [] search input
    [] ens
    [] level
    [] publication type
    [] combinations
    [] clear one filter
    [] clear all filters

    ### modal

    [] add to cart button works
    [] condition etc, headers appear only for music
    [] spacing looks good
    [] close button closes

    ### cart
    [] only 1 in stock appears for used
    [] add and sub item works
    [] remove item works
    [] select country works
    [] back to shopping works
    [] continue to checkout works

    ### shipping
    [] all fields work
    [] country field fills in shipping correctly
    [] region field fills in taxes correctly
    [] continue to payment button works
    [] continue to payment button works correctly for international

    ### payment

    ### receipt

