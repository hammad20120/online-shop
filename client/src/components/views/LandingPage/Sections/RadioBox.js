import React, { useState } from "react";
import { Collapse, Radio } from "antd";
import { price } from "./Datas";
const { Panel } = Collapse;

export default function RadioBox(props) {
  const [Value, setValue] = useState(0);

  const handleChange = (e) => {
    setValue(e.target.value);
    props.handleFilters(e.target.value);
  };

  const renderRadioBox = () =>
    price.map((val) => (
      <Radio key={val._id} value={`${val._id}`}>
        {val.name}
      </Radio>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price" key="1">
          <Radio.Group onChange={handleChange} value={Value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}
