/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import styled from "@emotion/styled";
import axios from "axios";

interface Place {
  id: number;
  name: string;
  region: string;
  bestSeason: string;
  averageRating: number;
  features: string[];
  imageUrl: string; // 여행지 이미지 URL
  contents: string; // 여행지 설명
  cost: string; // 여행지 물가
}
// Styled components
const Container = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  padding: 0px;
  background-color: #e6e6fa; // 연한 보라색 배경 적용
  height: 150vh; // 페이지 전체 높이를 늘립니다.
  width: 220vh;
`;

const commonLabelStyle = `
  display: block;
  margin-bottom: 10px;
  font-size: 18px; // 더 큰 텍스트 크기로 설정

  &:hover {
    color: #800080; // hover 시 텍스트 색상 변경
  }
`;

const FilterContainer = styled.div`
  background-color: #fff; // 하얀색 배경 적용
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const FilterSection = styled.div`
  flex: 1;
  margin-right: 2em;
  padding: 20px;
  border-right: 1px solid #ccc;
  height: 100vh;
  overflow-y: auto;
  color: #4b0082; // 체크박스와 텍스트에 보다 진한 보라색 적용
  font-size: 20px; // 텍스트 크기를 16px로 설정
  width: 104%;

  label {
    ${commonLabelStyle}
  }

  &:hover {
    color: #800080; // hover 시 텍스트 색상 변경
    transition: color 0.3s ease; // 색상 변경을 부드럽게
  }
`;
const Label = styled.label`
  ${commonLabelStyle}
`;
const ContentSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column; // 세로 방향으로 정렬
  width: 80%;
  height: fit-content; // 높이를 콘텐츠에 맞게 조절
`;
const ContentTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0px;
  border-bottom: 1px solid #ccc;
  height: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; // 버튼 사이에 공간 배치
  padding: 0px;

  button {
    background-color: #9370db; // 버튼 배경색을 보라색 계열로
    color: #ffffff; // 버튼 텍스트를 흰색으로
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease; // 배경색 변경을 부드럽게

    &:hover {
      background-color: #4b0082; // hover 시 배경색 변경
    }

    &:disabled {
      background-color: #d8bfd8; // 비활성화된 버튼의 배경색을 연한 보라색으로
      cursor: not-allowed;
    }
  }
`;
const ContentBottom = styled.div`
  display: flex;
  flex: 2;
  // flex-wrap: nowrap; // 컨텐츠가 넘칠 경우 다음 줄로 넘기지 않습니다.
  flex-wrap: wrap; // 컨텐츠가 넘칠 경우 다음 줄로 넘깁니다.
  padding: 20px;
  // overflow-x: auto; // 오른쪽으로 스크롤하는 문제 해결
  overflow-x: hidden; // 오른쪽으로 스크롤이 되지 않도록 설정
  max-width: 100%; // 컨텐츠의 너비를 제한
`;

const PlaceCard = styled.div`
  flex: 1 0 auto; // flex-grow를 0으로 설정하여 콘텐츠 크기에 따라 카드 크기가 변하도록 합니다.
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s; // hover 효과를 위한 transition 추가

  &:hover {
    transform: scale(1.05); // hover 시 카드를 약간 확대
  }
`;

const PlaceImage = styled.img`
  width: 140px; /* 이미지 너비 설정 */
  height: 140px; /* 이미지 높이 설정 */
  border-radius: 10px;
  object-fit: cover; /* 이미지 비율 유지 */
`;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// async function fetchData() {
//   const response = await fetch("API_URL", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       // 여기에 필요한 데이터를 넣어줍니다.
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const data = await response.json();
//   return data;
// }
type Destination = {
  id: number;
  features: string;
  description: string;
  imageUrl: string;
  name: string;
  averageRating: number;
};

const handleRadioChange =
  (setSelectedFunc: (value: number) => void) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setSelectedFunc(value);
  };

export default function TravelFilter(): JSX.Element {
  const [placesData, setPlacesData] = useState<Place[]>([]);
  const [userInfo, setUserInfo] = useState<any>(null); // 사용자 정보를 저장할 상태

  useEffect(() => {
    // 백엔드 API에서 여행지 목록을 가져옵니다.
    axios
      .get("/api/destinations")
      .then((response) => {
        const dataWithCost = response.data.map((place) => ({
          ...place,
          cost: ["저렴", "보통", "비싼"][Math.floor(Math.random() * 3)], // 랜덤하게 물가를 지정
        }));
        setPlacesData(dataWithCost);
      })
      .catch((error) => {
        console.error("여행지 목록을 가져오는 중 오류 발생:", error);
      });

    // JWT 토큰이 존재할 때만 사용자 정보를 가져오도록 함
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      fetchUserInfo(); // 회원 정보를 가져오는 함수 호출
    }
  }, []);

  // 사용자 정보를 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/userinfo",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // JWT 토큰을 헤더에 추가
          },
        }
      );

      if (response.status === 200) {
        console.log("회원 정보:", response.data);
        setUserInfo(response.data); // 사용자 정보를 상태에 저장
      }
    } catch (error) {
      console.error("회원 정보 가져오기 실패:", error);
    }
  };

  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number>(0);
  const [selectedCosts, setSelectedCosts] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleCheckboxChange =
    (setSelectedFunc: (value: string[]) => void) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const isChecked = event.target.checked;

      setSelectedFunc((prevState) => {
        if (isChecked) {
          // 체크된 경우 배열에 값을 추가
          return [...prevState, value];
        } else {
          // 체크 해제된 경우 배열에서 값을 제거
          return prevState.filter((item) => item !== value);
        }
      });
    };

  const filteredPlaces = placesData.filter(
    (place) =>
      (selectedSeasons.length === 0 ||
        selectedSeasons.some((season) => place.bestSeason.includes(season))) &&
      (selectedRatings === 0 || place.averageRating >= selectedRatings) &&
      (selectedCosts.length === 0 || selectedCosts.includes(place.cost))
  );
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentPlaces = filteredPlaces.slice(startIndex, endIndex);

  return (
    <Container>
      <FilterContainer>
        <FilterSection>
          추천 계절:<br></br>
          <br></br>
          {["봄", "여름", "가을", "겨울"].map((s) => (
            <label key={s}>
              <input
                type="checkbox"
                value={s}
                onChange={handleCheckboxChange(setSelectedSeasons)}
              />
              {s}
            </label>
          ))}
          <br></br>
          <br></br>
          평점:<br></br>
          <br></br>
          {[1, 2, 3, 4, 5].map((r) => (
            <Label key={r.toString()}>
              <input
                type="radio"
                name="rating"
                value={r.toString()}
                onChange={handleRadioChange(setSelectedRatings)}
              />
              {"⭐".repeat(r)}
            </Label>
          ))}
          <br></br>
          <br></br>
          관광지 물가:<br></br>
          <br></br>
          {["저렴", "보통", "비싼"].map((c) => (
            <label key={c}>
              <input
                type="checkbox"
                value={c}
                onChange={handleCheckboxChange(setSelectedCosts)}
              />
              {c}
            </label>
          ))}
        </FilterSection>
      </FilterContainer>

      <ContentSection>
        <ContentTop>
          {/* 이 공간에 새로운 콘텐츠를 띄우세요 */}

          <ButtonContainer>
            <button
              disabled={currentPage === 1} // 첫 페이지에서는 "이전" 버튼 비활성화
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              이전
            </button>
            <button
              disabled={endIndex >= filteredPlaces.length} // 마지막 페이지에서는 "다음" 버튼 비활성화
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              다음
            </button>
          </ButtonContainer>
        </ContentTop>
        <ContentBottom>
          {/* Render current places instead of all filtered places */}
          {placesData.map((place) => (
            <div key={place.id}>
              <img src={place.imageUrl} alt={place.name} />
              <h2>{place.name}</h2>
              <p>지역: {place.region}</p>
              <p>최적의 계절: {place.bestSeason}</p>
              <p>평균 평점: {"⭐".repeat(place.averageRating)}</p>
              <p>특징: {place.features.join(", ")}</p>
              <p>설명: {place.contents}</p>
            </div>
          ))}
        </ContentBottom>

        {/* 구분  */}

        <ContentTop>{/* 이 공간에 새로운 콘텐츠를 띄우세요 */}</ContentTop>
        <ContentBottom>
          {/* Render current places instead of all filtered places */}
        </ContentBottom>
      </ContentSection>
    </Container>
  );
}
