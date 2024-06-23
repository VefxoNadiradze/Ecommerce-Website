import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useForm } from "react-hook-form";

interface ILogin {
  email: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILogin>();
  return (
    <LoginForm onSubmit={handleSubmit((data) => console.log(data))}>
      <input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          },
        })}
      />
      <ErrorP>{errors.email?.message}</ErrorP>

      <div className="passworDiv">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />

        <button
          type="button"
          className="showHidePassword"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <IoEyeOff /> : <IoEyeSharp />}
        </button>
      </div>

      <ErrorP>{errors.password?.message}</ErrorP>

      <Link to={"/"}>Forgot Password?</Link>
      <button className="LoginBtn">Log in</button>
    </LoginForm>
  );
}

const ErrorP = styled.p`
  color: red;
  font-weight: bold;
  font-size: 15px;
`;

const LoginForm = styled.form`
  display: flex;
  gap: 15px;
  flex-direction: column;

  input {
    padding: 13px 5px;
    border-radius: 5px;
    font-size: 15px;
    font-weight: bold;
    border: none;
    width: 100%;
    outline: 1px solid gray;
    color: black;
    &:focus {
      outline: 2px solid black;
    }
  }

  a {
    text-decoration: none;
    font-size: 12px;
    font-weight: bold;
    color: gray;
    transition: 0.3s ease;

    &:hover {
      color: black;
    }
  }

  .passworDiv {
    position: relative;
    width: 100%;
    button {
      position: absolute;
      padding: 10px;
      right: 1px;
      border: none;
      background-color: transparent;
      cursor: pointer;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .LoginBtn {
    padding: 10px;
    border-radius: 5px;
    background-color: transparent;
    font-size: 17px;
    letter-spacing: 2.5px;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid gray;
    color: gray;
    transition: 0.3s ease;

    &:hover {
      border: 1px solid black;
      color: black;
    }
  }
`;
