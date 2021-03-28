import React, { useContext, useEffect } from 'react';

import { UserContext } from '../src/main/contexts/UserContext';
// display cart??
// useEffect(()=>{
//     if (document.querySelector('.cartButton')) document.querySelector('.cartButton').style.display='none';
// },[]);
function uploadlisting() {
    const { user } = useContext(UserContext);
    return (
        <>
            <h1>BREAKING -- this component causing a build error. Needs to be debugged. Scroll down to see code.</h1>           
        </>
    )
}

export default uploadlisting;

// {/* <h1>Upload Harp Listing</h1>           
//             <div className='formContainer'>
//                 {/* <form action="https://findaharp-api-testing.herokuapp.com/api/v1/uploadlisting" method="post" encType="multipart/form-data"> */}
//                 <form action="https://findaharp-api.herokuapp.com/api/v1/uploadlisting" method="post" encType="multipart/form-data">
//                 {/* <form action="http://localhost:3000/api/v1/uploadlisting" method="post" encType="multipart/form-data"> */}
//                     <div className='inputGroup'>
//                         <label name="sellername">Seller Name: </label>
//                         <input type="text" name="sellername" defaultValue={`${user.firstname} ${user.lastname}`} disabled />
//                     </div>
//                     <div className='inputGroup'>
//                         <label name="title"><span style={{color: 'red'}}>*</span>Descriptive Title: </label>
//                         <input type="text" name="title" required/>
//                         <p style={{fontSize: '12px', fontStyle: "italics", color: 'grey', marginTop: '-5px', marginBottom:'-5px'}}>example: "Stunning Gold Aoyama Monarch, 47 strings"</p>
//                     </div>
//                     <div className='inputGroup'>
//                         <label name="make"><span style={{color: 'red'}}>*</span>Harp Maker: </label>
//                         <input type="text" name="make" required/>
//                     </div>
//                     <div className='inputGroup'>
//                         <label name="model"><span style={{color: 'red'}}>*</span>Harp Model: </label>
//                         <input type="text" name="model" required/>
//                     </div>
//                     <div className='inputGroup'>
//                         <label name="price">Price: </label>
//                         <input type="text" name="price" />
//                     </div>
//                     <div className='inputGroup'>
//                         <label name="description">Description: </label>
//                         <textarea name="description" rows='4'/>
//                     </div>
//                     <div className='inputGroup'>
//                         <label name="photo"><span style={{color: 'red'}}>*</span>Photo: </label>
//                         <input style={{backgroundColor: 'transparent', border: 'none', fontSize: '16px'}} type="file" accept="image/*" name="photo" required/>
//                     </div>
//                     <div className='inputGroup submit'>
//                         <input type="submit" value="upload"/>
//                     </div>
//                     <div className='inputGroup' hidden>
//                         <input type="text" name='user' defaultValue={user.role}/>
//                     </div>
//                 </form>
//             </div>
//             <style jsx='true'>{`
//                 h1{
//                     font-size: 30px;
//                     text-transform: uppercase;
//                     text-align: center;
//                     margin: 50px;
//                 }
//                 .formContainer {
//                     margin: 50px auto;
//                     padding: 25px;
//                     width: fit-content;
//                     border: 1px solid lightgrey;
//                     box-shadow: 10px 10px 5px 0px rgb(0,0,0,.45);
//                 }
//                 form {
//                     line-height: 2;
//                     margin: auto;
//                 }
//                 .inputGroup {
//                     text-align: right;
//                     margin: 5px;
//                 }
//                 input,
//                 textarea {
//                     padding: 5px;
//                     border: .5px solid lightgrey;
//                     border-radius: 3px;
//                     width: 300px;
//                     background-color: rgb(232, 240, 254);
//                 }
//                 textarea {
//                     vertical-align: top;
//                     margin-top: 5px;
//                     margin-bottom: 5px;
//                 }
//                 label {
//                     margin-right: 15px;
//                 }
//                 .submit {
//                     text-align: center;
//                     display: flex;
//                     align-items: center;
//                 }
//                 .submit>input {
//                     padding: 10px 10px;
//                     margin-top: 20px;
//                     font-size: 24px;
//                     border-radius: 5px;
//                     background-color: #ffe58a;
//                     border: none;
//                     width: 100%;
//                     height: 100%;
//                 }
//             `}
//             </style> */}
