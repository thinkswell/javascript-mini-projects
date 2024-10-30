import React from "react";
import "./Destination.css";
import parisPic1 from "../Assets/paris1.jpg";
import parisPic2 from "../Assets/paris2.png";
import italy1 from "../Assets/italy1.png";
import italy2 from "../Assets/italy2.png";
import maldivs1 from "../Assets/maldivs1.png";
import maldivs2 from "../Assets/maldivs2.png";
import DestinationData from "./DestinationData";

const Destination = () => {
  return (
    <>
      <div className="destination d-flex justify-conetnt-center align-items-center flex-column">
        <h1 className="fw-bold">Popular Destination</h1>
        <p className="font-sofias tagline">
          Where adventure awaits at every turn!
        </p>
        <DestinationData
          heading="Paris, France: The City of Love!"
          text="Experience the timeless allure of Paris, France. Walk along the
            romantic Seine River, under the iconic Eiffel Tower's shadow.
            Immerse yourself in world-renowned art at the Louvre Museum and be
            captivated by the charm of Montmartre's winding streets. Indulge in
            exquisite cuisine at cozy bistros, savoring delicate pastries and
            rich wines. From the historical grandeur of Notre-Dame Cathedral to
            the chic boutiques along the Champs-Élysées, Paris seamlessly blends
            history, culture, and sophistication. Discover the magic of the City
            of Love as you explore its cobblestone lanes, witness unforgettable
            sunsets over the cityscape, and create cherished memories that will
            linger forever."
          img1={parisPic1}
          img2={parisPic2}
          className="first-desc"
          button="Set Your Plan!"
        />
        <DestinationData
          heading="Venice, Italy: The Floating City!"
          text="Explore the enchanting wonders of Venice, Italy, known as The Floating City. Nestled amidst a network of picturesque canals, Venice offers a unique and romantic escape. Glide along the iconic Grand Canal in a gondola, marvel at the intricate architecture of St. Mark's Basilica, and lose yourself in the narrow alleyways, discovering hidden gems at every turn. Savor delectable Italian cuisine in charming trattorias and sip on fine wines along the historic Rialto Bridge. Venice, with its rich history, art, and culture, is a timeless destination that promises unforgettable experiences. Immerse yourself in this captivating city, where every corner unveils a piece of its magical story."
          img1={italy1}
          img2={italy2}
          className="first-desc-reverse"
          button="Set Your Plan!"
        />
        <DestinationData
          heading="Maldives: The Sunny Side of Life!"
          text="Embark on a journey to the Maldives, where nature's wonders and luxury seamlessly intertwine. Discover a world of unparalleled beauty and serenity as you immerse yourself in the turquoise embrace of the Indian Ocean. Whether you seek romantic seclusion, thrilling water sports, or simply to unwind on sun-kissed beaches, the Maldives offers it all. Picture yourself in overwater bungalows, where each moment is a dreamlike escape. Dive into vibrant coral gardens, explore underwater worlds, and indulge in the finest cuisine with your toes in the sand. The Maldives beckons, promising an unforgettable experience where your every desire is met in this tropical paradise."
          img1={maldivs1}
          img2={maldivs2}
          className="first-desc"
          button="Set Your Plan!"
        />
      </div>
    </>
  );
};

export default Destination;
