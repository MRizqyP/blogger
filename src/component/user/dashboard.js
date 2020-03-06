import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import USERCONTENT from "./usercontent";
import axios from "axios";
import moment from "moment";

function Dashboard() {
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );

  const [data, setData] = useState([]);
  const id = token.token.id;
  useMemo(() => {
    const id = token.token.id;
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://localhost:8085/artikel/" + id,
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

  const render = () => {
    return data.map((data, id) => {
      let total_komentar = data.komentars.length;
      return (
        <div class="post-content" key={id}>
          <div class="post-image">
            <div>
              <center>
                <img src={data.img} alt="" class="img"></img>
              </center>
            </div>
            <div class="post-info flex-row">
              <span>
                <i class="fa fa-user">&nbsp;&nbsp;{data.user.name}</i>
              </span>

              <span>
                <i class="fa fa-calendar">
                  &nbsp;&nbsp;
                  {moment(data.createdAt).format("DD / MMMM / YYYY")}
                </i>
              </span>
              <span>{total_komentar} Comment</span>
              <span>
                {(() => {
                  if (data.status === true) {
                    return <span> AKTIF</span>;
                  } else {
                    return <span> TIDAK AKTIF </span>;
                  }
                })()}
              </span>
            </div>
          </div>
          <div class="post-title">
            <a>{data.judul}</a>
            <p>{data.isiartikel.substr(0, 250) + " ..."}</p>
            <Link to={"/viewartikel/" + data.id_artikel}>
              <button class="btn post-btn">
                Read More <i class="fa fa-arrow-right"></i>
              </button>
            </Link>
            <button
              type="button"
              class="btnhapus"
              onClick={() => hapus(data.id_artikel)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div class="limiter">
        <Link to="/buatartikel">
          <button class="btnartikel"> Create Artikel</button>
        </Link>

        <div>
          <section>
            <div class="site-content">
              <div class="posts">
                <hr />
                <p> List Artikel</p>
                <hr />

                {render()}
              </div>

              {/* <aside class="sidebar">
              <h1>Sidebar</h1>
            </aside> */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
