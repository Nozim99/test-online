import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {useState} from "react";
import "react-awesome-button/dist/styles.css";
import {BiImageAdd, BiLoaderAlt} from "react-icons/bi";
import axios from "axios";
import {url} from "../../Data/url.js";
import {useDispatch} from "react-redux";
import {setUserData} from "../../store/slices/authSlice.js";
import {useNavigate} from "react-router-dom";

const SignUp = ({setIsSignIn}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [nameLoad, setNameLoad] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState({
    name: "",
    password: "",
    confirmPassword: false,
  });
  const [register, setRegister] = useState({
    name: "",
    isNameEmpty: false,
    image: null,
    password: "",
    confirm: "",
  });

  const changeImage = (value) => {
    setRegister({...register, image: value});
  };

  const changeName = (e) => {
    setError({...error, name: ""})
    // setRegister({...register, name: e.target.value.trim()});
    // if (e.target.value.trim().length < 3) return;
    const encodeName = encodeURIComponent(e.target.value.trim());
    setNameLoad(true)
    axios.get(url.basic + url.checkUserName + encodeName)
      .then((result) => {
        setNameLoad(false)
        if (result.data.isEmpty) {
          setRegister({...register, isNameEmpty: true, name: e.target.value.trim()});
        } else {
          if (e.target.value.trim() === result.data.name)
            setError({...error, name: "Bu ism band"});
          setRegister({...register, isNameEmpty: false, name: e.target.value.trim()})
        }
      })
      .catch((err) => {
        console.error(err);
        setNameLoad(false)
      })
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      changeImage(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  };

  const registerHandler = () => {
    if (nameLoad) return;
    if (load) return;

    if (register.name.trim().length < 3)
      return setError({
        ...error,
        name: "Kamida 3 ta belgidan iborat bo'lishi kerak",
      });

    if (!register.isNameEmpty) return;

    if (register.password.length < 2)
      return setError({
        ...error,
        password: "Kamida 2 ta belgidan iborat bo'lishi kerak",
      });

    if (register.password !== register.confirm)
      return setError({
        ...error,
        confirmPassword: true,
      });

    sendRegister(register);
  };

  const changePassword = (e) => {
    setError({...error, password: ""});
    setRegister({...register, password: e.target.value});
  }

  const changeConfirm = (e) => {
    setError({...error, confirmPassword: false});
    setRegister({...register, confirm: e.target.value});
  }

  const sendRegister = () => {
    setLoad(true);
    const formData = new FormData();
    formData.append("image", register.image);
    formData.append("name", register.name);
    formData.append("password", register.password);

    axios.post(url.basic + url.userCreate, formData)
      .then((response) => {
        setLoad(false)
        console.log(response.data)
        dispatch(setUserData(response.data));
        navigate("/")
      })
      .catch((err) => {
        setLoad(false)
        if (err.response && err.response.data && err.response.data.error) {
        } else {
          console.log(err)
        }
      })
  }


  return (
    <div className="flex flex-col">
      <label
        className="w-24 h-24 bg-neutral-300 rounded-full self-center border border-neutral-400 cursor-pointer flex justify-center items-center text-4xl font-medium bg-center bg-no-repeat bg-cover
      dark:bg-inherit dark:border-blue-500 dark:shadow-lg dark:shadow-blue-700/50 dark:hover:bg-slate-400/10"
        style={register.image ? {backgroundImage: `url(${imageUrl})`} : {}}
        htmlFor="image"
      >
        {register.image ? (
          ""
        ) : register.name ? (
          register.name[0].toUpperCase()
        ) : (
          <BiImageAdd className="text-5xl text-[#797cab]"/>
        )}
      </label>
      <input
        onChange={handleImageChange}
        type="file"
        className="hidden"
        id="image"
        accept="image/*"
      />
      <label className="loginLabel" htmlFor="name">
        Ism
      </label>
      <div className="relative mb-6">
        <input
          onChange={changeName}
          type="text"
          id="name"
          placeholder="name"
          className={`loginInput pl-3 pr-7 w-full ${error.name ? "border-red-500" : "border-neutral-300 dark:border-blue-400 dark:shadow-blue-400/50 dark:focus:border-blue-500 dark:focus:shadow-blue-500/50"}`}
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-2 text-blue-400">
          {nameLoad ? <BiLoaderAlt className=" animate-spin"/> : ""}
        </div>
        {error.name ? <p className="absolute text-red-500 top-9 showText">{error.name}</p> : ""}
      </div>
      <label className="loginLabel" htmlFor="password">
        Parol
      </label>
      <div className="w-full relative mb-6">
        {isPasswordHidden ? (
          <AiOutlineEye
            onClick={() => setIsPasswordHidden(false)}
            className="passwordViewBtn"
          />
        ) : (
          <AiOutlineEyeInvisible
            onClick={() => setIsPasswordHidden(true)}
            className="passwordViewBtn"
          />
        )}
        <input
          onChange={changePassword}
          value={register.password}
          placeholder="password"
          type={isPasswordHidden ? "password" : "text"}
          id="password"
          className={`loginInput w-full pl-3 pr-8 ${error.password ? "border-red-500" : "border-neutral-300 dark:border-blue-400 dark:shadow-blue-400/50 dark:focus:border-blue-500 dark:focus:shadow-blue-500/50"}`}
        />
        {error.password ? <p className="absolute text-red-500 top-9 showText">{error.password}</p> : ""}
      </div>
      <label className="loginLabel" htmlFor="confirmPassword">
        Parolni tasdiqlash
      </label>
      <div className="w-full relative">
        {isConfirmPasswordHidden ? (
          <AiOutlineEye
            onClick={() => setIsConfirmPasswordHidden(false)}
            className="passwordViewBtn"
          />
        ) : (
          <AiOutlineEyeInvisible
            onClick={() => setIsConfirmPasswordHidden(true)}
            className="passwordViewBtn"
          />
        )}
        <input
          onChange={changeConfirm}
          value={register.confirm}
          type={isConfirmPasswordHidden ? "password" : "text"}
          placeholder="confirm"
          id="confirmPassword"
          className={`loginInput w-full pl-3 pr-8 ${error.confirmPassword ? "border-red-500" : "border-neutral-300 dark:border-blue-400 dark:shadow-blue-400/50 dark:focus:border-blue-500 dark:focus:shadow-blue-500/50"}`}
        />
      </div>
      <button onClick={registerHandler} className="loginKirishBtn">
        <span className="relative">
          Kirish
        <div className="absolute top-1/2 -translate-y-1/2 left-full text-blue-300">
          {load ? <BiLoaderAlt className="animate-spin"/> : ""}
        </div>
        </span>
      </button>
      <p className="text-center mb-2 text-sm">
        Hisobingiz mavjudmi?{" "}
        <span
          onClick={() => setIsSignIn(true)}
          className="text-blue-500 cursor-pointer"
        >
          Hisobga kirish
        </span>
      </p>
    </div>
  );
};

export default SignUp;
