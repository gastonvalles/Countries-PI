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
        dispatch(getCountriesIds(id));
    }, [dispatch, id]);

    return (
        <div className={styles.prindiv}>
            <NavBar home={false} />
            <div className={styles.card} >

                {
                    country ?
                        <div className={styles.conpais}>
                            <div>
                                <h2 className={styles.nombred}>{country.name}</h2>
                                <p className={styles.codigo}>( {country.id} ) </p>
                            </div>
                            <img className={styles.banderad} src={country.flagImg} alt="Not found" />
                            <h4 className={styles.continented}>{country.continent}</h4>
                            <h4 className={styles.detalle}>Capital: {country.capital}</h4>
                            <h4 className={styles.detalle}>Subregion: {country.subregion}</h4>
                            <h4 className={styles.detalle}>Area: {country.area} km²</h4>
                            <h4 className={styles.detalle}>Population: {country.population} Hab.</h4>
                        </div> : <p className={styles.loading}>Loading ...</p>
                }
                <div className={styles.conact}>
                    <h2 className={styles.titulod}>Touristic Activities</h2>
                    {
                        country.Activities && country.Activities.length
                            ? country.Activities.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <h4 className={styles.nombreact}>{e.name}</h4>
                                        <p className={styles.detallea}>Difficulty: {e.difficulty}</p>
                                        <p className={styles.detallea}>Duration: {e.duration} hours</p>
                                        <p className={styles.detallea}>Season: {e.season}</p>
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