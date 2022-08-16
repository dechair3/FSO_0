import { useState, useEffect } from 'react'
import axios from 'axios' 






const API_KEY = process.env.REACT_APP_API_KEY 
const App = () => {
  const [country, setCountry] = useState([])
  const [newCountry, setNewCountry] = useState('')
  const [list, setList] = useState([])
  const [shown, setShown] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setList(response.data)
      })
  }, []) 
 

  const searchCountry = (event) => {
    event.preventDefault()
    setShown([])
    setNewCountry(event.target.value)
    setCountry(list.filter(country => country.name.common.includes(event.target.value)))
  }

  const handleShown = (country) => {
    if(shown.includes(country)){
      var shownCopy = shown
      shownCopy = shownCopy.filter(x => x !== country)
      console.log(shownCopy)
      setShown(shownCopy)
    }
    else{
      setShown(shown.concat(country))
    }
    
  }
  const Weather = ({country}) =>{
    const lat = country.latlng[0]
    const long = country.latlng[1]
    var weather
    axios
        .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}`)
        .then(response => {
          weather = response.data
        })
    return(
      <div>
        <h1>Weather in {country.capital[0]}</h1>
        <p>Temperature: {weather.hourly[0].temp - 273.15} degrees centigrade</p>
        <img src={`http://openweathermap.org/img/wn/${weather.hourly[0].weather[0].icon}@2x.png`} alt=''/>
        <p>Wind: {weather.hourly[0].wind_speed} m/s</p>
      </div>
    )
    
  }
  const Country = ({country}) => {
    return(
      <div>
        <div>
          <h1>{country.name.common}</h1>
        </div>
        <div>
          Capital: {country.capital[0]}
        </div>
        <div>
          Area: {country.area} units
        </div>
        <div>
          <b>Languages Spoken</b>
          <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
          </ul>
        </div>
        <div>
          <img src={country.flags.png} alt=""/>
        </div>
        <div>
        </div>
      </div>
    )
  }

  const Info = ({country}) => {
    console.log(country)
    if(country.length > 10){
      return <p>Too many matches, specify another filter</p>
    }
    else if(country.length !== 1){
      return country.map(x => <div key={x.name.common}>
        <p>{x.name.common}</p> 
        <button onClick={() => handleShown(x)}>Show</button> 
      </div>)
    }
    else{
      setShown(country)
    }
  }
  return (
    <div>
      find countries <input value={newCountry} onChange={searchCountry}/>
      <Info country = {country} />
      {shown.map(country => <Country key={country.name.common} country={country}/>)}
    </div>
  )
}

export default App