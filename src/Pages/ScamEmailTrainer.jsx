import React, { useState, useEffect } from 'react';
import NavbarSenior from "../Components/NavbarSenior";
import FooterSenior from "../Components/FooterSenior";

const scamTips = [
  {
    id: 1,
    sender: "HMRC <refund@hmrc-support.co.uk>",
    subject: "Tax Refund Notification",
    body: "We are writing to inform you that our system has identified an overpayment on your tax account for the last financial year. As a result, you are eligible to receive a refund of £542.63. This refund will be processed directly to your bank account upon completion of a verification form. You must complete the form today to ensure there is no delay in processing. Please note that failure to act immediately may result in your refund being forfeited. Our goal is to ensure that you receive your payment as quickly as possible. Kindly provide your full personal details and bank information in the form linked below. This process takes less than 5 minutes and guarantees your payment within 24 hours. Time is critical – do not delay.",
    linkText: "Click here to claim your refund",
    linkUrl: "http://hmrc-refund.fake.co.uk",
    explanation: "This email is a classic phishing attempt impersonating the UK’s HMRC. Genuine HMRC communications always come from official .gov.uk email addresses, never from domains like hmrc-support.co.uk. The scammers deliberately use a high refund amount to tempt victims, along with a sense of urgency ('complete today') to pressure quick action without verification. The request for sensitive personal and banking details through an online form is a major red flag, as HMRC would never request such details via an email link. In legitimate cases, HMRC would direct users to log in to their official government tax portal securely. Clicking the link may lead to a spoofed website designed to harvest financial details or install malware. Always verify tax communications by contacting HMRC directly through official channels."
  },
  {
    id: 2,
    sender: "Netflix <billing@netflx-update.com>",
    subject: "Update Your Payment Details",
    body: "Dear Customer, we were unable to process your most recent payment for your Netflix subscription due to an issue with your billing information. As a result, your account is now at risk of suspension. To avoid disruption of your streaming service, please update your payment details immediately. Failure to update your details within the next 24 hours will result in your account being locked. We highly recommend that you act quickly to avoid losing access to your favourite shows and movies. Our billing department has provided a secure form below for you to confirm your card details. The process is quick and will ensure your service continues without interruption. Thank you for your prompt attention.",
    linkText: "Update Now",
    linkUrl: "http://netflx-update-payment.com",
    explanation: "This scam email uses a fake Netflix domain ('netflx' instead of 'netflix') — a subtle misspelling that can easily be missed. The message creates urgency by threatening account suspension within 24 hours, pushing recipients to act without caution. Netflix never demands immediate billing updates via email, nor do they send threatening suspension notices. Real Netflix communications direct users to log in through their official app or website. The link in this scam likely leads to a fraudulent payment page designed to capture your credit card information. The tone and structure of this email are deliberately manipulative, using fear of losing access to personal entertainment as a hook. Always verify account issues by going directly to the official Netflix site."
  },
  {
    id: 3,
    sender: "Amazon <secure@amaz0n-login.com>",
    subject: "Account Locked",
    body: "Hello, we have detected unusual activity on your Amazon account. As a security measure, your access has been temporarily restricted until your identity is verified. We detected multiple failed login attempts from a foreign IP address, and to protect your account from fraud, we require you to confirm your details immediately. Please verify your full name, billing address, and payment information using the link below. Once your identity has been confirmed, your account will be restored within 12 hours. Failure to complete verification may result in permanent account suspension. Thank you for your cooperation in securing your Amazon account.",
    linkText: "Verify Account",
    linkUrl: "http://amaz0n-login.com/verify",
    explanation: "This scam uses 'amaz0n' with a zero instead of an 'o', mimicking the real Amazon domain. The email creates urgency by warning of account suspension and claiming multiple failed logins from abroad. Amazon never asks for sensitive personal or payment information via email links. Instead, they advise users to log in directly through their official site or app. The tone is intentionally alarming to provoke a rapid response without due diligence. Clicking the fraudulent link will likely take you to a phishing page designed to steal login credentials and financial details. Always check the sender’s email domain carefully, and report suspicious messages to Amazon via their official security page."
  },
  {
    id: 4,
    sender: "Royal Mail <delivery@royalmail-alert.com>",
    subject: "Delivery Attempt Failed",
    body: "We attempted to deliver your package today but were unable to reach you. A redelivery has been scheduled, but an outstanding fee of £2.99 must be paid to confirm. If this fee is not paid within the next 48 hours, your parcel will be returned to the sender. To avoid inconvenience, please settle the payment now through our secure link below. Once your payment is confirmed, we will schedule your delivery at the next available date. We apologise for any inconvenience caused and thank you for your prompt attention.",
    linkText: "Reschedule Delivery",
    linkUrl: "http://royalmail-alert.com/redelivery",
    explanation: "Royal Mail does not charge small redelivery fees via email. This scam exploits the common expectation of parcel deliveries and uses a small, believable payment amount to avoid raising suspicion. The goal is to collect credit card details, which can then be used for larger fraudulent transactions. The sender domain is fake and not associated with the official Royal Mail website. Real redelivery notices are posted through the letterbox or sent from an official royalmail.com email address. This scam is widespread during busy shopping seasons when parcel deliveries are frequent."
  }
];


const ScamEmailTrainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTip, setShowTip] = useState(false);

  const currentEmail = scamTips[currentIndex];

  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel(); // Stop current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.9;
    synth.speak(utterance);
  };

  const readTipAloud = () => {
    const message = `From: ${currentEmail.sender}. Subject: ${currentEmail.subject}. Tip: ${currentEmail.explanation}`;
    speak(message);
  };

  useEffect(() => {
    readTipAloud();
  }, [currentIndex]);

  const nextTip = () => {
    setShowTip(false);
    setCurrentIndex((prev) => (prev + 1) % scamTips.length);
  };

return (
  <>
    <NavbarSenior />

    <div
      role="main"
      className="
        bg-[#fefcf8]
        px-0
        pt-20   /* space below navbar */
        pb-20    /* small space above footer */
      "
    >
      <div
        aria-labelledby="trainer-title"
        className="
          w-full max-w-3xl
          bg-white border border-gray-200 shadow-xl
          rounded-xl
          p-6
          mx-auto
        "
      >
        <h1 id="trainer-title" className="text-3xl font-bold text-indigo-800 mb-4">
          📧 Scam Email Trainer
        </h1>

        <p className="text-xl text-gray-700 mb-2 font-semibold">
          From: <span className="text-red-700">{currentEmail.sender}</span>
        </p>
        <p className="text-xl text-gray-700 mb-2 font-semibold">
          Subject: <span className="text-black">{currentEmail.subject}</span>
        </p>
        <p className="text-lg text-gray-800 mb-4">{currentEmail.body}</p>

        <a
          href="#"
          className="text-blue-600 underline text-xl"
          onMouseEnter={() => setShowTip(true)}
          onFocus={() => setShowTip(true)}
          onBlur={() => setShowTip(false)}
          aria-label={`Suspicious link: ${currentEmail.linkText}`}
          tabIndex="0"
        >
          🔗 {currentEmail.linkText}
        </a>

        {showTip && (
          <div
            role="tooltip"
            className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg shadow text-lg"
          >
            ⚠️ {currentEmail.explanation}
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onClick={nextTip}
            aria-label="Next tip"
          >
            ➡️ Next Tip
          </button>

          <button
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            onClick={readTipAloud}
            aria-label="Replay audio explanation"
          >
            🔊 Replay Tip
          </button>
        </div>
      </div>
    </div>

    <FooterSenior />
  </>
);


};

export default ScamEmailTrainer;
