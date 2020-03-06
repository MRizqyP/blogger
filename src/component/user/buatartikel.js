import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { FormGroup } from "reactstrap";
const Registerartikel = props => {
  const { register, watch, errors, getValues, handleSubmit } = useForm();

  const [redirects, setRedirect] = useState({
    redirect: false
  });
  const [result, setResult] = useState({ status: "", url: "" });

  const [form, setValues] = useState({
    judul: "",
    isi: "",
    id: "",
    img: ""
  });

  const urlimag = result.url;
  console.log(urlimag);

  const handleeSubmit = async e => {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );
    if (result.url !== "") {
      try {
        const result = await axios({
          method: "POST",
          url: "http://localhost:8085/buatartikel",
          data: {
            judul: form.judul,
            isi: form.isi,
            id: token.token.id,
            img: "http://localhost:8085/" + urlimag
          },
          headers: {
            Authorization: token.token.accessToken
          }
        });
        if (result.status === 201) {
          alert("Data inserted sucessfuly!");
          if (token.token.admin === true) {
            window.location.replace("/listartikel");
          } else {
            window.location.replace("/dashboard");
          }
        } else {
          throw new Error("Failed to insert data!");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Anda Harus Submit Gambar Terlebih Dahulu");
    }
  };
  //   console.log(token.token.id);

  if (redirects.redirect === true) {
    return <Redirect to={"/dashboard"} />;
  }

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const updateFile = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0])
    });
  };

  const handleeeSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    if (form.file1 !== "" && form.title !== "") {
      data.append("title", form.title);
      data.append("file", form.file1);
      try {
        const result = await axios.post("http://localhost:8085/upload", data);
        setResult(result.data);
      } catch (err) {
        setResult(result.status);
        // console.log(err);
      }
    } else {
      alert("Please fill all the required field");
    }
  };
  // console.log(result.url);

  return (
    <div class="limiter">
      <div class="container-table100">
        <formartikel onSubmit={e => e.preventDefault()}>
          <div class="form-group">
            <label for="judul">Title</label>
            <input
              name="judul"
              value={form.judul}
              type="text"
              class="form-control"
              onChange={updateField}
              ref={register({
                required: "Required"
              })}
            />
          </div>

          <div class="form-group">
            <label for="isi">Content</label>
            <textarea
              name="isi"
              value={form.isi}
              class="form-control"
              rows="15"
              ref={register({
                required: "Required"
              })}
              onChange={updateField}
            ></textarea>
          </div>
          <form onSubmit={handleeeSubmit}>
            <FormGroup>
              <label htmlFor="file1">File</label>
              <input
                type="file"
                id="file1"
                name="file1"
                className="form-control-file"
                onChange={updateFile}
              />
            </FormGroup>

            <button className="btn">Submit Picture</button>
          </form>
          <div className="col-md-6">
            <h5>Image Preview Before Upload</h5>
            {form.file1 !== "" ? <img src={form.preview} /> : ""}
          </div>

          <button
            type="submit"
            class="btnartikel"
            onClick={handleSubmit(handleeSubmit)}
          >
            Submit
          </button>
        </formartikel>
      </div>
    </div>
  );
};

export default Registerartikel;
