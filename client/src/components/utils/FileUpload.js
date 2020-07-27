import React, { useState } from "react";
import DropZone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";
import path from "path";

export default function FileUpload(props) {
  const [images, setImages] = useState([]);

  const onDrop = (files) => {
    if (files.length === 0) {
      alert("Invalid File");
      return;
    }
    let formdata = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formdata.append("file", files[0]);

    axios.post("/api/product/uploadImage", formdata, config).then((res) => {
      if (res.data.success) {
        setImages([...images, res.data.image]);
        props.refreshFunction([...images, res.data.image]);
      } else {
        alert("Failed to save image in server");
      }
    });
  };

  const onDelete = (imageToDel) => {
    setImages(
      images.filter((image) => {
        return image != imageToDel;
      })
    );

    props.refreshFunction(
      images.filter((image) => {
        return image != imageToDel;
      })
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <DropZone onDrop={onDrop} multiple={false} maxSize={90909090}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </DropZone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {images.map((image, index) => (
          <div key={index} onClick={() => onDelete(image)}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240p" }}
              src={`http://localhost:5000/${image}`}
              alt={`productImg-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
