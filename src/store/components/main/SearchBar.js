
import React, { useState } from 'react'
import { useLunr } from 'react-lunr'
import { Formik, Form, Field } from 'formik'

import lunr from "lunr";

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
  const [query, setQuery] = useState(null);
  const [results, setResults] = useState([{ref: 'here'}, {ref: 'here again'}])
 
const handleChange = (evt) => {
  setQuery(evt.target.value);
}
function searchIt() {
  console.log(idx.search(query))
    setResults(idx.search(query));
}
  return (
    <>
        <input onChange={handleChange}/>
        <button onClick={()=>searchIt()}>Submit</button>
        <h3>Results:</h3>
        <ul>
          {results.map(result => (
            <li key={result.ref}>{result.ref}</li>
          ))}
        </ul>
    </>
  )
}

export default SearchBar;
