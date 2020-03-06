import React, { useState } from "react";
import axios from "axios";
import { FormGroup } from "reactstrap";

function Upload() {
  const [form, setValues] = useState({ file1: "", preview: null, title: "" });
  const [result, setResult] = useState({ status: "", url: "" });

  const handleSubmit = async e => {
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
  console.log(result);
  console.log(form);

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            onChange={updateField}
          />
        </FormGroup>
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
        <button className="btn btn-outline-info">Submit</button>
      </form>
      <hr />
      <div className="col-md-6 mt-2">
        <h5>Image Preview Before Upload</h5>
        {form.file1 !== "" ? <img src={form.preview} alt="profile" /> : ""}
      </div>

      <div className="col-md-6 mt-2">
        <h5>Image from server</h5>
        {result.url !== "" ? (
          <div>
            <h5>Image:</h5>
            <img src={`http://localhost:8085/${result.url}`} alt="profile" />
            <h5>Title: {result.title}</h5>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Upload;
