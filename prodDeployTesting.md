# Production Deploy Checklist
xx means stays checked when resetting for ipad and android phone

    [xx] first do regular deploy checklist

### macro
    [xx] Local
        [xx] test all responsive
            [xx] NavBar
            [xx] Search
            [xx] ProdCont
            [xx] Footer
    [] Staging
        [xx] Done on PC
        [] Done on iPad
            [] reponsive landscape   
            [] reponsive portrait
        [] Done on android 
            [xx] reponsive portrait

    [] Production
        [xx] Done on PC
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
    [] contact seller - email to me not them
    [] contact findaharp
