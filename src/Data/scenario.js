export const scenarios = [
  {
    id: 1,
    platform: "Roblox",
    chat: [
      { user: "CoolKidX", text: "I found a cheat that gives free Robux!" },
      { user: "MegaMaster", text: "Drop the link!" },
      { user: "CoolKidX", text: "Only if you send your username and password." },
      { user: "You", text: "Report or Ignore?" },
    ],
    correctAnswer: "Report",
    reason: "Asking for login details is a clear scam attempt.",
  },
  {
    id: 2,
    platform: "Discord",
    chat: [
      { user: "AnimeBot", text: "🎁 Claim your free Nitro now!" },
      { user: "You", text: "Report or Ignore?" },
    ],
    correctAnswer: "Report",
    reason: "Fake bot giveaways with links are phishing scams.",
  },
  {
    id: 3,
    platform: "Fortnite",
    chat: [
      { user: "SweatyPlayer", text: "You're trash at this game." },
      { user: "You", text: "Report or Ignore?" },
    ],
    correctAnswer: "Ignore",
    reason: "Mild insults aren't serious enough to report.",
  },
  {
    id: 4,
    platform: "WhatsApp",
    chat: [
      { user: "Mum 🤱", text: "Can you send me your bank details quickly?" },
      { user: "You", text: "Report or Ignore?" },
    ],
    correctAnswer: "Report",
    reason: "Impersonating a family member asking for money is a scam.",
  },
  {
    id: 5,
    platform: "Minecraft",
    chat: [
      { user: "Steve101", text: "Teleport to me for diamonds!" },
      { user: "You", text: "Report or Ignore?" },
    ],
    correctAnswer: "Ignore",
    reason: "No harm in offering game items unless it becomes manipulative.",
  },
  {
    id: 6,
    platform: "Instagram",
    chat: [
      { user: "InstaSupport", text: "Your account will be deleted. Click here to appeal." },
      { user: "You", text: "Report or Ignore?" },
    ],
    correctAnswer: "Report",
    reason: "Fake support accounts trying to steal logins.",
  },
  {
    id: 7,
    platform: "Discord",
    chat: [
      { user: "RickBot", text: "Click here for Rick Roll 😂" },
      { user: "You", text: "Report or Ignore?" },
    ],
    correctAnswer: "Ignore",
    reason: "Harmless prank, not a threat or scam.",
  },
  {
    id: 8,
    platform: "Roblox",
    chat: [
      { user: "DevGirl23", text: "Who wants admin powers? Just login here!" },
      { user: "GamerKid99", text: "No way! Is it real?" },
      { user: "DevGirl23", text: "Only for first 10 users 👀" },
      { user: "You", text: "Report or Ignore?" },
    ],
    correctAnswer: "Report",
    reason: "Fake offers tied to login links are scammy.",
  },
  {
    id: 9,
    platform: "WhatsApp",
    chat: [
      { user: "+44 7598...", text: "You’ve won a Tesco voucher! Click here!" },
      { user: "You", text: "Report or Ignore?" },
    ],
    correctAnswer: "Report",
    reason: "Unsolicited prize messages are usually scams.",
  },
  {
    id: 10,
    platform: "Fortnite",
    chat: [
      { user: "NinjaBoi", text: "Let’s team up next match?" },
      { user: "You", text: "Report or Ignore?" },
    ],
    correctAnswer: "Ignore",
    reason: "Friendly game request. Not suspicious.",
  },
  {
    id: 11,
    platform: "Instagram",
    chat: [
      { user: "FollowerQueen", text: "Buy 1K followers for £5!" },
      { user: "You", text: "Report or Ignore?" },
    ],
    correctAnswer: "Report",
    reason: "Selling fake followers violates platform rules.",
  },
  {
    id: 12,
    platform: "Minecraft",
    chat: [
      { user: "CreeperMaster", text: "You're a noob!" },
      { user: "RedDragon", text: "Yeah, uninstall bro." },
      { user: "PixelGirl", text: "Too harsh guys." },
      { user: "You", text: "Report or Ignore?" },
    ],
    correctAnswer: "Ignore",
    reason: "Mild bullying. Consider blocking, but not report-worthy unless it continues.",
  },
  {
    id: 13,
    platform: "Discord",
    chat: [
      { user: "CryptoKing", text: "Invest in this new coin!" },
      { user: "CryptoKing", text: "Guaranteed profit. DM me." },
      { user: "You", text: "Report or Ignore?" },
    ],
    correctAnswer: "Report",
    reason: "Unsolicited financial scams are reportable.",
  },
  {
    id: 14,
    platform: "Roblox",
    chat: [
      { user: "CuteCat27", text: "Follow me for a surprise!" },
      { user: "NoobAlert", text: "What's the surprise?" },
      { user: "CuteCat27", text: "A private game link 👀" },
      { user: "You", text: "Report or Ignore?" },
    ],
    correctAnswer: "Ignore",
    reason: "Curiosity baiting isn’t a scam unless harmful content is shared.",
  },
  {
    id: 15,
    platform: "Instagram",
    chat: [
      { user: "PhotoLover", text: "Love your art! Want to collab?" },
      { user: "You", text: "Report or Ignore?" },
    ],
    correctAnswer: "Ignore",
    reason: "Genuine compliments or collab requests aren’t suspicious.",
  }
];
