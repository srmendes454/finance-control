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

  const dados = [
    {
      name: 'Essenciais',
      percent: 50,
      color: "#3E6943"
    },
    {
      name: 'Investimentos',
      percent: 20,
      color: "#BB832E"
    },
    {
      name: 'Lazer',
      percent: 30,
      color: "#2B6DD1"
    }
  ]

  const result = {
    labels: dados?.map(x => x.name),
    datasets: [
      {
        data: dados?.map(x => x.percent),
        backgroundColor: dados?.map(x => x.color),
        borderWidth: 5,
        borderRadius: 7,
        borderColor: "#232623",
        hoverOffset: 20,
        cutout: '85%'
      },
    ]
  };

  return (
    <div className={style.container}>
      <Doughnut data={result} options={options} />
    </div>
  )
}

export { ChartIncome };