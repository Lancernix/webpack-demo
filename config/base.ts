import path from 'path';
import { Configuration } from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
import { version as corejsVersion } from 'core-js/package.json';
import { version as runtimeVersion } from '@babel/plugin-transform-runtime/package.json';

const config: Configuration = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: { version: corejsVersion, proposals: true },
                },
              ],
              [
                '@babel/preset-react',
                {
                  // react17之后可以直接使用jsx无需显式引入React，需要设置此配置支持
                  // 默认为 classic，babel8中默认选项将改为 automatic
                  runtime: 'automatic',
                },
              ],
              '@babel/preset-typescript',
            ],
            plugins: [['@babel/plugin-transform-runtime', { version: runtimeVersion }]],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new HtmlPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 定义root节点的模板
      filename: 'index.html', // 指定输出的html文件名
      // inject: true, // 自动注入静态资源
    }),
  ],
};

export default config;
