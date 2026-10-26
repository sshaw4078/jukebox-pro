import db from "#db/client";

import { createUser } from "#db/queries/users";
import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 20; i++) {
    await createTrack("Track " + i, i * 50000);
  }


  const user1 = await createUser("alice", "password123");
  const user2 = await createUser("bob", "password456");

 
  const playlist1 = await createPlaylist("Alice's Mix", "Alice's favorite tracks", user1.id);
  const playlist2 = await createPlaylist("Bob's Jams", "Bob's go-to playlist", user2.id);


  for (let i = 1; i <= 5; i++) {
    await createPlaylistTrack(playlist1.id, i);      // tracks 1–5
    await createPlaylistTrack(playlist2.id, i + 5);  // tracks 6–10
  }
}