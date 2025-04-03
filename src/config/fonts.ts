import {Fira_Code as FontMono, Inter as FontSans} from "next/font/google";
// import localFont from "next/font/local";

// export const fontProxima = localFont({
//   src: [
//     {
//       path: "https://raw.githubusercontent.com/anon-phantom/fonts/main/woff2/4946e342-3db1-3c8b-8a6d-2e8089636d8e.woff2",
//       weight: "100",
//       style: "normal",
//     },
//     {
//       path: "https://raw.githubusercontent.com/anon-phantom/fonts/main/woff2/a433b297-c7c3-3f85-b039-bae38339e2f5.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "https://raw.githubusercontent.com/anon-phantom/fonts/main/woff2/9f6cd1d8-17a1-38ba-b86d-47918d322a3f.woff2",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "https://raw.githubusercontent.com/anon-phantom/fonts/main/woff2/24342a4c-10c9-31eb-95eb-9805a70f2cd6.woff2",
//       weight: "800",
//       style: "normal",
//     },
//     {
//       path: "https://raw.githubusercontent.com/anon-phantom/fonts/main/woff2/e2c6510f-d7b2-360a-b950-6a9159e35f04.woff2",
//       weight: "900",
//       style: "normal",
//     },
//   ],
//   variable: "--font-proxima",
// });

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
