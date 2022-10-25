import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByAct, filterByContinents, getActivities, getCountries, orderByName, orderByPop } from "../../redux/actions.js";
import Card from "../card/card.jsx";
import NavBar from "../navBar/navbar.jsx";
import Paged from "../paged/paged.jsx";
import styles from "./home.module.css";

export default function Home() {
    const dispatch = useDispatch();
    const allCountries = useSelector(store => store.countries);

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(12);

    const [orden, setOrden] = useState("");

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const paged = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    //component did mount
    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch]);

    function handleFilteredCountrie(e) {
        dispatch(filterByContinents(e.target.value));
    };

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordered ${e.target.value}`);
    };

    function handleSortPop(e) {
        e.preventDefault();
        dispatch(orderByPop(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordered ${e.target.value}`);
    };

    function handleFilterByAct(e) {
        e.preventDefault();
        e.target.value === "none"
            ? dispatch(getCountries())
            : dispatch(filterByAct(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className={styles.prindiv}>
            <NavBar setCurrentPage={setCurrentPage} handleFilterByAct={handleFilterByAct} handleSortPop={handleSortPop} handleSort={handleSort} handleFilteredCountrie={handleFilteredCountrie} home={true} />
            <div className={styles.contenedorCards}>
                {currentCountries.length
                    ? currentCountries.map((e) => {
                        return (
                            <div className={styles.Card}>
                                <Card flagImg={e.flagImg} name={e.name} continent={e.continent} key={e.id} id={e.id} />
                            </div>
                        )
                    })
                    : <h1>Loading...</h1>}
            </div>
            <div className={styles.paginado}>
                <Paged
                    countriesPerPage={countriesPerPage}
                    allCountries={allCountries.length}
                    paged={paged}
                />
            </div>
        </div>
    )
};