import {useDispatch, useSelector} from "react-redux";
import {changeTestNum} from "../../store/slices/createTest.js";
import {isTestFull} from "../../utils/createTest.js";
import {changeNextTest, changePrevTest} from "../../store/slices/pagination.js";

const TestNumOrders = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.createTest);
  const pagination = useSelector((store) => store.pagination);

  const changeIdx = (index) => {
    if (index === data.testNum) return;
    if (pagination.nextTest || pagination.prevTest) return;

    const isNext = index > data.testNum;
    isNext ? dispatch(changeNextTest(true)) : dispatch(changePrevTest(true));

    setTimeout(() => {
      dispatch(changeTestNum(index))
      setTimeout(() => {
        isNext ? dispatch(changeNextTest(false)) : dispatch(changePrevTest(false));
      }, 300)
    }, 300)
  }

  return (
    <>
      <div className="w-11/12 xs:w-96 bg-neutral-400 dark:bg-blue-500 rounded-full h-1 mx-auto mt-20"></div>
      <div className="w-11/12 xs:w-96 mx-auto grid grid-cols-6 py-10 gap-4">
        {
          data.data.map((item, index) => (
            <div key={index}
                 onClick={() => changeIdx(index)}
                 className={`w-9 h-9 rounded-full cursor-pointer flex justify-center items-center font-medium dark:shadow-md 
                 ${index === data.testNum ? "border-4 dark:shadow-blue-500/50 " : "border"} 
                 ${isTestFull(data.data, index) ? "border-blue-500 dark:border-blue-400" : "border-neutral-400 dark:border-white/70"}                   
                   `}>
              {index + 1}
            </div>
          ))
        }
      </div>
    </>
  );
};

export default TestNumOrders;