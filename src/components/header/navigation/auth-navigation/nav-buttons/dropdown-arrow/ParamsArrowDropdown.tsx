import React from 'react';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import DropdownRootElement from '../../../../../../common/components/buttons/buttonDropdown/DropdownRootElement';
import ButtonDropdownElement from '../../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import UserCard from './userCard/UserCard';
import { useDispatch } from 'react-redux';
import { setWipeState } from '../../../../../../redux/actions/metadata/actions';
import axios from 'axios';

type Props = {};

const ParamsArrowDropdown: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const onLogoutClick = async () => {
    try {
      await axios.get('/api/logout');
    } finally {
      dispatch(setWipeState());
    }
  };

  return (
    <DropdownRootElement
      variant={'icon'}
      Icon={FaChevronDown}
      dropdownClass={'right-[0] px-[10px] py-[16px] min-w-[360px]'}
    >
      <div className="text-[12px] ml-[12px]">Сейчас:</div>
      <UserCard />
      <div className="text-[12px] ml-[12px] my-[12px]">Ваши аккаунты</div>
      <ButtonDropdownElement onClick={null}>
        Добавить аккаунт
      </ButtonDropdownElement>
      <ButtonDropdownElement onClick={null}>
        Перейти на бизнес-аккаунт
      </ButtonDropdownElement>
      <div className="text-[12px] ml-[12px] my-[12px]">Дополнительно</div>
      <ButtonDropdownElement onClick={null}>Настройки</ButtonDropdownElement>
      <ButtonDropdownElement onClick={null}>
        Настроить ленту
      </ButtonDropdownElement>
      <ButtonDropdownElement onClick={null}>
        Установить приложение Windows
      </ButtonDropdownElement>
      <ButtonDropdownElement onClick={null}>
        Получить справку
      </ButtonDropdownElement>
      <ButtonDropdownElement onClick={onLogoutClick}>
        Выход
      </ButtonDropdownElement>
    </DropdownRootElement>
  );
};

export default ParamsArrowDropdown;
