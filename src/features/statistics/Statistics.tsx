import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import DayliStatistics from './DailyStatistics';
import LongStatistic from './LongTermStatistic';

const Statistics = (): JSX.Element => {
  const { authorizeStatus } = useAppSelector((state) => state.authorization);

  if (!authorizeStatus) return <Navigate to="/auth" state={{ from: '/statistics' }} />;

  return (
    <>
      <DayliStatistics />
      <LongStatistic />
    </>
  );
};

export default Statistics;
