import React, { useState } from "react";
import NavbarAdult from "../Components/NavbarAdult";
import FooterAdult from "../Components/FooterAdult";

const investmentScenarios = [
  {
    title: "Crypto Investment with 15% Weekly Returns",
    message: "Earn 15% weekly returns with our new crypto bot! Limited spots left!",
    choices: [
      {
        text: "Invest now",
        isCorrect: false,
        explanation:
          "⚠️ Promises of consistent high returns (like 15% weekly) are classic signs of scams. Real investments fluctuate and involve risk. No legitimate platform guarantees such gains, especially in volatile markets like crypto."
      },
      {
        text: "Check FCA Register first",
        isCorrect: true,
        explanation:
          "✅ Excellent choice! Verifying if the company is regulated via the FCA Register helps ensure your money isn't going to a scam. Regulation offers you recourse in case things go wrong."
      }
    ]
  },
  {
    title: "Forex Trading Course for £500",
    message: "Become a millionaire in 6 months! Enroll now in our exclusive £500 forex course.",
    choices: [
      {
        text: "Pay the £500 and enroll",
        isCorrect: false,
        explanation:
          "⚠️ Scams often lure victims with dreams of quick riches. No legitimate training guarantees millionaire status. Always be cautious of 'get rich quick' tactics and vague promises."
      },
      {
        text: "Research the company and check for reviews",
        isCorrect: true,
        explanation:
          "✅ Smart move! Researching course reviews and company credentials helps you avoid spending money on useless or fraudulent material. If it’s truly valuable, it will have a traceable reputation."
      }
    ]
  },
  {
    title: "Gold Investment via WhatsApp",
    message: "Join our private WhatsApp group and get insider gold tips.",
    choices: [
      {
        text: "Join the group and invest",
        isCorrect: false,
        explanation:
          "⚠️ Scammers prefer encrypted, private messaging apps to hide their tracks. Being invited to private groups for secret 'tips' is a strong red flag. Legitimate advice is not shared this way."
      },
      {
        text: "Avoid unregulated groups",
        isCorrect: true,
        explanation:
          "✅ Excellent judgment. Always stick to FCA-regulated platforms and avoid investment advice shared in unregulated, informal channels like WhatsApp, Telegram, or Discord."
      }
    ]
  },
  {
    title: "Startup Equity Opportunity",
    message: "Invest £1000 and get 5% equity in a tech startup. Guaranteed profits!",
    choices: [
      {
        text: "Send £1000",
        isCorrect: false,
        explanation:
          "⚠️ No real startup can guarantee profits. Equity investments are risky, and promising guaranteed returns is highly misleading and often a tactic used by scammers."
      },
      {
        text: "Verify startup and consult advisor",
        isCorrect: true,
        explanation:
          "✅ Great choice. Always research the startup’s founders, business registration, and funding history. Consulting an advisor protects you from investing in fraudulent ventures."
      }
    ]
  },
  {
    title: "Pension Investment Scheme",
    message: "Double your pension in 1 year. Safe and government-backed!",
    choices: [
      {
        text: "Sign up immediately",
        isCorrect: false,
        explanation:
          "⚠️ Government schemes are never promoted via cold calls or emails. Doubling your pension is an unrealistic promise—beware of impersonators pretending to represent government bodies."
      },
      {
        text: "Confirm with gov.uk or pension provider",
        isCorrect: true,
        explanation:
          "✅ Spot on! Always cross-check offers with official sources such as gov.uk or your pension provider. Genuine schemes are slow, regulated, and transparent."
      }
    ]
  },
  {
    title: "NFT Flipping Guide",
    message: "Make £10,000 flipping NFTs. Buy the course now!",
    choices: [
      {
        text: "Buy course for £200",
        isCorrect: false,
        explanation:
          "⚠️ The NFT market is highly speculative. Scammers target inexperienced users by selling expensive guides promising big returns. Most contain recycled or worthless info."
      },
      {
        text: "Check online reviews",
        isCorrect: true,
        explanation:
          "✅ You're being cautious—and that’s good. Reviews often reveal if others have been scammed or if the course is legitimate. Transparency and credibility are key in high-risk fields."
      }
    ]
  },
  {
    title: "Social Media Influencer Tip",
    message: "Influencer says they made £2k in a day! Link in bio to join the app.",
    choices: [
      {
        text: "Click the link and sign up",
        isCorrect: false,
        explanation:
          "⚠️ Scam apps are often promoted by fake or paid influencers. They may direct you to malware, phishing, or unregulated platforms that steal your data or money."
      },
      {
        text: "Check for sponsorship disclosure and FCA listing",
        isCorrect: true,
        explanation:
          "✅ Great approach! If it’s a paid promotion, the influencer must disclose it. Always look for regulation, app reviews, and warning signs before signing up."
      }
    ]
  },
  {
    title: "Private Equity Deal Invite",
    message: "Secret deal for high-net-worth investors. Reply to get in.",
    choices: [
      {
        text: "Reply immediately",
        isCorrect: false,
        explanation:
          "⚠️ Vague investment invitations, especially those with no documentation or contact details, are phishing tactics. They play on exclusivity to bait victims quickly."
      },
      {
        text: "Request documentation and verify",
        isCorrect: true,
        explanation:
          "✅ Well done. Legitimate private equity offers require proof of eligibility, official documents, and legal agreements. Never engage without verifying everything first."
      }
    ]
  },
  {
    title: "Crypto Arbitrage Bot",
    message: "Our bot makes 10% daily by trading crypto. Invest now!",
    choices: [
      {
        text: "Try the bot for £500",
        isCorrect: false,
        explanation:
          "⚠️ No financial product can legally promise consistent daily profits. Crypto arbitrage bots are a common scam type—once you pay, your money is gone."
      },
      {
        text: "Search scam reports and forums",
        isCorrect: true,
        explanation:
          "✅ Excellent strategy! Scam reporting forums like Trustpilot or Reddit often expose fake bots and shady platforms. Researching before investing is critical."
      }
    ]
  },
  {
    title: "Free Stocks for Signing Up",
    message: "Get £100 free stocks. Just deposit £300 and invite 3 friends.",
    choices: [
      {
        text: "Deposit money",
        isCorrect: false,
        explanation:
          "⚠️ These referral-based incentives are often pyramid schemes. The promised returns are either fake or inaccessible. Real brokers disclose clear conditions for bonuses."
      },
      {
        text: "Read the platform’s terms",
        isCorrect: true,
        explanation:
          "✅ Smart! Always read user agreements, privacy policies, and promotion terms. If you can’t find details, or it sounds vague—it’s likely a scam."
      }
    ]
  }
];


const InvestmentScamTester = () => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [badges, setBadges] = useState(0);

  const handleChoice = (choice) => {
    setFeedback(choice.explanation);
    if (choice.isCorrect) {
      setBadges((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarAdult /> {/* ✅ Navbar Added */}
    <main className="flex-grow bg-gradient-to-br from-gray-100 to-blue-50 p-12 pb-16">
      <h1 className="text-3xl font-bold text-center text-orange-800 mb-2">💰 Investment Scam Tester</h1>
      <p className="text-center text-gray-700 mb-6">
        Evaluate real-sounding investment ads and learn how to spot the red flags. Trust your instincts, but always verify!
      </p>

      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-6">
        {/* Left: Scenarios List */}
        <div className="lg:w-1/3 h-[500px] overflow-y-auto bg-white rounded-xl shadow-md p-4">
          {investmentScenarios.map((s, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedScenario(s);
                setFeedback("");
              }}
              className={`cursor-pointer border rounded-md p-3 mb-3 ${
                selectedScenario?.title === s.title ? "bg-orange-100 border-orange-400" : "hover:bg-orange-50"
              }`}
            >
              <h3 className="font-semibold text-orange-700">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.message}</p>
            </div>
          ))}
        </div>

        {/* Right: Details + Choices */}
        <div className="lg:w-2/3 bg-white rounded-xl shadow-md p-6">
          {selectedScenario ? (
            <>
              <h2 className="text-xl font-bold text-orange-800">{selectedScenario.title}</h2>
              <p className="text-gray-700 mt-1 mb-4">{selectedScenario.message}</p>
              {selectedScenario.choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(choice)}
                  className="block w-full text-left bg-orange-100 hover:bg-orange-200 px-4 py-3 mb-3 rounded-md font-medium text-orange-900 shadow"
                >
                  {choice.text}
                </button>
              ))}
              {feedback && (
                <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
                  {feedback}
                </div>
              )}
              <a
                href="https://register.fca.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-700 underline mt-4 inline-block"
              >
                🔍 Check firm on FCA Register
              </a>
              <br />
              <a
                href="/spot-investment-scams.pdf"
                download
                className="bg-green-600 text-white px-4 py-2 mt-3 inline-block rounded hover:bg-green-700 transition"
              >
                📄 Download Scam Tips
              </a>
            </>
          ) : (
            <p className="text-gray-500 italic">Select a scenario to begin...</p>
          )}
        </div>
      </div>

      
     </main>
    <FooterAdult /> {/* ✅ Footer Added */}
    {/* Badge Counter */}
      <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded shadow-md">
        🏅 Badges Earned: {badges}
      </div>

      
    </div>
  );
};

export default InvestmentScamTester;
