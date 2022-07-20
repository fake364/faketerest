import React from 'react';

type Props = { onClick: () => void };

const ButtonDropdownElement: React.FC<Props> = ({ onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="min-w-[200px] hover:bg-[whitesmoke] rounded-[8px] px-[12px] py-[8px]
    cursor-pointer font-medium"
    >
      {children}
    </div>
  );
};

export default ButtonDropdownElement;
