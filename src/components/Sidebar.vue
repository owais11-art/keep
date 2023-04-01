<script setup>
    import { useNavStore } from '../store/navStore'
    import { useRoute, useRouter } from 'vue-router'

    defineProps(['navCollapsed'])
    const emit = defineEmits(['openLabelModal'])

    const store = useNavStore()
    const route = useRoute()
    const router = useRouter()
    const openModal = () => {
        emit('openLabelModal')
    }
    const navigate = (path=null) => {
        if(path) router.push(path)
        else openModal()
    }
</script>

<template>
    <div class="nav-items">
        <div
            v-for="navItem in store.navItems"
            :key="navItem.id"
            :class="['nav-item', {active: route.path === navItem.route, collapsed: navCollapsed}]"
            @click="() => navigate(navItem.route)"
        >
            <div class="icon">
                <img :src="navItem.icon" :alt="navItem.alt" :title="navItem.name">
            </div>
            <div class="link">
                <div v-if="!navItem.isModalLink">{{ navItem.name }}</div>
                <div v-else>{{ navItem.name }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
    @import '../less/mixins.less';
    #collapsed(){
        width: 48px;
        height: 48PX;
        border-radius: 50%;
        margin-left: 20px;
        justify-content: center;
        .link{
            display: none;
        }
    }
    .nav-items{
        #flex({
            gap: 10px;
            flex-direction: column;
        });
        .nav-item{
            #flex({
                align-items: center;
                gap: 38px;
            });
            padding: 10px 20px;
            cursor: pointer;
            width: 100%;
            transition: all 0.1s;
            overflow: hidden;
            border-radius: 0 50px 50px 0;
            @media(max-width: 900px){
                #collapsed();
            }
            &.active{
                background-color: #colors[nav_active];
            }
            &:hover{
                background-color: #colors[hover_bg];
            }
            &.collapsed{
                #collapsed();
            }
            .icon{
                img{
                    vertical-align: middle;
                    width: 24px;
                    height: 24px;

                }
            }
            .link{
                & > *{
                    color: #colors[light];
                    text-decoration: none;
                    font-weight: 700;
                    cursor: pointer;
                    font-size: 14px;
                }
            }
        }
    }
</style>