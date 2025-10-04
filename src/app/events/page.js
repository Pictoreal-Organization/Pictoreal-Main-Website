// src/app/events/page.js
"use client";

import { Suspense } from "react";
import Picture from "../../components/events/Picture";

export default function EventsPage() {
  return (
    <Suspense fallback={<div>Loading gallery...</div>}>
      <Picture />
    </Suspense>
  );
}
