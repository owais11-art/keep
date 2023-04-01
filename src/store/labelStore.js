import { defineStore } from "pinia"
import { ref } from "vue"
import { db } from "../database"

export const useLabelStore = defineStore('label-store', () => {
    // State👇🏻

    const labels = ref(db.labels)

    // Actions👇🏻

    const addLabel = (label, id) => {
        if(labels.value.some(item => item.name.toLowerCase() === label.toLowerCase())) return
        const labelObj = {
            id,
            name: label
        }
        labels.value = [...labels.value, labelObj]
        db.setLabels(labels.value)
    }

    const removeLabel = (id) => {
        labels.value = labels.value.filter(label => label.id !== id)
        db.setLabels(labels.value)
    }

    const editLabel = (value, id) => {
        labels.value = labels.value.map(label => label.id === id ? {...label, name: value} : label)
        db.setLabels(labels.value)
    }

    return {
        labels,
        addLabel,
        removeLabel,
        editLabel
    }
})