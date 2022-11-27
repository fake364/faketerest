import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { POSTS_FETCH_LIMIT } from '../utils/utils';
import useFakeSnackbar from '../../../../../snackbar/hooks/useFakeSnackbar/useFakeSnackbar';
import useTranslation from 'next-translate/useTranslation';
import { PostDisplayEntity } from '../galleryFakeItem/GalleryFakeItem';

const useFetchGalleryImages = (fetchUsersId?: number) => {
  const [totalCount, setTotalCount] = useState(0);
  const offsetRef = useRef(0);
  const [posts, setPosts] = useState<PostDisplayEntity[]>([]);
  const { addFakeSnack } = useFakeSnackbar();
  const { t } = useTranslation('main-page');
  const [hasBeenFetched, setHasBeenFetched] = useState<boolean>(false);

  useEffect(() => {
    if (posts.length === 0) {
      fetchImages();
    }
  }, []);

  useEffect(() => {
    if (
      window.innerHeight >= document.body.scrollHeight &&
      posts.length !== totalCount
    ) {
      fetchImages();
    }
  }, [posts]);

  const fetchImages = async () => {
    try {
      const result = await axios.get('/api/posts', {
        params: {
          offset: offsetRef.current,
          limit: POSTS_FETCH_LIMIT,
          userId: fetchUsersId
        }
      });
      offsetRef.current += POSTS_FETCH_LIMIT;
      if (totalCount === 0) {
        setTotalCount(result.data.total);
      }
      setPosts((prev) => [...prev, ...result.data.posts]);
    } catch (e) {
      addFakeSnack({ text: t('gallery.errors.couldNotGetImages') });
    }
  };

  return { fetchImages, posts, totalCount, hasBeenFetched };
};

export default useFetchGalleryImages;
