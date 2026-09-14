import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { t as DEFAULT_ALBUM } from "./album-CCriZpUf.mjs";
import { a as string, i as object, t as array } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/album-api-Dlq8wVq6.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var EDITOR_USERNAME = "Aparna";
var EDITOR_PASSWORD = "Amal";
var photoSchema = object({
	id: string().min(1).max(80),
	src: string().min(1).max(6e6),
	alt: string().max(200),
	caption: string().max(240)
});
var albumSchema = object({
	kicker: string().max(80),
	brideName: string().min(1).max(80),
	groomName: string().min(1).max(80),
	joiningLine: string().max(120),
	weddingDateLabel: string().max(80),
	weddingDateIso: string().max(20),
	locationName: string().max(120),
	locationRegion: string().max(120),
	heroImage: string().min(1).max(6e6),
	heroAlt: string().max(200),
	introTitle: string().max(160),
	introBody: string().max(800),
	coupleTitle: string().max(80),
	brideLabel: string().max(80),
	brideNote: string().max(280),
	bridePortrait: string().min(1).max(6e6),
	groomLabel: string().max(80),
	groomNote: string().max(280),
	groomPortrait: string().min(1).max(6e6),
	galleryTitle: string().max(80),
	gallerySubtitle: string().max(240),
	photos: array(photoSchema).max(24),
	inviteTitle: string().max(80),
	inviteSubtitle: string().max(240),
	inviteImages: array(photoSchema).max(4),
	detailsTitle: string().max(80),
	detailsWhenLabel: string().max(40),
	detailsWhereLabel: string().max(40),
	detailsNote: string().max(400),
	footerLine: string().max(160)
});
function credentialsOk(username, password) {
	return username === EDITOR_USERNAME && password === EDITOR_PASSWORD;
}
function asAlbum(payload) {
	try {
		const raw = typeof payload === "string" ? JSON.parse(payload) : payload;
		const parsed = albumSchema.safeParse(raw);
		if (!parsed.success) return DEFAULT_ALBUM;
		return parsed.data;
	} catch {
		return DEFAULT_ALBUM;
	}
}
var getAlbum_createServerFn_handler = createServerRpc({
	id: "500977f2fa417762a313cb9fa917e6586c72649a71268acb2bb9452a2dcdd90b",
	name: "getAlbum",
	filename: "src/lib/album-api.ts"
}, (opts) => getAlbum.__executeServer(opts));
var getAlbum = createServerFn({ method: "GET" }).handler(getAlbum_createServerFn_handler, async () => {
	try {
		const { getSql } = await import("./db-DTavtZcX.mjs");
		const rows = await (await getSql()).query("select payload from album_content where id = $1", ["main"]);
		if (!rows[0]) return DEFAULT_ALBUM;
		return asAlbum(rows[0].payload);
	} catch {
		return DEFAULT_ALBUM;
	}
});
var verifyEditor_createServerFn_handler = createServerRpc({
	id: "ea8a853a6fffea86627b59862d9d8ae82256b5ecf1e4e23182979c33b8ccd891",
	name: "verifyEditor",
	filename: "src/lib/album-api.ts"
}, (opts) => verifyEditor.__executeServer(opts));
var verifyEditor = createServerFn({ method: "POST" }).validator(object({
	username: string().min(1).max(80),
	password: string().min(1).max(80)
})).handler(verifyEditor_createServerFn_handler, async ({ data }) => {
	if (!credentialsOk(data.username, data.password)) throw new Error("Those details do not match.");
	return { ok: true };
});
var saveAlbum_createServerFn_handler = createServerRpc({
	id: "97749df6057b2012678c0875e3e9ea547ee7172b26762f6bf2f544d34f9fdddd",
	name: "saveAlbum",
	filename: "src/lib/album-api.ts"
}, (opts) => saveAlbum.__executeServer(opts));
var saveAlbum = createServerFn({ method: "POST" }).validator(object({
	username: string().min(1).max(80),
	password: string().min(1).max(80),
	album: albumSchema
})).handler(saveAlbum_createServerFn_handler, async ({ data }) => {
	if (!credentialsOk(data.username, data.password)) throw new Error("Those details do not match.");
	const { getSql } = await import("./db-DTavtZcX.mjs");
	await (await getSql()).query(`insert into album_content (id, payload, updated_at)
       values ($1, $2::jsonb, now())
       on conflict (id) do update
       set payload = excluded.payload, updated_at = now()`, ["main", JSON.stringify(data.album)]);
	return { ok: true };
});
//#endregion
export { getAlbum_createServerFn_handler, saveAlbum_createServerFn_handler, verifyEditor_createServerFn_handler };
