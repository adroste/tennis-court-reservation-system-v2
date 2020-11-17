import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { Ball } from '../Ball';
import { Space } from 'antd';

export function StatusText({ 
    className,
    loading,
    error,
    success,
    text
}) {
    return (
        <Space className={className}>
            {loading && <Ball visible spin />}
            {error && <CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
            {success && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
            <span>{text}</span>
        </Space>
    );
}