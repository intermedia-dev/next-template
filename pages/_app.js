import '../styles/globals.css'
import {ThemeProvider, } from "styled-components";

let theme = {
    blackGray:{
        white: "#E6E6E6",
        lightest: "#B3B3B3",
        lighter: "#808080",
        light: "#4D4D4D",
        base: "#1A1A1A"
    },
    purple:{
        veryLight: "#D4D2EF",
        lighter: "#7E77CF",
        base: "#3D3597",
        dark: "#262262"
    },
    red:{
        veryLight: "#FFB3B3",
        lighter: "#FF3A3A",
        base: "#FF0000",
        dark: "#B30000"
    },
    green: {
        veryLight: "#A1BAB7",
        lighter: "#456E6B",
        base: "#00524B",
        dark: "#003B36"
    },
    yellow: {
        veryLight: "#FDF1D8",
        lighter: "#F8D78C",
        base: "#F1B527",
        dark: "#D89C0E"
    },
    lightBlue: {
        veryLight: "#E2E6F3",
        lighter: "#D4DAED",
        base: "#A4A7DA",
        dark: "#8084CB"
    },
    basicColors: {
        lightBlue: "#C4C6E7",
        red: "#FF0000",
        purple: "#262262",
        lightGreen: "#366A5E",
        green: "#003B36"
    },
    textColors: {
        additional: "#FFFFFF",
        paragraphs: "#000000",
        heading: "#2A256A"
    }
};


function MyApp({Component, pageProps}) {
    return <ThemeProvider theme={theme}>
        <Component {...pageProps} />
    </ThemeProvider>
}

export default MyApp
