export const togglePin = (allNotes, id) => {
    return allNotes.map(note => {
        if(note.id === id){
            if(note.isArchived){
                return {...note, isPinned: !note.isPinned, isArchived: !note.isArchived}
            }
            return {...note, isPinned: !note.isPinned}
        }
        return note
    })
}

export const toggleArchive = (allNotes, id) => {
    return allNotes.map(note => {
        if(note.id === id){
            if(note.isPinned){
                return {...note, isPinned: !note.isPinned, isArchived: !note.isArchived}
            }
            return {...note, isArchived: !note.isArchived}
        }
        return note
    })
}

export const editNote = (allNotes, id, newValues) => {
    return allNotes.map(note => note.id === id ? {...note, ...newValues} : note)
}

export const moveToBin = (allNotes, id) => {
    return allNotes.map(note => note.id === id ? {...note, movedToBin: true} : note)
}

export const removeFromBin = (allNotes, id) => {
    return allNotes.map(note => note.id === id ? {...note, movedToBin: false} : note)
}

export const deleteNote = (allNotes, id) => {
    return allNotes.filter(note => note.id !== id)
}

export const makeCopy = (allNotes, id) => {
    let noteIndex, copiedNote
    allNotes.forEach((note, index) => {
        if(note.id === id){
            noteIndex = index + 1
            copiedNote = {...note, id: Math.random()*100000000000}
            return
        }
    })
    allNotes.splice(noteIndex, 0, copiedNote)
    return allNotes
}

export const addLabel = (allNotes, id, label) => {
    return allNotes.map(note => {
        if(note.id === id){
            if(!note.labels.includes(label)) note.labels.push(label)
        }
        return note
    })
}

export const removeLabel = (allNotes, label, id) => {
    const remove = (note, label) => note.labels.filter(item => item !== label)
    return allNotes.map(note => {
        if(!id){
            if(note.labels.includes(label)){
                note.labels = remove(note, label)
            }
        } else{
            if(note.id === id){
                if(note.labels.includes(label)){
                    note.labels = remove(note, label)
                }
            }
        }
        return note
    })
}