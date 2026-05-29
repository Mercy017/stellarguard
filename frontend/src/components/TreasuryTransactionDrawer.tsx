"use client";

import { formatAbsoluteDate, formatAddress, formatXlm } from "@/lib/formatters";
import type { TreasuryTransaction } from "@/lib/contractData";
import { CopyButton } from "@/components/CopyButton";

interface TreasuryTransactionDrawerProps {
  /** The transaction to display. When null/undefined the drawer is hidden. */
  selectedTx: TreasuryTransaction;
  onClose: () => void;
}

/**
 * Slide-in drawer that shows the full details of a treasury transaction.
 * Rendered by TreasuryPage when a row is clicked.
 */
export function TreasuryTransactionDrawer({
  selectedTx,
  onClose,
}: TreasuryTransactionDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-stellar-border z-50 p-6 shadow-2xl overflow-y-auto transform transition-transform">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Transaction Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            X
          </button>
        </div>

        <div className="space-y-4">
          {/* ID */}
          <div>
            <p className="text-xs text-gray-500 uppercase">ID</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-sm text-gray-200">#{selectedTx.id}</p>
              <CopyButton
                value={String(selectedTx.id)}
                label={`transaction ${selectedTx.id} id`}
              />
            </div>
          </div>

          {/* Destination */}
          <div>
            <p className="text-xs text-gray-500 uppercase">Destination</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-sm text-gray-200 font-mono break-all">
                {selectedTx.to}
              </p>
              <CopyButton
                value={selectedTx.to}
                label={`transaction ${selectedTx.id} destination address`}
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <p className="text-xs text-gray-500 uppercase">Amount</p>
            <p className="text-sm text-gray-200 mt-1">
              {formatXlm(selectedTx.amount)} XLM
            </p>
          </div>

          {/* Memo */}
          <div>
            <p className="text-xs text-gray-500 uppercase">Memo</p>
            <p className="text-sm text-gray-200 mt-1">
              {selectedTx.memo || "-"}
            </p>
          </div>

          {/* Approvals */}
          <div>
            <p className="text-xs text-gray-500 uppercase">Approvals</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedTx.approvals.length === 0 ? (
                <span className="text-xs text-gray-500">No approvals yet</span>
              ) : (
                selectedTx.approvals.map((approver) => (
                  <span
                    key={`${selectedTx.id}-${approver}`}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300"
                  >
                    {formatAddress(approver, { startChars: 4, endChars: 4 })}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Status / Proposed */}
          <div className="flex gap-4">
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase">Status</p>
              <p className="text-sm text-gray-200 mt-1">
                {selectedTx.executed ? "Executed" : "Pending"}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase">Proposed</p>
              <p className="text-sm text-gray-200 mt-1">
                {formatAbsoluteDate(selectedTx.createdAt * 1000)}
              </p>
            </div>
          </div>

          {/* Confirmed on-chain */}
          {selectedTx.executedAt != null && (
            <div>
              <p className="text-xs text-gray-500 uppercase">
                Confirmed on-chain
              </p>
              <p className="text-sm text-green-400 mt-1 font-medium">
                {formatAbsoluteDate(selectedTx.executedAt * 1000)}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-stellar-border">
          <button className="w-full btn-secondary py-3" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
