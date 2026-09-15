import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { DEFAULT_ALBUM, type AlbumData } from "@/lib/album";
import { authMiddleware } from "@/lib/auth/middleware";

const photoSchema = z.object({
  id: z.string().min(1).max(80),
  src: z.string().min(1).max(6_000_000),
  alt: z.string().max(200),
  caption: z.string().max(240),
});

const albumSchema = z.object({
  kicker: z.string().max(80),
  brideName: z.string().min(1).max(80),
  groomName: z.string().min(1).max(80),
  joiningLine: z.string().max(120),
  weddingDateLabel: z.string().max(80),
  weddingDateIso: z.string().max(20),
  locationName: z.string().max(120),
  locationRegion: z.string().max(120),
  heroImage: z.string().min(1).max(6_000_000),
  heroAlt: z.string().max(200),
  introTitle: z.string().max(160),
  introBody: z.string().max(800),
  coupleTitle: z.string().max(80),
  brideLabel: z.string().max(80),
  brideNote: z.string().max(280),
  bridePortrait: z.string().min(1).max(6_000_000),
  groomLabel: z.string().max(80),
  groomNote: z.string().max(280),
  groomPortrait: z.string().min(1).max(6_000_000),
  galleryTitle: z.string().max(80),
  gallerySubtitle: z.string().max(240),
  photos: z.array(photoSchema).max(24),
  inviteTitle: z.string().max(80),
  inviteSubtitle: z.string().max(240),
  inviteImages: z.array(photoSchema).max(4),
  detailsTitle: z.string().max(80),
  detailsWhenLabel: z.string().max(40),
  detailsWhereLabel: z.string().max(40),
  detailsNote: z.string().max(400),
  footerLine: z.string().max(160),
});

function asAlbum(payload: unknown): AlbumData {
  try {
    const raw = typeof payload === "string" ? JSON.parse(payload) : payload;
    const parsed = albumSchema.safeParse(raw);
    if (!parsed.success) return DEFAULT_ALBUM;
    return parsed.data;
  } catch {
    return DEFAULT_ALBUM;
  }
}

export const getAlbum = createServerFn({ method: "GET" }).handler(async (): Promise<AlbumData> => {
  try {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql.query<{ payload: unknown }>(
      "select payload from album_content where id = $1",
      ["main"],
    );
    if (!rows[0]) return DEFAULT_ALBUM;
    return asAlbum(rows[0].payload);
  } catch {
    return DEFAULT_ALBUM;
  }
});

export const saveAlbum = createServerFn({ method: "POST" })
  .validator(
    z.object({
      album: albumSchema,
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql.query(
      `insert into album_content (id, payload, updated_by, updated_at)
       values ($1, $2::jsonb, $3, now())
       on conflict (id) do update
       set payload = excluded.payload, updated_by = excluded.updated_by, updated_at = now()`,
      ["main", JSON.stringify(data.album), context.userId],
    );
    return { ok: true as const };
  });
