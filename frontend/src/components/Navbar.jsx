import React from 'react'

import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar({ isAuthenticated, username, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark ticky-top bg-body-tertiary"
    data-bs-theme="dark">
    <div className="container">
        <a className="navbar-brand fw-light" href="/"><FontAwesomeIcon className='me-3 navbar-icon' icon={faTwitter}/>Twitter</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
                {isAuthenticated ? (
                    <>
                        <li className="nav-item me-4">
                        <a className="font-weight-light nav-link fw-light" href="#">
                            {username}
                        </a>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <button onClick={onLogout} className="btn btn-primary btn-sm" type="">Log out</button>
                        </li>
                    </>
                ):
                (
                    <>
                        <li className="nav-item">
                            <a className="font-weight-light nav-link active" aria-current="page" href="/login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="font-weight-light nav-link" href="/signup">Register</a>
                        </li>
                    </>
                )
                }
                {/* @if (Auth::user()->is_admin)
                <li className="nav-item me-4">
                    <a className="{{ (Route::is('profile')) ? 'fw-bold' : 'font-weight-light'}} nav-link fw-light" href="{{ route('admin.dashboard') }}">
                        Admin Dashboard
                    </a>
                </li>
                @endif */
                }
            </ul>
        </div>
    </div>
</nav>

  )
}
