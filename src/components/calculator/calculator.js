import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const CalculatorCard = styled.div`
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Screen = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 24px;
  text-align: right;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Button = styled.button`
  padding: 15px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background-color: #4260B5;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color:rgb(2, 60, 122);
  }
`;

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculation = async () => {
    try {
      const response = await axios.get("http://localhost:2000/calculate", {
        params: { equation: input },
      });

      if (response.data.result !== undefined && response.data.result !== null) {
        setInput(response.data.result.toString());
      } else {
        alert("Invalid equation");
      }
    } catch (error) {
      console.error("Error calculating result", error);
      alert("Error calculating the result.");
    }
  };

  return (
    <CalculatorContainer>
      <CalculatorCard>
        <Title>Python Calculator</Title>
        <Screen type="text" value={input} readOnly placeholder="Enter your calculation" />
        <ButtonGrid>
          <Button onClick={() => handleButtonClick("1")}>1</Button>
          <Button onClick={() => handleButtonClick("2")}>2</Button>
          <Button onClick={() => handleButtonClick("3")}>3</Button>
          <Button onClick={() => handleButtonClick("+")}>+</Button>
          <Button onClick={() => handleButtonClick("4")}>4</Button>
          <Button onClick={() => handleButtonClick("5")}>5</Button>
          <Button onClick={() => handleButtonClick("6")}>6</Button>
          <Button onClick={() => handleButtonClick("-")}>-</Button>
          <Button onClick={() => handleButtonClick("7")}>7</Button>
          <Button onClick={() => handleButtonClick("8")}>8</Button>
          <Button onClick={() => handleButtonClick("9")}>9</Button>
          <Button onClick={() => handleButtonClick("*")}>x</Button>
          <Button onClick={() => handleButtonClick("0")}>0</Button>
          <Button onClick={() => handleButtonClick("/")}>/</Button>
          <Button onClick={handleCalculation}>=</Button>
          <Button onClick={handleBackspace}>←</Button>
          <Button onClick={handleClear}>CLR</Button>
        </ButtonGrid>
      </CalculatorCard>
    </CalculatorContainer>
  );
};

export default Calculator;
