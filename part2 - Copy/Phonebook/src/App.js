import { useState, useEffect } from 'react'
import axios from 'axios'
import Phonebook from './components/Phonebook.js'
import Filter from './components/Filter.js'
import SubmitField from './components/SubmitField.js'
import personServices from './services/personServices.js'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [shown, setShown] = useState([])
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  const addToBook = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    const id = names.findIndex(name => name === newName) + 1
    if(id !== 0){
      if(window.confirm(`${newName} is already in the phonebook. Would you like to update their info?`)){
        const newPerson = {
          name: newName,
          number: newNumber,
        }
        personServices.update(id,newPerson).then(returnedPerson => {
          const personCopy = persons.map(person => person.id === id ? returnedPerson : person)
          setNotification(
            `Updated '${newName}' `
          )
          setPersons(personCopy)
          setNewName('')
          setNewNumber('')
          setNewFilter('')
          setShown(personCopy)
          console.log(personCopy)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch( e => {
          setError(
            `${newName} is already deleted`
          )
          setNewName('')
          setNewNumber('')
          setNewFilter('')
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
      }
      else{
        setNewName('')
        setNewNumber('')
        setNewFilter('')
      }
    }
    else{
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personServices
        .create(newPerson)
        .then(returnedPerson => {
          const personCopy = persons.concat(returnedPerson)
          setNotification(
            `Added '${newName}' `
          )
          setPersons(personCopy)
          setNewName('')
          setNewNumber('')
          setNewFilter('')
          setShown(personCopy)
          console.log(personCopy)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }
  
  const nameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const filterChange = (event) => {
    const substring = event.target.value
    console.log(substring)
    setNewFilter(substring)
    const shownCopy = (substring === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(substring))
    setShown(shownCopy)
  }
  
  const onDelete = (id) => {
    console.log('help')
    if(window.confirm('Would you like to delete this entry?')){
      personServices.remove(id)
      const personCopy = (persons.filter(person => person.id !== id))
      setPersons(personCopy)
      setNewName('')
      setNewNumber('')
      setNewFilter('')
      setShown(personCopy)
    }
    else{
      setNewName('')
      setNewNumber('')
      setNewFilter('')
    }
  }

  useEffect(() => {
    personServices.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setShown(response)
        setPersons(response)
      })
  }, [])
  
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='notification'>
        {message}
      </div>
    )
  }

  const Error = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
      <Filter value={filter} onChange={filterChange} />
      <h2>add a number</h2>
      <form onSubmit={addToBook}>
        <div>
          name:  <SubmitField value={newName} onChange={nameChange} />
        </div>
        <div>
          number: <SubmitField value={newNumber} onChange={numberChange} />
        </div>
        <div>
          <button  type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Phonebook shown={shown} onDelete={onDelete} />
      </div>
    </div>
  )
}

export default App