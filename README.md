# Frontend masters course download tool

[![npm version](http://img.shields.io/npm/v/fm-download.svg?style=flat)](https://npmjs.org/package/fm-download 'View this project on npm')

A simple CLI to download full Frontend Masters courses to watch off-line.

## Requirements

* Node v8.3 or higher

## Instalation

```
git clone git@github.com:frontendmonster/fm-download.git
```

```
cp .env-sample .env
```

## Config

| KEY      | NAME                          |
| -------- | ----------------------------- |
| USERNAME | your frontendmasters username |
| PASSWORD | your frontendmasters password |

## Usage

```
node index.js -c <COURSE_SLUG>
```

## Example
```
node index.js -c javascript-hard-parts
```

## Options:

| option          | desc                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| -h --help       | Help                                                                      |
| -c --course     | Slug for the course download (ex.: javascript-hard-parts')                |
| -s --skip       | Number of videos to skip (ex.: 5, would start download on video number 6' |
| -d --dir        | Download Directory                                                        |
| -f --format     | File format (mp4, webm)                                                   |
| -r --resolution | Video resolution (1080, 720)                                              |
