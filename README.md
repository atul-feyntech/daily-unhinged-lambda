# The Daily Unhinged

Your daily dose of news with the BS filter engaged.

An automated, irreverent news digest that combines George Carlin's euphemism-hunting with Richard Feynman's clarity.

## Features

- Daily news digests from 70+ RSS feeds
- Sharp, witty commentary powered by Claude 3 Haiku
- Calendar-based navigation
- Dark, minimalistic design
- Automatic daily updates at 7 AM IST

## How It Works

1. **AWS Lambda** fetches news from global RSS feeds daily at 7 AM IST
2. **TF-IDF + keyword scoring** ranks and filters the most important stories
3. **AWS Bedrock (Claude 3 Haiku)** generates irreverent commentary
4. The digest is pushed to this repo and served via **GitHub Pages**

## Live Site

Visit: https://atul-feyntech.github.io/daily-unhinged-lambda/

## License

MIT
