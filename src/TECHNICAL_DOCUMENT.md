# Technical Document – ShopAgent

# Architecture Overview

ShopAgent is a frontend-based conversational AI shopping system built using React and JavaScript.

The application contains:
- conversational engine
- recommendation engine
- UI rendering layer
- cart system
- checkout flow

---

# High-Level Architecture

User Input
↓
Conversation Engine
↓
Intent Detection
↓
Recommendation Engine
↓
Product Scoring
↓
UI Rendering
↓
Cart & Checkout

---

# Core Modules

## 1. Catalog System

The application uses a structured product catalog containing:
- product metadata
- tags
- categories
- pricing
- ratings
- stock
- pros/cons

This acts as the knowledge base.

---

## 2. Intent Detection Engine

Functions:
- detectCategory()
- detectUseCase()
- extractBudget()

Responsibilities:
- parse user text
- identify user intent
- maintain conversation state

---

## 3. Recommendation Engine

Main Functions:
- scoreProduct()
- getRecommendations()

The engine scores products using:
- category matching
- budget compatibility
- tag overlap
- use-case relevance
- ratings
- inventory signals

---

## 4. Conversation State Management

The application maintains:
- category
- budget
- use cases
- previous recommendations
- conversation stage

This enables multi-turn conversations.

---

## 5. Follow-Up Handling

The system handles:
- compare requests
- premium alternatives
- cheaper alternatives
- detail requests
- conversation resets

---

# UI Components

## ProductCard
Displays:
- pricing
- pros/cons
- reasoning
- ratings
- add-to-cart

---

## CartPanel
Handles:
- cart summary
- item removal
- checkout initiation

---

## CheckoutModal
Handles:
- user details
- order flow
- confirmation

---

# Failure Handling

## Unsupported Queries
If the system cannot confidently identify a category:
- asks clarification questions

---

## No Product Match
If no products match:
- broadens filters
- suggests alternatives

---

## State Corrections
The assistant detects:
- “actually”
- “instead”
- “wait”

to recover from incorrect intent detection.

---

# Technical Decisions

| Decision | Reason |
|---|---|
| React frontend | Fast UI iteration |
| Local AI logic | No API dependency |
| Rule-based NLP | Transparent behavior |
| In-memory state | Simple conversation tracking |
| Proxy support | Better deployment handling |

---

# Limitations

- No real AI/LLM model
- Limited NLP understanding
- Static catalog only
- No database persistence
- No authentication
- No live inventory
- No payment integration

---

# Scalability Improvements

Future scalable architecture:
- Node.js backend
- Vector database
- LLM integration
- Shopify APIs
- Redis session memory
- Recommendation learning models

---

# Security Considerations

- Input validation
- Controlled state transitions
- Proxy-based deployment
- No sensitive payment storage

---

# Deployment

Supports:
- Vercel
- Netlify
- Localhost
- Proxy environments

---

# Future Enhancements

- Real-time recommendation APIs
- Voice input
- Semantic search
- Personalization memory
- AI embeddings
- Multi-user sessions

---

# Conclusion

ShopAgent demonstrates a lightweight conversational AI architecture capable of replacing traditional browsing flows with intelligent recommendation-driven interactions.
