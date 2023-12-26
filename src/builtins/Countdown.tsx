import { type FC } from 'react';

const Countdown: FC<{
  targetYear: number;
  targetMonth: number;
  targetDay: number;
}> = (props) => {
  const { targetYear, targetMonth, targetDay } = props;
  const targetDate = new Date(targetYear, targetMonth - 1, targetDay);
  const currentDate = new Date();
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return <h1>冲刺剩余：{remainingDays}天</h1>;
};
export default Countdown;
