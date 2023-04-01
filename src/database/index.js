import notesIcon from '../assets/notesIcon.svg'
import archiveIcon from '../assets/archiveIcon.svg'
import editLabelsIcon from '../assets/editLabelsIcon.svg'
import binIcon from '../assets/binIcon.svg'
const defaultNavItems = [
    {
        id: Math.random()*10000000,
        route: '/keep/',
        name: 'Notes',
        icon: notesIcon,
        alt: 'notes-icon'
    },
    {
        id: Math.random()*10000000,
        route: '/keep/archive',
        name: 'Archive',
        icon: archiveIcon,
        alt: 'archive-icon'
    },
    {
        id: Math.random()*10000000,
        name: 'Edit labels',
        isModalLink: true,
        icon: editLabelsIcon,
        alt: 'edit-labels-icon'
    },
    {
        id: Math.random()*10000000,
        route: '/keep/bin',
        name:'Bin',
        icon: binIcon,
        alt: 'bin-icon'
    }
]
export const db = {
    notes: JSON.parse(localStorage.getItem('notes')) || [],
    labels: JSON.parse(localStorage.getItem('labels')) || [],
    navItems: JSON.parse(localStorage.getItem('nav-items')),
    setNavItems(navItems = this.navItems || defaultNavItems){
        localStorage.setItem('nav-items', JSON.stringify(navItems))
    },
    setLabels(labels = []){
        localStorage.setItem('labels', JSON.stringify(labels))
    },
    setNotes(notes){
        localStorage.setItem('notes', JSON.stringify(notes))
    },
    remove(){
        localStorage.removeItem('notes')
    }
}