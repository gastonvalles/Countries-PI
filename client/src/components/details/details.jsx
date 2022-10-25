import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesIds } from "../../redux/actions.js";
import NavBar from "../navBar/navbar.jsx";
import styles from "./details.module.css";

export default function CountryDetail(props) {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const country = useSelector((state) => state.detail);

    useEffect(() => {
        console.log(country)
    }, [country]);

    useEffect(() => {
        dispatch(getCountriesIds(id));
    }, [dispatch, id]);

    return (
        <div className={styles.prindiv}>
            <NavBar home={false} />
            <div className={styles.cardd}>
                <div className={styles.conpais} >
                    <h2 className={styles.titulod}>Country Details</h2>
                    {
                        country ?
                            <div >
                                <img className={styles.banderad} src={country.flagImg} alt="Not found" />
                                <h2 className={styles.nombred}>{country.name}</h2>
                                <h4 className={styles.continented}>{country.continent}</h4>
                                <h4 className={styles.codigo}>{country.id}</h4>
                                <h4 className={styles.detalle}>Capital: {country.capital}</h4>
                                <h4 className={styles.detalle}>Subregion: {country.subregion}</h4>
                                <h4 className={styles.detalle}>Area: {country.area} km²</h4>
                                <h4 className={styles.detalle}>Population: {country.population} Hab.</h4>
                            </div> : <p>Loading ...</p>
                    }
                </div>
                <div className={styles.conact}>
                    <h3 className={styles.titulod}>Touristic Activities</h3>
                    {
                        country.activities && country.activities.length
                            ? country.activities.map(e => {
                                return (
                                    <div>
                                        <h4 className={styles.nombreact}>{e.name}</h4>
                                        <p className={styles.detalle}>Difficulty: {e.difficulty}</p>
                                        <p className={styles.detalle}>Duration: {e.duration} hours</p>
                                        <p className={styles.detalle}>Season: {e.season}</p>
                                    </div>
                                )
                            })
                            : <p>There's no activities in this country</p>
                    }
                </div>
            </div>
        </div>
    )
};