import React, { useState } from 'react';
import styled from 'styled-components';
import { LuRefreshCcw } from 'react-icons/lu';

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
  font-size: 500px;
`;

const StyledButton = styled.button`
  display: flex;
  background-color: #4ca4f0;
  color: white;
  padding: 50px 100px;
  font-size: 70px;
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
  font-size: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  margin: 10px;
  margin-top: 50px;
`;

const RandomNumberGenerator = () => {
  const [generateNumbers, setGenerateNumbers] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [randomNumber, setRandomNumber] = useState(0);

  function generateRandomNumber() {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * 100) + 1;
    } while (generateNumbers.includes(newNumber));

    return newNumber;
  }

  const startSpinning = () => {
    setIsSpinning(true);
    const id = setInterval(() => {
      setRandomNumber(generateRandomNumber());
    }, 100);
    setIntervalId(id);

    setTimeout(() => {
      clearInterval(id);
      setIsSpinning(false);
      setGenerateNumbers([...generateNumbers, randomNumber]);
    }, 2000);
  };

  const handleButtonClick = () => {
    if (!isSpinning) {
      startSpinning();
    }
  };

  return (
    <StyledContainer>
      <StyledHeading>{randomNumber}</StyledHeading>
      <StyledButton onClick={handleButtonClick}>
        <LuRefreshCcw />
      </StyledButton>
      <StyledNumberList>
        {generateNumbers.map((number, index) => {
          return <StyledNumberItem key={index}>{number}</StyledNumberItem>;
        })}
      </StyledNumberList>
    </StyledContainer>
  );
};

export default RandomNumberGenerator;
