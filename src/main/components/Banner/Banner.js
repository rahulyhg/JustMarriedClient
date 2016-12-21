import React, {Component, PropTypes} from "react";
import classnames from "classnames/bind";
import Slider from "react-slick";
import BannerSlide from "./BannerSlide/BannerSlide";
import styles from "./Banner.pcss";
import pair from "../../assets/background.jpg";
import rings from "../../assets/rings.jpg";
import calendar from "../../assets/calendar.jpg";

const cx = classnames.bind(styles);

export default class LayoutBanner extends Component {

    render() {

        const slickConfig = {
            dots: true,
            slidesToShow: 1,
            centerMode: true,
            slidesToScroll: 1,
            adaptiveHeight: false,
            variableWidth: false,
            centerPadding: '0'
        };

        const coverStyle = {
            width: '100%',
            height: '400px',
        };

        return (
            <div className={cx('layout-banner')}>
                <Slider className={cx('layout-banner__slider')} {...slickConfig}>

                    <div style={coverStyle}>
                        <BannerSlide img={pair} />
                    </div>
                    <div style={coverStyle}>
                        <BannerSlide img={calendar}/>
                    </div>
                    <div style={coverStyle}>
                        <BannerSlide img={rings}/>
                    </div>

                </Slider>
            </div>
        );


    }
}