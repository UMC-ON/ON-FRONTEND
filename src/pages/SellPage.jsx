import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import arrowIcon from '../assets/images/bottomArrow.svg';
import search_icon from '../assets/images/search_icon.svg';
import pencilImg from '../assets/images/pencilIcon.svg';
import whiteCloseIcon from '../assets/images/whiteCloseIcon.svg';

import SellPageHeader from '../components/SellPageHeader';
import ItemList from '../components/ItemList';
import TransactionPicker from "../components/TransactionPicker";
import SelectCountry from './SelectCountry/SelectCountry.jsx';
import SellPageCountrySelect from '../components/SellPageCountrySelect.jsx';
import Loading from '../components/Loading/Loading';
import { getData } from '../api/Functions';
import { GET_FILTER_ITEM, GET_ITEM_SEARCH, GET_ITEM_LIST } from '../api/urls';

function SellPage() {
  const [showAvailable, setShowAvailable] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState('');
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [tempTransaction, setTempTransaction] = useState(''); 
  const [showCountry, setShowCountry] = useState(false);
  const [country, setCountry] = useState(null);
  const [isCountryClicked, setIsCountryClicked] = useState(false);
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const navigate = useNavigate();

  // 모든 물품 불러오기
  const fetchAllItems = async () => {
    try {
      const response = await getData(
        GET_ITEM_LIST, {
        Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
      }, 
      { page: 0, size: 20, sort: 'DESC' },);
      
      if (response) {
        console.log("모든 물품 불러오기 성공");
        setItems(response.data.content);
      }
    } catch (error) {
      console.error('모든 물품 불러오기 중 오류 발생:', error);
    }
  };

  const fetchItems = async (dealType = '', currentCountry = '') => {
    try {
      const params = {
        page: 0,
        size: 20,
        sort: 'DESC',
        dealType: dealType === '직거래' ? 'DIRECT' : 'DELIVERY',
        currentCountry,
        ...(showAvailable && { dealStatus: 'AWAIT' }), // showAvailable이 true일 때만 dealStatus 추가
      };
  
      const response = await getData(
        GET_FILTER_ITEM, {
        Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
      }, params);
  
      if (response) {
        setItems(response.data.content);
      }
    } catch (error) {
      console.error('필터링 중 오류 발생:', error);
    }
  };
  
  const fetchSearchResults = async () => {
    try {
      const response = await getData(
        GET_ITEM_SEARCH, {
        Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
      }, 
      { keyword: searchKeyword, page: 0, size: 20, sort: 'DESC' },);
      
      if (response) {
        console.log("검색 성공");
        setItems(response.data.content);
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (!selectedTransaction && !country && !showAvailable) {
      // 필터링 조건이 없으면 모든 물품 불러오기
      fetchAllItems();
    } else {
      // 필터링 조건이 있을 때는 필터링된 물품 가져오기
      fetchItems(selectedTransaction, country);
    }
  }, [selectedTransaction, country, showAvailable]);

  const resetCountryClick = () => {
    setIsCountryClicked(false);
    setCountry(null);
  };

  const handleGetCountry = (country) => {
    setCountry(country);
    setIsCountryClicked(true);
    setShowCountry(false);
  };

  const handleCountryClick = () => {
    setShowCountry(!showCountry);
  };

  const handleResetTransaction = () => {
    setSelectedTransaction('');
    setTempTransaction('');
    setIsPickerVisible(false);
  };

  const togglePickerVisibility = () => {
    if (selectedTransaction) {
      handleResetTransaction();
    } else {
      setIsPickerVisible(!isPickerVisible);
      if (!isPickerVisible) {
        setTempTransaction(selectedTransaction);
      }
    }
  };

  const handleTransactionChange = (transaction) => {
    setTempTransaction(transaction);
  };

  const handleApply = () => {
    setSelectedTransaction(tempTransaction);
    setIsPickerVisible(false);
  };

  const handleCheckClick = () => {
    setShowAvailable(!showAvailable);
  };

  const goPost = () => {
    navigate('./post');
  };

  return (
    <>
      <SellPageHeader pageName={'거래하기'} />
      <Space /><br />
      <SearchContainer>
        <Search
          placeholder='국가 / 물품으로 검색해 보세요.'
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              fetchSearchResults();
            }
          }}
        />
        <SearchIcon src={search_icon} onClick={fetchSearchResults} /> {/* 검색 아이콘 클릭 시 검색 요청 */}
      </SearchContainer>
      <br /><br />
      <FlexContainer>
        <Span>
          <SellPageCountrySelect
            countryClick={handleCountryClick}
            country={country}
            isCountryClicked={isCountryClicked}
            updateIsCountryClicked={resetCountryClick}
          />
          {showCountry &&
            <SelectCountry closeModal={handleCountryClick} getCountry={handleGetCountry} />
          }
          <GreyPicker onClick={togglePickerVisibility} selected={!!selectedTransaction}>
            {selectedTransaction || '거래방식'}
            <Icon
              src={selectedTransaction ? whiteCloseIcon : arrowIcon}
              onClick={(e) => {
                if (selectedTransaction) {
                  e.stopPropagation();
                  handleResetTransaction();
                } else {
                  togglePickerVisibility();
                }
              }}
            />
          </GreyPicker>
          <Available>
            <Check onClick={handleCheckClick} checked={showAvailable} />
            <span>거래 가능 물품만 보기</span>
          </Available>
        </Span>
      </FlexContainer><br />
      <ItemList items={items} />
      <WriteButton onClick={goPost}>
        <img src={pencilImg} alt="pencil icon" />
        글쓰기
      </WriteButton>

      <TransactionPicker
        isVisible={isPickerVisible}
        tempTransaction={tempTransaction}
        onTempTransactionChange={handleTransactionChange}
        onApply={handleApply}
        onClose={() => setIsPickerVisible(false)}
      />
    </>
  );
}

export default SellPage;




const Space = styled.div`
  margin-top: 7vh;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 96%;
  margin: 0 auto;
`;

const Search = styled.textarea`
  margin: 0 auto;
  width: 90%;
  padding: 8px;
  border-radius: 18px;
  color: #838383;
  height: 15px;
  display: flex;
  align-items: center;
  margin-left: 1em;
  box-shadow: 0 4px 8px rgba(134, 142, 232, 0.3);
  border: 0.1px rgba(255, 255, 255, 0.1);
  outline: none;
  resize: none;
  overflow: hidden;
  &::placeholder {
  font-size: 15px;
  font-family: Inter;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  margin-left: 1em;
`;

const Span = styled.span`
  display: flex;
  align-items: center; 
`;

const GreyPicker = styled.button`
  background: ${({ selected }) => selected 
    ? 'linear-gradient(135deg, #C2C7FF, #AD99FF)' 
    : '#E8E8E8'};
  font-family: 'Inter-Regular';
  font-size: 0.8em;
  padding: 3px;
  border-radius: 18px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 8px;
  color: ${({ selected }) => selected ? '#FFFFFF' : '#363636'};
`;

const Available = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #7A7A7A;
  margin-left: 14vw;
  margin-left: 60px;
`;

const Check = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid transparent;
  background: ${({ checked }) => checked 
    ? "#C2C7FF" 
    : "#E8E8E8"};
  margin-right: 5px;
  cursor: pointer;
`;

const Icon = styled.img`
  padding-left: 3px;
`;

const WriteButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 55px;
  border: none;
  width: 148px;
  height: 50px;
  padding: 15px 26px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #D6EBFF, #C2C7FF);
  color: white;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  z-index: 2;
  border: 1px solid #CCCCCC;
`;
