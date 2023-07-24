import {AiOutlineAppstoreAdd, AiOutlineFileAdd} from "react-icons/ai";
import {addTest, changeTestNum, clearTest} from "../../store/slices/createTest.js";
import {useDispatch, useSelector} from "react-redux";
import {isDataTrue} from "../../utils/createTest.js";
import {MdNavigateBefore, MdNavigateNext} from "react-icons/md";
import {
  changeIsCreated,
  changeIsCreatedFirstTest,
  changeNextTest,
  changePrevTest,
} from "../../store/slices/pagination.js";
import {toastError, toastSuccess} from "../../utils/toastifyMoadl.js";
import axios from "axios";
import {url} from "../../Data/url.js";
import {useNavigate} from "react-router-dom";

const Buttons = ({image}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const data = useSelector((store) => store.createTest);
  const pagination = useSelector((store) => store.pagination);

  const sendData = () => {
    const isTrue = isDataTrue(data.data);
    if (data.name.length < 3) return toastError("Testni nomini kiriting");
    if (isTrue === null) return toastError("Birorta ham test kiritilmagan");
    if (data.isPrivate && data.password.length < 3) return toastError("Parolda kamida 3 ta belgi bo'lishi kerak");
    if (isTrue) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", data.name);
      formData.append("test", JSON.stringify(data.data));
      formData.append("password", data.password);
      formData.append("isPrivate", data.isPrivate);
      axios.post(url.basic + url.createTest, formData, {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
          "Content-Type": "multipart/form-data",
        }
      })
        .then(() => {
          toastSuccess("Test yaratildi");
          dispatch(clearTest());
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
        })
    } else {
      toastError("Har bir test to'liq to'ldirilishi kerak");
    }
  };

  const createTest = () => {
    if (pagination.isTestCreated) return;

    if (data.testNum === null) {
      dispatch(changeIsCreatedFirstTest(true));
      dispatch(addTest());
      setTimeout(() => {
        dispatch(changeIsCreatedFirstTest(false));
      }, 300);
    } else {
      dispatch(changeIsCreated(true));
      setTimeout(() => {
        dispatch(addTest());
      }, 300);
      setTimeout(() => {
        dispatch(changeIsCreated(false));
      }, 600);
    }
  };

  const nextBtn = () => {
    if (data.data.length - 1 === data.testNum) return;
    dispatch(changeTestNum(data.testNum + 1));
  };

  const prevBtn = () => {
    if (data.testNum === 0) return;
    dispatch(changeTestNum(data.testNum - 1));
  };

  const prevHandler = () => {
    if (data.testNum === 0) return;
    if (pagination.prevTest || pagination.nextTest) return;
    dispatch(changePrevTest(true));
    setTimeout(() => {
      prevBtn();
      setTimeout(() => {
        dispatch(changePrevTest(false));
      }, 300);
    }, 300);
  };

  const nextHandler = () => {
    if (data.testNum === data.data.length - 1) return;
    if (pagination.nextTest || pagination.prevTest) return;
    dispatch(changeNextTest(true));
    setTimeout(() => {
      nextBtn();
      setTimeout(() => {
        dispatch(changeNextTest(false));
      }, 300);
    }, 300);
  };

  return (
    <>
      <div className="flex justify-center gap-6">
        <button onClick={prevHandler} className="paginationBtn">
          <MdNavigateBefore/>
        </button>
        <button onClick={nextHandler} className="paginationBtn">
          <MdNavigateNext/>
        </button>
      </div>
      <div className="mt-10 flex flex-col justify-center w-11/12 xs:w-96 mx-auto gap-5">
        <button
          onClick={createTest}
          className="createTestBtns border-green-500 bg-green-100 hover:bg-green-200 dark:bg-green-600 dark:border-green-600 dark:hover:bg-green-500 dark:shadow-lg dark:shadow-green-600/50 dark:hover:shadow-green-500/50"
        >
          <AiOutlineAppstoreAdd className="text-xl"/> Savol Qo&apos;shish
        </button>
        <button
          onClick={sendData}
          className="createTestBtns border-blue-500 bg-blue-100 hover:bg-blue-200 dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-500 dark:shadow-lg dark:shadow-blue-600/50 dark:hover:shadow-blue-500/50"
        >
          <AiOutlineFileAdd className="text-xl"/> Yaratish
        </button>
      </div>
    </>
  );
};

export default Buttons;
