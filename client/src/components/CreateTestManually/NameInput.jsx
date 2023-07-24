import {useRef} from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeName, changePassword, toggleIsPrivate} from "../../store/slices/createTest.js";
import {BiLoaderAlt} from "react-icons/bi";
import {BsFillCheckCircleFill} from "react-icons/bs";
import axios from "axios";
import {url} from "../../Data/url.js";
import {toastError} from "../../utils/toastifyMoadl.js";
import PasswordInput from "../extra/PasswordInput.jsx";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";

function NameInput() {
  const dispatch = useDispatch();
  const nameTest = useSelector((store) => store.createTest);
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [inputError, setInputError] = useState("");
  const [load, setLoad] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordInputError, setPasswordInputError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(false);

  const changePasswordHandler = (value) => {
    setPasswordError("")
    dispatch(changePassword(value));
  }

  const isPrivateHandler = (e) => {
    dispatch(toggleIsPrivate(e.target.checked));
  }

  const nameHandler = () => {
    if (load) return;
    if (inputError) return;
    if (name.trim().length < 3)
      return setInputError("kamida 3 ta belgidan iborat bo'lishi kerak!");
    if (nameTest.isPrivate && nameTest.password.length < 3) return setPasswordError("Kamida 3 ta belgidan iborat bo'lishi kerak");
    dispatch(changeName(name.trim()));
    setName(name.trim());
    setOpen(false);
  };

  const changeShow = () => {
    setShow(!show);
  }

  const inputHandler = (e) => {
    setName(e.target.value);
    setInputError("");
    if (e.target.value.length < 3) return;
    setLoad(true);
    axios
      .get(
        url.basic +
        url.checkTestName +
        `${encodeURIComponent(e.target.value.trim())}`
      )
      .then((result) => {
        if (!result.data.isEmpty && result.data.name === e.target.value.trim()) {
          setInputError("Bu nom band!");
        } else {
          setInputError("");
        }
        setLoad(false);
      })
      .catch(() => {
        toastError("Server xatoligi");
      });
  };

  if (!open)
    return (
      <div className="w-11/12 xs:w-96 mx-auto flex justify-center">
        <h1
          onClick={() => setOpen(true)}
          title="Nomini o'zgartirish"
          className="inline-block text-center mb-5 text-2xl tracking-wider font-medium cursor-pointer"
        >
          {nameTest.name}
        </h1>
      </div>
    );
  return (
    <div className="w-11/12 xs:w-96 mx-auto flex flex-col justify-center mb-10">
      <div className="relative mb-8">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") nameHandler();
          }}
          onChange={inputHandler}
          value={name}
          type="text"
          className={`${
            inputError
              ? "border-red-500"
              : "border-slate-500 dark:border-blue-500 dark:shadow-blue-800/50"
          } rounded-md w-full bg-white border px-3 py-1 tracking-wide text-lg outline-none dark:bg-inherit dark:shadow-lg pr-8`}
          placeholder="Testni nomini yozing"
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-2">
          {load ? <BiLoaderAlt className="animate-spin text-blue-300"/> : ""}
          <BsFillCheckCircleFill className="hidden"/>
        </div>
        <div
          className={`text-red-500 tracking-wide mb-4 mt-0.5 absolute top-full ${
            inputError ? "showText" : "hidden"
          }`}
        >
          {inputError}
        </div>
      </div>
      <div>
        <div className="flex justify-center gap-1 mb-2 items-center">
          <input
            checked={nameTest.isPrivate}
            className="w-3.5 h-3.5 bg-inherit outline-none border border-neutral-400 dark:border-blue-500 cursor-pointer"
            type="checkbox"
            onChange={isPrivateHandler}
            id="checkbox"
          />
          <label className="cursor-pointer" htmlFor="checkbox">Parollash</label>
        </div>
        {nameTest.isPrivate ?
          <div className="mb-8">
            <div className="w-full relative">
              {
                show
                  ?
                  <AiOutlineEyeInvisible onClick={changeShow} className="passwordViewBtn"/>
                  :
                  <AiOutlineEye onClick={changeShow} className="passwordViewBtn"/>
              }
              <input
                value={nameTest.password}
                onChange={(e) => changePasswordHandler(e.target.value)}
                placeholder="Parol kiriting"
                type={show ? "text" : "password"}
                id="password"
                className={`outline-0 border rounded-md py-1 xs:py-1.5 bg-inherit dark:shadow-lg w-full pl-3 pr-8 ${passwordError ? "border-red-500" : "border-neutral-300 dark:border-blue-500 dark:shadow-blue-600/50"}`}/>
              <div className="text-red-500 absolute top-full">{passwordError}</div>
            </div>
          </div> : ""}
      </div>
      <button
        onClick={nameHandler}
        className="border border-slate-500 rounded-md py-1 tracking-wider font-medium text-lg dark:border-blue-500 dark:shadow-lg dark:shadow-blue-800/50 dark:hover:bg-blue-400/10 dark:hover:border-blue-600 dark:hover:shadow-blue-700/50 transition"
      >
        Kiritish
      </button>
    </div>
  );
}

export default NameInput;
