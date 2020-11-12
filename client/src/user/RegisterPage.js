import { Link } from 'react-router-dom';
import React from 'react';
import { RegisterForm } from './RegisterForm';
import styles from './RegisterPage.module.css';

export function RegisterPage() {

    // const onFinish = values => {
    //     console.log('Success:', values);
    // };

    // const onFinishFailed = errorInfo => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
        <div className={styles.wrapper}>

            <h1>
                Registrieren
                <div className={styles.loginItem}>
                    <span>Bereits registriert? </span>
                    <Link to="/login">Anmelden</Link>
                </div>
            </h1>

            <RegisterForm
                newUser
            />
        </div>
    );
}