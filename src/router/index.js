import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/keep/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/keep/archive',
        name: 'Archive',
        component: () => import('../views/Archive.vue')
    },
    {
        path: '/keep/bin',
        name: 'Bin',
        component: () => import('../views/Bin.vue')
    },
    {
        path: '/keep/labels/:label',
        name: 'Labels',
        component: () => import('../views/Label.vue')
    },
    {
        path: '/keep/edit_note/:id',
        name: 'Edit Note',
        component: () => import('../views/EditNote.vue')
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})