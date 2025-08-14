import React, { useState, useEffect } from 'react';
import NavbarSenior from "../Components/NavbarSenior";
import FooterSenior from "../Components/FooterSenior";

const scamTypes = ["All", "Fake Antivirus", "Phishing", "Lottery Scam", "Tech Support Scam", "Online Marketplace Scam",];
const STORIES_PER_BATCH = 6;

const PersonalStoryCorner = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState("All");
  const [comments, setComments] = useState({});
  const [reactions, setReactions] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [visibleCount, setVisibleCount] = useState(STORIES_PER_BATCH);

const [storyData, setStoryData] = useState([
  // 🔒 Fake Antivirus
  {
    id: 1,
    title: 'Tricked by Fake Antivirus',
    snippet: 'A woman shares how she got scammed by fake antivirus software...',
    full: `I received a call from someone claiming to be from Microsoft. They told me my computer was infected and convinced me to install remote software. After they ran some fake scans, they demanded £200 to fix it. I was frightened, but luckily my grandson helped me report it to Action Fraud.`,
    name: 'Susan M.',
    date: 'Posted on 5 March 2024',
    type: 'Fake Antivirus',
    avatar: null,
  },
  {
    id: 2,
    title: 'Pop-Up Warning Scam',
    snippet: 'Tom clicked a pop-up warning and downloaded malware...',
    full: `While browsing the news, a pop-up said my computer had 47 viruses and to call a number. I panicked and called. They remotely took control and charged £150. Later, my bank called about suspicious activity. It was all fake.`,
    name: 'Tom W.',
    date: 'Posted on 19 April 2024',
    type: 'Fake Antivirus',
    avatar: null,
  },
  {
    id: 3,
    title: 'Antivirus Renewal Scam',
    snippet: 'Shirley got a call about her antivirus expiring...',
    full: `They claimed my antivirus subscription expired and I’d be charged £299 unless I canceled. I gave access to my laptop so they could "cancel it". They transferred money out instead.`,
    name: 'Shirley D.',
    date: 'Posted on 8 March 2024',
    type: 'Fake Antivirus',
    avatar: null,
  },
  {
    id: 4,
    title: 'Security Alert Email',
    snippet: 'A fake antivirus email made Ian panic...',
    full: `I received an email that looked like from Norton, stating my subscription was renewed. It had a number to call for a refund. The caller asked to access my bank account to issue the refund but tried to transfer money instead.`,
    name: 'Ian G.',
    date: 'Posted on 12 March 2024',
    type: 'Fake Antivirus',
    avatar: null,
  },
  {
    id: 5,
    title: 'Mobile App Antivirus Trick',
    snippet: 'Beverley downloaded a fake antivirus app...',
    full: `I installed a free antivirus from the Play Store. It showed constant warnings and asked for payment to remove "threats". I later found it was not even scanning anything.`,
    name: 'Beverley T.',
    date: 'Posted on 2 April 2024',
    type: 'Fake Antivirus',
    avatar: null,
  },

  // ✉️ Phishing
  {
    id: 6,
    title: 'The Banking Text Scam',
    snippet: 'John talks about receiving a fake banking message...',
    full: `I received a text message that looked like it came from my bank. It said my account was compromised and asked me to click a link. Within hours, I noticed unknown transactions.`,
    name: 'John R.',
    date: 'Posted on 18 February 2024',
    type: 'Phishing',
    avatar: null,
  },
  {
    id: 7,
    title: 'Fake HMRC Tax Refund',
    snippet: 'Linda received a phishing email from "HMRC"...',
    full: `It said I was eligible for a tax refund and needed to fill out my bank details. It looked real. I later found out it was a scam after my bank froze my card.`,
    name: 'Linda F.',
    date: 'Posted on 21 February 2024',
    type: 'Phishing',
    avatar: null,
  },
  {
    id: 8,
    title: 'Netflix Login Alert',
    snippet: 'Charles clicked a fake Netflix email...',
    full: `The email said someone accessed my Netflix account from India and asked me to log in. The link redirected to a fake site that stole my password and reused it on my PayPal.`,
    name: 'Charles K.',
    date: 'Posted on 10 February 2024',
    type: 'Phishing',
    avatar: null,
  },
  {
    id: 9,
    title: 'Phishing via WhatsApp',
    snippet: 'Janet received a WhatsApp scam pretending to be her son...',
    full: `I received a message from “my son” saying he changed his number and needed money urgently. It sounded like him. I nearly sent £500 before double-checking with my daughter.`,
    name: 'Janet E.',
    date: 'Posted on 1 March 2024',
    type: 'Phishing',
    avatar: null,
  },
  {
    id: 10,
    title: 'Royal Mail Delivery Phish',
    snippet: 'A Royal Mail scam caught Peter off guard...',
    full: `I received a message saying a parcel couldn’t be delivered and I needed to pay £1.45. The site looked official. A week later, £500 was taken from my account.`,
    name: 'Peter S.',
    date: 'Posted on 26 March 2024',
    type: 'Phishing',
    avatar: null,
  },

  // 🎁 Lottery Scam
  {
    id: 11,
    title: 'Lottery Win That Wasn’t Real',
    snippet: 'Margaret explains how she lost £500 thinking she won the lottery...',
    full: `An email said I had won the lottery and asked for a small payment to release the prize. It looked convincing, even had an official stamp.`,
    name: 'Margaret H.',
    date: 'Posted on 28 January 2024',
    type: 'Lottery Scam',
    avatar: null,
  },
  {
    id: 12,
    title: 'Facebook Contest Fraud',
    snippet: 'Gordon fell for a fake Facebook giveaway...',
    full: `I was told I won £10,000 in a Facebook contest. They wanted £100 “processing fee” to release it. I paid, then they asked for more. That’s when I realised it was fake.`,
    name: 'Gordon N.',
    date: 'Posted on 5 February 2024',
    type: 'Lottery Scam',
    avatar: null,
  },
  {
    id: 13,
    title: 'National Lottery Impersonator',
    snippet: 'Julie got a letter that looked real...',
    full: `The letter said I won £25,000 in a UK Lottery. There was even a number to call. They requested bank verification to release the funds. I nearly fell for it until my son checked the source.`,
    name: 'Julie B.',
    date: 'Posted on 8 February 2024',
    type: 'Lottery Scam',
    avatar: null,
  },
  {
    id: 14,
    title: 'International Grant Fraud',
    snippet: 'A fake government grant offer cost Roger £200...',
    full: `I got an email from “UN Welfare Fund” saying I was selected for a grant. They asked for upfront transfer charges. I lost money and never heard again.`,
    name: 'Roger L.',
    date: 'Posted on 12 February 2024',
    type: 'Lottery Scam',
    avatar: null,
  },

  // 🖥️ Tech Support Scam
  {
    id: 15,
    title: 'Fake Microsoft Technician',
    snippet: 'Barbara was called by a fake support agent...',
    full: `He said he was from Microsoft and my computer was infected. He asked me to install TeamViewer, showed me red warning logs, and asked for £300 to fix it.`,
    name: 'Barbara D.',
    date: 'Posted on 3 March 2024',
    type: 'Tech Support Scam',
    avatar: null,
  },
  {
    id: 16,
    title: 'Amazon Refund Call',
    snippet: 'David got a call saying he was charged for Amazon Prime...',
    full: `They said my Amazon account was wrongly charged and offered a refund. I followed their instructions on the phone and they accessed my account and tried to transfer money.`,
    name: 'David P.',
    date: 'Posted on 6 March 2024',
    type: 'Tech Support Scam',
    avatar: null,
  },
  {
    id: 17,
    title: 'Remote Support Payment Trap',
    snippet: 'Sylvia trusted someone claiming to fix her PC...',
    full: `I had slow internet, and someone called offering help. He ran fake scans and asked for £150 card payment. I didn’t realise it was fake until my bank flagged it.`,
    name: 'Sylvia N.',
    date: 'Posted on 9 March 2024',
    type: 'Tech Support Scam',
    avatar: null,
  },
  {
    id: 18,
    title: 'Voicemail Scam',
    snippet: 'A threatening voicemail frightened Derek...',
    full: `The voice message said I’d be sued for fraud unless I called back. When I did, they said my identity was used and needed access to “clear” it. My daughter intervened in time.`,
    name: 'Derek H.',
    date: 'Posted on 14 March 2024',
    type: 'Tech Support Scam',
    avatar: null,
  },

  // 🛍️ Online Marketplace Scam
  {
    id: 19,
    title: 'eBay Seller Took My Money',
    snippet: 'Pat paid but never received the product...',
    full: `I found a good deal on eBay for a sewing machine. Paid via bank transfer. The seller disappeared. eBay said the payment wasn't protected.`,
    name: 'Pat L.',
    date: 'Posted on 15 March 2024',
    type: 'Online Marketplace Scam',
    avatar: null,
  },
  {
    id: 20,
    title: 'Facebook Marketplace Fake Seller',
    snippet: 'Tony got scammed on Facebook Marketplace...',
    full: `I paid £60 for a lawn mower, but the seller blocked me after the transfer. The profile looked trustworthy, but it was all staged.`,
    name: 'Tony J.',
    date: 'Posted on 17 March 2024',
    type: 'Online Marketplace Scam',
    avatar: null,
  },
  {
    id: 21,
    title: 'Fake Rental Listing',
    snippet: 'Helen nearly lost money over a rental deposit scam...',
    full: `The listing seemed perfect, but the “landlord” said he was abroad and needed a deposit upfront to hold the flat. Luckily, my friend warned me before I sent anything.`,
    name: 'Helen V.',
    date: 'Posted on 20 March 2024',
    type: 'Online Marketplace Scam',
    avatar: null,
  },
  {
    id: 22,
    title: 'Scam Electronics Store',
    snippet: 'Walter tried to buy a discounted phone...',
    full: `I found a brand-new iPhone on a site that looked like Currys. It even had reviews. I paid by debit card, but nothing arrived. The website was fake.`,
    name: 'Walter E.',
    date: 'Posted on 21 March 2024',
    type: 'Online Marketplace Scam',
    avatar: null,
  },
]);


  const speakText = (text) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.9;
    synth.speak(utter);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const file = form.avatar.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const newStory = {
        id: storyData.length + 1,
        title: form.title.value,
        snippet: form.full.value.slice(0, 70) + "...",
        full: form.full.value,
        name: form.name.value,
        date: `Posted on ${new Date().toLocaleDateString('en-GB')}`,
        type: form.type.value,
        avatar: reader.result,
      };
      setStoryData([newStory, ...storyData]);
      setShowForm(false);
      form.reset();
      setAvatarPreview(null);
    };

    if (file) reader.readAsDataURL(file);
    else reader.onloadend();
  };

  const filteredStories =
    selectedType === "All"
      ? storyData
      : storyData.filter((s) => s.type === selectedType);

  const visibleStories = filteredStories.slice(0, visibleCount);

  useEffect(() => setVisibleCount(STORIES_PER_BATCH), [selectedType]);

  return (
    <>
    <NavbarSenior />
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
        <h1 className="text-4xl font-bold text-blue-900">🎙️ Personal Story Corner</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-lg"
        >
          ➕ Share Your Story
        </button>
      </div>

      <p className="text-xl text-gray-700 mb-6 max-w-3xl">
        Real experiences shared by older adults — learn and stay safer online.
      </p>

      <label className="block text-lg font-medium mb-2 text-blue-800">Filter by Scam Type:</label>
      <select
        className="mb-6 px-4 py-2 rounded border text-lg"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        {scamTypes.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleStories.map((story) => (
          <div
            key={story.id}
            className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:bg-blue-50 transition-all"
            onClick={() => setSelectedStory(story)}
          >
            <div className="flex items-center mb-3">
              {story.avatar ? (
                <img src={story.avatar} alt="avatar" className="h-12 w-12 rounded-full mr-3 object-cover" />
              ) : (
                <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold text-blue-900 mr-3">
                  {story.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="text-blue-800 font-medium">{story.name}</div>
                <div className="text-gray-500 text-sm">{story.date}</div>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">{story.title}</h2>
            <p className="text-gray-600 text-base">{story.snippet}</p>
            <span className="inline-block mt-2 px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded">
              {story.type}
            </span>
          </div>
        ))}
      </div>

      {visibleCount < filteredStories.length && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setVisibleCount((c) => c + STORIES_PER_BATCH)}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded text-lg"
          >
            🔽 Load more stories
          </button>
        </div>
      )}

      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white max-w-xl w-full p-6 rounded-xl shadow-lg relative m-4 overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black"
              onClick={() => {
                window.speechSynthesis.cancel();
                setSelectedStory(null);
              }}
              aria-label="Close"
            >
              ✖️
            </button>

            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-blue-900">{selectedStory.title}</h2>
                <p className="text-gray-600 text-sm">
                  {selectedStory.name} • {selectedStory.date} • {selectedStory.type}
                </p>
              </div>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm"
                onClick={() => speakText(selectedStory.full)}
              >
                🔊 Read Aloud
              </button>
            </div>

            <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line mb-6">
              {selectedStory.full}
            </p>

            <div className="mt-4">
              <p className="font-semibold mb-1">React:</p>
              {["👍", "😢", "😮"].map((emoji) => (
                <button
                  key={emoji}
                  className="text-2xl mr-2"
                  onClick={() => {
                    const id = selectedStory.id;
                    setReactions((prev) => ({
                      ...prev,
                      [id]: { ...prev[id], [emoji]: (prev[id]?.[emoji] || 0) + 1 },
                    }));
                  }}
                >
                  {emoji}
                </button>
              ))}
              <div className="mt-2 text-gray-700">
                {reactions[selectedStory.id] &&
                  Object.entries(reactions[selectedStory.id]).map(([emoji, count]) => (
                    <span key={emoji} className="mr-3">{emoji} {count}</span>
                  ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Leave a Comment:</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const comment = e.target.comment.value;
                  const id = selectedStory.id;
                  setComments((prev) => ({
                    ...prev,
                    [id]: [...(prev[id] || []), comment],
                  }));
                  e.target.reset();
                }}
              >
                <input
                  name="comment"
                  placeholder="Your comment..."
                  className="w-full p-2 border rounded"
                  required
                />
                <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded">Post</button>
              </form>
              <div className="mt-4 space-y-2">
                {(comments[selectedStory.id] || []).map((c, idx) => (
                  <p key={idx} className="text-gray-700">💬 {c}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <form
            onSubmit={handleFormSubmit}
            className="bg-white max-w-lg w-full p-6 rounded-xl shadow-lg relative m-4"
          >
            <button
              className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black"
              onClick={() => {
                setShowForm(false);
                setAvatarPreview(null);
              }}
              type="button"
            >
              ✖️
            </button>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Share Your Story</h2>

            <input name="name" placeholder="Your Name" className="w-full mb-3 p-2 border rounded text-lg" required />
            <select name="type" className="w-full mb-3 p-2 border rounded text-lg" required>
              <option value="">Select Scam Type</option>
              {scamTypes.filter((t) => t !== "All").map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <input name="title" placeholder="Story Title" className="w-full mb-3 p-2 border rounded text-lg" required />
            <textarea name="full" placeholder="Your full story..." rows={5} className="w-full mb-3 p-2 border rounded text-lg" required />

            <label className="block mb-2 font-medium">Upload Avatar (optional):</label>
            <input
              name="avatar"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setAvatarPreview(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
              className="mb-4"
            />
            {avatarPreview && (
              <img src={avatarPreview} alt="avatar preview" className="h-16 w-16 rounded-full object-cover mb-4" />
            )}
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-lg">
              ✅ Submit
            </button>
          </form>
        </div>
      )}
    </div>
     <FooterSenior />
  </>
  );
};

export default PersonalStoryCorner;
