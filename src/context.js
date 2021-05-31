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
    const [currentUsers, setCurrentUsers] = useState(users);

    // search
    const [query, setQuery] = useState('');
    const [searchBy, setSearchBy] = useState(localStorage.getItem('searchBy') || 'name');


    useEffect(() => {
        if (searchBy === 'all') {
            setCurrentUsers(users.filter(user =>
                user.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
                user.email.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
                user.website.toLowerCase().indexOf(query.toLowerCase()) > -1));
        } else {
            setCurrentUsers(users.filter(user => user[searchBy].toLowerCase().indexOf(query.toLowerCase()) > -1));
        }
    }, [searchBy, query, users])


    // sorting 
    const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || null)

    switch (sortBy) {
        case 'nameAsc':
            currentUsers.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            break;
        case 'nameDsc':
            currentUsers.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
            break;
        case 'emailAsc':
            currentUsers.sort((a, b) => (a.email > b.email) ? 1 : ((b.email > a.email) ? -1 : 0));
            break;
        case 'emailDsc':
            currentUsers.sort((a, b) => (a.email < b.email) ? 1 : ((b.email < a.email) ? -1 : 0));
            break;
        default:
            break;
    }

    // pagination
    const [currentPage, setCurrentPage] = useState(localStorage.getItem('pageNumber') || 1);
    const [usersPerPage, setUsersPerPage] = useState(localStorage.getItem('usersPerPage') || 'all');


    useEffect(() => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        if (usersPerPage === 'all') {
            setCurrentUsers(users);
        } else {
            setCurrentUsers(users.slice(indexOfFirstUser, indexOfLastUser));
        }
    }, [usersPerPage, currentPage, users])

    const paginate = (number) => setCurrentPage(number)

    // Edit post 
    const [editPost, setEditPost] = useState({})
    const editPostHandler = post => setEditPost(post)

    // single user posts
    const [userPosts, setUserPosts] = useState([]);

    const value = {
        users,
        currentUsers,
        query,
        setQuery,
        searchBy,
        setSearchBy,
        setSortBy,
        paginate,
        usersPerPage,
        setUsersPerPage,
        editPostHandler,
        editPost,
        userPosts,
        setUserPosts
    }
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}