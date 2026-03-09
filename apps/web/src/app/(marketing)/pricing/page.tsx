import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pricing | Zona Sur Tech - Next Generation SaaS",
};

export default function PricingPage() {
  return (
    <div className="pt-[150px] pb-[120px]">
      <div className="container">
        <h1 className="text-3xl font-bold text-center">Pricing</h1>
        <p className="text-center mt-4">Subscribe to our plans.</p>
      </div>
    </div>
  );
}
