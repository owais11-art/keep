<script setup>
    import { ref } from 'vue'
    import {useRoute, useRouter} from 'vue-router'
    import { useNotesStore } from '../store/notesStore'

    const route = useRoute()
    const router = useRouter()
    const store = useNotesStore()
    const note = store.getNote(route.params.id)
    const noteTitle = ref(note.title)
    const noteContent = ref(note.content)

    const navigateToPreviousPage = () => router.go(-1)
    const editNote = () =>{
        const payload = {
            id: note.id,
            newValues: {
                title: noteTitle,
                content: noteContent
            }
        }
        store.updateNote({type: 'edit_note', payload})
        navigateToPreviousPage()
    }
</script>
<template>
    <div class="overlay" @click.self="navigateToPreviousPage">
        <div class="edit-note">
            <div class="title">
                <input type="text" placeholder="Title" v-model="noteTitle">
            </div>
            <div class="note">
                <textarea placeholder="Take a note..." v-model="noteContent"></textarea>
            </div>
            <div class="save">
                <button @click="editNote">Save</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    @import '../less/mixins.less';
    .overlay{
        #overlay();
        #center();
        .edit-note{
            width: 50%;
            border-radius: 5px;
            color: #colors[taskbar_color];
            border: 1px solid #colors[taskbar_color];
            input, textarea{
                width: 100%;
                border: none;
                outline: none;
                background-color: transparent;
                padding: 10px;
                color: #colors[taskbar_color];
                &::placeholder{
                    color: #colors[taskbar_color];
                    font-weight: 700;
                    font-family: 'Open Sans', sans-serif;
                }
            }
            input{
                font-size: 25px;
            }
            textarea{
                resize: none;
            }
            .save{
                text-align: right;
                margin-top: 30px;
                padding: 8px;
                button{
                    border: 1px solid #colors[taskbar_color];
                    border-radius: 5px;
                    background-color: transparent;
                    font-weight: 700;
                    color: #colors[light];
                    &:hover{
                        background-color: #colors[light];
                        color: #colors[dark];
                    }
                    padding: 10px 25px;
                    cursor: pointer;
                }
            }
        }
    }
</style>