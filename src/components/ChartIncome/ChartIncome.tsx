import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import style from './ChartIncome.module.scss';

interface ChartIncomeProps {
  data?: any[]
}

function ChartIncome(props: ChartIncomeProps) {
  const { data } = props;

  ChartJS.register(ArcElement, Tooltip);

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
  };

  const result = {
    labels: data?.map(x => x.name),
    datasets: [
      {
        data: data?.map(x => x.percent),
        backgroundColor: data?.map(x => x.color),
        borderWidth: 5,
        borderRadius: 10,
        borderColor: "#232623",
        hoverOffset: 15,
        cutout: '70%'
      },
    ]
  };

  return (
    <>
      <h3>R$ 7.000,00</h3>
      <Doughnut data={result} options={options} />
    </>
  )
}

export { ChartIncome };