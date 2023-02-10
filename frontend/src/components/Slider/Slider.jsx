import React, { Component } from 'react';
import './Slider.css';

export default class Slider extends Component {

    render() {
        return (
            <div>
                <div className="swiper mySwiper">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="title">
                                <h2 className="title__text">Swiper 9</h2>
                            </div>
                            <div className="background-image">
                                <img className="background-image__image" src="https://images.unsplash.com/photo-1550029402-226115b7c579?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80" alt="A random unsplash image" />
                            </div>
                        </div>

                        <div className="swiper-slide">
                            <div className="title">
                                <h2 className="title__text">Slide 2</h2>
                            </div>
                            <div className="background-image">
                                <img className="background-image__image" src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1326&q=80" alt="A random unsplash image" />
                            </div>
                        </div>
                    </div>

                    <div className="swiper-pagination"></div>

                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
            </div>
        );
    }
}