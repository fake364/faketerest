import React from 'react';
import { getDifferenceWithCode } from '../../../components/mains/authed/fakePost/postContent/commentBlock/comment/utils/utils';
import useTranslation from 'next-translate/useTranslation';

type Props = { createdAt: string; className?: string };

const CreatedAtLabel: React.FC<Props> = ({ createdAt, className }) => {
  const dateDifference = getDifferenceWithCode(createdAt);
  const { t } = useTranslation('common');

  return (
    <div className={className}>{`${
      dateDifference
        ? dateDifference[1] + ' ' + dateDifference[0]
        : t('fakePost.justNow')
    }`}</div>
  );
};

export default CreatedAtLabel;
