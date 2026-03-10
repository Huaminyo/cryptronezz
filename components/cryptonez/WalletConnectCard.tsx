"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function WalletConnectCard() {
  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [message, setMessage] = useState("Wallet integration coming soon");

  async function handleConnect() {
    const result = await signIn("credentials", {
      redirect: false,
      name,
      walletAddress,
      captchaToken
    });

    if (result?.ok) {
      setMessage("Wallet session connected successfully.");
      return;
    }

    setMessage("Wallet connect failed. Check name, wallet address, and captcha token.");
  }

  return (
    <div className="glass p-5">
      <h3 className="text-lg font-semibold">Wallet status</h3>
      <p className="mt-2 text-sm text-slate-300">{message}</p>
      <div className="mt-4 grid gap-2">
        <input
          className="rounded-lg bg-black/20 p-2 text-sm"
          placeholder="Display name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="rounded-lg bg-black/20 p-2 text-sm"
          placeholder="Wallet address"
          value={walletAddress}
          onChange={(event) => setWalletAddress(event.target.value)}
        />
        <input
          className="rounded-lg bg-black/20 p-2 text-sm"
          placeholder="Turnstile token"
          value={captchaToken}
          onChange={(event) => setCaptchaToken(event.target.value)}
        />
        <button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold" onClick={handleConnect}>
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
