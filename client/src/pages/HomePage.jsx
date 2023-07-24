import {AiOutlineFileAdd} from "react-icons/ai";
import {FaRegEdit} from "react-icons/fa";
import Layout from "../Layout/Layout.jsx";
import SwiperHome from "../components/extra/SwiperHome.jsx";
import Statistics from "../components/extra/Statistics.jsx";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen container mx-auto">
        <SwiperHome/>

        <article
          className="mx-5 mt-10 border border-neutral-300 shadow rounded-lg px-5 py-3 md:w-100 md:mx-auto dark:border-blue-400 dark:shadow-lg dark:shadow-blue-400/50 dark:text-white">
          <header className="text-center font-bold text-xl tracking-wider"><span
            className="font-serif">MEZES</span> saytiga hush kelibsiz!
          </header>
          <p className="text-center mt-4 text-lg font-medium tracking-wide">
            Test sinovlarida qatnashing va osonlik bilan Test sinovlarini yarating
          </p>
        </article>

        <Statistics/>

        <article
          className="border mx-5 text-center px-8 py-2 mt-16 rounded-md shadow-md mb-10 md:w-100 md:mx-auto dark:border-2 dark:shadow-lg dark:shadow-blue-400/50 dark:border-blue-400 dark:text-white">
          <header className="text-xl font-bold tracking-wider mb-2">
            Xususiyatlar
          </header>
          <ul className="text-start list-disc">
            <li>Testda ishtirok etish</li>
            <li>Test yaratish</li>
            <li>Testni boshqalar bilan baham ko&apos;rish</li>
            <li>Statistikalarni kuzatish</li>
            <li>Har qanday qurilmada qulay foydalanish</li>
          </ul>
        </article>

        <section className="mx-5 text-center mb-20 md:w-100 md:mx-auto dark:text-white">
          <h1 className="text-xl font-bold tracking-wider mb-5">Boshlash</h1>
            <button onClick={()=>navigate("/search")} className="homeBtn mb-4">Test sinovini boshlash <FaRegEdit/></button>
            <button onClick={()=>navigate("/create/Test")} className="homeBtn">Test sinovini yaratish <AiOutlineFileAdd className="text-lg" /></button>
        </section>

      </div>
    </Layout>
  );
};

export default HomePage;