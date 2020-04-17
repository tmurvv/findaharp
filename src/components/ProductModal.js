import React from 'react';

function ProductModal(props) {
    const product = props.product || "Product not found";

    return (
        <>
        <div className='detailContainer'>
            <div className={`detailImg`}><img src= {product.productImageUrl} alt={product.productTitle}/></div>
            <div className={`detailText`}>
                <p>Maker: {product.productMaker} {product.productModel}</p>
                <p>Model: {product.productSize} Strings / {product.productType}</p>
                <p>Price: {product.productPrice}</p>
                <p>Finish: {product.productFinish}</p>
                <p>------</p>
                <p>Description (more button not yet implemented): {product.prodLongDesc && product.productLongDesc.substr(0,100)} <a href='#' style={{color: 'blue'}}>more...</a></p>
                <p>------</p>
                <p>Location: {product.sellerRegion}</p>
                <p>contact info (will link to a contact form): {product.sellerName}</p>
            </div>           
            <button onClick={props.handleClose} style={{backgroundColor: '#fffee37', padding: '10px 15px', fontSize: '24px', margin: '25px'}}>Close</button>
        </div>
        <style jsx>{`
            .detailContainer {
                height: 75vh;
                width: 40vh;
                background-color: #ffffff;
                position: fixed;
                border: 12px double #f9bf1e;
                border-radius: 3px;
                top: 50vh;
                left: 50vh;
                transform: translate(-30%, -50%);
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
            },
            .detailImg {
                height: 50%;
                margin: 0 auto;
            }
            .detailImg img {
                height: 100%;
                margin: 0 auto;
            }
            .detailText {
                padding: 20px 0;
            }
            .detailText p {
                text-align: center;
                margin-block-start: 0;
                margin-block-end: 0;
                height: auto;
            }
            .marginTop {
                margin-top: 10px;
            }
        `}
        </style>
        </>
    )
}

export default ProductModal;