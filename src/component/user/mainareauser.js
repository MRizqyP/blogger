import React, { useMemo, useState } from "react";
import axios from "axios";

export default function Mainareauser() {
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );

  const [data, setData] = useState([]);
  const id = token.token.id;
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://localhost:8085/api/user/" + id,
        headers: {
          Authorization: token.token.accessToken
        }
      });
      setData(result.data.user);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }, []);
  console.log(data);
  return data.map((data, id) => {
    if (data.admin === true) {
      return (
        <section class="site-banner">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-12 site-title">
                <h3 class="title-text"> Hey</h3>
                <h1 class="title-text text-uppercase ">Blogger</h1>
                <h4 class="title-text text-uppercase ">{data.name}(ADMIN)</h4>
                <div class="site-buttons">
                  <div class="d-flex flex-row flex-wrap"></div>
                </div>
              </div>
              <div class="col-lg-6 col-md-12 banner-image">
                <img
                  src="./blogging.png"
                  class="img-fluid"
                  alt="banner-img"
                ></img>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section class="site-banner">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-12 site-title">
                <h3 class="title-text"> Hey</h3>
                <h1 class="title-text text-uppercase ">Blogger</h1>
                <h4 class="title-text text-uppercase ">{data.name}</h4>
                <div class="site-buttons">
                  <div class="d-flex flex-row flex-wrap"></div>
                </div>
              </div>
              <div class="col-lg-6 col-md-12 banner-image">
                <img
                  src="./blogging.png"
                  class="img-fluid"
                  alt="banner-img"
                ></img>
              </div>
            </div>
          </div>
        </section>
      );
    }
  });
}
