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
    const [currentUsers, setCurrentUsers] = useState([]);

    // search
    const [query, setQuery] = useState('');
    const [searchBy, setSearchBy] = useState(localStorage.getItem('searchBy') || 'name');
    let currentUser = [];

    if (searchBy === 'all') {
        currentUser = users.filter(user =>
            user.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
            user.email.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
            user.website.toLowerCase().indexOf(query.toLowerCase()) > -1);
    } else {
        currentUser = users.filter(user => user[searchBy].toLowerCase().indexOf(query.toLowerCase()) > -1);
    }


    // switch (searchBy) {
    //     case 'byName':
    //         currentUser = users.filter(user => user.name.toLowerCase().indexOf(query.toLowerCase()) > -1)
    //         break;
    //     case 'byEmail':
    //         currentUser = users.filter(user => user.email.toLowerCase().indexOf(query.toLowerCase()) > -1)
    //         break;
    //     case 'byWebsite':
    //         currentUser = users.filter(user => user.website.toLowerCase().indexOf(query.toLowerCase()) > -1)
    //         break;
    //     case 'byAll':
    //         currentUser = users.filter(user =>
    //             user.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
    //             user.email.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
    //             user.website.toLowerCase().indexOf(query.toLowerCase()) > -1);
    //         break;

    //     default:
    //         break;
    // }
    // sorting 
    const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || null)
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
    const [usersPerPage, setUsersPerPage] = useState(localStorage.getItem('usersPerPage') || 'all');

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    // if (usersPerPage === 'all') {
    //     currentUser = users;
    // } else {
    //     currentUser = users.slice(indexOfFirstUser, indexOfLastUser);
    // }
    const paginate = (number) => setCurrentPage(number)



    // Edit post 
    const [editPost, setEditPost] = useState({})
    const editPostHandler = post => setEditPost(post)

    // single user posts
    const [userPosts, setUserPosts] = useState([]);

    const value = {
        users,
        currentUser,
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