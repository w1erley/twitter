import { useRef, useState } from "react";
import { Link } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const usernameRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);

    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            username: usernameRef.current.value,
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        axiosClient.post('/signup', payload)
        .then(({data}) => {
            console.log(data);
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors)
            }
        })
    }

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6">
                <form onSubmit={onSubmit} className="form mt-5" action="">
                    <h3 className="text-center">Register</h3>
                    {errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                        </div>
                    }
                    <div className="form-group">
                        <label htmlFor="username" className="">Username:</label><br/>
                        <input ref={usernameRef} type="text" name="username" id="username" className="form-control"/>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="name" className="">Name:</label><br/>
                        <input ref={nameRef} type="text" name="name" id="name" className="form-control"/>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email" className="">Email:</label><br/>
                        <input ref={emailRef} type="email" name="email" id="email" className="form-control"/>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password" className="">Password:</label><br/>
                        <input ref={passwordRef} type="password" name="password" id="password" className="form-control"/>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="confirm-password" className="">Confirm Password:</label><br/>
                        <input ref={passwordConfirmationRef} type="password" name="password_confirmation" id="confirm-password" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="remember-me" className=""></label><br/>
                        <input type="submit" name="submit" className="btn btn-dark btn-md" value="Submit"/>
                    </div>
                    <div className="text-right mt-2">
                        <a href="/login" className="">Login here</a>
                    </div>
                </form>
            </div>
        </div>
    )
}
