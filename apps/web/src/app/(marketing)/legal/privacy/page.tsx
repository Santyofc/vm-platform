import React from "react";
import { Shield } from "lucide-react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Zona Sur Tech",
  description: "Privacy Policy and data handling for Zona Sur Tech applications and OAuth integrations.",
};

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-20 px-4 md:px-8 bg-zs-bg-primary min-h-screen font-sans">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zs-blue/10 border border-zs-blue/20 text-zs-blue mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Legal & Compliance</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-8">
            Privacy <span className="text-zs-blue">Policy</span>
          </h1>
          <p className="text-zs-text-secondary text-lg leading-relaxed">
            This Privacy Policy explains how Zona Sur Tech collects, uses, and protects your information when you use our platform and authenticate via third-party providers (like Google or GitHub OAuth). 
          </p>
        </div>

        <div className="grid gap-8 text-zs-text-secondary leading-relaxed">
          <section className="zs-card p-8 border-zs-border/50">
            <h2 className="text-2xl font-black text-white uppercase tracking-widest italic mb-4">1. Information we collect</h2>
            <p className="mb-4">
              When you use our services or authenticate using OAuth providers (such as Google or GitHub), we only collect the minimum information necessary to provide you with access to our platform:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-sm">
              <li><strong>Profile Information:</strong> Such as your name, email address, and profile picture provided by the OAuth provider.</li>
              <li><strong>Authentication Data:</strong> OAuth tokens necessary to maintain your secure session.</li>
              <li><strong>Usage Data:</strong> Basic application logs to ensure system reliability and security.</li>
            </ul>
          </section>

          <section className="zs-card p-8 border-zs-border/50">
            <h2 className="text-2xl font-black text-white uppercase tracking-widest italic mb-4">2. How we use information</h2>
            <p className="mb-4">
              The information we collect is used exclusively for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-sm">
              <li>To provide, operate, and maintain your account securely.</li>
              <li>To identify you when you sign in across different devices.</li>
              <li>To send essential administrative and security notifications.</li>
            </ul>
            <div className="mt-4 p-4 border border-zs-emerald/20 bg-zs-emerald/5 rounded-lg">
              <p className="text-zs-emerald font-bold mb-0">
                Data Selling Policy: We do not and will never sell your personal data to third parties.
              </p>
            </div>
          </section>

          <section className="zs-card p-8 border-zs-border/50">
            <h2 className="text-2xl font-black text-white uppercase tracking-widest italic mb-4">3. Data storage and security</h2>
            <p className="mb-4">
              Your data is stored securely using enterprise-grade infrastructure. We implement industry-standard encryption in transit (TLS/SSL) and at rest. Access to personal data is strictly monitored and limited to essential operational integrity.
            </p>
          </section>

          <section className="zs-card p-8 border-zs-border/50">
            <h2 className="text-2xl font-black text-white uppercase tracking-widest italic mb-4">4. Third-party services</h2>
            <p className="mb-4">
              We may utilize trusted third-party services to facilitate our operations:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-sm">
              <li><strong>Authentication:</strong> Supabase, Google, and GitHub for managing secure logins.</li>
              <li><strong>Hosting & Databases:</strong> AWS and Vercel for secure infrastructure hosting.</li>
            </ul>
            <p className="text-sm">
              These providers are bound by strict confidentiality and data protection agreements and cannot use your data for their own independent purposes.
            </p>
          </section>

          <section className="zs-card p-8 border-zs-border/50">
            <h2 className="text-2xl font-black text-white uppercase tracking-widest italic mb-4">5. User rights</h2>
            <p className="mb-4">
              You retain full sovereignty over your data. You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-sm">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request complete deletion of your account and associated data (Right to be Forgotten).</li>
              <li>Revoke OAuth access at any time from your Google or GitHub account settings.</li>
            </ul>
          </section>

          <section className="zs-card p-8 border-zs-border/50">
            <h2 className="text-2xl font-black text-white uppercase tracking-widest italic mb-4">6. Contact information</h2>
            <p className="mb-4">
              If you have any questions, security concerns, or wish to exercise your data rights, please contact our dedicated support and compliance team at:
            </p>
            <p className="font-bold text-white text-lg">
              {siteConfig.contact.emails.support}
            </p>
            <p className="text-sm mt-2">
              Or reach out corporately at: {siteConfig.contact.emails.corporate}
            </p>
          </section>
        </div>

        <div className="mt-20 pt-8 border-t border-zs-border text-center">
          <p className="text-sm text-zs-text-muted italic">
            Last Updated: March 2026. Zona Sur Tech Infrastructure.
          </p>
        </div>
      </div>
    </main>
  );
}
