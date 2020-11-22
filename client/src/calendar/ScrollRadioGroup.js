import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Radio } from 'antd';
import classNames from 'classnames/bind';
import styles from './ScrollRadioGroup.module.css';

const cn = classNames.bind(styles);

const SCROLL_OFFSET_PX = -50;
const SCROLL_TRESHOLD_PX = 5; // needed for iOS overscoll

export function ScrollRadioGroup({
    children,
    ...rest
}) {
    const innerRef = useRef();
    const [leftScroll, setLeftScroll] = useState(false);
    const [rightScroll, setRightScroll] = useState(false);

    const updateStops = useCallback(() => {
        if (!innerRef.current)
            return;
        const { scrollLeft, scrollWidth, offsetWidth } = innerRef.current;
        setLeftScroll(scrollLeft > SCROLL_TRESHOLD_PX);
        setRightScroll((scrollWidth - offsetWidth - scrollLeft) > SCROLL_TRESHOLD_PX);
    }, []);

    useEffect(updateStops, [updateStops]);

    const handleClick = useCallback(e => {
        if (!innerRef.current)
            return;
        const offsetLeft = e?.target?.parentNode?.parentNode?.offsetLeft || 0;
        requestAnimationFrame(() => {
            innerRef.current.scrollLeft = Math.max(offsetLeft + SCROLL_OFFSET_PX, 0);
        });
    }, []);

    return (
        <div className={cn({
            outer: true,
            leftScroll,
            rightScroll,
        })}>
            <div
                className={styles.inner}
                onClick={handleClick}
                onScroll={updateStops}
                ref={innerRef}
            >
                <Radio.Group
                    buttonStyle="solid"
                    size="large"
                    {...rest}
                >
                    {children}
                </Radio.Group>
            </div>
        </div>
    );
}