import React from 'react'


const Phonebook = ({shown, onDelete}) => 
  shown.map(person => <p key = {person.id}>{person.name} {person.number} <button onClick={() => onDelete(person.id)}>Delete</button> </p>)
export default Phonebook