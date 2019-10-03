import * as React from 'react';
import { isMobile } from 'react-device-detect';
import Slider from "react-slick";

// CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Services
import { UrlService } from '../Services/UrlService';
import { PARTNERS } from "../Services/ImageService";

export default class PartnerCarousel extends React.Component {
  private readonly blockName = "partnerCarousel";
  private readonly urlService: UrlService;

  public constructor (props: {}) {
    super(props);

    this.urlService = new UrlService();
  }

  public render () {
    const logoStyling = isMobile ? `${this.blockName}__logo--mobile` : `${this.blockName}__logo--desktop`;

    const settings = {
      autoplay: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: isMobile ? 1 : 3,
      slidesToScroll: 1,
      arrows: false,
      fade: isMobile,
    };


    return (
        <div className={this.blockName}>
          <div className="card">
            <div className="card-body">

              <Slider {...settings}>
                {Object.keys(PARTNERS).map((partner, key) => {
                  return (
                      <div key={key}>
                        <img
                            key={key}
                            src={this.urlService.mergeBaseWithPathURL(PARTNERS[partner])}
                            className={`${this.blockName}__logo ${logoStyling}`}
                            alt={partner}
                        />
                      </div>
                  );
                })}
              </Slider>

            </div>
          </div>
        </div>
    );
  }
}
