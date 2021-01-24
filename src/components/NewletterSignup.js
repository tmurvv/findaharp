import React from 'react';
import uuid from 'react-uuid';
 
function NewsletterSignup(props) {
    const handleChange = (e) => {
        console.log('nues', e.target.checked)
        switch (e.target.name) {
            case 'newsletter':
                console.log('nyi-news', e.target.name) 
                // setUserContact({...userContact, newsletter: !user.newsletter, change: true});
                break     
            default :
        }
        props.handleChange(e.target.checked)
    }
    return (
        <>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <input 
                id={uuid()}
                type='checkbox'
                name='newsletter'
                onChange={handleChange}
                style={{marginLeft: '0'}}
            />
            <label style={{marginLeft: '5px', fontSize: '14px'}} name='newsletter'>
                Signup for Find a Harp newsletter?<br />
                Fun talk about harps every other month.
            </label>
        </div>
        </>
    )
}

export default NewsletterSignup;