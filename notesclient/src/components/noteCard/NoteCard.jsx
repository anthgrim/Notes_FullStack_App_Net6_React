import './noteCard.css'

const NoteCard = ({ note }) => {
  return (
    <div className='note'>
      <h3 className='title'>{note.title}</h3>
      <p className='description'>{note.description}</p>
    </div>
  )
}

export default NoteCard
