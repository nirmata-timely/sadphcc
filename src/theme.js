import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";
import { Palette } from "@mui/icons-material";

//color design tokens
export const tokens = (mode) =>({

    ...createContext(mode === 'dark' ? {

        black: {
            100: "#ced0d7",
            200: "#9da2af",
            300: "#6c7387",
            400: "#3b455f",
            500: "#0a1637",
            600: "#08122c",
            700: "#060d21",
            800: "#040916",
            900: "#02040b"
        },
        white: {
            100: "#ffffff",
            200: "#ffffff",
            300: "#ffffff",
            400: "#ffffff",
            500: "#ffffff",
            600: "#cccccc",
            700: "#999999",
            800: "#666666",
            900: "#333333"
        },

        orange: {
          100: "#fce9e9",
          200: "#f9d3d3",
          300: "#f6bcbc",
          400: "#f3a6a6",
          500: "#f09090",
          600: "#c07373",
          700: "#905656",
          800: "#603a3a",
          900: "#301d1d"
},
        white1: {
          100: "#fbfcfd",
          200: "#f7f8fb",
          300: "#f3f5fa",
          400: "#eff1f8",
          500: "#ebeef6",
          600: "#bcbec5",
          700: "#8d8f94",
          800: "#5e5f62",
          900: "#2f3031"
},
        yellow: {
          100: "#fff0f5",
          200: "#ffe1ea",
          300: "#ffd3e0",
          400: "#ffc4d5",
          500: "#ffb5cb",
          600: "#cc91a2",
          700: "#996d7a",
          800: "#664851",
          900: "#332429"
},
        yellow2: {
          100: "#fcf7e5",
          200: "#f9eeca",
          300: "#f5e6b0",
          400: "#f2dd95",
          500: "#efd57b",
          600: "#bfaa62",
          700: "#8f804a",
          800: "#605531",
          900: "#302b19"
},
        white3: {
          100: "#f8fffb",
          200: "#f1fff7",
          300: "#eafff4",
          400: "#e3fff0",
          500: "#dcffec",
          600: "#b0ccbd",
          700: "#84998e",
          800: "#58665e",
          900: "#2c332f"
},
    } :{
        black: {
            100: "#02040b",
            200: "#040916",
            300: "#060d21",
            400: "#08122c",
            500: "#0a1637",
            600: "#3b455f",
            700: "#6c7387",
            800: "#9da2af",
            900: "#ced0d7"
        },
        white: {
            100: "#333333",
            200: "#666666",
            300: "#999999",
            400: "#cccccc",
            500: "#ffffff",
            600: "#ffffff",
            700: "#ffffff",
            800: "#ffffff",
            900: "#ffffff"
        },

        orange: {
          100: "#301d1d",
          200: "#603a3a",
          300: "#905656",
          400: "#c07373",
          500: "#f09090",
          600: "#f3a6a6",
          700: "#f6bcbc",
          800: "#f9d3d3",
          900: "#fce9e9"
},
        white1: {
          100: "#2f3031",
          200: "#5e5f62",
          300: "#8d8f94",
          400: "#bcbec5",
          500: "#ebeef6",
          600: "#eff1f8",
          700: "#f3f5fa",
          800: "#f7f8fb",
          900: "#fbfcfd"
},
        yellow: {
          100: "#332429",
          200: "#664851",
          300: "#996d7a",
          400: "#cc91a2",
          500: "#ffb5cb",
          600: "#ffc4d5",
          700: "#ffd3e0",
          800: "#ffe1ea",
          900: "#fff0f5"
},
        yellow2: {
          100: "#302b19",
          200: "#605531",
          300: "#8f804a",
          400: "#bfaa62",
          500: "#efd57b",
          600: "#f2dd95",
          700: "#f5e6b0",
          800: "#f9eeca",
          900: "#fcf7e5"
},
        white3: {
          100: "#2c332f",
          200: "#58665e",
          300: "#84998e",
          400: "#b0ccbd",
          500: "#dcffec",
          600: "#e3fff0",
          700: "#eafff4",
          800: "#f1fff7",
          900: "#f8fffb"
},
    })


})

// mui theme settings

export const themeSettings = (mode) => {
    const colors= tokens(mode);

    return{
        Palette:{
            mode:mode,
            ...Palette(mode=== 'dark'?{
                primary:{
                    main: colors.white[500]
                },
                secondary: {
                    main: colors.white[100]
                },
                neutral: {
                    dark: colors.black[700],
                    main: colors.black[500],
                    light: colors.black[100]

                },
                background: {
                    default: "#fcfcfc"
                }, 


            } : {
                 // palette values for light mode
            primary: {
                main: colors.primary[100],
              },
              secondary: {
                main: colors.yellow[500],
              },
              neutral: {
                dark: colors.black[700],
                main: colors.black[500],
                light: colors.black[100],
              },
              background: {
                default: "#fcfcfc",
              },
            })
        },
        typography: {
            fontFamily: ["Source Code Pro", "sans-serif"].join(","),
            fontSize:12,
            h1:{
                fontFamily: ["Source Code Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2:{
                fontFamily: ["Source Code Pro", "sans-serif"].join(","),
                fontSize: 32,
            }, 
            
            h3:{
                fontFamily: ["Source Code Pro", "sans-serif"].join(","),
                fontSize: 24,
            }, 
            h4:{
                fontFamily: ["Source Code Pro", "sans-serif"].join(","),
                fontSize: 20,
            }, 
            h5:{
                fontFamily: ["Source Code Pro", "sans-serif"].join(","),
                fontSize: 16,
            }, 
            h6:{
                fontFamily: ["Source Code Pro", "sans-serif"].join(","),
                fontSize: 14,
            },

        },
    };
};

