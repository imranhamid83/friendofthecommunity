import { eventsContainer } from "@/lib/cosmos";
import Link from "next/link";

export default async function Page({ params }) {
  const { id } = await params; // eventId
  let event = null;
  try {
    const { resources } = await eventsContainer.items
    .query({
      query: "SELECT * FROM c WHERE c.eventId = @id",
      parameters: [{ name: "@id", value: parseInt(id) }]
    })
    .fetchAll();
    event = resources[0];
  } catch (err) {
    console.error("Failed to fetch event:", err);
  }

  if (!event) return <p className="text-center mt-10">Event not found.</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">     
    <Link href="/events" className="text-blue-600 hover:underline inline-block mb-4">← Back to Events</Link> 
    <h2>Event Details</h2>
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-500 mb-1">{event.date} @ {event.time}</p>
      <p className="text-gray-500 mb-4">{event.location}</p>
      <p className="mb-6">{event.description}</p>
      {event.date.trim() !== "" && (
        <>
          <Link href={`/events/${event.eventId}/speakers`} className="text-blue-600 hover:underline">View Speakers →</Link>
          <br/><br/>
        </>
      )}
           
      <h3 className="text-xl font-bold mb-2">How to attend</h3>
      {(event.linktoattend.trim() == "") ? (
        <p>Contact us to find out</p>
      ) : (
        <Link href={event.linktoattend} className="text-blue-600 hover:underline" target="_blank">
          Book your place now → 
        </Link>
      )}     
    </div>
  );
}
