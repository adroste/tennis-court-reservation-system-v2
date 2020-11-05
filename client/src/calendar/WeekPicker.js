import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React, { useCallback, useState } from 'react';

import Button from 'antd/es/button';
import { DatePicker } from './DatePicker';
import dayjs from 'dayjs';
import styles from './WeekPicker.module.css';

export function WeekPicker({
    date,
    onChange,
}) {
    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(true);
    }, []);

    const handlePreviousButtonClick = useCallback(e => {
        onChange(date.subtract(7, 'days'));
        setOpen(false);
    }, [date, onChange]);

    const handleNextButtonClick = useCallback(e => {
        onChange(date.add(7, 'days'));
        setOpen(false);
    }, [date, onChange]);

    const handleThisWeekButtonClick = useCallback(e => {
        onChange(dayjs());
        setOpen(false);
    }, [onChange]);

    const handleChange = useCallback(date => {
        onChange(date);
        setOpen(false);
    }, [onChange]);

    return (
        <div className={styles.wrapper}>

            <DatePicker
                className={styles.picker}
                picker="week"
                open={open}
                inputReadOnly
                allowClear={false}
                bordered={true}
                value={date}
                format={'[Kalenderwoche] w (YYYY)'}
                onClick={handleClick}
                onChange={handleChange}
                panelRender={panel => 
                    <div className={styles.pickerPanel}>
                        {panel}
                    </div>
                }
                renderExtraFooter={() => 
                    <Button onClick={handleThisWeekButtonClick} type="link">Diese Woche</Button>
                }
            />

            <Button 
                className={styles.leftButton} 
                onClick={handlePreviousButtonClick}
            >
                <LeftOutlined />
                Vorherige Woche
            </Button>

            <Button 
                className={styles.rightButton} 
                onClick={handleNextButtonClick}
            >
                Nächste Woche
                <RightOutlined />
            </Button>

        </div>
    );
}