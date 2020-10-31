import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';

export const DatePicker = generatePicker(dayjsGenerateConfig);