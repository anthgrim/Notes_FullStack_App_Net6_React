import './App.css'
import { useEffect, useState } from 'react'
import { Sidebar, NoteCard } from './components'
import { API_URL } from './utils/api'

function App() {
  const [notes, setNotes] = useState([])
  const [focusNote, setFocusNote] = useState(null)
  const [noteListener, setNoteListener] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${API_URL}note`, {
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

  const triggerReload = () => setNoteListener((prev) => !prev)

  const setNewFocus = (note) => setFocusNote(note)

  const notesList =
    notes.length > 0 ? (
      notes.map((note, index) => {
        return (
          <NoteCard
            key={index}
            note={note}
            trigger={triggerReload}
            getNote={setNewFocus}
          />
        )
      })
    ) : (
      <></>
    )

  return (
    <div className='App'>
      <Sidebar
        trigger={triggerReload}
        focusNote={focusNote}
        onUpdate={setNewFocus}
      />
      <div className='notes_container'>{notesList}</div>
    </div>
  )
}

export default App
