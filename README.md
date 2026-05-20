# ShopAgent – AI Shopping Assistant 

ShopAgent is a conversational AI shopping assistant that helps users discover the right products through natural conversation instead of endless scrolling and filtering.

The assistant understands user intent, asks smart follow-up questions, compares tradeoffs, explains recommendations, and guides users from discovery to checkout.

Built for the **AI Shopping Agent Track**, the project focuses on replacing the traditional browse-search-filter shopping experience with a personalized conversational flow.

---

# Features

- Conversational shopping experience
- Smart follow-up questions
- Budget-aware recommendations
- Personalized AI reasoning
- Product comparison system
- Tradeoff explanations
- Dynamic conversation memory
- Cart and checkout flow
- Category switching detection
- Responsive modern UI
- Proxy-supported deployment
- Self-contained recommendation engine
- No external AI API required

---

# Problem Statement

Traditional e-commerce platforms overwhelm users with:
- endless product lists
- complex filters
- decision fatigue
- unclear tradeoffs

Users often struggle to determine:
- which product actually fits their needs
- whether a product is worth the price
- how products compare in real-world use

ShopAgent solves this by replacing manual browsing with a conversational AI assistant that:
- understands intent
- narrows options intelligently
- explains recommendations clearly
- creates a clean path toward purchase

---

# How the AI Agent Works

The shopping agent uses a built-in conversational recommendation engine.

It:
1. Detects product category
2. Extracts budget from natural language
3. Identifies user use cases
4. Scores products dynamically
5. Explains recommendation reasoning
6. Handles comparisons and follow-ups
7. Supports checkout flow

---

# AI Capabilities

## Intent Understanding
The assistant detects:
- category
- budget
- preferences
- use cases

Example:
- “Need a gaming laptop under ₹1 lakh”
- “Best headphones for travel”
- “Affordable phone with great camera”

---

## Smart Follow-Up Questions

Instead of immediately showing products, the AI asks:
- budget range
- primary use case
- gaming vs office vs travel
- premium vs budget preference

---

## Personalized Recommendations

Recommendations are generated using:
- category matching
- budget fit
- tag similarity
- user intent alignment
- product ratings
- stock availability

---

## Tradeoff Analysis

The assistant explains:
- premium vs budget
- performance vs price
- availability vs quality
- feature compromises

This improves transparency and trust.

---

## Conversation Memory

The assistant remembers:
- previous preferences
- selected category
- budget
- use cases
- previous recommendations

allowing natural multi-turn conversations.

---

# Tech Stack

## Frontend
- React.js
- JavaScript
- CSS-in-JS Styling

## AI / Recommendation Logic
- Rule-based NLP
- Stateful conversational engine
- Dynamic scoring algorithm

## Deployment
- Proxy-supported architecture
- Vercel / Netlify compatible

---

# Core Features Breakdown

| Feature | Description |
|---|---|
| Conversational Shopping | AI-driven product discovery |
| Product Recommendations | Smart ranking engine |
| Personalized Reasoning | Explains WHY products are suggested |
| Tradeoff Engine | Explicit pros/cons comparisons |
| Product Comparison | Compare top recommendations |
| Cart System | Add/remove cart items |
| Checkout Flow | Simulated purchase experience |
| Conversation Memory | Multi-turn interaction support |
| Dynamic Clarification | Smart follow-up questions |

---

# Installation

Clone the repository:

```bash
git clone <your-repo-link>
```

Go into the project folder:

```bash
cd shopagent
```

Install dependencies:

```bash
npm install
```

---

# Running the Project Locally

Start the development server:

```bash
npm run dev
```

or

```bash
npm start
```

Open in browser:

```bash
http://localhost:3000
```

---

# Proxy Support

The application supports proxy-based execution/deployment.

Example configuration:

```js
proxy: "http://your-proxy-url"
```

The proxy layer helps with:
- deployment flexibility
- secure request routing
- CORS handling
- scalable architecture

---

# Project Structure

```bash
src/
│
├── components/
│   ├── ProductCard
│   ├── CartPanel
│   ├── CheckoutModal
│
├── AI Engine/
│   ├── Intent Detection
│   ├── Recommendation Engine
│   ├── Conversation State
│
├── Product Catalog
│
├── App.js
│
└── styles/
```

---

# Example User Queries

- “I need a gaming laptop under ₹1 lakh”
- “Best headphones for travel”
- “Affordable phone with great battery”
- “Compare the top 2 options”
- “Show premium alternatives”
- “I need a gift for a student”

---

# Recommendation Engine Logic

Products are scored based on:
- category relevance
- budget compatibility
- use-case matching
- keyword overlap
- ratings
- stock levels

The highest scoring products are recommended first.

---

# Conversation Flow

## Step 1
User describes needs

## Step 2
AI asks clarification questions

## Step 3
Recommendation engine ranks products

## Step 4
AI explains recommendations

## Step 5
User compares/adds to cart

## Step 6
Checkout flow

---

# Failure Handling

The assistant handles:
- unclear queries
- category changes
- missing budgets
- no matching products
- recommendation refinement

Example:
If no products match:
- AI broadens search
- suggests alternatives
- asks clarifying questions

---

# Screenshots

## Home Screen
(Add screenshot)

## Recommendation Flow
(Add screenshot)

## Product Comparison
(Add screenshot)

## Cart System
(Add screenshot)

## Checkout Flow
(Add screenshot)

---

# Demo Video

Add your:
- YouTube unlisted link
or
- Google Drive link

here.

Example:

```md
Demo Video: https://your-link-here
```

---

# Additional Documentation

## Product Document
Explains:
- product thinking
- target users
- tradeoffs
- scope

File:
```bash
PRODUCT_DOCUMENT.md
```

---

## Technical Document
Explains:
- architecture
- implementation decisions
- recommendation logic
- failure handling
- limitations

File:
```bash
TECHNICAL_DOCUMENT.md
```

---

## Contribution Note
Explains:
- solo contribution split
- product vs engineering responsibilities

File:
```bash
CONTRIBUTION_NOTE.md
```

---

## Decision Log
Contains key decisions like:
- “considered X, chose Y because Z”

File:
```bash
DECISION_LOG.md
```

---

# Current Limitations

- Static product catalog
- No real Shopify integration
- No real payment gateway
- No authentication system
- No live inventory sync
- Rule-based NLP only

---

# Future Improvements

- Shopify API integration
- Real-time inventory sync
- LLM-powered semantic understanding
- Voice shopping assistant
- Personalized recommendation memory
- Multi-language support
- Vector search
- AI embeddings
- Recommendation learning models

---

# Key Product Decisions

| Decision | Reason |
|---|---|
| Conversational UI | Better user experience |
| Local AI logic | No API dependency |
| Rule-based recommendation engine | Easier debugging and transparency |
| Stateful conversation memory | Better multi-turn interactions |
| Tradeoff explanations | Increased user trust |
| Proxy support | Flexible deployment |

---

# Why This Project Stands Out

Unlike traditional product listing apps, ShopAgent:
- understands shopping intent
- explains reasoning
- handles tradeoffs
- maintains conversation context
- supports purchase flow

The focus is not just product recommendations, but creating an intelligent shopping experience.

---

# Author

Naina Agarwal

---

# License

This project is for educational and demonstration purposes.
