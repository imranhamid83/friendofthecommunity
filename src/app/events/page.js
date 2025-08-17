import { eventsContainer } from "@/lib/cosmos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function Page() {
  let events = [];  
  try {
    const { resources } = await eventsContainer.items
      .query("SELECT * FROM c ORDER BY c.date DESC")
      .fetchAll();
    events = resources;
  } catch (err) {
    console.error("Failed to fetch events:", err);
  }

  if (!events.length) return <p className="text-center mt-10">No events found.</p>;
  return (
    <div className="max-w-6xl mx-auto py-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">      
      {events.map((event) => (
        <Card key={event.id} className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <p className="text-sm text-gray-500">{event.date} @ {event.time}</p>
            <p className="text-sm text-gray-500">{event.location}</p>
          </CardHeader>
          <CardContent>
            <p>{event.description}</p>
            <Link
              href={`/events/${event.eventId}`}
              className="text-blue-600 hover:underline mt-3 block"
            >
              View Details →
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
