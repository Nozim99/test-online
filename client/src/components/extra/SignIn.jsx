import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {useState} from "react";
import axios from "axios";
import {url} from "../../Data/url.js";
import {toastError} from "../../utils/toastifyMoadl.js";
import {useDispatch, useSelector} from "react-redux";
import {setUserData} from "../../store/slices/authSlice.js";
import {useNavigate} from "react-router-dom";
import {BiLoaderAlt} from "react-icons/bi";
import {changeUrl} from "../../store/slices/testSlice.js";

const SignIn = ({setIsSignIn}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [inputError, setInputError] = useState({name: false, password: false});
  const [load, setLoad] = useState(false);
  const testUrl = useSelector((store) => store.test)
  // const [fetchError, setFechError] = useState("");
  const loginHandler = () => {
    setLoad(true);
    axios.post(url.basic + url.login, {
      name,
      password,
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((result) => {
        dispatch(setUserData(result.data))
        if (testUrl.url) {
          navigate(testUrl.url)
          dispatch(changeUrl(""))
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setInputError({name: true, password: true});
        } else {
          toastError("Server xatoligi")
        }
      })
      .finally(() => {
        setLoad(false);
      })
  }

  const changeName = (e) => {
    if (!inputError.name && inputError.password) {
      setInputError({name: false, password: false});
    }
    setInputError({...inputError, name: false});

    setName(e.target.value);
  }

  const changePassword = (e) => {
    if (!inputError.name && inputError.password) {
      setInputError({name: false, password: false});
    }
    setInputError({...inputError, password: false});

    setPassword(e.target.value);
  }

  return (
    <div className="flex flex-col">
      <label className="loginLabel" htmlFor="name">Ism</label>
      <input
        onChange={changeName}
        value={name}
        type="text"
        id="name"
        placeholder="name"
        className={`loginInput mb-5 px-3 ${inputError.name ? "border-red-500" : "border-neutral-300 dark:border-blue-400 dark:shadow-blue-400/50 dark:focus:border-blue-500 dark:focus:shadow-blue-500/50"}`}
      />
      <label className="loginLabel" htmlFor="password">Parol</label>
      <div className="w-full relative">
        {
          isPasswordHidden
            ?
            <AiOutlineEye onClick={() => setIsPasswordHidden(false)} className="passwordViewBtn"/>
            :
            <AiOutlineEyeInvisible onClick={() => setIsPasswordHidden(true)} className="passwordViewBtn"/>
        }
        <input
          onChange={changePassword}
          value={password}
          type={isPasswordHidden ? "password" : "text"}
          placeholder="password"
          id="password"
          className={`loginInput w-full pl-3 pr-8 ${inputError.password ? "border-red-500" : "border-neutral-300 dark:border-blue-400 dark:shadow-blue-400/50 dark:focus:border-blue-500 dark:focus:shadow-blue-500/50"}`}/>
      </div>
      <button onClick={loginHandler} className="loginKirishBtn">
        <span className="relative">
          Kirish
        <div className="absolute top-1/2 -translate-y-1/2 left-full text-blue-300">
          {load ? <BiLoaderAlt className="animate-spin"/> : ""}
        </div>
        </span>
      </button>
      <p className="text-center mb-2 text-sm">Hisobingiz yo&apos;qmi? <span onClick={() => setIsSignIn(false)}
                                                                            className="text-blue-500 cursor-pointer">Hisob yaratish hoziroq</span>
      </p>
    </div>
  );
};

export default SignIn;