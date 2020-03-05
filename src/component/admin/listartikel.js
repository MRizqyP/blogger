import React, { useState, useMemo } from "react";
import axios from "axios";
import moment from "moment";
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
        url: "http://localhost:8085/artikel",
        headers: {
          Authorization: token.token.accessToken
        }
      });
      setData(result.data.artikel);
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
      url: `http://localhost:8085/artikel/${no}`,
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
      url: `http://localhost:8085/artikel/${no}`,
      headers: {
        Authorization: token.token.accessToken
      },
      data: {
        status: true
      }
    });
    window.location.reload("/userlist");
  }
  async function hapus(no) {
    await axios({
      method: "delete",
      url: `http://localhost:8085/artikel`,
      headers: {
        Authorization: token.token.accessToken
      },
      data: {
        id_artikel: no
      }
    });
    window.location.reload("/listartikel");
  }

  function pindah(no) {
    window.location.replace("/viewartikel/" + no);
  }

  let no = 1;
  const render = () => {
    return data.map((data, id) => {
      return (
        <tr key={id}>
          <td text-align="center">{no++}</td>
          <td class="text-uppercase">{data.user.name}</td>
          <td>{data.judul}</td>
          <td> {moment(data.createdAt).format("DD / MMMM / YYYY")}</td>
          <td>
            <center>
              {(() => {
                if (data.status === true) {
                  return (
                    <p>
                      <input
                        type="submit"
                        class="btnblock"
                        value="HIDE"
                        onClick={() => block(data.id_artikel)}
                      />
                    </p>
                  );
                } else if (data.status === false) {
                  return (
                    <p>
                      <input
                        type="submit"
                        class="btnactive"
                        value="PUBLISH"
                        onClick={() => active(data.id_artikel)}
                      />
                    </p>
                  );
                }
              })()}
            </center>
          </td>
          <td>
            <center>
              <button
                type="button"
                class="btnview btn-warning"
                onClick={() => pindah(data.id_artikel)}
              >
                <i class="fa fa-eye"></i>
              </button>
            </center>
          </td>
          <td>
            <button
              type="button"
              class="btnhapus btn-warning"
              onClick={() => hapus(data.id_artikel)}
            >
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div class="limiter">
        <center>
          <p>
            <h2>List Artikel</h2>
          </p>
        </center>
        <div class="container-table100">
          <div class="wrap-table100">
            <div class="table100">
              <table>
                <thead>
                  <tr class="table100-head">
                    <th>No</th>
                    <th class="column2">Publish Name</th>
                    <th class="column3">Title</th>
                    <th class="column3">Publish Date</th>
                    <th class="column2">Status</th>
                    <th>View</th>
                    <th class="column4">Hapus</th>
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
