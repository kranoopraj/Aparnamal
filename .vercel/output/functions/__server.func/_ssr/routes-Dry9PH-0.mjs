import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useRouter, j as isRedirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, c as Slot, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as weddingTimestamp } from "./album-CCriZpUf.mjs";
import { a as MapPin, c as ImagePlus, d as ChevronDown, i as Save, l as ChevronRight, o as LogOut, r as Trash2, s as Lock, t as X, u as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as verifyEditor, n as Route, r as saveAlbum } from "./router-BLPGZJe1.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dry9PH-0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function readImageAsJpeg(file, maxEdge = 1600, quality = .82) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const url = URL.createObjectURL(file);
		img.onload = () => {
			URL.revokeObjectURL(url);
			const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
			const width = Math.max(1, Math.round(img.width * scale));
			const height = Math.max(1, Math.round(img.height * scale));
			const canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				reject(/* @__PURE__ */ new Error("Could not read this photo."));
				return;
			}
			ctx.drawImage(img, 0, 0, width, height);
			resolve(canvas.toDataURL("image/jpeg", quality));
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("Could not read this photo."));
		};
		img.src = url;
	});
}
var useEditor = create((set) => ({
	isEditing: false,
	username: "",
	password: "",
	setSession: (username, password) => set({
		isEditing: true,
		username,
		password
	}),
	logout: () => set({
		isEditing: false,
		username: "",
		password: ""
	})
}));
function EditableText({ value, onChange, as: Tag = "p", multiline = false, className }) {
	const isEditing = useEditor((s) => s.isEditing);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!isEditing) return;
		const el = ref.current;
		if (el && el.textContent !== value) el.textContent = value;
	}, [value, isEditing]);
	if (!isEditing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		className,
		children: value
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		contentEditable: true,
		suppressContentEditableWarning: true,
		role: "textbox",
		"aria-multiline": multiline,
		className: cn("rounded-sm outline outline-1 outline-dashed outline-gold/50 ring-gold/20 focus:outline-gold focus:ring-2", className),
		onBlur: (event) => {
			const next = event.currentTarget.textContent ?? "";
			if (next !== value) onChange(next);
		},
		onKeyDown: (event) => {
			if (!multiline && event.key === "Enter") {
				event.preventDefault();
				event.currentTarget.blur();
			}
		},
		children: value
	});
}
function EditableImage({ src, alt, onChange, className, imgClassName, ...rest }) {
	const isEditing = useEditor((s) => s.isEditing);
	const inputRef = (0, import_react.useRef)(null);
	async function onFile(file) {
		if (!file) return;
		onChange(await readImageAsJpeg(file));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group relative", className),
		...rest,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			className: cn("outline outline-1 -outline-offset-1 outline-ink/10", imgClassName)
		}), isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => inputRef.current?.click(),
			className: "absolute inset-0 flex items-center justify-center bg-ink/35 text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-2 rounded-md bg-wine px-3 py-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }), "Change photo"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: inputRef,
			type: "file",
			accept: "image/*",
			className: "hidden",
			onChange: (event) => {
				const file = event.target.files?.[0];
				onFile(file);
				event.target.value = "";
			}
		})] }) : null]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-wine text-cream hover:bg-wine-deep",
			outline: "border border-gold/40 bg-transparent text-ink hover:bg-paper-deep",
			ghost: "text-ink-soft hover:bg-paper-deep hover:text-ink",
			cream: "bg-cream text-wine hover:bg-paper"
		},
		size: {
			default: "h-11 px-5",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-8",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-ink/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gold/25 bg-cream p-6 text-ink shadow-soft duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-md text-muted transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 pr-8 text-left", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-2xl font-medium text-ink", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-ink-soft", className),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md border border-gold/30 bg-cream px-3 text-base text-ink shadow-none outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/30 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-sm font-medium text-ink-soft peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
function LoginDialog({ open, onOpenChange }) {
	const setSession = useEditor((s) => s.setSession);
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const verifyEditorFn = useServerFn(verifyEditor);
	async function onSubmit(event) {
		event.preventDefault();
		setError("");
		setPending(true);
		try {
			await verifyEditorFn({ data: {
				username,
				password
			} });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Edit the album" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Sign in to change photos, names, captions, and wedding details." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "mt-4 flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "editor-username",
						children: "Username"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "editor-username",
						autoComplete: "username",
						value: username,
						onChange: (event) => setUsername(event.target.value),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "editor-password",
						children: "Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "editor-password",
						type: "password",
						autoComplete: "current-password",
						value: password,
						onChange: (event) => setPassword(event.target.value),
						required: true
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-wine",
					role: "alert",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: pending,
					children: pending ? "Checking…" : "Enter edit mode"
				})
			]
		})] })
	});
}
function EditBar({ album, dirty, onSaved, onOpenLogin }) {
	const isEditing = useEditor((s) => s.isEditing);
	const username = useEditor((s) => s.username);
	const password = useEditor((s) => s.password);
	const logout = useEditor((s) => s.logout);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const saveAlbumFn = useServerFn(saveAlbum);
	const router = useRouter();
	async function handleSave() {
		setBusy(true);
		try {
			await saveAlbumFn({ data: {
				username,
				password,
				album
			} });
			onSaved();
			await router.invalidate();
			toast.success("Album saved. Anyone who opens it will see the update.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save.");
		} finally {
			setBusy(false);
		}
	}
	if (!isEditing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onOpenLogin,
		className: "fixed right-4 bottom-4 z-40 inline-flex h-12 items-center gap-2 rounded-full border border-gold/30 bg-cream px-4 text-sm text-ink-soft shadow-soft transition-colors hover:text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }), "Edit album"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-lg items-center gap-2 rounded-xl border border-gold/30 bg-cream/95 p-2 shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-w-0 flex-1 px-2 text-xs text-ink-soft sm:text-sm",
				children: dirty ? "Unsaved changes" : "Editing — tap text or photos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: () => void handleSave(),
				disabled: !dirty || busy,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), busy ? "Saving…" : "Save"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "ghost",
				onClick: () => {
					if (dirty && !window.confirm("Leave edit mode without saving?")) return;
					logout();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), "Done"]
			})
		]
	});
}
function Lightbox({ photos, index, onClose, onIndex }) {
	const photo = index === null ? null : photos[index];
	(0, import_react.useEffect)(() => {
		if (index === null) return;
		function onKey(event) {
			if (event.key === "Escape") onClose();
			if (index === null) return;
			if (event.key === "ArrowRight") onIndex((index + 1) % photos.length);
			if (event.key === "ArrowLeft") onIndex((index - 1 + photos.length) % photos.length);
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		index,
		photos.length,
		onClose,
		onIndex
	]);
	if (!photo || index === null) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": photo.alt,
		className: "fixed inset-0 z-50 flex flex-col bg-ink/92 text-cream",
		onClick: onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2 font-display text-lg",
				children: photo.caption || photo.alt
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "inline-flex size-11 items-center justify-center rounded-md hover:bg-cream/10",
				onClick: onClose,
				"aria-label": "Close",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex min-h-0 flex-1 items-center justify-center px-12 pb-8",
			onClick: (event) => event.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: photo.src,
					alt: photo.alt,
					className: "max-h-full max-w-full object-contain shadow-soft"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("absolute top-1/2 left-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20"),
					"aria-label": "Previous photo",
					onClick: () => onIndex((index - 1 + photos.length) % photos.length),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute top-1/2 right-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20",
					"aria-label": "Next photo",
					onClick: () => onIndex((index + 1) % photos.length),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-6" })
				})
			]
		})]
	});
}
function parts(ms) {
	const clamped = Math.max(0, ms);
	const totalSeconds = Math.floor(clamped / 1e3);
	return {
		days: Math.floor(totalSeconds / 86400),
		hours: Math.floor(totalSeconds % 86400 / 3600),
		minutes: Math.floor(totalSeconds % 3600 / 60),
		seconds: totalSeconds % 60,
		done: clamped <= 0
	};
}
function Countdown({ isoDate }) {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setNow(Date.now());
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	if (now === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-4 gap-2 sm:gap-4",
		"aria-hidden": "true",
		children: [
			"Days",
			"Hours",
			"Minutes",
			"Seconds"
		].map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeCell, {
			value: "—",
			label
		}, label))
	});
	const remain = parts(weddingTimestamp(isoDate) - now);
	if (remain.done) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-display text-2xl text-wine",
		children: "The day is here. We are married."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-4 gap-2 sm:gap-4",
		"aria-label": "Countdown to the wedding",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeCell, {
				value: remain.days,
				label: "Days"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeCell, {
				value: remain.hours,
				label: "Hours"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeCell, {
				value: remain.minutes,
				label: "Minutes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeCell, {
				value: remain.seconds,
				label: "Seconds"
			})
		]
	});
}
function TimeCell({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-cream px-2 py-3 text-center shadow-soft sm:px-3 sm:py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-3xl tabular-nums text-wine sm:text-4xl",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-xs tracking-label text-muted uppercase sm:text-xs",
			children: label
		})]
	});
}
function GoldRule({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-3", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-gold/45" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rotate-45 bg-gold" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-gold/45" })
		]
	});
}
function Monogram({ bride, groom, className }) {
	const a = (bride.trim()[0] ?? "A").toUpperCase();
	const b = (groom.trim()[0] ?? "A").toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("font-display text-lg tracking-mono text-gold uppercase", className),
		"aria-hidden": "true",
		children: [
			a,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mx-1.5 font-display italic tracking-normal text-gold-soft lowercase",
				children: "and"
			}),
			b
		]
	});
}
function KasavuFrame({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl border border-gold/35 bg-cream p-1.5 shadow-soft", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-lg",
			children
		})
	});
}
var NAV = [
	{
		href: "#story",
		label: "Story"
	},
	{
		href: "#couple",
		label: "Couple"
	},
	{
		href: "#gallery",
		label: "Album"
	},
	{
		href: "#wedding",
		label: "Wedding"
	}
];
function AlbumPage({ initial }) {
	const [album, setAlbum] = (0, import_react.useState)(initial);
	const [saved, setSaved] = (0, import_react.useState)(initial);
	const [loginOpen, setLoginOpen] = (0, import_react.useState)(false);
	const [lightbox, setLightbox] = (0, import_react.useState)(null);
	const isEditing = useEditor((s) => s.isEditing);
	const dirty = (0, import_react.useMemo)(() => JSON.stringify(album) !== JSON.stringify(saved), [album, saved]);
	function patch(partial) {
		setAlbum((current) => ({
			...current,
			...partial
		}));
	}
	function updatePhoto(list, id, next) {
		setAlbum((current) => ({
			...current,
			[list]: current[list].map((photo) => photo.id === id ? {
				...photo,
				...next
			} : photo)
		}));
	}
	const allLightboxPhotos = [
		{
			id: "hero",
			src: album.heroImage,
			alt: album.heroAlt,
			caption: `${album.brideName} & ${album.groomName}`
		},
		...album.photos,
		...album.inviteImages
	];
	const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(`${album.locationName}, ${album.locationRegion}`)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-svh bg-paper pb-24 text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "fixed inset-x-0 top-0 z-30 border-b border-gold/20 bg-paper/95",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#top",
						className: "min-h-11 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, {
							bride: album.brideName,
							groom: album.groomName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Back to top"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "ml-auto flex items-center gap-0 overflow-x-auto",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.href,
							className: "inline-flex h-11 items-center px-2.5 text-sm tracking-wide text-ink-soft whitespace-nowrap transition-colors hover:text-ink",
							children: item.label
						}) }, item.href))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "top",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {
						album,
						patch
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "story",
						className: "mx-auto max-w-3xl px-6 py-20 text-center sm:py-28",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldRule, { className: "mx-auto mb-8 max-w-xs" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
								as: "h2",
								value: album.introTitle,
								onChange: (introTitle) => patch({ introTitle }),
								className: "font-display text-4xl font-medium text-wine sm:text-5xl"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
								as: "p",
								multiline: true,
								value: album.introBody,
								onChange: (introBody) => patch({ introBody }),
								className: "mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "couple",
						className: "bg-wine-deep px-4 py-20 text-cream sm:py-28",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-5xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
									as: "h2",
									value: album.coupleTitle,
									onChange: (coupleTitle) => patch({ coupleTitle }),
									className: "text-center font-display text-4xl font-medium text-gold-soft sm:text-5xl"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldRule, { className: "mx-auto mt-6 mb-12 max-w-xs" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-10 md:grid-cols-2 md:gap-16",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonCard, {
										label: album.brideLabel,
										name: album.brideName,
										note: album.brideNote,
										src: album.bridePortrait,
										alt: `${album.brideName}, the bride`,
										onLabel: (brideLabel) => patch({ brideLabel }),
										onName: (brideName) => patch({ brideName }),
										onNote: (brideNote) => patch({ brideNote }),
										onImage: (bridePortrait) => patch({ bridePortrait })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonCard, {
										label: album.groomLabel,
										name: album.groomName,
										note: album.groomNote,
										src: album.groomPortrait,
										alt: `${album.groomName}, the groom`,
										onLabel: (groomLabel) => patch({ groomLabel }),
										onName: (groomName) => patch({ groomName }),
										onNote: (groomNote) => patch({ groomNote }),
										onImage: (groomPortrait) => patch({ groomPortrait })
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "gallery",
						className: "mx-auto max-w-6xl px-4 py-20 sm:py-28",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto max-w-2xl text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
									as: "h2",
									value: album.galleryTitle,
									onChange: (galleryTitle) => patch({ galleryTitle }),
									className: "font-display text-4xl font-medium text-wine sm:text-5xl"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
									as: "p",
									value: album.gallerySubtitle,
									onChange: (gallerySubtitle) => patch({ gallerySubtitle }),
									className: "mt-4 text-ink-soft"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3",
								children: album.photos.map((photo, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
									className: "mb-4 break-inside-avoid",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										role: isEditing ? void 0 : "button",
										tabIndex: isEditing ? void 0 : 0,
										className: "block w-full overflow-hidden rounded-lg",
										onClick: () => {
											if (isEditing) return;
											setLightbox(index + 1);
										},
										onKeyDown: (event) => {
											if (isEditing) return;
											if (event.key === "Enter" || event.key === " ") {
												event.preventDefault();
												setLightbox(index + 1);
											}
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableImage, {
											src: photo.src,
											alt: photo.alt,
											onChange: (src) => updatePhoto("photos", photo.id, { src }),
											imgClassName: "photo-zoom w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
										className: "mt-2 flex items-start justify-between gap-2 px-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
											as: "p",
											value: photo.caption,
											onChange: (caption) => updatePhoto("photos", photo.id, { caption }),
											className: "font-display text-base text-ink-soft italic"
										}), isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "inline-flex size-11 shrink-0 items-center justify-center text-muted hover:text-wine",
											"aria-label": "Remove photo",
											onClick: () => setAlbum((current) => ({
												...current,
												photos: current.photos.filter((item) => item.id !== photo.id)
											})),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										}) : null]
									})]
								}, photo.id))
							}),
							isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddPhotoButton, { onAdd: (photo) => patch({ photos: [...album.photos, photo] }) }) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "bg-paper-deep px-4 py-20 sm:py-28",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-5xl text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
									as: "h2",
									value: album.inviteTitle,
									onChange: (inviteTitle) => patch({ inviteTitle }),
									className: "font-display text-4xl font-medium text-wine sm:text-5xl"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
									as: "p",
									value: album.inviteSubtitle,
									onChange: (inviteSubtitle) => patch({ inviteSubtitle }),
									className: "mt-4 text-ink-soft"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-12 grid gap-6 md:grid-cols-2",
									children: album.inviteImages.map((photo, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KasavuFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										role: isEditing ? void 0 : "button",
										tabIndex: isEditing ? void 0 : 0,
										className: "block w-full",
										onClick: () => {
											if (isEditing) return;
											setLightbox(1 + album.photos.length + index);
										},
										onKeyDown: (event) => {
											if (isEditing) return;
											if (event.key === "Enter" || event.key === " ") {
												event.preventDefault();
												setLightbox(1 + album.photos.length + index);
											}
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableImage, {
											src: photo.src,
											alt: photo.alt,
											onChange: (src) => updatePhoto("inviteImages", photo.id, { src }),
											imgClassName: "aspect-portrait w-full object-cover"
										})
									}) }, photo.id))
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "wedding",
						className: "mx-auto max-w-3xl px-6 py-20 text-center sm:py-28",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldRule, { className: "mx-auto mb-8 max-w-xs" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
								as: "h2",
								value: album.detailsTitle,
								onChange: (detailsTitle) => patch({ detailsTitle }),
								className: "font-display text-4xl font-medium text-wine sm:text-5xl"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-12 grid gap-8 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-cream px-6 py-8 shadow-soft",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
											as: "p",
											value: album.detailsWhenLabel,
											onChange: (detailsWhenLabel) => patch({ detailsWhenLabel }),
											className: "text-xs tracking-label text-gold uppercase"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
											as: "p",
											value: album.weddingDateLabel,
											onChange: (weddingDateLabel) => patch({ weddingDateLabel }),
											className: "mt-3 font-display text-2xl text-ink"
										}),
										isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "mt-4 flex flex-col items-center gap-1 text-xs text-muted",
											children: ["Countdown date", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "date",
												value: album.weddingDateIso,
												onChange: (event) => patch({ weddingDateIso: event.target.value }),
												className: "h-11 rounded-md border border-gold/30 bg-paper px-3 text-sm text-ink"
											})]
										}) : null
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-cream px-6 py-8 shadow-soft",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
											as: "p",
											value: album.detailsWhereLabel,
											onChange: (detailsWhereLabel) => patch({ detailsWhereLabel }),
											className: "text-xs tracking-label text-gold uppercase"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
											as: "p",
											value: album.locationName,
											onChange: (locationName) => patch({ locationName }),
											className: "mt-3 font-display text-2xl text-ink"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
											as: "p",
											value: album.locationRegion,
											onChange: (locationRegion) => patch({ locationRegion }),
											className: "mt-1 text-ink-soft"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: mapsUrl,
											target: "_blank",
											rel: "noreferrer",
											className: "mt-4 inline-flex h-11 items-center gap-2 text-sm text-wine hover:text-wine-deep",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), "Open map"]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-12",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, { isoDate: album.weddingDateIso })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
								as: "p",
								multiline: true,
								value: album.detailsNote,
								onChange: (detailsNote) => patch({ detailsNote }),
								className: "mt-10 font-display text-xl text-ink-soft italic"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-gold/20 px-6 py-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, {
						bride: album.brideName,
						groom: album.groomName,
						className: "mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
						as: "p",
						value: album.footerLine,
						onChange: (footerLine) => patch({ footerLine }),
						className: "font-display text-lg text-ink-soft"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: album.weddingDateLabel
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditBar, {
				album,
				dirty,
				onSaved: () => setSaved(album),
				onOpenLogin: () => setLoginOpen(true)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginDialog, {
				open: loginOpen,
				onOpenChange: setLoginOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbox, {
				photos: allLightboxPhotos,
				index: lightbox,
				onClose: () => setLightbox(null),
				onIndex: setLightbox
			})
		]
	});
}
function Hero({ album, patch }) {
	const isEditing = useEditor((s) => s.isEditing);
	const inputRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-svh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: album.heroImage,
				alt: album.heroAlt,
				className: "absolute inset-0 size-full object-cover object-top outline outline-1 -outline-offset-1 outline-ink/10"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/35" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex min-h-svh flex-col items-center justify-end px-6 pb-16 pt-28 text-center text-cream",
				children: [
					isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => inputRef.current?.click(),
						className: "absolute top-24 right-4 inline-flex h-11 items-center gap-2 rounded-md bg-wine px-3 text-sm text-cream",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }), "Change cover"]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (event) => {
							const file = event.target.files?.[0];
							if (file) readImageAsJpeg(file).then((heroImage) => patch({ heroImage }));
							event.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
						as: "p",
						value: album.kicker,
						onChange: (kicker) => patch({ kicker }),
						className: "text-xs tracking-kicker text-gold-soft uppercase"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
						as: "h1",
						value: album.brideName,
						onChange: (brideName) => patch({ brideName }),
						className: "mt-5 font-display text-6xl font-medium leading-none sm:text-7xl md:text-8xl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl italic text-gold-soft sm:text-4xl",
						children: "&"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
						as: "h2",
						value: album.groomName,
						onChange: (groomName) => patch({ groomName }),
						className: "font-display text-6xl font-medium leading-none sm:text-7xl md:text-8xl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
						as: "p",
						value: album.joiningLine,
						onChange: (joiningLine) => patch({ joiningLine }),
						className: "mt-5 text-sm tracking-label text-cream/80 uppercase"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 font-display text-xl text-gold-soft",
						children: [
							album.weddingDateLabel,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-2 text-cream/50",
								children: "·"
							}),
							album.locationRegion
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#story",
						className: "mt-10 inline-flex size-11 items-center justify-center text-cream/70 hover:text-cream",
						"aria-label": "Read the story",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-6" })
					})
				]
			})
		]
	});
}
function PersonCard({ label, name, note, src, alt, onLabel, onName, onNote, onImage }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KasavuFrame, {
				className: "border-gold/40 bg-wine/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableImage, {
					src,
					alt,
					onChange: onImage,
					imgClassName: "aspect-portrait w-full object-cover object-top"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
				as: "p",
				value: label,
				onChange: onLabel,
				className: "mt-6 text-xs tracking-mono text-gold-soft uppercase"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
				as: "h3",
				value: name,
				onChange: onName,
				className: "mt-2 font-display text-4xl text-cream"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
				as: "p",
				multiline: true,
				value: note,
				onChange: onNote,
				className: "mx-auto mt-3 max-w-sm text-sm leading-relaxed text-cream/75"
			})
		]
	});
}
function AddPhotoButton({ onAdd }) {
	async function onFile(file) {
		if (!file) return;
		const src = await readImageAsJpeg(file);
		onAdd({
			id: `photo-${Date.now()}`,
			src,
			alt: "Wedding album photo",
			caption: "A new moment"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mt-6 flex h-28 cursor-pointer items-center justify-center rounded-lg border border-dashed border-gold/50 bg-cream text-ink-soft hover:bg-paper-deep",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-2 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }), "Add a photo"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "file",
			accept: "image/*",
			className: "hidden",
			onChange: (event) => {
				onFile(event.target.files?.[0]);
				event.target.value = "";
			}
		})]
	});
}
function Home() {
	const album = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlbumPage, { initial: album });
}
//#endregion
export { Home as component };
