import React, { useEffect, useState } from 'react'
import AddButton from '../components/AddButton'
import ListItem from '../components/ListItem'

const NoteListPage = () => {

    const [notes, setNotes] = useState([])

    useEffect(() => {        
        const getNotes = async () => {
            const response = await fetch('/api/notes/')
            const data = await response.json()
            setNotes(data)
        }
        getNotes()
    }, [])

    return (
        <div className='notes'>
            <div className='notes-header'>
                <h2 className='notes-title'>&#9782; Notes</h2>
                <p className='notes-count'>{notes.length}</p>
            </div>
            <div className='notes-list'>
                {notes.map((note) => (
                    <ListItem key={note.id} note={note} />
                ))}
            </div>
            <AddButton />
        </div>
    )
}

export default NoteListPage