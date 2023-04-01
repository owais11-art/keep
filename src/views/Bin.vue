<script setup>
    import Note from '../components/Note.vue'
    import { useNotesStore } from '../store/notesStore'

    const store = useNotesStore()
</script>

<template>
    <div class="bin">
        <div class="notes">
            <Note
                v-for="note in store.deletedNotes"
                :key="note.id"
                :note="note"
                page="bin"
            />
        </div>
    </div>
</template>

<style scoped lang="less">
    @import '../less/mixins.less';
    .bin{
        padding: 30px 30px 0 30px;
        .notes{
            #notes-style();
        }
    }
</style>