import * as React from 'react';
import styles from "./LoginForm.module.css";
import {isUserInRole} from "../../axios_helper";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "login", // Aktywny formularz
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            onLogin: props.onLogin,
            onRegister: props.onRegister
        };
    }

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
    };

    onSubmitLogin = (e) => {
        this.state.onLogin(e, this.state.login, this.state.password)
    };

    onSubmitRegister = (e) => {
            this.state.onRegister(
                e,
                this.state.firstName,
                this.state.lastName,
                this.state.login,
                this.state.password
            );
        }
    render() {
        return (
            <div className={styles.row}>
                <div className={styles.col-4}>
                    <ul className={`${styles.nav} nav nav-pills nav-justified mb-3 btn btn-secondary`} id="ex1" role="tab-list">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`${styles.navLink} nav-link ${this.state.active === "login" ? "active" : ""}`}
                                id="tab-login"
                                onClick={() => this.setState({ active: "login" })}
                            >
                                Logowanie
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`${styles.navLink} nav-link ${this.state.active === "register" ? "active" : ""}`}
                                id="tab-register"
                                onClick={() => this.setState({ active: "register" })}
                            >
                                Rejestracja
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content">
                        {this.state.active === "login" && (
                            <div>
                                <form onSubmit={this.onSubmitLogin}>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            id="loginName"
                                            name="login"
                                            className="form-control"
                                            onChange={this.onChangeHandler}
                                        />
                                        <label className="form-label" htmlFor="loginName">Nazwa użytkownika</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            id="loginPassword"
                                            name="password"
                                            className="form-control"
                                            onChange={this.onChangeHandler}
                                        />
                                        <label className="form-label" htmlFor="loginPassword">Hasło</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mb-4">Zatwierdź</button>
                                </form>
                            </div>
                        )}
                        {this.state.active === "register" && (
                            <div>
                                <form onSubmit={this.onSubmitRegister}>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            className="form-control"
                                            onChange={this.onChangeHandler}
                                        />
                                        <label className="form-label" htmlFor="firstName">Imię</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            className="form-control"
                                            onChange={this.onChangeHandler}
                                        />
                                        <label className="form-label" htmlFor="lastName">Nazwisko</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            id="login"
                                            name="login"
                                            className="form-control"
                                            onChange={this.onChangeHandler}
                                        />
                                        <label className="form-label" htmlFor="login">Login</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="form-control"
                                            onChange={this.onChangeHandler}
                                        />
                                        <label className="form-label" htmlFor="password">Hasło</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mb-4">Zatwierdź</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
