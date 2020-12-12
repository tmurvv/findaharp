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
    [] check links in main menu (a double check)
    [] container layout
    [] view cart button
    [] carousel movement
    [] open modal via image
    [] string click on goes to strings
    
    ### search
    [] category
    [] search input
    [] ens
    [] level
    [] publication type
    [] combinations
    [] clear one filter
    [] clear all filters

    ###search results
    [] breadcrumbs
    [] add to cart button
    [] open modal via image
    [] open modal via more...

    ### modal
    [] add to cart button works
    [] condition etc, headers appear only for music
    [] spacing looks good
    [] close button closes

    ### cart
    [] only 1 in stock appears for used
    [] add and sub item works
    [] remove item works
    [] country field fills in shipping correctly
    [] country field changes currency properly
    [] region field fills in taxes correctly
    [] back to shopping works
    [] continue to checkout works

    ### shipping
    [] all fields work
    [] back to cart works
    [] continue to payment button works
    [] continue to payment button works correctly for international

    ### payment
    [] enter us cc
    [] enter CAD cc
    [] paypal link
    [] after Stripe payment goes to correct page
    [] after paypal link payment goes to correct page

    ### receipt page
    [] looks ok
    [] back to shopping works
    [] back to harps works

    ### receipt email
