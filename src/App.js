import React from 'react'
import DayCard from './components/DayCard'
import './App.css'

class App extends React.Component {

    render() {
        return (
            <div className="App d-flex flex-column vh-100">
                <DayCard />
            </div>
        )
    }
}

export default App