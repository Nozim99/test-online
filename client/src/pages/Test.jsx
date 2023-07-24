import ReactLoading from "react-loading";
import Layout from "../Layout/Layout.jsx";
import {useEffect, useState} from "react";
import PercentView from "../components/Test/PercentView.jsx";
import Question from "../components/Test/Question.jsx";
import Variants from "../components/Test/Variants.jsx";
import OrderNumbers from "../components/Test/OrderNumbers.jsx";
import ChooseVariantBtn from "../components/Test/ChooseVariantBtn.jsx";
import Statistic from "../components/Test/Statistic.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {url} from "../Data/url.js";
import {useDispatch, useSelector} from "react-redux";
import TestPasswordModal from "../components/Test/TestPasswordModal.jsx";
import {changeUrl} from "../store/slices/testSlice.js";

const Test = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryName = decodeURIComponent(searchParams.get("name"));
  const [isPrivate, setIsPrivate] = useState(JSON.parse(searchParams.get("isPrivate")));
  const [testData, setTestData] = useState(null);
  const dispatch = useDispatch();
  const {token} = useSelector((store) => store.auth);
  const [allTest, setAllTest] = useState(0)
  const [order, setOrder] = useState(0)
  const [answer, setAnswer] = useState("")
  const [password, setPassword] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!token) {
      dispatch(changeUrl(`/test?name=${searchParams.get("name")}&isPrivate=${searchParams.get("isPrivate")}`))
      navigate("/login");
      return;
    }

    if (isPrivate) return;
    axios.get(url.basic + url.getTestByName + `?name=${queryName}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((result) => {
        console.log(result)
        setAllTest(result.data.test.length);
        setTestData(result.data);
        setUserAnswers(Array(result.data.test.length).fill(""))

        const answers = [];
        result.data.test.forEach((item) => {
          answers.push(item.answer);
        })
        setCorrectAnswers(answers);
      })
      .catch((err) => {
        if (err.response && err.response.data.error === "Parol kiritilmagan") {
          navigate(`/test?name=${searchParams.get("name")}&isPrivate=true`)
          window.location.reload();
        }
        console.error(err)
      })
      .finally(() => {
        // dispatch(changePassword(""));
      })
  }, [])

  const sendPassword = () => {
    if (password.length < 3) return setInputError(true);

    const encoded = encodeURIComponent(password);
    setLoad(true);
    axios.get(url.basic + url.getTestByName + `?name=${searchParams.get("name")}&password=${encoded}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((result) => {
        console.log(result)
        setAllTest(result.data.test.length);
        setTestData(result.data);
        setUserAnswers(Array(result.data.test.length).fill(""))

        const answers = [];
        result.data.test.forEach((item) => {
          answers.push(item.answer);
        })
        setCorrectAnswers(answers);
        setIsPrivate(false);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error === "Parol xato") {
          setInputError(true);
        } else {
          console.error(err)
        }
      })
      .finally(() => {
        setLoad(false)
      })
  }

  const isTrueHandle = () => {
    let isTrue = null;
    if (userAnswers[order]) {
      (userAnswers[order] === correctAnswers[order]) ? isTrue = true : isTrue = false
    }
    return isTrue;
  }

  const chooseAnswer = () => {
    if (answer && !userAnswers[order]) {
      const newValue = userAnswers;
      newValue[order] = answer;
      setUserAnswers(newValue);
      setAnswer("")
    }
  }

  const orderIncrement = () => {
    if (order < allTest - 1) {
      setOrder((prev) => prev + 1)
    } else {
      setOrder(0)
    }
    setAnswer("")
  }

  const orderDecrement = () => {
    if (order > 0) {
      setOrder((prev) => prev - 1);
    } else {
      setOrder(allTest - 1)
    }
    setAnswer("")
  }

  const answersHandle = (index) => {
    if (index !== order) {
      setAnswer("")
      setOrder(index)
    }
  }

  return (
    <Layout>
      <section className="min-h-screen mt-10 dark:text-white">
        {
          isPrivate ?
            <TestPasswordModal load={load} password={password} setPassword={setPassword} inputError={inputError}
                               setInputError={setInputError} sendPassword={sendPassword}/> :
            <>
              {
                testData === null ?
                  <>
                    <ReactLoading width={130} type="bars"
                                  className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden dark:block"/>
                    <ReactLoading width={130} color="#888" type="bars"
                                  className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 dark:hidden"/>
                  </>
                  :
                  <>
                    <h1
                      className="text-center mb-8 text-2xl tracking-wide font-medium xs:w-96 w-11/12 mx-auto">{testData.name}</h1>
                    <PercentView
                      allTest={allTest}
                      userAnswers={userAnswers.filter((item) => item !== "").length}
                      percent={userAnswers.filter((item) => item !== "").length * 100 / allTest}
                    />
                    <Question question={testData.test[order].question} order={order}/>
                    <Variants
                      testItem={testData.test[order]}
                      isTrueHandle={isTrueHandle}
                      userAnswer={userAnswers[order]}
                      answer={answer}
                      setAnswer={setAnswer}
                    />
                    <ChooseVariantBtn
                      orderIncrement={orderIncrement}
                      orderDecrement={orderDecrement}
                      chooseAnswer={chooseAnswer}
                      userAnswerCount={userAnswers.filter((item) => item !== "").length}
                      allAnswerCount={allTest}
                    />
                    {
                      userAnswers.filter((item) => item !== "").length === allTest ?
                        <Statistic
                          correct={userAnswers.filter((item, index) => item === correctAnswers[index]).length}
                          allTest={allTest}
                        />
                        : ""
                    }

                    <hr className="mt-8 xs:w-96 w-5/6 mx-auto border-neutral-300 dark:border-blue-500"/>
                    <OrderNumbers
                      userAnswers={userAnswers}
                      answersHandle={answersHandle}
                      order={order}
                      correctAnswers={correctAnswers}
                    />
                  </>
              }
            </>
        }

      </section>
    </Layout>
  );
};

export default Test;