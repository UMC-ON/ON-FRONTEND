import styled from 'styled-components';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import arrowIcon from '../assets/images/bottomArrow.svg';
import search_icon from '../assets/images/search_icon.svg';
import pencilImg from '../assets/images/pencilIcon.svg';
import whiteCloseIcon from '../assets/images/whiteCloseIcon.svg';

import SellPageHeader from '../components/SellPageHeader';
import ItemList from '../components/ItemList';
import TransactionPicker from '../components/TransactionPicker';
import SelectCountry from './SelectCountry/SelectCountry.jsx';
import SellPageCountrySelect from '../components/SellPageCountrySelect.jsx';
import BottomTabNav from '../components/BottomTabNav/BottomTabNav';
import { getData } from '../api/Functions';
import { GET_FILTER_ITEM, GET_ITEM_SEARCH, GET_ITEM_LIST } from '../api/urls';
import SecondModal from '../components/SecondModal.jsx';
import ErrorScreen from '../components/ErrorScreen.jsx';

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
  const [page, setPage] = useState(0);
  const userInfo = useSelector((state) => state.user.user);

  const navigate = useNavigate();


  const fetchAllItems = async () => {
    try {
      const response = await getData(
        GET_ITEM_LIST,
        {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        },
        { page: page, size: 20, sort: 'DESC' },
      );

      if (page === 0) {
        setItems(response.data.content);
      } else {
        setItems((prevItems) => [...prevItems, ...response.data.content]);
      }
    } catch (error) {
      return <ErrorScreen />
    }
  };

  const fetchItems = async (dealType = '', currentCountry = '') => {
    try {
      // 필터링된 물품 불러오기
      const params = {
        page: page,
        size: 20,
        sort: 'DESC',
        dealType: dealType
          ? dealType === '직거래'
            ? 'DIRECT'
            : 'DELIVERY'
          : '',
        currentCountry,
        dealStatus: showAvailable ? 'AWAIT' : '',
      };

      const response = await getData(
        GET_FILTER_ITEM,
        {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        },
        params,
      );

      if (response && response.data) {
        if (page === 0) {
          setItems(response.data.content);
        } else {
          setItems((prevItems) => [...prevItems, ...response.data.content]);
        }
      } else {
        return <ErrorScreen />
      }
    } catch (error) {
      return <ErrorScreen />
    }
  };

  const fetchSearchResults = async () => {
    try {
      const response = await getData(
        GET_ITEM_SEARCH,
        {
          Authorization: `${localStorage.getItem('grantType')} ${localStorage.getItem('AToken')}`,
        },
        { keyword: searchKeyword, page: page, size: 20, sort: 'DESC' },
      );

      if (response && response.data) {
        if (page === 0) {
          setItems(response.data.content);
        } else {
          setItems((prevItems) => [...prevItems, ...response.data.content]);
        }
      } else {
        return <ErrorScreen />
      }
    } catch (error) {
      return <ErrorScreen />
    }
  };

  useEffect(() => {
    
    if (!selectedTransaction && !country && !showAvailable && !searchKeyword) {
      fetchAllItems();
    } else {
      fetchItems(selectedTransaction, country);
    }
  }, [page, selectedTransaction, country, showAvailable]);
  const handleScroll = useCallback(() => {
    const scrolledToBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10;

    if (scrolledToBottom) {
      if (searchKeyword) {
        fetchSearchResults();
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [searchKeyword]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleFilterClick = useCallback(() => {-
    setPage(0);
    setItems([]);
  }, []);

  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem('hasRefreshed');

    if (!hasRefreshed) {
      // 새로고침이 실행된 적이 없는 경우
      sessionStorage.setItem('hasRefreshed', 'true'); // 새로고침 실행 기록
      window.location.reload(); // 새로고침 실행
    }
  }, []);

  const resetCountryClick = useCallback(() => {
    setIsCountryClicked(false);
    setCountry(null);
    handleFilterClick();
  }, [handleFilterClick]);

  const handleGetCountry = useCallback(
    (country) => {
      setCountry(country);
      setIsCountryClicked(true);
      setShowCountry(false);
      handleFilterClick();
    },
    [handleFilterClick],
  );

  const handleCountryClick = () => {
    setShowCountry(!showCountry);
  };

  const handleResetTransaction = useCallback(() => {
    setSelectedTransaction('');
    setTempTransaction('');
    setIsPickerVisible(false);
    handleFilterClick();
  }, [handleFilterClick]);

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
    setPage(0);
    setItems([]);
  };

  const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const openNextModal = () => {
    setModalOpen(false);
    navigate('/mypage/schoolAuth');
  };

  const goPost = () => {
    if (userInfo.dispatchType == null) {
      setModalOpen(true);
    } else {
      navigate('./post');
    }
  };

  return (
    <>
      <SellPageHeader 
      pageName={'거래하기'}
      nav={'/'}
      notBack={true} />
      <Space />
      <br />
      <SearchContainer>
        <Search
          placeholder="국가 / 물품으로 검색해 보세요."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SearchIcon
          src={search_icon}
          onClick={fetchSearchResults}
        />{' '}
      </SearchContainer>
      <br />
      <br />
      <FlexContainer>
        <Span>
          <SellPageCountrySelect
            countryClick={handleCountryClick}
            country={country}
            isCountryClicked={isCountryClicked}
            updateIsCountryClicked={resetCountryClick}
          />
          {showCountry && (
            <SelectCountry
              closeModal={handleCountryClick}
              getCountry={handleGetCountry}
            />
          )}
          <GreyPicker
            onClick={togglePickerVisibility}
            selected={!!selectedTransaction}
          >
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
        </Span>
        <Available>
          <Check
            onClick={handleCheckClick}
            checked={showAvailable}
          />
          <span>거래 가능 물품만 보기</span>
        </Available>
      </FlexContainer>
      <br />
      <ItemList items={items} />
      <ButtonContainer>
        <WriteButton onClick={goPost}>
          <img
            src={pencilImg}
            alt="pencil icon"
          />
          <LeftPadding />글 쓰기
        </WriteButton>
      </ButtonContainer>

      <TransactionPicker
        isVisible={isPickerVisible}
        tempTransaction={tempTransaction}
        onTempTransactionChange={handleTransactionChange}
        onApply={handleApply}
        onClose={() => setIsPickerVisible(false)}
      />

      {isModalOpen && (
        <SecondModal
          closeModal={closeModal}
          openNextModal={openNextModal}
        />
      )}
      <BottomTabNav />
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
  background-color: #ffffff;
  color: #000000;
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
  background-color: #ffffff;
  color: #000000;
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 8%;
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
  background: ${({ selected }) =>
    selected ? 'linear-gradient(135deg, #C2C7FF, #AD99FF)' : '#E8E8E8'};
  font-family: 'Inter';
  font-size: 0.8em;
  padding: 3px;
  border-radius: 18px;
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 8px;
  color: ${({ selected }) => (selected ? '#FFFFFF' : '#363636')};
`;

const Available = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #7a7a7a;
  margin-right: 5%;
`;

const Check = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid transparent;
  background: ${({ checked }) => (checked ? '#C2C7FF' : '#E8E8E8')};
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
  justify-content: center;
  position: fixed;
  bottom: 110px;
  border-radius: 55px;
  border: 1px solid #cccccc;
  font-family: Inter;
  font-style: normal;
  width: 148px;
  height: 50px;
  padding: 15px 26px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #d6ebff, #c2c7ff);
  color: white;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  z-index: 2;
  &:hover {
    outline: 1px solid #9279f8;
  }
  &:focus {
    outline: 1px solid #9279f8;
  }
  -webkit-tap-highlight-color: transparent;
`;

const LeftPadding = styled.div`
  padding-left: 10px;
`;

const ButtonContainer = styled.div`
  padding-bottom: 100px;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: white;
  flex-direction: column;
  align-content: start;
  align-items: center;
  justify-content: center;
  z-index: 0;
`;
