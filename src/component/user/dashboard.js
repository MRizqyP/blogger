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

  const render = () => {
    return data.map((data, id) => {
      let total_komentar = data.komentars.length;
      return (
        <div class="post-content" key={id}>
          <hr />
          <p> List Artikel</p>
          <hr />
          <div class="post-image">
            <div>
              <center>
                <img src="./img/gambar.jpg" alt="" class="img"></img>
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
            <p>{data.isiartikel}</p>
            <Link to={"/viewartikel/" + data.id_artikel}>
              <button class="btn post-btn">
                Read More <i class="fa fa-arrow-right"></i>
              </button>
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div class="limiter">
        <Link to="/buatartikel">
          <button class="btnartikel"> Buat Artikel</button>
        </Link>

        <div>
          <section>
            <div class="site-content">
              <div class="posts">{render()}</div>

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
