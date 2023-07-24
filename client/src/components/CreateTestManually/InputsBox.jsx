import Variants from "./Variants.jsx";
import {AiOutlineClose} from "react-icons/ai";
import Question from "./Question.jsx";
import Select from "./Select.jsx";
import {useDispatch, useSelector} from "react-redux";
import {removeTest} from "../../store/slices/createTest.js";
import {useRef, useState} from "react";
import {changeIsDeleted} from "../../store/slices/pagination.js";

const InputsBox = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const data = useSelector((store) => store.createTest);
  const pagination = useSelector((store) => store.pagination);

  const [class1, setClass] = useState("");

  const deleteItemBox = () => {
    if (data.data.length === 1) {
      setClass("deleteItemBox")
      setTimeout(() => {
        dispatch(removeTest(data.testNum))
        setClass("")
      }, 300)
      return;
    }

    if (pagination.isTestDeleted) return;

    if (data.testNum > 0) {
      setClass("deleteItemBoxLeft")
    } else {
      setClass("deleteItemBoxRight")
    }

    dispatch(changeIsDeleted(true))
    setTimeout(() => {
      dispatch(removeTest(data.testNum))
    }, 300)
    setTimeout(() => {
      dispatch(changeIsDeleted(false))
      setClass("")
    }, 600)
  }

  // showItemBox
  // deleteItemBox
  return (
    <div
      ref={ref}
      className={`
       ${pagination.isTestCreated ? "showItemBox" : ""}  
       ${pagination.isCreatedFirstTest ? "createItem" : ""}
       ${class1} 
       ${pagination.nextTest ? "nextBtn" : ""} 
       ${pagination.prevTest ? "prevBtn" : ""} 
       w-11/12 xs:w-96 mx-auto border border-neutral-400 rounded-md px-4 py-2 dark:border-blue-400 dark:shadow-lg dark:shadow-blue-500/50 mb-5`}>
      <div className="flex justify-between mb-1">
        <div className="text-xl font-medium">{data.testNum + 1}</div>
        <AiOutlineClose onClick={deleteItemBox} className="text-2xl cursor-pointer"/>
      </div>
      <Question/>
      <Variants/>
      <Select/>
    </div>
  );
};

export default InputsBox;