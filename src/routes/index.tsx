import { createFileRoute } from "@tanstack/react-router";
import { AlbumPage } from "@/components/album/album-page";
import { DEFAULT_ALBUM } from "@/lib/album";
import { getAlbum } from "@/lib/album-api";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      return await getAlbum();
    } catch {
      return DEFAULT_ALBUM;
    }
  },
  component: Home,
});

function Home() {
  const album = Route.useLoaderData();
  return <AlbumPage initial={album} />;
}
