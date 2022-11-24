import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { PostDisplayEntity } from '../../../mainGallery/galleryFakeItem/GalleryFakeItem';
import useFakeSnackbar from '../../../../../../snackbar/hooks/useFakeSnackbar/useFakeSnackbar';
import clsx from 'clsx';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { mobileCheck } from '../../../../../../common/utils/mobileCheck/mobileCheck';

type Props = { userId: number; username: string };

const CreatedPins: React.FC<Props> = ({ userId, username }) => {
  const { t } = useTranslation('common');
  const [createdPosts, setCreated] = useState<(PostDisplayEntity | null)[]>(
    Array(5).fill(null)
  );
  const [totalCreated, setTotal] = useState(0);
  const { addFakeSnack } = useFakeSnackbar();
  const isMobile = mobileCheck();

  const setCreatedWithFixedLength = (posts: PostDisplayEntity[]) => {
    setCreated((prevPosts) => {
      const newPosts = [...prevPosts];
      for (let i = 0; i < 5; i++) {
        newPosts[i] = posts[i];
      }
      return newPosts;
    });
  };

  const fetchCreatedPosts = async () => {
    try {
      const {
        data: { posts, total }
      } = await axios.get<{ posts: PostDisplayEntity[]; total: number }>(
        '/api/posts',
        {
          params: {
            limit: 5,
            userId
          }
        }
      );
      setTotal(total);
      setCreatedWithFixedLength(posts);
    } catch (e) {
      addFakeSnack({ text: 'Could not fetch posts' });
    }
  };

  useEffect(() => {
    fetchCreatedPosts();
  }, []);

  return (
    <div
      className={clsx(
        'self-start',
        !isMobile
          ? 'p-[62px] self-start'
          : 'w-full flex justify-center pb-[74px]'
      )}
    >
      <Link href={`/${username}/fakes`}>
        <div className={'flex flex-col cursor-pointer'}>
          <div className={'flex'}>
            {createdPosts.map((post, index) => (
              <div
                className={clsx(
                  'w-[118px] h-[157px] relative border-[white] border-[1px] border-solid rounded-[16px]',
                  index > 0 && 'ml-[-86px]'
                )}
                style={{ zIndex: 6 - index }}
              >
                {post?.postId && (
                  <Image
                    src={`/posts/${post.postId}.jpg`}
                    layout={'fill'}
                    objectFit={'cover'}
                    objectPosition={'center'}
                    className={'rounded-[16px] '}
                  />
                )}
              </div>
            ))}
          </div>
          <div className={'flex flex-col ml-[12px]'}>
            <div className={'text-[20px] font-medium'}>{t('allPosts')}</div>
            <div className={'text-[12px] font-normal'}>
              {totalCreated} {t('posts')}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CreatedPins;
