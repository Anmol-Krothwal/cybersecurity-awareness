import React, { useState } from "react";
import ProfileCard from "../Components/ProfileCard";
import FeedbackBox from "../Components/FeedbackBox";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// ✅ Game Questions (15 total)
const profileQuestions = [
  {
    id: 1,
    instruction: "🔍 One profile is built on truth, the other on tricks.Think twice before you tap.",
    profiles: [
      { id: "real", name: "SketchMaster", caption: "Doodling is my superpower 🎨✏️", mutuals: 19, image: "/assets/Image/users/user-1.jpg" },
      { id: "fake", name: "iPadKing99", caption: "Win a new iPad! Just DM me 📱", mutuals: 0, image: "/assets/Image/users/user-2.jpg" }
    ],
    correct: "fake",
    reason: "The fake profile promises free devices with no context."
  },
  {
    id: 2,
    instruction: "🧠 Would you invite them to your group chat? Choose the one that feels real, not viral.",
    profiles: [
      { id: "fake", name: "GameChampFreeCoins", caption: "Free V-Bucks 💸 Click my bio", mutuals: 0, image: "/assets/Image/users/user-3.jpg" },
      { id: "real", name: "AlexOnTrack", caption: "Track & Field lover 🏃‍♂️🏅", mutuals: 18, image: "/assets/Image/users/user-4.jpg" }
    ],
    correct: "real",
    reason: "The real profile has relatable interests and mutuals."
  },
  {
    id: 3,
    instruction: "🔐 If you met both in real life… Who would actually show up?",
    profiles: [
      { id: "real", name: "PlantNerd", caption: "Succulents are life 🌵💚", mutuals: 12, image: "/assets/Image/users/user-5.jpg" },
      { id: "fake", name: "StarKid123", caption: "I'm 14 and a millionaire 🌟", mutuals: 1, image: "/assets/Image/users/user-6.jpg" }
    ],
    correct: "real",
    reason: "The plant-loving profile is genuine with connections."
  },
  {
    id: 4,
    instruction: "🎯 One of these might follow you back. But should you follow them?",
    profiles: [
      { id: "fake", name: "VIPOnlyFan", caption: "Follow me for special videos 👀", mutuals: 0, image: "/assets/Image/users/user-7.jpg" },
      { id: "real", name: "PuzzlePro", caption: "Brain teasers = best fun 🧠🧩", mutuals: 20, image: "/assets/Image/users/user-8.jpg" }
    ],
    correct: "fake",
    reason: "The fake profile uses suggestive bait and has no mutuals."
  },
  {
    id: 5,
    instruction: "💡 Fame is loud, but trust is quiet. Who’s just being themselves?",
    profiles: [
      { id: "real", name: "BakerBella", caption: "Cupcakes are my weekend thing 🧁🍓", mutuals: 28, image: "/assets/Image/users/user-9.jpg" },
      { id: "fake", name: "PhoneFixer007", caption: "DM me to fix your phone online 📲", mutuals: 0, image: "/assets/Image/users/user-10.jpg" }
    ],
    correct: "real",
    reason: "The baking account has a realistic caption and mutuals."
  },
  {
    id: 6,
    instruction: "📱 You see this in your DMs. Who’s more likely to be a real friend?",
    profiles: [
      { id: "real", name: "DoggoDan", caption: "My dog > everything 🐶💙", mutuals: 16, image: "/assets/Image/users/user-11.jpg" },
      { id: "fake", name: "SnapCashKing", caption: "Earn $200 instantly 💰 Message me!", mutuals: 0, image: "/assets/Image/users/user-12.jpg" }
    ],
    correct: "real",
    reason: "The dog profile has realistic content and social connections."
  },
  {
    id: 7,
    instruction: "🕵️ The caption looks cool, but so does bait. Who's really just flexing fake?",
    profiles: [
      { id: "fake", name: "GiveawayGenie", caption: "Follow & Win PS5 🎮 No joke", mutuals: 0, image: "/assets/Image/users/user-13.jpg" },
      { id: "real", name: "ArtsyAnna", caption: "Coloring is my therapy 🎨🧘‍♀️", mutuals: 22, image: "/assets/Image/users/user-14.jpg" }
    ],
    correct: "fake",
    reason: "Giveaway scams are commonly used to bait users."
  },
  {
    id: 8,
    instruction: "🧵 Which profile shares a hobby, not hype? Think less flashy, more real.",
    profiles: [
      { id: "real", name: "GymnastGabi", caption: "Flip. Land. Repeat. 🤸‍♀️", mutuals: 25, image: "/assets/Image/users/user-15.jpg" },
      { id: "fake", name: "FamousFan101", caption: "I know celebs personally 💅", mutuals: 0, image: "/assets/Image/users/user-16.jpg" }
    ],
    correct: "real",
    reason: "The gymnastics profile has natural activity and real mutuals."
  },
  {
    id: 9,
    instruction: "🧃 One of them makes you smile. The other wants your clicks.",
    profiles: [
      { id: "fake", name: "StreamerCashDrop", caption: "Live stream cash drop 🚀 Join fast!", mutuals: 0, image: "/assets/Image/users/user-17.jpg" },
      { id: "real", name: "ComicCrush", caption: "Marvel is better than DC. Fight me. 🦸‍♂️", mutuals: 14, image: "/assets/Image/users/user-18.jpg" }
    ],
    correct: "fake",
    reason: "Cash drops from strangers are typical scam tactics."
  },
  {
    id: 10,
    instruction: "🧸 You’d like one in your team. But one would report you instead.",
    profiles: [
      { id: "real", name: "ScienceRocks", caption: "Experiments are fun 🔬💡", mutuals: 17, image: "/assets/Image/users/user-19.jpg" },
      { id: "fake", name: "CryptoKidX", caption: "Learn crypto fast 💹 Start today!", mutuals: 0, image: "/assets/Image/users/user-20.jpg" }
    ],
    correct: "real",
    reason: "The science-related profile is realistic and has mutual friends."
  },
  {
    id: 11,
    instruction: "🧃 One shares what they love. The other shares what they want from you.",
    profiles: [
      { id: "real", name: "MusicMixKid", caption: "Learning piano 🎹🎶", mutuals: 30, image: "/assets/Image/users/user-3.jpg" },
      { id: "fake", name: "LinkClicker47", caption: "New filter! Try this link! 😜", mutuals: 0, image: "/assets/Image/users/user-4.jpg" }
    ],
    correct: "real",
    reason: "The piano learner has a grounded caption and high mutuals."
  },
  {
    id: 12,
    instruction: "🔗 One link, one mistake. Who’s hiding behind shiny promises?",
    profiles: [
      { id: "fake", name: "CashWinner77", caption: "Click to claim your prize 🎁💸", mutuals: 0, image: "/assets/Image/users/user-19.jpg" },
      { id: "real", name: "CraftyKiddo", caption: "Paper crafts and glue guns 🔧📦", mutuals: 21, image: "/assets/Image/users/user-20.jpg" }
    ],
    correct: "fake",
    reason: "Click-to-claim messages are a common phishing strategy."
  },
  {
    id: 13,
    instruction: "📖 Ordinary can be authentic. Which profile feels like someone you know?",
    profiles: [
      { id: "real", name: "DinoDude", caption: "T-Rex is the coolest 🦖💚", mutuals: 10, image: "/assets/Image/users/user-5.jpg" },
      { id: "fake", name: "VerifiedZoe_", caption: "I’m verified but my new account got hacked 💔", mutuals: 0, image: "/assets/Image/users/user-6.jpg" }
    ],
    correct: "real",
    reason: "The dinosaur-themed profile has normal mutuals and a fun bio."
  },
  {
    id: 14,
    instruction: "🚨 Hype without heart. One profile wants your trust, the other your info.",
    profiles: [
      { id: "fake", name: "BrandRep001", caption: "Become our brand ambassador 🌍💼", mutuals: 0, image: "/assets/Image/users/user-7.jpg" },
      { id: "real", name: "BookwormBeth", caption: "Reading fantasy books 📚🌟", mutuals: 24, image: "/assets/Image/users/user-8.jpg" }
    ],
    correct: "fake",
    reason: "Scammers often impersonate brands or reps to gain trust."
  },
  {
    id: 15,
    instruction: "💬 Friends talk like this. Who sounds like they’d sit with you at lunch?",
    profiles: [
      { id: "real", name: "SkaterJay", caption: "Skating after school every day 🛹✨", mutuals: 13, image: "/assets/Image/users/user-10.jpg" },
      { id: "fake", name: "FreeShoesBot", caption: "Nike is giving away shoes 👟🔥", mutuals: 0, image: "/assets/Image/users/user-12.jpg" }
    ],
    correct: "real",
    reason: "The skater profile looks authentic and engaging."
  }
];

// 🔁 Shuffle utility
const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

// 🏅 Badge logic
const getBadge = (score, total) => {
  const percentage = (score / total) * 100;
  if (percentage === 100) return { label: "🏆 Perfect!", color: "text-yellow-500" };
  if (percentage >= 80) return { label: "🥇 Gold Badge", color: "text-amber-500" };
  if (percentage >= 50) return { label: "🥈 Silver Badge", color: "text-gray-500" };
  return { label: "🥉 Bronze Badge", color: "text-orange-500" };
};

const GameLogic = () => {
  const [questions, setQuestions] = useState(() => shuffleArray(profileQuestions));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const current = questions[questionIndex];

  const handleSelect = (profile) => {
    if (selectedProfile !== null) return;
    setSelectedProfile(profile);
    if (profile.id === current.correct) {
      setScore((prev) => prev + 1);
    }
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedProfile(null);
      setShowFeedback(false);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setQuestions(shuffleArray(profileQuestions));
    setQuestionIndex(0);
    setSelectedProfile(null);
    setScore(0);
    setShowFeedback(false);
    setGameOver(false);
  };

  if (gameOver) {
    const badge = getBadge(score, questions.length);
    return (
      <div className="text-center p-8 max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 Game Over!</h1>
        <div className="w-40 mx-auto mb-6">
          <CircularProgressbar
            value={score}
            maxValue={questions.length}
            text={`${score}/${questions.length}`}
            styles={buildStyles({
              textColor: "#2f855a",
              pathColor: "#68d391",
              trailColor: "#c6f6d5",
            })}
          />
        </div>
        <p className={`text-2xl font-bold mb-4 ${badge.color}`}>{badge.label}</p>
        <p className="text-lg text-gray-700 mb-6">
          You got <span className="font-bold">{score}</span> out of{" "}
          {questions.length} correct!
        </p>
        <button
          onClick={restartGame}
          className="bg-orange-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-orange-600"
        >
          🔁 Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="text-center text-3xl font-bold text-blue-700 mb-4">
        🔍 Fake vs Real Profile Challenge
      </div>
      <div className="text-center text-gray-600 mb-2">
        Question {questionIndex + 1} of {questions.length} — Score: {score}
      </div>
      <div className="text-center text-lg font-medium text-gray-700 mb-6">
        {current.instruction}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {current.profiles.map((profile, idx) => (
          <ProfileCard
            key={profile.name + idx}
            profile={profile}
            onSelect={() => handleSelect(profile)}
            isSelected={selectedProfile?.name === profile.name}
          />
        ))}
      </div>
      {showFeedback && (
        <FeedbackBox correct={selectedProfile?.id === current.correct} reason={current.reason} />
      )}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={nextQuestion}
          className="bg-green-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-green-600"
        >
          {questionIndex + 1 < questions.length ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default GameLogic;
