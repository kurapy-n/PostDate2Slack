# PostDate2Slack
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

## Setup
```
# Install node modules
npm install
# Create .clasp.json
cp .clasp.sample.json .clasp.json
# Create Google Apps Script Project, set scriptId to .clasp.json
# Push
clasp push
# Set Properties to the Google Apps Script Project
# slackToken, channel, username, icon_emoji
```

## Required Slack's Permission Scopes
- chat:write:bot (or chat:write:user)
- incoming-webhook
