import { resolve as _resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    entry: {
        background: "./src/background.ts",
        content: "./src/content.ts",
        popup: "./src/popup/index.tsx",
        rules: "./src/rules.ts"
    },
    output: {
        filename: "[name].js",
        path: _resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
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
    }
};
