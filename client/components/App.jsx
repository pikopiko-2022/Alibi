import React from 'react'
import Create from './Create'

function App() {
  //----- useSelector getting state
  // const fruits = useSelector((state) => state.fruits)

  const dispatch = useDispatch()

 // useEffect(() => {
 //   dispatch() //actions()
 // }, [])
  return (
    <>
      <div className="app">
        <h1>Fullstack Boilerplate - with Fruits!</h1>
        <Create />
      </div>
    </>
  )
}

export default App
