import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import MenuModal from "../../components/extra/MenuModal.jsx";
import {useState} from "react";
import {FaUserGroup} from "react-icons/fa6";
import {HiClipboardDocumentList} from "react-icons/hi2";
import {BiSearchAlt} from "react-icons/bi";
import {ImExit} from "react-icons/im";
import {ToastContainer} from "react-toastify";

const menu = [
  {
    title: "Guruh",
    icon: <FaUserGroup/>,
  },
  {
    title: "Test",
    icon: <HiClipboardDocumentList/>,
  },
  {
    title: "Qidirish",
    icon: <BiSearchAlt/>,
  },
  {
    title: "Chiqish",
    icon: <ImExit/>,
  },
];
const Navbar = () => {
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const [modal, setModal] = useState(false);

  return (
    <div className="bg-[#F1FAEE] shadow-md dark:bg-[#0F172A] dark:text-white dark:shadow-blue-400">
      <div className="container mx-auto px-5 py-3.5 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="font-serif cursor-pointer font-bold text-xl tracking-widest"
        >
          MEZES
        </h1>
        <div>
          {auth.token ? (
            <div className="relative flex gap-2 items-center">
              <div onClick={() => setModal(true)} className="cursor-pointer">
                {auth.name}
              </div>
              <div
                onClick={() => setModal(true)}
                className="w-9 h-9 bg-center bg-cover bg-no-repeat rounded-full border-2 border-neutral-400 dark:border-blue-500 flex justify-center items-center font-medium dark:shadow-lg dark:shadow-blue-700/50 cursor-pointer"
                style={auth.image ? {backgroundImage: `url("${auth.image}")`} : {}}
              >
                {auth.image ? "" : auth.name[0].toLowerCase()}
              </div>
              {modal ? <MenuModal setModal={setModal} menu={menu}/> : ""}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white px-5 py-0.5 rounded-full text-sm tracking-wider font-medium dark:bg-blue-500 dark:text-white dark:shadow-lg dark:shadow-blue-500/50 dark:hover:bg-blue-600 dark:hover:shadow-blue-600/50"
            >
              Kirish
            </button>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        className="dark:hidden"
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        className="hidden dark:block"
      />
    </div>
  );
};

export default Navbar;
