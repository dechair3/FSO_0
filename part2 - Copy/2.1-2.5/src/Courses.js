import React from 'react'


const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
  const sum = parts.reduce( (x,part) => x + part.exercises , 0)
  return  <p><b>Number of exercises {sum}</b></p>
}

const Part = ({ name, exercises }) => 
  <p>
    {name} {exercises}
  </p> 

const Content = ({ parts }) => 
    parts.map(part => <Part key = {part.id} name = {part.name} exercises = {part.exercises}/>) 



const Course = ({course}) => {
  return ( 
  <div>
    <Header name = {course.name} />
    <Content parts = {course.parts}/>
    <Total parts = {course.parts} />
  </div> 
  )
}

const Courses = ({courses}) => 
  courses.map(course => <Course key = {course.id} course={course}/>) 

  export default Courses
