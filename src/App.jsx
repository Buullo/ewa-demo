import React from 'react';
const { useState, useEffect, useRef } = React;

// ─── DESIGN SYSTEM ───────────────────────────────────────────
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0a0d12;
    --surface:   #111520;
    --surface2:  #181e2e;
    --border:    rgba(255,255,255,0.07);
    --border2:   rgba(255,255,255,0.12);
    --text:      #f0f2f8;
    --muted:     #6b7490;
    --accent:    #4ade80;
    --accent2:   #22d3ee;
    --warn:      #fb923c;
    --danger:    #f87171;
    --gold:      #fbbf24;
    --purple:    #a78bfa;
    --radius:    14px;
    --radius-sm: 8px;
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: .6; }
    100% { transform: scale(1.8); opacity: 0;  }
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-6px); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes countUp {
    from { opacity:0; transform:scale(.8); }
    to   { opacity:1; transform:scale(1); }
  }

  .fade-up { animation: fadeUp .45s cubic-bezier(.22,1,.36,1) both; }
  .fade-up-1 { animation-delay: .05s; }
  .fade-up-2 { animation-delay: .10s; }
  .fade-up-3 { animation-delay: .15s; }
  .fade-up-4 { animation-delay: .20s; }

  /* Layout */
  .app { display: flex; min-height: 100vh; }
  .sidebar {
    width: 230px; min-height: 100vh; background: var(--surface);
    border-right: 1px solid var(--border); display: flex; flex-direction: column;
    padding: 0; position: fixed; top: 0; left: 0; bottom: 0; z-index: 100;
    transition: transform .3s;
  }
  .main { margin-left: 230px; flex: 1; min-height: 100vh; background: var(--bg); }
  .page { padding: 32px 36px; max-width: 1200px; }

  /* Sidebar */
  .sidebar-logo {
    padding: 24px 20px 20px;
    border-bottom: 1px solid var(--border);
  }
  .logo-mark {
    display: flex; align-items: center; gap: 10px;
  }
  .logo-icon {
    width: 36px; height: 36px; background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 14px; color: #000;
  }
  .logo-text { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: -.3px; }
  .logo-sub  { font-size: 10px; color: var(--muted); letter-spacing: .5px; text-transform: uppercase; margin-top: 1px; }

  .sidebar-nav { flex: 1; padding: 12px 10px; display: flex; flex-direction: column; gap: 2px; }
  .nav-section-label {
    font-size: 10px; font-weight: 500; color: var(--muted); letter-spacing: 1px;
    text-transform: uppercase; padding: 12px 10px 6px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 9px 12px;
    border-radius: var(--radius-sm); cursor: pointer; transition: all .2s;
    font-size: 13.5px; font-weight: 400; color: var(--muted);
    border: 1px solid transparent;
  }
  .nav-item:hover { background: var(--surface2); color: var(--text); }
  .nav-item.active {
    background: linear-gradient(135deg, rgba(74,222,128,.12), rgba(34,211,238,.08));
    color: var(--accent); border-color: rgba(74,222,128,.2); font-weight: 500;
  }
  .nav-icon { font-size: 16px; width: 20px; text-align: center; }
  .nav-badge {
    margin-left: auto; background: var(--warn); color: #000;
    font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 20px;
  }

  .sidebar-user {
    padding: 14px 16px; border-top: 1px solid var(--border);
    display: flex; align-items: center; gap: 10px;
  }
  .user-avatar {
    width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center;
    justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0;
  }
  .user-name  { font-size: 13px; font-weight: 500; }
  .user-role  { font-size: 11px; color: var(--muted); }

  /* Role switcher */
  .role-switcher {
    display: flex; gap: 4px; padding: 4px; background: var(--surface2);
    border-radius: 10px; margin: 0 10px 4px;
  }
  .role-btn {
    flex: 1; padding: 6px 4px; border-radius: 7px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
    transition: all .2s; background: transparent; color: var(--muted);
  }
  .role-btn.active { background: var(--surface); color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,.4); }

  /* Top bar */
  .topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 36px; border-bottom: 1px solid var(--border);
    background: var(--bg); position: sticky; top: 0; z-index: 10;
    backdrop-filter: blur(20px);
  }
  .topbar-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; }
  .topbar-actions { display: flex; align-items: center; gap: 12px; }
  .notif-btn {
    position: relative; width: 36px; height: 36px; border-radius: 10px;
    background: var(--surface); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    font-size: 16px; transition: all .2s;
  }
  .notif-btn:hover { background: var(--surface2); }
  .notif-dot {
    position: absolute; top: 6px; right: 6px; width: 8px; height: 8px;
    background: var(--danger); border-radius: 50%; border: 2px solid var(--bg);
  }

  /* Cards */
  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 22px 24px;
  }
  .card-glass {
    background: rgba(17,21,32,.7); backdrop-filter: blur(20px);
    border: 1px solid var(--border2);
  }

  /* Stat cards */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .stat-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 20px 22px; position: relative; overflow: hidden;
    transition: transform .2s, border-color .2s;
  }
  .stat-card:hover { transform: translateY(-2px); border-color: var(--border2); }
  .stat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  }
  .stat-card.green::before { background: linear-gradient(90deg, var(--accent), transparent); }
  .stat-card.blue::before  { background: linear-gradient(90deg, var(--accent2), transparent); }
  .stat-card.warn::before  { background: linear-gradient(90deg, var(--warn), transparent); }
  .stat-card.purple::before { background: linear-gradient(90deg, var(--purple), transparent); }
  .stat-icon {
    width: 38px; height: 38px; border-radius: 10px; display: flex;
    align-items: center; justify-content: center; font-size: 18px; margin-bottom: 14px;
  }
  .stat-value {
    font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800;
    line-height: 1; margin-bottom: 4px; animation: countUp .6s ease both;
  }
  .stat-label { font-size: 12px; color: var(--muted); }
  .stat-change { font-size: 11px; margin-top: 8px; }
  .stat-change.up   { color: var(--accent); }
  .stat-change.down { color: var(--danger); }

  /* Progress bar */
  .progress-wrap { margin-top: 14px; }
  .progress-label { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); margin-bottom: 6px; }
  .progress-track { height: 6px; background: var(--surface2); border-radius: 3px; overflow: hidden; }
  .progress-fill  { height: 100%; border-radius: 3px; transition: width 1s cubic-bezier(.22,1,.36,1); }

  /* EWA Request Widget */
  .ewa-hero {
    background: linear-gradient(135deg, rgba(74,222,128,.08) 0%, rgba(34,211,238,.05) 50%, transparent 100%);
    border: 1px solid rgba(74,222,128,.2); border-radius: 18px; padding: 28px 32px;
    position: relative; overflow: hidden;
  }
  .ewa-hero::before {
    content: ''; position: absolute; top: -60px; right: -60px;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(74,222,128,.08), transparent 70%);
    pointer-events: none;
  }
  .earned-amount {
    font-family: 'Syne', sans-serif; font-size: 42px; font-weight: 800;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    line-height: 1; margin: 6px 0;
  }
  .amount-sub { font-size: 13px; color: var(--muted); }

  /* Slider */
  .slider-wrap { margin: 20px 0; }
  .ewa-slider {
    width: 100%; height: 6px; border-radius: 3px; outline: none; cursor: pointer;
    appearance: none; background: linear-gradient(90deg, var(--accent) var(--val,50%), var(--surface2) var(--val,50%));
  }
  .ewa-slider::-webkit-slider-thumb {
    appearance: none; width: 20px; height: 20px; border-radius: 50%;
    background: var(--accent); border: 3px solid var(--bg); cursor: pointer;
    box-shadow: 0 0 0 4px rgba(74,222,128,.2);
  }
  .slider-labels { display: flex; justify-content: space-between; font-size: 11px; color: var(--muted); margin-top: 8px; }

  /* Buttons */
  .btn {
    display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px;
    border-radius: var(--radius-sm); border: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
    font-size: 13.5px; font-weight: 500; transition: all .2s; text-decoration: none;
  }
  .btn-primary {
    background: linear-gradient(135deg, var(--accent), #16a34a);
    color: #000; font-weight: 600;
  }
  .btn-primary:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(74,222,128,.3); }
  .btn-ghost {
    background: var(--surface2); color: var(--text); border: 1px solid var(--border);
  }
  .btn-ghost:hover { border-color: var(--border2); }
  .btn-danger { background: rgba(248,113,113,.15); color: var(--danger); border: 1px solid rgba(248,113,113,.3); }
  .btn-danger:hover { background: rgba(248,113,113,.25); }
  .btn-approve { background: rgba(74,222,128,.15); color: var(--accent); border: 1px solid rgba(74,222,128,.3); }
  .btn-approve:hover { background: rgba(74,222,128,.25); }
  .btn-lg { padding: 13px 28px; font-size: 15px; border-radius: 12px; }
  .btn:disabled { opacity: .5; cursor: not-allowed; transform: none !important; }

  /* Badge/Status */
  .badge {
    display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px;
    border-radius: 20px; font-size: 11.5px; font-weight: 500;
  }
  .badge-dot { width: 6px; height: 6px; border-radius: 50%; }
  .badge.pending  { background: rgba(251,191,36,.12); color: var(--gold); }
  .badge.approved { background: rgba(74,222,128,.12); color: var(--accent); }
  .badge.rejected { background: rgba(248,113,113,.12); color: var(--danger); }
  .badge.paid     { background: rgba(34,211,238,.12);  color: var(--accent2); }
  .badge.processing { background: rgba(167,139,250,.12); color: var(--purple); }

  /* Table */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  thead th {
    text-align: left; font-size: 11px; font-weight: 500; color: var(--muted);
    letter-spacing: .6px; text-transform: uppercase; padding: 10px 14px;
    border-bottom: 1px solid var(--border);
  }
  tbody tr { transition: background .15s; }
  tbody tr:hover { background: rgba(255,255,255,.025); }
  tbody td { padding: 13px 14px; font-size: 13.5px; border-bottom: 1px solid var(--border); }
  .td-name { font-weight: 500; }
  .td-sub  { font-size: 11.5px; color: var(--muted); margin-top: 2px; }

  /* Avatar */
  .avatar {
    width: 34px; height: 34px; border-radius: 50%; display: flex;
    align-items: center; justify-content: center; font-size: 12px; font-weight: 700;
    flex-shrink: 0;
  }
  .avatar-sm { width: 28px; height: 28px; font-size: 11px; }
  .flex-gap  { display: flex; align-items: center; gap: 10px; }

  /* Grid layouts */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }

  /* Section header */
  .section-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .section-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; }
  .section-sub   { font-size: 12px; color: var(--muted); margin-top: 2px; }

  /* Timeline */
  .timeline { display: flex; flex-direction: column; gap: 0; }
  .tl-item { display: flex; gap: 14px; padding: 12px 0; position: relative; }
  .tl-item:not(:last-child)::before {
    content: ''; position: absolute; left: 15px; top: 36px; bottom: 0;
    width: 1px; background: var(--border);
  }
  .tl-dot {
    width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 13px;
    border: 2px solid var(--border);
  }
  .tl-dot.done { background: rgba(74,222,128,.15); border-color: var(--accent); }
  .tl-dot.active { background: rgba(251,191,36,.15); border-color: var(--gold); }
  .tl-dot.pending-dot { background: var(--surface2); }
  .tl-content { flex: 1; }
  .tl-title { font-size: 13.5px; font-weight: 500; }
  .tl-time  { font-size: 11.5px; color: var(--muted); margin-top: 2px; }

  /* Alert */
  .alert {
    display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px;
    border-radius: var(--radius-sm); margin-bottom: 16px;
  }
  .alert-info    { background: rgba(34,211,238,.08);  border: 1px solid rgba(34,211,238,.2); }
  .alert-success { background: rgba(74,222,128,.08);  border: 1px solid rgba(74,222,128,.2); }
  .alert-warn    { background: rgba(251,191,36,.08);  border: 1px solid rgba(251,191,36,.2); }
  .alert-icon { font-size: 16px; margin-top: 1px; }
  .alert-text { font-size: 13px; line-height: 1.5; }
  .alert-text strong { display: block; margin-bottom: 2px; }

  /* Input */
  .input-group { margin-bottom: 16px; }
  .input-label { font-size: 12px; font-weight: 500; color: var(--muted); margin-bottom: 6px; display: block; }
  .input {
    width: 100%; padding: 10px 14px; background: var(--surface2);
    border: 1px solid var(--border); border-radius: var(--radius-sm);
    color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px;
    outline: none; transition: border-color .2s;
  }
  .input:focus { border-color: var(--accent); }

  /* Modal */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.7); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center; z-index: 1000;
    animation: fadeUp .2s ease;
  }
  .modal {
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: 20px; padding: 28px; width: 480px; max-width: 90vw;
    animation: fadeUp .3s cubic-bezier(.22,1,.36,1);
  }
  .modal-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 6px; }
  .modal-sub   { font-size: 13px; color: var(--muted); margin-bottom: 22px; }

  /* Chart bar */
  .bar-chart { display: flex; align-items: flex-end; gap: 8px; height: 80px; padding-top: 10px; }
  .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .bar-fill {
    width: 100%; border-radius: 4px 4px 0 0; min-height: 4px;
    background: linear-gradient(180deg, var(--accent2), rgba(34,211,238,.3));
    transition: height .8s cubic-bezier(.22,1,.36,1);
  }
  .bar-label { font-size: 10px; color: var(--muted); }

  /* Pulse */
  .pulse-wrap { position: relative; display: inline-flex; }
  .pulse-ring {
    position: absolute; inset: -4px; border-radius: 50%;
    border: 2px solid var(--accent); animation: pulse-ring 2s ease-out infinite;
  }

  /* Divider */
  .divider { height: 1px; background: var(--border); margin: 20px 0; }

  /* Page transition */
  .page-enter { animation: fadeUp .35s cubic-bezier(.22,1,.36,1); }

  /* Empty state */
  .empty { text-align: center; padding: 48px 24px; color: var(--muted); }
  .empty-icon { font-size: 40px; margin-bottom: 12px; }
  .empty-text { font-size: 14px; }

  /* Toast */
  .toast-wrap { position: fixed; bottom: 28px; right: 28px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
  .toast {
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: 12px; padding: 13px 18px; display: flex; align-items: center; gap: 10px;
    font-size: 13.5px; min-width: 260px; box-shadow: 0 8px 30px rgba(0,0,0,.4);
    animation: fadeUp .3s cubic-bezier(.22,1,.36,1);
  }
  .toast.success { border-color: rgba(74,222,128,.35); }
  .toast.error   { border-color: rgba(248,113,113,.35); }

  /* Responsive (basic) */
  @media (max-width: 1024px) {
    .stats-grid { grid-template-columns: repeat(2,1fr); }
    .grid-3 { grid-template-columns: 1fr 1fr; }
  }
`;
document.head.appendChild(style);

// ─── MOCK DATA ────────────────────────────────────────────────
const EMPLOYEES = [
  { id: 1, name: "สมชาย ใจดี",    role: "Software Engineer", dept: "Engineering", salary: 65000, worked: 18, avatar: "สช", color: "#4ade80" },
  { id: 2, name: "วิมล สุขสันต์",  role: "HR Manager",        dept: "Human Resources", salary: 55000, worked: 20, avatar: "วม", color: "#22d3ee" },
  { id: 3, name: "ประภาส มีสุข",  role: "Finance Analyst",   dept: "Finance",     salary: 52000, worked: 15, avatar: "ปภ", color: "#a78bfa" },
  { id: 4, name: "นริศา ดีงาม",   role: "Product Manager",   dept: "Product",     salary: 70000, worked: 22, avatar: "นร", color: "#fb923c" },
];

const REQUESTS = [
  { id: "EWA-2501", empId: 1, amount: 15000, requested: "2 ชั่วโมงที่แล้ว", reason: "ค่าซ่อมรถฉุกเฉิน",  status: "pending",   bank: "SCB ••••4521" },
  { id: "EWA-2500", empId: 4, amount: 20000, requested: "5 ชั่วโมงที่แล้ว", reason: "ค่าเล่าเรียนบุตร",  status: "approved",  bank: "KBank ••••7823" },
  { id: "EWA-2499", empId: 3, amount: 10000, requested: "1 วันที่แล้ว",     reason: "ค่ารักษาพยาบาล",  status: "paid",      bank: "BBL ••••3341" },
  { id: "EWA-2498", empId: 1, amount: 8000,  requested: "2 วันที่แล้ว",     reason: "ค่าเดินทาง",      status: "paid",      bank: "SCB ••••4521" },
  { id: "EWA-2497", empId: 2, amount: 12000, requested: "3 วันที่แล้ว",     reason: "ซ่อมบ้านฉุกเฉิน", status: "rejected",  bank: "KTB ••••9012" },
  { id: "EWA-2496", empId: 4, amount: 5000,  requested: "4 วันที่แล้ว",     reason: "ค่าใช้จ่ายทั่วไป", status: "paid",     bank: "KBank ••••7823" },
];

const TRANSACTIONS = [
  { id: "TXN-8831", date: "8 มี.ค. 68", time: "14:23", amount: 15000, to: "SCB ••••4521",  status: "processing", ref: "OMISE-trsf-001" },
  { id: "TXN-8830", date: "8 มี.ค. 68", time: "09:11", amount: 20000, to: "KBank ••••7823", status: "paid",       ref: "OMISE-trsf-002" },
  { id: "TXN-8829", date: "7 มี.ค. 68", time: "16:45", amount: 10000, to: "BBL ••••3341",   status: "paid",       ref: "OMISE-trsf-003" },
  { id: "TXN-8828", date: "6 มี.ค. 68", time: "10:02", amount: 8000,  to: "SCB ••••4521",   status: "paid",       ref: "OMISE-trsf-004" },
  { id: "TXN-8827", date: "5 มี.ค. 68", time: "13:30", amount: 5000,  to: "KBank ••••7823", status: "paid",       ref: "OMISE-trsf-005" },
];

const BAR_DATA = [
  { label: "ต.ค.", val: 55 }, { label: "พ.ย.", val: 70 }, { label: "ธ.ค.", val: 45 },
  { label: "ม.ค.", val: 80 }, { label: "ก.พ.", val: 65 }, { label: "มี.ค.", val: 88 },
];

// ─── HELPERS ─────────────────────────────────────────────────
const fmt = (n) => `฿${n.toLocaleString()}`;
const statusLabel = { pending: "รอ Approve", approved: "อนุมัติแล้ว", rejected: "ปฏิเสธ", paid: "โอนแล้ว", processing: "กำลังโอน" };

function Toast({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span>{t.type === "success" ? "✅" : "❌"}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

function Avatar({ emp, size = "" }) {
  return (
    <div className={`avatar ${size}`} style={{ background: emp.color + "22", color: emp.color }}>
      {emp.avatar}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = { pending: ["pending", "🕐"], approved: ["approved", "✓"], rejected: ["rejected", "✕"], paid: ["paid", "💸"], processing: ["processing", "⟳"] };
  const [cls, icon] = map[status] || ["pending", "?"];
  return <span className={`badge ${cls}`}><span>{icon}</span>{statusLabel[status]}</span>;
}

// ─── PAGES ───────────────────────────────────────────────────

// ── Employee Dashboard ──
function EmployeePage({ addToast }) {
  const emp = EMPLOYEES[0];
  const earned = Math.round(emp.salary * (emp.worked / 30));
  const maxWithdraw = Math.round(earned * 0.5);
  const withdrawn = 23000;
  const available = maxWithdraw - withdrawn;
  const [sliderVal, setSliderVal] = useState(5000);
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const sliderRef = useRef(null);

  const myRequests = REQUESTS.filter(r => r.empId === 1);

  function updateSlider(v) {
    setSliderVal(v);
    if (sliderRef.current) {
      const pct = ((v - 1000) / (available - 1000)) * 100;
      sliderRef.current.style.setProperty("--val", pct + "%");
    }
  }

  function handleSubmit() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowModal(false);
      addToast("success", `ส่งคำขอ ${fmt(sliderVal)} เรียบร้อย รอ HR อนุมัติ`);
      setReason("");
    }, 1800);
  }

  return (
    <div className="page page-enter">
      <div className="section-hd fade-up">
        <div>
          <div className="section-title">สวัสดี, {emp.name} 👋</div>
          <div className="section-sub">{emp.role} · {emp.dept}</div>
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>
          วันที่ {emp.worked} จาก 30 วันทำงาน
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, marginTop: 20 }}>

        {/* EWA Hero */}
        <div className="ewa-hero fade-up fade-up-1">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
                ยอดที่ถอนได้วันนี้
              </div>
              <div className="earned-amount">{fmt(available)}</div>
              <div className="amount-sub">จากยอดที่ทำงานสะสม {fmt(earned)} · ถอนไปแล้ว {fmt(withdrawn)}</div>
            </div>
            <div className="pulse-wrap">
              <div className="pulse-ring" />
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, color: "#000"
              }}>💰</div>
            </div>
          </div>

          <div className="progress-wrap">
            <div className="progress-label">
              <span>ใช้ไปแล้ว</span>
              <span>{Math.round(withdrawn / maxWithdraw * 100)}% ของวงเงิน</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{
                width: `${withdrawn / maxWithdraw * 100}%`,
                background: "linear-gradient(90deg, var(--accent), var(--accent2))"
              }} />
            </div>
          </div>

          <div className="divider" style={{ margin: "18px 0" }} />

          <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13 }}>เลือกจำนวนที่ต้องการถอน</span>
            <span style={{ fontFamily: "Syne", fontWeight: 700, color: "var(--accent)" }}>{fmt(sliderVal)}</span>
          </div>
          <div className="slider-wrap">
            <input
              ref={sliderRef} type="range" className="ewa-slider"
              min={1000} max={available} step={500} value={sliderVal}
              onChange={e => updateSlider(+e.target.value)}
            />
            <div className="slider-labels"><span>฿1,000</span><span>{fmt(available)}</span></div>
          </div>

          <button className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
            onClick={() => setShowModal(true)}>
            <span>ขอถอนเงินล่วงหน้า</span> <span>→</span>
          </button>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Salary card */}
          <div className="card fade-up fade-up-2">
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12, textTransform: "uppercase", letterSpacing: .6 }}>ข้อมูลเงินเดือน</div>
            {[
              ["เงินเดือน", fmt(emp.salary), "var(--text)"],
              ["ทำงานมาแล้ว", `${emp.worked} วัน`, "var(--text)"],
              ["Earned ถึงวันนี้", fmt(earned), "var(--accent)"],
              ["วงเงิน EWA (50%)", fmt(maxWithdraw), "var(--accent2)"],
            ].map(([label, val, color]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Alert */}
          <div className="alert alert-info fade-up fade-up-3">
            <div className="alert-icon">ℹ️</div>
            <div className="alert-text">
              <strong>วันจ่ายเงินเดือน 31 มี.ค.</strong>
              ยอด EWA ที่ถอนจะถูกหักอัตโนมัติจากเงินเดือน
            </div>
          </div>
        </div>
      </div>

      {/* My requests */}
      <div style={{ marginTop: 28 }} className="fade-up fade-up-4">
        <div className="section-hd">
          <div className="section-title">ประวัติการขอ EWA</div>
        </div>
        <div className="card" style={{ padding: 0 }}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Request ID</th><th>จำนวน</th><th>เหตุผล</th><th>บัญชีรับโอน</th><th>วันที่</th><th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {myRequests.map(r => (
                  <tr key={r.id}>
                    <td style={{ fontFamily: "monospace", fontSize: 12, color: "var(--muted)" }}>{r.id}</td>
                    <td style={{ fontWeight: 600, color: "var(--accent)" }}>{fmt(r.amount)}</td>
                    <td>{r.reason}</td>
                    <td style={{ fontSize: 12, color: "var(--muted)" }}>{r.bank}</td>
                    <td style={{ fontSize: 12, color: "var(--muted)" }}>{r.requested}</td>
                    <td><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-title">ยืนยันคำขอถอนเงิน</div>
            <div className="modal-sub">ส่งคำขอให้ HR อนุมัติก่อนโอนเงิน</div>

            <div style={{
              background: "linear-gradient(135deg, rgba(74,222,128,.08), rgba(34,211,238,.05))",
              border: "1px solid rgba(74,222,128,.2)", borderRadius: 12, padding: "16px 20px", marginBottom: 20
            }}>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>จำนวนที่ขอถอน</div>
              <div style={{ fontFamily: "Syne", fontSize: 32, fontWeight: 800, color: "var(--accent)" }}>{fmt(sliderVal)}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>โอนเข้า {emp.name.split(" ")[0]}'s SCB ••••4521</div>
            </div>

            <div className="input-group">
              <label className="input-label">เหตุผลการขอถอน</label>
              <input className="input" placeholder="เช่น ค่ารักษาพยาบาล, ค่าซ่อมรถ..." value={reason} onChange={e => setReason(e.target.value)} />
            </div>

            <div className="timeline" style={{ marginBottom: 20 }}>
              {[
                ["done", "ยื่นคำขอ", "ทันที"],
                ["active", "HR อนุมัติ", "ภายใน 2-4 ชั่วโมง"],
                ["pending-dot", "โอนเงิน", "ภายใน 30 นาทีหลัง approve"],
              ].map(([dot, title, time]) => (
                <div className="tl-item" key={title}>
                  <div className={`tl-dot ${dot}`}>{dot === "done" ? "✓" : dot === "active" ? "⏱" : "○"}</div>
                  <div className="tl-content">
                    <div className="tl-title">{title}</div>
                    <div className="tl-time">{time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowModal(false)}>ยกเลิก</button>
              <button className="btn btn-primary" style={{ flex: 2, justifyContent: "center" }}
                disabled={loading || !reason}
                onClick={handleSubmit}>
                {loading ? <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> : null}
                {loading ? " กำลังส่ง..." : "ยืนยันส่งคำขอ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── HR Approval ──
function HRPage({ addToast }) {
  const [requests, setRequests] = useState(REQUESTS);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const pending = requests.filter(r => r.status === "pending");
  const filtered = filter === "all" ? requests : requests.filter(r => r.status === filter);

  function approve(id) {
    setRequests(r => r.map(x => x.id === id ? { ...x, status: "approved" } : x));
    setSelected(null);
    addToast("success", `อนุมัติ ${id} เรียบร้อย กำลังโอนเงิน...`);
  }
  function reject(id) {
    setRequests(r => r.map(x => x.id === id ? { ...x, status: "rejected" } : x));
    setSelected(null);
    addToast("error", `ปฏิเสธ ${id} แล้ว`);
  }

  const sel = selected ? requests.find(r => r.id === selected) : null;
  const selEmp = sel ? EMPLOYEES.find(e => e.id === sel.empId) : null;

  return (
    <div className="page page-enter">
      <div className="section-hd fade-up">
        <div>
          <div className="section-title">HR Approval Dashboard</div>
          <div className="section-sub">จัดการคำขอถอนเงินล่วงหน้าของพนักงาน</div>
        </div>
        {pending.length > 0 && (
          <div className="alert alert-warn" style={{ margin: 0, padding: "8px 14px" }}>
            <span>⚠️</span>
            <span style={{ fontSize: 13 }}>มี <strong>{pending.length} รายการ</strong> รอการอนุมัติ</span>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginTop: 20 }} className="fade-up fade-up-1">
        {[
          ["🕐", "รอ Approve", pending.length, "warn"],
          ["✅", "อนุมัติวันนี้", 3, "green"],
          ["💸", "โอนแล้ว", 8, "blue"],
          ["❌", "ปฏิเสธ", 1, "purple"],
        ].map(([icon, label, val, color]) => (
          <div key={label} className={`stat-card ${color}`}>
            <div className="stat-icon" style={{ background: `var(--${color === "blue" ? "accent2" : color === "green" ? "accent" : color === "warn" ? "warn" : "purple"})22` }}>{icon}</div>
            <div className="stat-value">{val}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginTop: 24, alignItems: "start" }}>
        {/* List */}
        <div className="fade-up fade-up-2">
          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            {[["all","ทั้งหมด"],["pending","รอ Approve"],["approved","อนุมัติ"],["paid","โอนแล้ว"],["rejected","ปฏิเสธ"]].map(([v, l]) => (
              <button key={v} className="btn btn-ghost" style={{ padding: "5px 12px", fontSize: 12, ...(filter === v ? { borderColor: "var(--accent)", color: "var(--accent)" } : {}) }}
                onClick={() => setFilter(v)}>{l}</button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map(r => {
              const emp = EMPLOYEES.find(e => e.id === r.empId);
              return (
                <div key={r.id}
                  onClick={() => setSelected(r.id === selected ? null : r.id)}
                  style={{
                    background: selected === r.id ? "var(--surface2)" : "var(--surface)",
                    border: `1px solid ${selected === r.id ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: 12, padding: "14px 16px", cursor: "pointer",
                    transition: "all .15s"
                  }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div className="flex-gap">
                      <Avatar emp={emp} />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{emp.name}</div>
                        <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{emp.role} · {r.id}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "Syne", fontWeight: 700, color: "var(--accent)", fontSize: 15 }}>{fmt(r.amount)}</div>
                      <StatusBadge status={r.status} />
                    </div>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--muted)", borderTop: "1px solid var(--border)", paddingTop: 8 }}>
                    💬 {r.reason} · 🕐 {r.requested}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div className="fade-up fade-up-3">
          {sel && selEmp ? (
            <div className="card" style={{ position: "sticky", top: 80 }}>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: .6 }}>รายละเอียดคำขอ</div>
                <div className="flex-gap" style={{ marginBottom: 14 }}>
                  <Avatar emp={selEmp} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{selEmp.name}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{selEmp.role} · {selEmp.dept}</div>
                  </div>
                </div>

                {[
                  ["Request ID", sel.id],
                  ["จำนวนเงิน", fmt(sel.amount)],
                  ["เหตุผล", sel.reason],
                  ["บัญชีรับโอน", sel.bank],
                  ["วันที่ขอ", sel.requested],
                  ["เงินเดือน", fmt(selEmp.salary)],
                  ["Earned ถึงวันนี้", fmt(Math.round(selEmp.salary * selEmp.worked / 30))],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                    <span style={{ color: "var(--muted)" }}>{k}</span>
                    <span style={{ fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>สถานะปัจจุบัน</div>
                <StatusBadge status={sel.status} />
              </div>

              {sel.status === "pending" && (
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-danger" style={{ flex: 1, justifyContent: "center" }} onClick={() => reject(sel.id)}>❌ ปฏิเสธ</button>
                  <button className="btn btn-approve" style={{ flex: 1, justifyContent: "center" }} onClick={() => approve(sel.id)}>✓ อนุมัติ</button>
                </div>
              )}
            </div>
          ) : (
            <div className="card empty">
              <div className="empty-icon">👆</div>
              <div className="empty-text">คลิกรายการเพื่อดูรายละเอียด</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Payment History ──
function PaymentPage() {
  const total = TRANSACTIONS.reduce((s, t) => s + t.amount, 0);
  const paid = TRANSACTIONS.filter(t => t.status === "paid").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="page page-enter">
      <div className="section-hd fade-up">
        <div>
          <div className="section-title">Payment History</div>
          <div className="section-sub">รายการโอนเงินผ่าน Omise Payment Gateway</div>
        </div>
        <div className="flex-gap">
          <div style={{ fontSize: 12, color: "var(--muted)", textAlign: "right" }}>
            <div>ยอดรวมเดือนนี้</div>
            <div style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 700, color: "var(--accent)" }}>{fmt(total)}</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid fade-up fade-up-1" style={{ marginTop: 20 }}>
        {[
          ["💸", "โอนสำเร็จ", fmt(paid), "green", "ทั้งหมด " + TRANSACTIONS.filter(t=>t.status==="paid").length + " รายการ"],
          ["⟳",  "กำลังดำเนินการ", fmt(15000), "blue", "1 รายการ กำลังโอน"],
          ["📊", "ค่าธรรมเนียม", "฿75", "purple", "฿15 ต่อรายการ"],
          ["✓",  "Success Rate", "100%", "warn", "ไม่มีรายการผิดพลาด"],
        ].map(([icon, label, val, color, sub]) => (
          <div key={label} className={`stat-card ${color}`}>
            <div className="stat-icon" style={{ background: `rgba(255,255,255,.05)`, fontSize: 20 }}>{icon}</div>
            <div className="stat-value">{val}</div>
            <div className="stat-label">{label}</div>
            <div className="stat-change up">{sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginTop: 24 }}>
        {/* Table */}
        <div className="fade-up fade-up-2" style={{ gridColumn: "1/-1" }}>
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: "Syne", fontWeight: 700 }}>รายการโอนเงิน</div>
              <div className="flex-gap" style={{ fontSize: 12, color: "var(--muted)" }}>
                <span>Powered by</span>
                <span style={{ background: "rgba(74,222,128,.15)", color: "var(--accent)", padding: "2px 8px", borderRadius: 6, fontWeight: 600 }}>Omise</span>
              </div>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Transaction ID</th><th>วันที่/เวลา</th><th>จำนวน</th><th>โอนไปยัง</th><th>Omise Ref</th><th>สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {TRANSACTIONS.map(t => (
                    <tr key={t.id}>
                      <td style={{ fontFamily: "monospace", fontSize: 12, color: "var(--accent2)" }}>{t.id}</td>
                      <td>
                        <div style={{ fontSize: 13 }}>{t.date}</div>
                        <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{t.time}</div>
                      </td>
                      <td style={{ fontFamily: "Syne", fontWeight: 700, color: "var(--accent)" }}>{fmt(t.amount)}</td>
                      <td style={{ fontSize: 12.5 }}>{t.to}</td>
                      <td style={{ fontFamily: "monospace", fontSize: 11, color: "var(--muted)" }}>{t.ref}</td>
                      <td><StatusBadge status={t.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Integration info */}
      <div className="card fade-up" style={{ marginTop: 20, background: "linear-gradient(135deg, rgba(34,211,238,.05), rgba(74,222,128,.03))", borderColor: "rgba(34,211,238,.2)" }}>
        <div style={{ fontFamily: "Syne", fontWeight: 700, marginBottom: 14 }}>⚡ Payment Gateway Integration</div>
        <div className="grid-3">
          {[
            ["🔗", "Provider", "Omise (Primary)"],
            ["🔒", "Security", "HMAC-SHA256 Webhook"],
            ["♻️", "Retry", "3 attempts, exponential backoff"],
            ["🆔", "Idempotency", "SHA-256 per request"],
            ["📱", "Methods", "PromptPay + Bank Transfer"],
            ["⏱", "Processing", "Real-time 24/7"],
          ].map(([icon, label, val]) => (
            <div key={label} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 18 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Admin Overview ──
function AdminPage() {
  const totalDisbursed = 358000;
  const activeEmps = 247;

  return (
    <div className="page page-enter">
      <div className="section-hd fade-up">
        <div>
          <div className="section-title">Admin Overview</div>
          <div className="section-sub">ภาพรวมการใช้งาน EWA Platform ทั้งองค์กร</div>
        </div>
        <span className="badge approved" style={{ fontSize: 12, padding: "5px 12px" }}>🟢 System Healthy</span>
      </div>

      {/* KPI */}
      <div className="stats-grid fade-up fade-up-1" style={{ marginTop: 20 }}>
        {[
          ["👥", "พนักงานทั้งหมด", "247", "green",  "↑ 12 คนเดือนนี้"],
          ["💰", "EWA เดือนนี้", fmt(totalDisbursed), "blue",   "38 รายการ"],
          ["⚡", "Avg Process", "18 min", "warn",  "HR → โอนเงิน"],
          ["📈", "Adoption Rate", "68%", "purple", "168 คนใช้งาน"],
        ].map(([icon, label, val, color, sub]) => (
          <div key={label} className={`stat-card ${color}`}>
            <div className="stat-icon" style={{ background: "rgba(255,255,255,.05)", fontSize: 20 }}>{icon}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{val}</div>
            <div className="stat-label">{label}</div>
            <div className="stat-change up">{sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginTop: 24 }}>
        {/* Chart */}
        <div className="card fade-up fade-up-2">
          <div className="section-hd">
            <div>
              <div className="section-title" style={{ fontSize: 14 }}>ยอด EWA รายเดือน</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>6 เดือนล่าสุด (หน่วย: ×10,000 บาท)</div>
            </div>
          </div>
          <div className="bar-chart">
            {BAR_DATA.map((b, i) => (
              <div className="bar-col" key={b.label}>
                <div className="bar-fill" style={{ height: b.val + "%" }} />
                <div className="bar-label">{b.label}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: "12px 0", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", fontSize: 12 }}>
            <span style={{ color: "var(--muted)" }}>สูงสุดเดือนนี้</span>
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>฿88,000 (มี.ค.)</span>
          </div>
        </div>

        {/* Dept breakdown */}
        <div className="card fade-up fade-up-3">
          <div className="section-title" style={{ fontSize: 14, marginBottom: 16 }}>การใช้งานตามแผนก</div>
          {[
            ["Engineering", 45, "var(--accent)"],
            ["Operations",  30, "var(--accent2)"],
            ["Finance",     15, "var(--warn)"],
            ["HR",          10, "var(--purple)"],
          ].map(([dept, pct, color]) => (
            <div key={dept} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span>{dept}</span>
                <span style={{ color, fontWeight: 600 }}>{pct}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: pct + "%", background: color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employee table */}
      <div className="fade-up" style={{ marginTop: 24 }}>
        <div className="section-hd">
          <div className="section-title">รายชื่อพนักงาน</div>
          <button className="btn btn-ghost" style={{ fontSize: 12 }}>ดูทั้งหมด</button>
        </div>
        <div className="card" style={{ padding: 0 }}>
          <table>
            <thead>
              <tr><th>พนักงาน</th><th>แผนก</th><th>เงินเดือน</th><th>Earned</th><th>วงเงิน EWA</th><th>สถานะ</th></tr>
            </thead>
            <tbody>
              {EMPLOYEES.map(e => {
                const earned = Math.round(e.salary * e.worked / 30);
                const limit  = Math.round(earned * .5);
                return (
                  <tr key={e.id}>
                    <td>
                      <div className="flex-gap">
                        <Avatar emp={e} size="avatar-sm" />
                        <div>
                          <div className="td-name">{e.name}</div>
                          <div className="td-sub">{e.role}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 12.5 }}>{e.dept}</td>
                    <td style={{ fontWeight: 500 }}>{fmt(e.salary)}</td>
                    <td style={{ color: "var(--accent)", fontWeight: 500 }}>{fmt(earned)}</td>
                    <td style={{ color: "var(--accent2)" }}>{fmt(limit)}</td>
                    <td><span className="badge approved">Active</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* System status */}
      <div className="card fade-up" style={{ marginTop: 20, borderColor: "rgba(74,222,128,.2)" }}>
        <div style={{ fontFamily: "Syne", fontWeight: 700, marginBottom: 14 }}>🛡 System Status</div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {[
            ["API Gateway (Kong)", "Operational", "var(--accent)"],
            ["Payment (Omise)", "Operational", "var(--accent)"],
            ["Auth Service", "Operational", "var(--accent)"],
            ["HR Sync (SAP)", "Operational", "var(--accent)"],
            ["Database", "Operational", "var(--accent)"],
            ["Notifications", "Operational", "var(--accent)"],
          ].map(([svc, status, color]) => (
            <div key={svc} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}` }} />
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 500 }}>{svc}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── NAV CONFIG ───────────────────────────────────────────────
const NAV_EMPLOYEE = [
  { id: "employee", label: "My EWA",       icon: "💰" },
  { id: "payment",  label: "ประวัติการโอน", icon: "📋" },
];
const NAV_HR = [
  { id: "hr",       label: "Approval Queue", icon: "✅", badge: 2 },
  { id: "payment",  label: "Payment History", icon: "💸" },
];
const NAV_ADMIN = [
  { id: "admin",    label: "Overview",      icon: "📊" },
  { id: "hr",       label: "HR Approval",   icon: "✅", badge: 2 },
  { id: "employee", label: "Employee View", icon: "👤" },
  { id: "payment",  label: "Payments",      icon: "💳" },
];

// ─── APP ─────────────────────────────────────────────────────
export default function App() {
  const [role, setRole] = useState("employee");
  const [page, setPage] = useState("employee");
  const [toasts, setToasts] = useState([]);

  const roles = { employee: EMPLOYEES[0], hr: EMPLOYEES[1], admin: { name: "Admin", role: "Super Admin", avatar: "AD", color: "#a78bfa" } };
  const navMap = { employee: NAV_EMPLOYEE, hr: NAV_HR, admin: NAV_ADMIN };
  const titleMap = { employee: "Employee Portal", hr: "HR Dashboard", admin: "Admin Console" };

  function switchRole(r) {
    setRole(r);
    setPage(r === "employee" ? "employee" : r === "hr" ? "hr" : "admin");
  }

  function addToast(type, msg) {
    const id = Date.now();
    setToasts(t => [...t, { id, type, msg }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }

  const user = roles[role];
  const nav = navMap[role];
  const pageTitle = nav.find(n => n.id === page)?.label || "Dashboard";

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">
            <div className="logo-icon">EW</div>
            <div>
              <div className="logo-text">EWA Platform</div>
              <div className="logo-sub">Earned Wage Access</div>
            </div>
          </div>
        </div>

        {/* Role switcher */}
        <div style={{ padding: "12px 10px 4px" }}>
          <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 6, paddingLeft: 2, letterSpacing: .5, textTransform: "uppercase" }}>Demo Role</div>
          <div className="role-switcher">
            {["employee", "hr", "admin"].map(r => (
              <button key={r} className={`role-btn ${role === r ? "active" : ""}`} onClick={() => switchRole(r)}>
                {r === "employee" ? "👤" : r === "hr" ? "✅" : "⚙️"}<br />
                {r === "employee" ? "Emp" : r === "hr" ? "HR" : "Admin"}
              </button>
            ))}
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">เมนู</div>
          {nav.map(n => (
            <div key={n.id} className={`nav-item ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
              <span className="nav-icon">{n.icon}</span>
              <span>{n.label}</span>
              {n.badge && page !== n.id && <span className="nav-badge">{n.badge}</span>}
            </div>
          ))}
        </nav>

        <div className="sidebar-user">
          <div className="user-avatar" style={{ background: user.color + "22", color: user.color }}>{user.avatar}</div>
          <div>
            <div className="user-name">{user.name}</div>
            <div className="user-role">{user.role}</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        <div className="topbar">
          <div className="topbar-title">{pageTitle}</div>
          <div className="topbar-actions">
            <div style={{ fontSize: 12, color: "var(--muted)", background: "var(--surface)", padding: "5px 12px", borderRadius: 20, border: "1px solid var(--border)" }}>
              🗓 8 มี.ค. 2568
            </div>
            <div className="notif-btn">
              🔔
              <div className="notif-dot" />
            </div>
          </div>
        </div>

        {page === "employee" && <EmployeePage addToast={addToast} />}
        {page === "hr"       && <HRPage addToast={addToast} />}
        {page === "payment"  && <PaymentPage />}
        {page === "admin"    && <AdminPage />}
      </main>

      <Toast toasts={toasts} />
    </div>
  );
}
