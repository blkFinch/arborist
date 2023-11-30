// my-theme.ts
import { DefaultTheme } from "styled-components";
import React from "react";
import { ThemeProvider } from "styled-components";

const theme : DefaultTheme = {
  borderRadius: "5px",

  colors: {
    primary: "#3500d3",
    secondary: "#190061",
    warning: "yellow",
    soft: "#f5f5f5",
    background: "#282828",
    info: "#240090",
    dark: "#0c0032",
    text: "#fff",
  },
};

const BaseTheme = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export { BaseTheme };
