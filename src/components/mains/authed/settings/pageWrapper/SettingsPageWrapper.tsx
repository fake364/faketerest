import React from 'react';

type Props = { title: string; subtitle: string };

const SettingsPageWrapper: React.FC<Props> = ({
  subtitle,
  children,
  title
}) => {
  return (
    <div className="flex flex-col gap-[18px] max-w-[630px]">
      <h2 className="font-normal text-[28px]">{title}</h2>
      <p>{subtitle}</p>
      {children}
    </div>
  );
};

export default SettingsPageWrapper;
