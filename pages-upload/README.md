# Aparnamal QR Upload

GitHub Pages frontend for uploading files directly into `kranoopraj/Aparnamal/uploads/`.

## Live-page target

https://kranoopraj.github.io/Aparnamal/

## How it works

The page is static. A user enters a GitHub fine-grained personal access token and selects a file. The browser calls GitHub's Contents API and creates a new timestamp-prefixed file inside `uploads/`.

## Token permissions

Create a fine-grained token restricted to the `kranoopraj/Aparnamal` repository with **Contents: Read and write**. Never put the token in the source code, QR code, URL, or GitHub repository.

## Enable Pages

In GitHub repository **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**. The workflow in `.github/workflows/deploy-upload-pages.yml` then publishes `pages-upload/`.

