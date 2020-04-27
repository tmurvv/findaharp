function PrivateAdsCSS() {
    return (
        <style jsx={true}>{`
        h2 {
            margin-top: 25px;
        },
        .marginBottomMedium {
            margin-bottom: 15px;
        }
        button {
            margin: 15px auto;
            background-color: #f9bf1e;
            padding: 5px 10px;
            font-size: 20px;
            border-radius: 3px;
            outline: none;  
        }
        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    )
}

export default PrivateAdsCSS;
