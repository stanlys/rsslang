import { Outlet, useParams } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { Badge, Stack } from 'react-bootstrap';
import styles from './ChapterLayout.module.scss';
import ChapterPagesSelector from '../chapter-pages-selector/ChapterPagesSelector';
import GamesLinks from '../games-links/GamesLinks';
import { DictionaryState, fetchUserPages } from '../dictionarySlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { UserPage } from '../../../model/UserPage';
import { RootState } from '../../../store/store';
import { AuthState } from '../../../model/AuthState';

const ChapterLayout = () => {
  const { chapter, page } = useParams();
  const dispatch = useAppDispatch();
  const { authorizeStatus, id: userId } = useAppSelector(
    (state: RootState): AuthState => state.authorization
  );
  const { userPages } = useAppSelector((state: RootState): DictionaryState => state.dictionary);

  useEffect(() => {
    if (userId && authorizeStatus) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(fetchUserPages(userId));
    }
  }, [authorizeStatus, dispatch, userId]);

  const isCurrentPageLearned = useMemo((): boolean => {
    if (!authorizeStatus) {
      return false;
    }

    const group = chapter ? +chapter - 1 : 0;
    const pageNum = page ? +page - 1 : 0;

    const currentUserPage = userPages.find(
      (userPage: UserPage): boolean => userPage.group === group && userPage.page === pageNum
    );

    return currentUserPage?.isLearned || false;
  }, [authorizeStatus, chapter, page, userPages]);

  return (
    <>
      <Stack className={styles.switchChapterPages} gap={2}>
        <Badge bg="success" className={`${isCurrentPageLearned ? '' : 'd-none'} p-2`}>
          Congratulations! You have learned all words on this page.
        </Badge>
        <ChapterPagesSelector
          className={isCurrentPageLearned ? styles.learnedPage : ''}
          pageCount={chapter === '7' ? 1 : 30}
          isCurrentPageLearned={isCurrentPageLearned}
        />
        <GamesLinks disabled={isCurrentPageLearned} />
      </Stack>
      <div className={styles.wordCardsWrapper}>
        <Outlet />
      </div>
    </>
  );
};

export default ChapterLayout;
