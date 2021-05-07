<div align="center">
  
# ☁️🔗 URL redirection using CF Workers

[![Node CI](https://github.com/BetaHuhn/cf-worker-redirect/workflows/Node%20CI/badge.svg)](https://github.com/BetaHuhn/cf-worker-redirect/actions?query=workflow%3A%22Node+CI%22) [![Release CI](https://github.com/BetaHuhn/cf-worker-redirect/workflows/Release%20CI/badge.svg)](https://github.com/BetaHuhn/cf-worker-redirect/actions?query=workflow%3A%22Release+CI%22) [![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/BetaHuhn/cf-worker-redirect/blob/master/LICENSE) ![David](https://img.shields.io/david/betahuhn/cf-worker-redirect)

URL redirection running at the edge with Cloudflare Workers and Worker KV.

</div>

## ⭐ Features

- **Extremely fast** - *Runs on Cloudflare's Edge*
- **Simple to integrate** - *Integrate it with existing sites using Cloudflare*
- **Easy to manage** - *Redirects are stored in Workers KV*
- **Supports URL parameters** - *URL parameters are appended to the target URL if not already present*
- **Works in front of an existing website** - *If no redirect is found it can pass the request to the origin*

## 🚀 Get started

If you want to deploy this Worker yourself, clone this repo and cd into it:

```shell
git clone https://github.com/betahuhn/cf-worker-redirect && cd cf-worker-redirect
```

Install the required dev dependencies:

```shell
npm install
```

Next start the interactive deployment process:

```shell
npm run deploy
```

You will be asked to login to CloudFlare if not already authenticated. The programm will guide you through the process of setting up and deploying the Worker under your own CloudFlare Account.

## 📚 Usage

After you have deployed your Worker, head over to the [KV section of the Workers Dashboard](https://dash.cloudflare.com/?to=/:account/workers/kv/namespaces) and select your Namespace.

To add a redirect, simply enter the URL path you want to redirect as the key (including the leading `/`) and the target URL as the value.

Example:

| Key | Value |
| ------------- | ------------- |
| `/github` | `https://github.com/BetaHuhn` |

If your your Worker runs on example.com, all requests to example.com/github will be redirected to https://github.com/BetaHuhn.

If you have multiple domains pointing to the same worker, you can specify the domain in front of the path to target it specifically.

Example:

| Key | Value |
| ------------- | ------------- |
| `example.com/github` | `https://github.com/BetaHuhn` |
| `example2.com/github` | `https://github.com/` |
| `/foo` | `https://example3.com/bar` |

Both example.com/foo and example2.com/foo will redirect to example3.com/bar

### Root page

Since a key in your KV Namespace specifies a URL path with or without the domain, you can also specify a redirect if a user requests the root of your page (i.e. example.com/):

| Key | Value |
| ------------- | ------------- |
| `/` | `https://example.com/home` |
| `example.com/` | `https://example.com/home` |

### 404 Page

By default if a path is not found in the KV Namespace a 404 error will be returned. You can optionally redirect all 404 errors to a custom URL by specifying it with the `404` key:

| Key | Value |
| ------------- | ------------- |
| `404` | `https://example.com/home` |
| `example.com/404` | `https://example.com/home` |

### In front of origin

If you use the worker in front of your actual website, you can tell the worker to pass requests to the origin if no redirect is found:

| Key | Value |
| ------------- | ------------- |
| `404` | `pass` |

You can also use the `pass` value on any other key:

| Key | Value |
| ------------- | ------------- |
| `example.com/home` | `pass` |

### URL parameters

All URL search parameters will be passed on to the final URL if they are not already present in the specified target URL.

Example with a Worker running at example.com:

| Key | Value |
| ------------- | ------------- |
| `/blog-post-test` | `https://example.com/blog/posts/test` |

A user requesting example.com/blog-post-test?ref=Twitter will be redirected to https://example.com/blog/posts/test?ref=Twitter.

> If the specified target URL would have been `https://example.com/blog/posts/test?ref=Campaign` then the parameter `ref=Twitter` would have been ignored

## 🔨 Manual Setup

If you want to reuse the code for this Worker, generate a new one with [`wrangler`](https://github.com/cloudflare/wrangler):

```shell
wrangler generate new-worker https://github.com/betahuhn/cf-worker-redirect && cd new-worker
```

Next generate the `wrangler.toml` from the given template:

```shell
npm run generate
```

Set your account id in `wrangler.toml`, which can be found on your [Workers Dashboard](https://dash.cloudflare.com/?to=/:account/workers).

Create a KV namespace for cf-worker-redirect:

```shell
wrangler kv:namespace create "REDIRECT_KV"
```

You will be instructed to append some content to the `wrangler.toml` file.

Publish your Worker with: `wrangler publish`

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/BetaHuhn/cf-worker-redirect)

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
