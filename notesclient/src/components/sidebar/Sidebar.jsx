import './sidebar.css'
import { useState } from 'react'

const Sidebar = ({ trigger }) => {
  const [formData, setFormData] = useState({
    title: {
      value: '',
      error: ''
    },
    description: {
      value: '',
      error: ''
    },
    isVisible: {
      value: true
    }
  })

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: { value: value, error: '' } }))
  }

  // Handle checkbox change
  const handleChekboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: { value: checked } }))
  }

  const handleSubmit = async () => {
    let errors = false

    // Validate data
    const { title, description } = formData

    if (title.value.trim() === '') {
      errors = true
      setFormData((prev) => ({
        ...prev,
        title: { value: title.value, error: 'Title is required' }
      }))
    }

    if (description.value.trim() === '') {
      errors = true
      setFormData((prev) => ({
        ...prev,
        description: { value: title.value, error: 'Description is required' }
      }))
    }

    if (errors) return

    try {
      const payload = {
        title: title.value,
        description: description.value,
        isVisible: formData.isVisible.value
      }
      const response = await fetch('https://localhost:7112/api/note', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'content-type': 'application/json'
        }
      })

      const data = await response.json()
      trigger()
      setFormData({
        title: {
          value: '',
          error: ''
        },
        description: {
          value: '',
          error: ''
        },
        isVisible: {
          value: true
        }
      })
      console.log(data)
    } catch (error) {
      console.log(error)
      return alert('Something went wrong :(')
    }
  }

  return (
    <div className='sidebar'>
      <div className='row'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          name='title'
          placeholder='Note Title...'
          value={formData.title.value}
          onChange={(e) => handleInputChange(e)}
        />
        <span className='error'>{formData.title.error}</span>
      </div>
      <div className='row'>
        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          id='description'
          placeholder='Note Description...'
          cols='30'
          rows='10'
          value={formData.description.value}
          onChange={(e) => handleInputChange(e)}
        />
        <span className='error'>{formData.description.error}</span>
      </div>
      <div className='row checkbox'>
        <label htmlFor='isVisible'>Is Visible?</label>
        <div>
          <input
            type='checkbox'
            name='isVisible'
            id='isVisible'
            checked={formData.isVisible.value}
            onChange={(e) => handleChekboxChange(e)}
          />
        </div>
      </div>

      <div className='row'>
        <button className='button' onClick={handleSubmit}>
          Add Note
        </button>
      </div>
    </div>
  )
}

export default Sidebar
