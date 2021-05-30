import { createContext, useContext } from "react"

const MyContext = createContext()
export const useMyContext = () => {
    return useContext(MyContext);
}

export const ContextProvider = ({ children }) => {
    const viewDetailsHandler = post => {

    }
    const value = {

    }
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}