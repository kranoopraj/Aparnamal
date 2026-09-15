import { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
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
import { saveAlbum } from "@/lib/album-api";
import type { AlbumData, AlbumPhoto } from "@/lib/album";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useEditor } from "@/lib/editor-store";
import { cn } from "@/lib/utils";

export function LoginDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit the album</DialogTitle>
          <DialogDescription>
            Family members with an account can update photos, names, captions, and wedding details.
          </DialogDescription>
        </DialogHeader>
        <Button asChild className="mt-4 w-full" onClick={() => onOpenChange(false)}>
          <Link to="/login">Sign in or create an account</Link>
        </Button>
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
  const enter = useEditor((s) => s.enter);
  const logout = useEditor((s) => s.logout);
  const { user, isPending } = useCurrentUserState();
  const [busy, setBusy] = useState(false);
  const saveAlbumFn = useServerFn(saveAlbum);
  const router = useRouter();

  async function handleSave() {
    setBusy(true);
    try {
      await saveAlbumFn({ data: { album } });
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
        onClick={() => {
          if (isPending) return;
          if (!user) {
            onOpenLogin();
            return;
          }
          enter();
          toast.success("Edit mode is on. Tap any photo or line of text to change it.");
        }}
        className="fixed right-4 bottom-4 z-40 inline-flex h-12 items-center gap-2 rounded-full border border-gold/30 bg-cream px-4 text-sm text-ink-soft shadow-soft transition-colors hover:text-ink"
      >
        <Lock className="size-4" />
        {isPending ? "Checking access…" : user ? "Edit album" : "Sign in to edit"}
      </button>
    );
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-lg items-center gap-2 rounded-xl border border-gold/30 bg-cream/95 p-2 shadow-soft">
      <p className="min-w-0 flex-1 px-2 text-xs text-ink-soft sm:text-sm">
        {dirty ? "Unsaved changes" : "Editing — tap text or photos"}
      </p>
      <Button size="sm" onClick={() => void handleSave()} disabled={!dirty || busy}>
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
