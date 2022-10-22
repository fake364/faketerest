import React, { useState } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

type Props = { text: string; maxLines: number };

const LimitedRowsText: React.FC<Props> = ({ text, maxLines }) => {
  const [isClamped, setClamped] = useState(true);
  const [isExpanded, setExpanded] = useState(false);

  const onReflow = (state) => {
    setClamped(state.clamped);
  };

  const expandBlock = () => {
    setExpanded(true);
  };

  return (
    <div className={'text-[14px] mt-[8px]'}>
      {isExpanded ? (
        text
      ) : (
        <>
          <ResponsiveEllipsis
            text={text}
            maxLine={maxLines}
            ellipsis="..."
            trimRight
            onReflow={onReflow}
          />
          {isClamped && (
            <span className={'font-[500] cursor-pointer'} onClick={expandBlock}>
              {' '}
              Еще
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default LimitedRowsText;
