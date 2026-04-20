<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Philippines Water Purifying Machine System</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<style>
:root{
  --navy:#0A2342;--water:#006064;--water-l:#E1F5FE;--water-m:#B3E5FC;
  --teal:#004D40;--teal-l:#E0F2F1;--green:#1B5E20;--green-l:#E8F5E9;
  --blue:#1565C0;--blue-l:#E3F2FD;--gold:#E65100;--gold-l:#FBE9E7;
  --red:#B71C1C;--red-l:#FFEBEE;--purple:#4527A0;--purp-l:#EDE7F6;
  --white:#FFFFFF;--bg:#F0F4F8;--card:#FFFFFF;--border:#D1DCE8;
  --text:#1A2332;--muted:#5A6A7A;--light:#F1F5F9;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);font-size:14px}

header{background:linear-gradient(135deg,#0A2342 0%,#0d3060 60%,#006064 100%);color:#fff;padding:0 2rem;box-shadow:0 2px 12px rgba(0,0,0,.3)}
.header-inner{display:flex;align-items:center;justify-content:space-between;height:64px}
.header-brand{display:flex;align-items:center;gap:14px}
.header-logo{width:42px;height:42px;background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.3);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px}
.header-title{font-size:17px;font-weight:700;letter-spacing:-0.02em}
.header-sub{font-size:11px;color:rgba(255,255,255,.55);margin-top:2px}
.header-meta{display:flex;gap:1.5rem;font-size:11px;color:rgba(255,255,255,.55)}
.header-meta span b{color:#7DD3FA;font-weight:700}

nav{background:#fff;border-bottom:2px solid var(--border);padding:0 2rem;display:flex;gap:0;align-items:center;justify-content:space-between;box-shadow:0 1px 6px rgba(0,0,0,.05)}
.nav-tabs{display:flex;gap:0}
.nav-tab{padding:14px 22px;font-size:13px;font-weight:600;cursor:pointer;border-bottom:3px solid transparent;color:var(--muted);transition:all .15s;border-top:none;border-left:none;border-right:none;background:none;font-family:inherit}
.nav-tab.active{color:var(--navy);border-bottom-color:var(--water)}
.nav-tab:hover:not(.active){color:var(--navy);background:var(--light)}
.upload-btn{padding:8px 16px;font-size:12px;background:var(--water);color:#fff;border:none;border-radius:7px;cursor:pointer;font-weight:700;transition:all .15s;display:flex;align-items:center;gap:6px}
.upload-btn:hover{background:#00474b;transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,96,100,.3)}
#excel-input{display:none}

.page{display:none;padding:1.5rem 2rem}
.page.active{display:block}

.kpi-row{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:1.5rem}
.kpi{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:18px 20px;transition:transform .15s;box-shadow:0 1px 4px rgba(0,0,0,.04)}
.kpi:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.08)}
.kpi-icon{font-size:22px;margin-bottom:8px}
.kpi-label{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}
.kpi-value{font-size:26px;font-weight:800;color:var(--navy);letter-spacing:-0.02em}
.kpi-sub{font-size:11px;color:var(--muted);margin-top:5px}
.kpi.highlight{background:linear-gradient(135deg,var(--navy),#1a3a6b);border-color:transparent;box-shadow:0 4px 16px rgba(10,35,66,.25)}
.kpi.highlight .kpi-label{color:rgba(255,255,255,.6)}
.kpi.highlight .kpi-value{color:#fff}
.kpi.highlight .kpi-sub{color:rgba(255,255,255,.5)}
.kpi.green-card{border-left:4px solid #27ae60}
.kpi.blue-card{border-left:4px solid var(--blue)}
.kpi.purple-card{border-left:4px solid var(--purple)}
.kpi.gold-card{border-left:4px solid #e67e22}

.chart-row{display:grid;gap:14px;margin-bottom:14px}
.chart-row.cols-2{grid-template-columns:1fr 1fr}
.chart-row.cols-3{grid-template-columns:1fr 1fr 1fr}
.chart-row.cols-1{grid-template-columns:1fr}
.chart-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px 22px;box-shadow:0 1px 4px rgba(0,0,0,.04)}
.chart-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px}
.chart-title{font-size:13px;font-weight:700;color:var(--navy)}
.chart-sub{font-size:11px;color:var(--muted);margin-top:3px}
.legend{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:12px}
.leg{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--muted);font-weight:500}
.leg-sq{width:10px;height:10px;border-radius:3px;flex-shrink:0}

.table-card{background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)}
.table-toolbar{display:flex;gap:10px;padding:14px 16px;border-bottom:1px solid var(--border);flex-wrap:wrap;align-items:center;background:var(--light)}
.table-toolbar input,.table-toolbar select{padding:7px 12px;border:1px solid var(--border);border-radius:7px;font-size:12px;font-family:inherit;color:var(--text);background:#fff;transition:border .15s}
.table-toolbar input:focus,.table-toolbar select:focus{outline:none;border-color:var(--water)}
.table-toolbar input{width:220px}
.tbl-count{font-size:12px;color:var(--muted);margin-left:auto;font-weight:600}
.tbl-wrap{overflow-x:auto;max-height:520px;overflow-y:auto}
table{width:100%;border-collapse:collapse}
thead th{background:var(--navy);color:rgba(255,255,255,.85);padding:10px 12px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;cursor:pointer;white-space:nowrap;position:sticky;top:0;z-index:2}
thead th:hover{color:#fff;background:#1a3a6b}
thead th.sorted{color:#7DD3FA}
tbody td{padding:9px 12px;border-bottom:1px solid var(--border);font-size:12px}
tbody tr:last-child td{border-bottom:none}
tbody tr:hover td{background:#f0f7ff}
.num{text-align:right;font-variant-numeric:tabular-nums}
.badge{display:inline-block;font-size:10px;font-weight:800;padding:3px 9px;border-radius:12px;letter-spacing:.02em}
.badge.m1{background:var(--blue-l);color:var(--blue);border:1px solid #bbdefb}
.badge.m2{background:var(--green-l);color:var(--green);border:1px solid #c8e6c9}
.badge.m3{background:var(--red-l);color:var(--red);border:1px solid #ffcdd2}
.city-name{font-weight:700;color:var(--navy)}
.region-tag{font-size:10px;color:var(--muted);margin-top:1px}

.region-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;margin-top:1rem}
.region-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:18px 20px;cursor:pointer;transition:all .2s;box-shadow:0 1px 4px rgba(0,0,0,.04)}
.region-card:hover{border-color:var(--water);box-shadow:0 4px 16px rgba(0,96,100,.12);transform:translateY(-2px)}
.region-card.selected{border-color:var(--water);background:var(--water-l)}
.reg-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.reg-name{font-size:15px;font-weight:800;color:var(--navy)}
.reg-cities{font-size:11px;color:var(--muted);background:var(--light);padding:3px 8px;border-radius:10px;font-weight:600}
.reg-stat{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px}
.reg-s{padding:8px 10px;background:var(--light);border-radius:8px}
.reg-s-label{font-size:10px;color:var(--muted);margin-bottom:3px;font-weight:600;text-transform:uppercase}
.reg-s-val{font-size:14px;font-weight:800;color:var(--navy)}
.mtype-bar{display:flex;height:8px;border-radius:4px;overflow:hidden;margin:12px 0 6px;gap:2px;background:var(--light)}
.mbar-seg{height:100%;border-radius:3px;transition:width .4s ease}

.detail-panel{display:none;background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px;margin-top:1rem;box-shadow:0 2px 12px rgba(0,0,0,.08)}
.detail-panel.open{display:block}
.dp-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--border)}
.dp-title{font-size:16px;font-weight:800;color:var(--navy)}
.dp-close{background:var(--light);border:1px solid var(--border);font-size:16px;cursor:pointer;color:var(--muted);width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;transition:all .15s}
.dp-close:hover{background:var(--red-l);color:var(--red);border-color:var(--red)}

.fin-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:1.5rem}
.fin-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.04)}
.fin-label{font-size:11px;color:var(--muted);margin-bottom:8px;font-weight:700;text-transform:uppercase;letter-spacing:.05em}
.fin-val{font-size:24px;font-weight:800;letter-spacing:-0.02em}
.fin-val.cost{color:var(--purple)}
.fin-val.rev{color:var(--green)}
.fin-val.margin{color:#e67e22}
.fin-val.net{color:var(--navy)}

.params-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:1.5rem}
.param-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:18px}
.param-card.editable{border-color:var(--water);border-width:2px;background:linear-gradient(135deg,#fff,var(--water-l))}
.param-title{font-size:11px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid var(--border)}
.param-row{display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(0,0,0,.04);font-size:12px}
.param-row:last-child{border-bottom:none}
.param-key{color:var(--muted)}
.param-val{font-weight:700;color:var(--navy)}
.edit-hint{font-size:10px;color:var(--water);margin-top:10px;font-style:italic;background:var(--water-l);padding:6px 10px;border-radius:6px}

.page-header{margin-bottom:1.25rem}
.page-header h2{font-size:18px;font-weight:800;color:var(--navy)}
.page-header p{font-size:12px;color:var(--muted);margin-top:4px}

.toast{position:fixed;bottom:20px;right:20px;background:var(--navy);color:#fff;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:600;z-index:9999;transform:translateY(60px);opacity:0;transition:all .3s;pointer-events:none;box-shadow:0 4px 16px rgba(0,0,0,.3)}
.toast.show{transform:translateY(0);opacity:1}

@media(max-width:900px){
  .kpi-row{grid-template-columns:repeat(2,1fr)}
  .chart-row.cols-2,.chart-row.cols-3{grid-template-columns:1fr}
  .fin-summary{grid-template-columns:repeat(2,1fr)}
  .params-grid{grid-template-columns:1fr}
  .header-meta{display:none}
}
</style>
</head>
<body>

<header>
  <div class="header-inner">
    <div class="header-brand">
      <div class="header-logo">💧</div>
      <div>
        <div class="header-title">Philippines Water Purifying Machine System</div>
        <div class="header-sub">LGU & Evacuation Center Procurement Dashboard — PSA 2020 Census | RA 12076</div>
      </div>
    </div>
    <div class="header-meta">
      <span><b id="h-cities">—</b> cities</span>
      <span><b id="h-machines">—</b> total machines</span>
      <span><b id="h-cost">—</b> procurement</span>
      <span>LGU: 8L/day &nbsp;|&nbsp; EC: 100L/day × 5,000ppl</span>
    </div>
  </div>
</header>

<nav>
  <div class="nav-tabs">
    <button class="nav-tab active" onclick="showPage('dashboard',this)">📊 Dashboard</button>
    <button class="nav-tab" onclick="showPage('regions',this)">🗺️ By Region</button>
    <button class="nav-tab" onclick="showPage('cities',this)">🏙️ By City</button>
    <button class="nav-tab" onclick="showPage('financial',this)">💰 Financial</button>
    <button class="nav-tab" onclick="showPage('priority',this)">🎯 Priority</button>
    <button class="nav-tab" onclick="showPage('params',this)">⚙️ Parameters</button>
  </div>
  <button class="upload-btn" onclick="document.getElementById('excel-input').click()">📤 Update via Excel</button>
  <input type="file" id="excel-input" accept=".xlsx,.xls,.csv" onchange="handleExcelUpload(event)">
</nav>

<!-- DASHBOARD PAGE -->
<div class="page active" id="page-dashboard">
  <div class="kpi-row">
    <div class="kpi highlight">
      <div class="kpi-label">Total Machines Required</div>
      <div class="kpi-value" id="kpi-total">—</div>
      <div class="kpi-sub">All LGUs + Evacuation Centers</div>
    </div>
    <div class="kpi blue-card">
      <div class="kpi-label">LGU Machines</div>
      <div class="kpi-value" id="kpi-lgu">—</div>
      <div class="kpi-sub">50 L/person/day standard</div>
    </div>
    <div class="kpi green-card">
      <div class="kpi-label">EC Machines</div>
      <div class="kpi-value" id="kpi-ec">—</div>
      <div class="kpi-sub">100 L/day × 5,000 ppl/EC</div>
    </div>
    <div class="kpi purple-card">
      <div class="kpi-label">Procurement Cost</div>
      <div class="kpi-value" id="kpi-cost">—</div>
      <div class="kpi-sub" id="kpi-cost-sub">Total buying cost</div>
    </div>
    <div class="kpi gold-card">
      <div class="kpi-label">Selling Revenue</div>
      <div class="kpi-value" id="kpi-rev">—</div>
      <div class="kpi-sub" id="kpi-rev-sub">Before deductions</div>
    </div>
  </div>

  <div class="chart-row cols-2">
    <div class="chart-card">
      <div class="chart-head">
        <div><div class="chart-title">Machines by Region — LGU vs EC</div><div class="chart-sub">Stacked bar by deployment type</div></div>
      </div>
      <div class="legend">
        <span class="leg"><span class="leg-sq" style="background:#378ADD"></span>LGU machines</span>
        <span class="leg"><span class="leg-sq" style="background:#1D9E75"></span>EC machines</span>
      </div>
      <div style="position:relative;height:300px"><canvas id="d-mach-reg"></canvas></div>
    </div>
    <div class="chart-card">
      <div class="chart-head">
        <div><div class="chart-title">Machine Type Distribution by Region</div><div class="chart-sub">Cities per machine tier</div></div>
      </div>
      <div class="legend">
        <span class="leg"><span class="leg-sq" style="background:#185FA5"></span>Machine 1 (7,200 L/day)</span>
        <span class="leg"><span class="leg-sq" style="background:#27500A"></span>Machine 2 (1,700 L/day)</span>
        <span class="leg"><span class="leg-sq" style="background:#A32D2D"></span>Machine 3 (36,000 L/day)</span>
      </div>
      <div style="position:relative;height:300px"><canvas id="d-type-reg"></canvas></div>
    </div>
  </div>

  <div class="chart-row cols-2">
    <div class="chart-card">
      <div class="chart-head"><div><div class="chart-title">Procurement Cost vs Revenue by Region (₱B)</div><div class="chart-sub">Cost · Revenue · Gross Margin</div></div></div>
      <div class="legend">
        <span class="leg"><span class="leg-sq" style="background:#534AB7"></span>Cost</span>
        <span class="leg"><span class="leg-sq" style="background:#1D9E75"></span>Revenue</span>
        <span class="leg"><span class="leg-sq" style="background:#EF9F27"></span>Margin</span>
      </div>
      <div style="position:relative;height:280px"><canvas id="d-cost-reg"></canvas></div>
    </div>
    <div class="chart-card">
      <div class="chart-head"><div><div class="chart-title">Machine Type Distribution — National</div><div class="chart-sub">By city count</div></div></div>
      <div style="position:relative;height:280px"><canvas id="d-pie"></canvas></div>
    </div>
  </div>
</div>

<!-- REGIONS PAGE -->
<div class="page" id="page-regions">
  <div class="page-header">
    <h2>Regional Breakdown</h2>
    <p>Click any region card to see its cities and detailed data</p>
  </div>
  <div class="region-grid" id="region-grid"></div>
  <div class="detail-panel" id="region-detail">
    <div class="dp-header">
      <div class="dp-title" id="dp-title">Region detail</div>
      <button class="dp-close" onclick="closeDetail()">✕</button>
    </div>
    <div class="chart-row cols-2" style="margin-bottom:14px">
      <div style="position:relative;height:220px"><canvas id="dp-bar"></canvas></div>
      <div style="position:relative;height:220px"><canvas id="dp-cost"></canvas></div>
    </div>
    <div class="tbl-wrap">
      <table id="dp-table"><thead><tr>
        <th>City</th><th>Province</th><th>Machine type</th><th class="num">Population</th>
        <th class="num">ECs</th><th class="num">LGU machines</th>
        <th class="num">EC machines</th><th class="num">Total machines</th>
        <th class="num">Cost (₱M)</th><th class="num">Revenue (₱M)</th><th class="num">Gross Margin (₱M)</th>
      </tr></thead><tbody id="dp-body"></tbody></table>
    </div>
  </div>
</div>

<!-- CITIES PAGE -->
<div class="page" id="page-cities">
  <div class="table-card">
    <div class="table-toolbar">
      <input type="text" id="city-search" placeholder="🔍 Search city or region..." oninput="renderCityTable()">
      <select id="city-region" onchange="renderCityTable()">
        <option value="">All regions</option>
      </select>
      <select id="city-mtype" onchange="renderCityTable()">
        <option value="">All machine types</option>
        <option value="Machine 1">Machine 1 (7,200 L/day)</option>
        <option value="Machine 2">Machine 2 (1,700 L/day)</option>
        <option value="Machine 3">Machine 3 (36,000 L/day)</option>
      </select>
      <select id="city-sort" onchange="renderCityTable()">
        <option value="totalMachines">Sort: Total machines ↓</option>
        <option value="costPrice">Sort: Cost ↓</option>
        <option value="population">Sort: Population ↓</option>
        <option value="city">Sort: City name A–Z</option>
        <option value="lguMachines">Sort: LGU machines ↓</option>
        <option value="ecMachines">Sort: EC machines ↓</option>
      </select>
      <span class="tbl-count" id="city-count"></span>
    </div>
    <div class="tbl-wrap">
      <table><thead>
        <tr>
          <th>City / Municipality</th><th>Region</th><th>Province</th><th>Machine type</th>
          <th class="num">Population</th><th class="num">ECs</th>
          <th class="num">LGU Machines</th><th class="num">EC Machines</th>
          <th class="num">Total Machines</th>
          <th class="num">Cost (₱M)</th><th class="num">Revenue (₱M)</th>
          <th class="num">Gross Margin (₱M)</th><th class="num">Net Revenue (₱M)</th>
        </tr>
      </thead><tbody id="city-body"></tbody></table>
    </div>
  </div>
</div>

<!-- FINANCIAL PAGE -->
<div class="page" id="page-financial">
  <div class="fin-summary">
    <div class="fin-card"><div class="fin-label">Procurement Cost</div><div class="fin-val cost" id="fin-cost">—</div></div>
    <div class="fin-card"><div class="fin-label">Selling Revenue</div><div class="fin-val rev" id="fin-rev">—</div></div>
    <div class="fin-card"><div class="fin-label">Gross Margin</div><div class="fin-val margin" id="fin-margin">—</div></div>
    <div class="fin-card"><div class="fin-label">Net Revenue <small style="font-size:9px;display:block;color:var(--muted)">(After SOP+Money+Mktg+Share)</small></div><div class="fin-val net" id="fin-net">—</div></div>
  </div>
  <div class="chart-row cols-2">
    <div class="chart-card">
      <div class="chart-title" style="margin-bottom:14px">Financial Breakdown by Machine Type</div>
      <div class="legend">
        <span class="leg"><span class="leg-sq" style="background:#534AB7"></span>Cost</span>
        <span class="leg"><span class="leg-sq" style="background:#1D9E75"></span>Revenue</span>
        <span class="leg"><span class="leg-sq" style="background:#EF9F27"></span>Margin</span>
      </div>
      <div style="position:relative;height:260px"><canvas id="f-mtype"></canvas></div>
    </div>
    <div class="chart-card">
      <div class="chart-title" style="margin-bottom:14px">Revenue Deduction Waterfall (Machine 2 unit example)</div>
      <div id="waterfall-container"></div>
    </div>
  </div>
  <div class="chart-row cols-1">
    <div class="chart-card">
      <div class="chart-title" style="margin-bottom:14px">Revenue vs Cost by Region (₱B)</div>
      <div style="position:relative;height:300px"><canvas id="f-region"></canvas></div>
    </div>
  </div>
</div>

<!-- PRIORITY LIST PAGE -->
<div class="page" id="page-priority">
  <div class="page-header">
    <h2>🎯 Priority Procurement List</h2>
    <p>Cities ranked by total machine requirement (highest need first) — sourced from Excel Priority sheet</p>
  </div>
  <div class="table-card">
    <div class="table-toolbar">
      <input type="text" id="pri-search" placeholder="🔍 Search city..." oninput="renderPriorityTable()">
      <select id="pri-mtype" onchange="renderPriorityTable()">
        <option value="">All machine types</option>
        <option value="Machine 1">Machine 1</option>
        <option value="Machine 2">Machine 2</option>
        <option value="Machine 3">Machine 3</option>
      </select>
      <span class="tbl-count" id="pri-count"></span>
    </div>
    <div class="tbl-wrap">
      <table><thead><tr>
        <th class="num">#</th><th>City</th><th>Region</th><th>Machine Type</th>
        <th class="num">Population</th><th class="num">ECs</th>
        <th class="num">LGU Machines</th><th class="num">EC Machines</th>
        <th class="num">Total Machines</th><th class="num">Cost (₱M)</th>
      </tr></thead><tbody id="pri-body"></tbody></table>
    </div>
  </div>
</div>

<!-- PARAMS PAGE -->
<div class="page" id="page-params">
  <div class="page-header">
    <h2>⚙️ System Parameters</h2>
    <p>All formulas and calculations derive from these values. Upload a new Excel file to update.</p>
  </div>
  <div class="params-grid">
    <div class="param-card editable">
      <div class="param-title">🔧 Machine Specifications</div>
      <div class="param-row"><span class="param-key">Machine 1 capacity</span><span class="param-val">7,200 L/day</span></div>
      <div class="param-row"><span class="param-key">Machine 1 cost price</span><span class="param-val">₱1,100,000</span></div>
      <div class="param-row"><span class="param-key">Machine 1 sell price</span><span class="param-val">₱2,200,000</span></div>
      <div class="param-row"><span class="param-key">Machine 2 capacity</span><span class="param-val">1,700 L/day</span></div>
      <div class="param-row"><span class="param-key">Machine 2 cost price</span><span class="param-val">₱1,450,000</span></div>
      <div class="param-row"><span class="param-key">Machine 2 sell price</span><span class="param-val">₱2,900,000</span></div>
      <div class="param-row"><span class="param-key">Machine 3 capacity</span><span class="param-val">36,000 L/day</span></div>
      <div class="param-row"><span class="param-key">Machine 3 cost price</span><span class="param-val">₱2,250,000</span></div>
      <div class="param-row"><span class="param-key">Machine 3 sell price</span><span class="param-val">₱4,500,000</span></div>
      <div class="edit-hint">✅ Source: PH_Water_UPDATED_STANDARDS.xlsx · PARAMS sheet</div>
    </div>
    <div class="param-card editable">
      <div class="param-title">💧 Water Demand Standards</div>
      <div class="param-row"><span class="param-key">LGU water standard</span><span class="param-val">50 L/person/day</span></div>
      <div class="param-row"><span class="param-key">Standard basis</span><span class="param-val">Philippine LWUA</span></div>
      <div class="param-row"><span class="param-key">EC water standard</span><span class="param-val">100 L/person/day</span></div>
      <div class="param-row"><span class="param-key">EC standard basis</span><span class="param-val">WHO SPHERE Emergency</span></div>
      <div class="param-row"><span class="param-key">EC population/center</span><span class="param-val">5,000 people</span></div>
      <div class="param-row"><span class="param-key">EC pop basis</span><span class="param-val">NDRRMC standard</span></div>
      <div class="param-row"><span class="param-key">Data source</span><span class="param-val">PSA Census 2020</span></div>
      <div class="edit-hint">✅ Source: PH_Water_UPDATED_STANDARDS.xlsx · Standards sheet</div>
    </div>
    <div class="param-card editable">
      <div class="param-title">⚡ Machine Selection Logic</div>
      <div class="param-row"><span class="param-key">Machine 3 threshold</span><span class="param-val">Population &gt; 500,000</span></div>
      <div class="param-row"><span class="param-key">Machine 2 threshold</span><span class="param-val">200,001 – 500,000</span></div>
      <div class="param-row"><span class="param-key">Machine 1 threshold</span><span class="param-val">Population ≤ 200,000</span></div>
      <div class="edit-hint">Formula: =IF(Pop&gt;500K,"M3",IF(Pop&gt;200K,"M2","M1"))<br>LGU: =CEILING(Pop×50÷Cap,1)<br>EC: =CEILING(ECs×5000×100÷Cap,1)</div>
    </div>
    <div class="param-card">
      <div class="param-title">💸 Financial Deduction Rates</div>
      <div class="param-row"><span class="param-key">SOP (Standard Operating)</span><span class="param-val">15%</span></div>
      <div class="param-row"><span class="param-key">Cost of Money</span><span class="param-val">10%</span></div>
      <div class="param-row"><span class="param-key">Marketing & Misc</span><span class="param-val">5%</span></div>
      <div class="param-row"><span class="param-key">Share / Commission</span><span class="param-val">25%</span></div>
      <div class="param-row"><span class="param-key">Total deductions</span><span class="param-val" style="color:var(--red)">55%</span></div>
      <div class="param-row"><span class="param-key">Net margin</span><span class="param-val" style="color:var(--green)">45% of selling price</span></div>
    </div>
    <div class="param-card">
      <div class="param-title">📊 Coverage Statistics (Live)</div>
      <div class="param-row"><span class="param-key">Total cities monitored</span><span class="param-val" id="p-cities">—</span></div>
      <div class="param-row"><span class="param-key">Total regions</span><span class="param-val" id="p-regions">—</span></div>
      <div class="param-row"><span class="param-key">Total evac centers</span><span class="param-val" id="p-ecs">—</span></div>
      <div class="param-row"><span class="param-key">Cities with Machine 1</span><span class="param-val" id="p-m1">—</span></div>
      <div class="param-row"><span class="param-key">Cities with Machine 2</span><span class="param-val" id="p-m2">—</span></div>
      <div class="param-row"><span class="param-key">Cities with Machine 3</span><span class="param-val" id="p-m3">—</span></div>
    </div>
    <div class="param-card">
      <div class="param-title">⚖️ Legal & Regulatory Framework</div>
      <div class="param-row"><span class="param-key">Primary law</span><span class="param-val">RA 12076</span></div>
      <div class="param-row"><span class="param-key">Signed</span><span class="param-val">December 2024</span></div>
      <div class="param-row"><span class="param-key">DRRM law</span><span class="param-val">RA 10121</span></div>
      <div class="param-row"><span class="param-key">Implementing agency</span><span class="param-val">NDRRMC / OCD</span></div>
      <div class="param-row"><span class="param-key">LGU responsibility</span><span class="param-val">DILG mandate</span></div>
      <div class="param-row"><span class="param-key">EC water standard</span><span class="param-val">WHO SPHERE 100 L/day</span></div>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
// ============================================================
// DATA — sourced from PH_Water_UPDATED_STANDARDS.xlsx
// ============================================================
let DATA = [{"city": "Caloocan City", "region": "NCR", "province": "Metro Manila", "population": 1661584, "ecs": 6, "machineType": "Machine 3", "lguMachines": 347, "ecMachines": 1, "totalMachines": 348, "costPrice": 783000000, "sellRevenue": 1566000000, "grossMargin": 783000000, "netRevenue": 1566000000}, {"city": "Las Piñas City", "region": "NCR", "province": "Metro Manila", "population": 606293, "ecs": 4, "machineType": "Machine 3", "lguMachines": 127, "ecMachines": 1, "totalMachines": 128, "costPrice": 288000000, "sellRevenue": 576000000, "grossMargin": 288000000, "netRevenue": 576000000}, {"city": "Makati City", "region": "NCR", "province": "Metro Manila", "population": 582602, "ecs": 6, "machineType": "Machine 3", "lguMachines": 122, "ecMachines": 1, "totalMachines": 123, "costPrice": 276750000, "sellRevenue": 553500000, "grossMargin": 276750000, "netRevenue": 553500000}, {"city": "Malabon City", "region": "NCR", "province": "Metro Manila", "population": 365525, "ecs": 3, "machineType": "Machine 2", "lguMachines": 1613, "ecMachines": 1, "totalMachines": 1614, "costPrice": 2340300000, "sellRevenue": 4680600000, "grossMargin": 2340300000, "netRevenue": 4680600000}, {"city": "Mandaluyong City", "region": "NCR", "province": "Metro Manila", "population": 425758, "ecs": 3, "machineType": "Machine 2", "lguMachines": 1879, "ecMachines": 1, "totalMachines": 1880, "costPrice": 2726000000, "sellRevenue": 5452000000, "grossMargin": 2726000000, "netRevenue": 5452000000}, {"city": "Manila City", "region": "NCR", "province": "Metro Manila", "population": 1846513, "ecs": 7, "machineType": "Machine 3", "lguMachines": 385, "ecMachines": 1, "totalMachines": 386, "costPrice": 868500000, "sellRevenue": 1737000000, "grossMargin": 868500000, "netRevenue": 1737000000}, {"city": "Marikina City", "region": "NCR", "province": "Metro Manila", "population": 456059, "ecs": 2, "machineType": "Machine 2", "lguMachines": 2013, "ecMachines": 1, "totalMachines": 2014, "costPrice": 2920300000, "sellRevenue": 5840600000, "grossMargin": 2920300000, "netRevenue": 5840600000}, {"city": "Muntinlupa City", "region": "NCR", "province": "Metro Manila", "population": 543445, "ecs": 4, "machineType": "Machine 3", "lguMachines": 114, "ecMachines": 1, "totalMachines": 115, "costPrice": 258750000, "sellRevenue": 517500000, "grossMargin": 258750000, "netRevenue": 517500000}, {"city": "Navotas City", "region": "NCR", "province": "Metro Manila", "population": 249131, "ecs": 5, "machineType": "Machine 2", "lguMachines": 1100, "ecMachines": 1, "totalMachines": 1101, "costPrice": 1596450000, "sellRevenue": 3192900000, "grossMargin": 1596450000, "netRevenue": 3192900000}, {"city": "Parañaque City", "region": "NCR", "province": "Metro Manila", "population": 689992, "ecs": 4, "machineType": "Machine 3", "lguMachines": 144, "ecMachines": 1, "totalMachines": 145, "costPrice": 326250000, "sellRevenue": 652500000, "grossMargin": 326250000, "netRevenue": 652500000}, {"city": "Pasay City", "region": "NCR", "province": "Metro Manila", "population": 440656, "ecs": 2, "machineType": "Machine 2", "lguMachines": 1945, "ecMachines": 1, "totalMachines": 1946, "costPrice": 2821700000, "sellRevenue": 5643400000, "grossMargin": 2821700000, "netRevenue": 5643400000}, {"city": "Pasig City", "region": "NCR", "province": "Metro Manila", "population": 803159, "ecs": 4, "machineType": "Machine 3", "lguMachines": 168, "ecMachines": 1, "totalMachines": 169, "costPrice": 380250000, "sellRevenue": 760500000, "grossMargin": 380250000, "netRevenue": 760500000}, {"city": "Quezon City", "region": "NCR", "province": "Metro Manila", "population": 2960048, "ecs": 7, "machineType": "Machine 3", "lguMachines": 617, "ecMachines": 1, "totalMachines": 618, "costPrice": 1390500000, "sellRevenue": 2781000000, "grossMargin": 1390500000, "netRevenue": 2781000000}, {"city": "San Juan City", "region": "NCR", "province": "Metro Manila", "population": 122180, "ecs": 2, "machineType": "Machine 1", "lguMachines": 128, "ecMachines": 1, "totalMachines": 129, "costPrice": 141900000, "sellRevenue": 283800000, "grossMargin": 141900000, "netRevenue": 283800000}, {"city": "Taguig City", "region": "NCR", "province": "Metro Manila", "population": 886722, "ecs": 4, "machineType": "Machine 3", "lguMachines": 185, "ecMachines": 1, "totalMachines": 186, "costPrice": 418500000, "sellRevenue": 837000000, "grossMargin": 418500000, "netRevenue": 837000000}, {"city": "Valenzuela City", "region": "NCR", "province": "Metro Manila", "population": 714978, "ecs": 5, "machineType": "Machine 3", "lguMachines": 149, "ecMachines": 1, "totalMachines": 150, "costPrice": 337500000, "sellRevenue": 675000000, "grossMargin": 337500000, "netRevenue": 675000000}, {"city": "Baguio City", "region": "CAR", "province": "Benguet", "population": 366358, "ecs": 5, "machineType": "Machine 2", "lguMachines": 1617, "ecMachines": 1, "totalMachines": 1618, "costPrice": 2346100000, "sellRevenue": 4692200000, "grossMargin": 2346100000, "netRevenue": 4692200000}, {"city": "Tabuk City", "region": "CAR", "province": "Kalinga", "population": 75158, "ecs": 1, "machineType": "Machine 1", "lguMachines": 79, "ecMachines": 1, "totalMachines": 80, "costPrice": 88000000, "sellRevenue": 176000000, "grossMargin": 88000000, "netRevenue": 176000000}, {"city": "Batac City", "region": "Region I", "province": "Ilocos Norte", "population": 55729, "ecs": 2, "machineType": "Machine 1", "lguMachines": 59, "ecMachines": 1, "totalMachines": 60, "costPrice": 66000000, "sellRevenue": 132000000, "grossMargin": 66000000, "netRevenue": 132000000}, {"city": "Candon City", "region": "Region I", "province": "Ilocos Sur", "population": 60447, "ecs": 3, "machineType": "Machine 1", "lguMachines": 63, "ecMachines": 1, "totalMachines": 64, "costPrice": 70400000, "sellRevenue": 140800000, "grossMargin": 70400000, "netRevenue": 140800000}, {"city": "Dagupan City", "region": "Region I", "province": "Pangasinan", "population": 174302, "ecs": 3, "machineType": "Machine 1", "lguMachines": 182, "ecMachines": 1, "totalMachines": 183, "costPrice": 201300000, "sellRevenue": 402600000, "grossMargin": 201300000, "netRevenue": 402600000}, {"city": "Laoag City", "region": "Region I", "province": "Ilocos Norte", "population": 111582, "ecs": 1, "machineType": "Machine 1", "lguMachines": 117, "ecMachines": 1, "totalMachines": 118, "costPrice": 129800000, "sellRevenue": 259600000, "grossMargin": 129800000, "netRevenue": 259600000}, {"city": "San Carlos City", "region": "Region I", "province": "Pangasinan", "population": 188613, "ecs": 2, "machineType": "Machine 1", "lguMachines": 197, "ecMachines": 1, "totalMachines": 198, "costPrice": 217800000, "sellRevenue": 435600000, "grossMargin": 217800000, "netRevenue": 435600000}, {"city": "San Fernando City", "region": "Region I", "province": "La Union", "population": 127031, "ecs": 4, "machineType": "Machine 1", "lguMachines": 133, "ecMachines": 1, "totalMachines": 134, "costPrice": 147400000, "sellRevenue": 294800000, "grossMargin": 147400000, "netRevenue": 294800000}, {"city": "Urdaneta City", "region": "Region I", "province": "Pangasinan", "population": 130648, "ecs": 3, "machineType": "Machine 1", "lguMachines": 137, "ecMachines": 1, "totalMachines": 138, "costPrice": 151800000, "sellRevenue": 303600000, "grossMargin": 151800000, "netRevenue": 303600000}, {"city": "Vigan City", "region": "Region I", "province": "Ilocos Sur", "population": 53879, "ecs": 2, "machineType": "Machine 1", "lguMachines": 57, "ecMachines": 1, "totalMachines": 58, "costPrice": 63800000, "sellRevenue": 127600000, "grossMargin": 63800000, "netRevenue": 127600000}, {"city": "Alaminos City", "region": "Region I", "province": "Pangasinan", "population": 92562, "ecs": 1, "machineType": "Machine 1", "lguMachines": 97, "ecMachines": 1, "totalMachines": 98, "costPrice": 107800000, "sellRevenue": 215600000, "grossMargin": 107800000, "netRevenue": 215600000}, {"city": "Cauayan City", "region": "Region II", "province": "Isabela", "population": 133872, "ecs": 2, "machineType": "Machine 1", "lguMachines": 140, "ecMachines": 1, "totalMachines": 141, "costPrice": 155100000, "sellRevenue": 310200000, "grossMargin": 155100000, "netRevenue": 310200000}, {"city": "Ilagan City", "region": "Region II", "province": "Isabela", "population": 133871, "ecs": 3, "machineType": "Machine 1", "lguMachines": 140, "ecMachines": 1, "totalMachines": 141, "costPrice": 155100000, "sellRevenue": 310200000, "grossMargin": 155100000, "netRevenue": 310200000}, {"city": "Santiago City", "region": "Region II", "province": "Isabela", "population": 131442, "ecs": 1, "machineType": "Machine 1", "lguMachines": 137, "ecMachines": 1, "totalMachines": 138, "costPrice": 151800000, "sellRevenue": 303600000, "grossMargin": 151800000, "netRevenue": 303600000}, {"city": "Tuguegarao City", "region": "Region II", "province": "Cagayan", "population": 167967, "ecs": 1, "machineType": "Machine 1", "lguMachines": 175, "ecMachines": 1, "totalMachines": 176, "costPrice": 193600000, "sellRevenue": 387200000, "grossMargin": 193600000, "netRevenue": 387200000}, {"city": "Angeles City", "region": "Region III", "province": "Pampanga", "population": 462928, "ecs": 5, "machineType": "Machine 2", "lguMachines": 2043, "ecMachines": 1, "totalMachines": 2044, "costPrice": 2963800000, "sellRevenue": 5927600000, "grossMargin": 2963800000, "netRevenue": 5927600000}, {"city": "Balanga City", "region": "Region III", "province": "Bataan", "population": 107668, "ecs": 1, "machineType": "Machine 1", "lguMachines": 113, "ecMachines": 1, "totalMachines": 114, "costPrice": 125400000, "sellRevenue": 250800000, "grossMargin": 125400000, "netRevenue": 250800000}, {"city": "Cabanatuan City", "region": "Region III", "province": "Nueva Ecija", "population": 329590, "ecs": 4, "machineType": "Machine 2", "lguMachines": 1455, "ecMachines": 1, "totalMachines": 1456, "costPrice": 2111200000, "sellRevenue": 4222400000, "grossMargin": 2111200000, "netRevenue": 4222400000}, {"city": "Gapan City", "region": "Region III", "province": "Nueva Ecija", "population": 117547, "ecs": 3, "machineType": "Machine 1", "lguMachines": 123, "ecMachines": 1, "totalMachines": 124, "costPrice": 136400000, "sellRevenue": 272800000, "grossMargin": 136400000, "netRevenue": 272800000}, {"city": "Malolos City", "region": "Region III", "province": "Bulacan", "population": 252074, "ecs": 4, "machineType": "Machine 2", "lguMachines": 1113, "ecMachines": 1, "totalMachines": 1114, "costPrice": 1615300000, "sellRevenue": 3230600000, "grossMargin": 1615300000, "netRevenue": 3230600000}, {"city": "Meycauayan City", "region": "Region III", "province": "Bulacan", "population": 281406, "ecs": 2, "machineType": "Machine 2", "lguMachines": 1242, "ecMachines": 1, "totalMachines": 1243, "costPrice": 1802350000, "sellRevenue": 3604700000, "grossMargin": 1802350000, "netRevenue": 3604700000}, {"city": "Muñoz City", "region": "Region III", "province": "Nueva Ecija", "population": 87809, "ecs": 3, "machineType": "Machine 1", "lguMachines": 92, "ecMachines": 1, "totalMachines": 93, "costPrice": 102300000, "sellRevenue": 204600000, "grossMargin": 102300000, "netRevenue": 204600000}, {"city": "Olongapo City", "region": "Region III", "province": "Zambales", "population": 260619, "ecs": 5, "machineType": "Machine 2", "lguMachines": 1150, "ecMachines": 1, "totalMachines": 1151, "costPrice": 1668950000, "sellRevenue": 3337900000, "grossMargin": 1668950000, "netRevenue": 3337900000}, {"city": "Palayan City", "region": "Region III", "province": "Nueva Ecija", "population": 62167, "ecs": 3, "machineType": "Machine 1", "lguMachines": 65, "ecMachines": 1, "totalMachines": 66, "costPrice": 72600000, "sellRevenue": 145200000, "grossMargin": 72600000, "netRevenue": 145200000}, {"city": "San Fernando City (Pampanga)", "region": "Region III", "province": "Pampanga", "population": 345890, "ecs": 2, "machineType": "Machine 2", "lguMachines": 1526, "ecMachines": 1, "totalMachines": 1527, "costPrice": 2214150000, "sellRevenue": 4428300000, "grossMargin": 2214150000, "netRevenue": 4428300000}, {"city": "San Jose del Monte City", "region": "Region III", "province": "Bulacan", "population": 651017, "ecs": 7, "machineType": "Machine 3", "lguMachines": 136, "ecMachines": 1, "totalMachines": 137, "costPrice": 308250000, "sellRevenue": 616500000, "grossMargin": 308250000, "netRevenue": 616500000}, {"city": "Tarlac City", "region": "Region III", "province": "Tarlac", "population": 342493, "ecs": 2, "machineType": "Machine 2", "lguMachines": 1511, "ecMachines": 1, "totalMachines": 1512, "costPrice": 2192400000, "sellRevenue": 4384800000, "grossMargin": 2192400000, "netRevenue": 4384800000}, {"city": "Science City of Muñoz", "region": "Region III", "province": "Nueva Ecija", "population": 74433, "ecs": 3, "machineType": "Machine 1", "lguMachines": 78, "ecMachines": 1, "totalMachines": 79, "costPrice": 86900000, "sellRevenue": 173800000, "grossMargin": 86900000, "netRevenue": 173800000}, {"city": "Antipolo City", "region": "Region IV-A", "province": "Rizal", "population": 887399, "ecs": 6, "machineType": "Machine 3", "lguMachines": 185, "ecMachines": 1, "totalMachines": 186, "costPrice": 418500000, "sellRevenue": 837000000, "grossMargin": 418500000, "netRevenue": 837000000}, {"city": "Batangas City", "region": "Region IV-A", "province": "Batangas", "population": 352971, "ecs": 4, "machineType": "Machine 2", "lguMachines": 1558, "ecMachines": 1, "totalMachines": 1559, "costPrice": 2260550000, "sellRevenue": 4521100000, "grossMargin": 2260550000, "netRevenue": 4521100000}, {"city": "Biñan City", "region": "Region IV-A", "province": "Laguna", "population": 399780, "ecs": 3, "machineType": "Machine 2", "lguMachines": 1764, "ecMachines": 1, "totalMachines": 1765, "costPrice": 2559250000, "sellRevenue": 5118500000, "grossMargin": 2559250000, "netRevenue": 5118500000}, {"city": "Calamba City", "region": "Region IV-A", "province": "Laguna", "population": 539671, "ecs": 4, "machineType": "Machine 3", "lguMachines": 113, "ecMachines": 1, "totalMachines": 114, "costPrice": 256500000, "sellRevenue": 513000000, "grossMargin": 256500000, "netRevenue": 513000000}, {"city": "Cavite City", "region": "Region IV-A", "province": "Cavite", "population": 110182, "ecs": 1, "machineType": "Machine 1", "lguMachines": 115, "ecMachines": 1, "totalMachines": 116, "costPrice": 127600000, "sellRevenue": 255200000, "grossMargin": 127600000, "netRevenue": 255200000}, {"city": "Dasmariñas City", "region": "Region IV-A", "province": "Cavite", "population": 703141, "ecs": 5, "machineType": "Machine 3", "lguMachines": 147, "ecMachines": 1, "totalMachines": 148, "costPrice": 333000000, "sellRevenue": 666000000, "grossMargin": 333000000, "netRevenue": 666000000}, {"city": "Lipa City", "region": "Region IV-A", "province": "Batangas", "population": 332386, "ecs": 4, "machineType": "Machine 2", "lguMachines": 1467, "ecMachines": 1, "totalMachines": 1468, "costPrice": 2128600000, "sellRevenue": 4257200000, "grossMargin": 2128600000, "netRevenue": 4257200000}, {"city": "Lucena City", "region": "Region IV-A", "province": "Quezon", "population": 266629, "ecs": 2, "machineType": "Machine 2", "lguMachines": 1177, "ecMachines": 1, "totalMachines": 1178, "costPrice": 1708100000, "sellRevenue": 3416200000, "grossMargin": 1708100000, "netRevenue": 3416200000}, {"city": "San Pablo City", "region": "Region IV-A", "province": "Laguna", "population": 269706, "ecs": 3, "machineType": "Machine 2", "lguMachines": 1190, "ecMachines": 1, "totalMachines": 1191, "costPrice": 1726950000, "sellRevenue": 3453900000, "grossMargin": 1726950000, "netRevenue": 3453900000}, {"city": "San Pedro City", "region": "Region IV-A", "province": "Laguna", "population": 325809, "ecs": 2, "machineType": "Machine 2", "lguMachines": 1438, "ecMachines": 1, "totalMachines": 1439, "costPrice": 2086550000, "sellRevenue": 4173100000, "grossMargin": 2086550000, "netRevenue": 4173100000}, {"city": "Santa Rosa City", "region": "Region IV-A", "province": "Laguna", "population": 353767, "ecs": 5, "machineType": "Machine 2", "lguMachines": 1561, "ecMachines": 1, "totalMachines": 1562, "costPrice": 2264900000, "sellRevenue": 4529800000, "grossMargin": 2264900000, "netRevenue": 4529800000}, {"city": "Tagaytay City", "region": "Region IV-A", "province": "Cavite", "population": 78729, "ecs": 2, "machineType": "Machine 1", "lguMachines": 83, "ecMachines": 1, "totalMachines": 84, "costPrice": 92400000, "sellRevenue": 184800000, "grossMargin": 92400000, "netRevenue": 184800000}, {"city": "Tayabas City", "region": "Region IV-A", "province": "Quezon", "population": 122767, "ecs": 4, "machineType": "Machine 1", "lguMachines": 128, "ecMachines": 1, "totalMachines": 129, "costPrice": 141900000, "sellRevenue": 283800000, "grossMargin": 141900000, "netRevenue": 283800000}, {"city": "Trece Martires City", "region": "Region IV-A", "province": "Cavite", "population": 158487, "ecs": 3, "machineType": "Machine 1", "lguMachines": 166, "ecMachines": 1, "totalMachines": 167, "costPrice": 183700000, "sellRevenue": 367400000, "grossMargin": 183700000, "netRevenue": 367400000}, {"city": "General Trias City", "region": "Region IV-A", "province": "Cavite", "population": 340799, "ecs": 3, "machineType": "Machine 2", "lguMachines": 1504, "ecMachines": 1, "totalMachines": 1505, "costPrice": 2182250000, "sellRevenue": 4364500000, "grossMargin": 2182250000, "netRevenue": 4364500000}, {"city": "Imus City", "region": "Region IV-A", "province": "Cavite", "population": 497940, "ecs": 4, "machineType": "Machine 2", "lguMachines": 2197, "ecMachines": 1, "totalMachines": 2198, "costPrice": 3187100000, "sellRevenue": 6374200000, "grossMargin": 3187100000, "netRevenue": 6374200000}, {"city": "Calapan City", "region": "Region IV-B", "province": "Oriental Mindoro", "population": 133091, "ecs": 3, "machineType": "Machine 1", "lguMachines": 139, "ecMachines": 1, "totalMachines": 140, "costPrice": 154000000, "sellRevenue": 308000000, "grossMargin": 154000000, "netRevenue": 308000000}, {"city": "Puerto Princesa City", "region": "Region IV-B", "province": "Palawan", "population": 307079, "ecs": 3, "machineType": "Machine 2", "lguMachines": 1355, "ecMachines": 1, "totalMachines": 1356, "costPrice": 1966200000, "sellRevenue": 3932400000, "grossMargin": 1966200000, "netRevenue": 3932400000}, {"city": "Iriga City", "region": "Region V", "province": "Camarines Sur", "population": 111166, "ecs": 3, "machineType": "Machine 1", "lguMachines": 116, "ecMachines": 1, "totalMachines": 117, "costPrice": 128700000, "sellRevenue": 257400000, "grossMargin": 128700000, "netRevenue": 257400000}, {"city": "Legazpi City", "region": "Region V", "province": "Albay", "population": 209533, "ecs": 2, "machineType": "Machine 2", "lguMachines": 925, "ecMachines": 1, "totalMachines": 926, "costPrice": 1342700000, "sellRevenue": 2685400000, "grossMargin": 1342700000, "netRevenue": 2685400000}, {"city": "Ligao City", "region": "Region V", "province": "Albay", "population": 83673, "ecs": 3, "machineType": "Machine 1", "lguMachines": 88, "ecMachines": 1, "totalMachines": 89, "costPrice": 97900000, "sellRevenue": 195800000, "grossMargin": 97900000, "netRevenue": 195800000}, {"city": "Masbate City", "region": "Region V", "province": "Masbate", "population": 92981, "ecs": 3, "machineType": "Machine 1", "lguMachines": 97, "ecMachines": 1, "totalMachines": 98, "costPrice": 107800000, "sellRevenue": 215600000, "grossMargin": 107800000, "netRevenue": 215600000}, {"city": "Naga City", "region": "Region V", "province": "Camarines Sur", "population": 196212, "ecs": 2, "machineType": "Machine 1", "lguMachines": 205, "ecMachines": 1, "totalMachines": 206, "costPrice": 226600000, "sellRevenue": 453200000, "grossMargin": 226600000, "netRevenue": 453200000}, {"city": "Sorsogon City", "region": "Region V", "province": "Sorsogon", "population": 151454, "ecs": 2, "machineType": "Machine 1", "lguMachines": 158, "ecMachines": 1, "totalMachines": 159, "costPrice": 174900000, "sellRevenue": 349800000, "grossMargin": 174900000, "netRevenue": 349800000}, {"city": "Tabaco City", "region": "Region V", "province": "Albay", "population": 125103, "ecs": 2, "machineType": "Machine 1", "lguMachines": 131, "ecMachines": 1, "totalMachines": 132, "costPrice": 145200000, "sellRevenue": 290400000, "grossMargin": 145200000, "netRevenue": 290400000}, {"city": "Bacolod City", "region": "Region VI", "province": "Negros Occidental", "population": 600783, "ecs": 7, "machineType": "Machine 3", "lguMachines": 126, "ecMachines": 1, "totalMachines": 127, "costPrice": 285750000, "sellRevenue": 571500000, "grossMargin": 285750000, "netRevenue": 571500000}, {"city": "Cadiz City", "region": "Region VI", "province": "Negros Occidental", "population": 161964, "ecs": 4, "machineType": "Machine 1", "lguMachines": 169, "ecMachines": 1, "totalMachines": 170, "costPrice": 187000000, "sellRevenue": 374000000, "grossMargin": 187000000, "netRevenue": 374000000}, {"city": "Escalante City", "region": "Region VI", "province": "Negros Occidental", "population": 87109, "ecs": 2, "machineType": "Machine 1", "lguMachines": 91, "ecMachines": 1, "totalMachines": 92, "costPrice": 101200000, "sellRevenue": 202400000, "grossMargin": 101200000, "netRevenue": 202400000}, {"city": "Himamaylan City", "region": "Region VI", "province": "Negros Occidental", "population": 96805, "ecs": 3, "machineType": "Machine 1", "lguMachines": 101, "ecMachines": 1, "totalMachines": 102, "costPrice": 112200000, "sellRevenue": 224400000, "grossMargin": 112200000, "netRevenue": 224400000}, {"city": "Iloilo City", "region": "Region VI", "province": "Iloilo", "population": 457626, "ecs": 3, "machineType": "Machine 2", "lguMachines": 2019, "ecMachines": 1, "totalMachines": 2020, "costPrice": 2929000000, "sellRevenue": 5858000000, "grossMargin": 2929000000, "netRevenue": 5858000000}, {"city": "Kabankalan City", "region": "Region VI", "province": "Negros Occidental", "population": 190632, "ecs": 3, "machineType": "Machine 1", "lguMachines": 199, "ecMachines": 1, "totalMachines": 200, "costPrice": 220000000, "sellRevenue": 440000000, "grossMargin": 220000000, "netRevenue": 440000000}, {"city": "La Carlota City", "region": "Region VI", "province": "Negros Occidental", "population": 67439, "ecs": 1, "machineType": "Machine 1", "lguMachines": 71, "ecMachines": 1, "totalMachines": 72, "costPrice": 79200000, "sellRevenue": 158400000, "grossMargin": 79200000, "netRevenue": 158400000}, {"city": "Roxas City", "region": "Region VI", "province": "Capiz", "population": 167994, "ecs": 2, "machineType": "Machine 1", "lguMachines": 175, "ecMachines": 1, "totalMachines": 176, "costPrice": 193600000, "sellRevenue": 387200000, "grossMargin": 193600000, "netRevenue": 387200000}, {"city": "Sagay City", "region": "Region VI", "province": "Negros Occidental", "population": 145650, "ecs": 1, "machineType": "Machine 1", "lguMachines": 152, "ecMachines": 1, "totalMachines": 153, "costPrice": 168300000, "sellRevenue": 336600000, "grossMargin": 168300000, "netRevenue": 336600000}, {"city": "San Carlos City (Neg. Occ.)", "region": "Region VI", "province": "Negros Occidental", "population": 133906, "ecs": 3, "machineType": "Machine 1", "lguMachines": 140, "ecMachines": 1, "totalMachines": 141, "costPrice": 155100000, "sellRevenue": 310200000, "grossMargin": 155100000, "netRevenue": 310200000}, {"city": "Silay City", "region": "Region VI", "province": "Negros Occidental", "population": 130477, "ecs": 4, "machineType": "Machine 1", "lguMachines": 136, "ecMachines": 1, "totalMachines": 137, "costPrice": 150700000, "sellRevenue": 301400000, "grossMargin": 150700000, "netRevenue": 301400000}, {"city": "Sipalay City", "region": "Region VI", "province": "Negros Occidental", "population": 65684, "ecs": 2, "machineType": "Machine 1", "lguMachines": 69, "ecMachines": 1, "totalMachines": 70, "costPrice": 77000000, "sellRevenue": 154000000, "grossMargin": 77000000, "netRevenue": 154000000}, {"city": "Talisay City (Neg. Occ.)", "region": "Region VI", "province": "Negros Occidental", "population": 124948, "ecs": 1, "machineType": "Machine 1", "lguMachines": 131, "ecMachines": 1, "totalMachines": 132, "costPrice": 145200000, "sellRevenue": 290400000, "grossMargin": 145200000, "netRevenue": 290400000}, {"city": "Victorias City", "region": "Region VI", "province": "Negros Occidental", "population": 99932, "ecs": 1, "machineType": "Machine 1", "lguMachines": 105, "ecMachines": 1, "totalMachines": 106, "costPrice": 116600000, "sellRevenue": 233200000, "grossMargin": 116600000, "netRevenue": 233200000}, {"city": "Bogo City", "region": "Region VII", "province": "Cebu", "population": 87479, "ecs": 3, "machineType": "Machine 1", "lguMachines": 92, "ecMachines": 1, "totalMachines": 93, "costPrice": 102300000, "sellRevenue": 204600000, "grossMargin": 102300000, "netRevenue": 204600000}, {"city": "Carcar City", "region": "Region VII", "province": "Cebu", "population": 143568, "ecs": 3, "machineType": "Machine 1", "lguMachines": 150, "ecMachines": 1, "totalMachines": 151, "costPrice": 166100000, "sellRevenue": 332200000, "grossMargin": 166100000, "netRevenue": 332200000}, {"city": "Cebu City", "region": "Region VII", "province": "Cebu", "population": 964169, "ecs": 5, "machineType": "Machine 3", "lguMachines": 201, "ecMachines": 1, "totalMachines": 202, "costPrice": 454500000, "sellRevenue": 909000000, "grossMargin": 454500000, "netRevenue": 909000000}, {"city": "Danao City", "region": "Region VII", "province": "Cebu", "population": 119590, "ecs": 4, "machineType": "Machine 1", "lguMachines": 125, "ecMachines": 1, "totalMachines": 126, "costPrice": 138600000, "sellRevenue": 277200000, "grossMargin": 138600000, "netRevenue": 277200000}, {"city": "Dumaguete City", "region": "Region VII", "province": "Negros Oriental", "population": 136000, "ecs": 4, "machineType": "Machine 1", "lguMachines": 142, "ecMachines": 1, "totalMachines": 143, "costPrice": 157300000, "sellRevenue": 314600000, "grossMargin": 157300000, "netRevenue": 314600000}, {"city": "Lapu-Lapu City", "region": "Region VII", "province": "Cebu", "population": 497604, "ecs": 5, "machineType": "Machine 2", "lguMachines": 2196, "ecMachines": 1, "totalMachines": 2197, "costPrice": 3185650000, "sellRevenue": 6371300000, "grossMargin": 3185650000, "netRevenue": 6371300000}, {"city": "Mandaue City", "region": "Region VII", "province": "Cebu", "population": 364116, "ecs": 3, "machineType": "Machine 2", "lguMachines": 1607, "ecMachines": 1, "totalMachines": 1608, "costPrice": 2331600000, "sellRevenue": 4663200000, "grossMargin": 2331600000, "netRevenue": 4663200000}, {"city": "Naga City (Cebu)", "region": "Region VII", "province": "Cebu", "population": 147929, "ecs": 3, "machineType": "Machine 1", "lguMachines": 155, "ecMachines": 1, "totalMachines": 156, "costPrice": 171600000, "sellRevenue": 343200000, "grossMargin": 171600000, "netRevenue": 343200000}, {"city": "Tagbilaran City", "region": "Region VII", "province": "Bohol", "population": 105637, "ecs": 2, "machineType": "Machine 1", "lguMachines": 111, "ecMachines": 1, "totalMachines": 112, "costPrice": 123200000, "sellRevenue": 246400000, "grossMargin": 123200000, "netRevenue": 246400000}, {"city": "Talisay City (Cebu)", "region": "Region VII", "province": "Cebu", "population": 221893, "ecs": 3, "machineType": "Machine 2", "lguMachines": 979, "ecMachines": 1, "totalMachines": 980, "costPrice": 1421000000, "sellRevenue": 2842000000, "grossMargin": 1421000000, "netRevenue": 2842000000}, {"city": "Toledo City", "region": "Region VII", "province": "Cebu", "population": 187951, "ecs": 3, "machineType": "Machine 1", "lguMachines": 196, "ecMachines": 1, "totalMachines": 197, "costPrice": 216700000, "sellRevenue": 433400000, "grossMargin": 216700000, "netRevenue": 433400000}, {"city": "Bayawan City", "region": "Region VII", "province": "Negros Oriental", "population": 100328, "ecs": 4, "machineType": "Machine 1", "lguMachines": 105, "ecMachines": 1, "totalMachines": 106, "costPrice": 116600000, "sellRevenue": 233200000, "grossMargin": 116600000, "netRevenue": 233200000}, {"city": "Tanjay City", "region": "Region VII", "province": "Negros Oriental", "population": 73490, "ecs": 3, "machineType": "Machine 1", "lguMachines": 77, "ecMachines": 1, "totalMachines": 78, "costPrice": 85800000, "sellRevenue": 171600000, "grossMargin": 85800000, "netRevenue": 171600000}, {"city": "Baybay City", "region": "Region VIII", "province": "Leyte", "population": 109432, "ecs": 4, "machineType": "Machine 1", "lguMachines": 114, "ecMachines": 1, "totalMachines": 115, "costPrice": 126500000, "sellRevenue": 253000000, "grossMargin": 126500000, "netRevenue": 253000000}, {"city": "Borongan City", "region": "Region VIII", "province": "Eastern Samar", "population": 51024, "ecs": 2, "machineType": "Machine 1", "lguMachines": 54, "ecMachines": 1, "totalMachines": 55, "costPrice": 60500000, "sellRevenue": 121000000, "grossMargin": 60500000, "netRevenue": 121000000}, {"city": "Calbayog City", "region": "Region VIII", "province": "Western Samar", "population": 183247, "ecs": 2, "machineType": "Machine 1", "lguMachines": 191, "ecMachines": 1, "totalMachines": 192, "costPrice": 211200000, "sellRevenue": 422400000, "grossMargin": 211200000, "netRevenue": 422400000}, {"city": "Catbalogan City", "region": "Region VIII", "province": "Western Samar", "population": 101142, "ecs": 2, "machineType": "Machine 1", "lguMachines": 106, "ecMachines": 1, "totalMachines": 107, "costPrice": 117700000, "sellRevenue": 235400000, "grossMargin": 117700000, "netRevenue": 235400000}, {"city": "Maasin City", "region": "Region VIII", "province": "Southern Leyte", "population": 88966, "ecs": 3, "machineType": "Machine 1", "lguMachines": 93, "ecMachines": 1, "totalMachines": 94, "costPrice": 103400000, "sellRevenue": 206800000, "grossMargin": 103400000, "netRevenue": 206800000}, {"city": "Ormoc City", "region": "Region VIII", "province": "Leyte", "population": 245047, "ecs": 5, "machineType": "Machine 2", "lguMachines": 1082, "ecMachines": 1, "totalMachines": 1083, "costPrice": 1570350000, "sellRevenue": 3140700000, "grossMargin": 1570350000, "netRevenue": 3140700000}, {"city": "Tacloban City", "region": "Region VIII", "province": "Leyte", "population": 251881, "ecs": 2, "machineType": "Machine 2", "lguMachines": 1112, "ecMachines": 1, "totalMachines": 1113, "costPrice": 1613850000, "sellRevenue": 3227700000, "grossMargin": 1613850000, "netRevenue": 3227700000}, {"city": "Dapitan City", "region": "Region IX", "province": "Zamboanga del Norte", "population": 87109, "ecs": 1, "machineType": "Machine 1", "lguMachines": 91, "ecMachines": 1, "totalMachines": 92, "costPrice": 101200000, "sellRevenue": 202400000, "grossMargin": 101200000, "netRevenue": 202400000}, {"city": "Dipolog City", "region": "Region IX", "province": "Zamboanga del Norte", "population": 131966, "ecs": 1, "machineType": "Machine 1", "lguMachines": 138, "ecMachines": 1, "totalMachines": 139, "costPrice": 152900000, "sellRevenue": 305800000, "grossMargin": 152900000, "netRevenue": 305800000}, {"city": "Isabela City", "region": "Region IX", "province": "Basilan", "population": 101058, "ecs": 2, "machineType": "Machine 1", "lguMachines": 106, "ecMachines": 1, "totalMachines": 107, "costPrice": 117700000, "sellRevenue": 235400000, "grossMargin": 117700000, "netRevenue": 235400000}, {"city": "Pagadian City", "region": "Region IX", "province": "Zamboanga del Sur", "population": 197936, "ecs": 2, "machineType": "Machine 1", "lguMachines": 207, "ecMachines": 1, "totalMachines": 208, "costPrice": 228800000, "sellRevenue": 457600000, "grossMargin": 228800000, "netRevenue": 457600000}, {"city": "Zamboanga City", "region": "Region IX", "province": "Zamboanga del Sur", "population": 977234, "ecs": 7, "machineType": "Machine 3", "lguMachines": 204, "ecMachines": 1, "totalMachines": 205, "costPrice": 461250000, "sellRevenue": 922500000, "grossMargin": 461250000, "netRevenue": 922500000}, {"city": "Cagayan de Oro City", "region": "Region X", "province": "Misamis Oriental", "population": 728402, "ecs": 4, "machineType": "Machine 3", "lguMachines": 152, "ecMachines": 1, "totalMachines": 153, "costPrice": 344250000, "sellRevenue": 688500000, "grossMargin": 344250000, "netRevenue": 688500000}, {"city": "Gingoog City", "region": "Region X", "province": "Misamis Oriental", "population": 110369, "ecs": 4, "machineType": "Machine 1", "lguMachines": 115, "ecMachines": 1, "totalMachines": 116, "costPrice": 127600000, "sellRevenue": 255200000, "grossMargin": 127600000, "netRevenue": 255200000}, {"city": "Iligan City", "region": "Region X", "province": "Lanao del Norte", "population": 363115, "ecs": 5, "machineType": "Machine 2", "lguMachines": 1602, "ecMachines": 1, "totalMachines": 1603, "costPrice": 2324350000, "sellRevenue": 4648700000, "grossMargin": 2324350000, "netRevenue": 4648700000}, {"city": "Malaybalay City", "region": "Region X", "province": "Bukidnon", "population": 172377, "ecs": 4, "machineType": "Machine 1", "lguMachines": 180, "ecMachines": 1, "totalMachines": 181, "costPrice": 199100000, "sellRevenue": 398200000, "grossMargin": 199100000, "netRevenue": 398200000}, {"city": "Oroquieta City", "region": "Region X", "province": "Misamis Occidental", "population": 70553, "ecs": 3, "machineType": "Machine 1", "lguMachines": 74, "ecMachines": 1, "totalMachines": 75, "costPrice": 82500000, "sellRevenue": 165000000, "grossMargin": 82500000, "netRevenue": 165000000}, {"city": "Ozamiz City", "region": "Region X", "province": "Misamis Occidental", "population": 141575, "ecs": 3, "machineType": "Machine 1", "lguMachines": 148, "ecMachines": 1, "totalMachines": 149, "costPrice": 163900000, "sellRevenue": 327800000, "grossMargin": 163900000, "netRevenue": 327800000}, {"city": "Tangub City", "region": "Region X", "province": "Misamis Occidental", "population": 57332, "ecs": 3, "machineType": "Machine 1", "lguMachines": 60, "ecMachines": 1, "totalMachines": 61, "costPrice": 67100000, "sellRevenue": 134200000, "grossMargin": 67100000, "netRevenue": 134200000}, {"city": "Valencia City", "region": "Region X", "province": "Bukidnon", "population": 205518, "ecs": 2, "machineType": "Machine 2", "lguMachines": 907, "ecMachines": 1, "totalMachines": 908, "costPrice": 1316600000, "sellRevenue": 2633200000, "grossMargin": 1316600000, "netRevenue": 2633200000}, {"city": "El Salvador City", "region": "Region X", "province": "Misamis Oriental", "population": 61820, "ecs": 3, "machineType": "Machine 1", "lguMachines": 65, "ecMachines": 1, "totalMachines": 66, "costPrice": 72600000, "sellRevenue": 145200000, "grossMargin": 72600000, "netRevenue": 145200000}, {"city": "Davao City", "region": "Region XI", "province": "Davao del Sur", "population": 1776949, "ecs": 6, "machineType": "Machine 3", "lguMachines": 371, "ecMachines": 1, "totalMachines": 372, "costPrice": 837000000, "sellRevenue": 1674000000, "grossMargin": 837000000, "netRevenue": 1674000000}, {"city": "Digos City", "region": "Region XI", "province": "Davao del Sur", "population": 196264, "ecs": 3, "machineType": "Machine 1", "lguMachines": 205, "ecMachines": 1, "totalMachines": 206, "costPrice": 226600000, "sellRevenue": 453200000, "grossMargin": 226600000, "netRevenue": 453200000}, {"city": "Island Garden City of Samal", "region": "Region XI", "province": "Davao de Oro", "population": 124284, "ecs": 3, "machineType": "Machine 1", "lguMachines": 130, "ecMachines": 1, "totalMachines": 131, "costPrice": 144100000, "sellRevenue": 288200000, "grossMargin": 144100000, "netRevenue": 288200000}, {"city": "Mati City", "region": "Region XI", "province": "Davao Oriental", "population": 139364, "ecs": 1, "machineType": "Machine 1", "lguMachines": 146, "ecMachines": 1, "totalMachines": 147, "costPrice": 161700000, "sellRevenue": 323400000, "grossMargin": 161700000, "netRevenue": 323400000}, {"city": "Panabo City", "region": "Region XI", "province": "Davao del Norte", "population": 178451, "ecs": 3, "machineType": "Machine 1", "lguMachines": 186, "ecMachines": 1, "totalMachines": 187, "costPrice": 205700000, "sellRevenue": 411400000, "grossMargin": 205700000, "netRevenue": 411400000}, {"city": "Tagum City", "region": "Region XI", "province": "Davao del Norte", "population": 296202, "ecs": 5, "machineType": "Machine 2", "lguMachines": 1307, "ecMachines": 1, "totalMachines": 1308, "costPrice": 1896600000, "sellRevenue": 3793200000, "grossMargin": 1896600000, "netRevenue": 3793200000}, {"city": "Samal City", "region": "Region XI", "province": "Davao del Norte", "population": 124284, "ecs": 2, "machineType": "Machine 1", "lguMachines": 130, "ecMachines": 1, "totalMachines": 131, "costPrice": 144100000, "sellRevenue": 288200000, "grossMargin": 144100000, "netRevenue": 288200000}, {"city": "Cotabato City", "region": "Region XII", "province": "Maguindanao", "population": 325079, "ecs": 5, "machineType": "Machine 2", "lguMachines": 1435, "ecMachines": 1, "totalMachines": 1436, "costPrice": 2082200000, "sellRevenue": 4164400000, "grossMargin": 2082200000, "netRevenue": 4164400000}, {"city": "General Santos City", "region": "Region XII", "province": "South Cotabato", "population": 697315, "ecs": 4, "machineType": "Machine 3", "lguMachines": 146, "ecMachines": 1, "totalMachines": 147, "costPrice": 330750000, "sellRevenue": 661500000, "grossMargin": 330750000, "netRevenue": 661500000}, {"city": "Kidapawan City", "region": "Region XII", "province": "Cotabato", "population": 162286, "ecs": 3, "machineType": "Machine 1", "lguMachines": 170, "ecMachines": 1, "totalMachines": 171, "costPrice": 188100000, "sellRevenue": 376200000, "grossMargin": 188100000, "netRevenue": 376200000}, {"city": "Koronadal City", "region": "Region XII", "province": "South Cotabato", "population": 181576, "ecs": 2, "machineType": "Machine 1", "lguMachines": 190, "ecMachines": 1, "totalMachines": 191, "costPrice": 210100000, "sellRevenue": 420200000, "grossMargin": 210100000, "netRevenue": 420200000}, {"city": "Tacurong City", "region": "Region XII", "province": "Sultan Kudarat", "population": 87756, "ecs": 3, "machineType": "Machine 1", "lguMachines": 92, "ecMachines": 1, "totalMachines": 93, "costPrice": 102300000, "sellRevenue": 204600000, "grossMargin": 102300000, "netRevenue": 204600000}, {"city": "Bislig City", "region": "Region XIII", "province": "Surigao del Sur", "population": 102813, "ecs": 1, "machineType": "Machine 1", "lguMachines": 108, "ecMachines": 1, "totalMachines": 109, "costPrice": 119900000, "sellRevenue": 239800000, "grossMargin": 119900000, "netRevenue": 239800000}, {"city": "Butuan City", "region": "Region XIII", "province": "Agusan del Norte", "population": 372910, "ecs": 4, "machineType": "Machine 2", "lguMachines": 1646, "ecMachines": 1, "totalMachines": 1647, "costPrice": 2388150000, "sellRevenue": 4776300000, "grossMargin": 2388150000, "netRevenue": 4776300000}, {"city": "Cabadbaran City", "region": "Region XIII", "province": "Agusan del Norte", "population": 57024, "ecs": 3, "machineType": "Machine 1", "lguMachines": 60, "ecMachines": 1, "totalMachines": 61, "costPrice": 67100000, "sellRevenue": 134200000, "grossMargin": 67100000, "netRevenue": 134200000}, {"city": "Bayugan City", "region": "Region XIII", "province": "Agusan del Sur", "population": 61764, "ecs": 3, "machineType": "Machine 1", "lguMachines": 65, "ecMachines": 1, "totalMachines": 66, "costPrice": 72600000, "sellRevenue": 145200000, "grossMargin": 72600000, "netRevenue": 145200000}, {"city": "Surigao City", "region": "Region XIII", "province": "Surigao del Norte", "population": 171107, "ecs": 2, "machineType": "Machine 1", "lguMachines": 179, "ecMachines": 1, "totalMachines": 180, "costPrice": 198000000, "sellRevenue": 396000000, "grossMargin": 198000000, "netRevenue": 396000000}, {"city": "Tandag City", "region": "Region XIII", "province": "Surigao del Sur", "population": 57028, "ecs": 1, "machineType": "Machine 1", "lguMachines": 60, "ecMachines": 1, "totalMachines": 61, "costPrice": 67100000, "sellRevenue": 134200000, "grossMargin": 67100000, "netRevenue": 134200000}, {"city": "Marawi City", "region": "BARMM", "province": "Lanao del Sur", "population": 201785, "ecs": 4, "machineType": "Machine 2", "lguMachines": 891, "ecMachines": 1, "totalMachines": 892, "costPrice": 1293400000, "sellRevenue": 2586800000, "grossMargin": 1293400000, "netRevenue": 2586800000}, {"city": "Lamitan City", "region": "BARMM", "province": "Basilan", "population": 69003, "ecs": 1, "machineType": "Machine 1", "lguMachines": 72, "ecMachines": 1, "totalMachines": 73, "costPrice": 80300000, "sellRevenue": 160600000, "grossMargin": 80300000, "netRevenue": 160600000}];

// Machine specs (from PARAMS sheet)
const MACH_COST = {1:1100000, 2:1450000, 3:2250000};
const MACH_SELL = {1:2200000, 2:2900000, 3:4500000};
const MACH_CAP  = {1:7200,    2:1700,    3:36000};
const SOP=.15, MONEY=.10, MKTG=.05, SHARE=.25;

// Chart registry
const CI = {};
const fmt  = n => Number(n).toLocaleString("en-US");
const fmtM = n => (n/1e6).toFixed(1);
const fmtB = n => "\u20b1" + (n/1e9).toFixed(2) + "B";

function dc(id, config) {
  if (CI[id]) CI[id].destroy();
  const canvas = document.getElementById(id);
  if (!canvas) return;
  CI[id] = new Chart(canvas, config);
}

// Toast notification
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

// Page navigation
function showPage(page, btn) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
  document.getElementById("page-" + page).classList.add("active");
  if (btn) btn.classList.add("active");
  if (page === "regions") renderRegionGrid();
  if (page === "financial") buildFinancial();
  if (page === "params") buildParams();
  if (page === "priority") renderPriorityTable();
}

// Excel upload handler — maps column names from the xlsx
function handleExcelUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const wb = XLSX.read(new Uint8Array(e.target.result), {type:"array"});
      // Try to find LGU DATA sheet
      const sheetName = wb.SheetNames.find(s => s.includes("LGU DATA")) || wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, {defval:""});
      if (rows.length === 0) { alert("No data found in sheet: " + sheetName); return; }
      // Try multiple column name formats
      const get = (row, ...keys) => { for (const k of keys) if (row[k] !== undefined && row[k] !== "") return row[k]; return 0; };
      const mapped = rows.map(r => ({
        city:         String(get(r,"city","City","City / Municipality") || ""),
        region:       String(get(r,"region","Region") || ""),
        province:     String(get(r,"province","Province") || ""),
        population:   +get(r,"population","Population","PSA 2020\nPopulation") || 0,
        ecs:          +get(r,"ecs","ECs","Evac\nCenters") || 0,
        machineType:  String(get(r,"machineType","Machine Type","Machine\nType\n=IF(Pop>500K,M3,\nIF(Pop>200K,M2,M1))") || ""),
        lguMachines:  +get(r,"lguMachines","LGU Machines","LGU Machines\nNeeded\n=CEILING(I÷H,1)") || 0,
        ecMachines:   +get(r,"ecMachines","EC Machines","EC Machines\nNeeded\n=CEILING(L÷H,1)") || 0,
        totalMachines:+get(r,"totalMachines","Total Machines","TOTAL\nMachines\n=J+M") || 0,
        costPrice:    +get(r,"costPrice","Cost Price","Cost Price (₱)\n=O×Machine Cost\n→PARAMS") || 0,
        sellRevenue:  +get(r,"sellRevenue","Sell Revenue","Selling Rev (₱)\n=O×Sell Price\n→PARAMS") || 0,
        grossMargin:  +get(r,"grossMargin","Gross Margin","Gross\nMargin (₱)\n=S-R") || 0,
        netRevenue:   +get(r,"netRevenue","Net Revenue","Net\nRevenue (₱)\n=S-U-V-W-X") || 0,
      })).filter(d => d.city && !d.city.includes("NATIONAL") && !d.city.includes("ADD SLICERS") && d.population > 0);
      if (mapped.length === 0) { alert("Could not map data. Check column headers match expected format."); return; }
      DATA = mapped;
      rebuildAll();
      toast("✓ Loaded " + DATA.length + " cities from " + file.name);
    } catch(err) { alert("Error reading Excel: " + err.message); }
  };
  reader.readAsArrayBuffer(file);
  event.target.value = "";
}

function rebuildAll() {
  buildDashboard();
  populateCityFilters();
  renderCityTable();
  buildParams();
}

// ============================================================
// DASHBOARD
// ============================================================
function buildDashboard() {
  const totMach = DATA.reduce((a,d) => a + d.totalMachines, 0);
  const totLgu  = DATA.reduce((a,d) => a + d.lguMachines, 0);
  const totEc   = DATA.reduce((a,d) => a + d.ecMachines, 0);
  const totCost = DATA.reduce((a,d) => a + d.costPrice, 0);
  const totRev  = DATA.reduce((a,d) => a + d.sellRevenue, 0);

  document.getElementById("h-cities").textContent    = DATA.length;
  document.getElementById("h-machines").textContent  = fmt(totMach);
  document.getElementById("h-cost").textContent      = fmtB(totCost);
  document.getElementById("kpi-total").textContent   = fmt(totMach);
  document.getElementById("kpi-lgu").textContent     = fmt(totLgu);
  document.getElementById("kpi-ec").textContent      = fmt(totEc);
  document.getElementById("kpi-cost").textContent    = fmtB(totCost);
  document.getElementById("kpi-cost-sub").textContent= "Total procurement cost";
  document.getElementById("kpi-rev").textContent     = fmtB(totRev);
  document.getElementById("kpi-rev-sub").textContent = "Gross margin: " + fmtB(totRev - totCost);

  const reg = getRegData();
  const labels = reg.map(r => r.r);

  dc("d-mach-reg", {type:"bar", data:{labels,
    datasets:[
      {label:"LGU", data:reg.map(r=>r.lgu), backgroundColor:"#378ADD", borderWidth:0, borderRadius:3},
      {label:"EC",  data:reg.map(r=>r.ec),  backgroundColor:"#1D9E75", borderWidth:0, borderRadius:3}
    ]}, options:{responsive:true, maintainAspectRatio:false,
    plugins:{legend:{display:false}, tooltip:{callbacks:{label:c => c.dataset.label+": "+fmt(c.parsed.y)}}},
    scales:{x:{stacked:true,ticks:{font:{size:10}}}, y:{stacked:true}}}});

  dc("d-type-reg", {type:"bar", data:{labels,
    datasets:[
      {label:"M1 (7,200L)", data:reg.map(r=>r.m1), backgroundColor:"#185FA5", borderWidth:0, borderRadius:3},
      {label:"M2 (1,700L)", data:reg.map(r=>r.m2), backgroundColor:"#27500A", borderWidth:0, borderRadius:3},
      {label:"M3 (36,000L)",data:reg.map(r=>r.m3), backgroundColor:"#A32D2D", borderWidth:0, borderRadius:3}
    ]}, options:{responsive:true, maintainAspectRatio:false,
    plugins:{legend:{display:false}},
    scales:{x:{stacked:true,ticks:{font:{size:10}}}, y:{stacked:true}}}});

  dc("d-cost-reg", {type:"bar", data:{labels,
    datasets:[
      {label:"Cost",    data:reg.map(r=>+(r.cost/1e9).toFixed(2)),   backgroundColor:"#534AB7", borderWidth:0, borderRadius:3},
      {label:"Revenue", data:reg.map(r=>+(r.rev/1e9).toFixed(2)),    backgroundColor:"#1D9E75", borderWidth:0, borderRadius:3},
      {label:"Margin",  data:reg.map(r=>+(r.margin/1e9).toFixed(2)), backgroundColor:"#EF9F27", borderWidth:0, borderRadius:3}
    ]}, options:{responsive:true, maintainAspectRatio:false,
    plugins:{legend:{display:false}, tooltip:{callbacks:{label:c => c.dataset.label+": \u20b1"+c.parsed.y+"B"}}},
    scales:{y:{ticks:{callback:v=>"\u20b1"+v+"B"}}}}});

  const m1=DATA.filter(d=>d.machineType==="Machine 1").length;
  const m2=DATA.filter(d=>d.machineType==="Machine 2").length;
  const m3=DATA.filter(d=>d.machineType==="Machine 3").length;
  dc("d-pie", {type:"doughnut", data:{
    labels:["Machine 1 (7,200L)","Machine 2 (1,700L)","Machine 3 (36,000L)"],
    datasets:[{data:[m1,m2,m3], backgroundColor:["#185FA5","#27500A","#A32D2D"], borderWidth:0,
               hoverOffset:8}]},
    options:{responsive:true, maintainAspectRatio:false,
    plugins:{legend:{display:true, position:"bottom", labels:{padding:14, font:{size:11}}},
    tooltip:{callbacks:{label:c => c.label+": "+c.parsed+" cities"}}}}});
}

function getRegData() {
  const regions = [...new Set(DATA.map(d=>d.region))].filter(Boolean).sort();
  return regions.map(r => {
    const c = DATA.filter(d=>d.region===r);
    return {r, lgu:c.reduce((a,d)=>a+d.lguMachines,0), ec:c.reduce((a,d)=>a+d.ecMachines,0),
      m1:c.filter(d=>d.machineType==="Machine 1").length,
      m2:c.filter(d=>d.machineType==="Machine 2").length,
      m3:c.filter(d=>d.machineType==="Machine 3").length,
      cost:c.reduce((a,d)=>a+d.costPrice,0), rev:c.reduce((a,d)=>a+d.sellRevenue,0),
      margin:c.reduce((a,d)=>a+d.grossMargin,0), cities:c.length};
  });
}

// ============================================================
// REGIONS PAGE
// ============================================================
function renderRegionGrid() {
  const rd = getRegData();
  document.getElementById("region-grid").innerHTML = rd.map(r => {
    const tot = r.m1+r.m2+r.m3 || 1;
    return `<div class="region-card" onclick="showRegionDetail('${r.r.replace(/'/g,"\\'")}')" >
      <div class="reg-header"><div class="reg-name">${r.r}</div><div class="reg-cities">${r.cities} cities</div></div>
      <div class="reg-stat">
        <div class="reg-s"><div class="reg-s-label">LGU Mach</div><div class="reg-s-val">${fmt(r.lgu)}</div></div>
        <div class="reg-s"><div class="reg-s-label">EC Mach</div><div class="reg-s-val">${fmt(r.ec)}</div></div>
        <div class="reg-s"><div class="reg-s-label">Cost</div><div class="reg-s-val">${(r.cost/1e9).toFixed(1)}B</div></div>
      </div>
      <div class="mtype-bar">
        <div class="mbar-seg" style="background:#185FA5;flex:${r.m1}"></div>
        <div class="mbar-seg" style="background:#27500A;flex:${r.m2}"></div>
        <div class="mbar-seg" style="background:#A32D2D;flex:${r.m3}"></div>
      </div>
      <div style="font-size:10px;color:var(--muted)">M1: ${r.m1} &nbsp;|&nbsp; M2: ${r.m2} &nbsp;|&nbsp; M3: ${r.m3}</div>
    </div>`;
  }).join("");
}

function showRegionDetail(reg) {
  document.querySelectorAll(".region-card").forEach(c=>c.classList.remove("selected"));
  const cities = DATA.filter(d=>d.region===reg).sort((a,b)=>b.totalMachines-a.totalMachines);
  document.getElementById("dp-title").textContent = reg + " — " + cities.length + " cities";
  document.getElementById("region-detail").classList.add("open");
  document.getElementById("region-detail").scrollIntoView({behavior:"smooth",block:"nearest"});

  dc("dp-bar",{type:"bar",data:{labels:cities.map(d=>d.city.replace(" City","").replace(" Municipality","")),
    datasets:[
      {label:"LGU",data:cities.map(d=>d.lguMachines),backgroundColor:"#378ADD",borderWidth:0,borderRadius:3},
      {label:"EC", data:cities.map(d=>d.ecMachines),backgroundColor:"#1D9E75",borderWidth:0,borderRadius:3}
    ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
    scales:{x:{stacked:true,ticks:{font:{size:9}}},y:{stacked:true}}}});

  dc("dp-cost",{type:"bar",data:{labels:cities.map(d=>d.city.replace(" City","").replace(" Municipality","")),
    datasets:[
      {label:"Cost",data:cities.map(d=>+(d.costPrice/1e9).toFixed(2)),backgroundColor:"#534AB7",borderWidth:0,borderRadius:3},
      {label:"Rev", data:cities.map(d=>+(d.sellRevenue/1e9).toFixed(2)),backgroundColor:"#1D9E75",borderWidth:0,borderRadius:3}
    ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
    scales:{y:{ticks:{callback:v=>"\u20b1"+v+"B"}}}}});

  const mc = d => d.machineType==="Machine 1"?`<span class="badge m1">M1</span>`:
                  d.machineType==="Machine 2"?`<span class="badge m2">M2</span>`:
                  `<span class="badge m3">M3</span>`;
  document.getElementById("dp-body").innerHTML = cities.map(d=>`<tr>
    <td class="city-name">${d.city}</td><td>${d.province}</td><td>${mc(d)}</td>
    <td class="num">${fmt(d.population)}</td><td class="num">${d.ecs}</td>
    <td class="num">${fmt(d.lguMachines)}</td><td class="num">${fmt(d.ecMachines)}</td>
    <td class="num" style="font-weight:700">${fmt(d.totalMachines)}</td>
    <td class="num">\u20b1${fmtM(d.costPrice)}M</td>
    <td class="num">\u20b1${fmtM(d.sellRevenue)}M</td>
    <td class="num" style="color:var(--green)">\u20b1${fmtM(d.grossMargin)}M</td>
  </tr>`).join("");
}

function closeDetail() {
  document.getElementById("region-detail").classList.remove("open");
}

// ============================================================
// CITIES PAGE
// ============================================================
function renderCityTable() {
  const q   = document.getElementById("city-search").value.toLowerCase();
  const reg = document.getElementById("city-region").value;
  const mt  = document.getElementById("city-mtype").value;
  const sk  = document.getElementById("city-sort").value;

  let rows = DATA.filter(d =>
    (!q  || d.city.toLowerCase().includes(q) || d.region.toLowerCase().includes(q) || d.province.toLowerCase().includes(q)) &&
    (!reg|| d.region===reg) &&
    (!mt || d.machineType===mt)
  );
  rows.sort((a,b) => sk==="city" ? (a.city>b.city?1:-1) : (b[sk]-a[sk]));

  document.getElementById("city-count").textContent = rows.length + " cities";
  const mc = d => d.machineType==="Machine 1"?`<span class="badge m1">Machine 1</span>`:
                  d.machineType==="Machine 2"?`<span class="badge m2">Machine 2</span>`:
                  `<span class="badge m3">Machine 3</span>`;

  document.getElementById("city-body").innerHTML = rows.map(d=>`<tr>
    <td class="city-name">${d.city}</td><td>${d.region}</td><td>${d.province}</td><td>${mc(d)}</td>
    <td class="num">${fmt(d.population)}</td><td class="num">${d.ecs}</td>
    <td class="num">${fmt(d.lguMachines)}</td><td class="num">${fmt(d.ecMachines)}</td>
    <td class="num" style="font-weight:800;color:var(--navy)">${fmt(d.totalMachines)}</td>
    <td class="num">\u20b1${fmtM(d.costPrice)}M</td>
    <td class="num">\u20b1${fmtM(d.sellRevenue)}M</td>
    <td class="num" style="color:var(--green)">\u20b1${fmtM(d.grossMargin)}M</td>
    <td class="num" style="color:var(--purple)">\u20b1${fmtM(d.netRevenue)}M</td>
  </tr>`).join("");
}

function populateCityFilters() {
  const sel = document.getElementById("city-region");
  sel.innerHTML = '<option value="">All regions</option>';
  [...new Set(DATA.map(d=>d.region))].filter(Boolean).sort().forEach(r => {
    const o = document.createElement("option"); o.value=r; o.textContent=r; sel.appendChild(o);
  });
}

// ============================================================
// PRIORITY LIST
// ============================================================
function renderPriorityTable() {
  const q  = document.getElementById("pri-search").value.toLowerCase();
  const mt = document.getElementById("pri-mtype").value;
  let rows = DATA.filter(d => (!q||d.city.toLowerCase().includes(q)) && (!mt||d.machineType===mt))
    .sort((a,b)=>b.totalMachines-a.totalMachines);
  document.getElementById("pri-count").textContent = rows.length + " cities";
  const mc = d => d.machineType==="Machine 1"?`<span class="badge m1">M1</span>`:
                  d.machineType==="Machine 2"?`<span class="badge m2">M2</span>`:
                  `<span class="badge m3">M3</span>`;
  document.getElementById("pri-body").innerHTML = rows.map((d,i)=>`<tr>
    <td class="num" style="font-weight:700;color:var(--muted)">${i+1}</td>
    <td class="city-name">${d.city}</td><td>${d.region}</td><td>${mc(d)}</td>
    <td class="num">${fmt(d.population)}</td><td class="num">${d.ecs}</td>
    <td class="num">${fmt(d.lguMachines)}</td><td class="num">${fmt(d.ecMachines)}</td>
    <td class="num" style="font-weight:800;color:var(--navy)">${fmt(d.totalMachines)}</td>
    <td class="num">\u20b1${fmtM(d.costPrice)}M</td>
  </tr>`).join("");
}

// ============================================================
// FINANCIAL PAGE
// ============================================================
function buildFinancial() {
  const tot = DATA.reduce((a,d)=>({c:a.c+d.costPrice,r:a.r+d.sellRevenue,m:a.m+d.grossMargin}),{c:0,r:0,m:0});
  const net = tot.r*(1-SOP-MONEY-MKTG-SHARE);
  document.getElementById("fin-cost").textContent   = fmtB(tot.c);
  document.getElementById("fin-rev").textContent    = fmtB(tot.r);
  document.getElementById("fin-margin").textContent = fmtB(tot.m);
  document.getElementById("fin-net").textContent    = fmtB(net);

  const byType = [1,2,3].map(n=>({
    cost:DATA.filter(d=>d.machineType==="Machine "+n).reduce((a,d)=>a+d.costPrice,0),
    rev: DATA.filter(d=>d.machineType==="Machine "+n).reduce((a,d)=>a+d.sellRevenue,0),
    margin:DATA.filter(d=>d.machineType==="Machine "+n).reduce((a,d)=>a+d.grossMargin,0)
  }));
  dc("f-mtype",{type:"bar",data:{labels:["Machine 1 (7,200L)","Machine 2 (1,700L)","Machine 3 (36,000L)"],
    datasets:[
      {label:"Cost",data:byType.map(t=>+(t.cost/1e9).toFixed(1)),backgroundColor:"#534AB7",borderWidth:0,borderRadius:4},
      {label:"Revenue",data:byType.map(t=>+(t.rev/1e9).toFixed(1)),backgroundColor:"#1D9E75",borderWidth:0,borderRadius:4},
      {label:"Margin",data:byType.map(t=>+(t.margin/1e9).toFixed(1)),backgroundColor:"#EF9F27",borderWidth:0,borderRadius:4}
    ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
    scales:{y:{ticks:{callback:v=>"\u20b1"+v+"B"}}}}});

  const sell2=MACH_SELL[2];
  const wfSteps=[
    {label:"Selling price",val:sell2,col:"#1D9E75"},
    {label:"SOP 15%",val:-sell2*SOP,col:"#E24B4A"},
    {label:"Cost of money 10%",val:-sell2*MONEY,col:"#E24B4A"},
    {label:"Marketing 5%",val:-sell2*MKTG,col:"#E24B4A"},
    {label:"Share 25%",val:-sell2*SHARE,col:"#E24B4A"},
    {label:"Net revenue (45%)",val:sell2*(1-SOP-MONEY-MKTG-SHARE),col:"#27500A"}
  ];
  const maxV=Math.max(...wfSteps.map(s=>Math.abs(s.val)));
  document.getElementById("waterfall-container").innerHTML=`
    <div style="display:flex;gap:4px;align-items:flex-end;height:200px;margin-top:10px;padding:0 4px">
      ${wfSteps.map(s=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
        <div style="font-size:10px;font-weight:700;color:${s.col};text-align:center">${s.val>0?"+":""}\u20b1${Math.round(Math.abs(s.val)/1000)}K</div>
        <div style="width:80%;border-radius:4px 4px 0 0;background:${s.col};height:${Math.round(Math.abs(s.val)/maxV*150)+8}px;transition:height .4s"></div>
        <div style="font-size:9px;color:var(--muted);text-align:center;line-height:1.3">${s.label}</div>
      </div>`).join("")}
    </div>`;

  const rd=getRegData();
  dc("f-region",{type:"bar",data:{labels:rd.map(r=>r.r),
    datasets:[
      {label:"Cost",data:rd.map(r=>+(r.cost/1e9).toFixed(2)),backgroundColor:"#534AB7",borderWidth:0,borderRadius:3},
      {label:"Revenue",data:rd.map(r=>+(r.rev/1e9).toFixed(2)),backgroundColor:"#1D9E75",borderWidth:0,borderRadius:3}
    ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},
    tooltip:{callbacks:{label:c=>c.dataset.label+": \u20b1"+c.parsed.y+"B"}}},
    scales:{y:{ticks:{callback:v=>"\u20b1"+v+"B"}},x:{ticks:{font:{size:10}}}}}});
}

// ============================================================
// PARAMS PAGE
// ============================================================
function buildParams() {
  const m1=DATA.filter(d=>d.machineType==="Machine 1").length;
  const m2=DATA.filter(d=>d.machineType==="Machine 2").length;
  const m3=DATA.filter(d=>d.machineType==="Machine 3").length;
  const ecs=DATA.reduce((a,d)=>a+d.ecs,0);
  const regs=[...new Set(DATA.map(d=>d.region))].filter(Boolean).length;
  document.getElementById("p-cities").textContent = DATA.length;
  document.getElementById("p-regions").textContent = regs;
  document.getElementById("p-ecs").textContent = fmt(ecs);
  document.getElementById("p-m1").textContent = m1 + " cities";
  document.getElementById("p-m2").textContent = m2 + " cities";
  document.getElementById("p-m3").textContent = m3 + " cities";
}

// ============================================================
// INIT
// ============================================================
buildDashboard();
populateCityFilters();
renderCityTable();
buildParams();
</script>
</body>
</html>