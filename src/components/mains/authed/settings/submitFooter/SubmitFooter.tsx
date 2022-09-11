import React from 'react';
import SecondaryButton from '../../../../../common/components/buttons/secondary-button/SecondaryButton';
import clsx from 'clsx';
import PrimaryButton from '../../../../../common/components/buttons/primary-button/PrimaryButton';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  wasFormChanged: boolean;
  onReset: () => void;
  isFormValid: boolean;
  isSubmitting: boolean;
};

const SubmitFooter: React.FC<Props> = ({
  wasFormChanged,
  onReset,
  isFormValid,
  isSubmitting
}) => {
  const { t } = useTranslation('settings');

  return (
    <div className="fixed bottom-0 py-[16px] bg-[white] w-full left-0 shadow-[0px_11px_16px_2px_rgb(0_0_0)] flex justify-center gap-[18px]">
      <SecondaryButton
        className={clsx(
          !wasFormChanged && '!text-[gray] pointer-events-none',
          'py-[16px] px-[24px] font-[400]'
        )}
        onClick={onReset}
      >
        {t('submitFooter.reset')}
      </SecondaryButton>
      {isFormValid && wasFormChanged && !isSubmitting ? (
        <PrimaryButton className={'!px-[18px]'} type="submit">{t('submitFooter.submit')}</PrimaryButton>
      ) : (
        <SecondaryButton className={'!text-[gray] pointer-events-none !px-[18px]'}>
          {t('submitFooter.submit')}
        </SecondaryButton>
      )}
    </div>
  );
};

export default SubmitFooter;
