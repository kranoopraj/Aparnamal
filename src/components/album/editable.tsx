import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { ImagePlus } from "lucide-react";
import { cn, readImageAsJpeg } from "@/lib/utils";
import { useEditor } from "@/lib/editor-store";

type EditableTextProps = {
  value: string;
  onChange: (next: string) => void;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "blockquote";
  multiline?: boolean;
  className?: string;
};

export function EditableText({
  value,
  onChange,
  as: Tag = "p",
  multiline = false,
  className,
}: EditableTextProps) {
  const isEditing = useEditor((s) => s.isEditing);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isEditing) return;
    const el = ref.current;
    if (el && el.textContent !== value) el.textContent = value;
  }, [value, isEditing]);

  if (!isEditing) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      ref={ref as never}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-multiline={multiline}
      className={cn(
        "rounded-sm outline outline-1 outline-dashed outline-gold/50 ring-gold/20 focus:outline-gold focus:ring-2",
        className,
      )}
      onBlur={(event) => {
        const next = event.currentTarget.textContent ?? "";
        if (next !== value) onChange(next);
      }}
      onKeyDown={(event) => {
        if (!multiline && event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
    >
      {value}
    </Tag>
  );
}

type EditableImageProps = {
  src: string;
  alt: string;
  onChange: (nextSrc: string) => void;
  className?: string;
  imgClassName?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "onChange">;

export function EditableImage({
  src,
  alt,
  onChange,
  className,
  imgClassName,
  ...rest
}: EditableImageProps) {
  const isEditing = useEditor((s) => s.isEditing);
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    const dataUrl = await readImageAsJpeg(file);
    onChange(dataUrl);
  }

  return (
    <div className={cn("group relative", className)} {...rest}>
      <img
        src={src}
        alt={alt}
        className={cn(
          "outline outline-1 -outline-offset-1 outline-ink/10",
          imgClassName,
        )}
      />
      {isEditing ? (
        <>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center bg-ink/35 text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <span className="inline-flex items-center gap-2 rounded-md bg-wine px-3 py-2 text-sm">
              <ImagePlus className="size-4" />
              Change photo
            </span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              void onFile(file);
              event.target.value = "";
            }}
          />
        </>
      ) : null}
    </div>
  );
}
