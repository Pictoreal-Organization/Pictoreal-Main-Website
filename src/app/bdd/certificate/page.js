"use client";

import React from "react";
import DonorCertificates from "../../../components/bdd/certificate/certi";
import { Toaster } from "react-hot-toast";

export default function DonorCertificatesPage() {
  return (
    <main>
      <Toaster position="top-center" />
      

      <DonorCertificates />
    </main>
  );
}