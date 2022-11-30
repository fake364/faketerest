import React from 'react';
import ButtonDropdownElement from '../../../../../../../common/components/buttons/buttonDropdown/ButtonDropdownElement';
import Link from 'next/link';
import Image from 'next/image';
import CreatedAtLabel from '../../../../../../../common/components/createdAtLabel/CreatedAtLabel';
import PostCreatePayload from 'faketerest-utilities/dist/events/postCreate/types';
import getFirstLastName from '../../../../../../../common/utils/firstLastNameCreate/getFirstLastName';
import useTranslation from 'next-translate/useTranslation';

type Props = { data: PostCreatePayload };

const PostCreatedNotification: React.FC<Props> = ({
  data: { createdAt, postId, authorFirstname, authorLastName, authorId }
}) => {
  const { t } = useTranslation('common');
  const src = `http://localhost/static-box/posts/${postId}.jpg`;
  return (
    <Link href={'/fake/' + postId}>
      <ButtonDropdownElement onClick={(e) => e.stopPropagation()}>
        <div className={'flex gap-[12px]'}>
          <div className={'relative w-[120px] h-[95px]'}>
            <Image
              layout={'fill'}
              objectFit={'cover'}
              objectPosition={'center'}
              loader={() => src}
              src={src}
              className={'rounded-[12px]'}
            />
          </div>
          <div>
            {getFirstLastName(authorFirstname, authorLastName)}{' '}
            {t('notificationsText.posted.hasPostedImage')}
            <CreatedAtLabel
              createdAt={createdAt}
              className={'font-normal text-[16px] inline ml-[12px] text-[gray]'}
            />
          </div>
        </div>
      </ButtonDropdownElement>
    </Link>
  );
};

export default PostCreatedNotification;
