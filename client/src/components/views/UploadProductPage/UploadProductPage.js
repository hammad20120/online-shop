import React, { useState } from "react";
import { Typography, Button, Form, Input, message, Icon } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antartica" },
];

export default function UploadProductPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [continentValue, setContinentValue] = useState(1);

  const [images, setImages] = useState([]);

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !price || !images || !continentValue) {
      alert("Fill all values");
    }

    const variables = {
      writer: props.user.userData._id,
      title,
      description,
      price,
      images,
      continents: continentValue,
    };

    Axios.post("/api/product/uploadProduct", variables)
      .then((res) => {
        if (res.data.success) {
          alert("Product Uploaded!");
          props.history.push("/");
        } else {
          alert("Failed to upload product");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Travel Product</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* Drop Zone*/}

        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />

        <label>Title</label>
        <Input onChange={(e) => setTitle(e.target.value)} value={title} />
        <br />
        <br />

        <label>Description</label>
        <TextArea
          onChange={(e) => setDescription(e.target.value)}
          valu={description}
        />
        <br />
        <br />

        <label>Price($)</label>
        <Input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          type="number"
        />

        <select onChange={(e) => setContinentValue(e.target.value)}>
          {Continents.map((continent) => (
            <option key={continent.key} value={continent.key}>
              {continent.value}
            </option>
          ))}
        </select>

        <br />
        <br />

        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}
