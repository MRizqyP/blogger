import React, { useState } from "react";
import "./main";
import "./style2.css";
import axios from "axios";
import createPersistedState from "@plq/use-persisted-state";
import { useForm } from "react-hook-form";
export default function Login() {
  const defaultValues = {
    username: "",
    password: ""
  };

  const { register, errors, reset } = useForm({
    defaultValues
  });

  const [useQwe] = createPersistedState("token", window.sessionStorage);
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [tokenss, getToken] = useQwe("token", "");

  const [admin, setAdmin] = useState({
    redirect: false
  });

  const [status, setStatus] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8085/login", {
        username: form.username,
        password: form.password
      });
      getToken(result.data);
      setAdmin(result.data.admin);
      setStatus(result.status);
      if (result.status === 200) {
        alert("Berhasil Login");
      }
      // const tokens = JSON.parse(
      //   sessionStorage.getItem("persisted_state_hook:token")
      // );
    } catch (err) {
      setStatus(err.response.status);
      if (err.response.status === 404) {
        alert("Username Tidak Ada");
      } else if (err.response.status === 401) {
        alert("Password salah");
      } else {
        alert("Akun ada di block Hubungi Admin !!");
      }
    }
    // console.log(result.data);
  };

  console.log(tokenss);

  if (admin === true) {
    // window.location.replace("/admin");
    window.location.replace("/adminpage");
  } else if (admin === false) {
    window.location.replace("/");
  }

  const UpdateField = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <img class="wave" src="img/login/wave.png" />
      <div class="container">
        <div class="img">
          <img src="img/login/signinn.svg" />
        </div>
        <div class="login-content">
          <form onSubmit={handleSubmit}>
            <img class="profile" src="img/login/pic.svg" />
            <h2 class="title">Welcome</h2>
            <div class="input-div one focus">
              <div class="i">
                <i class="fa fa-user"></i>
              </div>
              <div class="div">
                <h5>Username</h5>
                <input
                  name="username"
                  type="text"
                  class="input"
                  placeholder="Username"
                  value={form.username}
                  ref={register({
                    required: "Required"
                  })}
                  onChange={UpdateField}
                />
              </div>
            </div>
            <div class="input-div pass">
              <div class="i">
                <i class="fa fa-lock"></i>
              </div>
              <div class="div">
                <h5>Password</h5>
                <input
                  name="password"
                  type="password"
                  class="input"
                  placeholder="Password"
                  value={form.password}
                  ref={register({
                    required: "Required"
                  })}
                  onChange={UpdateField}
                />
              </div>
            </div>
            <a href="#">Forgot Password?</a>
            <input
              type="submit"
              class="btn"
              value="Login"
              onClick={() => {
                reset(defaultValues);
              }}
            />
          </form>
        </div>
      </div>
      <script type="text/javascript" src="./main.js"></script>
    </div>
  );
}
