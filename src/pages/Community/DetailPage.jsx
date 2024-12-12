import * as s from './DetailPageStyled.jsx';
import styled from 'styled-components';
import profilePic from '../../assets/images/profilepic.svg';
import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import commentImg from '../../assets/images/replyBtnImg.svg';
import sendCommentBtn from '../../assets/images/commentSendBtn.svg';
import DefaultCheckBox from '../../components/DefaultCheckBox/DefaultCheckBox.jsx';

import { showDispatchedInfo } from '../../components/Common/InfoExp.jsx';

import Comment from '../../components/Comment/Comment.jsx';

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getData, postData } from '../../api/Functions.jsx';
import {
  GET_COMMENT_OF,
  GET_POST_DETAIL,
  WRITE_COMMENT_ON,
  WRITE_REPLY_ON,
} from '../../api/urls.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import ErrorScreen from '../../components/ErrorScreen.jsx';
import Reply from '../../components/Comment/Reply.jsx';

const DetailPage = ({ color1, color2, boardType }) => {
  const titleColor = boardType === 'INFO' ? 'rgb(191, 216, 229)' : '#CBCDE9';
  let logInInfo = useSelector((state) => state.user);
  let userInfo = logInInfo.user;
  //console.log(userInfo);
  const currentPost_id = useLocation().state.value; //post_id 정보만 받아오기
  const [commentCount, setCommentCount] = useState(0);

  const [currentPost, setCurrentPost] = useState();
  const [commentList, setCommentList] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const openedImg = useRef(null);
  const currentPage = useRef(0);
  const totalPage = useRef(0);
  const newCommentLoading = useRef(0);
  const myCommentId = useRef(null);

  const fetchCommentData = async (order = 'DESC') => {
    if (currentPage.current === 0) {
      // 최초 로딩 시 로딩 화면
      setLoading(true);
    } else {
      // 댓글 로딩마다 로딩 화면을 표시하지 않음
      newCommentLoading.current = true;
    }
    const response = await getData(
      GET_COMMENT_OF(currentPost_id),
      {
        Authorization: `Bearer ${localStorage.getItem('AToken')}`,
      },
      { page: currentPage.current, size: 20, sort: 'ASC' },
    );
    if (response) {
      totalPage.current = response.data.totalPages;
      //console.log(totalPage.current);
      if (currentPage.current > 0) {
        // 추가 댓글 로딩 시 기존 댓글 + 새 댓글
        setCommentList((prevCommentList) => [
          ...prevCommentList,
          ...response.data.content,
        ]);
        setCommentCount(response.data.totalElements); // 댓글 개수 갱신
        newCommentLoading.current = false;
      } else {
        // 최초 로딩 시
        setCommentList(response.data.content);
        setCommentCount(response.data.totalElements);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && userInfo && currentPost_id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const postResponse = await getData(
            GET_POST_DETAIL(boardType, currentPost_id),
            { Authorization: `Bearer ${localStorage.getItem('AToken')}` },
          );
          setCurrentPost(postResponse.data);

          const commentResponse = await getData(
            GET_COMMENT_OF(currentPost_id),
            { Authorization: `Bearer ${localStorage.getItem('AToken')}` },
            { page: 0, size: 20, sort: 'ASC' },
          );
          setCommentList(commentResponse.data.content);
          totalPage.current = commentResponse.data.totalPages;
          setCommentCount(commentResponse.data.totalElements);
        } catch (error) {
          //console.error('Error fetching data:', error);
          setIsError(true);
        } finally {
          setLoading(false); // 성공적이든 실패든 최종적으로 로딩을 끝내도록
        }
      };

      fetchData();
    }
  }, [userInfo, currentPost_id, boardType]);
  // userInfo와 currentPost_id, boardType 변경 시에만 실행

  const [content, setContent] = useState('');
  const [selectedComment, setSelectedComment] = useState(null);

  const isAnonymous = useRef(false);
  const scrollRef = useRef(null);
  const replyToText = useRef(null);
  const commentEditor = useRef(null);
  const mobileViewRef = useRef(null);

  const handleResizeHeight = () => {
    const textarea = document.querySelector('.commentEditor');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const onScroll = async () => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 50
    ) {
      //console.log('api 호출');
      // console.log(
      //   isLoading,
      //   newCommentLoading.current,
      //   currentPage.current,
      //   totalPage.current,
      // );
      if (
        !isLoading &&
        !newCommentLoading.current &&
        currentPage.current < totalPage.current - 1
      ) {
        //console.log('찐api호출');
        currentPage.current++;
        await fetchCommentData();
        newCommentLoading.current = false;
      }
    }
  };

  useEffect(() => {
    //setLoading(true)
    let throttleCheck = false;
    if (!throttleCheck) {
      throttleCheck = setTimeout(async () => {
        await onScroll();
        throttleCheck = false;
      }, 10000);
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(throttleCheck);
    };
  }, []);

  const onCommentSelection = (e) => {
    if (selectedComment === null) {
      // 아무것도 선택하지 않은 상태에서 댓글 선택
      setSelectedComment(e.target.comment);
      replyToText.current = `${e.target.writer}에게 답장`;
      commentEditor.current.focus();
    } else if (selectedComment === e.target.comment) {
      // 선택한 댓글 다시 선택 시 댓글 선택 취소
      setSelectedComment(null);
      replyToText.current = null;
      commentEditor.current.focus();
    } else {
      // 댓글 하나 선택한 상태에서 다른 댓글 선택
      setSelectedComment(e.target.comment);
      replyToText.current = `${e.target.writer}에게 답장`;
      commentEditor.current.focus();
    }
  };

  const onCommentSubmit = async () => {
    if (content === '') {
      commentEditor.current.focus();
      return;
    }
    if (logInInfo.isAuthenticated) {
      if (selectedComment === null) {
        addComment(WRITE_COMMENT_ON(currentPost_id));
      } else {
        addComment(WRITE_REPLY_ON(selectedComment.commentId));
      }
    } else {
      return alert('로그인이 필요합니다.');
    }

    setContent('');
    setSelectedComment(null);
    replyToText.current = null;
    const textarea = document.querySelector('.commentEditor');
    textarea.style.height = 'auto';
    const element = document.getElementById(`comment${myCommentId.current}`);
    if (myCommentId.current) {
      element.scrollIntoView('smooth');
    }
    window.scrollTo(0, 0);
    myCommentId.current = null;
  };

  const addComment = async (url) => {
    const comment = {
      id: userInfo.id,
      contents: content + ' ',
      anonymous: isAnonymous.current,
    };
    const jsonData = JSON.stringify(comment);

    const res = await postData(url, jsonData, {
      Authorization: `Bearer ${localStorage.getItem('AToken')}`,
    });
    const commentFE = res.data;
    myCommentId.current = res.data.commentId;
    setCommentList([...commentList, commentFE]);

    if (selectedComment) {
      selectedComment.replyCount++;
      myCommentId.current = res.data.replyId;
    }

    setCommentCount((prev) => prev + 1);
    fetchCommentData();
    setLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }
  //const currentVisualViewHeight = window.visualViewport.height;
  //replyToText.current = currentVisualViewHeight;
  if (userInfo && currentPost && commentList) {
    //return <div>{currentPost.postId}</div>;

    return (
      <div ref={mobileViewRef}>
        <PageHeader
          pageName={boardType === 'INFO' ? '정보 게시판' : '자유 게시판'}
          color={boardType === 'INFO' ? '#3E73B2' : '#6458BF'}
        ></PageHeader>
        <s.DetailPageLayout>
          <s.Title color={titleColor}>
            {currentPost.title}
            <s.DispatchedInfo>
              {currentPost.anonymousUniv
                ? '파견교 비공개'
                : `${showDispatchedInfo(currentPost.writerInfo, 'BOTH')}`}
            </s.DispatchedInfo>
            <s.InfoLabel>
              <img
                src={profilePic}
                style={{ padding: '0 0.5rem 0 0' }}
              />
              <s.NameInfo>
                {currentPost.anonymous
                  ? '익명'
                  : currentPost.writerInfo.nickname}
              </s.NameInfo>
              <s.DateInfo>
                {'· ' + new Date(currentPost.createdAt).toLocaleString('ko-KR')}
              </s.DateInfo>
            </s.InfoLabel>
          </s.Title>
          <s.Content>
            {currentPost.content}
            <s.ImgSection>
              {currentPost.imageUrls
                ? currentPost.imageUrls.map((img, index) => (
                    <s.ContentImg
                      src={img}
                      key={index}
                      onClick={(e) => {
                        openedImg.current = e.target.src;
                        setImageModalOpen(true);
                      }}
                    />
                  ))
                : null}
            </s.ImgSection>
          </s.Content>
          <s.CommentNumSection>
            <img
              src={commentImg}
              style={{ width: '1rem', height: '1rem', marginRight: '5px' }}
            />
            {commentCount}
          </s.CommentNumSection>
          <s.CommentSection ref={scrollRef}>
            {commentList.map((comment, index) => {
              let commentElement;
              if (comment.replyId === null) {
                //map 돌 때 comment만 돌고있음

                commentElement = (
                  <Comment
                    key={index}
                    id={`comment${comment.commentId}`}
                    comment={comment}
                    onCommentClick={onCommentSelection}
                    clickedComment={selectedComment}
                    postWriter_id={currentPost.writerInfo.id}
                  />
                );
                if (comment.replyCount === 0) {
                  //답글이 없으면 comment만 반환
                  return commentElement;
                } else {
                  //답글이 있으면
                  let replyList = commentList.filter(
                    (reply) =>
                      reply.commentId === comment.commentId && reply.replyId,
                  );

                  return (
                    <div
                      style={{ width: '100%' }}
                      key={index}
                    >
                      {commentElement}
                      {replyList.map((reply, index) => (
                        <Reply
                          id={`comment${reply.replyId}`}
                          reply={reply}
                          key={index}
                          postWriter_id={currentPost.writerInfo.id}
                        />
                      ))}
                    </div>
                  );
                }
              }
            })}
          </s.CommentSection>
          {isImageModalOpen && (
            <ImgModal
              onClick={() => {
                setImageModalOpen(false);
              }}
            >
              <Img src={openedImg.current} />
            </ImgModal>
          )}
        </s.DetailPageLayout>
        <s.CommentWritingDiv id="commentDiv">
          <div
            style={{
              gridArea: 'isAnonymous',
              alignSelf: 'start',
              padding: '35% 0',
            }}
          >
            <DefaultCheckBox
              before="익명"
              checkBoxStyle={{
                border: '0.2px solid #D9D9D9',
                width: '1.25rem',
                height: '1.25rem',
                borderRadius: '50%',
              }}
              wrapperStyle={{
                //gridArea: isAnonymous,
                color: '#5C5C5C',
                fontFamily: 'Inter',
                fontSize: '0.9375rem',
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: 'normal',
                letterSpacing: '0.01875rem',
                alignSelf: 'center',
              }}
              onChange={(e) => {
                isAnonymous.current = e.target.value;
                commentEditor.current.focus();
              }}
            />
          </div>

          <s.ReplyToDiv>{replyToText.current}</s.ReplyToDiv>
          <s.EditorDiv>
            <s.CommentEditor
              className="commentEditor"
              placeholder={
                logInInfo.isAuthenticated
                  ? '댓글을 작성해주세요.'
                  : '로그인이 필요합니다.'
              }
              onInput={handleResizeHeight}
              rows={1}
              onChange={(e) => setContent(e.target.value)}
              value={content}
              ref={commentEditor}
              disabled={!logInInfo.isAuthenticated}
            >
              <img
                style={{ position: 'fixed' }}
                src={sendCommentBtn}
              />
            </s.CommentEditor>
            <img
              src={sendCommentBtn}
              style={{ padding: '0.65rem' }}
              onClick={onCommentSubmit}
            />
          </s.EditorDiv>
        </s.CommentWritingDiv>
      </div>
    );
  }
  //return <div>{currentPost.anonymous}</div>;
};

export default DetailPage;

const ImgModal = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  max-width: 480px;
  height: 100%;
  background: black;
  z-index: 3;
`;
const Img = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => `url(${props.src})`} no-repeat center;
  background-size: contain;
`;
