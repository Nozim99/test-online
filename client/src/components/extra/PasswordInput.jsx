import {useState} from 'react';
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";

const PasswordInput = ({placeHolder, password, setPassword, passwordInputError}) => {
  const [show, setShow] = useState(false);

  const changeShow = () => {
    setShow(!show);
  }

  return (
    <div>
      <div className="w-full relative">
        {
          show
            ?
            <AiOutlineEyeInvisible onClick={changeShow} className="passwordViewBtn"/>
            :
            <AiOutlineEye onClick={changeShow} className="passwordViewBtn"/>
        }
        <input
          onChange={(e)=>setPassword(e.target.value)}
          placeholder={placeHolder}
          value={password}
          type={show ? "text" : "password"}
          id="password"
          className={`outline-0 border rounded-md py-1 xs:py-1.5 bg-inherit dark:shadow-lg w-full pl-3 pr-8 ${passwordInputError ? "border-red-500" : "border-neutral-300 dark:border-blue-500 dark:shadow-blue-600/50"}`}/>
      </div>
    </div>
  );
};

export default PasswordInput;