import React from "react";
import Slider from "react-slick";

export default class Slideshow extends React.Component {
    render(){
        var settings = {
            dots: this.props.dots,
            infinite: this.props.infinite,
            speed: this.props.speed,
            slidesToShow: this.props.slidesToShow,
            slidesToScroll: this.props.slidesToScroll
        };
        return(
            <Slider {...settings}>
                { this.props.children }
            </Slider>
        );
    }
}