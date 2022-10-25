import React from "react";
import { Link } from "react-router-dom";
import logo from '../../components/images/logo.png';
import styles from './landing.module.css';

export default function Landing() {
    return (
        <div className={styles.img}>
            <Link to='/home' >
                <button className={styles.btn} >
                    <img className={styles.i} src={logo} alt={''} />
                </button>
            </Link>
        </div>
    )
};