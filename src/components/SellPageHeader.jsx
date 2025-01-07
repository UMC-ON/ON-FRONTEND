import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

import ToBookmark from '../assets/images/ToBookmark.svg';

const PageHeader = ({ pageName, color = `${theme.title}`}) => {
  const navigate = useNavigate();

  const goBookmark = () => {
    navigate('/scrap');
  };


  return (
    <PageHeaderLayout>
      <PageName style={{ color: `${color}` }}>{pageName}</PageName>
      <Bookmark
        src={ToBookmark}
        onClick={goBookmark}
      />
    </PageHeaderLayout>
  );
};

export default PageHeader;

const PageHeaderLayout = styled.div`
  width: 100%;
  height: 61px;
  position: fixed;
  z-index: 2;
  display: flex;
  top: 0;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: solid ${theme.lightGray};
  border-width: 0.5px 0;
  box-sizing: border-box;
  padding: 0 17px 0 17px;
`;

const PageName = styled.p`
  text-align: center;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Bookmark = styled.img`
  position: relative;
  left: 30%;
`;
