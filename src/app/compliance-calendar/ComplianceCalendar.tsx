'use client'

import { useState, useMemo } from 'react'
import {
  MONTHS,
  CATEGORIES,
  ENTITY_TYPES,
  CATEGORY_META,
  RECURRING_MONTHLY,
  FAQS,
  type Category,
  type EntityType,
  type ComplianceItem,
} from './data'

// ─── Badge helpers ─────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<Category, string> = {
  GST: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  'TDS/TCS': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  'Income Tax': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  'ROC/MCA': 'bg-violet-500/20 text-violet-400 border border-violet-500/30',
  'ESI/PF': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
}

const ENTITY_COLORS: Record<EntityType, string> = {
  'Pvt Ltd': 'bg-cyan-500/20 text-cyan-400',
  LLP: 'bg-violet-500/20 text-violet-400',
  Partnership: 'bg-emerald-500/20 text-emerald-400',
  Proprietorship: 'bg-amber-500/20 text-amber-400',
}

function CategoryBadge({ cat }: { cat: Category }) {
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[cat]}`}>
      {cat}
    </span>
  )
}

function EntityBadge({ entity }: { entity: EntityType }) {
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded ${ENTITY_COLORS[entity]}`}>
      {entity}
    </span>
  )
}

// ─── Compliance row ─────────────────────────────────────────────────────────────

function ComplianceRow({ item, showMonth }: { item: ComplianceItem & { monthLabel?: string }; showMonth?: boolean }) {
  const [showNote, setShowNote] = useState(false)
  const hasTodo = item.note?.startsWith('TODO')

  return (
    <div className="border border-slate-800 rounded-lg bg-slate-900 p-4 hover:border-slate-700 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
        {/* Due date pill */}
        <div className="shrink-0">
          <div className="text-center bg-slate-800 rounded-lg px-3 py-2 min-w-[80px]">
            <div className="text-xs text-slate-500 uppercase tracking-wide">Due</div>
            <div className="text-sm font-bold text-orange-400 whitespace-nowrap">{item.dueDate}</div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <CategoryBadge cat={item.category} />
            {showMonth && item.monthLabel && (
              <span className="text-xs text-slate-500">{item.monthLabel}</span>
            )}
          </div>
          <h4 className="text-slate-100 font-medium text-sm leading-snug mb-1">{item.name}</h4>
          {item.form && (
            <p className="text-xs text-slate-500 mb-2">
              Form: <span className="text-slate-400">{item.form}</span>
            </p>
          )}

          {/* Entity badges */}
          <div className="flex flex-wrap gap-1 mb-2">
            {(item.entities as EntityType[]).map((e) => (
              <EntityBadge key={e} entity={e} />
            ))}
          </div>

          {/* Penalty */}
          <div className="text-xs text-slate-500">
            <span className="text-red-400 font-medium">Penalty: </span>
            {item.penalty}
          </div>

          {/* Note / TODO */}
          {item.note && (
            <div className="mt-2">
              <button
                onClick={() => setShowNote(!showNote)}
                className={`text-xs flex items-center gap-1 ${hasTodo ? 'text-yellow-400 hover:text-yellow-300' : 'text-slate-500 hover:text-slate-400'} transition-colors`}
              >
                <span>{hasTodo ? '⚠ TODO / Note' : 'ⓘ Note'}</span>
                <svg
                  className={`w-3 h-3 transition-transform ${showNote ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showNote && (
                <p className={`mt-1 text-xs leading-relaxed ${hasTodo ? 'text-yellow-300/80' : 'text-slate-400'}`}>
                  {item.note}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Month-wise view ────────────────────────────────────────────────────────────

function MonthWiseView({
  entityFilter,
}: {
  entityFilter: string
}) {
  const [openMonth, setOpenMonth] = useState<string>('June 2026')

  const filtered = useMemo(() => {
    return MONTHS.map((m) => ({
      ...m,
      items:
        entityFilter === 'All'
          ? m.items
          : m.items.filter((item) => item.entities.includes(entityFilter as EntityType)),
    }))
  }, [entityFilter])

  return (
    <div className="space-y-3">
      {filtered.map((monthData) => {
        const isOpen = openMonth === monthData.month
        const itemCount = monthData.items.length
        const isCurrent = monthData.month === 'June 2026'

        return (
          <div
            key={monthData.month}
            className={`rounded-xl border transition-colors ${
              isCurrent
                ? 'border-orange-500/50 bg-orange-500/5'
                : 'border-slate-800 bg-slate-900/50'
            }`}
          >
            <button
              onClick={() => setOpenMonth(isOpen ? '' : monthData.month)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <span className={`text-base font-semibold ${isCurrent ? 'text-orange-400' : 'text-slate-100'}`}>
                  {monthData.month}
                </span>
                {isCurrent && (
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-orange-500 text-slate-950 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">{itemCount} filing{itemCount !== 1 ? 's' : ''}</span>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 space-y-3">
                {monthData.items.length === 0 ? (
                  <p className="text-slate-500 text-sm py-4 text-center">
                    No filings for the selected entity type this month.
                  </p>
                ) : (
                  monthData.items
                    .slice()
                    .sort((a, b) => a.dueDateDay - b.dueDateDay)
                    .map((item, i) => <ComplianceRow key={i} item={item} />)
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Category-wise view ─────────────────────────────────────────────────────────

function CategoryWiseView({ entityFilter }: { entityFilter: string }) {
  const [openCategory, setOpenCategory] = useState<Category | null>('GST')

  const byCategory = useMemo(() => {
    const result: Record<Category, (ComplianceItem & { monthLabel: string })[]> = {
      GST: [],
      'TDS/TCS': [],
      'Income Tax': [],
      'ROC/MCA': [],
      'ESI/PF': [],
    }
    for (const monthData of MONTHS) {
      for (const item of monthData.items) {
        if (entityFilter !== 'All' && !item.entities.includes(entityFilter as EntityType)) continue
        result[item.category].push({ ...item, monthLabel: monthData.month })
      }
    }
    return result
  }, [entityFilter])

  return (
    <div className="space-y-3">
      {CATEGORIES.map((cat) => {
        const items = byCategory[cat]
        const meta = CATEGORY_META[cat]
        const isOpen = openCategory === cat

        return (
          <div key={cat} className="rounded-xl border border-slate-800 bg-slate-900/50">
            <button
              onClick={() => setOpenCategory(isOpen ? null : cat)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <CategoryBadge cat={cat} />
                <span className="text-slate-100 font-semibold text-sm">{cat}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">{items.length} deadline{items.length !== 1 ? 's' : ''}</span>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5">
                <p className="text-slate-500 text-xs mb-4 leading-relaxed">{meta.description}</p>

                {cat === 'ESI/PF' && (
                  <div className="mb-4 space-y-3">
                    {RECURRING_MONTHLY.map((r, i) => (
                      <div key={i} className="border border-yellow-500/20 rounded-lg bg-yellow-500/5 p-4">
                        <div className="flex flex-wrap gap-2 mb-1">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                            Monthly Recurring
                          </span>
                        </div>
                        <h4 className="text-slate-100 font-medium text-sm mb-1">{r.name}</h4>
                        <p className="text-xs text-slate-500 mb-1">
                          Form: <span className="text-slate-400">{r.form}</span>
                        </p>
                        <p className="text-xs text-slate-500 mb-2">
                          Due: <span className="text-orange-400 font-medium">{r.dueDay}</span>
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {r.entities.map((e) => (
                            <EntityBadge key={e} entity={e} />
                          ))}
                        </div>
                        <div className="text-xs text-slate-500">
                          <span className="text-red-400 font-medium">Penalty: </span>
                          {r.penalty}
                        </div>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">{r.note}</p>
                      </div>
                    ))}
                  </div>
                )}

                {items.length === 0 && cat !== 'ESI/PF' ? (
                  <p className="text-slate-500 text-sm py-4 text-center">
                    No filings for the selected entity type in this category.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {items.map((item, i) => (
                      <ComplianceRow key={i} item={item} showMonth />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── FAQ accordion ──────────────────────────────────────────────────────────────

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-slate-100 mb-2">Frequently Asked Questions</h2>
      <p className="text-slate-400 text-sm mb-8">
        Quick answers for founders and finance teams who want clarity, not jargon.
      </p>
      <div className="space-y-2">
        {FAQS.map((faq, idx) => (
          <div key={idx} className="border border-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/50 transition-colors"
            >
              <span className="text-slate-100 font-medium text-sm pr-4">{faq.q}</span>
              <svg
                className={`w-4 h-4 shrink-0 text-orange-400 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIdx === idx && (
              <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Main export ────────────────────────────────────────────────────────────────

export default function ComplianceCalendar() {
  const [viewMode, setViewMode] = useState<'month' | 'category'>('month')
  const [entityFilter, setEntityFilter] = useState<string>('All')

  const totalItems = useMemo(() => MONTHS.reduce((acc, m) => acc + m.items.length, 0), [])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero / Header */}
      <div className="bg-slate-950 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <a href="/" className="hover:text-orange-400 transition-colors">ComplianceBharo</a>
            <span>/</span>
            <span className="text-slate-400">Compliance Calendar</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-orange-400 border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 rounded-full">
                  FY 2026-27
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3 leading-tight">
                Monthly Compliance Calendar
              </h1>
              <p className="text-slate-400 text-base leading-relaxed max-w-xl">
                Every statutory deadline your business needs to hit — GST returns, TDS, ROC
                filings, advance tax, and more — organized by month and category. No fluff, no
                missed dates.
              </p>
            </div>

            {/* Stats */}
            <div className="flex sm:flex-col gap-4 sm:gap-2 shrink-0">
              <div className="text-center bg-slate-900 border border-slate-800 rounded-xl px-5 py-3">
                <div className="text-2xl font-bold text-orange-400">{totalItems}+</div>
                <div className="text-xs text-slate-500">Deadlines tracked</div>
              </div>
              <div className="text-center bg-slate-900 border border-slate-800 rounded-xl px-5 py-3">
                <div className="text-2xl font-bold text-orange-400">4</div>
                <div className="text-xs text-slate-500">Entity types</div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-300/80 leading-relaxed">
            <strong>Heads up:</strong> Dates marked with ⚠ TODO have open verification questions — always confirm with your CA or check the official portal before acting on them. The government regularly extends deadlines via CBDT/GSTN circulars.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          {/* View toggle */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5 shrink-0">
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'month'
                  ? 'bg-orange-500 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Month Wise
            </button>
            <button
              onClick={() => setViewMode('category')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'category'
                  ? 'bg-orange-500 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Category Wise
            </button>
          </div>

          {/* Entity filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 sm:pb-0">
            <span className="text-xs text-slate-500 shrink-0">Filter:</span>
            {['All', ...ENTITY_TYPES].map((e) => (
              <button
                key={e}
                onClick={() => setEntityFilter(e)}
                className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  entityFilter === e
                    ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                    : 'border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-400'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {viewMode === 'month' ? (
          <MonthWiseView entityFilter={entityFilter} />
        ) : (
          <CategoryWiseView entityFilter={entityFilter} />
        )}

        {/* Recurring ESI/PF section (month view only) */}
        {viewMode === 'month' && (
          <section className="mt-10">
            <h3 className="text-lg font-semibold text-slate-100 mb-1">
              Monthly Recurring — ESI & PF
            </h3>
            <p className="text-slate-500 text-xs mb-4">
              These two run every single month of the year — 15th of the month following the contribution period.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {RECURRING_MONTHLY.map((r, i) => (
                <div key={i} className="border border-yellow-500/20 rounded-xl bg-yellow-500/5 p-4">
                  <div className="text-sm font-medium text-slate-100 mb-1">{r.name}</div>
                  <div className="text-xs text-slate-500 mb-1">Form: <span className="text-slate-400">{r.form}</span></div>
                  <div className="text-xs text-slate-500 mb-2">
                    Due: <span className="text-orange-400 font-medium">{r.dueDay}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {r.entities.map((e) => <EntityBadge key={e} entity={e} />)}
                  </div>
                  <div className="text-xs text-slate-500">
                    <span className="text-red-400 font-medium">Penalty: </span>{r.penalty}
                  </div>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">{r.note}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Legend */}
        <section className="mt-10 p-5 bg-slate-900 border border-slate-800 rounded-xl">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Category Legend</h3>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <CategoryBadge key={cat} cat={cat} />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            {ENTITY_TYPES.map((e) => (
              <EntityBadge key={e} entity={e} />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <FAQ />

        {/* Footer note */}
        <div className="mt-12 py-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-xs leading-relaxed max-w-2xl mx-auto">
            This calendar is for informational guidance only — not legal or tax advice. Statutory
            due dates are as per Companies Act 2013, CGST Act 2017, and Income Tax Act 1961. Your
            actual deadlines may differ based on company-specific dates (e.g., AGM held before
            Sep 30) or government extensions. Always verify with a qualified CA or CS.
          </p>
          <p className="text-slate-600 text-xs mt-3">
            Last updated: June 2026 · ComplianceBharo
          </p>
        </div>
      </div>
    </main>
  )
}
