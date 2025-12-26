import { resolve as _resolve } from "path";

export const mode = "development";
export const entry = {
    background: "./src/background.ts",
    popup: "./src/popup.ts",
    rules: "./src/rules.ts"
};
export const output = {
    filename: "[name].js",
    path: _resolve(__dirname, "dist")
};
export const module = {
    rules: [
        {
            test: /\.ts$/,
            use: "ts-loader",
            exclude: /node_modules/
        }
    ]
};
export const resolve = {
    extensions: [".ts", ".js"]
};
