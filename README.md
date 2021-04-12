<div align="center">
  
# ☁️ Cloudflare Worker Starter

[![Node CI](https://github.com/BetaHuhn/cf-worker-starter/workflows/Node%20CI/badge.svg)](https://github.com/BetaHuhn/cf-worker-starter/actions?query=workflow%3A%22Node+CI%22) [![Release CI](https://github.com/BetaHuhn/cf-worker-starter/workflows/Release%20CI/badge.svg)](https://github.com/BetaHuhn/cf-worker-starter/actions?query=workflow%3A%22Release+CI%22) [![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/BetaHuhn/cf-worker-starter/blob/master/LICENSE) ![David](https://img.shields.io/david/betahuhn/cf-worker-starter)

Starter Template for Cloudflare Workers with GitHub Actions CI and Automatic Releases

</div>

## 🚀 Features

- Semantic Release with Gitmoji
- Automatic publishing with [wrangler-action](https://github.com/cloudflare/wrangler-action)
- Linting with [Eslint](https://eslint.org/)
- Automatic Dependabot PR merging
- Write code in Typescript
- Comes with Mocha tests
- Based on [Cloudflare's Workers template](https://github.com/cloudflare/worker-typescript-template)

## ⚙️ Setup

1. [Create a new repository from this template](https://github.com/betahuhn/cf-worker-starter/generate)
2. Clone your new repository
2. Install dependencies using `npm install`
3. Update package details in `package.json` and `README.md`
   1. Find and replace `betahuhn/cf-worker-starter` with `user/repository`
   2. Find and replace `@betahuhn/cf-worker-starter` with projects npm name
4. Create a repository secret called `CF_API_TOKEN ` to use the [wrangler-action](https://github.com/cloudflare/wrangler-action)
5. Specify your worker details in the `wrangler.toml` file (more info in [Cloudflare's Docs](https://developers.cloudflare.com/workers/cli-wrangler/configuration))

## 💻 Available commands

- run `yarn lint` or `npm run lint` to run eslint.
- run `yarn test` or `npm run test` to run all Mocha tests.
- run `yarn dev` or `npm run dev` to run the Worker locally with [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler/commands#dev).
- run `yarn build` or `npm run build` to produce a production version with webpack.

## ❔ About

This project was developed by me ([@betahuhn](https://github.com/BetaHuhn)) in my free time. If you want to support me:

[![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=394RTSBEEEFEE)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F81S2RK)

## 📄 License

Copyright 2021 Maximilian Schiller

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
