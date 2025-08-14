import React, { useState } from "react";
import NavbarAdult from "../Components/NavbarAdult";
import FooterAdult from "../Components/FooterAdult";

const scenarios = [
  {
    id: 1,
    title: "Amazon Refund Email Scam",
    description: "You receive an email claiming you’re eligible for an Amazon refund. Do you click the refund link?",
    image: "/assets/Image/teenscover/SV1.png",
    choices: [
      {
        text: "Click the refund link",
        outcome: "⚠️ The link led to a phishing site! Your login could be stolen.",
      },
      {
        text: "Check Amazon directly",
        outcome: "✅ Great choice! You avoided a phishing attempt.",
      },
    ],
  },
  {
    id: 2,
    title: "Bank Account Locked SMS",
    description: "You get a message saying your bank account is locked. There’s a link to verify your identity.",
    image: "/assets/Image/teenscover/SV2.png",
    choices: [
      {
        text: "Click the link and enter details",
        outcome: "⚠️ That was a smishing scam! Your info was stolen.",
      },
      {
        text: "Call the bank via official number",
        outcome: "✅ Smart move! You avoided a scam.",
      },
    ],
  },
  {
    id: 3,
    title: "Too-Good-To-Be-True Job Offer",
    description: "A recruiter offers a remote job with high pay, but asks for an upfront 'training fee.'",
    image: "/assets/Image/teenscover/SV3.png",
    choices: [
      {
        text: "Pay the fee to start",
        outcome: "⚠️ It's a job scam! Real jobs don't charge you to start.",
      },
      {
        text: "Research the company first",
        outcome: "✅ Wise move! You discovered the company doesn't exist.",
      },
    ],
  },
  {
    id: 4,
    title: "Tech Support Pop-Up",
    description: "A pop-up says your computer is infected and urges you to call Microsoft support.",
    image: "/assets/Image/teenscover/SV4.png",
    choices: [
      {
        text: "Call the number immediately",
        outcome: "⚠️ That was a fake support line! They could have installed malware.",
      },
      {
        text: "Close the tab and run antivirus",
        outcome: "✅ Nice! You handled it like a pro.",
      },
    ],
  },
  {
    id: 5,
    title: "Facebook Messenger Friend Request",
    description: "You get a message from a friend asking for money urgently via Messenger.",
    image: "/assets/Image/teenscover/SV5.png",
    choices: [
      {
        text: "Send money immediately",
        outcome: "⚠️ Oops! Their account was hacked. You lost money.",
      },
      {
        text: "Call them to verify first",
        outcome: "✅ You avoided a scam and helped your friend secure their account.",
      },
    ],
  },
  {
    id: 6,
    title: "Fake Charity Donation",
    description: "You receive a text asking for donations to help earthquake victims.",
    image: "/assets/Image/teenscover/SV6.png",
    choices: [
      {
        text: "Donate via the link in the text",
        outcome: "⚠️ It was a fake charity site! Funds went to scammers.",
      },
      {
        text: "Check the charity on a trusted site",
        outcome: "✅ Well done! You donated through the real charity safely.",
      },
    ],
  },
  {
    id: 7,
    title: "Suspicious Package Delivery Email",
    description: "You get an email saying a package couldn't be delivered and you must click a link to reschedule.",
    image: "/assets/Image/teenscover/SV7.png",
    choices: [
      {
        text: "Click to reschedule delivery",
        outcome: "⚠️ Fake courier site stole your info!",
      },
      {
        text: "Check tracking via your Amazon account",
        outcome: "✅ You dodged a phishing scam!",
      },
    ],
  },
  {
    id: 8,
    title: "Online Marketplace Overpayment",
    description: "You sell an item online. Buyer overpays and asks you to refund the difference.",
    image: "/assets/Image/teenscover/SV8.png",
    choices: [
      {
        text: "Refund the excess amount",
        outcome: "⚠️ Scam alert! Their original payment will bounce.",
      },
      {
        text: "Wait for the payment to clear",
        outcome: "✅ Smart thinking! You avoided a refund scam.",
      },
    ],
  },
  {
    id: 9,
    title: "Antivirus Expiry Alert",
    description: "An email says your antivirus subscription expired and prompts for immediate renewal.",
    image: "/assets/Image/teenscover/SV9.png",
    choices: [
      {
        text: "Click to renew from the email",
        outcome: "⚠️ It was a phishing link with fake payment capture.",
      },
      {
        text: "Open your antivirus software directly",
        outcome: "✅ That’s safe practice. All good!",
      },
    ],
  },
  {
    id: 10,
    title: "Instagram Copyright Violation Scam",
    description: "You receive a DM saying your Instagram will be deleted for copyright violation. A link is provided to appeal.",
    image: "/assets/Image/teenscover/SV10.png",
    choices: [
      {
        text: "Click the appeal link",
        outcome: "⚠️ The link captured your credentials!",
      },
      {
        text: "Ignore & report the message",
        outcome: "✅ Well done! That was a fake DM.",
      },
    ],
  },
  {
    id: 11,
    title: "Fake App on App Store",
    description: "You download a budgeting app that looks like a trusted brand but asks for card details.",
    image: "/assets/Image/teenscover/SV11.png",
    choices: [
      {
        text: "Enter your card details",
        outcome: "⚠️ Fake app stole your payment info!",
      },
      {
        text: "Check app reviews and publisher",
        outcome: "✅ You spotted the scam in time.",
      },
    ],
  },
  {
    id: 12,
    title: "Lottery Winning Text",
    description: "A text says you won £10,000 in a sweepstake. You must pay £50 to claim.",
    image: "/assets/Image/teenscover/SV12.png",
    choices: [
      {
        text: "Pay the claim fee",
        outcome: "⚠️ Classic advance-fee scam! You lost £50.",
      },
      {
        text: "Ignore the message",
        outcome: "✅ Correct! You didn’t enter any lottery.",
      },
    ],
  },
  {
    id: 13,
    title: "Wi-Fi Terms & Conditions Scam",
    description: "At a café, you connect to public Wi-Fi and are redirected to a login portal asking for email and password.",
    image: "/assets/Image/teenscover/SV13.png",
    choices: [
      {
        text: "Enter credentials to access Wi-Fi",
        outcome: "⚠️ It was a rogue Wi-Fi! Your email was compromised.",
      },
      {
        text: "Use a VPN or mobile data",
        outcome: "✅ You stayed safe on public networks.",
      },
    ],
  },
  {
    id: 14,
    title: "Urgent Apple ID Lock Notification",
    description: "You get a push notification saying your Apple ID is locked. There's a 'Verify Now' button.",
    image: "/assets/Image/teenscover/SV14.png",
    choices: [
      {
        text: "Tap 'Verify Now'",
        outcome: "⚠️ Fake site captured your Apple login.",
      },
      {
        text: "Verify from iPhone Settings",
        outcome: "✅ Secure approach! All safe.",
      },
    ],
  },
  {
    id: 15,
    title: "Romance Scam on Dating App",
    description: "Someone you've matched with starts asking for financial help after a few weeks of chatting.",
    image: "/assets/Image/teenscover/SV15.png",
    choices: [
      {
        text: "Send them money for emergency",
        outcome: "⚠️ Sadly, it’s a common scam tactic.",
      },
      {
        text: "Stop responding and report the profile",
        outcome: "✅ You stopped a romance scam.",
      },
    ],
  },
];


const ScenarioVideos = () => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleScenarioClick = (scenario) => {
    setSelectedScenario(scenario);
    setSelectedChoice(null); // reset if changing scenario
  };

  return (
    <>
      <NavbarAdult /> {/* ✅ Navbar Added */}
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">Digital Danger Decisions</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-3xl">
       Make smart choices in real-life scam situations & see the outcome—your safety depends on it!
      </p>

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
        {/* Scenario List */}
        <div className="lg:w-1/3 space-y-4 overflow-y-auto max-h-[600px] pr-2">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleScenarioClick(scenario)}
              className={`w-full p-4 text-left rounded-lg shadow-md transition-all ${
                selectedScenario?.id === scenario.id
                  ? "bg-black-100 border-2 border-blue-400"
                  : "bg-white hover:bg-blue-50"
              }`}
            >
              <h2 className="font-semibold text-blue-800">{scenario.title}</h2>
              <p className="text-sm text-gray-600">{scenario.description}</p>
            </button>
          ))}
        </div>

        {/* Selected Scenario Panel */}
        <div className="lg:w-2/3 bg-white rounded-2xl shadow-lg p-6">
          {selectedScenario ? (
            <>
              <img
                src={selectedScenario.image}
                alt={selectedScenario.title}
                className="rounded-xl mb-4 mx-auto w-full max-w-md object-contain"
              />
              <h2 className="text-xl font-bold text-blue-800 mb-2">
                {selectedScenario.title}
              </h2>
              <p className="mb-4 text-gray-700">{selectedScenario.description}</p>

              {!selectedChoice ? (
                <div className="space-y-3">
                  {selectedScenario.choices.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedChoice(choice)}
                      className="w-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium py-2 px-4 rounded-lg transition"
                    >
                      {choice.text}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 mt-4 border-l-4 border-blue-500 bg-blue-50 rounded-md text-blue-800">
                  <strong>Outcome:</strong>
                  <p className="mt-2">{selectedChoice.outcome}</p>
                  <button
                    onClick={() => setSelectedChoice(null)}
                    className="mt-4 text-sm underline text-blue-600 hover:text-blue-800"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-600">Select a scenario to begin.</p>
          )}
        </div>
      </div>

      <footer className="mt-8 text-sm text-gray-600">
   
      </footer>
    </div>
    <FooterAdult /> {/* ✅ Footer Added */}
    </>
  );
};

export default ScenarioVideos;
