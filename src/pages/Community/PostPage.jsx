import { useNavigate } from 'react-router-dom';
import * as s from './PostPageStyled.jsx';
import camera from '../../assets/images/camera.svg';
import DefaultCheckBox from '../../components/DefaultCheckBox/DefaultCheckBox.jsx';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../components/Loading/Loading.jsx';
import { multiFilePostData } from '../../api/Functions.jsx';
import { showDispatchedInfo } from '../../components/Common/InfoExp.jsx';
import { WRITE_POST_IN } from '../../api/urls.jsx';

const PostPage = ({ color, boardType }) => {
  const navigate = useNavigate();
  const [imageFiles, setImageFiles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  let userInfo = useSelector((state) => state.user.user);

  const [input, setInput] = useState({
    boardType: `${boardType}`,
    createdDate: new Date(),
    anonymous: null,
    anonymousUniv: null,
    title: '',
    content: '',
  });

  const BETest = true;

  useEffect(() => {
    if (userInfo) {
      console.log(`유저:${userInfo}`);
      console.log('useEffect 실행');
    }
    if (userInfo && userInfo.id) {
      setInput({ ...userInfo, id: userInfo.id });
    }
  }, [userInfo]);
  useEffect(() => {
    //setImageFiles(sendingImages.current);
    console.log(imageFiles);
  }, [imageFiles]);

  if (isLoading) {
    return <Loading />;
  }
  if (BETest && !userInfo) {
    return null;
  }

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onChangeImgFile = (fileList) => {
    if (fileList) {
      const imgList = Array.from(fileList);
      console.log(imgList);
      const previewURLs = imgList.map((file) => {
        return URL.createObjectURL(file);
      });
      setImageFiles((prev) => prev.concat(imgList));
    }
  };
  const onSubmit = async () => {
    if (!input.title) {
      alert('제목을 입력하세요');
      return;
    }
    if (!input.content) {
      alert('내용을 입력하세요');
      return;
    }

    const formData = new FormData();

    const json = JSON.stringify(input);
    const blob = new Blob([json], { type: 'application/json' });
    formData.append('postRequestDTO', blob);
    imageFiles.map((img) => {
      //const blobImg = new Blob([img], { type: 'multipart/form-data' });
      formData.append('imageFiles', img);
    });
    const sendData = async () => {
      setLoading(true);

      const response = await multiFilePostData(
        WRITE_POST_IN(boardType),
        formData,
        {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        },
      );
      if (response) {
        console.log(response.data.result);
      }

      setLoading(false);
    };
    sendData();

    navigate(`/community/${boardType == 'FREE' ? 'general' : 'info'}`, {
      replace: true,
    });
  };

  return (
    <>
      <s.ConfirmHeader>
        <s.ColorButton
          color="#E4E4E4"
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </s.ColorButton>
        <s.ColorButton
          color={color}
          onClick={onSubmit}
        >
          등록
        </s.ColorButton>
      </s.ConfirmHeader>
      <s.BigContainer>
        <s.HeadingTitle style={{ fontSize: '25px', color: `${color}` }}>
          {boardType === 'INFO' ? '정보' : '자유'}글 작성
        </s.HeadingTitle>
        <s.PostInfoSection>
          <s.InfoLabel>
            교환 국가:
            <s.ColorButtonTag color={color}>
              {showDispatchedInfo(userInfo, 'COUNTRY')}
            </s.ColorButtonTag>
          </s.InfoLabel>
          <s.SpaceBetweenContainer>
            <s.InfoLabel>
              <div style={{ whiteSpace: 'nowrap' }}>교환교:</div>

              <s.ColorButtonTag color={color}>
                {showDispatchedInfo(userInfo, 'UNIV')}
              </s.ColorButtonTag>
            </s.InfoLabel>
            <DefaultCheckBox
              after="파견교 비공개"
              onChange={onChangeInput}
              name="anonymousUniv"
              checkBoxStyle={{ color: `${color}` }}
            />
          </s.SpaceBetweenContainer>
        </s.PostInfoSection>
        <s.TitleSection>
          <s.HeadingTitle>제목</s.HeadingTitle>
          <s.EditorWrapper
            color={color}
            style={{ height: '38px' }}
          >
            <s.TitleEditor
              wrap="off"
              style={{ fontWeight: 'bold' }}
              name="title"
              onChange={onChangeInput}
            />
          </s.EditorWrapper>
        </s.TitleSection>
        <s.ContentSection>
          <s.HeadingTitle>내용</s.HeadingTitle>
          <s.EditorWrapper
            color={color}
            style={{ minHeight: '400px' }}
          >
            <s.Editor
              name="content"
              onChange={onChangeInput}
            />
            <s.ImgSection>
              {imageFiles.map((url, i) => (
                <div
                  key={URL.createObjectURL(url)}
                  style={{ position: 'relative' }}
                >
                  <s.PreviewImg
                    src={URL.createObjectURL(url)}
                    width="160"
                    height="160"
                    alt={`image${i}`}
                  />
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      position: 'absolute',
                      right: '0.3rem',
                      top: '0.3rem',
                      zIndex: '2',
                    }}
                    onClick={() => {
                      const deletedImageList = imageFiles.filter(
                        (imageUrl) => imageUrl !== url,
                      );
                      setImageFiles(deletedImageList);
                    }}
                  >
                    <path
                      d="M14.4433 0.0955087C14.5707 -0.0318362 14.7771 -0.0318362 14.9045 0.0955087C15.0318 0.222854 15.0318 0.42932 14.9045 0.556665L7.96116 7.5L14.9045 14.4433C15.0318 14.5707 15.0318 14.7771 14.9045 14.9045C14.7771 15.0318 14.5707 15.0318 14.4433 14.9045L7.5 7.96116L0.556665 14.9045C0.42932 15.0318 0.222853 15.0318 0.0955081 14.9045C-0.031836 14.7771 -0.031836 14.5707 0.0955081 14.4433L7.03884 7.5L0.095509 0.556665C-0.0318359 0.42932 -0.0318359 0.222854 0.095509 0.0955087C0.222854 -0.0318362 0.429321 -0.0318362 0.556666 0.0955087L7.5 7.03884L14.4433 0.0955087Z"
                      fill="#000000"
                    />
                  </svg>
                </div>
              ))}
            </s.ImgSection>
          </s.EditorWrapper>
        </s.ContentSection>
      </s.BigContainer>
      <s.Footer>
        <label>
          <input
            accept=".jpg, .jpeg, .png, .mp4"
            type="file"
            style={{ display: 'none' }}
            multiple
            onChange={(e) => {
              onChangeImgFile(e.target.files);
            }}
          />
          <img src={camera} />
        </label>
        <DefaultCheckBox
          after="익명"
          wrapperStyle={{ fontSize: '14px' }}
          onChange={onChangeInput}
          name="anonymous"
          checkBoxStyle={{ color: `${color}` }}
        />
      </s.Footer>
    </>
  );
};
export default PostPage;
