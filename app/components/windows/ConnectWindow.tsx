"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Mail, MapPin, AlertCircle } from "lucide-react";
import { CLIENT_INFO, SOCIALS } from "@/app/data/portfolio";

export default function ConnectWindow() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitting(true);

    // Smooth simulation of socket telemetry transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden text-sm">
      {/* Visual coordinates and socials panel (left) */}
      <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-orange-200/10 p-5 flex flex-col justify-between bg-neutral-950/20 overflow-y-auto">
        <div className="space-y-5">
          <div>
            <span className="text-[10px] font-mono text-pink-300 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-300/20 uppercase tracking-widest block w-fit mb-2">
              secure_channel
            </span>
            <h3 className="text-xl font-display font-medium text-orange-50 select-none">
              Connect Protocols
            </h3>
            <p className="text-xs text-orange-200/60 font-sans mt-1.5 leading-relaxed">
              Initiate full duplex telemetry with root system. Send an encrypted
              message or ping my public handle.
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-orange-200/10 text-xs">
            <span className="text-[10px] font-mono text-orange-200/30 uppercase block select-none">
              COORDINATES
            </span>
            <div className="space-y-2 font-mono text-orange-200/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-300/70" />
                <span>LOC: {CLIENT_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-300/70" />
                <a
                  href={`mailto:${CLIENT_INFO.email}`}
                  className="hover:text-orange-200 hover:underline"
                >
                  {CLIENT_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Connected Handle Grid */}
          <div className="space-y-3 pt-3 border-t border-orange-200/10">
            <span className="text-[10px] font-mono text-orange-200/30 uppercase block select-none">
              PUBLIC KEY IDENTITIES
            </span>
            <div className="grid grid-cols-2 gap-2">
              {SOCIALS.map((soc) => (
                <a
                  key={soc.platform}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  id={`connect-social-${soc.platform.toLowerCase()}`}
                  className="px-3 py-2 bg-black/40 border border-orange-200/10 hover:border-orange-200/30 hover:bg-black/60 rounded-lg flex flex-col gap-1 transition-all group"
                >
                  <span className="text-[10px] font-mono text-orange-300/70 group-hover:text-orange-200 transition-colors">
                    {soc.platform}
                  </span>
                  <span className="text-[11px] font-mono text-orange-100/50 group-hover:text-orange-100 truncate transition-colors">
                    {soc.username}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-[10px] font-mono text-orange-200/30 pt-4 flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3 text-pink-300" />
          <span>AES-256 telemetry verified</span>
        </div>
      </div>

      {/* Interactive Form Panel (right) */}
      <div className="flex-1 overflow-y-auto p-5 md:p-6 bg-neutral-950/10 flex flex-col justify-center">
        {isSubmitted ? (
          <div className="text-center space-y-4 max-w-sm mx-auto p-5 bg-black/30 border border-emerald-500/20 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-mono font-medium text-emerald-300 uppercase tracking-wider">
                Telemetry Transmitted!
              </h4>
              <p className="text-xs text-white/60">
                Your message packet has been encrypted and queued. I will
                process and respond as soon as my uplink resolves.
              </p>
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              id="connect-btn-again"
              className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-orange-200/10 rounded-lg text-xs font-mono text-orange-100 transition-colors"
            >
              TRANSMIT_NEW_PACKET
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <span className="text-[10px] font-mono text-orange-300/80 uppercase tracking-widest block">
              TARGET // PORT_22_COMMUNICATIONS
            </span>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-orange-200/50">
                NAME / IDENTITY
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Secure operator name"
                id="connect-input-name"
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-orange-200/10 focus:border-orange-300/40 text-orange-50 text-xs font-mono outline-none transition-all placeholder:text-neutral-700 placeholder:font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-orange-200/50">
                EMAIL_REPLY_UPLINK
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@cryptonail.com"
                id="connect-input-email"
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-orange-200/10 focus:border-orange-300/40 text-orange-50 text-xs font-mono outline-none transition-all placeholder:text-neutral-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-orange-200/50">
                PACKET_BODY / MESSAGE
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your telemetry requirements here..."
                id="connect-input-message"
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-orange-200/10 focus:border-orange-300/40 text-orange-50 text-xs outline-none transition-all placeholder:text-neutral-700 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              id="connect-submit-btn"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-orange-400/20 to-pink-500/20 hover:brightness-110 border border-orange-300/30 rounded-lg text-xs font-mono text-orange-100 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-orange-200/30 border-t-orange-100 rounded-full animate-spin"></span>
                  <span>ENCRYPTING_PACKETS...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>DISPATCH_MESSAGE</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
