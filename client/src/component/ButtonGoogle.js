import React from 'react';



const ButtonGoogle = () => {
    return (
        <div>
            <a href="http://localhost:8000/api/auth/google" className="btn btn-info btn-block">
                <i className="fab fa-google mr-2"></i> Login with Google
            </a>
        </div>
    );
}

export default ButtonGoogle;