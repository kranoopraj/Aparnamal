import { useMemo, useRef, useState } from "react";
import { ChevronDown, ImagePlus, MapPin, Trash2 } from "lucide-react";
import { EditableImage, EditableText } from "@/components/album/editable";
import {
  EditBar,
  Lightbox,
  LoginDialog,
} from "@/components/album/edit-shell";
import { Countdown } from "@/components/album/countdown";
import { GoldRule, KasavuFrame, Monogram } from "@/components/album/ornaments";
import type { AlbumData, AlbumPhoto } from "@/lib/album";
import { useEditor } from "@/lib/editor-store";
import { readImageAsJpeg } from "@/lib/utils";

const NAV = [
  { href: "#story", label: "Story" },
  { href: "#couple", label: "Couple" },
  { href: "#gallery", label: "Album" },
  { href: "#wedding", label: "Wedding" },
];

export function AlbumPage({ initial }: { initial: AlbumData }) {
  const [album, setAlbum] = useState<AlbumData>(initial);
  const [saved, setSaved] = useState<AlbumData>(initial);
  const [loginOpen, setLoginOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const isEditing = useEditor((s) => s.isEditing);
  const dirty = useMemo(
    () => JSON.stringify(album) !== JSON.stringify(saved),
    [album, saved],
  );

  function patch(partial: Partial<AlbumData>) {
    setAlbum((current) => ({ ...current, ...partial }));
  }

  function updatePhoto(
    list: "photos" | "inviteImages",
    id: string,
    next: Partial<AlbumPhoto>,
  ) {
    setAlbum((current) => ({
      ...current,
      [list]: current[list].map((photo) =>
        photo.id === id ? { ...photo, ...next } : photo,
      ),
    }));
  }

  const allLightboxPhotos = [
    {
      id: "hero",
      src: album.heroImage,
      alt: album.heroAlt,
      caption: `${album.brideName} & ${album.groomName}`,
    },
    ...album.photos,
    ...album.inviteImages,
  ];

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
    `${album.locationName}, ${album.locationRegion}`,
  )}`;

  return (
    <div className="min-h-svh bg-paper pb-24 text-ink">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-gold/20 bg-paper/95">
        <nav className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
          <a href="#top" className="min-h-11 shrink-0">
            <Monogram bride={album.brideName} groom={album.groomName} />
            <span className="sr-only">Back to top</span>
          </a>
          <ul className="ml-auto flex items-center gap-0 overflow-x-auto">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex h-11 items-center px-2.5 text-sm tracking-wide text-ink-soft whitespace-nowrap transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="top">
        <Hero album={album} patch={patch} />

        <section
          id="story"
          className="mx-auto max-w-3xl scroll-mt-24 px-6 py-20 text-center sm:py-28"
        >
          <GoldRule className="mx-auto mb-8 max-w-xs" />
          <EditableText
            as="h2"
            value={album.introTitle}
            onChange={(introTitle) => patch({ introTitle })}
            className="font-display text-4xl font-medium text-wine sm:text-5xl"
          />
          <EditableText
            as="p"
            multiline
            value={album.introBody}
            onChange={(introBody) => patch({ introBody })}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft"
          />
        </section>

        <section id="couple" className="scroll-mt-24 bg-wine-deep px-4 py-20 text-cream sm:py-28">
          <div className="mx-auto max-w-5xl">
            <EditableText
              as="h2"
              value={album.coupleTitle}
              onChange={(coupleTitle) => patch({ coupleTitle })}
              className="text-center font-display text-4xl font-medium text-gold-soft sm:text-5xl"
            />
            <GoldRule className="mx-auto mt-6 mb-12 max-w-xs" />
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              <PersonCard
                label={album.brideLabel}
                name={album.brideName}
                note={album.brideNote}
                src={album.bridePortrait}
                alt={`${album.brideName}, the bride`}
                onLabel={(brideLabel) => patch({ brideLabel })}
                onName={(brideName) => patch({ brideName })}
                onNote={(brideNote) => patch({ brideNote })}
                onImage={(bridePortrait) => patch({ bridePortrait })}
              />
              <PersonCard
                label={album.groomLabel}
                name={album.groomName}
                note={album.groomNote}
                src={album.groomPortrait}
                alt={`${album.groomName}, the groom`}
                onLabel={(groomLabel) => patch({ groomLabel })}
                onName={(groomName) => patch({ groomName })}
                onNote={(groomNote) => patch({ groomNote })}
                onImage={(groomPortrait) => patch({ groomPortrait })}
              />
            </div>
          </div>
        </section>

        <section id="gallery" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <EditableText
              as="h2"
              value={album.galleryTitle}
              onChange={(galleryTitle) => patch({ galleryTitle })}
              className="font-display text-4xl font-medium text-wine sm:text-5xl"
            />
            <EditableText
              as="p"
              value={album.gallerySubtitle}
              onChange={(gallerySubtitle) => patch({ gallerySubtitle })}
              className="mt-4 text-ink-soft"
            />
          </div>
          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {album.photos.map((photo, index) => (
              <figure key={photo.id} className="mb-4 break-inside-avoid">
                <div
                  role={isEditing ? undefined : "button"}
                  tabIndex={isEditing ? undefined : 0}
                  className="block w-full overflow-hidden rounded-lg"
                  onClick={() => {
                    if (isEditing) return;
                    setLightbox(index + 1);
                  }}
                  onKeyDown={(event) => {
                    if (isEditing) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setLightbox(index + 1);
                    }
                  }}
                >
                  <EditableImage
                    src={photo.src}
                    alt={photo.alt}
                    onChange={(src) => updatePhoto("photos", photo.id, { src })}
                    imgClassName="photo-zoom w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                  />
                </div>
                <figcaption className="mt-2 flex items-start justify-between gap-2 px-1">
                  <EditableText
                    as="p"
                    value={photo.caption}
                    onChange={(caption) =>
                      updatePhoto("photos", photo.id, { caption })
                    }
                    className="font-display text-base text-ink-soft italic"
                  />
                  {isEditing ? (
                    <button
                      type="button"
                      className="inline-flex size-11 shrink-0 items-center justify-center text-muted hover:text-wine"
                      aria-label="Remove photo"
                      onClick={() =>
                        setAlbum((current) => ({
                          ...current,
                          photos: current.photos.filter((item) => item.id !== photo.id),
                        }))
                      }
                    >
                      <Trash2 className="size-4" />
                    </button>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>
          {isEditing ? (
            <AddPhotoButton
              onAdd={(photo) => patch({ photos: [...album.photos, photo] })}
            />
          ) : null}
        </section>

        <section className="bg-paper-deep px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl text-center">
            <EditableText
              as="h2"
              value={album.inviteTitle}
              onChange={(inviteTitle) => patch({ inviteTitle })}
              className="font-display text-4xl font-medium text-wine sm:text-5xl"
            />
            <EditableText
              as="p"
              value={album.inviteSubtitle}
              onChange={(inviteSubtitle) => patch({ inviteSubtitle })}
              className="mt-4 text-ink-soft"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {album.inviteImages.map((photo, index) => (
                <KasavuFrame key={photo.id}>
                  <div
                    role={isEditing ? undefined : "button"}
                    tabIndex={isEditing ? undefined : 0}
                    className="block w-full"
                    onClick={() => {
                      if (isEditing) return;
                      setLightbox(1 + album.photos.length + index);
                    }}
                    onKeyDown={(event) => {
                      if (isEditing) return;
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setLightbox(1 + album.photos.length + index);
                      }
                    }}
                  >
                    <EditableImage
                      src={photo.src}
                      alt={photo.alt}
                      onChange={(src) =>
                        updatePhoto("inviteImages", photo.id, { src })
                      }
                      imgClassName="aspect-portrait w-full object-cover"
                    />
                  </div>
                </KasavuFrame>
              ))}
            </div>
          </div>
        </section>

        <section
          id="wedding"
          className="mx-auto max-w-3xl scroll-mt-24 px-6 py-20 text-center sm:py-28"
        >
          <GoldRule className="mx-auto mb-8 max-w-xs" />
          <EditableText
            as="h2"
            value={album.detailsTitle}
            onChange={(detailsTitle) => patch({ detailsTitle })}
            className="font-display text-4xl font-medium text-wine sm:text-5xl"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="rounded-xl bg-cream px-6 py-8 shadow-soft">
              <EditableText
                as="p"
                value={album.detailsWhenLabel}
                onChange={(detailsWhenLabel) => patch({ detailsWhenLabel })}
                className="text-xs tracking-label text-gold uppercase"
              />
              <EditableText
                as="p"
                value={album.weddingDateLabel}
                onChange={(weddingDateLabel) => patch({ weddingDateLabel })}
                className="mt-3 font-display text-2xl text-ink"
              />
              {isEditing ? (
                <label className="mt-4 flex flex-col items-center gap-1 text-xs text-muted">
                  Countdown date
                  <input
                    type="date"
                    value={album.weddingDateIso}
                    onChange={(event) =>
                      patch({ weddingDateIso: event.target.value })
                    }
                    className="h-11 rounded-md border border-gold/30 bg-paper px-3 text-sm text-ink"
                  />
                </label>
              ) : null}
            </div>
            <div className="rounded-xl bg-cream px-6 py-8 shadow-soft">
              <EditableText
                as="p"
                value={album.detailsWhereLabel}
                onChange={(detailsWhereLabel) => patch({ detailsWhereLabel })}
                className="text-xs tracking-label text-gold uppercase"
              />
              <EditableText
                as="p"
                value={album.locationName}
                onChange={(locationName) => patch({ locationName })}
                className="mt-3 font-display text-2xl text-ink"
              />
              <EditableText
                as="p"
                value={album.locationRegion}
                onChange={(locationRegion) => patch({ locationRegion })}
                className="mt-1 text-ink-soft"
              />
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex h-11 items-center gap-2 text-sm text-wine hover:text-wine-deep"
              >
                <MapPin className="size-4" />
                Open map
              </a>
            </div>
          </div>
          <div className="mt-12">
            <Countdown isoDate={album.weddingDateIso} />
          </div>
          <EditableText
            as="p"
            multiline
            value={album.detailsNote}
            onChange={(detailsNote) => patch({ detailsNote })}
            className="mt-10 font-display text-xl text-ink-soft italic"
          />
        </section>
      </main>

      <footer className="border-t border-gold/20 px-6 py-12 text-center">
        <Monogram
          bride={album.brideName}
          groom={album.groomName}
          className="mb-4"
        />
        <EditableText
          as="p"
          value={album.footerLine}
          onChange={(footerLine) => patch({ footerLine })}
          className="font-display text-lg text-ink-soft"
        />
        <p className="mt-2 text-sm text-muted">{album.weddingDateLabel}</p>
      </footer>

      <EditBar
        album={album}
        dirty={dirty}
        onSaved={() => setSaved(album)}
        onOpenLogin={() => setLoginOpen(true)}
      />
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      <Lightbox
        photos={allLightboxPhotos}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={setLightbox}
      />
    </div>
  );
}

function Hero({
  album,
  patch,
}: {
  album: AlbumData;
  patch: (partial: Partial<AlbumData>) => void;
}) {
  const isEditing = useEditor((s) => s.isEditing);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="relative min-h-svh">
      <img
        src={album.heroImage}
        alt={album.heroAlt}
        className="absolute inset-0 size-full object-cover object-top outline outline-1 -outline-offset-1 outline-ink/10"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/35" />
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-end px-6 pb-16 pt-28 text-center text-cream">
        {isEditing ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute top-24 right-4 inline-flex h-11 items-center gap-2 rounded-md bg-wine px-3 text-sm text-cream"
          >
            <ImagePlus className="size-4" />
            Change cover
          </button>
        ) : null}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void readImageAsJpeg(file).then((heroImage) => patch({ heroImage }));
            event.target.value = "";
          }}
        />
        <EditableText
          as="p"
          value={album.kicker}
          onChange={(kicker) => patch({ kicker })}
          className="text-xs tracking-kicker text-gold-soft uppercase"
        />
        <EditableText
          as="h1"
          value={album.brideName}
          onChange={(brideName) => patch({ brideName })}
          className="mt-5 font-display text-6xl font-medium leading-none sm:text-7xl md:text-8xl"
        />
        <p className="font-display text-3xl italic text-gold-soft sm:text-4xl">&</p>
        <EditableText
          as="h2"
          value={album.groomName}
          onChange={(groomName) => patch({ groomName })}
          className="font-display text-6xl font-medium leading-none sm:text-7xl md:text-8xl"
        />
        <EditableText
          as="p"
          value={album.joiningLine}
          onChange={(joiningLine) => patch({ joiningLine })}
          className="mt-5 text-sm tracking-label text-cream/80 uppercase"
        />
        <p className="mt-6 font-display text-xl text-gold-soft">
          {album.weddingDateLabel}
          <span className="mx-2 text-cream/50">·</span>
          {album.locationRegion}
        </p>
        <a
          href="#story"
          className="mt-10 inline-flex size-11 items-center justify-center text-cream/70 hover:text-cream"
          aria-label="Read the story"
        >
          <ChevronDown className="size-6" />
        </a>
      </div>
    </section>
  );
}

function PersonCard({
  label,
  name,
  note,
  src,
  alt,
  onLabel,
  onName,
  onNote,
  onImage,
}: {
  label: string;
  name: string;
  note: string;
  src: string;
  alt: string;
  onLabel: (value: string) => void;
  onName: (value: string) => void;
  onNote: (value: string) => void;
  onImage: (value: string) => void;
}) {
  return (
    <article className="text-center">
      <KasavuFrame className="border-gold/40 bg-wine/30">
        <EditableImage
          src={src}
          alt={alt}
          onChange={onImage}
          imgClassName="aspect-portrait w-full object-cover object-top"
        />
      </KasavuFrame>
      <EditableText
        as="p"
        value={label}
        onChange={onLabel}
        className="mt-6 text-xs tracking-mono text-gold-soft uppercase"
      />
      <EditableText
        as="h3"
        value={name}
        onChange={onName}
        className="mt-2 font-display text-4xl text-cream"
      />
      <EditableText
        as="p"
        multiline
        value={note}
        onChange={onNote}
        className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-cream/75"
      />
    </article>
  );
}

function AddPhotoButton({ onAdd }: { onAdd: (photo: AlbumPhoto) => void }) {
  async function onFile(file: File | undefined) {
    if (!file) return;
    const src = await readImageAsJpeg(file);
    onAdd({
      id: `photo-${Date.now()}`,
      src,
      alt: "Wedding album photo",
      caption: "A new moment",
    });
  }

  return (
    <label className="mt-6 flex h-28 cursor-pointer items-center justify-center rounded-lg border border-dashed border-gold/50 bg-cream text-ink-soft hover:bg-paper-deep">
      <span className="inline-flex items-center gap-2 text-sm">
        <ImagePlus className="size-4" />
        Add a photo
      </span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          void onFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
    </label>
  );
}
