function StorePartnersCSS() {
    return (
        <style jsx="true">{`
            .storePartnersContainer {
                background-image: linear-gradient(to bottom, #fffedf, #ffffff 300px);
                padding-top: 70px;
                padding-bottom: 70px;
            }
            @media only screen and (max-width: 550px) {
                .subTitle {
                    max-width: 300px;
                }
            }
        `}</style>
    )
}

export default StorePartnersCSS;
