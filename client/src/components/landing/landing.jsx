import React from "react";
import { Link } from "react-router-dom";
import logo from '../../components/images/logo.png';
import styles from '../landing/landing.module.css';

export default function Landing() {
    return (
        <div classname={styles.img}>
            <Link to='/home' >
                <button classname={styles.btn} >
                    <img classname={styles.i} src={logo} alt={''} />
                </button>
            </Link>
        </div>
    )
};