import Layout from "../Layout/Layout.jsx";
import InputsBox from "../components/CreateTestManually/InputsBox.jsx";
import Buttons from "../components/CreateTestManually/Buttons.jsx";
import {useEffect, useState} from "react";
import TestNumOrders from "../components/CreateTestManually/TestNumOrders.jsx";
import {useSelector} from "react-redux";
import NameInput from './../components/CreateTestManually/NameInput';
import {useNavigate} from "react-router-dom";
import AddImage from "../components/CreateTestManually/AddImage.jsx";

const CreateTestManually = () => {
  const navigate = useNavigate();
  const data = useSelector((store) => store.createTest);
  const auth = useSelector((store) => store.auth);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!auth.token) {
      navigate("/login")
    }
  }, [])

  return (
    <Layout>
      <section className="min-h-screen pt-10 dark:text-white mb-32 scroll-smooth overflow-hidden">
        <h1 className="text-center text-xl 2xs:text-2xl mb-5 tracking-wider font-bold">
          Test Yaratish
        </h1>
        <NameInput />
        <AddImage setImage={setImage} />
        {data.data.length ? (
          <InputsBox/>
        ) : (
          <p
            className="w-11/12 xs:w-96 mx-auto text-center text-2xl font-bold mt-48 mb-64 py-5 rounded-lg border border-dashed border-neutral-400 text-neutral-400 dark:border-blue-500 dark:text-blue-200">
            Savol Mavjud Emas!
          </p>
        )}

        <Buttons image={image} />
        <TestNumOrders/>
      </section>
    </Layout>
  );
};

export default CreateTestManually;
