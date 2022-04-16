import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function RegistrationView(props) {

    // set initial state of username, password, email
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState(''); 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email);
        props.onRegistration(username);
    }

    return (
    <   div>RegistrationView</div>
    )
}

RegistrationView.PropTypes = {
    onRegistration: PropTypes.func.isRequired,
};
