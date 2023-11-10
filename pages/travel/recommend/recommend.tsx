import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/recommend.module.css";
import Modal from "./Modal";
import {
  ButtonContainer,
  DestinationCard,
  DestinationContainer,
  DestinationImage,
  DestinationName,
  SearchButton,
  SearchContainer,
  SearchInput,
  SeasrchContainer,
  UserInfo,
} from "./styles/recommend.module";

type Destination = {
  id: number;
  features: string;
  description: string;
  imageUrl: string;
  name: string;
  averageRating: number;
  region: string;
};

function Recommend() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<
    Destination[]
  >([]);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    axios
      .get("/api/destinations")
      .then((response) => {
        setDestinations(response.data);
        setFilteredDestinations(response.data); // 초기화
      })
      .catch((error) => {
        console.error("여행지 목록을 가져오는 중 오류 발생:", error);
      });

    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      fetchUserInfo();
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/userinfo",
        {
          headers: {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("회원 정보:", response.data);
        setUserInfo(response.data);
        const userId = response.data.userid; // 유저의 id 저장
        axios
          .get(`/api/destinations?userId=${userId}`) // id 기반으로 콘텐츠 검색
          .then((response) => {
            setDestinations(response.data);
          })
          .catch((error) => {
            console.error("콘텐츠를 가져오는 중 오류 발생:", error);
          });
      }
    } catch (error) {
      console.error("회원 정보 가져오기 실패:", error);
    }
  };
  // 검색창에서 id를 입력하면 그에 해당하는 컨텐츠를 필터링하는 함수
  const handleSearch = () => {
    const searchedDestinations = destinations.filter(
      (destination) => destination.id === Number(searchId)
    );
    setFilteredDestinations(searchedDestinations);
  };

  // ... 기존 코드
  const handleImageClick = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const closeSelectedDestination = () => {
    setSelectedDestination(null);
  };

  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const currentDestinations = destinations.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <SearchContainer>
        <SearchInput
          type="text"
          value={searchId}
          onChange={(e) => {
            setSearchId(e.target.value);
          }}
          placeholder="id로 검색하고 여행 리뷰 수정"
        />
        <SearchButton onClick={handleSearch}>검색</SearchButton>
      </SearchContainer>
      {/* 기존 코드, currentDestinations를 destinations 대신 filteredDestinations로 변경 */}
      <ButtonContainer>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          이전
        </button>
        <button
          disabled={endIndex >= destinations.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          다음
        </button>
      </ButtonContainer>

      <DestinationContainer>
        {currentDestinations.map((destination) => (
          <DestinationCard key={destination.id}>
            <DestinationImage
              src={destination.imageUrl}
              alt={destination.name}
              onClick={() => handleImageClick(destination)}
            />

            <DestinationName>{destination.region}</DestinationName>
          </DestinationCard>
        ))}
      </DestinationContainer>
      {userInfo && (
        <div>
          <UserInfo>사용자: {userInfo.userid}님을 위한 맞춤형 추천</UserInfo>
        </div>
      )}
      {selectedDestination && (
        <Modal
          destination={selectedDestination}
          onClose={closeSelectedDestination}
        />
      )}
    </div>
  );
}

export default Recommend;
