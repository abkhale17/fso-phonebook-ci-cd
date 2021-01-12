import React from 'react'
import '../app.css'

const Person = ({ name, number, deletePerson }) => (
  <li>
    {name}
    {' '}
    {number}
    {' '}
    <button type="button" className="DelBtn" onClick={deletePerson}>delete</button>
  </li>
)

export default Person
