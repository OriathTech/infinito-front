import { Gentium_Plus, Telex } from "next/font/google";

export const gentium = Gentium_Plus({
    subsets: ["latin"],
    weight: "400",
    variable: "--gentium"
});

export const gentiumBold = Gentium_Plus({
    subsets: ["latin"],
    weight: "700",
    style: "italic",
    variable: "--gentiumBold"
});

export const telex = Telex({
    subsets: ["latin"],
    weight: "400",
    variable: "--telex"
});
