import { useState } from 'react';
import CurrentUser from '../currentuser/CurrentUser';
import Search from '../search/Search';
import Users from '../users/Users';
function Sidebar({ users, selectedUser, onUserClick }) {
    const [searchKeyword, setSearchKeyword] = useState("");

    const sortedUsers = [...users].sort((a, b) => {
        return a.displayName.localeCompare(b.displayName);
    });

    const filteredUsers = sortedUsers.filter((user) =>
        user.displayName.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const handleUserClick = (user) => {
        onUserClick(user);
        setSearchKeyword("");
    };
    return (
        <div className='border-e h-full flex flex-col min-h-screen  dark:bg-stone-800 '>
            <CurrentUser />
            <Search
                searchkeyword={searchKeyword}
                onSearchChange={(value) => setSearchKeyword(value)}
            />
            <Users
                users={filteredUsers}
                onUserClick={handleUserClick}
                selectedUser={selectedUser}
            />
        </div>
    );
}

export default Sidebar;