const PRAYER_FIELDS = [
  { key: "fajr", label: "Fajr" },
  { key: "dhuhr", label: "Dhuhr" },
  { key: "asr", label: "Asr" },
  { key: "magrib", label: "Maghrib" },
  { key: "isha", label: "Isha" },
];

const PRAYER_TIME_ZONE = "Europe/London";

function getTodayKey(date = new Date()) {
  const dateParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: PRAYER_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(
    dateParts.map(({ type, value }) => [type, value])
  );

  const year = values.year;
  const month = values.month;
  const day = values.day;
  return `${year}-${month}-${day}`;
}

async function fetchTodaysPrayerTimes() {
  const todayKey = getTodayKey();
  const key = process.env.NEXT_PUBLIC_PRAYER_KEY?.trim();

  if (!key) {
    return null;
  }

  const url = `https://www.londonprayertimes.com/api/times/?format=json&date=${todayKey}&24hours=true&key=${encodeURIComponent(key)}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data.times?.[todayKey] ?? data.times ?? (data.fajr ? data : null);
  } catch {
    return null;
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
