import React, { useState, useEffect } from 'react';
import * as s from './ChatInputStyled';
import { POST_CHAT } from '../../api/urls';
import { postData } from '../../api/Functions';
import axios from 'axios';
import Loading from '../Loading/Loading';
import send from '../../assets/images/send.svg';
const ChatInput = ({ roomId, addNewMessage, currentUserId }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

  const messageInputChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      const apiClient = axios.create({
        baseURL: serverAddress + '/',
        headers: {
          'Content-Type': 'text/plain',
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        },
      });

      const response = await apiClient.post(POST_CHAT(roomId), message);

      if (response) {
        const newMessage = {
          userId: currentUserId,
          message: message,
        };
        addNewMessage(newMessage);
        setMessage('');
      }
    } catch (error) {
      //console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResizeHeight = () => {
    const textarea = document.querySelector('.input');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  const handleResetHeight = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto'; // 기본 높이로 재설정
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <s.InputField>
      <s.TextInputContainer>
        <s.TextInput
          rows={1}
          className="input"
          onInput={handleResizeHeight}
          onFocus={handleResizeHeight}
          onBlur={handleResetHeight}
          onChange={messageInputChange}
          value={message}
          disabled={isLoading}
        />
        <s.SendButton
          src={send}
          disabled={isLoading}
          onClick={handleSendMessage}
        />
      </s.TextInputContainer>
    </s.InputField>
  );
};

export default ChatInput;
