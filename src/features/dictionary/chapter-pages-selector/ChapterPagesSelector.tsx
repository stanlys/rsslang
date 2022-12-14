import { useParams, Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

type ChapterPagesSelectorProps = {
  className?: string;
  pageCount: number;
  isCurrentPageLearned?: boolean;
};

const ChapterPagesSelector = ({
  pageCount,
  className,
  isCurrentPageLearned,
}: ChapterPagesSelectorProps) => {
  const { page } = useParams();

  return (
    <Pagination
      className={className || ''}
      color={isCurrentPageLearned ? 'primary' : 'secondary'}
      variant="outlined"
      shape="rounded"
      page={page ? +page : 0}
      count={pageCount}
      renderItem={(item) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <PaginationItem component={Link} to={`pages/${item.page || 1}`} {...item} />
      )}
    />
  );
};

export default ChapterPagesSelector;
