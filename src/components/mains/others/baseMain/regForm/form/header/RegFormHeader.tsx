import React from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

type Props = {};

const RegFormHeader: React.FC<Props> = () => {
  const { t } = useTranslation('main-page');

  return (
    <>
      <div className="my-[16px]">
        <Image src={'/logo.png'} width={40} height={40} />
      </div>
      <div className="text-[36px] text-[#333333] font-semibold">
        {t('regForm.form.title')}
      </div>
      <div className="text-[16px] text-[#333333] mt-[8px]">
        {t('regForm.form.subtitle')}
      </div>
    </>
  );
};

export default RegFormHeader;
