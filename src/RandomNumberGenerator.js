import React, { useState } from 'react';
import styled from 'styled-components';
import { LuRefreshCcw } from 'react-icons/lu';

const RandomNumberGenerator = () => {
  const TOTAL_NUMBER = 559;
  const APPEAR_TIME = 2000;

  const [generateNumbers, setGenerateNumbers] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);

  function generateRandomNumber() {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * TOTAL_NUMBER) + 1;
    } while (generateNumbers.includes(newNumber));

    return newNumber;
  }

  const startSpinning = () => {
    setIsSpinning(true);

    const spinInterval = setInterval(() => {
      setRandomNumber(generateRandomNumber());
    }, 50);

    setTimeout(() => {
      clearInterval(spinInterval);
      setIsSpinning(false);

      const newNumber = generateRandomNumber();
      setRandomNumber(newNumber);
      setGenerateNumbers((prevNumbers) => [...prevNumbers, newNumber]);
    }, APPEAR_TIME);
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
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  font-family: 'Pretendard-Regular';
`;

const StyledButton = styled.button`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  font-family: 'Pretendard-Regular';
  display: flex;
  background-color: #006400;
  color: white;
  padding: 50px 100px;
  font-size: 100px;
  cursor: pointer;
  border: none;
  border-radius: 40px;
  margin-top: 100px;
  margin-bottom: 100px;

  &:hover {
    background-color: #005000;
  }
`;

const StyledNumberList = styled.div`
  width: 1000px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
  color: white;
`;

const StyledNumberItem = styled.div`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  font-family: 'Pretendard-Regular';
  width: 110px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 60px;
  /* border: 1px solid #006400; */
  border-radius: 20px;
  padding: 30px;
  margin: 10px;
  margin-top: 25px;
  background-color: #8b0000;
`;

export default RandomNumberGenerator;
