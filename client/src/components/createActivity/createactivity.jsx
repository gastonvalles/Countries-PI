import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCountries, postActivity } from "../../redux/actions.js";
import NavBar from "../navBar/navbar.jsx";
import styles from './createactivity.module.css';


function validate(input) {
    let errors = {};
    let dif = Number(input.difficulty);
    let dur = Number(input.duration);

    if (!input.name) errors.name = "Required field";
    else if (/[^A-Za-z0-9 ]+/g.test(input.name)) errors.name = "Name cannot have special characters or accents";

    if (!input.difficulty) errors.difficulty = "Required field";
    else if (dif <= 0 || dif > 5) errors.difficulty = "Must be between 1 and 5";

    if (!input.duration) errors.duration = "Required field";
    else if (dur <= 0 || dur > 24) errors.duration = "Must be between 1 and 24";

    if (!input.season || input.season === "empty") errors.season = "Required field";
    if (!input.countries || input.countries.length === 0) errors.countries = "Required field";

    return errors;
};


export default function CreateActivity() {
    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector((state) => state.countries);
    const [errors, setErrors] = useState({});

    //Objeto que le envio al server
    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: []
    });


    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        // console.log(input);
    };


    const handleSelect = (e) => {
        setInput((estado) => {
            return {
                ...estado,
                [e.target.name]: e.target.value
            }
        });
    };


    const handleMultiple = (e) => {
        console.log("pais que elegí " + e.target.value);
        e.preventDefault();
        setInput((estado) => {
            console.log(estado.countries);
            if (estado.countries.includes(e.target.value) === false) {
                return {
                    ...estado,
                    countries: [...estado.countries, e.target.value]
                }
            } else {
                return {
                    ...estado,
                    countries: [...estado.countries]
                }
            }
        });
    };


    function handleSubmit(e) {
        e.preventDefault();
        if (input.name.length > 0 && input.difficulty.length > 0 && input.duration.length > 0 && input.season.length > 0 && input.countries.length > 0) {
            dispatch(postActivity(input));
            alert("Activity succesfully created!");

            setInput({
                name: "",
                difficulty: "",
                duration: "",
                season: "",
                countries: []
            });
            history.push(`/home`);
        } else {
            alert('Complete correctly the form before sending it');
        }
    };


    return (
        <div className={styles.prindiv}>
            <NavBar home={false} />
            <div className={styles.contenedorform}>
                <h2 className={styles.titulof}>Create your Tourist Activity</h2>
                <div className={styles.formulario}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.campos}>
                            <label>Name: </label>
                            <input className={styles.inputs} type="text" placeholder="Ej: Skate" value={input.name} name="name" onChange={handleChange} />
                            {errors.name && (<p className={styles.errors}>{errors.name}</p>)}
                        </div>
                        <div className={styles.campos}>
                            <label>Choose a country: </label>
                            <select className={styles.inputs} name="countries" id="countries" placeholder="Ej: Burkina Faso" multiple>
                                <option value="empty">...</option>
                                {countries.map((el) => (
                                    <option value={el.id} key={el.id} onClick={handleMultiple}>{el.name}</option>
                                ))}
                            </select>
                            {errors.countries && (<p className={styles.errors}>{errors.countries}</p>)}
                        </div>
                        <div className={styles.campos}>
                            <label>Season: </label>
                            <select className={styles.inputs} name="season" id="season" onChange={handleSelect}>
                                <option value="empty">...</option>
                                <option value={"Verano"}>Summer </option>
                                <option value={"Invierno"}>Winter </option>
                                <option value={"Primavera"}>Spring </option>
                                <option value={"Otoño"}>Autumn/Fall </option>
                            </select>
                            {errors.season && (<p className={styles.errors}>{errors.season}</p>)}
                        </div>
                        <div className={styles.campos}>
                            <label>Difficulty: </label>
                            <input className={styles.inputs} type="number" placeholder="Between 1 and 5" value={input.difficulty} name="difficulty" onChange={handleChange} />
                            {errors.difficulty && (<p className={styles.errors}>{errors.difficulty}</p>)}
                        </div>
                        <div className={styles.campos}>
                            <label >Duration: </label>
                            <input className={styles.inputs} type="number" placeholder="Between 1 and 24" value={input.duration} name="duration" onChange={handleChange} />
                            <label className={styles.campos}> hours</label>
                            {errors.duration && (<p className={styles.errors}>{errors.duration}</p>)}
                        </div>
                        <div className={styles.campos}>
                            <button className={styles.botsub} type="submit" disabled={Object.keys(errors).length === 0
                                ? false
                                : true}>Add Activity</button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
};