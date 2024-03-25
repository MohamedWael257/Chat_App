import { useState } from 'react';
import Search from '../search/Search';
import CurrentStatus from '../currentstatus/CurrentStatus';
import AllStatus from '../allstatus/AllStatus';
function SideStatus({ status, selectedStatus, onStatusClick }) {
    const [searchKeyword, setSearchKeyword] = useState("");
    const sortedstatus = [...status].sort((a, b) => {
        return a.authorName.localeCompare(b.authorName);
    });

    const filteredstatus = sortedstatus.filter((status) =>
        status.authorName.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const handelStatusClick = (status) => {
        onStatusClick(status);
        setSearchKeyword("");
    };
    return (
        <div className='border-e h-full flex flex-col min-h-screen  dark:bg-stone-800 '>
            <CurrentStatus status={filteredstatus} />
            {/* <Search
                searchkeyword={searchKeyword}
                onSearchChange={(value) => setSearchKeyword(value)}
            /> */}
            <AllStatus
                status={filteredstatus}
                onStatusClick={handelStatusClick}
                selectedStatus={selectedStatus}
            />
        </div>
    );
}

export default SideStatus;