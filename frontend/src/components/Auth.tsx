import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginInputType,
  SignUpInputType,
} from "@ayush_srivastava/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  type AuthInputType = SignUpInputType | LoginInputType;

  const initialState: AuthInputType =
    type === "signup"
      ? { name: "", email: "", password: "" }
      : { email: "", password: "" };

  const [postInput, setPostInput] = useState<SignUpInputType>(initialState);
  const navigate = useNavigate();

  async function sendRequest() {
    try {
      // Send a request to the server to signup the user
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "login"}`,
        postInput // The data to send
      );
      const token = response.data.token;
      console.log(token);

      // Store the token in the local storage
      localStorage.setItem("token", token);

      navigate("/posts");
    } catch (error) {
      alert(`Error : ${error}`);
    }
  }

  return (
    <div className="flex flex-col justify-center md:p-40">
      <div className="p-3">
        <div className="flex flex-col items-center">
          <div>
            <div className="text-3xl font-bold">
              {type === "signup" ? "Create an account" : "Welcome back!"}
            </div>
            <div className="flex text-gray-400 justify-center gap-2">
              <div>
                {type === "signup"
                  ? "Already have an acoount?"
                  : "Just get yourself an account"}
              </div>
              <Link
                to={type === "signup" ? "/signin" : "/signup"}
                className="underline"
              >
                {type === "signup" ? "Signin" : "Signup"}
              </Link>
            </div>
          </div>
        </div>

        <div>
          {type === "signup" && (
            <LabeledInput
              placeholder="Jhon doe.."
              label="Username"
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  name: e.target.value,
                });
              }}
            />
          )}
          <LabeledInput
            placeholder="johndoe@gmail.com"
            label="Email"
            onChange={(e) => {
              setPostInput({
                ...postInput,
                email: e.target.value,
              });
            }}
          />
          <LabeledInput
            placeholder="Keep it secret.."
            type="password"
            label="Passoword"
            onChange={(e) => {
              setPostInput({
                ...postInput,
                password: e.target.value,
              });
            }}
          />
        </div>

        <div className="px-10 py-5">
          <button
            onClick={sendRequest}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
          >
            {type === "signup" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabeledInputProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabeledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabeledInputProps) {
  return (
    <div className="p-2 gap-1">
      <label className="block mb-2 text-sm font-bold text-gray-900">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Auth;
