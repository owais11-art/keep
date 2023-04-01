import { defineStore } from "pinia"
import { ref } from "vue"
import labelIcon from '../assets/labelIcon.svg'
import { db } from "../database"

export const useNavStore = defineStore('nav-store', () => {

    // State👇🏻
    const navItems = ref(db.navItems)

    //Actions👇🏻

    const addNav = (label, id) => {
        const navs = navItems.value
        if(navs.some(nav => nav.name.toLowerCase() === label.toLowerCase())) return
        const nav = {
            id,
            route: `/keep/labels/${label}`,
            name: label,
            icon: labelIcon,
            alt: 'label-icon'
        }
        navs.splice(2, 0, nav)
        navItems.value = navs
        db.setNavItems(navItems.value)
    }

    const removeNav = id => {
        navItems.value = navItems.value.filter(navItem => navItem.id !== id)
        db.setNavItems(navItems.value)
    }

    const editNav = (value, id) => {
        navItems.value = navItems.value.map(navItem => navItem.id === id ? {...navItem, name: value} : navItem)
        db.setNavItems(navItems.value)
    }

    return {
        navItems,
        addNav,
        removeNav,
        editNav
    }
})