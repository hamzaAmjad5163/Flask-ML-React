import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
`;

const CalculatorCard = styled.div`
  background-color: #456480;
  border: 1px solid #ccc;
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

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #DAE4E7;
  color: #000;
  font-size: 24px;
  text-align: right;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  min-height: 40px;
`;

const InputText = styled.div`
  text-align: left;
  font-size: 24px;
`;

const OutputText = styled.div`
  text-align: right;
  font-size: 24px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background-color: #A7AEBD;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(125, 130, 141);
  }
`;

const SpecialButton = styled(Button)`
  background-color: #DE9BA3;

  &:hover {
    background-color:rgb(194, 136, 143);
  }
`;

const Calculator = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const handleCalculation = async () => {
    try {
      const response = await axios.get("http://localhost:2000/calculate", {
        params: { equation: input },
      });

      if (response.data.result !== undefined && response.data.result !== null) {
        setOutput(response.data.result.toString());
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
        <Title style={{ color: "#DE9BA3" }}>Scientific Calculator</Title>
        <Screen>
          <InputText>{input}</InputText>
          <OutputText>{output}</OutputText>
        </Screen>
        <ButtonGrid>
          <SpecialButton onClick={handleClear}>AC</SpecialButton>
          <SpecialButton onClick={handleBackspace}>DEL</SpecialButton>
          <SpecialButton onClick={() => handleButtonClick("%")}>%</SpecialButton>
          <SpecialButton onClick={() => handleButtonClick("/")}>/</SpecialButton>
          <Button onClick={() => handleButtonClick("7")}>7</Button>
          <Button onClick={() => handleButtonClick("8")}>8</Button>
          <Button onClick={() => handleButtonClick("9")}>9</Button>
          <SpecialButton onClick={() => handleButtonClick("*")}>*</SpecialButton>
          <Button onClick={() => handleButtonClick("4")}>4</Button>
          <Button onClick={() => handleButtonClick("5")}>5</Button>
          <Button onClick={() => handleButtonClick("6")}>6</Button>
          <SpecialButton onClick={() => handleButtonClick("-")}>-</SpecialButton>
          <Button onClick={() => handleButtonClick("1")}>1</Button>
          <Button onClick={() => handleButtonClick("2")}>2</Button>
          <Button onClick={() => handleButtonClick("3")}>3</Button>
          <SpecialButton onClick={() => handleButtonClick("+")}>+</SpecialButton>
          <Button onClick={() => handleButtonClick("0")}>0</Button>
          <Button onClick={() => handleButtonClick("00")}>00</Button>
          <Button onClick={() => handleButtonClick(".")}>.</Button>
          <SpecialButton onClick={handleCalculation}>=</SpecialButton>
        </ButtonGrid>
      </CalculatorCard>
    </CalculatorContainer>
  );
};

export default Calculator;
