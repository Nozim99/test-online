import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Layout from "../Layout/Layout.jsx";
import SearchInput from "../components/extra/SearchInput.jsx";
import SearchTestBox from "../components/extra/SearchTestBox.jsx";
import SearchGroupBox from "../components/extra/SearchGroupBox.jsx";
import {useSelector} from "react-redux";
import axios from "axios";
import {url} from "../Data/url.js";
import {FiLoader} from "react-icons/fi";
import {useInView} from "react-intersection-observer";

const Search = () => {
  const navigate = useNavigate();
  const {token} = useSelector((store) => store.auth);
  const [queryValue, setQueryValue] = useState({
    group: true,
    test: true,
    value: null,
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [data, setData] = useState(null);
  const [ref, inView, entry] = useInView()
  const [downloader, setDownloader] = useState(true);
  const [testLength, setTestLength] = useState({all: 0, current: 0});
  // const [limit, setLimit] = useState(5);
  const [limit, setLimit] = useState(20);
  const [name, setName] = useState("");
  const [load, setLoad] = useState(false);

  const getData = (limit, name) => {
    setLoad(true);
    const encodedName = encodeURIComponent(name);

    axios.get(url.basic + url.getTests + `?limit=${limit}&name=${encodedName}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((result) => {
        setData(result.data);
        setTestLength({all: result.data.amount, current: result.data.currentAmount});
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoad(false);
      })
  }

  useEffect(() => {
    if (inView && !load) {
      setLimit(prev => prev + 20)
      getData(20 + limit, name);
    }
    if (data === null) {
      getData(20, name);
    }
  }, [inView])

  const testByName = (testName) => {
    setName(testName);
    setLimit(20)
    getData(20, testName);
  }


  if (!data) return <div></div>;
  return (
    <Layout>
      <section className="min-h-screen pt-10">
        <SearchInput testByName={testByName}/>
        {
          data === null ?
            <div>
              <img className="mx-auto" src="loading.gif" alt="loading"/>
            </div>
            :
            data.amount === 0 ? <div>
                <img className="mx-auto mt-10" src="notFound.gif" alt=""/>
                <h1 className="dark:text-white text-center text-3xl xs:text-4xl tracking-wider font-bold mt-2">Test Topilmadi</h1>
              </div>
              :
            <div className="mt-10 flex flex-col gap-5 mb-32">
              {
                data.myTests.length ? <h1
                  className="xs:w-96 sm:w-100 2xs:w-80 w-60 mx-auto text-black dark:text-white text-xl tracking-wider font-bold">Mening
                  Testim</h1> : ""
              }
              {data.myTests.map((item, index) => (
                <SearchTestBox data={item} key={index}/>
              ))}

              <h1
                className="xs:w-96 sm:w-100 2xs:w-80 w-60 mx-auto text-black dark:text-white text-xl tracking-wider font-bold">Barcha
                Testlar</h1>
              {data.otherTests.map((item, index) => (
                <SearchTestBox data={item} key={index}/>
              ))}

              {
                testLength.all === testLength.current ? "" : <div ref={ref}
                                                                  className="w-40 mt-4 mx-auto dark:text-white border-2 rounded-md py-1 flex gap-1 items-center justify-center border-neutral-500 dark:border-blue-500 dark:shadow-lg dark:shadow-blue-800/50">
                  Yuklanmoqda
                  <FiLoader className="animate-spin text-lg"/>
                </div>
              }

            </div>
        }

      </section>
    </Layout>
  );
};

export default Search;