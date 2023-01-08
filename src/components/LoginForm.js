import { useState } from "react";
import { Button } from "react-bootstrap"
import './NoteForm.css'

function NoteForm({ note = {}, onSubmit }) {
    const [text, setText] = useState(note.text);
    const [title, setTitle] = useState(note.title);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const resetForm = () => {
        setText('');
        setTitle('');
        setIsSubmitted(false);
    }

    const handleClick = () => {
        setIsSubmitted(true);

        const noteObj = {
            text,
            title,
            date: note.date ? note.date : new Date(),
            updatedAt: note.id ? new Date() : null,
            id: note.id || Math.random() + new Date()
        };

        if (text) {
            onSubmit(noteObj);
            resetForm();
        }
    }

    return (
        <div className="note-form-container">
            <form>
                <div>
                    <input type="text"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <textarea placeholder={'Note text...'} value={text} onChange={e => setText(e.target.value)} />
                    {(!text && isSubmitted) && <span>You must write text</span>}
                </div>
                <Button onClick={handleClick}>
                    {
                        note.id ?
                            'Update Note'
                            :
                            'Add Note'
                    }
                </Button>
            </form>
        </div>
    )
}

export default NoteForm;