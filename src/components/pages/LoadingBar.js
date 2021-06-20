import React from 'react';
import img_avatar from '../images/img_avatar.png'
import Lottie from 'react-lottie';
// import animationData from '.../lotties/26030-morphing-loading';
import loading from '../lotties/26030-morphing-loading.json'

const LoadingBar = (props) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading,
        speed:20,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    return (
        // <div className = "ui active dimmer whiter">
        <div className = "ui active dimmer whiter">
            <Lottie 
                options={defaultOptions}
                height={250}
                width={250}
                aria-aria-labelledby={props.text}
                style={{color:'white', fontSize:'18px', fontStyle:'bold'}}
            />
            {/* <img src={img_avatar}></img> */}
            {/* <div className = "ui big text loader">{props.text}</div> */}
            <div style={{color:'white', fontSize:'18px', fontStyle:'bold'}}>{props.text}</div>
        </div>
    );
};

LoadingBar.defaultProps = {
    text: "Loading..."
};

export default LoadingBar;
