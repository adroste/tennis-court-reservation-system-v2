import { Divider, List, Radio, Space, Statistic, Typography } from 'antd';
import React, { useCallback, useState } from 'react';

import styles from './StatsPage.module.css';

export function StatsPage() {

    const [timePeriod, setTimePeriod] = useState(30);

    const [stats, setStats] = useState({
        perPage: [
            ['/', 62],
            ['/myreservations', 42],
            ['/myaccount', 6],
        ],
        browser: [
            ['Chrome', 62],
        ],
        os: [
            ['Android', 20],
            ['Windows 10', 19],
            ['Mac OS', 18],
        ],
    });

    const handleTimePeriodChange = useCallback(e => {
        setTimePeriod(e.target.value);
    }, []);

    return (
        <div className={styles.wrapper}>

            <h1>Nutzungstatistiken</h1>
            <Space>
                <Typography.Text>Zeige Statistiken für Zeitraum:</Typography.Text>
                <Radio.Group onChange={handleTimePeriodChange} value={timePeriod}>
                    <Radio value={7}>7 Tage</Radio>
                    <Radio value={30}>30 Tage</Radio>
                    <Radio value={365}>1 Jahr</Radio>
                    <Radio value={0}>Alle</Radio>
                </Radio.Group>
            </Space>

            <Divider />

            <h2>Reservierungsstatistiken</h2>
            <Space size="large">
                <Statistic
                    title="Neue Reservierungen"
                    value={234}
                />

                <Statistic
                    title="Stornierte Reservierungen"
                    value={6}
                />

                <Statistic
                    title="Gesamte Reservierungen"
                    value={82}
                    suffix=" in Zeitraum"
                />
            </Space>

            <Divider />

            <h2>Besucherstatistiken</h2>
            <Space direction="vertical">
                <Space size="large">
                    <Statistic
                        title="Seitenaufrufe"
                        value={1234}
                    />

                    <Statistic
                        title="Besucher"
                        value={123}
                        prefix="&#177;"
                    />

                    <Statistic
                        title="Anteil Mobilgeräte"
                        value={24}
                        suffix="%"
                    />
                </Space>

                <h3>Pro Seite</h3>
                <List>
                    {stats.perPage.map(([page, views]) => (
                        <List.Item key={page}>
                            <span>{page}</span>
                            <span className={styles.spacer} />
                            <span>{views} Aufrufe</span>
                        </List.Item>
                    ))}
                </List>

                <h3>Browser</h3>
                <List>
                    {stats.browser.map(([browser, user]) => (
                        <List.Item key={browser}>
                            <span>{browser}</span>
                            <span className={styles.spacer} />
                            <span>{user} Benutzer</span>
                        </List.Item>
                    ))}
                </List>

                <h3>Betriebssysteme</h3>
                <List>
                    {stats.os.map(([os, user]) => (
                        <List.Item key={os}>
                            <span>{os}</span>
                            <span className={styles.spacer} />
                            <span>{user} Benutzer</span>
                        </List.Item>
                    ))}
                </List>
            </Space>

        </div>
    );
}