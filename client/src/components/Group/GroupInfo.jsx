import {CiMenuKebab} from "react-icons/ci";
import {useState} from "react";
import MenuModal from "../extra/MenuModal.jsx";
import {FaUserGroup} from "react-icons/fa6";
import {HiClipboardDocumentList, HiDocumentPlus} from "react-icons/hi2";
import {BiSolidEditAlt} from "react-icons/bi";
import {MdDelete} from "react-icons/md";

const menu = [
  {
    title: "Test qo'shish",
    icon: <HiDocumentPlus/>
  },
  {
    title: "Tahrirlash",
    icon: <BiSolidEditAlt/>
  },
  {
    title: "O'chirish",
    icon: <MdDelete/>
  },
]
const GroupInfo = () => {
  const [modal, setModal] = useState(false);

  return (
    <div
      className="relative border-b-2 border-neutral-400 dark:border-blue-500 dark:shadow-lg dark:shadow-blue-800/50 client00/50">
      <div className="absolute h-full w-3 bg-[#0F172A] right-full hidden dark:block"></div>
      <div className="absolute h-full w-3 bg-[#0F172A] left-full hidden dark:block"></div>
      <div className=" flex justify-between items-center pb-3">
        <div className="flex flex-row items-center gap-4 w-11/12">
          <div
            className="w-16 h-16 rounded-full bg-neutral-200 bg-no-repeat bg-center bg-cover border border-neutral-400 dark:border-blue-500"
            style={{backgroundImage: `url(https://apicms.thestar.com.my/uploads/images/2022/05/15/1585587.jpg)`}}></div>
          <div className="w-10/12 overflow-hidden">
            <div className="whitespace-nowrap font-medium">1-group</div>
            <div className="whitespace-nowrap">yaratuvchi: mezes</div>
            <div>a&apos;zo: 10</div>
          </div>
        </div>
        <div className="relative">
          <CiMenuKebab className="text-xl cursor-pointer" onClick={() => setModal(true)}/>
          {modal ? <MenuModal setModal={setModal} menu={menu}/> : ""}
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;