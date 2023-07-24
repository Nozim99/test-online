import {useDispatch, useSelector} from "react-redux";
import {changeInput} from "../../store/slices/createTest.js";

const symbols = ["A", "B", "C", "D"];
const Select = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.createTest);

  const changeValue = (e) => {
    dispatch(changeInput({index: data.testNum, key: "answer", value: e.target.value}))
  }

  return (
    <div className="flex justify-center my-5 items-center gap-2">
      <label
        className="font-medium tracking-wide cursor-pointer"
        htmlFor="correctAnswer"
      >Javob:</label>
      <select
        onChange={changeValue}
        value={data.data[data.testNum].answer}
        className="border border-neutral-400 cursor-pointer rounded px-2 py-0.5 font-medium dark:bg-blue-900/20 dark:border-blue-400 dark:shadow-md dark:shadow-blue-600/50 dark:outline-0"
        name="correctAnswer"
        id="correctAnswer"
      >
        <option value="" className="font-medium cursor-pointer dark:bg-[#0F172A] dark:valid:bg-black"></option>
        {
          symbols.map((item, index) => (
            <option
              className="font-medium cursor-pointer dark:bg-[#0F172A] dark:valid:bg-black"
              value={item}
              key={index}
            >{item}</option>
          ))
        }
      </select>
    </div>
  );
};

export default Select;