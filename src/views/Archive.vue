<script setup>
    import Note from '../components/Note.vue'
    import { useNotesStore } from '../store/notesStore'

    const store = useNotesStore()
</script>

<template>
    <div class="archive">
        <div class="notes">
            <Note
                v-for="note in store.archivedNotes"
                :key="note.id"
                :note="note"
            />
        </div>
    </div>
</template>

<style scoped lang="less">
    @import '../less/mixins.less';
    .archive{
        padding: 30px 30px 0 30px;
        .notes{
            #notes-style();
        }
    }
</style>