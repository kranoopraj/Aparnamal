import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, LockKeyhole } from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    const result =
      mode === "signIn"
        ? await authClient.signIn.email({ email, password, callbackURL: "/" })
        : await authClient.signUp.email({ name, email, password, callbackURL: "/" });
    setPending(false);
    if (result.error) setError(result.error.message ?? "We could not complete that request.");
    else window.location.assign("/");
  }

  return (
    <main className="grid min-h-svh place-items-center bg-paper px-5 py-10 text-ink">
      <section className="w-full max-w-md rounded-xl border border-gold/25 bg-cream p-7 shadow-soft sm:p-10">
        <Link
          to="/"
          className="inline-flex h-11 items-center gap-2 text-sm text-ink-soft hover:text-wine"
        >
          <ArrowLeft className="size-4" /> Back to the album
        </Link>
        <div className="mt-7 flex size-12 items-center justify-center rounded-full bg-wine text-gold-soft">
          <Heart className="size-5" />
        </div>
        <p className="mt-5 text-xs tracking-label text-gold uppercase">Family album access</p>
        <h1 className="mt-2 font-display text-4xl text-wine">
          {mode === "signIn" ? "Welcome back" : "Create your family account"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Sign in with your email and password to make changes to this shared celebration page.
        </p>
        <form className="mt-7 space-y-4" onSubmit={(event) => void submit(event)}>
          {mode === "signUp" ? (
            <div>
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                className="mt-1.5"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
          ) : null}
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              className="mt-1.5"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              className="mt-1.5"
              type="password"
              minLength={8}
              autoComplete={mode === "signIn" ? "current-password" : "new-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error ? (
            <p role="alert" className="text-sm text-wine">
              {error}
            </p>
          ) : null}
          <Button className="w-full" type="submit" disabled={pending}>
            <LockKeyhole className="size-4" />
            {pending ? "Please wait…" : mode === "signIn" ? "Sign in to edit" : "Create account"}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => {
            setMode(mode === "signIn" ? "signUp" : "signIn");
            setError("");
          }}
          className="mt-6 w-full text-sm text-ink-soft underline decoration-gold/60 underline-offset-4 hover:text-wine"
        >
          {mode === "signIn" ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
      </section>
    </main>
  );
}
