import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {logOut} from "../../store/slices/authSlice.js";
import {useNavigate} from "react-router-dom";

const MenuModal = ({setModal, menu}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(logOut());
    navigate("/");
  }

  const handler = (title) => {
    // logout
    if (title === "Chiqish") {
      logOutHandler();
    }
  }

  return (
    <>
      <div onClick={() => setModal(false)}
           className="fixed w-screen h-screen top-0 left-0 z-50"></div>
      <div
        className="menuModal absolute bg-white border border-slate-400 top-full right-0 rounded-lg py-2 mt-2 dark:bg-[#16233f] z-50 dark:border-slate-500">
        {
          menu.map((item, index) => (
            <div
              onClick={() => handler(item.title)}
              key={index}
              className="px-8 tracking-wide text-[#94a1ff] py-1 hover:bg-slate-200 cursor-pointer dark:bg-[#16233f] dark:hover:dark:bg-slate-700 flex gap-2 items-center dark:text-[#5158A9]"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[#a3aefa] whitespace-nowrap ">{item.title}</span>
            </div>
          ))
        }
      </div>
    </>
  );
};

MenuModal.propTypes = {
  setModal: PropTypes.func,
  menu: PropTypes.array,
}

export default MenuModal;