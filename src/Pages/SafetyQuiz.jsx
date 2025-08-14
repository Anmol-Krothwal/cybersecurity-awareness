import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import jsPDF from 'jspdf';
import NavbarSenior from "../Components/NavbarSenior";
import FooterSenior from "../Components/FooterSenior";

const questions = [
  {
    question: 'Which of the following is a secure way to manage multiple passwords?',
    options: [
      'Write them in a notebook',
      'Save them in your browser without a password',
      'Use the same password for all accounts',
      'Use a trusted password manager app'
    ],
    correct: 'Use a trusted password manager app',
    explanation: 'A trusted password manager securely stores and encrypts your passwords, so you don’t have to remember them all or reuse weak ones.'
  },
  {
    question: 'A pop-up says your PC has a virus and gives a phone number. What should you do?',
    options: [
      'Call immediately',
      'Restart and ignore it',
      'Click the pop-up to scan',
      'Give your bank details for support'
    ],
    correct: 'Restart and ignore it',
    explanation: 'These “scareware” pop-ups are scams. Restart your device and run an antivirus scan from trusted software instead.'
  },
  {
    question: 'How can you tell if a website is impersonating your bank?',
    options: [
      'It looks simple and fast',
      'It asks for password and PIN together',
      'It includes https:// in the link',
      'It uses your bank’s exact logo'
    ],
    correct: 'It asks for password and PIN together',
    explanation: 'Banks never ask for your full password and PIN at the same time. This is a major red flag of a phishing site.'
  },
  {
    question: 'Which email is most likely a phishing attempt?',
    options: [
      'One from your family member',
      'An email with spelling errors and urgent tone',
      'Your doctor’s appointment reminder',
      'A newsletter you subscribed to'
    ],
    correct: 'An email with spelling errors and urgent tone',
    explanation: 'Phishing emails often create urgency and contain spelling or grammar mistakes to trick you into clicking links.'
  },
  {
    question: 'You receive an unexpected parcel tracking message. What should you do?',
    options: [
      'Click the link to check',
      'Call the courier number in message',
      'Delete the message and visit the courier site directly',
      'Reply asking who sent it'
    ],
    correct: 'Delete the message and visit the courier site directly',
    explanation: 'Scammers use fake tracking links to install malware or steal personal data. Visit the official courier site instead.'
  },
  {
    question: 'Which is the safest way to back up your important documents?',
    options: [
      'Only keep them on your laptop',
      'Email them to yourself',
      'Save on a USB and cloud storage',
      'Print and file them at home'
    ],
    correct: 'Save on a USB and cloud storage',
    explanation: 'Having both a physical backup (USB) and an online backup (cloud) protects your files from loss or damage.'
  },
  {
    question: 'What is the biggest risk of using public Wi-Fi for banking?',
    options: [
      'Slower speed',
      'Limited data',
      'Hackers can intercept your data',
      'Battery drains faster'
    ],
    correct: 'Hackers can intercept your data',
    explanation: 'Public Wi-Fi can be unsafe because attackers may spy on your activity. Always use a VPN for sensitive actions.'
  },
  {
    question: 'What should you do before donating or recycling your old smartphone?',
    options: [
      'Remove the SIM card only',
      'Delete all photos manually',
      'Factory reset the phone',
      'Turn off notifications'
    ],
    correct: 'Factory reset the phone',
    explanation: 'A factory reset erases all your personal data, making it safe to give away or recycle your device.'
  },
  {
    question: 'Which one is NOT a secure sign-in method?',
    options: [
      'Fingerprint recognition',
      'Face ID',
      'Password + code from phone',
      'Sharing your password with family'
    ],
    correct: 'Sharing your password with family',
    explanation: 'Passwords should be private. Sharing them increases the risk of account compromise.'
  },
  {
    question: 'What is a sign of a scam shopping website?',
    options: [
      'Limited-time 90% discounts',
      'Proper spelling and grammar',
      'Secure checkout icon',
      'Customer reviews'
    ],
    correct: 'Limited-time 90% discounts',
    explanation: 'Scam sites often lure buyers with unrealistic discounts to steal money or card details.'
  },
  {
    question: 'If someone calls claiming to be from your bank and asks for your PIN, what should you do?',
    options: [
      'Give it if they know your name',
      'Hang up and call your bank using the official number',
      'Ask them to call back later',
      'Only give the first 3 digits'
    ],
    correct: 'Hang up and call your bank using the official number',
    explanation: 'Banks will never ask for your PIN over the phone. Always verify by calling their official number.'
  },
  {
    question: 'Which is the safest way to install updates on your computer?',
    options: [
      'Download from random websites',
      'Click pop-up ads offering updates',
      'Use the official update tool or settings',
      'Ask a stranger to install updates'
    ],
    correct: 'Use the official update tool or settings',
    explanation: 'Official updates fix security holes. Avoid downloads from unknown sources.'
  },
  {
    question: 'What does the padlock icon in your browser’s address bar mean?',
    options: [
      'The site is safe and cannot be hacked',
      'The site uses encryption to protect data',
      'The site is owned by the government',
      'You are logged in'
    ],
    correct: 'The site uses encryption to protect data',
    explanation: 'The padlock means data sent to the site is encrypted, but it doesn’t guarantee the site itself is trustworthy.'
  },
  {
    question: 'What should you avoid posting on social media?',
    options: [
      'Photos of your pets',
      'Your home address and travel plans',
      'Positive news stories',
      'Old memories'
    ],
    correct: 'Your home address and travel plans',
    explanation: 'Sharing this information can help criminals target your home while you’re away.'
  },
  {
    question: 'What’s the safest way to dispose of bank statements?',
    options: [
      'Throw them in the bin',
      'Rip them in half',
      'Shred them completely',
      'Burn them in the garden'
    ],
    correct: 'Shred them completely',
    explanation: 'Shredding prevents thieves from reconstructing and stealing your personal information.'
  },
  {
    question: 'If you get an email from your internet provider about a payment issue, what should you do?',
    options: [
      'Click the link and enter your details',
      'Reply with your payment information',
      'Log in via the official website or app',
      'Ignore all emails'
    ],
    correct: 'Log in via the official website or app',
    explanation: 'Always verify payment issues by logging in through official channels, not email links.'
  },
  {
    question: 'Which password is the strongest?',
    options: [
      'password123',
      'John1950',
      'MydogRex!',
      'T7r!c#92Lp@q'
    ],
    correct: 'T7r!c#92Lp@q',
    explanation: 'Strong passwords are long, unique, and include a mix of letters, numbers, and symbols.'
  },
  {
    question: 'What is a common sign of a tech support scam?',
    options: [
      'A caller offering to fix your computer for free',
      'An email from your workplace IT team',
      'An app update notification',
      'Your printer not working'
    ],
    correct: 'A caller offering to fix your computer for free',
    explanation: 'Scammers pretend to be tech support to trick you into paying or installing malware.'
  },
  {
    question: 'If a friend sends you a strange message with a link, what should you do?',
    options: [
      'Click it to see what it is',
      'Ask them if they really sent it',
      'Ignore them',
      'Forward it to others'
    ],
    correct: 'Ask them if they really sent it',
    explanation: 'Hackers often take over accounts and send harmful links. Always confirm before clicking.'
  },
  {
    question: 'Which is the safest way to pay on a shopping website?',
    options: [
      'Bank transfer',
      'Cash on delivery',
      'Credit card or trusted payment service',
      'Sending a cheque'
    ],
    correct: 'Credit card or trusted payment service',
    explanation: 'Credit cards and secure payment services offer fraud protection and dispute options.'
  },
  {
    question: 'What should you do if you receive a suspicious charity request?',
    options: [
      'Donate immediately if it’s urgent',
      'Verify the charity through official channels',
      'Give small amount without checking',
      'Share it with friends'
    ],
    correct: 'Verify the charity through official channels',
    explanation: 'Scammers often impersonate charities. Always confirm before donating.'
  },
  {
    question: 'What’s the safest way to connect smart home devices?',
    options: [
      'Use default passwords',
      'Change passwords and update regularly',
      'Never update software',
      'Share login with family'
    ],
    correct: 'Change passwords and update regularly',
    explanation: 'Changing default passwords and keeping devices updated prevents hacking.'
  },
  {
    question: 'Which of these is a secure action when online banking?',
    options: [
      'Logging in from a public library computer',
      'Using two-factor authentication',
      'Sharing your screen with strangers',
      'Saving your password on public devices'
    ],
    correct: 'Using two-factor authentication',
    explanation: 'Two-factor authentication adds an extra layer of protection to your accounts.'
  },
  {
    question: 'What is the safest action if your email account is hacked?',
    options: [
      'Do nothing and hope it stops',
      'Change your password immediately',
      'Tell your friends not to message you',
      'Create a new account and ignore the old one'
    ],
    correct: 'Change your password immediately',
    explanation: 'Changing your password stops the hacker from continuing to access your account.'
  },
  {
    question: 'If a website offers a free gift for filling in your details, what should you do?',
    options: [
      'Enter your details to see if you win',
      'Only give your phone number',
      'Check if it’s a legitimate promotion',
      'Send them a message for more info'
    ],
    correct: 'Check if it’s a legitimate promotion',
    explanation: 'Many “free gift” offers are scams to collect personal information.'
  }
];

const SafetyQuiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false); // ⭐ ADDED
  const passed = score >= 8;

  useEffect(() => {
    if (!showResult) speak(questions[current].question);
  }, [current, showResult]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.lang = 'en-GB';
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const handleAnswer = (option) => {
    setSelected(option);
    setShowExplanation(true); // ⭐ ADDED: show explanation box
    const isCorrect = option === questions[current].correct;
    speak(isCorrect ? "That's correct!" : "Oops! That's not correct.");
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      setShowExplanation(false); // ⭐ ADDED: hide before moving on
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setShowResult(true);
        const finalScore = score + (isCorrect ? 1 : 0);
        if (finalScore >= 8) {
          setShowConfetti(true);
          speak("Well done! You passed the quiz!");
        } else {
          speak("Quiz completed. Keep learning and stay safe!");
        }
      }
    }, 3500); // give time to read explanation
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setShowConfetti(false);
    setName('');
    setShowExplanation(false); // ⭐ ADDED: clear on reset
  };

  const generateCertificate = () => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'px', format: 'a4' });
    const image = new Image();
    image.src = '/assets/Image/certificate_bg.jpg';

    image.onload = () => {
      doc.addImage(image, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
      doc.setFontSize(26);
      doc.setTextColor('#000');
      doc.text(`${name}`, 240, 225);
      doc.save(`Cyber_Smart_Certificate_${name}.pdf`);
    };
  };

  return (
    <>
      <NavbarSenior />
      <div className="bg-gray-200 min-h-screen p-4 md:p-10 text-center text-gray-900">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8"> Digital Safety Quiz</h1>

        {!showResult ? (
          <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-lg border border-blue-100">
            <h2 className="text-xl md:text-3xl font-bold mb-6">Question {current + 1} of {questions.length}</h2>
            <p className="text-lg md:text-2xl font-medium mb-6 leading-snug">{questions[current].question}</p>
            <div className="grid gap-4">
              {questions[current].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selected}
                  className={`transition-all duration-300 px-5 py-4 text-lg md:text-xl font-semibold rounded-xl border 
                    ${
                      selected
                        ? option === questions[current].correct
                          ? 'bg-green-100 border-green-600 text-green-800'
                          : option === selected
                          ? 'bg-red-100 border-red-600 text-red-800'
                          : 'bg-gray-100 border-gray-300 text-gray-500'
                        : 'bg-blue-50 hover:bg-blue-100 border-blue-400 text-blue-900'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* ⭐ ADDED: explanation shows after an answer is chosen */}
            {showExplanation && selected && (
              <div className="mt-5 p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-yellow-900 text-base md:text-lg">
                {questions[current].explanation}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-lg text-center border border-green-200">
            {showConfetti && <Confetti />}
            <h2 className="text-3xl font-bold mb-4 text-green-700">
              {passed ? '🎉 Congratulations!' : '✅ Quiz Completed'}
            </h2>
            <p className="text-xl md:text-2xl mb-4 font-semibold text-gray-800">
              You scored <span className="text-blue-600">{score}</span> out of {questions.length}
            </p>
            {passed && (
              <div className="bg-green-50 border border-green-400 rounded-lg p-5 mt-4 text-green-800">
                <p className="text-xl font-bold">🎓 You've earned a certificate!</p>
                <p className="mt-1">Please enter your name to download it:</p>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-3 px-4 py-2 border rounded-md w-full md:w-1/2 text-lg text-center"
                />
                <button
                  onClick={generateCertificate}
                  disabled={!name.trim()}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  📥 Download Certificate
                </button>
              </div>
            )}
            {!passed && (
              <p className="text-gray-600 mt-4 text-lg">
                Keep going! Retake the quiz to earn your certificate. 🧩
              </p>
            )}
            <button
              onClick={resetQuiz}
              className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
            >
              🔁 Restart Quiz
            </button>
          </div>
        )}
      </div>
      <FooterSenior />
    </>
  );
};

export default SafetyQuiz;
