"use client";

import {title} from "@/components/primitives";
import {InvoiceControls} from "@logi-x/invoice";

export default function InvoicePage() {
  return (
    <div>
      <h1 className={title()}>Invoice</h1>
      <InvoiceControls layout="primary" />
    </div>
  );
}
