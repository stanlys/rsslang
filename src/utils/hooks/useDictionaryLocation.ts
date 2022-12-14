import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface DictionaryLocation {
  chapter: number | undefined;
  page: number | undefined;
}

const useDictionaryLocation = (): DictionaryLocation => {
  const [searchParams] = useSearchParams();

  const chapter = useMemo(() => {
    const chapterStr = searchParams.get('group');
    return chapterStr ? Number(chapterStr) : undefined;
  }, [searchParams]);

  const page = useMemo(() => {
    const pageStr = searchParams.get('page');
    return pageStr ? Number(pageStr) : undefined;
  }, [searchParams]);

  return {
    chapter,
    page,
  };
};

export default useDictionaryLocation;
