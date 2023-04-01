<script setup>
    import { ref } from 'vue';
    import check from '../assets/check.svg'
    import { useNavStore } from '../store/navStore'
    import { useLabelStore } from '../store/labelStore'
    import { useNotesStore } from '../store/notesStore'
    import labelIcon from '../assets/labelIcon.svg'
    import edit from '../assets/edit.svg'
    import binIcon from '../assets/binIcon.svg'

    const emit = defineEmits(['closeLabelModal'])

    const navStore = useNavStore()
    const labelStore = useLabelStore()
    const notesStore = useNotesStore()
    const closeModal = () => emit('closeLabelModal')
    const label = ref('')
    const editedLabelName = ref([])
    const addLabel = () => {
        if(!label.value) return
        const id = Math.random()*10000000
        navStore.addNav(label.value, id)
        labelStore.addLabel(label.value, id)
        label.value = ''
    }
    const handleMouseMovement = event => {
        const type = event.type
        const element = event.target
        if(type === 'mouseover'){
            element.src = binIcon
            element.alt = 'bin-icon'
        }else if(type === 'mouseleave'){
            element.src = labelIcon
            element.alt = 'label-icon'
        }
    }
    const deleteLabel = ({id, name}) => {
        labelStore.removeLabel(id)
        navStore.removeNav(id)
        notesStore.updateNote({type: 'remove_label', payload: {label: name}})
    }
    const previousElement = {}
    const handleEditLabel = (event, id) => {
        const element = event.target
        const currentInput = editedLabelName.value.find(input => input.id === id.toString())
        const labelName = currentInput.nextElementSibling
        const alt = element.alt
        if(Object.keys(previousElement).length && alt !== 'check-mark'){
            previousElement.element.src = edit
            previousElement.element.alt = 'edit-icon'
            previousElement.input.style.display = 'none'
            previousElement.labelName.style.display = 'block'
        }
        previousElement.element = element
        previousElement.input = currentInput
        previousElement.labelName = labelName
        if(alt === 'check-mark'){
            element.src = edit
            element.alt = 'edit-icon'
            currentInput.style.display = 'none'
            labelName.style.display = 'block'
            if(!currentInput.value) return
            labelStore.editLabel(currentInput.value, id)
            navStore.editNav(currentInput.value, id)
        }
        else{
            element.src = check
            element.alt = 'check-mark'
            currentInput.style.display = 'block'
            labelName.style.display = 'none'
        }
    }
</script>

<template>
    <div class="overlay" @click.self="closeModal">
        <div class="modal">
            <h3 class="title">Edit Labels</h3>
            <div class="add-label">
                <input type="text" placeholder="Create new Label" v-model="label">
                <img :src="check" alt="check-mark" @click="addLabel">
            </div>
            <div class="labels">
                <div class="label"
                    v-for="label in labelStore.labels"
                    :key="label.id"
                >
                    <div class="label-icon"
                        @click="() => deleteLabel(label)"
                    >
                        <img :src="labelIcon" alt="label-icon"
                            @mouseover="e => handleMouseMovement(e)"
                            @mouseleave="e => handleMouseMovement(e)"
                        >
                    </div>
                    <input type="text" :value="label.name" ref="editedLabelName" :id="label.id">
                    <div class="name">{{ label.name }}</div>
                    <div class="edit">
                        <img :src="edit" alt="edit-icon" @click="(e) => handleEditLabel(e, label.id)">
                    </div>
                </div>
            </div>
            <div class="done">
                <button @click="closeModal">Done</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    @import '../less/mixins.less';
    .overlay{
        #overlay();
        #center();
        .modal{
            background-color: #colors[modal_dark];
            width: 250px;
            padding: 8px;
            h3{
                font-weight: 700;
                color: #colors[light];
                margin-bottom: 20px;
            }
            .add-label{
                #flex({
                    justify-content: center;
                    align-items: center;
                    gap: 30px;
                });
                margin-bottom: 20px;
                img{
                    width: 26px;
                    height: 26px;
                    cursor: pointer;
                }
                input{
                    background-color: transparent;
                    border: none;
                    color: #colors[light];
                    &:focus{
                        border-bottom: 1px solid rgba(232, 234, 237, 0.5);
                        outline: none;
                    }
                    &::placeholder{
                        font-weight: 700;
                        color: #colors[light];
                    }
                }
            }
            .labels{
                margin-bottom: 20px;
                #flex({
                    gap: 10px;
                    flex-direction: column;
                });
                max-height: 300px;
                #scroll-styles();
                .label{
                    #flex({
                        align-items: center;
                        gap: 10px;
                    });
                    img{
                        height: 24px;
                        width: 24px;
                        vertical-align: middle;
                        cursor: pointer;
                    }
                    input{
                        display: none;
                        background-color: transparent;
                        border: none;
                        color: #colors[light];
                        &:focus{
                            border-bottom: 1px solid #colors[border];
                            outline: none;
                        }
                        &::placeholder{
                            font-weight: 700;
                            color: #colors[light];
                        }
                    }
                    .name{
                        display: block;
                        color: #colors[light];
                        font-weight: 700;
                    }
                    .edit{
                        #flex-item({
                            flex-grow: 1;
                        });
                        text-align: right;
                    }
                }
            }
            .done{
                text-align: right;
                border-top: 1px solid #colors[border];
                button{
                    background-color: transparent;
                    border: none;
                    color: #colors[light];
                    margin: 20px 10px;
                    cursor: pointer;
                }
            }
        }
    }
</style>