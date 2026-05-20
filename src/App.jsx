import { useState, useRef, useEffect } from "react";

// ─── MOCK CATALOG ─────────────────────────────────────────────────────────────
const CATALOG = [
  { id: "l1", title: "MacBook Air M3 13\"", vendor: "Apple", category: "laptops", price: 1099, tags: ["thin", "battery", "silent", "student", "creative", "lightweight", "mac", "apple"], description: "15-hour battery, fanless design, M3 chip.", image: "💻", rating: 4.9, reviews: 2841, stock: 12, pros: ["Amazing battery life", "Silent fanless design", "Super lightweight"], cons: ["Limited ports", "Not great for gaming"] },
  { id: "l2", title: "Dell XPS 15 OLED", vendor: "Dell", category: "laptops", price: 1599, tags: ["display", "power", "video editing", "developer", "oled", "creative", "programming"], description: "15.6\" OLED display, Intel Core i7, 32GB RAM.", image: "💻", rating: 4.7, reviews: 1204, stock: 5, pros: ["Stunning OLED display", "Powerful performance", "Great for video editing"], cons: ["Heavy", "Expensive"] },
  { id: "l3", title: "Lenovo ThinkPad X1 Carbon", vendor: "Lenovo", category: "laptops", price: 1349, tags: ["business", "durable", "keyboard", "lightweight", "work", "office", "professional"], description: "Military-grade durability, legendary keyboard.", image: "💻", rating: 4.8, reviews: 987, stock: 8, pros: ["Best keyboard", "Very durable", "Lightweight"], cons: ["Average display", "Pricey"] },
  { id: "l4", title: "ASUS ROG Zephyrus G14", vendor: "ASUS", category: "laptops", price: 1249, tags: ["gaming", "amd", "portable", "performance", "game", "games"], description: "Ryzen 9 + RTX 4060, 14\" 165Hz display.", image: "💻", rating: 4.6, reviews: 763, stock: 7, pros: ["Great gaming performance", "Portable", "Fast display"], cons: ["Battery drains fast during gaming", "Gets warm"] },
  { id: "l5", title: "Acer Aspire 5", vendor: "Acer", category: "laptops", price: 549, tags: ["budget", "student", "everyday", "office", "cheap", "affordable", "basic"], description: "AMD Ryzen 5, 8GB RAM, Full HD display.", image: "💻", rating: 4.3, reviews: 3210, stock: 24, pros: ["Very affordable", "Good for everyday tasks", "Reliable"], cons: ["Average build quality", "No discrete GPU"] },
  { id: "h1", title: "Sony WH-1000XM5", vendor: "Sony", category: "headphones", price: 279, tags: ["anc", "wireless", "travel", "commute", "noise cancelling", "best", "premium"], description: "Industry-leading noise cancellation, 30hr battery.", image: "🎧", rating: 4.9, reviews: 5621, stock: 31, pros: ["Best ANC in class", "30hr battery", "Comfortable"], cons: ["Can't fold flat", "Pricey"] },
  { id: "h2", title: "Apple AirPods Pro 2nd Gen", vendor: "Apple", category: "headphones", price: 199, tags: ["apple", "anc", "earbuds", "ios", "spatial audio", "iphone", "mac"], description: "Adaptive transparency, spatial audio, H2 chip.", image: "🎧", rating: 4.8, reviews: 8934, stock: 45, pros: ["Perfect for iPhone users", "Great ANC", "Spatial audio"], cons: ["Expensive for earbuds", "Battery life average"] },
  { id: "h3", title: "Sennheiser HD 660S2", vendor: "Sennheiser", category: "headphones", price: 499, tags: ["audiophile", "wired", "music", "studio", "open back", "quality", "sound"], description: "Open-back, reference-grade audio.", image: "🎧", rating: 4.9, reviews: 412, stock: 6, pros: ["Reference-grade sound", "Open soundstage", "Built to last"], cons: ["Wired only", "Needs an amplifier"] },
  { id: "h4", title: "Jabra Evolve2 55", vendor: "Jabra", category: "headphones", price: 349, tags: ["work", "office", "calls", "teams", "zoom", "meetings", "wfh", "professional"], description: "Professional-grade microphone, ANC, UC-certified.", image: "🎧", rating: 4.7, reviews: 892, stock: 14, pros: ["Pro-grade mic", "All-day comfort", "UC certified"], cons: ["Bulky", "Overkill for casual use"] },
  { id: "h5", title: "Anker Soundcore Q45", vendor: "Anker", category: "headphones", price: 59, tags: ["budget", "wireless", "casual", "anc", "cheap", "affordable", "basic"], description: "50-hour battery, foldable, adaptive ANC.", image: "🎧", rating: 4.4, reviews: 11203, stock: 78, pros: ["50hr battery", "Foldable", "Great value"], cons: ["Average sound quality", "Plastic build"] },
  { id: "p1", title: "iPhone 16 Pro", vendor: "Apple", category: "phones", price: 999, tags: ["ios", "camera", "apple", "premium", "video", "iphone", "photography"], description: "A18 Pro chip, ProRes video, titanium build.", image: "📱", rating: 4.9, reviews: 3421, stock: 20, pros: ["Best camera system", "ProRes video", "Premium build"], cons: ["Very expensive", "iOS only"] },
  { id: "p2", title: "Samsung Galaxy S25 Ultra", vendor: "Samsung", category: "phones", price: 1299, tags: ["android", "stylus", "camera", "productivity", "zoom", "samsung", "premium"], description: "200MP camera, S Pen included, 100x zoom.", image: "📱", rating: 4.8, reviews: 2109, stock: 11, pros: ["200MP camera", "S Pen included", "Massive zoom"], cons: ["Very large", "Expensive"] },
  { id: "p3", title: "Google Pixel 9", vendor: "Google", category: "phones", price: 799, tags: ["android", "camera", "ai", "google", "clean", "photography", "value"], description: "Best computational photography, 7 years of updates.", image: "📱", rating: 4.7, reviews: 1544, stock: 18, pros: ["Best photo AI", "7 years updates", "Clean Android"], cons: ["Limited availability", "Average battery"] },
  { id: "p4", title: "OnePlus 13", vendor: "OnePlus", category: "phones", price: 699, tags: ["fast charging", "performance", "android", "value", "budget", "speed"], description: "100W charging, Snapdragon 8 Elite, 6000mAh.", image: "📱", rating: 4.6, reviews: 876, stock: 22, pros: ["100W fast charging", "Flagship performance", "Big battery"], cons: ["Less known brand", "Camera average"] },
  { id: "w1", title: "Apple Watch Series 10", vendor: "Apple", category: "smartwatches", price: 399, tags: ["ios", "health", "fitness", "apple", "iphone", "slim", "watch"], description: "Thinnest Apple Watch, advanced health sensors.", image: "⌚", rating: 4.8, reviews: 2341, stock: 27, pros: ["Thinnest ever", "Great health tracking", "Seamless with iPhone"], cons: ["Only works with iPhone", "18hr battery"] },
  { id: "w2", title: "Garmin Fenix 8", vendor: "Garmin", category: "smartwatches", price: 799, tags: ["fitness", "gps", "outdoor", "running", "triathlon", "sport", "athlete"], description: "Multi-band GPS, 29-day battery, dive computer.", image: "⌚", rating: 4.9, reviews: 1032, stock: 9, pros: ["29-day battery", "Multi-band GPS", "Dive computer"], cons: ["Very expensive", "Bulky for daily wear"] },
  { id: "w3", title: "Samsung Galaxy Watch 7", vendor: "Samsung", category: "smartwatches", price: 299, tags: ["android", "health", "sleep", "fitness", "samsung", "watch"], description: "Advanced sleep coaching, body composition.", image: "⌚", rating: 4.6, reviews: 1876, stock: 15, pros: ["Great sleep tracking", "Body composition", "Stylish"], cons: ["Best with Samsung phones", "40hr battery"] },
  { id: "k1", title: "Dyson V15 Detect", vendor: "Dyson", category: "home", price: 699, tags: ["vacuum", "cordless", "cleaning", "laser", "pet", "home"], description: "Laser reveals hidden dust, 60-min battery.", image: "🏠", rating: 4.8, reviews: 4321, stock: 8, pros: ["Laser dust detection", "60 min battery", "Powerful suction"], cons: ["Very expensive", "Heavy for a cordless"] },
  { id: "k2", title: "Instant Pot Duo 7-in-1", vendor: "Instant Pot", category: "home", price: 89, tags: ["cooking", "kitchen", "meal prep", "home", "food", "budget"], description: "7 appliances in one, 6-quart, 13 programs.", image: "🏠", rating: 4.7, reviews: 87432, stock: 54, pros: ["7 appliances in 1", "Very affordable", "Huge community"], cons: ["Learning curve", "Takes counter space"] },
  { id: "c1", title: "Sony A7 IV", vendor: "Sony", category: "cameras", price: 2499, tags: ["mirrorless", "photo", "video", "professional", "full frame", "photography"], description: "33MP full-frame, 4K 60fps, pro autofocus.", image: "📷", rating: 4.9, reviews: 892, stock: 4, pros: ["Pro-grade AF", "4K 60fps", "Full frame sensor"], cons: ["Very expensive", "Large and heavy"] },
  { id: "c2", title: "GoPro Hero 13 Black", vendor: "GoPro", category: "cameras", price: 399, tags: ["action", "waterproof", "travel", "sports", "vlog", "adventure", "outdoor"], description: "5.3K video, waterproof, HyperSmooth 6.0.", image: "📷", rating: 4.7, reviews: 3421, stock: 23, pros: ["Waterproof", "Incredible stabilization", "Compact"], cons: ["Small sensor", "Subscription for full features"] },
  // Mouse pads
  { id: "mp1", title: "SteelSeries QcK Heavy XXL", vendor: "SteelSeries", category: "mousepads", price: 49, tags: ["gaming", "xxl", "large", "desk mat", "smooth", "mouse pad"], description: "900x300mm, 6mm thick, stitched edges. The go-to gaming desk mat for serious gamers.", image: "🖱️", rating: 4.8, reviews: 12430, stock: 40, pros: ["Huge surface area", "Thick & comfy", "Stitched edges last longer"], cons: ["Takes up a lot of desk space", "Not portable"] },
  { id: "mp2", title: "Logitech G840 XL", vendor: "Logitech", category: "mousepads", price: 39, tags: ["gaming", "xl", "large", "smooth", "mouse pad", "consistent"], description: "900x400mm flat surface, optimized for gaming sensors.", image: "🖱️", rating: 4.7, reviews: 8921, stock: 55, pros: ["Perfect sensor tracking", "Flat & consistent", "Affordable"], cons: ["No wrist rest", "Plain look"] },
  { id: "mp3", title: "Corsair MM300 Pro", vendor: "Corsair", category: "mousepads", price: 29, tags: ["budget", "extended", "affordable", "mouse pad", "everyday", "office"], description: "930x300mm extended, spill-resistant, anti-fray.", image: "🖱️", rating: 4.5, reviews: 5673, stock: 80, pros: ["Budget friendly", "Spill resistant", "Anti-fray edges"], cons: ["Thinner than premium mats", "Average texture"] },
  { id: "mp4", title: "Razer Goliathus Chroma", vendor: "Razer", category: "mousepads", price: 59, tags: ["rgb", "gaming", "led", "premium", "mouse pad", "light"], description: "RGB lighting, 355x255mm, micro-textured cloth.", image: "🖱️", rating: 4.6, reviews: 9210, stock: 22, pros: ["RGB lighting looks great", "Premium feel", "Razer ecosystem"], cons: ["Needs USB for RGB", "Smaller than XXL mats"] },
];

// ─── BUILT-IN AI ENGINE ───────────────────────────────────────────────────────
const CATEGORY_KEYWORDS = {
  laptops: ["laptop", "computer", "pc", "macbook", "notebook", "coding", "programming", "work", "study", "gaming pc"],
  headphones: ["headphone", "earphone", "earbuds", "headset", "audio", "music", "sound", "airpods", "listen"],
  phones: ["phone", "smartphone", "mobile", "iphone", "android", "samsung", "pixel", "call", "cellular"],
  smartwatches: ["watch", "smartwatch", "fitness tracker", "wearable", "garmin", "fitbit"],
  home: ["home", "kitchen", "vacuum", "cooking", "appliance", "house", "clean"],
  cameras: ["camera", "photo", "photography", "video", "gopro", "vlog", "shoot"],
  mousepads: ["mouse pad", "mousepad", "mouse mat", "desk mat", "gaming mat", "mouse pads"],
  monitors: ["monitor", "screen", "display", "4k monitor", "gaming monitor"],
  keyboards: ["keyboard", "mechanical keyboard", "typing"],
  speakers: ["speaker", "bluetooth speaker", "soundbar"],
};

const USE_KEYWORDS = {
  gaming: ["gaming", "game", "games", "fps", "esports", "steam"],
  travel: ["travel", "commute", "flight", "airplane", "portable", "lightweight"],
  work: ["work", "office", "meeting", "zoom", "teams", "professional", "business"],
  student: ["student", "college", "university", "school", "study", "assignment"],
  creative: ["video editing", "creative", "design", "photo editing", "art", "content creator"],
  audiophile: ["audiophile", "studio", "reference", "hi-fi", "quality sound"],
  fitness: ["fitness", "running", "sport", "athlete", "workout", "gym", "triathlon"],
  gift: ["gift", "present", "birthday", "christmas", "someone", "friend", "family"],
};

function extractBudget(text) {
  const t = text.toLowerCase();
  const match = t.match(/\$?(\d+[\d,]*)\s*k?/);
  if (match) {
    let n = parseInt(match[1].replace(",", ""));
    if (t.includes("k")) n *= 1000;
    return n;
  }
  if (t.includes("cheap") || t.includes("budget") || t.includes("affordable")) return 300;
  if (t.includes("mid") || t.includes("moderate")) return 800;
  if (t.includes("high end") || t.includes("premium") || t.includes("best") || t.includes("no budget")) return 99999;
  return null;
}

function detectCategory(text) {
  const t = text.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => t.includes(k))) return cat;
  }
  return null;
}

function detectUseCase(text) {
  const t = text.toLowerCase();
  const uses = [];
  for (const [use, keywords] of Object.entries(USE_KEYWORDS)) {
    if (keywords.some(k => t.includes(k))) uses.push(use);
  }
  return uses;
}

function scoreProduct(product, state) {
  let score = 0;
  const { category, budget, useCases, allText } = state;
  if (category && product.category !== category) return -1;
  if (budget && product.price > budget * 1.15) return -1;
  if (budget && product.price <= budget) score += 30;
  const text = (allText || "").toLowerCase();
  product.tags.forEach(tag => { if (text.includes(tag)) score += 15; });
  useCases.forEach(use => { product.tags.forEach(tag => { if (tag.includes(use) || use.includes(tag)) score += 20; }); });
  score += product.rating * 5;
  if (product.stock <= 5) score -= 5;
  return score;
}

function getRecommendations(state) {
  return CATALOG
    .map(p => ({ ...p, score: scoreProduct(p, state) }))
    .filter(p => p.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((p, i) => ({ ...p, badge: i === 0 ? "Top Pick" : i === 1 ? "Best Value" : "Budget Pick" }));
}

// ─── PERSONALIZED REASONING ───────────────────────────────────────────────────
function buildPersonalizedReason(product, state) {
  const { budget, useCases = [], category } = state;
  const reasons = [];

  // Why this product fits the use case
  if (useCases.includes("gaming") && product.tags.includes("gaming"))
    reasons.push("built for gaming performance");
  if (useCases.includes("travel") && (product.tags.includes("travel") || product.tags.includes("lightweight")))
    reasons.push("great for travel — lightweight and portable");
  if (useCases.includes("work") && (product.tags.includes("work") || product.tags.includes("professional")))
    reasons.push("ideal for professional work use");
  if (useCases.includes("student") && (product.tags.includes("student") || product.tags.includes("budget")))
    reasons.push("perfect for students — reliable and affordable");
  if (useCases.includes("creative") && (product.tags.includes("creative") || product.tags.includes("video editing")))
    reasons.push("excellent for creative and editing work");
  if (useCases.includes("fitness") && (product.tags.includes("fitness") || product.tags.includes("sport")))
    reasons.push("designed for fitness and sport tracking");
  if (useCases.includes("audiophile") && product.tags.includes("audiophile"))
    reasons.push("reference-grade sound for audiophiles");

  // Budget fit
  if (budget && product.price <= budget * 0.7)
    reasons.push(`well under your $${budget} budget — saving you $${budget - product.price}`);
  else if (budget && product.price <= budget)
    reasons.push(`fits comfortably within your $${budget} budget`);

  // Rating
  if (product.rating >= 4.8)
    reasons.push(`top-rated by ${product.reviews.toLocaleString()} buyers`);

  // Stock urgency
  if (product.stock <= 5)
    reasons.push("only " + product.stock + " left in stock");

  return reasons.length > 0
    ? "Picked because: " + reasons.slice(0, 2).join(" and ") + "."
    : product.description;
}

// ─── TRADEOFF ANALYSIS ────────────────────────────────────────────────────────
function buildTradeoffMessage(recs, state) {
  if (recs.length < 2) return "";
  const [top, second] = recs;
  const priceDiff = top.price - second.price;
  const lines = [];

  if (priceDiff > 0) {
    // Top pick costs more
    lines.push(`⚖️ Tradeoff: ${top.title} costs $${priceDiff} more than ${second.title}.`);
    lines.push(`Pay more → get: ${top.pros[0]}.`);
    lines.push(`Save money → accept: ${top.cons[0]}.`);
  } else if (priceDiff < 0) {
    // Top pick is cheaper
    lines.push(`⚖️ Tradeoff: ${top.title} is $${Math.abs(priceDiff)} cheaper than ${second.title}.`);
    lines.push(`Go budget → ${top.pros[0]}, but ${top.cons[0]}.`);
    lines.push(`Spend more → ${second.pros[0]}.`);
  } else {
    lines.push(`⚖️ Both cost $${top.price} — choose based on: ${top.pros[0]} (${top.title}) vs ${second.pros[0]} (${second.title}).`);
  }

  // Availability tradeoff
  if (top.stock <= 5 && second.stock > 5)
    lines.push(`⚠️ Availability: ${top.title} has only ${top.stock} left — ${second.title} is more readily available.`);

  return lines.join("\n");
}

// ─── CONVERSATION ENGINE ──────────────────────────────────────────────────────
function buildResponse(userText, conversationState) {
  const state = { ...conversationState };
  const t = userText.toLowerCase();

  // Update state from message
  const detectedCat = detectCategory(userText);
  if (detectedCat) state.category = detectedCat;
  const detectedBudget = extractBudget(userText);
  if (detectedBudget) state.budget = detectedBudget;
  const detectedUses = detectUseCase(userText);
  if (detectedUses.length) state.useCases = [...(state.useCases || []), ...detectedUses];
  state.allText = (state.allText || "") + " " + userText;
  state.turnCount = (state.turnCount || 0) + 1;

  // Start over
  if (t.includes("start over") || t.includes("restart") || t.includes("reset")) {
    return {
      message: "Sure! Let's start fresh. What are you shopping for today?",
      stage: "greeting",
      chips: ["I need a laptop", "Looking for headphones", "Shopping for a gift 🎁", "Latest smartphones"],
      newState: {}
    };
  }

  // Detect category CHANGE mid-conversation — reset state if user switches
  const isCorrection = t.startsWith("no") || t.includes("actually") || t.includes("instead") || t.includes("wait") || t.includes("i mean") || t.includes("not that");
  if (isCorrection && detectedCat && detectedCat !== conversationState.category) {
    // Full reset with new category
    return buildResponse(userText, { category: detectedCat, useCases: detectUseCase(userText), budget: extractBudget(userText), turnCount: 1, allText: userText });
  }

  // Even without correction words — if a DIFFERENT category is mentioned, switch
  if (detectedCat && conversationState.category && detectedCat !== conversationState.category) {
    return {
      message: `Got it — switching to ${detectedCat}! 🔄\n\nWhat's your budget for the ${detectedCat.replace("mousepads", "mouse pad")}?`,
      stage: "clarifying",
      chips: ["Under $30", "Under $50", "Under $100", "No budget limit"],
      newState: { category: detectedCat, useCases: [], budget: extractBudget(userText), turnCount: 1, allText: userText }
    };
  }

  // Gift flow
  if (state.useCases?.includes("gift") && !state.giftTarget) {
    if (!state.category) {
      return {
        message: "How thoughtful! 🎁\n\nWhat kind of product are you thinking — tech gadget, headphones, smartwatch, or something else?\n\nAlso, what's your budget?",
        stage: "clarifying",
        chips: ["Under $100", "Under $200", "Under $500", "Surprise me"],
        newState: { ...state, giftTarget: true }
      };
    }
  }

  // No category yet — ask
  if (!state.category) {
    return {
      message: "I'd love to help you find the perfect product! 🛍️\n\nWhat are you looking for?",
      stage: "clarifying",
      chips: ["Laptop", "Headphones", "Smartphone", "Smartwatch", "Camera", "Home appliance"],
      newState: state
    };
  }

  // Have category, no budget — ask budget
  if (state.category && !state.budget && state.turnCount <= 2) {
    const catLabel = { laptops: "laptop", headphones: "headphones", phones: "smartphone", smartwatches: "smartwatch", home: "home appliance", cameras: "camera", mousepads: "mouse pad", monitors: "monitor", keyboards: "keyboard", speakers: "speaker" }[state.category] || state.category;
    const useCaseQ = state.useCases?.length
      ? `Got it — you need ${state.useCases.join(" and ")} ${catLabel}.\n\nWhat's your budget?`
      : `Great choice! What will you mainly use the ${catLabel} for, and what's your budget?`;
    return {
      message: useCaseQ,
      stage: "clarifying",
      chips: ["Under ₹10,000", "Under ₹25,000", "Under ₹50,000", "No budget limit"],
      newState: state
    };
  }

  // Have category and budget — ask use case if missing
  if (state.category && state.budget && (!state.useCases || state.useCases.length === 0) && state.turnCount <= 3) {
    const useChips = {
      laptops: ["For gaming", "For work/office", "For students", "For video editing"],
      headphones: ["For travel/commute", "For work calls", "For music/audiophile", "For gym/sports"],
      phones: ["Best camera", "Best battery", "For iPhone ecosystem", "Best value"],
      smartwatches: ["For fitness tracking", "For daily wear", "For outdoor adventures", "For iPhone users"],
      cameras: ["For travel", "For professional use", "For vlogging", "For action sports"],
      home: ["For cleaning", "For cooking", "For smart home", "Budget option"],
    }[state.category] || ["Best quality", "Best value", "For everyday use", "Premium option"];

    return {
      message: `Perfect! Budget of around $${state.budget.toLocaleString()} noted. ✅\n\nOne more thing — what's the main use case?`,
      stage: "clarifying",
      chips: useChips,
      newState: state
    };
  }

  // Enough info — recommend!
  const recs = getRecommendations(state);
  if (recs.length === 0) {
    return {
      message: "Hmm, I couldn't find a perfect match with those filters. Let me broaden the search — what's the most important feature for you?",
      stage: "clarifying",
      chips: ["Increase my budget", "Change category", "Best overall pick", "Start over"],
      newState: { ...state, budget: state.budget ? state.budget * 1.5 : null }
    };
  }

  // Attach personalized reasoning to each product
  const recsWithReason = recs.map(p => ({
    ...p,
    reason: buildPersonalizedReason(p, state)
  }));

  // Build personalized intro
  const budgetNote = state.budget && state.budget < 99999 ? ` within your $${state.budget.toLocaleString()} budget` : "";
  const useNote = state.useCases?.filter(u => u !== "gift").length
    ? ` for ${state.useCases.filter(u => u !== "gift").join(" & ")}` : "";
  const tradeoff = buildTradeoffMessage(recs, state);

  const intro = `Here are my top picks${useNote}${budgetNote}! 🎯\n\nI ranked these specifically based on what you told me — not just popularity.\n\n${tradeoff}`;

  return {
    message: intro,
    stage: "recommending",
    products: recsWithReason,
    chips: ["Compare top 2", "Tell me more about the top pick", "Show cheaper options", "Show premium options", "Start over"],
    newState: { ...state, lastRecs: recs.map(r => r.id) }
  };
}

// Handle follow-up on recommendations
function handleFollowUp(userText, state) {
  const t = userText.toLowerCase();

  if (t.includes("cheaper") || t.includes("budget") || t.includes("less expensive") || t.includes("affordable")) {
    const newBudget = state.budget ? Math.round(state.budget * 0.6) : 300;
    return buildResponse("budget option affordable", { ...state, budget: newBudget, turnCount: 99 });
  }
  if (t.includes("premium") || t.includes("best") || t.includes("high end") || t.includes("expensive")) {
    return buildResponse("premium best quality no budget limit", { ...state, budget: 99999, useCases: [...(state.useCases || []), "premium"], turnCount: 99 });
  }
  if (t.includes("compare") || t.includes("top 2")) {
    const recs = getRecommendations(state);
    if (recs.length >= 2) {
      const [a, b] = recs;
      const priceDiff = Math.abs(a.price - b.price);
      const cheaper = a.price < b.price ? a : b;
      const pricier = a.price < b.price ? b : a;
      return {
        message: `Here's a direct comparison of the top 2:\n\n1️⃣ ${a.title} — $${a.price}\n✓ ${a.pros[0]}\n✗ ${a.cons[0]}\n\n2️⃣ ${b.title} — $${b.price}\n✓ ${b.pros[0]}\n✗ ${b.cons[0]}\n\n⚖️ Key tradeoff: ${pricier.title} costs $${priceDiff} more — you get ${pricier.pros[0].toLowerCase()}, but give up ${cheaper.cons[0].toLowerCase()} vs the ${cheaper.title}.\n\n🏆 My verdict: ${a.title} is the stronger fit for your stated needs.`,
        stage: "comparing",
        products: recs.slice(0, 2).map(p => ({ ...p, reason: buildPersonalizedReason(p, state) })),
        chips: ["Add top pick to cart", "Show more options", "Different category", "Start over"],
        newState: state
      };
    }
  }
  if (t.includes("top pick") || t.includes("more about") || t.includes("tell me")) {
    const recs = getRecommendations(state);
    const top = recs[0];
    if (top) {
      return {
        message: `Here's everything about the ${top.title}:\n\n📦 ${top.description}\n\n✅ Pros: ${top.pros.join(", ")}\n❌ Cons: ${top.cons.join(", ")}\n⭐ Rating: ${top.rating}/5 (${top.reviews.toLocaleString()} reviews)\n📦 Stock: ${top.stock} left`,
        stage: "detail",
        products: [top],
        chips: ["Add to cart", "Show alternatives", "Different category", "Start over"],
        newState: state
      };
    }
  }

  return null;
}

// ─── MAIN AGENT FUNCTION ─────────────────────────────────────────────────────
function getAgentResponse(userText, conversationState) {
  if (conversationState.stage === "recommending" || conversationState.stage === "comparing" || conversationState.stage === "detail") {
    const followUp = handleFollowUp(userText, conversationState);
    if (followUp) return followUp;
  }
  return buildResponse(userText, conversationState);
}

// ─── UI COMPONENTS ────────────────────────────────────────────────────────────
const formatPrice = (n) => "₹" + (n * 83).toLocaleString("en-IN");

function ProductCard({ product, onAddToCart, inCart, onLearnMore }) {
  const [adding, setAdding] = useState(false);
  const badgeStyle = {
    "Top Pick": { background: "#e8f3ff", color: "#0f4c81", border: "1px solid #b8d4f5" },
    "Best Value": { background: "#e8f7ee", color: "#1a6e3c", border: "1px solid #a8dfc0" },
    "Budget Pick": { background: "#fff7e6", color: "#92500a", border: "1px solid #f5d08a" },
  }[product.badge] || {};

  const handleAdd = async () => {
    setAdding(true);
    await new Promise(r => setTimeout(r, 500));
    onAddToCart(product);
    setAdding(false);
  };

  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8edf2", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s, transform 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(26,127,232,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "none"; }}>
      <div style={{ background: "linear-gradient(135deg,#f8faff,#eef2fa)", padding: "18px 0", textAlign: "center", fontSize: 44, position: "relative" }}>
        {product.image}
        {product.badge && <div style={{ position: "absolute", top: 8, left: 8, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", ...badgeStyle }}>{product.badge}</div>}
        {product.stock <= 5 && <div style={{ position: "absolute", bottom: 6, right: 8, background: "#fff3e8", color: "#92500a", fontSize: 10, padding: "2px 6px", borderRadius: 10, fontWeight: 600 }}>Only {product.stock} left</div>}
      </div>
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ fontSize: 10, color: "#8899aa", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 2 }}>{product.vendor}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#111", lineHeight: 1.3, marginBottom: 5 }}>{product.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 5 }}>
          <span style={{ color: "#f59e0b", fontSize: 11 }}>{"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}</span>
          <span style={{ fontSize: 11, color: "#8899aa" }}>({product.reviews.toLocaleString()})</span>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#0f4c81", marginBottom: 6 }}>{formatPrice(product.price)}</div>
        {product.reason && (
          <div style={{ fontSize: 11, color: "#334", lineHeight: 1.5, marginBottom: 8, padding: "7px 10px", background: "#f0f6ff", borderRadius: 8, borderLeft: "3px solid #1a7fe8", fontStyle: "italic" }}>
            {product.reason}
          </div>
        )}
        {product.pros && (
          <div style={{ marginBottom: 10 }}>
            {product.pros.slice(0, 2).map((p, i) => <div key={i} style={{ fontSize: 11, color: "#3b6d11", marginBottom: 2 }}>✓ {p}</div>)}
            {product.cons?.slice(0, 1).map((c, i) => <div key={i} style={{ fontSize: 11, color: "#993c1d" }}>✗ {c}</div>)}
          </div>
        )}
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={handleAdd} disabled={inCart} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", cursor: inCart ? "default" : "pointer", background: inCart ? "#e8f7ee" : adding ? "#0a3d6b" : "#1a7fe8", color: inCart ? "#1a6e3c" : "#fff", fontSize: 12, fontWeight: 700, transition: "all 0.2s" }}>
            {inCart ? "✓ In Cart" : adding ? "Adding…" : "Add to Cart"}
          </button>
          <button onClick={() => onLearnMore(product)} style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #e0e8f2", background: "#fff", cursor: "pointer", fontSize: 12, color: "#1a7fe8", fontWeight: 600 }}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

function CartPanel({ cart, onRemove, onCheckout, onClose }) {
  const total = cart.reduce((s, i) => s + i.price, 0);
  return (
    <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 300, background: "#fff", boxShadow: "-4px 0 30px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", zIndex: 100, borderRadius: "0 16px 16px 0" }}>
      <div style={{ padding: "16px 18px", borderBottom: "1px solid #eef", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: "#111" }}>Cart ({cart.length})</div>
        <button onClick={onClose} style={{ border: "none", background: "none", fontSize: 20, cursor: "pointer", color: "#889" }}>×</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 18px" }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#aab" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🛒</div>
            <div style={{ fontSize: 13 }}>Your cart is empty</div>
          </div>
        ) : cart.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid #f0f2f5" }}>
            <div style={{ fontSize: 26, background: "#f5f8ff", borderRadius: 8, width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.image}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>{item.title}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#0f4c81", marginTop: 3 }}>{formatPrice(item.price)}</div>
            </div>
            <button onClick={() => onRemove(i)} style={{ border: "none", background: "none", color: "#cc4444", cursor: "pointer", fontSize: 13, alignSelf: "center" }}>✕</button>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div style={{ padding: "14px 18px", borderTop: "1px solid #eef" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: "#556" }}>Total</span>
            <span style={{ fontSize: 16, fontWeight: 800 }}>{formatPrice(total)}</span>
          </div>
          <button onClick={onCheckout} style={{ width: "100%", padding: 11, background: "linear-gradient(135deg,#0f4c81,#1a7fe8)", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
            Checkout →
          </button>
        </div>
      )}
    </div>
  );
}

function CheckoutModal({ cart, onClose, onDone }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const total = cart.reduce((s, i) => s + i.price, 0);
  const orderId = "#" + Math.floor(10000 + Math.random() * 90000);

  if (step === 3) return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "36px", maxWidth: 380, width: "90%", textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 10 }}>🎉</div>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Order Confirmed!</div>
        <div style={{ fontSize: 13, color: "#556", marginBottom: 16 }}>Order {orderId} · Sent to {form.email}</div>
        <button onClick={onDone} style={{ width: "100%", padding: 12, background: "#1a7fe8", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Done</button>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "26px", maxWidth: 400, width: "90%", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>Checkout</div>
          <button onClick={onClose} style={{ border: "none", background: "none", fontSize: 20, cursor: "pointer", color: "#889" }}>×</button>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {[1, 2, 3].map(s => <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: step >= s ? "#1a7fe8" : "#e8edf2", transition: "background 0.3s" }} />)}
        </div>
        {step === 1 && (
          <>
            {["name", "email", "address"].map(f => (
              <div key={f} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#556", textTransform: "uppercase", display: "block", marginBottom: 4 }}>{f === "name" ? "Full Name" : f === "email" ? "Email" : "Shipping Address"}</label>
                <input value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #dde8f5", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
              </div>
            ))}
            <button onClick={() => setStep(2)} disabled={!form.name || !form.email || !form.address} style={{ width: "100%", padding: 11, background: form.name && form.email && form.address ? "#1a7fe8" : "#ccd", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>Continue →</button>
          </>
        )}
        {step === 2 && (
          <>
            {cart.map((i, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f2f5", fontSize: 13 }}>
                <span>{i.image} {i.title}</span>
                <span style={{ fontWeight: 700 }}>{formatPrice(i.price)}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontWeight: 800, fontSize: 15 }}>
              <span>Total</span><span style={{ color: "#0f4c81" }}>{formatPrice(total)}</span>
            </div>
            <button onClick={() => setStep(3)} style={{ width: "100%", padding: 12, background: "linear-gradient(135deg,#0f4c81,#1a7fe8)", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Place Order — {formatPrice(total)}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function ShopAgent() {
  const [messages, setMessages] = useState([{
    role: "assistant",
    data: {
      message: "Hey! 👋 I'm your AI Shopping Assistant.\n\nNo endless scrolling — just tell me what you need and I'll find the perfect match with smart questions!\n\nWhat are you shopping for today?",
      stage: "greeting",
      chips: ["I need a laptop", "Looking for headphones", "Shopping for a gift 🎁", "Latest smartphones"]
    }
  }]);
  const [input, setInput] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [convState, setConvState] = useState({ stage: "greeting", useCases: [], turnCount: 0 });
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = (text) => {
    const txt = (text || input).trim();
    if (!txt) return;
    setInput("");

    setMessages(prev => [...prev, { role: "user", data: { message: txt } }]);

    setTimeout(() => {
      const response = getAgentResponse(txt, convState);
      const { newState, ...msgData } = response;
      setConvState({ ...newState, stage: msgData.stage });
      setMessages(prev => [...prev, { role: "assistant", data: msgData }]);
    }, 600);
  };

  const addToCart = (product) => setCart(prev => [...prev, product]);
  const removeFromCart = (i) => setCart(prev => prev.filter((_, idx) => idx !== i));

  const stageLabel = {
    greeting: "Ready to help",
    clarifying: "Understanding your needs",
    recommending: "Recommendations ready ⭐",
    comparing: "Comparing options",
    detail: "Product details",
    checkout: "Ready to buy 🛒",
  }[convState.stage] || "Ready to help";

  const lastMsg = [...messages].reverse().find(m => m.role === "assistant")?.data;

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", height: "100vh", display: "flex", flexDirection: "column", background: "#f4f7fb", position: "relative", maxWidth: 700, margin: "0 auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #d0d8e8; border-radius: 4px; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8edf5", padding: "11px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#0f4c81,#1a7fe8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14 }}>S</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#0f1c2e" }}>ShopAgent</div>
            <div style={{ fontSize: 11, color: "#1a7fe8", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#1a7fe8", animation: "pulse 2s infinite" }} />
              {stageLabel}
            </div>
          </div>
        </div>
        <button onClick={() => setShowCart(true)} style={{ background: cart.length > 0 ? "#0f4c81" : "#f0f5ff", border: "none", borderRadius: 10, padding: "7px 12px", cursor: "pointer", color: cart.length > 0 ? "#fff" : "#0f4c81", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
          🛒 {cart.length > 0 && <span style={{ background: "#e8f0ff", color: "#0f4c81", borderRadius: 10, padding: "1px 6px", fontSize: 11, fontWeight: 800 }}>{cart.length}</span>}
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 8px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 12, animation: "fadeUp 0.25s ease" }}>
            {msg.role === "user" ? (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ background: "linear-gradient(135deg,#0f4c81,#1a7fe8)", color: "#fff", padding: "10px 15px", borderRadius: 18, borderBottomRightRadius: 4, maxWidth: "75%", fontSize: 14, lineHeight: 1.5 }}>{msg.data.message}</div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#0f4c81,#1a7fe8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 11, flexShrink: 0, marginTop: 2 }}>S</div>
                  <div style={{ background: "#fff", border: "1px solid #e8edf2", padding: "10px 14px", borderRadius: 18, borderTopLeftRadius: 4, maxWidth: "82%", fontSize: 13, color: "#1a2535", lineHeight: 1.6, whiteSpace: "pre-line", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    {msg.data.message}
                  </div>
                </div>

                {msg.data.products?.length > 0 && (
                  <div style={{ marginLeft: 36, marginTop: 10, display: "grid", gridTemplateColumns: msg.data.products.length === 1 ? "1fr" : "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
                    {msg.data.products.map(p => (
                      <ProductCard key={p.id} product={p} onAddToCart={addToCart} inCart={cart.some(c => c.id === p.id)} onLearnMore={(prod) => sendMessage(`Tell me more about the ${prod.title}`)} />
                    ))}
                  </div>
                )}

                {idx === messages.length - 1 && msg.data.chips?.length > 0 && (
                  <div style={{ marginLeft: 36, marginTop: 8, display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {msg.data.chips.map((c, i) => (
                      <button key={i} onClick={() => sendMessage(c)} style={{ background: "#fff", border: "1px solid #c5d8f5", color: "#0f4c81", padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#e8f0ff"}
                        onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                      >{c}</button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ background: "#fff", borderTop: "1px solid #e8edf5", padding: "10px 14px", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", background: "#f4f7fb", borderRadius: 14, border: "1.5px solid #e0e8f5", padding: "6px 8px 6px 14px" }}>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); sendMessage(); } }}
            placeholder="Describe what you're looking for…"
            style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 13, color: "#1a2535", fontFamily: "inherit" }} />
          <button onClick={() => sendMessage()} disabled={!input.trim()} style={{ width: 34, height: 34, borderRadius: 10, border: "none", background: input.trim() ? "linear-gradient(135deg,#0f4c81,#1a7fe8)" : "#dde8f5", cursor: input.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? "#fff" : "#aab"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <div style={{ textAlign: "center", fontSize: 10, color: "#c0cad8", marginTop: 5 }}>Self-contained AI · No external API needed</div>
      </div>

      {showCart && <CartPanel cart={cart} onRemove={removeFromCart} onCheckout={() => { setShowCart(false); setShowCheckout(true); }} onClose={() => setShowCart(false)} />}
      {showCheckout && <CheckoutModal cart={cart} onClose={() => setShowCheckout(false)} onDone={() => { setCart([]); setShowCheckout(false); }} />}
    </div>
  );
}
