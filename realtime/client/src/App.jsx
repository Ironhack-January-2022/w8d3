import { useState, useEffect } from 'react'
import './App.css'
import socketIOClient from 'socket.io-client'

const socket = socketIOClient('http://localhost:5005')

function App() {

  const [text, setText] = useState('');

  useEffect(() => {
    // this listens to incoming messages from the server
    socket.on('message', payload => {
      // we show the data that we get from the server in the input field
      setText(payload.message)
    })
  }, [])

  const onChange = e => {
    setText(e.target.value)
    // emit a message to the server
    socket.emit('new-message', {
      message: e.target.value
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={text} onChange={onChange} />
      </header>
    </div>
  )
}

export default App
