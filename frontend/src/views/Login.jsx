import { Link } from "react-router-dom"
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);

    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }

        setErrors(null)

        axiosClient.post('/login', payload)
        .then(({data}) => {
            console.log(data);
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                if (response.data.errors) {
                    setErrors(response.data.errors)
                }
                else {
                    setErrors({
                        'error': [response.data.message]
                    })
                }
            }
        })
    }

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6">
                <form className="form mt-5" onSubmit={onSubmit} action="">
                    <h3 className="text-center">Login</h3>
                    {errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                        </div>
                    }
                    <div className="form-group mt-3">
                        <label htmlFor="username" className="">Username:</label><br/>
                        <input ref={usernameRef} type="text" className="form-control"/>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password" className="">Password:</label><br/>
                        <input ref={passwordRef} type="password" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="remember-me" className=""></label><br/>
                        <input type="submit" name="submit" className="btn btn-dark btn-md" value="Submit"/>
                    </div>
                    <div className="text-right mt-2">
                        Not registered? <Link to="/signup">Create an account</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
