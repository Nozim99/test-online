import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useSelector} from "react-redux";
import {BiSolidLock, BiSolidLockOpen} from "react-icons/bi";
import TestPasswordModal from "../Test/TestPasswordModal.jsx";

const SearchTestBox = ({data}) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState("");

  const testHandler = () => {
    const encoded = encodeURIComponent(data.name);
    navigate(`/test?name=${encoded}&isPrivate=${data.isPrivate}`);
  }

  return (
    <>
      <div
        onClick={testHandler}
        className="searchItemsBox relative dark:border-blue-500 dark:text-white dark:bg-inherit dark:shadow-blue-700/50 dark:hover:shadow-blue-600/50 hover:border-blue-600">
        <div className="searchItemsBoxImg"
             style={data.image ? {backgroundImage: `url(${data.image})`} : {}}>
          {data.image ? "" : data.name[0].toUpperCase()}
        </div>
        <div className="searchItemsBoxContent">
          <h2 className="font-medium tracking-wider whitespace-nowrap sm:text-lg">{data.name}</h2>
          <div
            className="text-sm xs:text-base text-neutral-600 whitespace-nowrap dark:text-white/70">yaratuvchisi: {data.createdBy.name}</div>
          <div className="text-sm xs:text-base text-neutral-600 dark:text-white/70">ishtirokchilar: {data.users}</div>
        </div>
        <div
          className="absolute w-10 h-10 rounded-full dark:bg-slate-300/20 bg-neutral-600/30 flex justify-center items-center right-6 text-2xl">
          {
            data.isPrivate ? <BiSolidLock className="text-red-500"/> :
              <BiSolidLockOpen className="dark:text-green-400 text-green-500"/>
          }
        </div>
      </div>
      {modal === data._id ? <TestPasswordModal setModal={setModal} testHandler={testHandler}/> : ""}
    </>
  );
};

export default SearchTestBox;