# The Daily Unhinged

> Your daily dose of news with the BS filter engaged.

An autonomous, AI-powered **Quantitative Satire Engine** that scrapes 70+ RSS feeds, ranks stories by importance, and generates economically rigorous yet deeply unhinged commentary—like if George Carlin had a PhD in Economics and a grudge against the Efficient Market Hypothesis.

**No human in the loop. Just vibes, scheduled triggers, and the Euler equation.**

---

## 🧠 The "Unhinged Economist" Engine

Powered by **Claude 3.5 Sonnet** and a proprietary knowledge base of economic theory (from Cobb-Douglas to the Todaro Paradox), this system doesn't just summarize news—it mathematically proves why the news is stupid.

### Features

- **Dense Economic Analysis:** High-entropy commentary that respects your time and insults your intelligence
- **Quantitative Satire:** We don't just say "inflation is bad"; we calculate the shift in the Phillips Curve
- **Market Predictions:** Specific, unhinged (but theoretically grounded) actionable predictions
- **Theory Citations:** Every take is backed by actual economic laws—Keynesian Multiplier, Deadweight Loss, CAPM, you name it
- **LaTeX Equations:** Because nothing says "I'm right" like $Y = AK^\alpha L^{1-\alpha}$

### Output Format

Each story now includes:

```markdown
### 1. WHEN CENTRAL BANKS PLAY MUSICAL CHAIRS WITH INTEREST RATES

**⚙️ The Mechanism:** Fed raised rates by 25bps, affecting Household
consumption via the Euler equation and Firm investment through higher
cost of capital.

> **📊 The Analysis:** Look, when $u'(c_t) = \beta(1+r)u'(c_{t+1})$
> and you JACK UP that $r$, households rationally defer consumption.
> But here's the thing—the Fed assumes rational agents, and I've
> MET humans. The MPC of the lowest quintile (0.218) means stimulus
> leaks straight to landlords anyway...

**📈 Market Call:** Short consumer discretionary; the Euler equation
says patience just got more expensive.

**📚 Theory:** Euler Equation, Keynesian Multiplier
```

---

## Live Site

**[https://atul-feyntech.github.io/daily-unhinged-lambda/](https://atul-feyntech.github.io/daily-unhinged-lambda/)**

## What It Does

Every morning at 7 AM IST, this system autonomously:

1. Wakes up and scrapes **70+ RSS feeds** from India, US, China, and global tech/business sources
2. Ranks stories using **TF-IDF scoring + keyword importance weighting**
3. Feeds top stories to **Claude 3 Haiku** with an unhinged system prompt
4. Generates for each story:
   - **Catchy title** - Captures the real story the headline is hiding
   - **"What happened"** - TL;DR so you don't need to click the link
   - **"The take"** - Unhinged commentary that makes you snort-laugh
5. Emails the digest to subscribers
6. Publishes to a live website with calendar navigation
7. Goes back to sleep

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   EventBridge   │────▶│   AWS Lambda    │────▶│  AWS Bedrock    │
│  (7 AM IST)     │     │  (Python 3.12)  │     │ (Claude Haiku)  │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
              ┌──────────┐ ┌──────────┐ ┌──────────┐
              │    S3    │ │   SES    │ │  GitHub  │
              │ (backup) │ │ (email)  │ │  (site)  │
              └──────────┘ └──────────┘ └──────────┘
```

### Components

| Component | Purpose |
|-----------|---------|
| **EventBridge Scheduler** | Triggers Lambda daily at 7 AM IST |
| **AWS Lambda** | Orchestrates the entire pipeline (Python 3.12, ARM64) |
| **AWS Bedrock** | Runs Claude 3 Haiku for commentary generation |
| **AWS S3** | Stores markdown backups |
| **AWS SES** | Sends daily email digest |
| **GitHub API** | Pushes digests to repo for GitHub Pages |
| **GitHub Pages** | Hosts the live website |

## RSS Feed Sources (70+)

### India
- Economic Times (Markets, Politics, News)
- LiveMint (News, Companies, AI)
- The Hindu (Business, Economy)
- Business Standard
- Moneycontrol (Business, Economy)
- Indian Express (Business, Politics)

### United States
- NPR (Business, Politics, Economy)
- The Hill (News, Business)
- Politico (News, Congress)
- Reuters Business
- PBS NewsHour

### China & Asia
- South China Morning Post (China, Business, Economy, World)
- China Digital Times
- CGTN (China, Business)

### World
- BBC (World, Business, Asia, India, China)
- Al Jazeera
- Deutsche Welle (News, Business)
- France 24

### Tech & AI
- TechCrunch (General, AI)
- Ars Technica (AI)
- The Verge (AI)
- Wired (AI)
- VentureBeat (AI)
- Hacker News (Frontpage, Best)
- MIT Technology Review
- IEEE Spectrum (AI)

## Ranking Algorithm

Stories are ranked using a hybrid scoring system:

### 1. Keyword Importance Scoring
```python
PRIORITY_KEYWORDS = {
    'high': ['recession', 'inflation', 'rate cut', 'fed', 'rbi', 'gdp',
             'layoff', 'acquisition', 'ipo', 'bankruptcy', 'sanctions',
             'tariff', 'openai', 'regulation', 'crisis', 'war', ...],
    'medium': ['earnings', 'profit', 'revenue', 'stock', 'market',
               'election', 'trade', 'startup', 'funding', 'merger', ...],
    'low': ['update', 'report', 'analysis', 'review', 'launches', ...]
}
```

### 2. TF-IDF Scoring
Custom implementation (no sklearn dependency) that weights terms by:
- Term frequency in headline
- Inverse document frequency across all headlines
- Priority keyword boost

### 3. Deduplication
MD5 hash-based deduplication to remove near-duplicate stories across sources.

## The Unhinged Persona

The system prompt creates a commentator with:

- **George Carlin's** euphemism hunting ("synergies" = "we're firing people")
- **Hunter S. Thompson's** gonzo energy
- **Richard Feynman's** BS detection
- **Internet culture** fluency (ALL CAPS, parenthetical asides, memes)

Key traits:
- Translates corporate speak to plain English
- Finds the buried lede
- Punches up at systems, never down at people
- Celebrates rare Ws with suspicious enthusiasm

## Output Format

Each story includes:

```markdown
### 1. CATCHY TITLE IN ALL CAPS

**What happened:** 2-3 sentence summary of the actual news,
so you don't need to click the link.

> **The take:** Unhinged commentary with ALL CAPS emphasis,
> (parenthetical asides), and internet energy. Goes off on
> the absurdity while being genuinely informative.

[Source Name](link)
```

## Cost Breakdown

Running this system costs approximately **$1.50 - $2.00 per month** with the Sonnet upgrade.

| Service | Usage | Monthly Cost |
|---------|-------|--------------|
| AWS Lambda | ~1,500 GB-seconds | **FREE** (free tier) |
| AWS Bedrock (Sonnet) | ~300K tokens | **~$1.50** |
| AWS S3 | ~500 KB | **FREE** |
| AWS SES | 30 emails | **FREE** |
| GitHub Pages | Hosting | **FREE** |

### Per-Run Metrics
- **Duration:** ~60-90 seconds (more reasoning)
- **Memory:** 512 MB (~180 MB used)
- **Input tokens:** ~5,000 (includes economic context)
- **Output tokens:** ~5,000 (dense analysis)
- **Cost per run:** ~$0.05

*Note: Using Claude 3.5 Sonnet instead of Haiku for better economic reasoning. Worth every basis point.*

## Local Development

### Prerequisites
- Python 3.12+
- AWS CLI configured
- AWS Bedrock access enabled for Claude 3 Haiku

### Setup
```bash
# Clone the repo
git clone https://github.com/atul-feyntech/daily-unhinged-lambda.git
cd daily-unhinged-lambda

# Install dependencies
pip install -r requirements.txt

# Test locally
python test_local.py
```

### Deployment
```bash
# Deploy all AWS resources
chmod +x deploy.sh
./deploy.sh

# Teardown (removes all resources)
chmod +x teardown.sh
./teardown.sh
```

## Configuration

### Environment Variables (Lambda)

| Variable | Description |
|----------|-------------|
| `BUCKET_NAME` | S3 bucket for markdown storage |
| `BEDROCK_MODEL` | Model ID (default: `anthropic.claude-3-haiku-20240307-v1:0`) |
| `MAX_ITEMS` | Max stories to process (default: 25) |
| `EMAIL_RECIPIENT` | Email address for daily digest |
| `EMAIL_SENDER` | Verified SES sender email |
| `GITHUB_TOKEN` | GitHub PAT for pushing to repo |
| `GITHUB_REPO` | Target repo (format: `owner/repo`) |

## Roadmap

### Coming Soon

- **Financial/Economic Analysis Mode**
  - Deeper analysis of market implications
  - Trend detection across news cycles
  - Portfolio impact summaries

- **Personalization**
  - Topic preferences
  - Adjustable snark levels
  - Custom feed sources

- **Enhanced Analytics**
  - Sentiment tracking over time
  - Source credibility scoring
  - Breaking news detection

- **Multi-format Output**
  - Podcast-style audio generation
  - Twitter/X thread format
  - Slack/Discord integration

## Project Structure

```
daily-unhinged/
├── lambda_function.py    # Main Lambda handler (the Unhinged Economist)
├── economics_context.md  # Economic theory knowledge base
├── deploy.sh             # AWS deployment script
├── teardown.sh           # AWS cleanup script
├── requirements.txt      # Python dependencies
├── test_local.py         # Local testing script
└── site/
    ├── index.html        # GitHub Pages frontend
    ├── style.css         # Bold & vibrant theme
    ├── app.js            # Calendar & digest viewer
    └── digests/
        ├── index.json    # Available dates
        └── YYYY-MM-DD.md # Daily digests (now with equations!)
```

## License

MIT

## Author

Built in ~6 hours by talking to an AI. The future is weird.

---

*"Question everything, especially this newsletter."*
