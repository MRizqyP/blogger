// import "./main";
import "./style2.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Register = props => {
  const { register, watch, errors, getValues, handleSubmit } = useForm();

  const [redirects, setRedirect] = useState({
    redirect: false
  });

  const untukSubmitt = async data => {
    try {
      //   console.log(data);

      axios
        .post("http://localhost:8085/register", {
          name: data.nama,
          username: data.username,
          email: data.email,
          password: data.password
        })
        .then(alert("Regis Berhasil"));
      console.log(data);
      setRedirect({ redirect: true });
    } catch (err) {
      console.log(err);
    }
  };

  //   console.log(data);

  if (redirects.redirect === true) {
    return <Redirect to={"/login"} />;
  }

  return (
    <div>
      <img class="wave" src="img/login/wave.png" />
      <div class="containerlog">
        <div class="img">
          <img src="img/login/happy.svg" />
        </div>
        <div class="register-content">
          <form onSubmit={e => e.preventDefault()}>
            <h2 class="title">Formulir Pendaftaran</h2>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="namalengkap">Nama Panggilan</label>
                <input
                  name="nama"
                  type="text"
                  class="form-control"
                  ref={register({
                    required: "Required",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Tidak di perbolehkan menggunakan angka"
                    }
                  })}
                />
              </div>
              <div class="form-group col-md-6">
                <label for="usernmae">Username</label>
                <input
                  name="username"
                  type="text"
                  class="form-control"
                  ref={register({
                    required: "Required",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Tidak di perbolehkan menggunakan angka"
                    }
                  })}
                />
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                name="email"
                type="text"
                class="form-control"
                ref={register({
                  required: "Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address"
                  }
                })}
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                name="password"
                type="password"
                class="form-control"
                ref={register({
                  required: "Required",
                  minLength: 8
                })}
              />
            </div>
            <div class="form-group mb-5">
              <label for="cpassword">Confirm Password</label>
              <input
                name="cpassword"
                type="password"
                class="form-control"
                ref={register({
                  required: "Required",
                  validate: value => value === getValues().password
                })}
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={handleSubmit(untukSubmitt)}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <script type="text/javascript" src="./main.js"></script>
    </div>
  );
};
export default Register;
