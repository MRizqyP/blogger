import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import axios from "axios";
const Registerartikel = props => {
  const { register, watch, errors, getValues, handleSubmit } = useForm();

  const [redirects, setRedirect] = useState({
    redirect: false
  });
  const [form, setValues] = useState({
    judul: "",
    isi: "",
    id: ""
  });

  const handleeSubmit = async e => {
    const token = JSON.parse(
      sessionStorage.getItem("persisted_state_hook:token")
    );

    try {
      const result = await axios({
        method: "POST",
        url: "http://localhost:8085/buatartikel",
        data: {
          judul: form.judul,
          isi: form.isi,
          id: token.token.id
        },
        headers: {
          Authorization: token.token.accessToken
        }
      });
      if (result.status === 201) {
        alert("Data inserted sucessfuly!");
        window.location.replace("/dashboard");
      } else {
        throw new Error("Failed to insert data!");
      }
    } catch (err) {
      console.log(err);
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

  return (
    <div class="limiter">
      <div class="container-table100">
        <formartikel onSubmit={e => e.preventDefault()}>
          <div class="form-group">
            <label for="judul">Judul</label>
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
            <label for="isi">Isi Artikel</label>
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
