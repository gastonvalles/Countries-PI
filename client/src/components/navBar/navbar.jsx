import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries, getCountriesByName } from "../../redux/actions.js";
import logo from "../images/logo.png";
import styles from "./navbar.module.css";


export default function NavBar({ setCurrentPage, handleFilterByAct, handleSortPop, home, handleSort, handleFilteredCountrie }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const activities = useSelector(state => state.allActivities);

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    function handleInputChange(e) {
        dispatch(getCountriesByName(e));
        setCurrentPage(1);
    };


    return (
        <div className={styles.navbar}>
            <div className={styles.contLogo}>
                <Link to="/home">
                    <button className={styles.btn}>
                        <img className={styles.i} src={logo} alt="logo" />
                    </button>
                </Link>
            </div>
            {
                home ? (
                    <div className={styles.contSearch}>
                        <div className={styles.search}>
                            <div>Find Your Next Destination</div>
                            <input className={styles.searchinp} value={name} type="text" placeholder="   Which country do you want to visit..."
                                onChange={(e) => { setName(e.target.value); handleInputChange(e.target.value) }}
                            />
                        </div>
                    </div>
                ) : null
            }
            {
                home ? (
                    <div className={styles.filtros}>
                        <div> Alphabetical Order
                            <select className={styles.select} onChange={handleSort}>
                                <option value="none">...</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div> Population
                            <select className={styles.select} onChange={handleSortPop}>
                                <option value="none">...</option>
                                <option value="mayp">Minor to Major</option>
                                <option value="menp">Major to Minor</option>
                            </select>
                        </div>
                        <div> Continent
                            <select className={styles.select} onChange={handleFilteredCountrie}>
                                <option value={"All"}>...</option>
                                <option value={"South America"}>South America</option>
                                <option value={"North America"}>North America</option>
                                <option value={"Africa"}>Africa</option>
                                <option value={"Asia"}>Asia</option>
                                <option value={"Europe"}>Europe</option>
                                <option value={"Oceania"}>Oceania</option>
                                <option value={"Antarctica"}>Antarctica</option>
                            </select>
                        </div>
                        <div> Search by Activity
                            {(activities?.length === 0)
                                ? <p>No activities have been created</p>
                                : <select className={styles.select} onChange={handleFilterByAct}>
                                    <option value={"All"}>...</option>
                                    {activities?.map(e => (
                                        <option value={e.name} key={e.id}>{e.name}</option>
                                    ))}
                                </select>
                            }
                        </div>
                    </div>
                ) : null
            }
            <Link to="/activities" className={styles.createAct}>
                <button className={styles.contAct}>
                    Create Touristic Activity
                </button>
            </Link>
        </div>
    )
};