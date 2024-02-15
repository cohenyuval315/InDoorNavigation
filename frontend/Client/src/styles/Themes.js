function getContrastRatio(hexColor1, hexColor2) {
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

export const DarkTheme2 = {
   key:"darkTheme2",
   dark: true,
   colors: {
      primary: 'rgb(0, 0, 0)',
      background: 'rgb(0, 200, 0)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
   },
};

export const LightTheme = {
    key:"lightTheme",
    dark: false,
    colors: {
       primary: 'rgb(242, 242, 242)',
       background: 'rgb(242, 242, 242)',
       card: 'rgb(255, 255, 255)',
       text: 'rgb(28, 28, 30)',
       border: 'rgb(199, 199, 204)',
       notification: 'rgb(255, 69, 58)',
    }
 }
export const DarkTheme = {
   key:"darkTheme",
   dark: true,
   colors: {
      primary: '#BB86FC', // purple 200
      primaryVariant:'#3700B3', // purple 700
      secondary:'#03DAC6', // teal 200
      accent:'#CE93D8', //  text or buttons backgorund
      background: '#121212',
      surface:'#121212',
      error:'#CF6679',
      onPrimary:'#000000',
      onSecondary:'#000000',
      onBackground:'#FFFFFF',
      onSurface:'#FFFFFF',
      onError:'#000000',
      mainContentElevation:1,
      buttonElevation:6,
      bottomTabsElevation:8,
      disabledTextOpacity:0.38,
      mediumEmphasisTextOpacity:0.6,
      highEmphasisTextOpacity:0.87,
      elevation1: {
         elevation: 1,
         backgroundColor: 'rgba(255, 255, 255, 0.05)', // Overlay for elevation 1
       },
       elevation2: {
         elevation: 2,
         backgroundColor: 'rgba(255, 255, 255, 0.07)', // Overlay for elevation 2
       },      

   },
}
