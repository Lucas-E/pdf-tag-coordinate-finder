
# PDF Tag Finder

## Description

This project helps locate string tags within a PDF file, providing their coordinates and page numbers.

## Project Setup

### Prerequisites
- [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) installed

```
nvm install
```
Then, after installing the correct node.js version, run:
```
nvm use
```
Then, after using the correct node.js version, run:
```
npm install
```
## How to use the project

On the package.json, we have the "start" command. Our project runs with CLI arguments to specify the PDF file path and tags to search.
We can run the project as such:
```
npm run start -- --path"your/pdf/file/path/.pdf" --tags="tag1" "tag2"
```
It's important to separate tags with a blank space. The tags must be inside a string for the project to understand it.