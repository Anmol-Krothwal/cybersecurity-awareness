import React, { useState } from "react";
import NavbarSenior from "../Components/NavbarSenior";
import FooterSenior from "../Components/FooterSenior";

const LiveWebinars = () => {
  const sessionList = [
    {
    id: 1,
    title: "Staying Safe from Phone Scams",
    date: "Tuesday, August 20, 2024",
    time: "2:00 PM",
    description:
      "Have you received a call claiming to be from Microsoft or your bank? This session shows how phone scammers operate and what you should do if you’re unsure. Learn to stay calm and take the right steps.",
    points: [
      "How phone scammers trick people",
      "Signs of a fake support call",
      "What to do if you’ve answered one",
    ],
    },
    {
    id: 2,
    title: "Protecting Yourself on Facebook",
    date: "Friday, September 6, 2024",
    time: "11:00 AM",
    description:
      "Fake friend requests and messages can be dangerous. This session teaches you how to use Facebook safely without falling into traps. Gain confidence to connect online without worry.",
    points: [
      "Spotting fake friend requests",
      "Avoiding scam messages",
      "Keeping your profile private",
    ],
    },
    {
    id: 3,
    title: "Recognising Fake Emails and Texts",
    date: "Monday, September 23, 2024",
    time: "3:00 PM",
    description:
      "Ever clicked on an email that said 'urgent'? Learn how to identify suspicious emails and texts pretending to be from banks, delivery companies, or the NHS — and what to do next.",
    points: [
      "Common email and text scam formats",
      "Red flags in email content and links",
      "Safe practices after opening a suspicious message",
    ],
  },
  {
    id: 4,
    title: "Shopping Safely Online",
    date: "Wednesday, October 9, 2024",
    time: "12:00 PM",
    description:
      "Shopping online is easy — but are you sure the site is real? Discover how to avoid fake websites, find safe payment methods, and spot too-good-to-be-true deals.",
    points: [
      "Identifying safe shopping websites",
      "Avoiding scams on Facebook Marketplace",
      "Best ways to pay and protect your money",
    ],
  },
  {
    id: 5,
    title: "Strong Passwords Made Simple",
    date: "Thursday, October 24, 2024",
    time: "1:30 PM",
    description:
      "Don't worry — you don't need to remember dozens of passwords. This session helps you create strong, memorable ones and explains how password managers can help you stay safe.",
    points: [
      "What makes a strong password",
      "Easy tips for remembering them",
      "How password managers work",
    ],
  },
  {
    id: 6,
    title: "Staying Safe from Investment Scams",
    date: "Tuesday, November 12, 2024",
    time: "10:30 AM",
    description:
      "Were you promised high returns with no risk? Learn how fraudsters target older adults with fake investment opportunities and how to check if something is genuine.",
    points: [
      "Common phrases scammers use",
      "Warning signs of fake investments",
      "Where to report if unsure or scammed",
    ],
  },
  {
    id: 7,
    title: "Using WhatsApp and Messages Securely",
    date: "Friday, November 29, 2024",
    time: "4:00 PM",
    description:
      "Scammers now target you through WhatsApp too. We’ll explain how to stay safe from impersonators pretending to be family, and how to block or report suspicious messages.",
    points: [
      "Understanding impersonation scams",
      "How to block and report safely",
      "When to trust a message or link",
    ],
    },
  ];

  const [selected, setSelected] = useState(sessionList[0]);

  const formatICSDate = (dateStr, timeStr) => {
    const start = new Date(`${dateStr} ${timeStr}`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const format = (d) =>
      d.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, -1);
    return {
      start: format(start),
      end: format(end),
    };
  };

  const downloadICSFile = (session) => {
    const { start, end } = formatICSDate(session.date, session.time);
    const icsContent = `BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    SUMMARY:${session.title}
    DESCRIPTION:${session.description}
    DTSTART:${start}
    DTEND:${end}
    LOCATION:Zoom
    END:VEVENT
    END:VCALENDAR`;
    const blob = new Blob([icsContent], { type: "text/calendar" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${session.title.replace(/\s+/g, "_")}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getGoogleCalendarLink = (title, dateStr, timeStr) => {
    const dateObj = new Date(`${dateStr} ${timeStr}`);
    const start = new Date(dateObj);
    const end = new Date(dateObj.getTime() + 60 * 60 * 1000);
    const formatDate = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, -1);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${formatDate(start)}/${formatDate(end)}&details=${encodeURIComponent(
      "Join this online safety session via Zoom"
    )}`;
  };

  const getWhatsAppLink = (session) => {
    const message = `Hi, please remind me about the upcoming online safety session: "${session.title}" on ${session.date} at ${session.time}. Thank you!`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  return (
     <>
    <NavbarSenior />
    <div className="min-h-screen bg-gray-200 p-6 md:p-10">
      <h1 className="text-4xl text-blue-900 font-bold mb-6">Free Online Safety Sessions</h1>
      <p className="text-lg text-gray-700 mb-10 max-w-3xl">
        Join our friendly Zoom sessions to learn how to stay safe online. No tech skills needed — we guide you step-by-step and answer your questions live.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Session List */}
        <div className="col-span-1">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">🗓️ Pick a Topic</h2>
          <ul className="space-y-3">
            {sessionList.map((session) => (
              <li
                key={session.id}
                className={`cursor-pointer p-3 rounded-lg border text-base hover:bg-blue-50 ${
                  selected.id === session.id
                    ? "bg-blue-100 border-blue-700 text-blue-900 font-semibold"
                    : "bg-white border-gray-300"
                }`}
                onClick={() => setSelected(session)}
              >
                {session.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Session Detail */}
        <div className="col-span-2 bg-white rounded-lg p-6 shadow">
          <h2 className="text-2xl text-blue-900 font-bold mb-2">{selected.title}</h2>
          <p className="text-gray-600 text-lg mb-1">
            📅 {selected.date} at 🕒 {selected.time}
          </p>
          <p className="text-gray-800 mb-4">{selected.description}</p>

          <h3 className="text-lg font-semibold text-blue-800 mb-2">🔍 What You’ll Learn:</h3>
          <ul className="list-disc ml-5 text-gray-700 mb-6">
            {selected.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          {/* Add to Calendar & WhatsApp */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <a
              href={getGoogleCalendarLink(selected.title, selected.date, selected.time)}
              target="_blank"
              rel="noreferrer"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-lg"
            >
              📅 Google Calendar
            </a>
            <button
              onClick={() => downloadICSFile(selected)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-lg"
            >
              📥 Download iCal (.ics)
            </button>
            <a
              href={getWhatsAppLink(selected)}
              target="_blank"
              rel="noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-lg"
            >
              📲 WhatsApp Reminder
            </a>
          </div>

          {/* Signup Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value;
              const phone = e.target.phone.value;
              alert(
                `✅ You're signed up for "${selected.title}"!\n📩 Email: ${email}${
                  phone ? `\n📱 SMS: ${phone}` : ""
                }`
              );
              e.target.reset();
            }}
          >
            <h3 className="text-lg font-semibold mb-2">✉️ Get Email & SMS Reminder:</h3>
            <div className="flex flex-col gap-3 mb-3">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="p-2 border rounded text-lg"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Optional: Your phone for SMS"
                className="p-2 border rounded text-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded text-lg"
            >
              ✅ Sign Me Up
            </button>
          </form>
        </div>
      </div>
    </div>
    <FooterSenior />
  </>
  );
};

export default LiveWebinars;
