import React from 'react';
import CommonInput, {
  CommonInputProps
} from '../../../../../../../../common/components/inputs/commonInput/CommonInput';
import CircleIconButton from '../../../../../../../../common/components/buttons/CircleIconButton';
import { FaPaperPlane } from '@react-icons/all-files/fa/FaPaperPlane';
import clsx from 'clsx';

type Props = {
  onChange: CommonInputProps['onChange'];
  value: string;
  onSubmit: () => void;
  onPressKey: React.KeyboardEventHandler<HTMLInputElement>;
};

const ChatBottomPanel: React.FC<Props> = ({
  onChange,
  onSubmit,
  onPressKey,
  value
}) => {
  return (
    <div className={'flex gap-[8px]'}>
      <CommonInput
        onChange={onChange}
        value={value}
        className={'flex-1'}
        onKeyPress={onPressKey}
      />
      <CircleIconButton
        Icon={FaPaperPlane}
        onClick={onSubmit}
        className={clsx(
          'w-[50px] h-[50px] !text-text_primary bg-primary hover:bg-primary_hovered'
        )}
      />
    </div>
  );
};

export default ChatBottomPanel;
