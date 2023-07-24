import {AiOutlineClose} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {changePassword} from "../../store/slices/testSlice.js";

const TestPasswordModal = ({setModal, testHandler}) => {
  const dispatch = useDispatch();
  const test = useSelector((store) => store.test);
  const [error, setError] = useState(false)

  const send = () => {
    if (test.password.length < 3) {
      setError(true);
      return;
    }
    testHandler();
  }

  const passwordHandler = (e) => {
    setError(false);
    dispatch(changePassword(e.target.value));
  }

  const closeModal = () => {
    dispatch(changePassword(""))
    setModal("")
  }

  return (
    <>
      <div onClick={closeModal} className="fixed z-10 top-0 left-0 w-screen h-screen"></div>
      <div
        className="fixed z-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-4 text-black border border-blue-500 px-20 py-8 rounded bg-neutral-900/60 backdrop-blur dark:shadow-[0_0_18px_6px] dark:shadow-blue-700/50">
        <input
          value={test.password}
          onChange={passwordHandler}
          className={`w-80 py-0.5 px-2 rounded outline-none border-2 ${error ? "border-red-500" : ""}`}
          type="password"
          placeholder="Parol kiriting"
        />
        <button
          onClick={send}
          className="py-0.5 bg-blue-500 tracking-wide font-medium text-lg rounded dark:shadow-lg dark:shadow-blue-700/50 hover:bg-blue-600">Kirish
        </button>
      </div>
    </>
  );
};

export default TestPasswordModal;