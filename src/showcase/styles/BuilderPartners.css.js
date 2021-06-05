function BuilderPartnersCSS() {
    return (
        <style jsx="true">{`
            .builderPartnersContainer {
                background-image: linear-gradient(to bottom, #eff3fc, #ffffff 300px);
                padding-top: 70px;
                padding-bottom: 70px;
                position: relative;
            }
            @media only screen and (max-width: 550px) {
                .subTitle {
                    max-width: 300px;
                }
            }
        `}</style>
    )
}

export default BuilderPartnersCSS;
