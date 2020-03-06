import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

function Dashboard() {
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [result, setResult] = useState("");

  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://localhost:8085/artikel"
      });
      setData(result.data.artikel);
      setFiltered(result.data.artikel);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }, []);
  console.log(data);

  useEffect(() => {
    const results = filtered.filter(res =>
      res.judul.toLowerCase().includes(result)
    );
    setData(results);
  }, [result]);

  const onChange = e => {
    setResult(e.target.value);
  };

  const render = () => {
    return data.map((data, id) => {
      if (data.status === true) {
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
                    &nbsp;&nbsp;{" "}
                    {moment(data.createdAt).format("DD / MMMM / YYYY")}
                  </i>
                </span>
                <span>{data.komentars.length} Comments</span>
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
            </div>
            <hr />
          </div>
        );
      }
    });
  };

  const popularpost = () => {
    return data.map((data, id) => {
      if (data.status === true && data.komentars.length >= 1) {
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
                  <i class="fa fa-calendar">
                    &nbsp;&nbsp;{" "}
                    {moment(data.createdAt).format("DD / MMMM / YYYY")}
                  </i>
                </span>
                <span>{data.komentars.length} Comments</span>
              </div>
            </div>
            <div class="post-title">
              <a>{data.judul}</a>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div>
      <div class="limiter">
        <div>
          <section>
            <h2 class="mt-3">List Artikel </h2>
            <hr />
            <div class="site-content">
              <div class="posts">{render()}</div>

              <aside class="sidebar">
                <div>
                  <h2>Search</h2>
                  <form class="form-inline d-flex justify-content-center md-form form-sm active-purple active-purple-2 mt-5">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input
                      class="form-control form-control-sm ml-3 w-75"
                      type="text"
                      value={result}
                      onChange={onChange}
                      placeholder="Search"
                      aria-label="Search"
                    />
                  </form>
                </div>

                <div class="popular-artikel mt-5  ">
                  <h2>Popular Articel</h2>
                  {popularpost()}
                </div>
                <div class="newsletter">
                  <h2>Newsletter</h2>
                  <div class="form-element">
                    <input
                      type="text"
                      class="input-element"
                      placeholder="Email"
                    ></input>
                    <button class=" form-btn">Subscribe</button>
                  </div>
                </div>

                <h2 class="mt-5">Sosial Media</h2>
                <div class="to-social-follow mt-3">
                  <a href="#" class="fa fa-facebook" target="_blank"></a>
                  <a href="#" class="fa fa-twitter" target="_blank"></a>
                  <a href="#" class="fa fa-google" target="_blank"></a>
                  <a href="#" class="fa fa-linkedin" target="_blank"></a>
                  <a href="#" class="fa fa-youtube" target="_blank"></a>
                  <a href="#" class="fa fa-instagram" target="_blank"></a>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
