// @source: marudy/react-native-responsive-screen repo

import { Dimensions, PixelRatio } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const widthPercentageToDP = widthPercent => {
    // Parse string percentage input and convert it to number.
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);

    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};

export const heightPercentageToDP = heightPercent => {
    // Parse string percentage input and convert it to number.
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);

    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};