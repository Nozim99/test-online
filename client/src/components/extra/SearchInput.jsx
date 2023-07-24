import {FiSearch} from "react-icons/fi";
import {BiSolidSend} from "react-icons/bi";
import {useState} from "react";

const SearchInput = ({testByName}) => {
  const [name, setName] = useState("");

  const searchHandler = (e) => {
    testByName(name)
  }

  return (
    <>
      <div className="w-10/12 2xs:w-80 xs:w-96 sm:w-100 mx-auto relative">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") searchHandler();
          }}
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text" placeholder="Qidirish"
          className="w-full border-b h-full border-neutral-400 bg-inherit px-6 outline-0 dark:text-white dark:border-white/60 py-1"/>
        <FiSearch className="absolute top-1/2 left-1 -translate-y-1/2 text-neutral-500 dark:text-neutral-300"/>
        <BiSolidSend onClick={searchHandler}
                     className="absolute top-1/2 right-1 -translate-y-1/2 text-blue-500 dark:text-blue-500 cursor-pointer"/>
      </div>
    </>
  );
};

export default SearchInput;