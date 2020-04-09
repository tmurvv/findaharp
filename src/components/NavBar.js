import Link from 'next/link';

const NavBar = () => {
    return(
        <>
        <div className='navBarOuter'>
            <Link href='/'>
                <a>Home</a>
            </Link>
            <Link href='/PrivateAds'>
                <a>Sell Your Harp</a>
            </Link>
            <Link href='/About'>
                <a>About</a>
            </Link>
            <Link href='/Contact'>
                <a>Contact</a>
            </Link>
        </div>
        <style jsx>{`
            .navBarOuter {
                background-color: #333333;
                height: 40px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
            }
            a {
                text-decoration: none;
                color: #fafbfc;
                opacity: .85
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