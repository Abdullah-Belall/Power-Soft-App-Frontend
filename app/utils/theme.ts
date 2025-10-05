import { createTheme } from "@mui/material/styles";

// دالة لإنشاء theme ديناميكي يستخدم CSS variables
export const createCustomTheme = () => {
  // الحصول على قيم CSS variables
  const getCSSVariable = (variableName: string) => {
    if (typeof window !== "undefined") {
      return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    }
    // قيم افتراضية للـ SSR
    const defaultValues: { [key: string]: string } = {
      "--main-color": "#14213d",
      "--light-color": "#212529",
    };
    return defaultValues[variableName] || "#495057";
  };

  const main = getCSSVariable("--main-color");
  const light = getCSSVariable("--light-color");

  return createTheme({
    palette: {
      primary: {
        main: main,
        contrastText: light,
      },
      secondary: {
        main: main,
        contrastText: light,
      },
      text: {
        primary: main,
        secondary: main,
      },
      background: {
        default: light,
        paper: light,
      },
      action: {
        hover: main,
      },
    },
    typography: {
      fontFamily: "roboto, Arial, sans-serif",
      allVariants: {
        fontFamily: "roboto, Arial, sans-serif",
      },
    },
    components: {
      MuiTextField: {
        defaultProps: {
          dir: "ltr",
        },
        styleOverrides: {
          root: {
            "& .MuiFilledInput-root": {
              fontFamily: "roboto",
              "&:before": {
                borderBottomColor: main,
              },
              "&:hover:not(.Mui-disabled):before": {
                borderBottomColor: main,
              },
              "&:after": {
                borderBottomColor: main,
              },
            },
            "& .MuiInputLabel-root": {
              color: main,
              fontFamily: "roboto",
              caretColor: `${main} !important`,
              right: "auto",
              transformOrigin: "top left",
              "&.Mui-focused": {
                color: `${main} !important`,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: `${main} !important`,
              caretColor: `${main} !important`,
              right: "auto",
              transformOrigin: "top left",
            },
            "& .MuiInputLabel-root.MuiFormLabel-filled": {
              right: "auto",
              caretColor: `${main} !important`,
              transformOrigin: "top left",
              color: main,
            },
            "& .MuiFilledInput-input": {
              caretColor: main,
              textAlign: "left",
              fontSize: "14px",
            },
            "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled": {
              color: `${main} !important`,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: "roboto",
            textTransform: "none",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily: "roboto",
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            "&.Mui-checked": {
              color: main,
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            "&.Mui-checked": {
              color: main,
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            "& .MuiTypography-root": {
              fontFamily: "roboto",
            },
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            "& .MuiSnackbarContent-root": {
              backgroundColor: "transparent !important",
              boxShadow: "none !important",
            },
          },
        },
      },
    },
  });
};
