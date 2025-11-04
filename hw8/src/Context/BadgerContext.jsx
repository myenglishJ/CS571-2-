import { createContext } from "react";

export const BadgerContext  = createContext({
    prefs : {},
    setPrefs: () => {},
    tag: [],
    setTag: () => {},
    data: [],
    setData: () => {}
})