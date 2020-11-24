import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import styles from './DatePicker.module.css';

const AntDatePicker = generatePicker(dayjsGenerateConfig);

export function DatePicker(props) {
    return (
        <AntDatePicker
            inputReadOnly
            size="large"
            panelRender={panel => 
                <div className={styles.pickerPanel}>
                    {panel}
                </div>
            }
            {...props}
        />
    );
}