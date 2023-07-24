import { useState } from "react";
import Layout from "../Layout/Layout.jsx";
import SignIn from "../components/extra/SignIn.jsx";
import SignUp from "../components/extra/SignUp.jsx";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <Layout>
      <section className="min-h-screen">
        <div className="w-auto xs:w-96 mx-4 xs:mx-auto bg-white p-5 my-10 rounded-lg border dark:bg-inherit dark:border-blue-400 shadow-lg shadow-blue-400/50 dark:text-white">
          <h1 className="text-3xl font-bold tracking-wider text-center mb-10">
            Login
          </h1>
          <div className="bg-neutral-200/80 w-60 mx-auto relative h-9 rounded-lg border border-blue-500 mb-8 dark:border-2 dark:shadow-lg dark:border-blue-500 dark:shadow-blue-500/50 dark:hover:border-blue-600 dark:hover:shadow-blue-600/50 dark:bg-blue-200">
            <div
              className={`w-1/2 bg-blue-600 h-9 absolute top-1/2 -translate-y-1/2 rounded-lg transform duration-300 outline-0 ${
                isSignIn ? "left-0" : "left-1/2"
              }`}
            ></div>
            <button
              onClick={() => setIsSignIn(true)}
              className={`loginBtn ${isSignIn ? "text-white" : "text-black"}`}
            >
              Sign in
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`loginBtn ${!isSignIn ? "text-white" : "text-black"}`}
            >
              Sign up
            </button>
          </div>
          {isSignIn ? (
            <SignIn
              setIsSignIn={setIsSignIn}
            />
          ) : (
            <SignUp setIsSignIn={setIsSignIn} />
          )}
          <hr className="w-2/3 border-neutral-400 mx-auto mb-4" />
        </div>
      </section>
    </Layout>
  );
};

export default Login;
