export type EventItem = {
  title: string;
  slug: string;
  image: string;
  location?: string;
  date?: string;
  time: string;
  url?: string;
  description?: string;
};

export const events: EventItem[] = [
  {
    title: "React Summit 2026",
    slug: "react-summit-2026",
    image: "/images/event1.png",
    location: "Amsterdam, NL",
    date: "May 16–17, 2026",
    time: "09:00",
    url: "https://reactsummit.com",
  },
  {
    title: "Google I/O 2026",
    slug: "google-io-2026",
    image: "/images/event2.png",
    location: "Mountain View, CA, USA",
    date: "May 14–16, 2026",
    time: "09:30",
    url: "https://events.google.com/io",
  },
  {
    title: "GitHub Universe 2026",
    slug: "github-universe-2026",
    image: "/images/event3.png",
    location: "San Francisco, CA, USA",
    date: "June 10–11, 2026",
    time: "10:00",
    url: "https://githubuniverse.com",
  },
  {
    title: "JSConf EU 2026",
    slug: "jsconf-eu-2026",
    image: "/images/event4.png",
    location: "Berlin, Germany",
    date: "September 2–4, 2026",
    time: "09:00",
    url: "https://jsconf.eu",
  },
  {
    title: "HackMIT 2026",
    slug: "hackmit-2026",
    image: "/images/event5.png",
    location: "Cambridge, MA, USA",
    date: "October 10–12, 2026",
    time: "08:00",
    url: "https://hackmit.org",
  },
  {
    title: "Microsoft Build 2026",
    slug: "microsoft-build-2026",
    image: "/images/event6.png",
    location: "Seattle, WA, USA",
    date: "May 20–22, 2026",
    time: "09:30",
    url: "https://mybuild.microsoft.com",
  },
];