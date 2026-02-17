import { eventsContainer } from "@/lib/cosmos";
import { toSlug } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// Parse DD-MM-YYYY date format to Date object
function parseEventDate(dateStr) {
  if (!dateStr || dateStr.trim() === "") return new Date(0);
  const [day, month, year] = dateStr.split("-");
  return new Date(year, month - 1, day);
}

export default async function Page() {
  let events = [];  
  try {
    const { resources } = await eventsContainer.items
      .query("SELECT * FROM c")
      .fetchAll();
    // Sort by date descending (latest/furthest future date first)
    events = resources.sort((a, b) => 
      parseEventDate(b.date) - parseEventDate(a.date)
    );
  } catch (err) {
    console.error("Failed to fetch events:", err);
  }

  if (!events.length) return <p className="text-center mt-10">No events found.</p>;
  return (
    <div className="max-w-6xl mx-auto py-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">      
      {events.map((event) => (
        <Card key={event.id} className="hover:shadow-lg transition h-full flex flex-col">
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <p className="text-sm text-gray-500">{event.date} @ {event.time}</p>
            <p className="text-sm text-gray-500">{event.location}</p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <p>{event.summary}</p>
            <Link
              href={`/events/${toSlug(event.title)}`}
              className="text-blue-600 hover:underline mt-auto pt-3 block"
            >
              View Details →
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
