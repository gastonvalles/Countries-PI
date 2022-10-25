import React from "react";
import styles from "./paged.module.css";

export default function Paginado({ countriesPerPage, allCountries, paged }) {
    const pageNumbers = [];

    for (let i = 1; i < allCountries / countriesPerPage + 1; i++) {
        pageNumbers.push(i);
    };

    return (
        <>
            <nav className={styles.paged}>
                <ul>
                    {pageNumbers?.map(number => (
                        <button className={styles.btn} key={number} onClick={() => paged(number)}>{number}</button>
                    ))
                    }
                </ul>
            </nav>
        </>
    )
};