import React, { useContext } from 'react';
import { THEME_TYPE } from '../../../../../../../../../common/enums/theme';
import clsx from 'clsx';
import ThemeContext from '../../../../../../../../../common/context/ThemeContext';

type Props = { isMyMessage: boolean };

const MessageBubble: React.FC<Props> = ({ children, isMyMessage = false }) => {
  const { theme } = useContext(ThemeContext);
  const messageBubbleStyle = isMyMessage
    ? 'bg-primary text-text_primary'
    : 'border-[#cdcdcd] border-[1px] border-solid';
  return (
    <div
      data-theme={theme ? theme : THEME_TYPE.BASE}
      className={clsx(
        'rounded-[24px] px-[16px] pt-[14px] pb-[18px] relative',
        messageBubbleStyle
      )}
    >
      {children}
    </div>
  );
};

export default MessageBubble;
