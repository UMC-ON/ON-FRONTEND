import * as s from './SearchPageStyled';
import Loading from '../../components/Loading/Loading';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import search_button1 from '../../assets/images/search_button1.svg';
import search_exit from '../../assets/images/search_exit.svg';
import SinglePost from '../../components/SinglePost/SinglePost';
import { GET_SEARCH_RESULT } from '../../api/urls';
import { getData } from '../../api/Functions';

const Search = () => {
  const [isLoading, setIsLoading] = useState(false); //연결할 때 로딩 추가
  const [searchInput, setSearchInput] = useState(''); //검색창에 입력한 것
  const [searchTarget, setSearchTarget] = useState(''); //돋보기 누를 때 넘어가는 것
  const [searchResult, setSearchResult] = useState([]); //검색 결과 넣음
  const [showResult, setShowResult] = useState(false); //검색 결과 있/없 나타냄
  const [error, setError] = useState(null); //에러처리 필요

  const navigate = useNavigate();

  const exitSearchPage = () => {
    navigate(-1);
  };

  const searchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const clickSearchButton = (e) => {
    setSearchTarget(searchInput);
  };

  //AXIOS 검색 결과
  useEffect(() => {
    if (searchInput === '') {
      console.log('입력한 검색어 없음');
      setSearchResult([]);
      setShowResult(false);
    } else {
      console.log('입력한 검색어:' + searchTarget);
      const fetchSearchResult = async () => {
        setIsLoading(true);
        try {
          const response = await getData(
            GET_SEARCH_RESULT,
            {
              Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
            },
            { keyword: searchTarget, page: 0, size: 20 },
          );
          if (response) {
            // 수정: 응답이 배열인지 확인
            console.log(response.data);
            setSearchResult(response.data.content);
          } else {
            setSearchResult([]); // 수정: 응답이 유효하지 않으면 빈 배열로 설정
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('검색 결과를 가져오는 중 오류가 발생했습니다.'); // 수정: 오류 메시지 설정
        } finally {
          setIsLoading(false);
        }
      };
      fetchSearchResult();
      setShowResult(true);
    }
  }, [searchTarget]);

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

  return isLoading ? (
    <Loading />
  ) : (
    <s.PageLayout>
      <s.SearchWrapper>
        <s.Exit
          src={search_exit}
          onClick={exitSearchPage}
        />
        <s.SearchBox>
          <s.SearchButton
            src={search_button1}
            onClick={clickSearchButton}
          />
          <s.SearchInput
            type="text"
            value={searchInput}
            onChange={searchInputChange}
            placeholder="궁금한 것을 입력해보세요"
          />
        </s.SearchBox>
      </s.SearchWrapper>
      {showResult ? (
        <s.SearchResultContainer>
          {searchResult && searchResult.length > 0 ? (
            <>
              {searchResult.map((data) => (
                <SinglePost
                  key={data.postId} // 수정: 고유 key 값 추가
                  postId={data.postId}
                  title={data.title} // 수정: title 필드 사용
                  time={data.createdAt} // 수정: createdAt 필드 사용하여 시간 포맷팅
                  content={data.content} // 수정: content 필드 사용
                  nickName={data.anonymous ? '익명' : data.writerInfo.nickname} // 수정: 익명 여부에 따른 닉네임 표시
                  verified={
                    data.writerInfo.userStatus === 'ACTIVE' ? 'true' : 'false'
                  } // 수정: userStatus 필드 사용
                  comment={data.commentCount.toString()} // 수정: commentCount 필드 사용
                  boardType={data.boardType} // 수정: boardType 필드 사용
                />
              ))}
              <s.LastText>검색 내역의 마지막입니다.</s.LastText>
            </>
          ) : (
            <s.LastText>검색 결과가 없습니다.</s.LastText> // 수정: 검색 결과가 없을 때 메시지 표시
          )}
        </s.SearchResultContainer>
      ) : (
        <s.PreSearchWrapper>
          <s.PreSearchIcon />
          <s.ONIcon />
          <p>나만의 완벽한</p>
          <p>교환/방문 라이프를 켜다</p>
        </s.PreSearchWrapper>
      )}
    </s.PageLayout>
  );
};

export default Search;
