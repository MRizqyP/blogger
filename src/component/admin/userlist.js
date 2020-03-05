import React, { useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "../assets/css/bootstrap.min.css";
import "./bootstrap.min.css";
import "./main.css";
import "./util.css";
export default function Userlist() {
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );
  const [data, setData] = useState([]);
  const [role, setRole] = useState([]);
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://localhost:8085/api/users",
        headers: {
          Authorization: token.token.accessToken
        }
      });
      setData(result.data.user);
      setRole(result.data.user.roles);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }, []);
  console.log(data);

  async function block(no) {
    await axios({
      method: "put",
      url: `http://localhost:8085/blockuser/${no}`,
      headers: {
        Authorization: token.token.accessToken
      },
      data: {
        status: false
      }
    });
    window.location.reload("/userlist");
  }

  async function active(no) {
    await axios({
      method: "put",
      url: `http://localhost:8085/blockuser/${no}`,
      headers: {
        Authorization: token.token.accessToken
      },
      data: {
        status: true
      }
    });
    window.location.reload("/userlist");
  }

  let no = 1;
  const render = () => {
    return data.map((data, id) => {
      if (data.admin === false) {
        return (
          <tr key={id}>
            <td text-align="center">{no++}</td>
            <td class="text-uppercase">{data.name}</td>
            <td class="text-uppercase">{data.username}</td>
            <td>{data.email}</td>
            <td>
              <center>
                {(() => {
                  if (data.status === true) {
                    return (
                      <p>
                        <input
                          type="submit"
                          class="btnblock"
                          value="BLOCK"
                          onClick={() => block(data.id_user)}
                        />
                      </p>
                    );
                  } else if (data.status === false) {
                    return (
                      <p>
                        <input
                          type="submit"
                          class="btnactive"
                          value="ACTIVE"
                          onClick={() => active(data.id_user)}
                        />
                      </p>
                    );
                  }
                })()}
              </center>
            </td>
          </tr>
        );
      }
    });
  };

  return (
    <div>
      <center>
        <p>
          <h2>List User</h2>
        </p>
      </center>
      <div class="limiter">
        <div class="container-table100">
          <div class="wrap-table100">
            <div class="table100">
              <table>
                <thead>
                  <tr class="table100-head">
                    <th class="column1">No</th>
                    <th class="column2">Nama</th>
                    <th class="column3">Username</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>{render()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
