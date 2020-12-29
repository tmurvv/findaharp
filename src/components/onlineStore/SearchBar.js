import React, { useState } from 'react'
import { useLunr } from 'react-lunr'
import { Formik, Form, Field } from 'formik'

import lunr from "lunr";
import { ContactsOutlined } from '@material-ui/icons';

var documents = [{
    "name": "Lunr",
    "text": "Like Solr, but much smaller, and not as bright."
  }, {
    "name": "React",
    "text": "A JavaScript library for building user interfaces."
  }, {
    "name": "Lodash",
    "text": "A modern JavaScript utility library delivering modularity, performance & extras."
  }]
  var idx = lunr(function () {
    this.ref('name')
    this.field('text')
  
    documents.forEach(function (doc) {
      this.add(doc)
    }, this)
  })

 
const SearchBar = () => {
//   const [query, setQuery] = useState(null)
//   const results = useLunr(query, index, store)
 
function searchIt() {
    const results = idx.search('Java deliver');
    console.log(results)
    console.log(results[0].ref);
}
  return (
    <>
        <input />
        <button onClick={()=>searchIt()}>Submit</button>
    </>
  )
}

export default SearchBar;
