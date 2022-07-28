const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      
      <Parts content = {props.content1} exercises ={props.exercises1}/>
      <Parts content = {props.content2} exercises ={props.exercises2}/>
      <Parts content = {props.content3} exercises ={props.exercises3}/>
    </div>
  )
}
const Parts = (props) => {
  return (
    <div>
      <p>{props.content} {props.exercises}</p>
    </div>
  )
}
const Total = (props) => {
  return (
    props.total
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name = {course.name} />
      <Content content1 = {course.parts[0].name} exercises1 = {course.parts[0].exercises} 
      content2 = {course.parts[1].name} exercises2 = {course.parts[1].exercises}
      content3 = {course.parts[2].name} exercises3 = {course.parts[2].exercises} />
     
      <p>Number of exercises <Total total = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/> </p>
    </div>
  )
}

export default App