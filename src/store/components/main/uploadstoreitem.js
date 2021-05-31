import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';

import { UserContext } from '../../../main/contexts/UserContext';
import PageTitle from '../../../main/components/main/PageTitle';
import IndexCss from '../../../main/styles/index.css';

function uploadstoreitem() {

    function handleSubmit(e) {
        e.preventDefault();
        const uploadItem  = {
            "category": "music",
            "title": "Little Harp Book",
            "artist_first": "Marcel",
            "artist_last": "Grandjany",
            "seller": "Simply Music",
            "price": "5.00",
            "description": "this is the piece",
            "image": "imagename",
            "condition": "8",
            "level": "intermediate",
            "harptype": "lever",
            "notes": "coffee stain on cover",
            "newused": "used",
            "newprice": "25.00"
        }
        axios.post('https://findaharp-api.heroku.app/api/v1/uploadstoreitem', uploadItem, {
        // axios.post('http://localhost:3000/api/v1/uploadstoreitem', uploadItem, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    // display cart??
    useEffect(()=>{
        if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
    },[]);
    useEffect(()=>{
        if (Router.query&&Router.query.photoSuccess&&Router.query.photoSuccess==='no') {
            alert(`Item image did not upload correctly. Item has been uploaded without image.: ${Router.query.message}`);
            Router.push('/?upload=yes');
        } else if (Router.query&&Router.query.success&&Router.query.success==='yes') {
            alert('Store item uploaded.');
            Router.push('/?upload=yes');
        } else if (Router.query&&Router.query.success&&Router.query.success==='no') {
            alert(`Item did not upload correctly: ${Router.query.message}`);
            Router.push('/?upload=yes');
        }
    },[]);
    const { user } = useContext(UserContext);
    return (
        <>
            <br />
            <br />
            <br />
            <PageTitle maintitle="Upload Store Item" subtitle='Currently set up for Simply Music' />             
            <div className='formContainer'>
                <form action="https://findaharp-api.herokuapp.com/api/v1/uploadstoreitem" method="post" encType="multipart/form-data">
                {/* <form action="https://findaharp-api.herokuapp.com/api/v1/uploadstoreitem" method="post" encType="multipart/form-data"> */}
                {/* <form action="http://localhost:3000/api/v1/uploadstoreitem" method="post" encType="multipart/form-data"> */}
                    <div className='inputGroup'>
                        <label name="seller"><span style={{color: 'red'}}>*</span>Seller Name: </label>
                        <input type="text" name="seller" value='Simply Music' required/>
                        {/* <input type="text" name="sellername" defaultValue={`${user.firstname} ${user.lastname}`} disabled /> // BREAKINk*/}
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor="category"><span style={{color: 'red'}}>*</span>Main Category: </label>
                        <select name="category" required>
                            <option value="strings">Strings</option>
                            <option value="music" selected>Music</option>
                            <option value="accessories">Accessories</option>
                            <option value="books">Books</option>
                            <option value="gifts">Gifts</option>
                            <option value="cds">Cds</option>
                            <option value="digitaldownloads">Digital Downloads</option>
                        </select>
                    </div>
                    <div className='inputGroup'>
                        <label name="title"><span style={{color: 'red'}}>*</span>Title: </label>
                        <input type="text" name="title" required/>
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor="artist_first">Artist First Name: </label>
                        <input type="text" name="artist_first"/>
                        <p style={{fontSize: '12px', fontStyle: "italics", color: 'grey', marginTop: '-5px', marginBottom:'-5px'}}>Artist means Composer, Arranger, or Performer, the most likely to be searched on.</p>
                    </div>
                    <div className='inputGroup'>
                        <label  htmlFor="artist_last"><span style={{color: 'red'}}>*</span>Artist Last Name: </label>
                        <input type="text" name="artist_last" required/>
                    </div>
                    <div className='inputGroup'>
                        <label  htmlFor="price"><span style={{color: 'red'}}>*</span>Price (in USD): </label>
                        <input type="text" name="price" required />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor="description">Description: </label>
                        <textarea name="description" rows='4'/>
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor="level">Level: </label>
                        <select name="level">
                            <option value="beginning">Beginning</option>
                            <option value="beg-int">Beg-Int</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="int-adv">Int-Adv</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor="harptype">Harp Type: </label>
                        <select name="harptype">
                            <option value="lever" selected>Lever</option>
                            <option value="pedal">Pedal</option>
                            <option value="all">All</option>
                        </select>
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor="photo">Photo: </label>
                        <input style={{backgroundColor: 'transparent', border: 'none', fontSize: '16px'}} type="file" accept="image/*" name="photo"/>
                    </div>
                    <div className='inputGroup' style={{textAlign: 'left', marginLeft: '175px'}}>
                        <h4>Sub-Categories (select all that apply)</h4>
                        <input type="checkbox" id="harpsolo" name="harpsolo" value="harsolo" />
                        <label htmlFor="harpsolo"> Harp Solo</label><br />
                        <input type="checkbox" id="harpensemble" name="harpensemble" value="harpensemble" />
                        <label htmlFor="harpensemble"> Harp Ensemble</label><br />
                        <input type="checkbox" id="pop" name="pop" value="pop" />
                        <label htmlFor="pop"> Pop</label><br />
                        <input type="checkbox" id="classical" name="classical" value="classical" />
                        <label htmlFor="classical">Classical</label><br />
                        <input type="checkbox" id="fluteharp" name="fluteharp" value="flute/harp" />
                        <label htmlFor="fluteharp">Flute/Harp</label><br />
                        <input type="checkbox" id="violinharp" name="violinharp" value="violin/harp" />
                        <label htmlFor="violinharp">Violin/Harp</label><br />
                        <input type="checkbox" id="voiceharp" name="voiceharp" value="voice/harp" />
                        <label htmlFor="voiceharp">Voice/Harp</label><br />
                        <input type="checkbox" id="otherensemble" name="otherensemble" value="otherensemble" />
                        <label htmlFor="otherensemble">Other Ensemble</label><br />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor="newused">New or Used?: </label>
                        <select name="newused">
                            <option value="neworused">New or Used?</option>
                            <option value="new" selected>New</option>
                            <option value="used">Used</option>
                        </select>
                    </div>
                    <h4 style={{textAlign: 'center'}}>For Used Items</h4>
                    <div className='inputGroup'>
                        <label htmlFor="condition">Condition (1-10): </label>
                        <input name="condition"/>
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor="newprice">Price if purchased new: </label>
                        <input name="newprice"/>
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor="notes">Notes on condition: </label>
                        <textarea name="notes" rows='4' placeholder="markings, coffee stains, wear and tear"/>
                    </div>
                    <div className='inputGroup submit'>
                        <input type="submit" value="upload"/>
                    </div>
                    <div className='inputGroup' hidden>
                        <input type="text" name='user' defaultValue={user.role}/>
                    </div>
                </form>
            </div>
             <IndexCss />

            <style jsx='true'>{`
                h1{
                    font-size: 30px;
                    text-transform: uppercase;
                    text-align: center;
                    margin: 50px;
                }
                .formContainer {
                    margin: 50px auto;
                    padding: 25px;
                    width: fit-content;
                    border: 1px solid lightgrey;
                    box-shadow: 10px 10px 5px 0px rgb(0,0,0,.45);
                }
                form {
                    line-height: 2;
                    margin: auto;
                }
                .inputGroup {
                    text-align: right;
                    margin: 5px;
                }
                input,
                textarea {
                    padding: 5px;
                    border: .5px solid lightgrey;
                    border-radius: 3px;
                    width: 300px;
                    background-color: rgb(232, 240, 254);
                }
                textarea {
                    vertical-align: top;
                    margin-top: 5px;
                    margin-bottom: 5px;
                }
                select {
                    width: 311px;
                    padding: 5px;
                }
                label {
                    margin-right: 15px;
                }
                input[type=checkbox] {
                    width: fit-content;
                }
                .submit {
                    text-align: center;
                    display: flex;
                    align-items: center;
                }
                .submit>input {
                    padding: 10px 10px;
                    margin-top: 20px;
                    font-size: 24px;
                    border-radius: 5px;
                    background-color: #ffe58a;
                    border: none;
                    width: 100%;
                    height: 100%;
                }
            `}
            </style>
        </>
    )
}

export default uploadstoreitem;

