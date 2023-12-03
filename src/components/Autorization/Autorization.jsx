import React, { useContext, useEffect, useRef, useState } from "react";
import "./Autorization.css";
import { userDataContext } from "../../hooks/contexts/context";

const Autorization = ({ closeAutorizForm }) => {
    const email = useRef(null);
    const login = useRef(null);
    const password = useRef(null);
    const rememberData = useRef(null);
    const confirmPassword = useRef(null);

    const emailWarning = useRef(null);
    const loginWarning = useRef(null);
    const passwordWarning = useRef(null);

    const urlReg = "http://localhost:8000/api/auth/signup";
    const urlAuth = "http://localhost:8000/api/auth/signin";

    const { setjwtToken, setUsername, setLogin } = useContext(userDataContext);

    const handleSubmitReg = (e) => {
        e.preventDefault();
        passwordWarning.current.classList.remove("active");
        emailWarning.current.classList.remove("active");
        loginWarning.current.classList.remove("active");

        if (
            password.current.value === "" ||
            email.current.value === "" ||
            login.current.value === ""
        )
            return;

        if (password.current.value != confirmPassword.current.value) {
            passwordWarning.current.classList.add("active");
            return;
        }
        const user = {
            username: login.current.value,
            email: email.current.value,
            password: password.current.value,
        };

        fetch(urlReg, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(user),
        })
            .then(async (response) => {
                let json = await response.json();
                if (!response.ok) {
                    if (json.occupied == "email") {
                        emailWarning.current.classList.add("active");
                    }
                    if (json.occupied == "login") {
                        loginWarning.current.classList.add("active");
                    }

                    throw new Error("Email or login already exists");
                }
                return json;
            })
            .then((response) => {
                changeForm(e);
            })
            .catch((err) => console.log(err));
    };

    const hangleSubmitAuth = (e) => {
        e.preventDefault();
        const user = {
            username: login.current.value,
            password: password.current.value,
        };

        if (password.current.value === "" || login.current.value === "") return;

        fetch(urlAuth, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(user),
        })
            .then(async (response) => {
                let json = await response.json();
                if (!response.ok) {
                    alert("Неверный логин или пароль!");
                    throw new Error("Wrong data");
                }
                return json;
            })
            .then((response) => {
                setjwtToken(response.accessToken);
                setUsername(response.username);
                setLogin(true);

                alert("Добро пожаловать" + response.username);
                closeAutorizForm();
            })
            .catch((err) => console.log(err));
    };
    const [isRegistration, setRegistration] = useState(false);
    const changeForm = () => {
        setRegistration((prev) => !prev);
    };

    const onClose = (e) => {
        if (e.target === e.currentTarget) {
            closeAutorizForm();
        }
    };
    return (
        <div className={"autorization_form_container active"} onClick={onClose}>
            <div className={"autorization_form_content active"}>
                {!isRegistration && (
                    <form
                        className="autorization_form"
                        onSubmit={hangleSubmitAuth}
                    >
                        <h2>Вход в аккаунт</h2>
                        <div className="autorization_input">
                            <span>Логин</span>
                            <input name="login" ref={login} type="text" />
                        </div>
                        <div className="autorization_input">
                            <span>Пароль</span>
                            <input
                                name="password"
                                ref={password}
                                type="password"
                            />
                        </div>
                        <div className="autorization_input">
                            <span>Запомнить</span>
                            <input ref={rememberData} type="checkbox" />
                        </div>

                        <div className="autorization_buttons">
                            <input type="submit" value={"Войти"}></input>
                            <input
                                type="button"
                                value={"Регистрация"}
                                onClick={changeForm}
                            ></input>
                        </div>
                    </form>
                )}

                {isRegistration && (
                    <form
                        className="autorization_form"
                        onSubmit={handleSubmitReg}
                    >
                        <h2>Регистрация аккаунта</h2>
                        <div className="autorization_input">
                            <span>Почта</span>
                            <input name="email" ref={email} type="text" />
                        </div>
                        <span className="email warning" ref={emailWarning}>
                            Такая почта уже зарегистрирована
                        </span>

                        <div className="autorization_input">
                            <span>Логин</span>
                            <input name="login" ref={login} type="text" />
                        </div>
                        <span className="login warning" ref={loginWarning}>
                            Такой логин уже зарегистрирован
                        </span>

                        <div className="autorization_input">
                            <span>Введите Пароль</span>
                            <input
                                name="password"
                                ref={password}
                                type="password"
                            />
                        </div>
                        <div className="autorization_input">
                            <span>Повторите пароль</span>
                            <input ref={confirmPassword} type="password" />
                        </div>
                        <span className="login warning" ref={passwordWarning}>
                            Пароли не совпадают
                        </span>

                        <div className="autorization_buttons">
                            <input
                                type="submit"
                                value={"Зарегистрироваться"}
                            ></input>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Autorization;
