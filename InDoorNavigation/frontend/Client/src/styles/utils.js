import { useTheme } from "@react-navigation/native";


export function getContrastRatio(hexColor1, hexColor2) {
    const rgb1 = parseInt(hexColor1.slice(1), 16);
    const rgb2 = parseInt(hexColor2.slice(1), 16);
  
    const L1 = 0.2126 * ((rgb1 >> 16) / 255) ** 2.2 +
               0.7152 * (((rgb1 >> 8) & 0xff) / 255) ** 2.2 +
               0.0722 * ((rgb1 & 0xff) / 255) ** 2.2;
  
    const L2 = 0.2126 * ((rgb2 >> 16) / 255) ** 2.2 +
               0.7152 * (((rgb2 >> 8) & 0xff) / 255) ** 2.2 +
               0.0722 * ((rgb2 & 0xff) / 255) ** 2.2;
  
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  }
 