# mtg-sheriff-bot
Assigns roles to 5 mentioned players for a game of sheriff.

## Summary
We created this bot to easily assign roles at any time or place.

## Commands
!sheriff \
!reveal-roles

## Dependencies
Node - v14.15.1 \
Discord.js - https://discord.js.org/#/

## Installation
1. Clone Repo
```
git clone https://github.com/ThisGuy169/mtg-sheriff-bot.git
cd mtg-sheriff-bot/
```
2. Remove the `.template` extension from `.env.template`.
```
mv .env.template .env
```
3. Open `.env` file in a text editor and add bot token.
```
DISCORD_BOT_TOKEN="TOKEN GOES HERE"
```
4. Install dependencies and start.
```
npm install
npm start
```

## Deployment