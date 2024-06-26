function Search({ searchKeyword, onSearchChange }) {
    return (
        <div className="search border-b border-slate-200 dark:border-stone-700  dark:bg-stone-800 h-16 flex">
            <div className="flex items-center gap-2 px-4 text-sm py-2 m-2 rounded-lg bg-slate-100  dark:bg-stone-700  w-full">
                {/* <SearchIcon className="w-20 h-auto text-slate-500" /> */}
                <input
                    type="text"
                    className="bg-inherit w-full dark:text-white"
                    placeholder="Search user..."
                    onChange={(e) => onSearchChange(e.target.value)}
                    value={searchKeyword}
                />
            </div>
        </div>
    );
}

export default Search;