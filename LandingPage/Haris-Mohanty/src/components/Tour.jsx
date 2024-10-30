import React from "react";
import "./TourStyles.css";
import TourData from "./TourData";
import Tour1 from "../Assets/sydney.png";
import Tour2 from "../Assets/rome.png";
import Tour3 from "../Assets/abu.png";

const Tour = () => {
  return (
    <>
      <div className="tour d-flex justify-conetnt-center align-items-center flex-column">
        <h1 className="fw-bold">Recent Tours</h1>
        <p className="font-sofias tagline">
          Unveiling Our World, One Journey at a Time!
        </p>
        <div className="tourCard">
          <TourData
            image={Tour1}
            heading="Sydney Sojourns"
            text="Explore Sydney's iconic landmarks, stunning beaches, and vibrant culture on our unforgettable guided tour."
            button="Book Now"
          />
          <TourData
            image={Tour2}
            heading="Rome Unveiled"
            text="Discover ancient wonders, Renaissance art, and vibrant culture with us in our unforgettable Rome tour."
            button="Book Now"
          />
          <TourData
            image={Tour3}
            heading="Abu Dhabi Allure"
            text="Experience the irresistible allure of Abu Dhabi: a blend of opulence, culture, and desert mystique in one unforgettable tour."
            button="Book Now"
          />
        </div>
      </div>
    </>
  );
};

export default Tour;
