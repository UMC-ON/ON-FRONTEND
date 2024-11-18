import * as s from './SearchPageStyled';
import Loading from '../../components/Loading/Loading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import search_button1 from '../../assets/images/search_button1.svg';
import search_exit from '../../assets/images/search_exit.svg';
import SinglePost from '../../components/SinglePost/SinglePost';
import { GET_SEARCH_RESULT } from '../../api/urls';
import { getData } from '../../api/Functions';
import { useInfiniteQuery } from 'react-query';

const Search = () => {
  const [searchInput, setSearchInput] = useState(''); // 검색창에 입력한 것
  const [searchTarget, setSearchTarget] = useState(''); // 돋보기 누를 때 넘어가는 것

  const navigate = useNavigate();

  const exitSearchPage = () => {
    navigate(-1);
  };

  const searchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const clickSearchButton = () => {
    setSearchTarget(searchInput);
  };

  const fetchSearchResult = async ({ pageParam = 0 }) => {
    const response = await getData(
      GET_SEARCH_RESULT,
      {
        Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
      },
      { keyword: searchTarget, page: pageParam, size: 20 },
    );
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(['searchResults', searchTarget], fetchSearchResult, {
      enabled: !!searchTarget, // 검색어가 있을 때만 실행
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.content.length < 20) return undefined; // 데이터가 더 없으면 undefined
        return allPages.length; // 다음 페이지 번호 반환
      },
    });

  const handleScroll = (e) => {
    console.log(
      'Scrolling...',
      e.target.scrollTop,
      e.target.scrollHeight,
      e.target.clientHeight,
    );

    if (
      e.target.scrollHeight - e.target.scrollTop <=
        e.target.clientHeight + 50 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  const isEmpty =
    !data || (data.pages.length === 1 && data.pages[0].content.length === 0);

  return isLoading ? (
    <Loading />
  ) : (
    <s.PageLayout
      style={{ overflowY: 'auto', minHeight: '100vh' }}
      onScroll={handleScroll}
    >
      <s.SearchWrapper>
        <s.Exit
          src={search_exit}
          onClick={exitSearchPage}
        />
        <s.SearchBox>
          <s.SearchInput
            type="text"
            value={searchInput}
            onChange={searchInputChange}
            placeholder="궁금한 것을 입력해보세요"
          />
          <s.SearchButton
            src={search_button1}
            onClick={clickSearchButton}
          />
        </s.SearchBox>
      </s.SearchWrapper>
      {searchTarget && (
        <s.SearchResultContainer>
          {isEmpty ? (
            <s.LastText>검색 결과가 없습니다.</s.LastText>
          ) : (
            data?.pages.map((page) =>
              page.content.map((data) => (
                <SinglePost
                  key={data.postId}
                  postId={data.postId}
                  title={data.title}
                  time={data.createdAt}
                  content={data.content}
                  nickName={data.anonymous ? '익명' : data.writerInfo.nickname}
                  verified={
                    data.writerInfo.userStatus === 'ACTIVE' ? 'true' : 'false'
                  }
                  comment={data.commentCount.toString()}
                  boardType={data.boardType}
                />
              )),
            )
          )}
          {isFetchingNextPage && <Loading />}
          {!hasNextPage && !isEmpty && (
            <s.LastText>검색 내역의 마지막입니다.</s.LastText>
          )}
        </s.SearchResultContainer>
      )}
      {!searchTarget && (
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
