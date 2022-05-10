import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';


const NotePage = () => {

    const { id } = useParams();

    const [note, setNote] = useState(null)

    useEffect(() => {
        const getNote = async () => {
            if (id === 'new') return
            const response = await fetch(`/api/notes/${id}`)
            const data = await response.json()
            setNote(data)
        }
        getNote()
    }, [id])

    const createNote = async () => {
        fetch(`/api/notes/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': 'ISYaLDgfKbmOv4cYMS3vowhrKcwhhneBxuI78bU1XOv732RZTL96LacN7FQpZe9T',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    const updateNote = async () => {
        fetch(`/api/notes/${id}`, {
            method: 'PUT',
            headers: {
                'X-CSRFToken': 'ISYaLDgfKbmOv4cYMS3vowhrKcwhhneBxuI78bU1XOv732RZTL96LacN7FQpZe9T',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    const deleteNote = async () => {
        fetch(`/api/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': 'ISYaLDgfKbmOv4cYMS3vowhrKcwhhneBxuI78bU1XOv732RZTL96LacN7FQpZe9T',
                'Content-Type': 'application/json'
            },
        })
    }

    const handleSubmit = () => {
        if (id !== 'new' && note.body === '') {
            deleteNote()
        } else if (id !== 'new') {
            updateNote()
        } else if (id === 'new' && note.body !== null) {
            createNote()
        }
    }

return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to='/'>
                    <ArrowLeft onClick={handleSubmit} />
                </Link>
            </h3>
            {id !== 'new' 
            ?  
            <Link to='/'>
                <button onClick={deleteNote}>Delete</button>
            </Link>
            :
            <Link to='/'>
                <button onClick={handleSubmit}>Done</button>
            </Link>
        
            }

        </div>
        <textarea onChange={(e) => { setNote({ ...note, 'body': e.target.value }) }} value={note?.body}></textarea>
    </div>
)
}

export default NotePage