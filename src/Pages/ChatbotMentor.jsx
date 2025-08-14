import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import NavbarAdult from "../Components/NavbarAdult";
import FooterAdult from "../Components/FooterAdult";

const faqData = [
{
  question: "How do I make my Facebook profile private?",
  steps: [
    "📱 Open the Facebook app and tap the ☰ menu.",
    "⚙️ Go to 'Settings & Privacy' → 'Settings'.",
    "🔐 Tap 'Privacy Checkup' to review key settings.",
    "🙈 Set 'Who can see your future posts?' to 'Friends'.",
    "🔒 Restrict access to your friend list and tagged posts.",
  ],
  category: "Social Media Safety",
  thumbsUp: 29,
},
{
  question: "How do I report cyberbullying on Instagram?",
  steps: [
    "📸 Open the post or message containing the bullying content.",
    "⋯ Tap the three dots on the post/message.",
    "🚫 Select 'Report' and choose 'Bullying or harassment'.",
    "📤 Follow the prompts to complete the report.",
    "🧑‍⚖️ Instagram’s moderation team will review the report.",
  ],
  category: "Social Media Safety",
  thumbsUp: 35,
},
{
  question: "How can I avoid being impersonated on social media?",
  steps: [
    "🔒 Set your profile to private where possible.",
    "🛡️ Avoid sharing personal identifiers like your school or phone number.",
    "📸 Use a watermark on your images if you share content publicly.",
    "🚨 Report impersonation to the platform immediately if detected.",
    "💡 Educate your contacts to recognize your real account.",
  ],
  category: "Social Media Safety",
  thumbsUp: 26,
},
{
  question: "How do I secure my Instagram account?",
  steps: [
    "⚙️ Go to 'Settings' → 'Security'.",
    "🔐 Enable Two-Factor Authentication (2FA).",
    "📧 Ensure your email account linked to Instagram is secure.",
    "📱 Review login activity for suspicious devices.",
    "📛 Avoid using third-party apps for followers or likes.",
  ],
  category: "Social Media Safety",
  thumbsUp: 38,
},
{
  question: "What should I do if I receive a suspicious DM?",
  steps: [
    "🚫 Do not click on any links.",
    "📷 Take a screenshot for reporting.",
    "⚠️ Block the sender immediately.",
    "📝 Report the message as spam or scam.",
    "🔐 Change your password if you accidentally clicked a link.",
  ],
  category: "Social Media Safety",
  thumbsUp: 33,
},
{
  question: "How can I check if an email sender is legitimate?",
  steps: [
    "🔍 Examine the sender’s full email address (not just name).",
    "🌐 Check for small changes like support@paypal.com vs. support@paypai.com.",
    "🛑 Be wary if the domain doesn’t match the company website.",
    "🧠 Look for unusual grammar or urgent tone.",
  ],
  category: "Email & Phishing",
  thumbsUp: 38,
},
{
  question: "Is it safe to open email attachments?",
  steps: [
    "📎 Only open attachments from trusted sources.",
    "🔄 Even if it’s a known contact, verify they actually sent it.",
    "🦠 Use antivirus software to scan all attachments before opening.",
    "⚠️ Never open ZIP or EXE files from unknown senders.",
  ],
  category: "Email & Phishing",
  thumbsUp: 42,
},
{
  question: "What do phishing links look like?",
  steps: [
    "🔗 Often disguised as legitimate sites but with misspellings.",
    "🔐 They may use shortened URLs (e.g., bit.ly) to hide the true address.",
    "🧪 Hover over links to reveal the destination.",
    "🛡️ Avoid clicking if unsure; visit the site directly instead.",
  ],
  category: "Email & Phishing",
  thumbsUp: 34,
},
{
  question: "How do I unsubscribe from suspicious newsletters?",
  steps: [
    "🧾 Don’t click unsubscribe in suspicious emails—it may confirm your address is active.",
    "🗑️ Mark as spam using your email provider’s tools.",
    "⚙️ Check your email account's filters and block the sender.",
  ],
  category: "Email & Phishing",
  thumbsUp: 29,
},
{
  question: "Can phishing emails infect my device?",
  steps: [
    "🦠 Yes, if you click on links or download malicious attachments.",
    "🔍 Some contain hidden malware or ransomware payloads.",
    "🧰 Always use antivirus tools and scan downloads.",
  ],
  category: "Email & Phishing",
  thumbsUp: 39,
},
{
  question: "What should I do if I replied to a phishing email?",
  steps: [
    "🛑 Stop further interaction immediately.",
    "🔑 Change your passwords for affected accounts.",
    "📢 Report the incident to your IT department or email provider.",
    "🛡️ Monitor for suspicious login attempts or transactions.",
  ],
  category: "Email & Phishing",
  thumbsUp: 28,
},
{
  question: "How do I report a phishing email?",
  steps: [
    "📧 Forward the email to the official reporting address (e.g., report@phishing.gov.uk).",
    "🚫 Mark it as spam or phishing in your inbox.",
    "📝 Include any suspicious links or headers for analysis.",
  ],
  category: "Email & Phishing",
  thumbsUp: 37,
},
{
  question: "Are phishing emails only about money?",
  steps: [
    "💰 No, some target your login credentials.",
    "🧪 Others may try to infect your device or impersonate your contacts.",
    "🧠 Be alert even if no money is requested directly.",
  ],
  category: "Email & Phishing",
  thumbsUp: 25,
},
{
  question: "How can I teach older adults to avoid phishing?",
  steps: [
    "📺 Use video tutorials with simple examples.",
    "👨‍👩‍👧 Role-play phishing scenarios with them.",
    "⚠️ Teach them to never click unknown links.",
    "🔍 Encourage verifying with you or another family member first.",
  ],
  category: "Email & Phishing",
  thumbsUp: 46,
},
{
  question: "Can phishing emails bypass spam filters?",
  steps: [
    "🛡️ Yes, some phishing emails are crafted to evade filters.",
    "📧 They may use trusted services or compromised accounts.",
    "🧠 Always review emails critically, even if they land in your inbox.",
  ],
  category: "Email & Phishing",
  thumbsUp: 30,
},

{
  question: "Can someone hack me by liking my post?",
  steps: [
    "🛡️ No, liking a post itself cannot lead to hacking.",
    "🤖 However, bots may use likes to lure you to fake profiles.",
    "🔗 Be cautious of any links they send via DM.",
    "🚨 Report suspicious profiles and avoid engaging with them.",
  ],
  category: "Social Media Safety",
  thumbsUp: 24,
},
{
  question: "How do I remove location tags from posts?",
  steps: [
    "🖼️ Open the post you've shared with location.",
    "⋯ Tap the three dots on the post.",
    "🗺️ Tap 'Edit', then remove the location shown.",
    "💾 Tap 'Save' or 'Done' to update the post.",
  ],
  category: "Social Media Safety",
  thumbsUp: 31,
},
{
  question: "What are signs of fake social media profiles?",
  steps: [
    "🕵️‍♂️ No mutual friends or a small friend count.",
    "📷 Stolen or model-like profile photos.",
    "🗣️ Generic or poorly written bio.",
    "💬 Messages that quickly ask for money or links.",
    "🌐 Reverse image search the profile picture for clues.",
  ],
  category: "Social Media Safety",
  thumbsUp: 40,
},
{
  question: "Is it safe to use hashtags on private accounts?",
  steps: [
    "🔒 On private accounts, hashtags don't expose your content publicly.",
    "💬 Only approved followers can see hashtagged posts.",
    "📢 Avoid using hashtags that attract scammers (e.g., #winiphone).",
  ],
  category: "Social Media Safety",
  thumbsUp: 21,
},
{
  question: "How do I prevent identity theft on social media?",
  steps: [
    "🔐 Avoid posting your full name, birthdate, or address.",
    "🧩 Don’t answer viral quizzes asking personal info.",
    "📷 Limit public access to your profile pictures.",
    "📬 Monitor friend requests from strangers or bots.",
    "🧠 Think before posting anything revealing or sensitive.",
  ],
  category: "Social Media Safety",
  thumbsUp: 43,
},
{
  question: "How often should I change my passwords?",
  steps: [
    "📅 Every 3–6 months is recommended for important accounts.",
    "🔐 Immediately change them after any security breach.",
    "🗝️ Use a password manager to track changes safely.",
  ],
  category: "Password Security",
  thumbsUp: 36,
},
{
  question: "Is saving passwords in my browser safe?",
  steps: [
    "🧠 It's convenient but risky if your device is compromised.",
    "🔑 Use a dedicated password manager for better security.",
    "🛡️ Enable device-level encryption and auto-lock.",
  ],
  category: "Password Security",
  thumbsUp: 32,
},
{
  question: "What is two-factor authentication (2FA)?",
  steps: [
    "📲 2FA adds an extra layer by asking for a code after your password.",
    "🔐 It could be a text code, email link, or app-based code (like Google Authenticator).",
    "🛡️ This makes it harder for hackers to gain access even if they steal your password.",
  ],
  category: "Password Security",
  thumbsUp: 44,
},
{
  question: "What is a password manager?",
  steps: [
    "🔐 A tool that stores and encrypts all your passwords.",
    "🧠 You only need to remember one master password.",
    "📱 Many managers offer autofill and password generation.",
  ],
  category: "Password Security",
  thumbsUp: 40,
},
{
  question: "Can hackers guess passwords from social media?",
  steps: [
    "👀 Yes! Birthdays, pet names, schools—all can help guess passwords.",
    "🚫 Avoid using anything visible on your public profiles.",
    "💡 Use unique and unrelated combinations.",
  ],
  category: "Password Security",
  thumbsUp: 39,
},
{
  question: "Should I use the same password everywhere?",
  steps: [
    "🚫 Never reuse passwords across different accounts.",
    "🧩 If one site is breached, others become vulnerable.",
    "🛠️ Use a password manager to create and store unique ones.",
  ],
  category: "Password Security",
  thumbsUp: 42,
},
{
  question: "How can I test if my password is strong?",
  steps: [
    "🔐 Use password strength checkers (e.g., security.org or Bitwarden).",
    "🔢 Ensure it’s at least 12 characters long with a mix of cases and symbols.",
    "🚫 Avoid common words or simple patterns.",
  ],
  category: "Password Security",
  thumbsUp: 31,
},
{
  question: "Are fingerprint or face unlock safe?",
  steps: [
    "📲 Biometrics are secure but should be paired with a strong PIN or password.",
    "🔐 Don't rely solely on biometrics for sensitive accounts.",
    "🛡️ Biometrics can’t be changed if compromised, unlike passwords.",
  ],
  category: "Password Security",
  thumbsUp: 35,
},
{
  question: "What is credential stuffing?",
  steps: [
    "🧠 A type of cyberattack using leaked passwords from one site to access others.",
    "🔁 Attackers automate logins using stolen credentials.",
    "🔐 Prevent it by using unique passwords and enabling 2FA.",
  ],
  category: "Password Security",
  thumbsUp: 28,
},
{
  question: "What should I do after a password breach?",
  steps: [
    "📢 Change your password immediately for that service.",
    "🔁 Update any other accounts using the same password.",
    "🛡️ Enable 2FA and monitor account activity.",
    "🧰 Consider using identity monitoring tools if data was leaked.",
  ],
  category: "Password Security",
  thumbsUp: 45,
},


];

const fuse = new Fuse(faqData, {
  keys: ["question"],
  threshold: 0.4,
});

const ChatbotMentor = () => {
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes") || "[]"));
  const bottomRef = useRef(null);

  const handleQuestionClick = (faq) => {
    setChat((prev) => [...prev, { type: "user", text: faq.question }]);
    const delay = Math.min(2000, faq.steps.join(" ").length * 20);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setChat((prev) => [
        ...prev,
        { type: "bot", faq, expanded: false },
      ]);
    }, delay);
  };

  const toggleStep = (chatIndex) => {
    setChat((prev) =>
      prev.map((item, idx) =>
        idx === chatIndex ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  const addNote = (faq) => {
    const updatedNotes = [...notes, faq];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const clearChat = () => {
    setChat([]);
  };

  const filteredFAQs = faqData.filter(
    (faq) =>
      (category === "All" || faq.category === category) &&
      faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const suggested = fuse.search(searchTerm).map((r) => r.item);



  return (
    <>
      <NavbarAdult /> {/* ✅ Navbar Added */}
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 p-4">
      <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-xl animate-bounce z-50">
        🤖
      </div>

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">🤖 Cyber Mentor Chatbot</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-4">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg border border-blue-300 w-full max-w-sm"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-blue-300"
        >
          <option>All</option>
          <option>Social Media Safety</option>
          <option>Email & Phishing</option>
          <option>Password Security</option>
        </select>
        <button
          onClick={clearChat}
          className="bg-red-100 hover:bg-blue-200 px-4 py-2 rounded-lg text-red-600"
        >
          🔄 Clear Chat
        </button>
      </div>

      {/* Suggestions */}
      {filteredFAQs.length === 0 && searchTerm && (
        <div className="text-center text-gray-700 mb-4">
          <p>No results found. Did you mean:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {suggested.slice(0, 3).map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleQuestionClick(item)}
                className="bg-blue-100 px-3 py-1 rounded-lg hover:bg-blue-200 text-blue-800"
              >
                {item.question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 flex flex-col lg:flex-row gap-6">
        {/* Chat Box */}
        <div className="lg:w-2/3 overflow-y-auto h-[60vh] p-4 space-y-4 border-r border-blue-100">
          {chat.map((msg, idx) =>
            msg.type === "user" ? (
              <div key={idx} className="text-right">
                <p className="inline-block bg-blue-200 text-blue-900 px-4 py-2 rounded-xl">
                  {msg.text}
                </p>
              </div>
            ) : (
              <div key={idx} className="text-left">
                <div className="bg-white border border-blue-300 p-4 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-blue-700">{msg.faq.question}</h3>
                  <p className="text-xs text-gray-500 mb-2">{msg.faq.category}</p>
                  <p className="text-gray-600 text-sm mb-2">👍 {msg.faq.thumbsUp} people found this helpful</p>
                  <button
                    onClick={() => toggleStep(idx)}
                    className="text-sm text-blue-600 underline mb-2"
                  >
                    {msg.expanded ? "Hide steps" : "Show steps"}
                  </button>
                  {msg.expanded && (
                    <ul className="list-disc ml-6 text-sm text-gray-800 space-y-1">
                      {msg.faq.steps.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  )}
                  <button
                    onClick={() => addNote(msg.faq)}
                    className="text-xs mt-3 text-green-600 hover:underline"
                  >
                    📌 Save this to my notes
                  </button>
                </div>
              </div>
            )
          )}
          {typing && (
            <div className="text-left text-gray-500 italic animate-pulse">
              CyberBot is typing...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* FAQs */}
        <div className="lg:w-1/3">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Popular Questions</h2>
           <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
          {filteredFAQs.map((faq, idx) => (
            <button
              key={idx}
              onClick={() => handleQuestionClick(faq)}
              className="block w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow-sm"
            >
              {faq.question}
            </button>
          ))}
        </div>
      </div>
      </div>

      {/* Notes Section */}
      <div className="max-w-4xl mx-auto mt-8 bg-yellow-50 p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-3 text-yellow-900">📓 My Saved Notes</h2>
        {notes.length === 0 ? (
          <p className="text-sm text-gray-600">You haven't saved anything yet.</p>
        ) : (
          <ul className="list-disc ml-6 space-y-1 text-sm text-yellow-800">
            {notes.map((n, i) => (
              <li key={i}>
                <strong>{n.question}</strong> - <em>{n.category}</em>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
      <FooterAdult /> {/* ✅ Footer Added */}
    </>
  );
};

export default ChatbotMentor;
