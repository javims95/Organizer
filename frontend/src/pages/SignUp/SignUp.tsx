import React from 'react';
import './SignUp.scss';
import Input from '@components/Input/Input';

interface SignUpVM {
    title: string;
}

const SignUp = (props: SignUpVM) => {
    return (
        <>
            <div className="wrapper">
                <div className="register-box">
                    <h1>Crear una cuenta <b>gratis</b></h1>
                    <div className='input-box'>
                        <label htmlFor="name">Nombre</label>
                        <Input id='name' className='input-register' />
                    </div>
                    <div className='input-box'>
                        <label htmlFor="email">Email</label>
                        <Input type='email' id='email' className='input-register' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
