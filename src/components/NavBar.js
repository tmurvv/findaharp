import Link from 'next/link';

const NavBar = () => {
    return(
        <>
        <div className='navBarOuter'>
            <Link href='/'>
                <a>Find a Harp</a>
            </Link>
            <Link href='/PrivateAds'>
                <a>Sell Your Harp</a>
            </Link>
            <Link href='/BuyersGuide'>
                <a>Buyer's Guide</a>
            </Link>
            <Link href='/FAQ'>
                <a>FAQ</a>
            </Link>
            <Link href='/Contact'>
                <a>Contact</a>
            </Link>
        </div>
        <style jsx="true">{`
            .navBarOuter {
                background-image: linear-gradient(340deg, #f9bf1e 50%, #fffbb5 58%, #ffe58a 74%, #f9bf1e 87%);
                height: 30px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                border-bottom: 1px solid grey;
            }
            a {
                font-family: 'avenir';
                font-size: 12px;
                text-decoration: none;
                color: #000000;
            }

            a:hover {
                opacity: 1;
            }
      `}</style>
      </>   
    )
}

export default NavBar;







// import React from 'react';

// function NavBar() {
//     return (
//         <div className="navBarOuter">
//             <ul className='navBarItems'>
//                 <li className='navBarItem'><a href='/'>Home</a></li>
//                 <li className='navBarItem'><a href='/privateads'>Sell Your Harp!</a></li>
//                 <li className='navBarItem'><a href='/about' onClick={() => alert('Not yet implemented')}>About</a></li>
//                 <li className='navBarItem'><a href='#' onClick={() => alert('Not yet implemented')}>Contact</a></li>
//             </ul>
//         </div>
//     );
// }

// export default NavBar;