import * as s from './ChatBubbleStyled';

const SentChatBubble = ({ color, text }) => {
  return (
    <s.SentChatBubble color={color}>
      <s.Text>{text} </s.Text>
    </s.SentChatBubble>
  );
};

export default SentChatBubble;
