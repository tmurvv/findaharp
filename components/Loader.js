import React from 'react';

function Loader() {
    return(
        <div data-test='component-loader'>
            <img  className='loader' src="/img/spinner.gif" alt='Loading Spinner'/>                
        </div>
    );
}
export default Loader;
