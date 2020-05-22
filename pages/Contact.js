import React from 'react';
import ContactCSS from '../src/styles/Contact.css';
import ContactUsForm from '../src/components/ContactUsForm';

function Contact() {
    return (
        <div className='contactContainer'>
            <div>
                <ContactUsForm handleCloseContact={() => console.log('')} />
            </div>
            <div className='contactDivider'>
                <img src="./img/golden_tapered_line.png" alt="fancy golden divider line" />
            </div>
            
            <div  style={{fontWeight: '600'}} className={`contactItem about`}>
                <h2>About us</h2>
                <p>Findaharp.com was designed and developed by harpists Rachael Cooper and Tisha Murvihill. Tisha Murvihill is the principal harpist of the Calgary Philharmonic in Alberta, Canada.</p>
                <p style={{fontWeight: '600'}}><span>"</span>Whenever I am trying to help a student find the first or next perfect harp to bring into their lives, I find it difficult to see what is available, especially if the student needs a pre-owned instrument. Since I have a strong interest in web development as well as the harp, I decided to combine my interests and create a website for the harp community where they easily can find available pre-owned harps.<span>"</span></p>
                <div className="peopleContainer">
                    <div className='personContainer marginRight'>
                        <div className='imgContainer'>
                            <img src='./img/ITHeadShotMoney.jpg' width='100px' alt='Tisha Murvihill head shot' />
                        </div>
                        
                        <h3>Tisha Murvihill</h3>
                        <p>Tisha's main instrument is a robust sounding Lyon & Healy 85CG pedal harp. She also has a rare gold Charles Lindemann pedal harp built in the 1930's that was rescued from a dumpster! Her Lever harps include a Pilgrim Ashdown c.1993 made in Wales, and a Craig Pierpont, 'Irish Style' out of Kentucky. harp website: <a href='https://www.harptisha.com'>harptisha.com</a> / tech website: <a href='https://www.take2tech.ca'>take2tech.ca</a></p>
                    </div>
                    <div className='personContainer marginLeft'>
                        <div className='imgContainer'>
                            <img src='./img/rachael_easel_zoomed.jpg' style={{width: '190px', position: 'absolute', right: '-36px'}} alt='Rachael Cooper head shot' />
                        </div>
                        
                        <h3>Rachael Cooper</h3>
                        <p>Designer Rachael Cooper is the owner/operator of Diomed Design. She is also the owner of a brand new stunning Salvi Apollo pedal harp as well as a an outstanding "Emilie" lever harp from Newsom Harps in Bragg Creek, Alberta. You can contact Rachael at <a href='https://www.diomed.ca'>diomed.ca</a>.</p>
                    </div>
                    
                </div>
                
                
            </div>
            <ContactCSS />
        </div>
    )
}

export default Contact;
