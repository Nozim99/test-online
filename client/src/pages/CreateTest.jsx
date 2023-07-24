import Layout from "../Layout/Layout.jsx";
import {FaRegEdit} from "react-icons/fa";
import {LuDownload} from "react-icons/lu";
import {useNavigate} from "react-router-dom";

const CreateTest = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="min-h-screen pt-10 dark:text-white">
        <h1 className="text-2xl text-center mb-5 tracking-wider font-medium">Test Yaratish</h1>
        <div
          className="flex flex-col w-11/12 xs:w-98 sm:w-99 mx-auto border-2 border-neutral-300 shadow-lg shadow-neutral-300/50 p-5 pb-8 py-4 rounded-md">
          <label htmlFor="name">Nomi</label>
          <input type="text" id="name" name="name"
                 className="outline-0 border border-neutral-300 rounded px-3 py-0.5 dark:text-black"
                 placeholder="Ingliz tili testi"/>
          <div className="mt-5 mb-1 flex justify-between flex-col gap-2 xs:flex-row xs:gap-0">
            <button disabled={true} title="Tez kunda ushbu funksiya qo'shiladi!" className="createTestBtn border-dashed hover:border-solid dark:border-solid"><LuDownload className="text-lg"/> <span
              className="text-black dark:text-white">Fayl yuklash</span></button>
            <button onClick={() => navigate("/create/test/manually")} className="createTestBtn"><FaRegEdit/> <span
              className="text-black dark:text-white">Qo&apos;lda to&apos;ldirish</span></button>
          </div>
          <div className="text-neutral-400 overflow-hidden whitespace-nowrap h-6">
            upload.pdf
          </div>
          <button
            className="border border-blue-500 rounded-md bg-blue-100 py-0.5 xs:py-1 hover:bg-blue-50 tracking-wider font-medium mt-5 transition dark:bg-blue-500 dark:shadow-lg dark:shadow-blue-500/50 dark:hover:bg-blue-600 dark:hover:shadow-blue-600/50">Tayyor
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default CreateTest;