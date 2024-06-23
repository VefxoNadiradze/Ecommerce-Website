import styled from "styled-components";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IRegister {
  email: string;
  name: string;
  phoneNumber: number;
  password: string;
  Repeatpassword: string;
}

export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRPassword, setShowRPassword] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRegister>();

  return (
    <RegisterForm onSubmit={handleSubmit((data) => console.log(data))}>
      {/* email inp */}
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

      {/* name inp */}
      <input
        type="text"
        placeholder="Full Name"
        {...register("name", { required: "Full Name is required" })}
      />
      <ErrorP>{errors.name?.message}</ErrorP>

      {/* phone inp */}
      <input
        className="phoneNumber"
        type="number"
        placeholder="Phone Number"
        {...register("phoneNumber", {
          required: "Phone Number is required",
        })}
      />
      <ErrorP>{errors.phoneNumber?.message}</ErrorP>

      <div className="passwordDiv">
        <div className="passwordInputPar">
          {/* password inp */}
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "min length is 5",
              },
            })}
          />
          <button
            type="button"
            className="showHidePassword"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOff /> : <IoEyeSharp />}
          </button>
        </div>
        <div className="repeatPasswordInputPar">
          {/* show password inp */}
          <input
            type={showRPassword ? "text" : "password"}
            placeholder="Repeat Password"
            {...register("Repeatpassword", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "min length is 5",
              },
            })}
          />

          <button
            type="button"
            className="showHidePassword"
            onClick={() => setShowRPassword(!showRPassword)}
          >
            {showRPassword ? <IoEyeOff /> : <IoEyeSharp />}
          </button>
        </div>
      </div>
      <div className="passwordErrors">
        <ErrorP>{errors.password?.message}</ErrorP>
        <ErrorP>{errors.Repeatpassword?.message}</ErrorP>
      </div>

      <button className="createAccBtn">Create Account</button>
    </RegisterForm>
  );
}

const ErrorP = styled.p`
  color: red;
  font-weight: bold;
  font-size: 15px;
`;

const RegisterForm = styled.form`
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

  .passwordErrors {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .phoneNumber:focus::placeholder {
  }

  .passwordDiv {
    display: flex;
    align-items: center;
    gap: 15px;

    .passwordInputPar {
      position: relative;
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

    .repeatPasswordInputPar {
      position: relative;
      button {
        position: absolute;
        padding: 5px;
        right: 1px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .createAccBtn {
    padding: 10px;
    border-radius: 5px;
    background-color: transparent;
    font-size: 17px;
    letter-spacing: 2px;
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
