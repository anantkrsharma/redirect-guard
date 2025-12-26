import { resolve as _resolve } from "path";

export const entry = {
    background: "./src/background.ts",
    content: "./src/content.ts",
    popup: "./src/popup/index.tsx"
};
export const output = {
    filename: "[name].js",
    path: _resolve(__dirname, "dist")
};
export const resolve = {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
};
export const module = {
    rules: [
        {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }
    ]
};
