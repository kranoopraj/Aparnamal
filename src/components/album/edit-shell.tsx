import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ChevronLeft, ChevronRight, Lock, LogOut, Save, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveAlbum, verifyEditor } from "@/lib/album-api";
import type { AlbumData, AlbumPhoto } from "@/lib/album";
import { useEditor } from "@/lib/editor-store";
import { cn } from "@/lib/utils";

export function LoginDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const setSession = useEditor((s) => s.setSession);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const verifyEditorFn = useServerFn(verifyEditor);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      await verifyEditorFn({ data: { username, password } });
      setSession(username, password);
      onOpenChange(false);
      setUsername("");
      setPassword("");
      toast.success("Edit mode is on. Tap any photo or line of text to change it.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Those details do not match.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit the album</DialogTitle>
          <DialogDescription>
            Sign in to change photos, names, captions, and wedding details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="editor-username">Username</Label>
            <Input
              id="editor-username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="editor-password">Password</Label>
            <Input
              id="editor-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error ? (
            <p className="text-sm text-wine" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={pending}>
            {pending ? "Checking…" : "Enter edit mode"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function EditBar({
  album,
  dirty,
  onSaved,
  onOpenLogin,
}: {
  album: AlbumData;
  dirty: boolean;
  onSaved: () => void;
  onOpenLogin: () => void;
}) {
  const isEditing = useEditor((s) => s.isEditing);
  const username = useEditor((s) => s.username);
  const password = useEditor((s) => s.password);
  const logout = useEditor((s) => s.logout);
  const [busy, setBusy] = useState(false);
  const saveAlbumFn = useServerFn(saveAlbum);
  const router = useRouter();

  async function handleSave() {
    setBusy(true);
    try {
      await saveAlbumFn({ data: { username, password, album } });
      onSaved();
      await router.invalidate();
      toast.success("Album saved. Anyone who opens it will see the update.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={onOpenLogin}
        className="fixed right-4 bottom-4 z-40 inline-flex h-12 items-center gap-2 rounded-full border border-gold/30 bg-cream px-4 text-sm text-ink-soft shadow-soft transition-colors hover:text-ink"
      >
        <Lock className="size-4" />
        Edit album
      </button>
    );
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-lg items-center gap-2 rounded-xl border border-gold/30 bg-cream/95 p-2 shadow-soft">
      <p className="min-w-0 flex-1 px-2 text-xs text-ink-soft sm:text-sm">
        {dirty ? "Unsaved changes" : "Editing — tap text or photos"}
      </p>
      <Button
        size="sm"
        onClick={() => void handleSave()}
        disabled={!dirty || busy}
      >
        <Save className="size-4" />
        {busy ? "Saving…" : "Save"}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          if (dirty && !window.confirm("Leave edit mode without saving?")) return;
          logout();
        }}
      >
        <LogOut className="size-4" />
        Done
      </Button>
    </div>
  );
}

export function Lightbox({
  photos,
  index,
  onClose,
  onIndex,
}: {
  photos: AlbumPhoto[];
  index: number | null;
  onClose: () => void;
  onIndex: (next: number) => void;
}) {
  const photo = index === null ? null : photos[index];

  useEffect(() => {
    if (index === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (index === null) return;
      if (event.key === "ArrowRight") onIndex((index + 1) % photos.length);
      if (event.key === "ArrowLeft") {
        onIndex((index - 1 + photos.length) % photos.length);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, photos.length, onClose, onIndex]);

  if (!photo || index === null) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-50 flex flex-col bg-ink/92 text-cream"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-3 py-2">
        <p className="px-2 font-display text-lg">{photo.caption || photo.alt}</p>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md hover:bg-cream/10"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="size-5" />
        </button>
      </div>
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-12 pb-8"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-full max-w-full object-contain shadow-soft"
        />
        <button
          type="button"
          className={cn(
            "absolute top-1/2 left-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20",
          )}
          aria-label="Previous photo"
          onClick={() => onIndex((index - 1 + photos.length) % photos.length)}
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20"
          aria-label="Next photo"
          onClick={() => onIndex((index + 1) % photos.length)}
        >
          <ChevronRight className="size-6" />
        </button>
      </div>
    </div>
  );
}
