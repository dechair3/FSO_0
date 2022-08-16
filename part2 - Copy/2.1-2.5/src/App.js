import './Courses.js'


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
  courses.map(course => <Course course={course}/>) 

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return(
    <Courses courses = {courses} />
  )
  
}

export default App
