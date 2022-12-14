import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useEffect, useState } from 'react';
import { getNLastDays } from '../../utils/date';
import { getStatistics } from '../../api/statistics';
import { getChartData } from '../../utils/statistic';
import { useAppSelector } from '../../store/hooks';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const optionsLine = {
  responsive: true,
  type: 'line',
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'User statistic',
      font: {
        size: 18,
      },
    },
  },
};

export const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const labels = getNLastDays(10);

const Chart = (): JSX.Element => {
  const [chartValuesNewWords, setChartValuesNewWords] = useState<number[]>([]);
  const [chartValuesLearnedWords, setChartValuesLearnedWords] = useState<number[]>([]);

  const { id } = useAppSelector((state) => state.authorization);

  useEffect(() => {
    const loadStat = async (): Promise<void> => {
      const userStatistic = await getStatistics(id);
      const summaryStat = getChartData(userStatistic);
      const tempChartValueNewWords: number[] = [];
      const tempChartValueLearnedWords: number[] = [];
      summaryStat.forEach((stat) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        tempChartValueNewWords.push(stat.newWords);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        tempChartValueLearnedWords.push(stat.learnedWords);
      });
      setChartValuesNewWords(tempChartValueNewWords);
      setChartValuesLearnedWords(tempChartValueLearnedWords);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises, @typescript-eslint/no-empty-function
    loadStat().catch(() => {});
  }, [id]);

  const dataLineChart = {
    type: 'line',
    labels,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      filler: {
        propagate: true,
      },
    },
    datasets: [
      {
        label: 'Total words learned',
        data: chartValuesLearnedWords,
        borderColor: 'rgba(255, 193, 7, 1)',
        backgroundColor: 'rgba(255, 193, 7, 1)',
        fill: 'start',
        pointStyle: 'circle',
        pointRadius: 10,
      },
    ],
  };

  const dataBarChart = {
    type: Bar,
    labels,
    datasets: [
      {
        label: 'New words by day',
        data: chartValuesNewWords,
        borderColor: 'rgba(32, 201, 151, 1)',
        backgroundColor: 'rgba(32, 201, 151, 1)',
      },
    ],
  };

  return (
    <>
      <Line data={dataLineChart} />
      <Bar options={optionsBar} data={dataBarChart} />
    </>
  );
};

export default Chart;
