import PageHeader from '../../components/PageHeader/PageHeader';
import * as s from './MyPostStyled';
import { useState, useEffect } from 'react';
import useFetchMyPosts from '../../hooks/useFetchMyPosts';
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

const MyPost = () => {
  const [currentMode, setCurrentMode] = useState(0);
  //정보글: 0, 자유글: 1, 동행 구하기: 2, 물품거래: 3

  const token = localStorage.getItem('AToken');
  const { posts: infoPostResult, isLoading: infoLoading } = useFetchMyPosts(
    GET_MY_POST('INFO'),
    'INFO',
    token,
    { page: 0, size: 20 },
    currentMode,
  );
  const { posts: freePostResult, isLoading: freeLoading } = useFetchMyPosts(
    GET_MY_POST('FREE'),
    'FREE',
    token,
    { page: 0, size: 20 },
    currentMode,
  );
  const { posts: accompanyPostResult, isLoading: accLoading } = useFetchMyPosts(
    GET_MY_ACCOMPANY_POST,
    'Accompany',
    token,
    { page: 0, size: 20 },
    currentMode,
  );
  const { posts: tradePostResult, isLoading: tradeLoading } = useFetchMyPosts(
    GET_MY_MARKET_POST,
    'Trade',
    token,
    { page: 0, size: 20 },
    currentMode,
  );

  const isLoading = infoLoading || freeLoading || accLoading || tradeLoading;

  const handleModeChange = (mode) => {
    if (currentMode !== mode) {
      setCurrentMode(mode);
    }
  };
  useEffect(() => {
    console.log('Current Mode:', currentMode);
  }, [currentMode]);

  const renderPosts = (postResult, component) => {
    return postResult && postResult.length === 0 ? (
      <NoContent
        content="글"
        style={{ marginBottom: '10rem' }}
      />
    ) : (
      <s.PostWrapper>
        {postResult.map((data) => component(data))}
        <s.LastText>마지막 글입니다.</s.LastText>
      </s.PostWrapper>
    );
  };

  return (
    <s.PageLayout>
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
        renderPosts(infoPostResult, (data) => (
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
          />
        ))
      ) : currentMode === 1 ? (
        renderPosts(freePostResult, (data) => (
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
          />
        ))
      ) : currentMode === 2 ? (
        renderPosts(accompanyPostResult, (data) => (
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
          />
        ))
      ) : (
        renderPosts(tradePostResult, (data) => (
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
          />
        ))
      )}
    </s.PageLayout>
  );
};
export default MyPost;
