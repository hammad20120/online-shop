import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Row, Col, Card } from "antd";

import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";

import { continents, price } from "./Sections/Datas";

const { Meta } = Card;

function LandingPage(props) {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(variables);
  }, []);

  const renderCards = Products.map((product, index) => {
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <Card hoverable={true} cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters,
    };
    getProducts(variables);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;

    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const getProducts = (variables) => {
    axios.post("/api/product/getProducts", variables).then((res) => {
      if (res.data.success) {
        if (variables.loadMore) {
          setProducts([...Products, ...res.data.products]);
        } else {
          setProducts(res.data.products);
        }
        setPostSize(res.data.postSize);
      } else {
        alert("Failed to fetch product");
      }
    });
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;

    setSkip(skip);

    const variables = {
      skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(variables);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Lets Travel Anywhere <Icon type="rocket" />{" "}
        </h2>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          {/* Filter */}
          <CheckBox
            handleFilters={(filters) => handleFilters(filters, "continents")}
          />
        </Col>
        <Col lg={12} xs={24}>
          {/* Search */}
          <RadioBox
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row>

      <br />

      {Products.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>No post yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}

      <br />
      <br />

      {PostSize === Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={onLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
