import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { POSTS_FETCH_LIMIT } from '../../../mainGallery/utils/utils';
import { PostDisplayEntity } from '../../../mainGallery/galleryFakeItem/GalleryFakeItem';
import useFakeSnackbar from '../../../../../../snackbar/hooks/useFakeSnackbar/useFakeSnackbar';
import clsx from 'clsx';

type Props = { userId: number };

const CreatedPins: React.FC<Props> = ({ userId }) => {
  const [createdPosts, setCreated] = useState<(PostDisplayEntity | null)[]>(
    Array(5).fill(null)
  );
  const [totalCreated, setTotal] = useState(0);
  const { addFakeSnack } = useFakeSnackbar();

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
    <div className="self-start p-[62px]">
      <div className={'flex flex-col'}>
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
          <div className={'text-[20px] font-medium'}>Все пины</div>
          <div className={'text-[12px] font-normal'}>{totalCreated} пинов</div>
        </div>
      </div>
    </div>
  );
};

export default CreatedPins;
