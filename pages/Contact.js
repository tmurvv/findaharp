// packages
import {useEffect} from 'react';
import Head from 'next/head';

// internal
import PageTitle from '../src/main/components/PageTitle';
import ContactUsForm from '../src/main/components/ContactUsForm';
import ContactCSS from '../src/main/styles/Contact.css';

function Contact() {
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='block';
    },[]);
    return (
        <>
        <Head>
            <title>findaharp.com -- Contact Us</title>
            <meta name="Description" content="Contact Us -- Lever Harps, Pedal Harps, Wire Harps, Celtic Harps, Irish Harps, Folk Harps" key="title" />
        </Head>
        <div className='contactContainer'>
            <PageTitle maintitle='Contact Us' subtitle='We want to hear from you!' />
            <div>
                <ContactUsForm handleCloseContact={() => console.log('')} />
            </div>
            <div className='contactDivider'>
                <img src="./img/golden_tapered_line.png" alt="fancy golden divider line" />
            </div>           
            <div className={`contactItem about`}>
                <h2>About us</h2>
                <p>Findaharp.com was designed and developed by harpists Rachael Cooper and Tisha Murvihill. Tisha Murvihill has been the principal harpist of the Calgary Philharmonic in Alberta, Canada since 1995.</p>
                <p><span>"</span>Whenever I am trying to help a student find the first or next perfect harp to bring into their lives, I find it difficult to see what is available, especially if the student needs a pre-owned instrument. Since I have a strong interest in web development as well as the harp, I decided to combine my interests and create a website for the harp community where they easily can find available pre-owned harps.<span>"</span></p>
                <div className="peopleContainer">
                    <div className='personContainer marginRight'>
                        <div className='imgContainer'>
                            <img src='./img/photo_tisha.png' width='100px' alt='Tisha Murvihill head shot' />
                        </div>
                        <p>Tisha's main instrument is a robust sounding <span>Lyon & Healy 85CG</span> pedal harp. She also has a rare gold <span>Charles Lindeman</span> pedal harp built in the 1930's. Her Lever harps include a <span>Pilgrim Ashdown</span> c.1993 made in Wales, and a <span>Craig Pierpont, Irish Style</span> out of Kentucky. Harp website: <a href='https://www.harptisha.com'>harptisha.com</a> / tech website: <a href='https://www.take2tech.ca'>take2tech.ca</a>.</p>
                    </div>
                    <div className='personContainer marginLeft'>
                        <div className='imgContainer'>
                            <img src='./img/photo_rachael.png' alt='Rachael Cooper head shot' />
                        </div>
                        <p>Rachael is a Graphic Designer, cat lover, and aspiring harpist. She began playing the harp in 2015, with Tisha as her teacher, and has shown what wonderful results can come from starting an instrument as an adult. Rachael is the proud owner of a stunning <span>Salvi Apollo</span> pedal harp as of 2020, as well as a particularly superb <span>Emilie</span> lever harp crafted by Newsom Harps in Bragg Creek, AB in 2015. Rachael is a freelance graphic designer and can be reached at <a href='https://www.diomed.ca'>diomed.ca</a>.</p>
                    </div>
                </div>         
            </div>
            <ContactCSS />
        </div>
        </>
    )
}

export default Contact;
