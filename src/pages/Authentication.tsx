import { Link } from "@nextui-org/react";
import { useRef, useState } from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import AnimateText from "../ui/AnimateText";
import { classToggler } from "../utils/classToggler";

const gradient = "bg-gradient-to-r from-gray-700 via-gray-900 to-black";

const Authentication = () => {
  const [phase, setPhase] = useState("set");
  const signIn = useRef<HTMLDivElement>(null);
  const signUp = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const overlayContainer = useRef<HTMLDivElement>(null);
  const overlaySignIn = useRef<HTMLDivElement>(null);
  const overlaySignUp = useRef<HTMLDivElement>(null);

  function handleClick() {
    if (
      !overlayContainer.current ||
      !overlay.current ||
      !overlaySignIn.current ||
      !overlaySignUp.current ||
      !signIn.current ||
      !signUp.current
    )
      return;

    setPhase((prev) => {
      if (prev === "set") return "reset";
      else return "set";
    });

    classToggler(
      overlayContainer,
      ["translate-x-[-100%]"],
      ["translate-x-0"],
      phase,
    );

    classToggler(overlay, ["translate-x-[50%]"], ["translate-x-0"], phase);

    classToggler(
      overlaySignIn,
      ["translate-x-0"],
      ["translate-x-[-20%]"],
      phase,
    );

    classToggler(
      overlaySignUp,
      ["translate-x-[20%]"],
      ["translate-x-0"],
      phase,
    );

    classToggler(signIn, ["translate-x-[100%]"], ["translate-x-0"], phase);

    classToggler(
      signUp,
      ["translate-x-[100%]", "opacity-[1]", "z-[5]"],
      ["translate-x-0", "opacity-0", "z-[1]"],
      phase,
    );
  }
  return (
    <main className="flex h-screen flex-col items-center justify-center overflow-hidden bg-stone-100">
      {/* Container */}
      <div className="relative min-h-[480px] w-[768px] max-w-full overflow-hidden rounded-3xl shadow-lg">
        {/* SignUp container */}
        <div
          ref={signUp}
          className="absolute left-0 top-0 z-[1] h-full w-1/2 bg-white opacity-0 duration-[600ms] ease-in-out"
        >
          <div className="flex h-full flex-col justify-center px-[40px]">
            <h1 className="mb-5 text-4xl font-extrabold">Create Account</h1>
            <Signup />
            {/* <IntegrateLoginFormWIthReactHookForm /> */}
          </div>
        </div>

        {/* SignInContainer */}
        <div
          ref={signIn}
          className="absolute left-0 top-0 z-[2] h-full w-1/2 bg-white duration-[600ms] ease-in-out"
        >
          <div className="flex h-full flex-col justify-center px-[40px]">
            <h1 className="mb-5 text-4xl font-extrabold">Sign in</h1>
            <Login />
          </div>
        </div>

        {/* Overlay Container */}
        <div
          ref={overlayContainer}
          className="absolute right-0 top-0 z-[100] h-full w-1/2 overflow-hidden duration-[600ms] ease-in-out"
        >
          <div
            ref={overlay}
            className={`relative -left-[100%] h-full w-[200%] translate-x-0 ${gradient} duration-[600ms] ease-in-out`}
          >
            <div
              ref={overlaySignIn}
              className="absolute top-0 flex h-full w-1/2 translate-x-[-20%] flex-col items-center justify-center px-[40px] text-center duration-[600ms] ease-in-out"
            >
              <AnimateText
                animate={phase !== "set" ? true : false}
                text={["Design idea", "of Vivek Singh"]}
              />

              <span className="mt-5 text-white">
                Already have an account ?{" "}
                <Link>
                  <button onClick={handleClick}>Sign in</button>
                </Link>
              </span>
            </div>

            <div
              ref={overlaySignUp}
              className="absolute right-0 top-0 flex h-full w-1/2 translate-x-0 flex-col items-center justify-center px-[40px] text-center duration-[600ms] ease-in-out"
            >
              <AnimateText
                animate={phase !== "reset" ? true : false}
                text={["Made with ❤️", "by Shahil Yadav"]}
              />
              <span className="mt-5 text-white">
                Don't have an account already ?{" "}
                <Link>
                  <button onClick={handleClick}>Sign up</button>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Authentication;
