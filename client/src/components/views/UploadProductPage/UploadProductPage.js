import React, { useState } from "react";
import { Typography, Button, Form, Input, message, Icon } from "antd";

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

export default function UploadProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [continentValue, setContinentValue] = useState(1);

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Travel Product</Title>
      </div>

      <Form onSubmit>
        {/* Drop Zone*/}
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
        <Button onClick>Submit</Button>
      </Form>
    </div>
  );
}
