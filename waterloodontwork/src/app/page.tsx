"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import Card from "./components/card";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // Center the buttons
  gap: 20px; // Gap between buttons
  position: absolute;
  bottom: 10%;
  width: 100%;
`;


const SwipeButton = styled.button<{ color: string }>`
  background-color: ${props => props.color};
  border: none;
  border-radius: 50%;
  width: 50px;  // Adjusted size
  height: 50px; // Adjusted size
  cursor: pointer;
  outline: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


const users = [
  {
    name: "John Doe",
    image: "/path/to/john-image.jpg",
  },
  {
    name: "Jane Smith",
    image: "/path/to/jane-image.jpg",
  },
  // ... add more users
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<number | undefined>();

  const onSwiped = (direction: string) => {
    if (direction === "Left" || direction === "Right") {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };
  const handleSwipe = (direction: "Left" | "Right") => {
    setExitDirection(direction === "Left" ? -1 : 1);
    setTimeout(() => {
      onSwiped(direction);
      setExitDirection(undefined);
    }, 500);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "relative",
        backgroundColor: "#f5f5f5",
      }}
    >
      {currentIndex < users.length && (
        <Card
          key={currentIndex}
          name={users[currentIndex].name}
          image={users[currentIndex].image}
          onSwiped={handleSwipe}
          exitDirection={exitDirection}
        />
      )}

      <ButtonContainer>
        <SwipeButton color="red" onClick={() => handleSwipe("Left")}>
          ❌
        </SwipeButton>
        <SwipeButton color="green" onClick={() => handleSwipe("Right")}>
          ❤️
        </SwipeButton>
      </ButtonContainer>
    </div>
  );
};

export default Home;
