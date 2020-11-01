import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import Button from 'antd/es/button';
import { DatePicker } from './DatePicker';
import React from 'react';
import styles from './WeekPicker.module.css';

const weekFormat = date => {
    // const from = date.startOf('week');
    // const to = date.endOf('week');
    // return `Kalenderwoche ${date.format('w')}: ${from.format('D.M.YY')} - ${to.format('D.M.YY')}`;
    return `Kalenderwoche ${date.format('w (YYYY)')}`;
}


export function WeekPicker({
    date
}) {
    return (
        <div className={styles.wrapper}>

            <DatePicker
                className={styles.picker}
                picker="week"
                inputReadOnly
                allowClear={false}
                bordered={true}
                value={date}
                format={weekFormat}
                panelRender={panel => 
                    <div className={styles.pickerPanel}>
                        {panel}
                    </div>
                }
                renderExtraFooter={() => 
                    <Button type="link">Diese Woche</Button>
                }
            />

            <Button className={styles.leftButton}>
                <LeftOutlined />
                Vorherige Woche
            </Button>

            <Button className={styles.rightButton}>
                Nächste Woche
                <RightOutlined />
            </Button>

        </div>
    );
}