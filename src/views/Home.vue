<script setup>
    import Taskbar from '../components/Taskbar.vue'
    import Note from '../components/Note.vue'
    import { useNotesStore } from '../store/notesStore'

    const store = useNotesStore()
</script>
<template>
    <div class="home">
        <Taskbar/>
        <h5 v-if="store.pinnedNotes.length">Pinned</h5>
        <div class="pinned-notes">
            <Note
                v-for="note in store.pinnedNotes"
                :key="note.id"
                :note="note"
            />
        </div>
        <h5 v-if="store.pinnedNotes.length && store.notes.length">Others</h5>
        <div class="notes">
            <Note
                v-for="note in store.notes"
                :key="note.id"
                :note="note"
            />
        </div>
    </div>
</template>

<style scoped lang="less">
    @import '../less/mixins.less';
    .home{
        padding: 30px 30px 0 30px;
        .notes, .pinned-notes{
            #notes-style();
        }
        h5{
            color: #colors[border];
            font-weight: 700;
            text-transform: uppercase;
        }
    }
</style>