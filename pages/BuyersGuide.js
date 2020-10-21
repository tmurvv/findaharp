// packages
import React, {useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';

// internal
import PageTitle from '../src/components/PageTitle';
import BuyersGuideCSS from '../src/styles/BuyersGuide.css';
import PedalLeverTut from '../src/components/PedalLeverTut';

function BuyersGuide(props) {
    function handleSurveySubmit() {
        // pedal harp shortcut
        if (document.querySelector('#pedalharp').checked) {
            document.querySelector('#guidePedalGeneral').scrollIntoView();
            return window.scrollBy(0, -100);
        }
        
        // get survey results
        const beginner = () => document.querySelector('#beginner').checked;
        const harptype = () => {
            if (document.querySelector('#leverharp').checked) return 'leverharp';
            if (document.querySelector('#notsureharp').checked) return 'notsureharp';
        }
        const musictype = () => {
            if (document.querySelector('#notsuremusic').checked) return 'notsuremusic';
            if (document.querySelector('#irishmusic').checked) return 'irishmusic';
            if (document.querySelector('#classicalmusic').checked) return 'classicalmusic';
            if (document.querySelector('#varietymusic').checked) return 'varietymusic';
            if (document.querySelector('#othermusic').checked) return 'othermusic';
        }
        
        // beginner 
        if (beginner()) {
            if (musictype()==='classicalmusic' || musictype()==='varietymusic') {
                document.querySelector('#guidePedalPath').scrollIntoView();
                return window.scrollBy(0, -100);
            }
            if (musictype()==='irishmusic') {
                document.querySelector('#guideLeverPath').scrollIntoView();
                return window.scrollBy(0, -100);
            }
            if (musictype()==='notsuremusic'||musictype()==='othermusic') {
                document.querySelector('#guideNotSurePath').scrollIntoView();
                return window.scrollBy(0, -100);
            }
        }
        // experienced
        if (harptype()==='leverharp') {
            document.querySelector('#guideLeverGeneral').scrollIntoView();
            return window.scrollBy(0, -100);
        }
        if (harptype()==='notsureharp') {
            if (musictype()==='classicalmusic' || musictype()==='varietymusic') {
                document.querySelector('#guidePedalGeneral').scrollIntoView();
                return window.scrollBy(0, -100);
            }
            if (musictype()==='irishmusic'||musictype()==='notsuremusic'||musictype()==='othermusic') {
                if (musictype()==='othermusic') alert('Findaharp can not be sure whether you need a pedal or lever harp when option "Other Music" is selected. For now, we will direct you to our lever harp section.');
                document.querySelector('#guideLeverGeneral').scrollIntoView();
                return window.scrollBy(0, -100);
            }
        }   
    }
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='flex';
    }, []);
    return (
        <>
        <Head>
            <title>findaharp.com -- Harp Buyer's Guide</title>
            <meta name="Description" content="Harp Buyer's Guide, Lever Harps, Pedal Harps, Wire Harps, Celtic Harps, Irish Harps, Folk Harps" key="title" />
        </Head>
        <div className='buyersContainer'>
            <div className='buyersGuide'>
                <PageTitle maintitle="Buyer's Guide" subtitle='A collaborative guide from your harp community' />    
                <p>At FindaHarp, we believe the best resource for choosing a harp is your teacher. If you do not have a teacher or you are looking to supplement your knowledge, read on!!</p>
                <p>We would love to make this a collaborative guide from the harp community. If you have a different opinion or supplemental information, please write it up and submit it on the contact page.</p>
                <p>Findaharp.com uses two main categories of harp: LEVER and PEDAL. We include partially levered, lever-free, and lap harps in our LEVER category.</p>
                <PedalLeverTut />
                <h1>Shortcut Section</h1>
                <h4 style={{textAlign: "center"}}>Answer these questions and we will take you the section of the guide that is most relevant to you. Scroll down to skip.</h4>
                {/* <button className='shortcutButton' onClick={() => {document.querySelector('.shortcut').hidden=false;document.querySelector('.shortcutButton').hidden=true;}}>Answer Shortcut Questions</button> */}
                <div className='shortcut'>
                    <p>Are you a brand new harpist or have you been playing for at least a few months?</p>
                    <div className='block'>
                        <input type='radio' id='beginner' name='newplayer' value='Brand New'/>
                        <label htmlFor='newPlayer'>Brand new</label>
                    </div>
                    <div className='block'>
                        <input   type='radio' id='some' name='newplayer' value='Played Some'/>
                        <label  htmlFor='some'>I have played some (or lots!)</label>
                    </div>   
                    <p>Do you know if you are looking for a pedal harp or a lever harp?</p>
                    <div className='radioGroup'>
                        <div className='block'>
                            <input type='radio' id='notsureharp' name='pedallever' value='Not sure'/>
                            <label htmlFor='not sure'>Not sure</label> 
                        </div>
                        <div className='block'>
                            <input type='radio' id='leverharp' name='pedallever' value='lever'/>
                            <label htmlFor='lever'>I want a lever harp</label>
                        </div>
                        <div className='block'>
                            <input type='radio' id='pedalharp' name='pedallever' value='pedal'/>
                            <label htmlFor='pedal'>I want a pedal harp</label>
                        </div>
                    </div>  
                    <p>What type of music are you hoping eventually to be able to play?</p>
                    <div className='block'>
                        <input type='radio' id='notsuremusic' name='musictype' value='notsuremusic'/>
                        <label htmlFor='not sure music'>Not sure</label>
                    </div>
                    <div className='block'>
                        <input type='radio' id='irishmusic' name='musictype' value='irish'/>
                        <label htmlFor='irish'>I am mostly interested in the Irish/Celtic/Folk style of music</label>
                    </div>
                    <div className='block'>
                        <input type='radio' id='classicalmusic' name='musictype' value='classical'/>
                        <label htmlFor='all'>I am mostly interested in classical</label>
                    </div>
                    <div className='block'>
                        <input type='radio' id='varietymusic' name='musictype' value='all'/>
                        <label htmlFor='all'>I am interested in a wide variety of musical styles: classical, pop, jazz, inspirational, world, etc.</label>
                    </div>
                    <div className='block'>
                        <input type='radio' id='othermusic' name='musictype' value='other'/>
                        <label htmlFor='all'>Other</label>
                    </div>
                    <button className='shortcutButton' onClick={handleSurveySubmit}>Take the shortcut</button>
                </div>
                <div className='buyerDivider'>
                    <img src='./img/golden_tapered_line.png' alt="decorative divider"/>
                </div>
                <h1>Buyer's Guide</h1>
                <p>Findaharp.com uses these two main categories of harp: LEVER and PEDAL. We include partially levered, lever-free, and lap harps in our LEVER category.</p>
                <h3 id='guideLeverPath'>Lever Harp Path-beginner</h3>
                <p>This path is for buyers interested in the 'Irish/Celtic/Folk' style of playing.</p>
                
                <p>Looking for contributions from the Find a Harp community to help 
inexperienced buyers. Use the contact/about page to contribute.</p>

                <div className='buyerDivider'>
                    <img src='./img/golden_tapered_line.png' alt="decorative divider"/>
                </div>
                <h3 id='guidePedalPath'>Wide Variety of Music Path-beginner</h3>
                <p>This path is for students or purchasers interested in classical music or in a wide variety of music such as classical, pop, jazz, inspirational, world, etc. Any type of music can be beautifully played on either a lever or pedal harp, but a lever harp has a smaller range of both pitches and harmonies.</p>
                
                <p>Looking for contributions from the Find a Harp community to help 
inexperienced buyers. Use the contact/about page to contribute.</p>
                
                <div className='buyerDivider'>
                    <img src='./img/golden_tapered_line.png' alt="decorative divider"/>
                </div>
                <h3 id='guideNotSurePath'>"Not sure yet" path-beginner</h3>
                <p>Not sure whether you want to end up in a pedal harp or lever harp? No problem at all.</p>
                <p>Typically this student or purchaser would begin with a lever harp, as the student progresses they will discover what style of music speaks to them and they are usually drawn to a certain type of harp.</p>
                <p>Looking for contributions from the Find a Harp community to help 
inexperienced buyers. Use the contact/about page to contribute.</p>

                <div className='buyerDivider'>
                    <img src='./img/golden_tapered_line.png' alt="decorative divider"/>
                </div>
                <h3 id="guidePedalGeneral">Purchasing a Pedal Harp</h3>
                
                <p>Looking for contributions from the Find a Harp community to help 
inexperienced buyers. Use the contact/about page to contribute.</p>

                <div className='buyerDivider'>
                    <img src='./img/golden_tapered_line.png' alt="decorative divider"/>
                </div>
                <h3 id='guideLeverGeneral'>Purchasing a Lever Harp</h3>
                <p>Looking for contributions from the Find a Harp community to help 
inexperienced buyers. Use the contact/about page to contribute.</p>

                <div className='buyerDivider'>
                    <img src='./img/golden_tapered_line.png' alt="decorative divider"/>
                </div>
                
                <h3>Looking for something light-weight or for travelling</h3>
                
                <p>Looking for contributions from the Find a Harp community to help 
inexperienced buyers. Use the contact/about page to contribute.</p>

            </div>
        </div>
        <BuyersGuideCSS />
        </>
    )
}

export default BuyersGuide;
