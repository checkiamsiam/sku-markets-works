import Switch from '@mui/material/Switch';
import { useAddOrUpdateAlertMutation } from 'features/alert/alertAPI';
import { useState } from 'react';

const ActiveStatus = ({ row }) => {
    const [addOrUpdateAlert] = useAddOrUpdateAlertMutation();

    const [checked, setChecked] = useState(row?.active || false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        addOrUpdateAlert({
            product: row?._id,
            active: event.target.checked,
        });
    };

    return (
        <Switch
            checked={checked}
            size="small"
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
};

export default ActiveStatus;
