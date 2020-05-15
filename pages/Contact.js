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
            
            <div className={`contactItem about`}>
                <h2>About us</h2>
                <p>Findaharp.com was designed and developed by harpists Rachael Cooper and Tisha Murvihill. Tisha Murvihill is the principal harpist of the Calgary Philharmonic in Alberta, Canada.</p>
                <blockquote>"Whenever I am trying to help a student find the first or next perfect harp to bring into their lives, I find it difficult to see what is available, especially if the student needs a pre-owned instrument. Since I have a strong interest in web development as well as the harp, I decided to combine my interests and create a website for the harp community where they easily can find available pre-owned harps."</blockquote>
                <p>Designer Rachael Cooper is the owner/operator of Diomed Design. She is also the owner of a brand new stunning Salvi Apollo pedal harp as well as a an outstanding "Emilie" lever harp from Newsom Harps in Bragg Creek, Alberta. You can contact Rachael at <a href='https://www.diomed.ca'>diomed.ca</a>.</p>
                <p>Tisha's main instrument is a robust sounding Lyon & Healy 85CG pedal harp. She also has a rare gold Charles Lindemann pedal harp built in the 1930's that was rescued from a dumpster! Her Lever harps include a Pilgrim Ashdown c.1993 made in Wales, and a Craig Pierpont, 'Irish Style' out of Kentucky. harp website: <a href='https://www.harptisha.com'>harptisha.com</a> / tech website: <a href='https://www.take2tech.ca'>take2tech.ca</a></p>
            </div>
            <ContactCSS />
        </div>
    )
}

export default Contact;
// function Contact() {
//     return (
//         <>
//             <div className="contactContainer">
//                 <h1 className='mainTitle'>Contact Us / About Us</h1>
//                 <div className="contact">
                    // <div className='contactItem'>
                    //     <h3>Problems with Harp Advertisements</h3>
                    //     <p>Our harp advertisements are automatically updated from our store partner websites. Please let us know if you see something that is confusing or incorrect.</p>
                    //     <h3>Suggestions</h3>
                    //     <p>We welcome your suggestions to make our site as thorough and as easy to use as possible.</p>
                    // </div>
                    
                    // <div className='contactItem'>
                    //     <h2>About us</h2>
                    //     <p>Findaharp.com was designed and developed by harpists Rachael Cooper and Tisha Murvihill.</p>
                    //     <p>Tisha Murvihill is the principal harpist of the Calgary Philharmonic in Alberta, Canada. <blockquote>"Whenever I am trying to help a student find the first or next perfect harp to bring into their lives, I find it difficult to see what is available, especially if the student needs to find something pre-owned. I also have a strong interest in web development, so I decided to combine my interests and create a site for the harp community where they can easily find available pre-owned harps."</blockquote></p>
                    //     <p>Rachael Cooper is the owner/operator of Diomed Design. Rachael is also the proud new owner of a stunning Salvi Apollo pedal harp as well as a an equally stunning "Emilie" lever harp from Newsom Harps in Bragg Creek, Alberta. <a href='www.diomed.ca'>diomed.ca</a></p>
                    //     <p>Tisha's main instrument is a robust sounding Lyon & Healy 85CG pedal harp. She also has a rare gold Charles Lindemann pedal harp built in the 1930's that was rescued from a dumpster! Her Lever harps include a Pilgrim Ashdown c.1993 made in Wales, and a Craig Pierpont, 'Irish Style' out of Kentucky. harp: <a href='https://www.harptisha.com'>harptisha.com</a> / tech: <a href='https://www.take2tech.ca'>take2tech.ca</a></p>
                    // </div>
//                 </div>
//                 <div className='contactDivider'>
//                     <img src='./img/golden_tapered_line.png' />
//                 </div>
                
//                 {/* <ContactForm /> */}

//             </div>
//             <ContactCSS />
//         </ContactForm>
//     )
// }

// export default Contact;
