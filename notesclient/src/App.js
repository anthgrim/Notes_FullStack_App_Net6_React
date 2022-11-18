import './App.css'
import { useEffect, useState } from 'react'
import { Sidebar, NoteCard } from './components'

function App() {
  const [notes, setNotes] = useState([])
  const [noteListener, setNoteListener] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('https://localhost:7112/api/note', {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        })

        const data = await response.json()

        setNotes(data)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [noteListener])

  const notesList =
    notes.length > 0 ? (
      notes.map((note, index) => {
        return <NoteCard key={index} note={note} />
      })
    ) : (
      <></>
    )

  const triggerReload = () => setNoteListener((prev) => !prev)

  return (
    <div className='App'>
      <Sidebar trigger={triggerReload} />
      <div className='notes_container'>{notesList}</div>
    </div>
  )
}

export default App
