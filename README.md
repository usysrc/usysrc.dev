[<img alt="Deployed with FTP Deploy Action" src="https://img.shields.io/badge/Deployed With-FTP DEPLOY ACTION-%3CCOLOR%3E?style=for-the-badge&color=0077b6">](https://github.com/SamKirkland/FTP-Deploy-Action)

# Personal Website

This is my personal website which can be found under [usysrc.dev](https://usysrc.dev)

## Deployment

### Development

The site is deployed to github pages available under [https://usysrc.github.io/usysrc.dev/](https://usysrc.github.io/usysrc.dev/) via a github workflow on push to `dev`.

### Production

The site is deployed to production via a github workflow on push to `main`. You need to set the secrets(upload host, username, password) in the github repository settings.

# Local Development

```bash

hugo server -D
```
