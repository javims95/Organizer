import React, { Component } from 'react';
import './Slider.scss'

export default class Slider extends Component {
    state = {
        images: [
            { id: 1, src: 'https://picsum.photos/id/237/900/500' },
            { id: 2, src: 'https://picsum.photos/id/238/900/500' },
            { id: 3, src: 'https://picsum.photos/id/239/900/500' }
        ],
        currentImageIndex: 0
    }

    goToPrevSlide = () => {
        if (this.state.currentImageIndex === 0) {
            return this.setState({
                currentImageIndex: this.state.images.length - 1
            });
        }

        this.setState(prevState => ({
            currentImageIndex: prevState.currentImageIndex - 1
        }));
    }

    goToNextSlide = () => {
        if (this.state.currentImageIndex === this.state.images.length - 1) {
            return this.setState({
                currentImageIndex: 0
            });
        }

        this.setState(prevState => ({
            currentImageIndex: prevState.currentImageIndex + 1
        }));
    }

    render() {
        const { images, currentImageIndex } = this.state;
        return (
            <div className="slider">
                {/* <button className='btn' onClick={this.goToPrevSlide}>Prev</button> */}
                <img className='img' src={images[currentImageIndex].src} alt="Slider" />
                <div>
                    <span className='main_carousel_left_arrow' onClick={this.goToPrevSlide}>                        
                        <img className='svg prev' src="angle-left-solid.svg" alt="" />
                    </span>
                    <span className='main_carousel_right_arrow' onClick={this.goToNextSlide}>
                        <img className='svg next' src="angle-right-solid.svg" alt="" />
                    </span>
                </div>
                {/* <button className='btn' onClick={this.goToNextSlide}>Next</button> */}
            </div>
        );
    }
}
