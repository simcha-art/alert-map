import { create } from "zustand";
import type { Alert } from "../types";

interface AlertsStore {
    alertsList: Alert[]
    listToShow: Alert[]
    showAll: () => void
    searchByName: (name: string) => void
    filterByPriority: (priority: string) => void
    filterByArena: (arena: string) => void
    initList: (list: Alert[]) => void
    addAlert: (alert: Alert) => void
    removeAlert: (id: string) => void
    updateAlert: (id: string, data: object) => void
    show: () => Alert[]
}

export const useAlertsStore = create<AlertsStore>((set, get) => ({
    alertsList: [],
    listToShow: [],
    initList: (list: Alert[]) => set(() => ({alertsList: list})),
    show: () => get().listToShow,
    showAll: () => set(state => ({listToShow: state.alertsList})),
    filterByArena: (arena) => set(state => ({listToShow: [...state.alertsList.filter(alert => alert.arena === arena)]})),
    filterByPriority: (priority) => set(state => ({listToShow: [...state.alertsList.filter(alert => alert.priority === priority)]})),
    searchByName: (name) => set(state => {
        const alert = state.alertsList.find(alert => alert.displayName === name)
        if (!alert) return {listToShow: []}
        return {listToShow: [alert]}
    }),
    addAlert: (alert: Alert) => set(state => ({alertsList: [...state.alertsList, alert]})),
    removeAlert: (id: string) => set(state => ({alertsList: [...state.alertsList.filter(alert => alert.id !== id)]})),
    updateAlert: (id: string, data: object) => set(state => ({alertsList: [...state.alertsList.map(alert => {
        if (alert.id !== id) {
            return alert
        }
        return {...alert, ...data}
    })]}))
}))