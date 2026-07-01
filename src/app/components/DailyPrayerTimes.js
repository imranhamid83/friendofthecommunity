const PRAYER_FIELDS = [
  { key: "fajr", label: "Fajr" },
  { key: "dhuhr", label: "Dhuhr" },
  { key: "asr", label: "Asr" },
  { key: "magrib", label: "Maghrib" },
  { key: "isha", label: "Isha" },
];

const LATEST_PRAYER_TIMES = {
  date: "2026-07-01",
  fajr: "02:49",
  dhuhr: "13:10",
  asr: "17:27",
  magrib: "21:24",
  isha: "22:36",
};

function getTodayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getFallbackPrayerTimes(todayKey) {
  return LATEST_PRAYER_TIMES.date === todayKey ? LATEST_PRAYER_TIMES : null;
}

async function fetchTodaysPrayerTimes() {
  const todayKey = getTodayKey();
  const key = process.env.NEXT_PUBLIC_PRAYER_KEY?.trim();
  const fallbackTimes = getFallbackPrayerTimes(todayKey);

  if (!key) {
    return fallbackTimes;
  }

  const url = `https://www.londonprayertimes.com/api/times/?format=json&date=${todayKey}&24hours=true&key=${encodeURIComponent(key)}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return fallbackTimes;
    }
    const data = await res.json();
    return data.times?.[todayKey] ?? data.times ?? (data.fajr ? data : fallbackTimes);
  } catch {
    return fallbackTimes;
  }
}

export default async function DailyPrayerTimes() {
  const times = await fetchTodaysPrayerTimes();

  if (!times) {
    return null;
  }

  return (
    <section className="bg-gray-100 border-b border-gray-200" aria-label="Daily prayer times">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm text-gray-800">
          <span className="font-semibold text-gray-900">Daily Prayer Times</span>
          {PRAYER_FIELDS.map(({ key, label }) => (
            <span key={key} className="whitespace-nowrap">
              <span className="font-medium">{label}:</span>{" "}
              <span className="tabular-nums">{times[key]}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
