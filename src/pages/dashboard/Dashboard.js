import React from "react";
import "./Dashboard.css";
import UploadExcel from "../components/uploads/upload";
import { Carousel } from "react-bootstrap";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Footer from "../components/footer/Footer";

const Dashboard = () => {
  return (
    <div>
      <Carousel style={{ width: "100vw", height: "100vh" }}>
        <Carousel.Item>
          <div className="dashboard">
            <UploadExcel />
          </div>
          <Carousel.Caption>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                fontFamily: "cursive",
              }}
            >
              Import new data for analysis
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="dashboard">
            <UploadExcel />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="dashboard">
            <UploadExcel />
          </div>
        </Carousel.Item>
      </Carousel>
      <br />
      <br />
      <ListGroup variant="flush" className="history" style={{ width: "100vw" }}>
        <ListGroupItem className="history-item" style={{ textAlign: "center" }}>Item 1</ListGroupItem>
        <ListGroupItem className="history-item" style={{ textAlign: "center" }}>Item 2</ListGroupItem>
        <ListGroupItem className="history-item" style={{ textAlign: "center" }}>Item 3</ListGroupItem>
      </ListGroup>
      <br />
      <Footer />
    </div>
  );
};

export default Dashboard;
