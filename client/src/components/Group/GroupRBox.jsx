import {CiMenuKebab} from "react-icons/ci";
import PropTypes from "prop-types";
import {BsFillPeopleFill} from "react-icons/bs";
import {BiSolidUser} from "react-icons/bi";
import {MdDelete, MdOutlineQueryStats} from "react-icons/md";
import {useState} from "react";
import MenuModal from "../extra/MenuModal.jsx";

const menu = [
  {
    title: "Statistika",
    icon: <MdOutlineQueryStats/>
  },
  {
    title: "O'chirish",
    icon: <MdDelete/>
  },
]
const GroupRBox = ({test}) => {
  const [modal, setModal] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  const openModal = (index) => {
    setModal(true);
    setModalIndex(index)
  }

  return (
    <div className="flex flex-col gap-5">
      {
        test.map((item, index) => (
          <div key={index} className="relative flex justify-between items-center border border-neutral-500 rounded-md px-3 pt-2 pb-4
          dark:border-blue-500 dark:shadow-md dark:shadow-blue-600/50">
            <div className="flex items-center gap-2 overflow-hidden">
              <div
                className="w-12 h-12 xs:h-16 xs:w-16 rounded-full border border-neutral-500 dark:border-blue-500 cursor-pointer bg-no-repeat bg-center bg-cover"></div>
              <div className="overflow-hidden w-9/12 text-sm sm:text-base">
                <div className="font-medium h-10 sm:h-11 sm:mb-0.5 overflow-hidden cursor-pointer">1-test Lorem ipsum
                  dolor sit amet,
                  consectetur
                  adipisicing elit. Ad
                  aspernatur debitis deleniti excepturi repellat. Assumenda consequuntur delectus dolorum, ex expedita
                  explicabo facere, hic, inventore quisquam quo repellendus tempora ut veritatis.
                </div>
                <div className="flex gap-2">
                  <div className="cursor-pointer text-neutral-500 dark:text-slate-400 text-sm flex gap-1 items-center">
                    <BsFillPeopleFill/> 10
                  </div>
                  <div
                    className="cursor-pointer text-neutral-500 dark:text-slate-400 text-sm flex gap-1 items-center w-10/12 whitespace-nowrap">
                    <BiSolidUser className="overflow-visible"/> mezes
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <CiMenuKebab className="text-xl cursor-pointer" onClick={() => openModal(index)}/>
              {
                modal && modalIndex === index ? <MenuModal menu={menu} setModal={setModal}/> : ""
              }
            </div>
            <div className="absolute bottom-0 right-3 text-sm text-neutral-500 dark:text-slate-400">12-dec 2022</div>
          </div>
        ))
      }
    </div>
  );
};

GroupRBox.propTypes = {
  test: PropTypes.array.isRequired,
}

export default GroupRBox;