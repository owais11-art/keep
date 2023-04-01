<script setup>
    import { watchEffect } from 'vue';
    import { useRoute } from 'vue-router'
    import { useNotesStore } from '../store/notesStore'
    import Note from '../components/Note.vue'
    import Taskbar from '../components/Taskbar.vue'

    const route = useRoute()
    const notesStore = useNotesStore()
    watchEffect(() => {
        notesStore.labeledNotes = route.params.label
    })
</script>
<template>
    <div class="labeled-notes">
        <Taskbar :label="route.params.label"/>
        <div class="notes">
            <Note
                v-for="note in notesStore.labeledNotes"
                :key="note.id"
                :note="note"
            />
        </div>
    </div>
</template>

<style scoped lang="less">
    @import '../less/mixins.less';
    .labeled-notes{
        padding: 30px 30px 0 30px;
        .notes{
            #notes-style();
        }
    }
</style>