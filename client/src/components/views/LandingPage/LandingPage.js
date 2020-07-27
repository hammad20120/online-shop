import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Row, Col, Card } from "antd";

import ImageSlider from "../../utils/ImageSlider";
const { Meta } = Card;

function LandingPage(props) {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    axios.post("/api/product/getProducts").then((res) => {
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        alert("Failed to fetch product");
      }
    });
  }, []);

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card hoverable={true} cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Lets Travel Anywhere <Icon type="rocket" />{" "}
        </h2>
      </div>

      {/* Filter */}
      {/* Search */}

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

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>Load More..</button>
      </div>
    </div>
  );
}

export default LandingPage;
