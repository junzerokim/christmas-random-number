import React, { useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: black;
`;

const StyledHeading = styled.h1`
  color: white;
  font-size: 300px;
`;

const StyledButton = styled.button`
  background-color: #4ca4f0;
  color: white;
  padding: 50px 100px;
  font-size: 50px;
  cursor: pointer;
  border: none;
  border-radius: 40px;
  margin-top: 100px;
`;

const StyledNumberList = styled.div`
  display: flex;
  margin-top: 20px;
  color: white;
`;

const StyledNumberItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin: 4px;
`;

const RandomNumberGenerator = () => {
  const [generateNumbers, setGenerateNumbers] = useState([]);
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());

  function generateRandomNumber() {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * 10) + 1;
    } while (generateNumbers.includes(newNumber));

    return newNumber;
  }

  const handleButtonClick = () => {
    const newNumber = generateRandomNumber();
    setRandomNumber(newNumber);
    setGenerateNumbers([...generateNumbers, newNumber].sort((a, b) => a - b));
  };

  return (
    <StyledContainer>
      <StyledHeading>{randomNumber}</StyledHeading>
      <StyledButton onClick={handleButtonClick}>새로고침</StyledButton>
      <StyledNumberList>
        {generateNumbers.map((number, index) => {
          return <StyledNumberItem key={index}>{number}</StyledNumberItem>;
        })}
      </StyledNumberList>
    </StyledContainer>
  );
};

export default RandomNumberGenerator;
