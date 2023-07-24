import Layout from "../Layout/Layout.jsx";
import {useEffect, useState} from "react";
import PercentView from "../components/Test/PercentView.jsx";
import Question from "../components/Test/Question.jsx";
import Variants from "../components/Test/Variants.jsx";
import OrderNumbers from "../components/Test/OrderNumbers.jsx";
// import {testData} from "../Data/test.js";
import ChooseVariantBtn from "../components/Test/ChooseVariantBtn.jsx";
import Statistic from "../components/Test/Statistic.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";
import {url} from "../Data/url.js";
import {useDispatch, useSelector} from "react-redux";
import {changePassword} from "../store/slices/testSlice.js";

const Test = () => {
  const [testData, setTestData] = useState(null);
  const dispatch = useDispatch();
  const {token} = useSelector((store) => store.auth);
  const allTest = testData.test.length;
  const [order, setOrder] = useState(0)
  const [answer, setAnswer] = useState("")
  const [userAnswers, setUserAnswers] = useState(Array(testData.test.length).fill(""));
  const percentTest = userAnswers.filter((item) => item !== "").length / allTest * 100;
  const params = useParams();
  const test = useSelector((store) => store.test);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const testName = decodeURIComponent(params.name);

  useEffect(() => {
    axios.get(url.basic + url.getTestById + `?name=${testName}&password=${test.password}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((result) => {
        console.log(result)
        setTestData(result.data)
        const answers = [];
        result.data.test.forEach((item) => {
          answers.push(item.answer);
        })
        setCorrectAnswers(answers);
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        dispatch(changePassword(""));
      })
  }, [])


  const isTrueHandle = () => {
    let isTrue = null;
    if (userAnswers[order]) {
      (userAnswers[order] === testData.answer[order]) ? isTrue = true : isTrue = false
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
    if (order < testData.answer.length - 1) {
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
      setOrder(testData.answer.length - 1)
    }
    setAnswer("")
  }

  const answersHandle = (index) => {
    if (index !== order) {
      setAnswer("")
      setOrder(index)
    }
  }

  const correctAnswer = () => {
    let num = 0;
    testData.answer.forEach((item, index) => {
      if (item === userAnswers[index]) num++;
    })
    return num;
  }

  const incorrectAnswer = () => {
    return testData.answer.length - correctAnswer();
  }

  const percent = () => {
    return Math.floor(correctAnswer() * 100 / testData.answer.length)
  }

  if (testData === null) return <div></div>

  return (
    <Layout>
      <section className="min-h-screen mt-10 dark:text-white">
        <h1 className="text-center mb-8 text-2xl tracking-wide font-medium xs:w-96 w-11/12 mx-auto">{testData.name}</h1>
        <PercentView percentTest={percentTest} available={userAnswers.filter((item) => item !== "").length}
                     all={testData.test.length}/>
        <Question question={testData.test[order].question} order={order}/>
        <Variants userAnswer={userAnswers[order]} isTrueHandle={isTrueHandle} answer={answer} setAnswer={setAnswer}
                  variants={testData.test[order]}/>
        <ChooseVariantBtn userAnswerCount={userAnswers.filter((item) => item !== "").length}
                          allAnswerCount={testData.test.length} orderDecrement={orderDecrement}
                          chooseAnswer={chooseAnswer} orderIncrement={orderIncrement}/>
        {
          userAnswers.filter((item) => item !== "").length === testData.answer.length ?
            <Statistic correctAnswer={correctAnswer} incorrectAnswer={incorrectAnswer} percent={percent}/>
            : ""
        }

        <hr className="mt-8 xs:w-96 w-5/6 mx-auto border-neutral-300 dark:border-blue-500"/>
        <OrderNumbers correctAnswers={correctAnswers} userAnswers={userAnswers} order={order}
                      answersHandle={answersHandle}/>
      </section>
    </Layout>
  );
};

export default Test;