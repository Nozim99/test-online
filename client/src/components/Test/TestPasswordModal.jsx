import {BiLoaderAlt} from "react-icons/bi";

const TestPasswordModal = ({password, setPassword, inputError, setInputError, sendPassword, load}) => {


  const passwordHandler = (e) => {
    setInputError(false);
    setPassword(e.target.value);
  }


  return (
    <>
      <div
        className="fixed z-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-4 text-black border border-blue-500 px-20 py-8 rounded bg-neutral-900/60 backdrop-blur dark:shadow-[0_0_18px_6px] dark:shadow-blue-700/50">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") sendPassword()
          }}
          value={password}
          onChange={passwordHandler}
          className={`w-80 py-0.5 px-2 rounded outline-none border-2 ${inputError ? "border-red-500" : ""}`}
          type="password"
          placeholder="Parol kiriting"
        />
        <button
          onClick={sendPassword}
          className={`flex items-center justify-center gap-1 py-0.5 bg-blue-500 tracking-wide font-medium text-lg rounded dark:shadow-lg dark:shadow-blue-700/50 hover:bg-blue-600 ${load ? "animate-pulse" : ""}`}>
          Kirish
          {load ? <BiLoaderAlt className="text-slate-900 text-base animate-spin"/> : ""}
        </button>
      </div>
    </>
  );
};

export default TestPasswordModal;