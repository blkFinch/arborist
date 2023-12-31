// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      primary: string;
      secondary: string;
      warning: string;
      danger: string;
      soft: string;
      background: string;
      info: string;
      dark: string;
      text: string;
    };
  }
}
