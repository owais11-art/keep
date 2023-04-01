<script setup>
    import { ref, onMounted } from 'vue'
    import { useNotesStore } from '../store/notesStore'

    const props = defineProps(['label'])

    const store = useNotesStore()
    const isCollapsed = ref(true)
    const noteTitle = ref('')
    const noteContent = ref('')
    const addNote = () => {
        const note = {
            id: Math.random()*100000000000,
            title: noteTitle.value,
            content: noteContent.value,
            isPinned: false,
            isArchived: false,
            movedToBin: false,
            labels: props.label ? [props.label] : [],
            background: 'transparent'
        }
        store.addNote(note)
        noteContent.value = ''
        noteTitle.value = ''
    }
    const updateCollapsed = (val=null) => {
        if(val === 'collapse') isCollapsed.value = false
        else if(val === 'expand') return
        else isCollapsed.value = true
        if(noteContent.value) addNote()
    }
    onMounted(() => document.addEventListener('click', updateCollapsed))
</script>

<template>
    <div class="collapsed-textbar" 
        v-if="isCollapsed"
        @click.stop="() => updateCollapsed('collapse')"
    >
        Take a note...
    </div>
    <div class="expanded-textbar" 
        v-else
        @click.stop="() => updateCollapsed('expand')"
    >
        <div class="title">
            <input type="text" placeholder="Title" v-model="noteTitle">
        </div>
        <div class="note">
            <textarea placeholder="Take a note..." v-model="noteContent"></textarea>
        </div>
    </div>
</template>

<style scoped lang="less">
    @import '../less/mixins.less';
    .collapsed-textbar, .expanded-textbar{
        width: 70%;
        margin: 0 auto;
        border-radius: 5px;
        color: #colors[taskbar_color];
        border: 1px solid #colors[taskbar_color];
        margin-bottom: 20px;
        @media(max-width: 900px){
            width: 100%;
        }
    }
    .collapsed-textbar{
        padding: 15px;
        cursor: pointer;
        font-weight: 700;
    }
    .expanded-textbar{
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
    }
</style>