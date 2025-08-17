import { speakersContainer } from "@/lib/cosmos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page({ params }) {    
  const eventId = parseInt(params.id, 10);
  let speakers = [];
   
  try {
    const { resources } = await speakersContainer.items
      .query({
        query: "SELECT * FROM c WHERE c.eventId = @eventId ORDER BY c.name ASC",
        parameters: [{ name: "@eventId", value: eventId }]
      })
      .fetchAll();

    speakers = resources || [];
  } catch (err) {
    console.error("Error fetching speakers:", err);
  }

  if (!speakers.length) {
    return (
      <div className="max-w-4xl mx-auto py-10 text-center">
        <h2 className="text-xl font-semibold">No speakers found for this event</h2>
      </div>
    );
  }

  return (    
    <div className="max-w-6xl mx-auto py-10 grid gap-6 grid-cols-1 md:grid-cols-3">
      {speakers.map((speaker) => (
        <Card key={speaker.id} className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>{speaker.name}</CardTitle>
            <p className="text-sm text-gray-500">{speaker.topic}</p>
            <p className="text-sm text-gray-500">{speaker.organization}</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Speaker ID: {speaker.speakerId}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
