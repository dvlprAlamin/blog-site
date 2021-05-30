import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"

const MyContext = createContext()
export const useMyContext = () => {
    return useContext(MyContext);
}

export const ContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setUsers(res.data);
            })
    }, []);
    // sorting 
    const [sortBy, setSortBy] = useState(null)
    switch (sortBy) {
        case 'nameAsc':
            users.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            break;
        case 'nameDsc':
            users.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
            break;
        case 'emailAsc':
            users.sort((a, b) => (a.email > b.email) ? 1 : ((b.email > a.email) ? -1 : 0));
            break;
        case 'emailDsc':
            users.sort((a, b) => (a.email < b.email) ? 1 : ((b.email < a.email) ? -1 : 0));
            break;
        default:
            break;
    }
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState('all');

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    let currentUser = [];

    if (usersPerPage === 'all') {
        currentUser = users;
    } else {
        currentUser = users.slice(indexOfFirstUser, indexOfLastUser);
    }
    const paginate = (number) => setCurrentPage(number)

    // Edit post 
    const [editPost, setEditPost] = useState({})
    const editPostHandler = post => setEditPost(post)

    const value = {
        users,
        currentUser,
        setSortBy,
        paginate,
        usersPerPage,
        setUsersPerPage,
        editPostHandler,
        editPost,
    }
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}