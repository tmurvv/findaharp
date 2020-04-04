// packages
import React, { useState, useEffect , useContext } from "react";
import Link from 'next/link';
import axios from 'axios';

// internal
import { ProductsContext } from '../contexts/ProductsContext';
import Loader from '../components/Loader';
// import HarpSearch from './HarpSearch';

const Index = (props) => {
    //console.log('here', props.products)
    const {products, setProducts, makesModels, setMakesModels} = useContext(ProductsContext);
    const [ loader, setLoader ] = useState(true);
    const productsArray = Array.from(props.products);
    console.log(props.products[0])
    useEffect(() => {
        //const unsubscribe = api.createSubscription()
        setProducts(products);
        setLoader(false);
    }, []);
    
    if (loader) {
        return (
            <div className="App"> 
                {loader}
                <h1>Find A Harp <span style={{fontStyle: 'italic', fontSize: '80%'}}>.com</span></h1>
                <Loader />
            </div>
        );
    } else {
        return (
            <div className="App">  
                <div className='mainTitle'>
                    <h5>This website is under construction and none of the design is implemented.<br></br>
                    It will be beautiful! But right now, it is only functional.</h5>
                    <h1>Find A Harp <span style={{fontStyle: 'italic', fontSize: '80%'}}>.com</span></h1>
                    <p className='subTitle'>Save valuable time! Pre-owned harps from reputable harp stores and private sellers all in one place.</p>
                </div>
                <p>{props.products[0].title}</p>
                {/* <HarpSearch 
                    // makesmodels={makesModels}
                    // usedharps={products}
                /> */}
                    {/* <ModelMenu /> */}               
            </div>
        );
    }
}
Index.getInitialProps = async () => {
    // const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const data = res.data;
    console.log("FETCHING IN GET INITIAL PROPS")
    return { products: Array.from(data), mood: 'HAPPY' };
}

export default Index;






// const Index = (props) => {

//     return(
//         <div>
//             <h1>
//                 Our Index Page!!!!
//             </h1>
//             <ul>
//                 {props.posts.map(post => 
//                     <li key={post.id}>
//                         <Link href={`/post?id=${post.id}`} as={`/post/${post.id}`}>
//                             <a>{post.title}</a>
//                         </Link>              
//                     </li>
//                 )}
//             </ul>
//         </div>
//     )
// }
// Index.getInitialProps = async () => {
//     const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
//     const data = res.data;
//     console.log("FETCHING IN GET INITIAL PROPS")
//     return { posts: data, mood: 'HAPPY' };
// }

// export default Index;
