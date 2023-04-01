<script setup>
    const emit = defineEmits(['deleteNote', 'toggleDeleteModal'])

    const deleteNote = () => emit('deleteNote')
    const toggleModal = () => emit('toggleDeleteModal')
</script>

<template>
    <div class="overlay" @click.self="toggleModal">
        <div class="modal">
            <h5>Do you want to delete this note?</h5>
            <div class="buttons">
                <div class="cancel" @click="toggleModal">
                    <button>Cancel</button>
                </div>
                <div class="confirm" @click="deleteNote">
                    <button>Confirm</button>
                </div>
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
            width: 300px;
            background-color: #colors[modal_dark];
            padding: 15px;
            h5{
                color: #colors[light];
                font-size: 17px;
            }
            .buttons{
                #flex({
                    justify-content: space-between;
                    align-items: center
                });
                margin-top: 40px;
                button{
                    border: none;
                    border-radius: 6px;
                    color: #colors[light];
                    padding: 10px 15px;
                    cursor: pointer;
                }
                .confirm button{
                    background-color: rgb(86, 222, 86);
                }
                .cancel button{
                    background-color: rgb(223, 103, 59);
                }
            }
        }
    }
</style>