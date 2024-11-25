import styled from 'styled-components';
import replyImg from '../../assets/images/replyImg.svg';
import { showWriter } from '../Common/InfoExp';

const Reply = ({ reply, postWriter_id }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 20fr' }}>
      <ReplyImg
        src={replyImg}
        style={{ width: '0.625rem', height: ' 0.83331rem', flexShrink: '0' }}
      />
      <ReplyDiv
        writer={`${reply.writerInfo.id === postWriter_id}`}
        style={{ margin: '0.44rem 0 ' }}
      >
        <div>
          <Writer writer={`${reply.writerInfo.id === postWriter_id}`}>
            {reply.writerInfo.id === postWriter_id
              ? '글쓴이'
              : reply.writerInfo.nickname}
          </Writer>
          {reply.contents}
        </div>
      </ReplyDiv>
    </div>
  );
};

export default Reply;

const Writer = styled.div`
  padding: 3px 0;
  color: ${(props) => (props.writer === 'true' ? '#3E73B2' : '#5C5C5C')};
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ReplyDiv = styled.div`
  box-sizing: border-box;
  padding: 10px 19px;
  width: 100%;
  height: auto;
  background: ${(props) =>
    props.writer === 'true'
      ? 'linear-gradient(135deg, #d6ebff 0%, #c2c7ff 100%)'
      : 'rgba(217, 217, 217, 0.40)'};
  border: 2px transparent;
  border-radius: 10px;

  color: #3d3d3d;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;

  display: flex;
  flex-direction: row;
  align-items: start;

  white-space: pre-wrap;
`;

const ReplyImg = styled.img`
  opacity: 50%;
  padding: 0.25rem 0.25rem 0 0;
`;
