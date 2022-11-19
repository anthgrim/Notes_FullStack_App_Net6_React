/* eslint-disable no-restricted-globals */
import './noteCard.css'
import { API_URL } from '../../utils/api'

const NoteCard = ({ note, trigger, getNote }) => {
  const handleDelete = async () => {
    try {
      const userResponse = confirm('Are you sure you want to delete this note?')
      if (userResponse) {
        const target = `${API_URL}note/${note.id}`

        await fetch(target, {
          method: 'delete',
          headers: {
            'content-type': 'application/json'
          }
        })

        trigger()
        return alert('Note has been deleted successfully')
      } else {
        return
      }
    } catch (error) {
      console.log(error)
      return alert('Something went wrong')
    }
  }

  const handleUpdate = async () => {
    try {
      const target = `${API_URL}note/${note.id}`

      const response = await fetch(target, {
        method: 'get',
        headers: {
          'content-type': 'application/json'
        }
      })

      const noteData = await response.json()
      getNote(noteData)
    } catch (error) {
      console.log(error)
      return alert('Something went wrong :(')
    }
  }

  return (
    <div className='note'>
      <h3 className='title'>{note.title}</h3>
      <p className='description'>{note.description}</p>
      <button className='button' onClick={handleDelete}>
        Delete Note
      </button>
      <span> </span>
      <button className='button' onClick={handleUpdate}>
        Update Note
      </button>
    </div>
  )
}

export default NoteCard
