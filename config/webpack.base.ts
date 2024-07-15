import { version as runtimeVersion } from '@babel/plugin-transform-runtime/package.json';
import { version as corejsVersion } from 'core-js/package.json';
import HtmlPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration } from 'webpack';

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
        test: /\.(ts|tsx)$/,
        exclude: ['/node_modules/'],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: { version: corejsVersion, proposals: true },
                  modules: false,
                },
              ],
              [
                '@babel/preset-react',
                {
                  // react17之后可以直接使用jsx无需显式引入React，需要设置此配置支持
                  // 默认为 classic，babel8中默认选项将改为 automatic
                  runtime: 'classic',
                },
              ],
              '@babel/preset-typescript',
            ],
            plugins: [['@babel/plugin-transform-runtime', { version: runtimeVersion }]],
          },
        },
      },
      // {
      //   test: /\.(js|cjs|mjs)?$/,
      //   include: ['/node_modules/'],
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       cacheDirectory: true,
      //       presets: [
      //         [
      //           '@babel/preset-env',
      //           {
      //             useBuiltIns: 'usage',
      //             corejs: { version: corejsVersion, proposals: true },
      //           },
      //         ],
      //       ],
      //       plugins: [['@babel/plugin-transform-runtime', { version: runtimeVersion }]],
      //     },
      //   },
      // },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // 小于 10kb 则通过 dataUrl 的形式内联到 bundle 中
            // 大于 10kb 以输出为单独的图片文件
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  resolve: {
    // 增加别名设置，使引用模块简单
    alias: {
      components: path.resolve(__dirname, '../src/components/'),
      types: path.resolve(__dirname, '../src/types/'),
      assets: path.resolve(__dirname, '../src/assets/'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  plugins: [
    new HtmlPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 定义root节点的模板
      filename: 'index.html', // 指定输出的html文件名
      inject: true, // 自动注入静态资源
    }),
  ],
  stats: {
    assetsSort: 'size',
    chunks: true,
  },
};

export default config;
