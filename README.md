<h1 align="center">Welcome to URL_Shortener 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="./LICENSE" target="_blank">
    <img alt="License: GPLv3.0" src="https://img.shields.io/badge/License-GPLv3.0-yellow.svg" />
  </a>
</p>

> A URL shortener backend service.

### ✨ [Try it now](https://妈妈说域名太长别人记不住.top)

## Install

```sh
git clone --depth=1 https://github.com/AcleaZimon/URL_Shortener.git
cd URL_Shortener
npm install
```

## Usage
Before using this, don't forget to check out the "config.yaml".

```sh
npm run dev
```
(Yes I'm indeed very lazy...Don't follow suit...)

It has only one api, "api/shorten", give it a POST request in JSON contains a object like "{ long_url: "https://example.com" }.<br/>
And it will return { shortCode: XXXXX } in normal situation.

- If the client send too many requests, will return { code: 429 }.
- If the link format is wrong, will return { error: XXXXX }.

Then access "https://yourdomain/shortCode". Magic appears.

BTW, if you don't think I'm a good doc writer, just copy the code of the website in "Try it now" section : ) 

## Author

👤 **Aclea Zimon**

* Github: [@AcleaZimon](https://github.com/AcleaZimon)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/AcleaZimon/URL_Shortener/issues). 

## Show your support

Give a star if this project helped you!

## 📝 License

Copyright © 2025 [Aclea Zimon](https://github.com/AcleaZimon).<br />
This project is [GPLv3.0](./LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
