import React from 'react';
import './Banner.scss'
import Input from '@components/Input/Input';

function Banner() {
    return (
        <section className='full-width-banner'>
            <div className='banner'>
                <div className='row'>
                    <div className='text-left'>
                        <div>
                            <h1>Oranizator unifica tus tareas, compañeros de equipo y herramientas</h1>
                            <p>Mantenlo todo en el mismo lugar, aunque tu equipo no lo esté.</p>
                        </div>
                        <form className=''>
                            <Input
                                id={'email'}
                                type='email'
                                placeholder='Correo electrónico'
                                value=''
                                
                            />
                            <button>Regístrate, ¡es gratis!</button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Banner;