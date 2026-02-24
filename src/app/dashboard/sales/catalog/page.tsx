"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Package, Search, Plus, Download, Tag, AlertTriangle, TrendingUp } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  sku: string;
}

const PRODUCTS: Product[] = [
  { id: "PRD-001", name: "Mortise Lock Pro",      category: "Locks",      price: 48.00,   stock: 124,  status: "in-stock",     sku: "MLP-48"  },
  { id: "PRD-002", name: "Brass Key Blank B2",    category: "Keys",       price: 1.20,    stock: 5400, status: "in-stock",     sku: "BKB-B2"  },
  { id: "PRD-003", name: "Smart Key Module",      category: "Electronic", price: 132.00,  stock: 18,   status: "low-stock",    sku: "SKM-132" },
  { id: "PRD-004", name: "Padlock Shackle 50mm",  category: "Padlocks",   price: 9.60,    stock: 312,  status: "in-stock",     sku: "PLS-50"  },
  { id: "PRD-005", name: "Cylinder Lock Core",    category: "Locks",      price: 22.50,   stock: 7,    status: "low-stock",    sku: "CLC-22"  },
  { id: "PRD-006", name: "RFID Tag Sticker",      category: "Electronic", price: 0.74,    stock: 0,    status: "out-of-stock", sku: "RFT-01"  },
  { id: "PRD-007", name: "Deadbolt Lock Set",     category: "Locks",      price: 54.00,   stock: 88,   status: "in-stock",     sku: "DLS-54"  },
  { id: "PRD-008", name: "Key Duplicator Unit",   category: "Equipment",  price: 1200.00, stock: 3,    status: "low-stock",    sku: "KDU-12"  },
];

const AVATAR_COLORS = [
  "bg-emerald-500/20 text-emerald-400",
  "bg-blue-500/20 text-blue-400",
  "bg-purple-500/20 text-purple-400",
  "bg-amber-500/20 text-amber-400",
  "bg-pink-500/20 text-pink-400",
  "bg-teal-500/20 text-teal-400",
  "bg-red-500/20 text-red-400",
  "bg-indigo-500/20 text-indigo-400",
];

export default function CatalogPage() {
  const { t } = useLanguage();
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState("all");
  const [mounted, setMounted]     = useState(false);
  useEffect(() => setMounted(true), []);

  const STATUS_CONFIG = {
    "in-stock":     { label: t("inStockLabel"),    badge: "bg-emerald-500/15 text-emerald-400", dot: "bg-emerald-400" },
    "low-stock":    { label: t("lowStockLabel"),   badge: "bg-amber-500/15 text-amber-400",     dot: "bg-amber-400"   },
    "out-of-stock": { label: t("outOfStockLabel"), badge: "bg-red-500/15 text-red-400",         dot: "bg-red-400"     },
  };

  const filtered = PRODUCTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const inStockCount  = PRODUCTS.filter(p => p.status === "in-stock").length;
  const lowStockCount = PRODUCTS.filter(p => p.status === "low-stock").length;
  const outCount      = PRODUCTS.filter(p => p.status === "out-of-stock").length;
  const totalValue    = PRODUCTS.reduce((s, p) => s + p.price * p.stock, 0);
  const avgPrice      = PRODUCTS.reduce((s, p) => s + p.price, 0) / PRODUCTS.length;

  const card = "bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-white/[0.06] rounded-2xl transition-colors duration-300";

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-[#060a0f] text-gray-900 dark:text-white font-mono p-6 space-y-6 transition-colors duration-300">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight leading-none">
              {t("productCatalog").split(" ")[0]}{" "}
              <span className="text-emerald-400">{t("productCatalog").split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1.5 uppercase tracking-widest">
              Feb 20, 2026 · EMM Hardware ERP · v2.4
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 text-xs uppercase tracking-widest flex items-center gap-1.5">
             
            </span>
            <button className="flex items-center gap-2 border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-gray-600 dark:text-gray-300">
              <Download size={13} /> {t("exportCsv")}
            </button>
            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition text-black font-bold">
              <Plus size={13} /> {t("addProduct")}
            </button>
          </div>
        </div>

        {/* ── KPI CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("totalProducts"), value: PRODUCTS.length,            isCompact: false, change: t("thisMonth2"),     changeColor: "text-emerald-400", valueColor: "text-emerald-400", icon: <Package size={16} />,       iconBg: "bg-emerald-500/10 text-emerald-400" },
            { label: t("inStock"),       value: inStockCount,                isCompact: false, change: `${inStockCount} SKUs`, changeColor: "text-blue-400",  valueColor: "text-blue-400",    icon: <Tag size={16} />,           iconBg: "bg-blue-500/10 text-blue-400"       },
            { label: t("lowStock"),      value: lowStockCount,               isCompact: false, change: t("needsReorder"),   changeColor: "text-amber-400",   valueColor: "text-amber-400",   icon: <AlertTriangle size={16} />, iconBg: "bg-amber-500/10 text-amber-400"     },
            { label: t("catalogValue"),  value: Math.round(totalValue/1000), isCompact: true,  change: t("tndEquivalent"),  changeColor: "text-purple-400",  valueColor: "text-purple-400",  icon: <TrendingUp size={16} />,    iconBg: "bg-purple-500/10 text-purple-400"   },
          ].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`${card} p-5 flex flex-col gap-3`}>
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-xl ${kpi.iconBg}`}>{kpi.icon}</div>
                <span className={`text-xs font-bold ${kpi.changeColor}`}>{kpi.change}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">{kpi.label}</p>
              {kpi.isCompact ? (
                <div>
                  <p className={`text-3xl font-bold tracking-tight ${kpi.valueColor}`}>
                    {kpi.value}K
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">TND {(kpi.value * 1000).toLocaleString()}</p>
                </div>
              ) : (
                <p className={`text-3xl font-bold tracking-tight ${kpi.valueColor}`}>
                  {kpi.value.toLocaleString()}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── SECONDARY STRIP ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: t("categories"), value: "6",                                    sub: t("productTypes")    },
            { label: t("outOfStock"), value: String(outCount),                        sub: t("needsRestocking") },
            { label: t("avgPrice"),   value: `TND ${avgPrice.toFixed(2)}`,            sub: t("perUnit")         },
            { label: t("totalSkus"),  value: String(PRODUCTS.length),                 sub: t("activeListings")  },
          ].map((s, i) => (
            <div key={i} className={`${card} px-5 py-4`}>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── TABLE ── */}
        <div className={`${card} overflow-hidden`}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/[0.05]">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">{t("productCatalogTitle")}</h2>
              <p className="text-xs text-gray-500">
                {filtered.length} {t("ofText")} {PRODUCTS.length} {t("product")}s
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  className="pl-8 pr-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg text-xs focus:outline-none focus:border-emerald-500/40 transition text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder={t("searchProducts")}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-1.5 bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg text-xs text-gray-600 dark:text-gray-300 focus:outline-none focus:border-emerald-500/40 transition"
                value={filterStatus}
                onChange={e => setFilter(e.target.value)}
              >
                <option value="all">{t("allStatus")}</option>
                <option value="in-stock">{t("inStockLabel")}</option>
                <option value="low-stock">{t("lowStockLabel")}</option>
                <option value="out-of-stock">{t("outOfStockLabel")}</option>
              </select>
            </div>
          </div>

          {/* Table header */}
          <div
            className="grid px-6 py-3 text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-600 border-b border-gray-100 dark:border-white/[0.04]"
            style={{ gridTemplateColumns: "2.5fr 1.2fr 1fr 0.8fr 1fr 1.2fr" }}>
            <span>{t("product")}</span>
            <span>{t("category")}</span>
            <span>{t("price")}</span>
            <span>{t("stock")}</span>
            <span>SKU</span>
            <span>{t("status")}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-500 dark:text-gray-600">
              {t("noProductsMatch")}
            </div>
          ) : (
            filtered.map((p, i) => {
              const sc = STATUS_CONFIG[p.status];
              return (
                <div key={p.id}
                  className={`grid px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition ${i < filtered.length - 1 ? "border-b border-gray-100 dark:border-white/[0.03]" : ""}`}
                  style={{ gridTemplateColumns: "2.5fr 1.2fr 1fr 0.8fr 1fr 1.2fr" }}>

                  {/* Product name + ID */}
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                      {p.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{p.name}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-600">{p.id}</p>
                    </div>
                  </div>

                  {/* Category */}
                  <p className="text-xs text-gray-500 dark:text-gray-400">{p.category}</p>

                  {/* Price in TND */}
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    TND {p.price.toFixed(2)}
                  </p>

                  {/* Stock */}
                  <p className={`text-sm font-bold ${p.stock === 0 ? "text-red-400" : p.stock < 20 ? "text-amber-400" : "text-gray-900 dark:text-white"}`}>
                    {p.stock.toLocaleString()}
                  </p>

                  {/* SKU */}
                  <p className="text-xs text-gray-400 dark:text-gray-500 tracking-wider">{p.sku}</p>

                  {/* Status badge */}
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${sc.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                      {sc.label}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}