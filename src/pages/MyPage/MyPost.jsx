import PageHeader from '../../components/PageHeader/PageHeader';
import * as s from './MyPostStyled';
import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import Loading from '../../components/Loading/Loading';
import NoContent from '../../components/NoContent/NoContent';
import SingleMyPost from '../../components/SingleMyPost/SingleMyPost';
import SingleMyAccompany from '../../components/SingleMyPost/SingleMyAccompany';
import SingleMyTrade from '../../components/SingleMyPost/SingleMyTrade';
import {
  GET_MY_POST,
  GET_MY_ACCOMPANY_POST,
  GET_MY_MARKET_POST,
} from '../../api/urls';
import { getData } from '../../api/Functions';
import ErrorScreen from '../../components/ErrorScreen';

const MyPost = () => {
  const [currentMode, setCurrentMode] = useState(0);
  const token = localStorage.getItem('AToken');
  const [error, setError] = useState(false);

  const fetchPosts = async ({ pageParam = 0 }) => {
    const url =
      currentMode === 0
        ? GET_MY_POST('INFO')
        : currentMode === 1
          ? GET_MY_POST('FREE')
          : currentMode === 2
            ? GET_MY_ACCOMPANY_POST
            : GET_MY_MARKET_POST;

    const response = await getData(
      url,
      { Authorization: `Bearer ${token}` },
      { page: pageParam, size: 20 },
    );
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(['myPosts', currentMode], fetchPosts, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.content.length < 20) return undefined;
      return allPages.length; // 다음 페이지 번호 반환
    },
  });

  const handleModeChange = (mode) => {
    if (currentMode !== mode) {
      setCurrentMode(mode);
    }
  };

  const handleScroll = (e) => {
    if (
      e.target.scrollHeight - e.target.scrollTop <=
        e.target.clientHeight + 50 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  const renderPosts = (postResult, component) => {
    return !postResult || postResult.length === 0 ? (
      <NoContent content="글" />
    ) : (
      <s.PostWrapper>
        {postResult.map((data) => component(data))}
        {isFetchingNextPage && <Loading />}
        {!hasNextPage && <s.LastText>마지막 글입니다.</s.LastText>}
      </s.PostWrapper>
    );
  };
  if (error || isError) {
    return <ErrorScreen />;
  }

  return (
    <s.PageLayout
      style={{ overflowY: 'auto', height: '100vh' }}
      onScroll={handleScroll}
    >
      <PageHeader pageName="내 글" />
      <s.ModeContainer>
        <s.ModeButton
          onClick={() => handleModeChange(0)}
          $active={currentMode === 0}
        >
          정보글
        </s.ModeButton>
        <s.ModeButton
          onClick={() => handleModeChange(1)}
          $active={currentMode === 1}
        >
          자유글
        </s.ModeButton>
        <s.ModeButton
          onClick={() => handleModeChange(2)}
          $active={currentMode === 2}
        >
          동행 구하기
        </s.ModeButton>
        <s.ModeButton
          onClick={() => handleModeChange(3)}
          $active={currentMode === 3}
        >
          물품 거래
        </s.ModeButton>
      </s.ModeContainer>
      {isLoading ? (
        <Loading />
      ) : currentMode === 0 ? (
        renderPosts(
          data?.pages.flatMap((page) => page.content),
          (data) => (
            <SingleMyPost
              key={data.postId}
              postId={data.postId}
              title={data.title}
              time={data.createdAt}
              content={data.content}
              nickName={data.anonymous ? '익명' : data.writerInfo.nickname}
              image={data.imageUrls}
              comment={data.commentCount}
              boardType={data.boardType}
              setError={setError}
            />
          ),
        )
      ) : currentMode === 1 ? (
        renderPosts(
          data?.pages.flatMap((page) => page.content),
          (data) => (
            <SingleMyPost
              key={data.postId}
              postId={data.postId}
              title={data.title}
              time={data.createdAt}
              content={data.content}
              nickName={data.writerInfo.nickname}
              image={data.imageUrls}
              comment={data.commentCount}
              isAnonymous={data.anonymous}
              isAnonymousUniv={data.isAnonymousUniv}
              userStatus={data.writerInfo.userStatus}
              boardType={data.boardType}
              setError={setError}
            />
          ),
        )
      ) : currentMode === 2 ? (
        renderPosts(
          data?.pages.flatMap((page) => page.content),
          (data) => (
            <SingleMyAccompany
              key={data.companyPostId}
              postId={data.companyPostId}
              title={data.title}
              date={data.startDate}
              content={data.content}
              image={data.imageUrls}
              totalRecruitNumber={data.totalRecruitNumber}
              currentRecruitNumber={data.currentRecruitNumber}
              location={data.travelArea[0]}
              locationNum={data.travelArea.length}
              nickName={data.nickname}
              age={data.age}
              gender={data.gender}
              setError={setError}
            />
          ),
        )
      ) : (
        renderPosts(
          data?.pages.flatMap((page) => page.content),
          (data) => (
            <SingleMyTrade
              key={data.marketPostId}
              postId={data.marketPostId}
              title={data.title}
              time={data.createdAt}
              tradeStyle={data.dealType}
              isAvailable={data.dealStatus}
              user={data.nickname}
              image={data.imageUrls}
              location={data.currentLocation}
              price={data.cost}
              setError={setError}
            />
          ),
        )
      )}
    </s.PageLayout>
  );
};

export default MyPost;
