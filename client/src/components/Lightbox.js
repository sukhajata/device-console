
import React, { useState, useEffect } from 'react';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Grid from "@material-ui/core/Grid";

const fit = {
    width: window.innerWidth * 0.8 < 1200 ? window.innerWidth * 0.8 : 1200
};

const rotate90 = {
    ...fit,
    transform: 'rotate(90deg)'
};


const Lightbox = ({ images, open, handleModalClose }) => {
    const [currentIndex, setCurrentIndex]= useState(0);
    //const [currentImage, setCurrentImage] = useState();

    /*const { clientWidth, clientHeight } = document.documentElement;
    let imageWidth, imageHeight, imageVerticalMargin, imageHorizontalMargin;
    if (clientHeight < clientWidth) {
        imageHeight = clientHeight * 0.9;
        imageWidth = imageHeight;
    } else {
        imageWidth = clientWidth * 0.9;
        imageHeight = imageWidth;
    }
    imageVerticalMargin = (clientHeight - imageHeight) / 2;
    imageHorizontalMargin = (clientWidth - imageWidth) / 2;*/

    useEffect(() => {
        if (images) {
            setCurrentIndex(0);   
        }
    }, [images])


    const next = () => {
        if (images[currentIndex + 1]) {
            //setCurrentImage(images[currentIndex + 1]);
            setCurrentIndex(currentIndex + 1);
        }
    }

    const previous = () => {
        if (images[currentIndex - 1]) {
            //setCurrentImage(images[currentIndex - 1]);
            setCurrentIndex(currentIndex - 1);
        }
    }


    return (
        <>
            {images.length > 0 &&
                <Grid container direction="row" justify="space-around" alignItems="flex-start" style={{ marginTop: 20 }}>
                    <Grid item>
                        <KeyboardArrowLeft
                            style={{ color: images[currentIndex - 1] ? '#000' : '#fff', fontSize: 64 }}
                            onClick={previous}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <img
                            src={images[currentIndex].value}
                            style={images[currentIndex].orientation == 12   ? rotate90 : fit}
                            alt=""
                        />
                    </Grid>
                    <Grid item>
                        <KeyboardArrowRight
                            style={{ color: images[currentIndex + 1] ? '#000' : '#fff', fontSize: 64 }}
                            onClick={next}
                        />
                    </Grid>
                </Grid>
            }
        </>
    )
    
}

export default Lightbox;

/*
position: 'absolute', left: imageHorizontalMargin / 2, top: clientHeight / 2, zIndex: 100
position: 'absolute', right: imageHorizontalMargin / 2, top: clientHeight / 2, zIndex: 100 
            <Close
                onClick={handleModalClose}
                style={{ color: '#000', fontSize: 48, position: 'absolute', right: 15, top: 15, zIndex: 1000 }}
            />
                             style={{
                                    width: imageWidth,
                                    height: imageHeight,
                                    paddingTop: imageVerticalMargin,
                                    marginBottom: imageVerticalMargin,
                                    marginLeft: imageHorizontalMargin,
                                    marginRight: imageHorizontalMargin
                                }}
                                */