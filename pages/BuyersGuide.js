import React from 'react';
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
        //console.log('res', beginner(), harptype(), musictype());
        
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
            if (musictype()==='classicalmusic' || musictype()==='variety') {
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
    return (
        <>
        <div className='buyersContainer'>
            <div className='buyersGuide'>       
                <h1>Buyer's Guide</h1>
                <p>At Findaharp, we believe the best resource for choosing a harp is your teacher. If you do not have a teacher or you are looking to supplement your knowledge, read on!!</p>
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
                <p>As a beginner, you want to be sure to start with a harp that will rest on the floor rather than held up by your legs or in your lap. With everything else that you are learning, you don’t want to worry about balancing the instrument. Even if you are hoping to eventually play a smaller lap harp, it is good to learn first on a larger floor harp.</p> 
                <p>Usually, beginners start with 28-36 strings. In this size range, a larger instrument is a bit easier to keep tipped back on the shoulder. Also, a harp with fewer strings sometimes sometimes requires rearranging the music to make it work on the instrument.</p>
                <p>It is also a good idea to inquire when the harp was last maintained. In the harp world we call it 'regulation'. Since harps are made of wood and glue, things can shift around a bit because of the weather and because of the tension of the strings. These shifts will cause the lever or pedal change to go 'off key' or 'out of tune'. Regulation corrects for this and should be done every 1-3 years depending on your situation.</p>
                <p>Some other things to ask about:</p>    
                    <ol>
                        <li>A tuning key that fits the tuning pegs.</li>
                        <li>A cover for the instrument.</li>
                        <li>For a smaller lever harp, legs for the instrument to make it high enough to lean back on your shoulder.</li>
                        <li>Full levers. Some harps will come ‘partially levered’.</li>
                    </ol>
                <p>Bottom line: we recommend a 34 or 36 string fully-levered harp.</p>

                <div className='buyerDivider'>
                    <img src='./img/golden_tapered_line.png' alt="decorative divider"/>
                </div>
                <h3 id='guidePedalPath'>Pedal Harp Path-beginner</h3>
                <p>This path is for students or purchasers interested in classical music or in a wide variety of music such as classical, pop, jazz, inspirational, world, etc.</p>
                <p>Students on the pedal harp path will generally start with a lever harp to be sure that they really take to the instrument before making the investment a pedal harp requires. If the expense is not prohibitive and the student is at least 4’10”, then starting on a pedal harp would be an option. (<a href="#guidePedalGeneral" style={{color: '#fe9e1a'}}>click here</a> to skip to pedal harp section). Here we will assume the student is starting with a lever harp before progressing to a pedal harp.</p>
                <p>Here are three suggestions for finding a lever harp that will set you up to transition into a pedal harp:</p>
                <ol>
                    <li>Find a harp that has a similar tension as the strings as a pedal harp. In other words, the strings are not more loose or wobbly than pedal harp strings. </li>
                    <li>Find a harp where the strings are the same distance apart as a pedal harp.</li>
                    <li>Find a lever harp that is on the larger side of lever harp choices, at least 36 strings.</li>
                </ol>
                <p>A lever harps made by a pedal harp maker will usually have the same string tension and distance between the strings as the maker's pedal harps. Having said that, many lever only harp makers will also use similar tensions and distance between strings and some of our most beautiful lever harps are from makers who do not make pedal harps.</p>
                <p>It is also a good idea to inquire when the harp was last maintained. In the harp world we call it 'regulation.' Since harps are made of wood and glue, things can shift around a bit because of the weather and because of the tension of the strings. These shifts will cause the lever or pedal change to go 'off key' or 'out of tune.' Regulation corrects for this and should be done every 1-3 years depending on your individual situation.</p>
                <p>Some other things to ask about:</p>
                <ol>
                    <li>A tuning key that fits the tuning pegs.</li>
                    <li>A cover for the instrument.</li>
                    <li>For a smaller lever harp, legs for the instrument to make it high enough to lean back on your shoulder.</li>
                    <li>Full levers. Some harps will come ‘partially levered’.</li>
                </ol>
                <p>Bottom line, we recommend starting with a large lever harp (at least 36 strings) and progressing to a pedal harp at a later date.</p>
                <div className='buyerDivider'>
                    <img src='./img/golden_tapered_line.png' alt="decorative divider"/>
                </div>
                <h3 id='guideNotSurePath'>"Not sure yet" path-beginner</h3>
                <p>Not sure whether you want to end up in a pedal harp or lever harp? No problem at all.</p>
                <p>Typically this student or purchaser would begin with a lever harp, as the student progresses they will discover what style of music speaks to them and they are usually drawn to a certain type of harp.</p>
                <p>You will want to look for a lever harp that stands on the floor and can be tipped back on your shoulder rather than one you have to hold up with your legs or hold in your lap. The ideal size harp for a beginner is usually 34-36 strings.</p>
                <p>Some other things to ask about:</p>
                <ol>
                    <li>A tuning key that fits the tuning pegs.</li>
                    <li>A cover for the instrument.</li>
                    <li>For a smaller lever harp, legs for the instrument to make it high enough to lean back on your shoulder.</li>
                    <li>Full levers. Some harps will come ‘partially levered’.</li>
                </ol>
                <p>It is also a good idea to inquire when the harp was last maintained. In the harp world we call it 'regulation.' Since harps are made of wood and glue, things can shift around a bit because of the weather and because of the tension of the strings. These shifts will cause the lever or pedal change to go 'off key' or 'out of tune.' Regulation corrects for this and should be done every 1-3 years depending on your individual situation.</p>
                
                <p>Bottom line, we recommend starting with a medium-large lever harp, 30-36 strings (ideally 34 or 36 strings).</p>
                <div className='buyerDivider'>
                    <img src='./img/golden_tapered_line.png' alt="decorative divider"/>
                </div>
                <h3 id="guidePedalGeneral">Purchasing a Pedal Harp</h3>
                <div className='underConstructionImage'>
                    <img src='./img/not_found.png' alt='humorous harp with broken strings'/>
                    <h4>Under Construction</h4>
                </div>
                
                
                {/* <p>This path is for students or purchasers interested in a wide variety of music such as classical, pop, jazz, world.</p>
                <p>Students on the pedal harp path will generally start with a lever harp to be sure that they really take to the instrument before making the investment a pedal harp requires. If the expense is not prohibitive and the student is at least 4’10”, then it can be a good choice to start right away with a pedal harp. Here we will assume the student is starting with a lever harp before progressing to a pedal harp.</p>
                <p>Here are three suggestions for finding a lever harp that will set you up to transition into a pedal harp:</p>
                <ol>
                    <li>Find a harp that has a similar tension as the strings as a pedal harp. In other words, the strings are not more loose or wobbly than pedal harp strings. </li>
                    <li>Find a harp where the strings are the same distance apart as a pedal harp.</li>
                    <li>Find a lever harp that is on the larger side of lever harp choices 34-48 strings.</li>
                </ol>
                <p>All of these suggestions can usually be found in lever harps made by pedal harp makers. If the maker also makes pedal harps, it is likely that their lever harps will have the same tension and distance between the strings as their pedal harps. Having said that, many lever only harp makers will also use similar tensions and distance between strings and some of our most beautiful lever harps are from makers who do not make pedal harps.</p>
                <p>It is also a good idea to inquire when the harp was last maintained. In the harp world we call it 'regulation.' Since harps are made of wood and glue, things can shift around a bit because of the weather and because of the tension of the strings. These shifts will cause the lever or pedal change to go 'off key' or 'out of tune.' Regulation corrects for this and should be done every 1-3 years depending on your individual situation.</p>
                <p>Here are some things lever harp students or purchasers can find frustrating if they are not included with the instrument:</p>    
                <ol>
                    <li>A tuning key that fits the tuning pegs.</li>
                    <li>A cover for the instrument.</li>
                    <li>For a smaller lever harp, legs for the instrument to make it high enough to lean back on your shoulder.</li>
                    <li>Full levers. Some harps will come ‘partially levered’.</li>
                </ol>
                <p>Bottom line, we recommend starting with a large lever harp (at least 36 strings) and progressing to a pedal harp at a later date.</p> */}
                <div className='buyerDivider'>
                    <img src='./img/golden_tapered_line.png' alt="decorative divider"/>
                </div>
                <h3 id='guideLeverGeneral'>Purchasing a Lever Harp</h3>
                <div className='underConstructionImage'>
                    <img src='./img/not_found.png' alt='humorous harp with broken strings'/>
                    <h4>Under Construction</h4>
                </div>
                {/* <p>This path is for buyers interested in the 'Irish/Celtic/Folk' style of playing.</p>
                <p>As a beginner, you want to be sure to start with a harp that will rest on the floor rather than held up by your legs or in your lap. With everything else that you are learning, you don’t want to worry about balancing the instrument. Even if you are hoping to eventually play a smaller lap harp, it is good to learn first on a larger floor harp.</p> 
                <p>For this type of harp, the number of strings becomes quite important. Usually, beginners start with 28-36 strings. What is the difference? Ironically, the larger the instrument in this category, the easier it is to play. A larger lever harp generally has a larger sound. Obviously there are fewer strings on a smaller harp and harpists sometimes have to rearrange the music to make it work on the instrument.</p> */}
                <p>It is also a good idea to inquire when the harp was last maintained. In the harp world we call it 'regulation'. Since harps are made of wood and glue, things can shift around a bit because of the weather and because of the tension of the strings. These shifts will cause the lever or pedal change to go 'off key' or 'out of tune'. Regulation corrects for this and should be done every 1-3 years depending on your situation.</p>
                <p>Some other things to ask about:</p>
                    <ol>
                        <li>A tuning key that fits the tuning pegs.</li>
                        <li>A cover for the instrument.</li>
                        <li>For a smaller lever harp, legs for the instrument to make it high enough to lean back on your shoulder.</li>
                        {/* <li>Full levers. Some harps will come ‘partially levered’.</li> */}
                    </ol>
                <p>Bottom line: </p>

                <div className='buyerDivider'>
                    <img src='./img/golden_tapered_line.png' alt="decorative divider"/>
                </div>
                
                <h3>Looking for something light-weight</h3>
                <div className='underConstructionImage'>
                    <img src='./img/not_found.png' alt='humorous harp with broken strings'/>
                    <h4>Under Construction</h4>
                </div>
                {/* <p>Not sure whether you want to end up in a pedal harp or lever harp?</p>
                <p>Typically this student or purchaser would begin with a lever harp and then discover what type of music is most enjoyed before choosing a long-term harp. Whatever harp you choose to begin on, it is still possible to transition to a pedal harp. </p>
                <p>You will still want to look a lever harp that stands on the floor and can be tipped back on your shoulder rather than one you have to hold up with your legs or hold in your lap. The ideal size harp I recommend for a beginner is 34-36 strings.</p>
                <p>It is also a good idea to inquire when the harp was last maintained. In the harp world we call it 'regulation.' Since harps are made of wood and glue, things can shift around a bit because of the weather and because of the tension of the strings. These shifts will cause the lever or pedal change to go 'off key' or 'out of tune.' Regulation corrects for this and should be done every 1-3 years depending on your individual situation.</p>
                <p>Here are some things lever harp students or purchasers can find frustrating if they are not included with the instrument:</p>     */}
                <ol>
                    <li>A tuning key that fits the tuning pegs.</li>
                    <li>A cover for the instrument.</li>
                    {/* <li>For a smaller lever harp, legs for the instrument to make it high enough to lean back on your shoulder.</li>
                    <li>Full levers. Some harps will come ‘partially levered’.</li> */}
                </ol>
                {/* <p>Bottom line, we recommend starting with a medium-large lever harp (30-36 strings).</p> */}
            </div>
        </div>
        <BuyersGuideCSS />
        </>
    )
}

export default BuyersGuide;
