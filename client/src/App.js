import React from 'react'
import Rooms from "./components/Rooms"
import CreateRoom from "./components/CreateRoom"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  const routers =[
    {
      path : '/',
      component : Rooms,
    },
    {
      path : '/new',
      component : CreateRoom
    }
  ]
  return (
    <Router>
      <div className="App">
        <Routes>
          {
            routers.length && routers.map((item, index) => {
              const Page = item.component
              return <Route
                key={index}
                path={item.path}
                exact
                element={ <Page />}            
                />
            })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
