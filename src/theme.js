import { createTheme } from "@mui/material/styles";

const DIVIDER = "#e5e7eb";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            light: "#818cf8",
            main: "#4f46e5",
            dark: "#3730a3",
            contrastText: "#fff",
        },
        secondary: {
            main: "#0f172a",
            contrastText: "#fff",
        },
        success: {
            main: "#15803d",
            light: "#dcfce7",
        },
        background: {
            default: "#f7f8fa",
            paper: "#ffffff",
        },
        text: {
            primary: "#0f172a",
            secondary: "#64748b",
        },
        divider: DIVIDER,
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        h5: { fontWeight: 700, letterSpacing: "-0.02em" },
        h6: { fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.3 },
        subtitle1: { fontWeight: 600, lineHeight: 1.35 },
        subtitle2: { fontWeight: 600 },
        button: { textTransform: "none", fontWeight: 600 },
        overline: { fontWeight: 600, letterSpacing: "0.08em" },
    },
    components: {
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
                root: { borderRadius: 10, paddingTop: 9, paddingBottom: 9 },
            },
        },
        MuiCard: {
            defaultProps: { elevation: 0 },
            styleOverrides: {
                root: {
                    border: `1px solid ${DIVIDER}`,
                    transition: "border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease",
                },
            },
        },
        MuiTextField: {
            defaultProps: { variant: "outlined", size: "small" },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    backgroundColor: "#ffffff",
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: { fontWeight: 600, borderRadius: 8 },
            },
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: { fontWeight: 500 },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: { borderRadius: 10 },
            },
        },
        MuiSkeleton: {
            styleOverrides: {
                root: { backgroundColor: "rgba(15, 23, 42, 0.06)" },
            },
        },
    },
});

export default theme;
