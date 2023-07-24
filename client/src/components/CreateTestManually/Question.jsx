import {useEffect, useRef} from "react";
import {changeInput} from "../../store/slices/createTest.js";
import {useDispatch, useSelector} from "react-redux";
import {handleTextareaHeight} from "../../utils/createTest.js";

const Question = () => {
  const dispatch = useDispatch()
  const data = useSelector((store) => store.createTest);
  const textareaRef = useRef(null);
  const questionChange = (e) => {
    handleTextareaHeight(textareaRef);
    dispatch(changeInput({index: data.testNum, key: "question", value: e.target.value}))
  }

  useEffect(() => {
    handleTextareaHeight(textareaRef);
  }, [data.testNum])

  return (
    <>
      <label className="createTestTitle cursor-pointer" htmlFor="savol">Savol</label>
      <textarea
        className="w-full outline-0 border border-neutral-300 rounded-md resize-none overflow-hidden px-2 py-1 dark:bg-blue-900/20 dark:border-blue-400 dark:shadow-lg dark:shadow-blue-600/50"
        name="question"
        id="savol"
        ref={textareaRef}
        value={data.data[data.testNum].question}
        onChange={questionChange}
        placeholder="I ... a student"
      />
    </>
  );
};

export default Question;