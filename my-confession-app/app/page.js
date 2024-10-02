'use client'
import { useState } from 'react';

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowMessage((prev) => !prev); // Toggle the visibility
  };

  return (
    <div className="container">
      <h1>안녕 주아야?</h1>
      <button onClick={handleClick} className="reveal-button">
        {showMessage ? '편지 닫기' :' 편지 보기'} </button>
      {showMessage && (
        <div className="letter">
          <p>너에게 편지를 하나 쓰고 싶었는데,,, 뭐가 가장 나스럽고 또 내가 가장 예쁜 정성을 쏟을 수 있을지에 대해 고민을 해봤어...</p>
          <p>내가 글솜씨가 좋지 않고... 편지도 잘 안 써봐서 잘은 못쓰지만!</p>
          <p>9월 7일...</p> 
          <p>사당에서 처음 만나서 벌벌 떨던 너... 사람 이 너무 순하고 착해보였어</p>
          <p>9월 16일</p>
          <p>두번째로 만날 때는 안떨고 나에게 장난도 치던 너... 사람 이 밝고 해맑아 보였어</p>
          <p>9월 17일</p> 
            <p>책바에서 종이접기를 하는 나를 보는 너의 모습 이 사람이 왜 초등학교 선생님을 했고, 사랑이 넘치는 사람이라는 걸 느꼈어</p>
          <p>9월 21일</p> 
           <p> 부산에서 돌아와 피곤함에 찌든 나.... 사실 이날... 나도 고민이 많았고, 너가 먼저 이야기를 꺼내주어서 고마웠어.</p>
          <p>너의 한마디, 답변....&quot;과거는 서로 달랐지만, 현재와 미래가 저는 중요하다 생각해요&quot; 이 말이 나는 마음의 결정을 하게 된 거 같아</p>
          <p>9월 28일</p>
            <p> 정말 무드 없게 지하철 가는 길에 말을 하고... 참 미안해 그리고 그 전에 확신을 주지 못해서 미안해</p>

          <p><b>그래서 다시 한번 말할게 나랑 사귀어 줄래?</b></p>
        </div>
      )}
        {/* Floating Hearts */}
        <div className="hearts">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="heart"></div>
        ))}
      </div>
      
      <style jsx>{`
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #ffcccb; /* Set background to white */
    color: #28a745; /* 초록색 텍스트 */
    padding: 20px;
    border-radius: 10px;
    position: relative;
    overflow: hidden; /* Prevent overflow of hearts */
  }
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  .reveal-button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: background-color 0.3s;
  }
  .reveal-button:hover {
    background-color: #218838;
  }
  .letter {
    margin-top: 20px;
    text-align: left;
    max-width: 600px;
    background-color: rgba(255, 255, 255, 0.9); /* Slightly transparent white */
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    color: black; /* 글자 색상을 검정으로 설정 */
    position: relative; /* Relative positioning */
    z-index: 1; /* Higher z-index */
  }
  p {
    margin: 10px 0;
  }
  .hearts {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* Prevent interaction with hearts */
    z-index: 0; /* Lower z-index */
  }
  .heart {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: red;
    transform: rotate(45deg);
    margin: 20px; /* Some margin for spacing */
  }
  .heart:before,
  .heart:after {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: red;
  }
  .heart:before {
    top: -25px;
    left: 0;
  }
  .heart:after {
    left: 25px;
    top: 0;
  }
  @keyframes float {
    0% {
      transform: translateY(100vh) scale(0.8);
    }
    50% {
      transform: translateY(-20vh) scale(1.1);
    }
    100% {
      transform: translateY(-100vh) scale(0.8);
    }
  }
  .heart {
    animation: float 10s infinite;
  }
  .heart:nth-child(1) { left: 10%; animation-delay: 0s; }
  .heart:nth-child(2) { left: 30%; animation-delay: 1s; }
  .heart:nth-child(3) { left: 50%; animation-delay: 2s; }
  .heart:nth-child(4) { left: 70%; animation-delay: 3s; }
  .heart:nth-child(5) { left: 90%; animation-delay: 4s; }
  .heart:nth-child(6) { left: 15%; animation-delay: 5s; }
  .heart:nth-child(7) { left: 35%; animation-delay: 6s; }
  .heart:nth-child(8) { left: 55%; animation-delay: 7s; }
  .heart:nth-child(9) { left: 75%; animation-delay: 8s; }
  .heart:nth-child(10) { left: 95%; animation-delay: 9s; }
`}</style>
    </div>
  );
}