<script setup>
    import { useNotesStore } from '../store/notesStore'
    import { useLabelStore } from '../store/labelStore'
    import archiveIt from '../assets/archiveIt.svg'
    import unarchiveIt from '../assets/unarchiveIt.svg'
    import menu from '../assets/menu.svg'
    import color from '../assets/color.svg'
    import binIcon from '../assets/binIcon.svg'
    import restore from '../assets/restore.svg'
    import cancel from '../assets/cancel.svg'
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'
    import DeleteModal from './DeleteModal.vue'
    
    defineProps(['note', 'page'])

    const notesStore = useNotesStore()
    const labelsStore = useLabelStore()
    const router = useRouter()
    const showMenu = ref(false)
    const isSelected = ref(false)
    const showDeleteModal = ref(false)
    const showColorPallette = ref(false)
    const colorPallete = ref([
        {
            id: Math.random()*100000000000,
            color: 'transparent',
            rgb: 'transparent'
        },
        {
            id: Math.random()*100000000000,
            color: 'red',
            rgb: 'rgba(255, 0, 0, 0.5)'
        },
        {
            id: Math.random()*100000000000,
            color: 'green',
            rgb: 'rgba(0, 255, 0, 0.5)'
        },
        {
            id: Math.random()*100000000000,
            color: 'blue',
            rgb: 'rgba(0, 0, 255, 0.5)'
        },
        {
            id: Math.random()*100000000000,
            color: 'purple',
            rgb: 'rgb(160, 32, 240, 0.5)'
        }
    ])
    const updateNote = (type, id) => {
        notesStore.updateNote({type, payload: {id}})
    }
    const navigate = (id) => {
        router.push('/keep/edit_note/'+id)
    }
    const toggleShowMenu = () => {
        if(showColorPallette.value) toggleColorPallette()
        showMenu.value = !showMenu.value
        isSelected.value = !isSelected.value
    }
    const handleMenuClick = (event, id) => {
        const text = event.target.textContent.trim()
        switch(text){
            case 'Delete':
                updateNote('move_to_bin', id)
                break
            case 'Make Copy':
                updateNote('make_copy', id)
                break
            case 'Add Label':
                event.target.parentElement.style.display = 'none'
                event.target.parentElement.nextElementSibling.style.display = 'block'
                break
            default:
                return
        }
    }
    const addLabel = (event, id) => {
        const label = event.target.textContent.trim()
        notesStore.updateNote({type: 'add_label', payload: {id, label}})
    }
    const removeLabel = (label, id) => {
        notesStore.updateNote({type: 'remove_label', payload: {id, label}})
    }
    const toggleDeleteModal = () => {
        showDeleteModal.value = !showDeleteModal.value
    }
    function toggleColorPallette(){
        if(showMenu.value) toggleShowMenu()
        showColorPallette.value = !showColorPallette.value
        isSelected.value = !isSelected.value
    }
    function editNote(clr, id){
        const payload = {
            id,
            newValues: {
                background: clr
            }
        }
        notesStore.updateNote({type: 'edit_note', payload})
    }
</script>
<template>
    <div :class="['note', {selected: isSelected}]" @click="() => navigate(note.id)">
        <div class="title">
            {{ note.title }}
        </div>
        <div class="content">
            {{ note.content }}
        </div>
        <div class="pin" @click.stop="() => updateNote('toggle_pin', note.id)" v-if="!page" title="Pin note">
            <svg :class="['icon', {pinned: note.isPinned}]" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none" stroke="none"/><path d="M9 4v6l-2 4v2h10v-2l-2 -4v-6"/><line x1="12" x2="12" y1="16" y2="21"/><line x1="8" x2="16" y1="4" y2="4"/></svg>
        </div>
        <div class="labels" v-if="note.labels.length">
            <div
                class="label"
                v-for="label in note.labels"
                :key="label"
            >
                {{ label }}
                <div class="cancel" @click.stop="() => removeLabel(label, note.id)">
                    <img :src="cancel" alt="cancel-icon">
                </div>
            </div>
        </div>
        <div class="options">
            <template v-if="page === 'bin'">
                <div class="delete" @click.stop="() => toggleDeleteModal()">
                    <img :src="binIcon" alt="delete=permanently" title="Delete Permanently">
                </div>
                <div class="restore" @click.stop="() => updateNote('remove_from_bin', note.id)">
                    <img :src="restore" alt="restore" title="Restore">
                </div>
            </template>
            <template v-else>
                <div class="archive" @click.stop="() => updateNote('toggle_archive', note.id)">
                    <img :src="archiveIt" alt="archive-it" v-if="!note.isArchived" title="Archive">
                    <img :src="unarchiveIt" alt="unarchive-it" v-else title="Unarchive">
                </div>
                <div class="colors" @click.stop="toggleColorPallette">
                    <img :src="color" alt="color-pallette-icon" title="Background Options">
                    <div class="color-pallette" v-if="showColorPallette">
                        <div 
                            :class="['color', {active: clr.rgb === note.background}]"
                            v-for="clr in colorPallete"
                            :key="clr.id"
                            :style="{backgroundColor: clr.rgb}"
                            :id="clr.color"
                            @click.stop="() => editNote(clr.rgb, note.id)"
                        ></div>
                    </div>
                </div>
                <div class="menu" @click.stop="toggleShowMenu">
                    <img :src="menu" alt="menu" title="More">
                    <div class="menu-tooltip" v-if="showMenu" @click.stop="event => handleMenuClick(event, note.id)">
                        <ul class="menu-list">
                            <li>Delete</li>
                            <li>Add Label</li>
                            <li>Make Copy</li>
                        </ul>
                        <ul class="label-list">
                            <li
                                v-for="label in labelsStore.labels"
                                :key="label.id"
                                @click="(e) => addLabel(e, note.id)"
                            >
                                {{ label.name }}
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
        </div>
    </div>
    <DeleteModal 
        @delete-note="() => updateNote('delete_note', note.id)"
        @toggle-delete-modal="toggleDeleteModal"
        v-if="showDeleteModal"
    />
</template>

<style scoped lang="less">
@import '../less/mixins.less';
.note{
    border: 1px solid #colors[border];
    border-radius: 6px;
    padding: 10px;
    color: #e8eaed;
    position: relative;
    min-height: 146.5px;
    background-color: v-bind('note.background');
    &:hover, &.selected{
        .pin{
            #center();
        }
        .options{
            #flex({
                justify-content: flex-end;
                align-items: center;
                gap: 8px;
            });
        }
    }
    .pin{
        display: none;
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        &:hover{
            background-color: #colors[hover_bg];
        }
        .icon{
            stroke: #colors[taskbar_color];
            &.pinned{
                fill: #colors[taskbar_color];
            }
        }
    }
    .title{
        font-size: 20px;
    }
    .content{
            margin-top: 15px;
    }
    .labels{
        #flex({
            align-items: center;
            gap: 5px;
            flex-wrap: wrap;
        });
        margin-top: 10px;
        .label{
            border: 1px solid #colors[border];
            border-radius: 50px;
            color: #colors[light];
            padding: 5px;
            font-size: 13px;
            position: relative;
            &:hover{
                .cancel{
                    #center();
                }
            }
            .cancel{
                position: absolute;
                right: 3px;
                height: 18px;
                width: 18px;
                top: 5px;
                background-color: rgb(154, 160, 166);
                border-radius: 50%;
                display: none;
                padding: 2px;
                cursor: pointer;
            }
        }
    }
    .options{
        display: none;
        margin-top: 30px;
        & > div{
            display: grid;
            place-items: center;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            &:hover{
                background-color: #colors[hover_bg];
            }
        }
        img{
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
        .colors{
            position: relative;
            .color-pallette{
                #flex({
                    align-items: center;
                    gap: 5px;
                });
                padding: 7px;
                border-radius: 6px;
                position: absolute;
                bottom: -50px;
                right: -30px;
                z-index: 1;
                background-color: #colors[dark];
                box-shadow: 5px 5px 20px #colors[overlay_dark];
                .color{
                    width: 25px;
                    height: 25px;
                    border: 3px solid #colors[border];
                    border-radius: 50%;
                    cursor: pointer;
                    position: relative;
                    &.active{
                        border-color: antiquewhite;
                        &::before{
                            content: '';
                            position: absolute;
                            top: 1px;
                            right: 1px;
                            width: 6px;
                            height: 6px;
                            border-radius: 50%;
                            background-color: antiquewhite;
                        }
                    }
                }
            }
        }
        .menu{
            position: relative;
            .menu-tooltip{
                width: 150px;
                height: 117px;
                border-radius: 6px;
                position: absolute;
                bottom: -120px;
                right: -30px;
                z-index: 1;
                background-color: #colors[dark];
                box-shadow: 5px 5px 20px #colors[overlay_dark];
                #scroll-styles();
                ul{
                    li{
                        list-style-type: none;
                        color: #colors[light];
                        padding: 10px 15px;
                        font-size: 14px;
                        cursor: pointer;
                        &:hover{
                            background-color: #colors[hover_bg];
                        }
                    }
                }
                .menu-list{
                    display: block;
                }
                .label-list{
                    display: none;
                }
            }
        }
    }
}
</style>