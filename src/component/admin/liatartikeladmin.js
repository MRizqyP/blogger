import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import USERCONTENT from "./usercontent";
import axios from "axios";

function Dashboard(props) {
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );

  const [data, setData] = useState([]);
  const id = props.match.params.id;
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://localhost:8085/artikell/" + id,
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
  console.log(id);

  const render = () => {
    return data.map((data, id) => {
      return (
        <div class="post-content" key={id}>
          <div class="post-image">
            <h1>{data.judul}</h1>
            <h6> Kinyot Blogging - {data.createdAt} </h6>

            <hr />
            <div>
              <center>
                <img src="/gambar.jpg" alt="" class="img"></img>
              </center>
            </div>
            {/* <div class="post-info flex-row">
              <span>
                <i class="fa fa-user">&nbsp;&nbsp;Admin</i>
              </span>

              <span>
                <i class="fa fa-calendar">&nbsp;&nbsp;Januari 19, 2019</i>
              </span>
              <span>2 Comments</span>
            </div> */}
          </div>
          <div class="post-title">
            <p>{data.isiartikel}</p>edan lah
          </div>
          <div class="row">
            <h3>Status Upload Snipp</h3>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="widget-area no-padding blank">
                <div class="status-upload">
                  <form>
                    <textarea placeholder="What are you doing right now?"></textarea>

                    <button type="submit" class="btn btn-success green">
                      <i class="fa fa-share"></i> Share
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div class="limiter">
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
