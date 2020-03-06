import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import moment from "moment";

function Dashboard(props) {
  const token = JSON.parse(
    sessionStorage.getItem("persisted_state_hook:token")
  );
  const { handleSubmit, register } = useForm();
  const [data, setData] = useState([]);

  const [komentar, setKomentar] = useState([]);
  const id = props.match.params.id;
  useMemo(() => {
    const fetchData = async () => {
      const result = await axios({
        method: "get",
        url: "http://localhost:8085/artikell/" + id
      });
      setData(result.data.artikel);
    };
    try {
      fetchData();
    } catch (err) {
      alert(err);
    }
  }, []);
  // console.log(data);

  const untukComment = async data => {
    if (token) {
      try {
        await axios
          .post("http://localhost:8085/komentar", {
            isikomentar: data.comment,
            id_user: token.token.id,
            id_artikel: id,
            status: true
          })
          .then(alert("Komentar berhasil"));
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Anda Perlu Login untuk Komentar");
    }
  };
  const render = () => {
    return data.map((data, id) => {
      return (
        <div class="post-content" key={id}>
          <div class="post-image">
            <h1>{data.judul}</h1>
            <h6 class="mt-2 mb-4">
              {" "}
              Kinyot Blogging -{" "}
              {moment(data.createdAt).format("DD / MMMM / YYYY")} By -
              {data.user.name}
            </h6>
            <hr />
            <div>
              <center>
                <img src={data.img} alt="" class="img"></img>
              </center>
            </div>
          </div>
          <div class="post-title">
            <p>{data.isiartikel}</p>
          </div>
          <hr />
          <div class="row">
            <h3 class="mt-3">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Leave A Comment
            </h3>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="widget-area no-padding blank">
                <div class="status-upload">
                  <form onSubmit={e => e.preventDefault()}>
                    <textarea
                      placeholder="What are you doing right now?"
                      name="comment"
                      type="text"
                      ref={register({
                        required: "Required",
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Tidak di perbolehkan menggunakan angka"
                        }
                      })}
                    ></textarea>

                    <button
                      type="submit"
                      class="btnshare"
                      onClick={handleSubmit(untukComment)}
                    >
                      <i class="fa fa-share"></i> Share
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {renderComment()}
        </div>
      );
    });
  };

  const renderComment = () => {
    return data.map(({ komentars }, id) => {
      return (
        <div class="row">
          <div class="col-md-8">
            <div class="page-header mb-5" key={id}>
              <h1>
                <small class="pull-right ">{komentars.length} comments</small>
                Comments
              </h1>
            </div>
            <div class="comments-list">
              <div class="media">
                <div class="media-body">
                  {komentars.map((komen, j) => {
                    if (komen.status === true) {
                      return (
                        <>
                          <h4 class="media-heading user_name mb-2" key={j}>
                            {komen.user.name}
                          </h4>
                          {komen.isikomen}
                          <p class="mb-3">
                            <small>
                              <a>Like</a> - Share
                              <a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                            </small>
                          </p>
                          <hr />
                        </>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  // };

  return (
    <div>
      <div class="limiter">
        <div>
          <section>
            <div class="site-content">
              <div class="posts">{render()}</div>

              {/* <aside class="sidebar">
                <h1>asdasd</h1>
              </aside> */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
