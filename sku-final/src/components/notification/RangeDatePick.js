import { addDays, format } from 'date-fns';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';

const RangeDatePick = ({setSelectedValue , handleClose}) => {
  const date = new Date();
  const [range, setRange] = useState({
    from: date,
    to: date,
  });
  const handlePickDate = (range) => {
    setRange(range);
    const fromFormated = format(range.from, 'PP');
    const toFormated = format(range.to, 'PP');
    // setSelectedValue(`${fromFormated}-${toFormated}}`);
    // handleClose();
  };
  return (
    <div>
      <DayPicker mode="range" selected={range} onSelect={handlePickDate} />
    </div>
  );
};

export default RangeDatePick;
