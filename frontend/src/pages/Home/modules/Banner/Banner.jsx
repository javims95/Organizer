import React from 'react';
import './Banner.scss';
import Input from '@components/Input/Input';
import Button from './../../../../components/Button/Button';
import imageSrc from './collage.png';
import WavesSvg from './waves';

function Banner() {

    return (
        // <section className="full-width-banner">
        //     <div className="banner">
        //         <div className="row">
        //             <div className="text-left">
        //                 <div>
        //                     <h1>Oranizator unifica tus tareas, compañeros de equipo y herramientas</h1>
        //                     <p>Mantenlo todo en el mismo lugar, aunque tu equipo no lo esté.</p>
        //                 </div>
        //                 <div className="form">
        //                     <Input
        //                         id="email"
        //                         classname=""
        //                         type="mail"
        //                         placeholder="Correo electrónico"
        //                         borderRadius={true}
        //                         value=""
        //                         onChange={(event) => console.log(event.target.value)}
        //                         onFocus={(event) => console.log('Foco dentro')}
        //                         onBlur={(event) => console.log('Foco fuera')}
        //                     />
        //                     <Button 
        //                         id='submit'
        //                         text='Regístrate, ¡es gratis!'
        //                     />
        //                 </div>
        //             </div>
        //             <div className='image-right'>
        //                 <img src={imageSrc} alt="" />
        //             </div>
        //         </div>
        //     </div>
        // </section>
        <>
            <div className="header">
                <div className="inner-header flex">
                    {/* Content Banner */}
                    <div className="row">
                        <div className="text-left">
                            <div className='mb'>
                                <h1>Organizator unifica tus tareas, compañeros de equipo y herramientas</h1>
                                <p>Mantenlo todo en el mismo lugar, aunque tu equipo no lo esté.</p>
                            </div>
                            <div className="form">
                                <Input
                                    id="email"
                                    classname=""
                                    type="mail"
                                    placeholder="Correo electrónico"
                                    borderRadius={true}
                                    value=""
                                    onChange={(event) => console.log(event.target.value)}
                                    onFocus={(event) => console.log('Foco dentro')}
                                    onBlur={(event) => console.log('Foco fuera')}
                                />
                                <Button
                                    id='submit'
                                    text='Regístrate, ¡es gratis!'
                                />
                            </div>
                        </div>
                        <div className='image-right'>
                            <img src={imageSrc} alt="" />
                        </div>
                    </div>
                </div>

                {/* <!--Waves Container--> */}
                <div>
                    <WavesSvg />
                </div>
            </div>
        </>
    );
}

export default Banner;
