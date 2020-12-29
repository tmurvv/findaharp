import React from 'react';
import NoteCss from '../../styles/stringForm/Note.css';

function Note({note, header}) {
    return (
        <>
            <div class="noteGridContainer">
                {note==='Header'
                ?<><div class="item3 colHeader">Qty</div>
                <div class="item3 colHeader">Note</div>
                <div class="item5 colHeader">Price</div>
                <div class="item6 colHeader">Total</div></> 
                :<><input class="item4" placeholder='0' />
                <div class="item3">{note}</div>
                <div class="item5">$0.00</div>
                <div class="item6">$0.00</div></> 
                }
            </div>
            <NoteCss />
        </>
    )
}

export default Note;
