import React, { useState } from 'react';
import { WalletTransaction, StudentProfile } from '../types';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  CheckCircle2,
  Building,
  CreditCard,
  History,
  DollarSign,
  Lock,
  Download,
  Landmark,
} from 'lucide-react';

interface WalletViewProps {
  availableBalance: number;
  inEscrowBalance: number;
  lifetimeEarnings: number;
  transactions: WalletTransaction[];
  onWithdraw: (amount: number, method: string, accountDetails: string) => void;
  student: StudentProfile;
}

export const WalletView: React.FC<WalletViewProps> = ({
  availableBalance,
  inEscrowBalance,
  lifetimeEarnings,
  transactions,
  onWithdraw,
  student,
}) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(Math.min(availableBalance, 500));
  const [withdrawMethod, setWithdrawMethod] = useState<'ach' | 'venmo' | 'stripe'>('ach');
  const [accountDetails, setAccountDetails] = useState('Chase College Checking (...4821)');

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0 || withdrawAmount > availableBalance) return;
    onWithdraw(withdrawAmount, withdrawMethod, accountDetails);
    setShowWithdrawModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            <Landmark className="w-4 h-4 text-emerald-600" />
            <span>Collegiate Student Treasury & Payouts</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-neutral-900 tracking-tight">
            Earnings & Wallet
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Transparent payouts, zero unexpected hidden fees, and instant transfer to your collegiate checking account.
          </p>
        </div>

        <button
          onClick={() => {
            setWithdrawAmount(availableBalance);
            setShowWithdrawModal(true);
          }}
          disabled={availableBalance <= 0}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 rounded-xl transition-colors flex items-center gap-2 shadow-xs shrink-0 self-start sm:self-auto"
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>Withdraw to Bank</span>
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Available Balance */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Available Balance
            </span>
            <span className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-neutral-900 tabular-nums">
              ${availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Cleared for immediate zero-fee transfer
            </p>
          </div>
        </div>

        {/* In Escrow */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Locked in Escrow
            </span>
            <span className="p-2 bg-amber-50 text-amber-700 rounded-lg">
              <Lock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-neutral-900 tabular-nums">
              ${inEscrowBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Secured by clients, releases upon milestone delivery
            </p>
          </div>
        </div>

        {/* Lifetime Earnings */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Lifetime Earned
            </span>
            <span className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
              <Wallet className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-neutral-900 tabular-nums">
              ${lifetimeEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Directly funded student tuition & living expenses
            </p>
          </div>
        </div>
      </div>

      {/* Transaction History Ledger */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-bold text-neutral-900 flex items-center gap-2">
            <History className="w-5 h-5 text-neutral-500" />
            <span>Transaction Ledger & Receipts</span>
          </h3>
          <span className="text-xs text-neutral-500">
            {transactions.length} recorded entries
          </span>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-xs sm:text-sm">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-neutral-600 whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-neutral-900">
                      {tx.description}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {tx.type === 'milestone_release' && (
                        <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium inline-flex items-center gap-1">
                          <ArrowDownLeft className="w-3 h-3 text-emerald-600" />
                          Escrow Payout
                        </span>
                      )}
                      {tx.type === 'withdrawal' && (
                        <span className="text-xs text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded font-medium inline-flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                          Bank Withdrawal
                        </span>
                      )}
                      {tx.type === 'escrow_deposit' && (
                        <span className="text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-medium">
                          Escrow Deposit
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold tabular-nums whitespace-nowrap">
                      <span className={tx.type === 'withdrawal' ? 'text-neutral-800' : 'text-emerald-700'}>
                        {tx.type === 'withdrawal' ? '-' : '+'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="text-xs text-emerald-700 font-medium">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl border border-neutral-200 space-y-5">
            <div>
              <div className="text-xs text-neutral-500 uppercase font-semibold">Student Payout Transfer</div>
              <h3 className="text-xl font-display font-bold text-neutral-900 mt-0.5">
                Withdraw Available Earnings
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Available balance: ${availableBalance.toFixed(2)} USD
              </p>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Amount to Withdraw ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-neutral-400 font-mono">$</span>
                  <input
                    type="number"
                    min={10}
                    max={availableBalance}
                    step={10}
                    required
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 border border-neutral-300 rounded-xl font-mono text-base focus:outline-none focus:ring-2 focus:ring-neutral-900 tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Payout Method
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setWithdrawMethod('ach');
                      setAccountDetails('Chase College Checking (...4821)');
                    }}
                    className={`p-2.5 rounded-xl border text-center font-medium transition-colors ${
                      withdrawMethod === 'ach'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    Direct ACH
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setWithdrawMethod('venmo');
                      setAccountDetails(`@${student.name.replace(/\s+/g, '').toLowerCase()}`);
                    }}
                    className={`p-2.5 rounded-xl border text-center font-medium transition-colors ${
                      withdrawMethod === 'venmo'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    Venmo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setWithdrawMethod('stripe');
                      setAccountDetails('Stripe Express Instant');
                    }}
                    className={`p-2.5 rounded-xl border text-center font-medium transition-colors ${
                      withdrawMethod === 'stripe'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    Stripe
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Receiving Account Details
                </label>
                <input
                  type="text"
                  required
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600">
                Transfers typically arrive within 1-2 business days with 0% platform withdrawal fee.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg flex items-center gap-1.5 shadow-xs"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Confirm Payout of ${withdrawAmount}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
