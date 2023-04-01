import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { db } from "../database"
import { addLabel, deleteNote, editNote, makeCopy, moveToBin, removeFromBin, removeLabel, toggleArchive, togglePin } from "../helpers"

export const useNotesStore = defineStore('notes-store', () => {

    // States👇🏻
    const allNotes = ref(db.notes)
    const labeledNotesArray = ref([])

    // Getters👇🏻
    const notes = computed(() => allNotes.value.filter(note => !note.isPinned && !note.isArchived && !note.movedToBin))
    const pinnedNotes = computed(() => allNotes.value.filter(note => note.isPinned && !note.isArchived && !note.movedToBin))
    const archivedNotes = computed(() => allNotes.value.filter(note => note.isArchived && !note.movedToBin))
    const deletedNotes = computed(() => allNotes.value.filter(note => note.movedToBin))
    const labeledNotes = computed({
        get(){
            return labeledNotesArray.value
        },
        set(label){
            labeledNotesArray.value = allNotes.value.filter(note => note.labels.includes(label)) 
        }
    })

    // Actions👇🏻
    const addNote = note => {
        allNotes.value = [...allNotes.value, note]
        db.setNotes(allNotes.value)
    }
    const getNote = id => {
        return allNotes.value.find(note => note.id === parseFloat(id))
    }
    const updateNote = (action) => {
        switch(action.type){
            case 'toggle_pin':
                allNotes.value = togglePin(allNotes.value, action.payload.id)
                break
            case 'toggle_archive':
                allNotes.value = toggleArchive(allNotes.value, action.payload.id)
                break
            case 'edit_note':
                allNotes.value = editNote(allNotes.value, action.payload.id, action.payload.newValues)
                break
            case 'move_to_bin':
                allNotes.value = moveToBin(allNotes.value, action.payload.id)
                break
            case 'remove_from_bin':
                allNotes.value = removeFromBin(allNotes.value, action.payload.id)
                break
            case 'delete_note':
                allNotes.value = deleteNote(allNotes.value, action.payload.id)
                break
            case 'make_copy':
                allNotes.value = makeCopy(allNotes.value, action.payload.id)
                break
            case 'add_label':
                allNotes.value = addLabel(allNotes.value, action.payload.id, action.payload.label)
                break
            case 'remove_label':
                allNotes.value = removeLabel(allNotes.value, action.payload.label, action.payload?.id)
                break
            default:
                return
        }
        db.setNotes(allNotes.value)
    }

    return {
        notes,
        allNotes,
        pinnedNotes,
        archivedNotes,
        deletedNotes,
        labeledNotes,
        addNote,
        updateNote,
        getNote
    }
})