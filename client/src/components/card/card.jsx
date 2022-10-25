import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";

export default function Card({ flagImg, name, continent, id }) {
    return (
        <div className={styles.card}>
            <Link to={`/countries/${id}`} className={styles.link}>
                <img src={flagImg} className={styles.flagImg} alt="Not found" />
                <h3 className={styles.name}>{name}</h3>
                <h5 className={styles.continent}>{continent}</h5>
            </Link>
        </div >
    )
};