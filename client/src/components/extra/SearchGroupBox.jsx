const SearchGroupBox = () => {
  return (
    <div
      className="searchItemsBox bg-blue-100 border-blue-500 dark:bg-inherit dark:text-white dark:shadow-blue-500/50 dark:hover:shadow-blue-600/50 hover:border-blue-600">
      <div className="searchItemsBoxImg"
           style={{backgroundImage: "url(pexels-max-fischer-5212317.jpg)"}}>
      </div>
      <div className="searchItemsBoxContent">
        <h2 className="font-medium tracking-wider whitespace-nowrap">1-group</h2>
        <div className="text-sm text-neutral-600 whitespace-nowrap dark:text-white/70">yaratuvchisi: mezes</div>
        <div className="text-sm text-neutral-600 dark:text-white/70">a&apos;zo: 10</div>
      </div>
    </div>
  );
};

export default SearchGroupBox;