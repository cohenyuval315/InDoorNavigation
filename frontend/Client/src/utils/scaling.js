import { NativeModules, Dimensions, Platform, PixelRatio  } from "react-native";

const { width, height } = Dimensions.get('window');

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export function isTab() {
    if (WINDOW_WIDTH > 550) {
      return true
    } else {
      return false
    }
  }



const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];


const guidelineBaseWidth = 384;
const guidelineBaseHeight = 757.3333333333334;

export const scale = size => shortDimension / guidelineBaseWidth * size;
export const verticalScale = size => longDimension / guidelineBaseHeight * size;
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size, factor = 0.5) => size + (verticalScale(size) - size) * factor;

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;

export function FontSize(size) {
    const newSize = size * scale; // Using the same scaling factor as getNormalizedSize
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1
    }
}