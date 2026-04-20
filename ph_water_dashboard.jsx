import { useState, useEffect, useRef, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

// ─── EMBEDDED DATA (138 Philippine Cities — PSA 2020) ───────────────────────
const SEED_DATA = [{"city":"Las Piñas City","region":"NCR","province":"Metro Manila","population":606293,"ecs":4,"machineType":"Machine 3","lguMachines":127,"ecMachines":1,"totalMachines":128,"costPrice":288000000,"sellRevenue":576000000,"grossMargin":288000000},{"city":"Makati City","region":"NCR","province":"Metro Manila","population":582602,"ecs":6,"machineType":"Machine 3","lguMachines":122,"ecMachines":1,"totalMachines":123,"costPrice":276750000,"sellRevenue":553500000,"grossMargin":276750000},{"city":"Malabon City","region":"NCR","province":"Metro Manila","population":365525,"ecs":3,"machineType":"Machine 2","lguMachines":1613,"ecMachines":1,"totalMachines":1614,"costPrice":2340300000,"sellRevenue":4680600000,"grossMargin":2340300000},{"city":"Mandaluyong City","region":"NCR","province":"Metro Manila","population":425758,"ecs":3,"machineType":"Machine 2","lguMachines":1879,"ecMachines":1,"totalMachines":1880,"costPrice":2726000000,"sellRevenue":5452000000,"grossMargin":2726000000},{"city":"Manila City","region":"NCR","province":"Metro Manila","population":1846513,"ecs":7,"machineType":"Machine 3","lguMachines":385,"ecMachines":1,"totalMachines":386,"costPrice":868500000,"sellRevenue":1737000000,"grossMargin":868500000},{"city":"Marikina City","region":"NCR","province":"Metro Manila","population":456059,"ecs":2,"machineType":"Machine 2","lguMachines":2013,"ecMachines":1,"totalMachines":2014,"costPrice":2920300000,"sellRevenue":5840600000,"grossMargin":2920300000},{"city":"Muntinlupa City","region":"NCR","province":"Metro Manila","population":543445,"ecs":4,"machineType":"Machine 3","lguMachines":114,"ecMachines":1,"totalMachines":115,"costPrice":258750000,"sellRevenue":517500000,"grossMargin":258750000},{"city":"Navotas City","region":"NCR","province":"Metro Manila","population":249131,"ecs":5,"machineType":"Machine 2","lguMachines":1100,"ecMachines":1,"totalMachines":1101,"costPrice":1596450000,"sellRevenue":3192900000,"grossMargin":1596450000},{"city":"Parañaque City","region":"NCR","province":"Metro Manila","population":689992,"ecs":4,"machineType":"Machine 3","lguMachines":144,"ecMachines":1,"totalMachines":145,"costPrice":326250000,"sellRevenue":652500000,"grossMargin":326250000},{"city":"Pasay City","region":"NCR","province":"Metro Manila","population":440656,"ecs":2,"machineType":"Machine 2","lguMachines":1945,"ecMachines":1,"totalMachines":1946,"costPrice":2821700000,"sellRevenue":5643400000,"grossMargin":2821700000},{"city":"Pasig City","region":"NCR","province":"Metro Manila","population":803159,"ecs":4,"machineType":"Machine 3","lguMachines":168,"ecMachines":1,"totalMachines":169,"costPrice":380250000,"sellRevenue":760500000,"grossMargin":380250000},{"city":"Quezon City","region":"NCR","province":"Metro Manila","population":2960048,"ecs":7,"machineType":"Machine 3","lguMachines":617,"ecMachines":1,"totalMachines":618,"costPrice":1390500000,"sellRevenue":2781000000,"grossMargin":1390500000},{"city":"San Juan City","region":"NCR","province":"Metro Manila","population":122180,"ecs":2,"machineType":"Machine 1","lguMachines":128,"ecMachines":1,"totalMachines":129,"costPrice":141900000,"sellRevenue":283800000,"grossMargin":141900000},{"city":"Taguig City","region":"NCR","province":"Metro Manila","population":886722,"ecs":4,"machineType":"Machine 3","lguMachines":185,"ecMachines":1,"totalMachines":186,"costPrice":418500000,"sellRevenue":837000000,"grossMargin":418500000},{"city":"Valenzuela City","region":"NCR","province":"Metro Manila","population":714978,"ecs":5,"machineType":"Machine 3","lguMachines":149,"ecMachines":1,"totalMachines":150,"costPrice":337500000,"sellRevenue":675000000,"grossMargin":337500000},{"city":"Baguio City","region":"CAR","province":"Benguet","population":366358,"ecs":5,"machineType":"Machine 2","lguMachines":1617,"ecMachines":1,"totalMachines":1618,"costPrice":2346100000,"sellRevenue":4692200000,"grossMargin":2346100000},{"city":"Tabuk City","region":"CAR","province":"Kalinga","population":75158,"ecs":1,"machineType":"Machine 1","lguMachines":79,"ecMachines":1,"totalMachines":80,"costPrice":88000000,"sellRevenue":176000000,"grossMargin":88000000},{"city":"Batac City","region":"Region I","province":"Ilocos Norte","population":55729,"ecs":2,"machineType":"Machine 1","lguMachines":59,"ecMachines":1,"totalMachines":60,"costPrice":66000000,"sellRevenue":132000000,"grossMargin":66000000},{"city":"Candon City","region":"Region I","province":"Ilocos Sur","population":60447,"ecs":3,"machineType":"Machine 1","lguMachines":63,"ecMachines":1,"totalMachines":64,"costPrice":70400000,"sellRevenue":140800000,"grossMargin":70400000},{"city":"Dagupan City","region":"Region I","province":"Pangasinan","population":174302,"ecs":3,"machineType":"Machine 1","lguMachines":182,"ecMachines":1,"totalMachines":183,"costPrice":201300000,"sellRevenue":402600000,"grossMargin":201300000},{"city":"Laoag City","region":"Region I","province":"Ilocos Norte","population":111582,"ecs":1,"machineType":"Machine 1","lguMachines":117,"ecMachines":1,"totalMachines":118,"costPrice":129800000,"sellRevenue":259600000,"grossMargin":129800000},{"city":"San Carlos City","region":"Region I","province":"Pangasinan","population":188613,"ecs":2,"machineType":"Machine 1","lguMachines":197,"ecMachines":1,"totalMachines":198,"costPrice":217800000,"sellRevenue":435600000,"grossMargin":217800000},{"city":"San Fernando City","region":"Region I","province":"La Union","population":127031,"ecs":4,"machineType":"Machine 1","lguMachines":133,"ecMachines":1,"totalMachines":134,"costPrice":147400000,"sellRevenue":294800000,"grossMargin":147400000},{"city":"Urdaneta City","region":"Region I","province":"Pangasinan","population":130648,"ecs":3,"machineType":"Machine 1","lguMachines":137,"ecMachines":1,"totalMachines":138,"costPrice":151800000,"sellRevenue":303600000,"grossMargin":151800000},{"city":"Vigan City","region":"Region I","province":"Ilocos Sur","population":53879,"ecs":2,"machineType":"Machine 1","lguMachines":57,"ecMachines":1,"totalMachines":58,"costPrice":63800000,"sellRevenue":127600000,"grossMargin":63800000},{"city":"Alaminos City","region":"Region I","province":"Pangasinan","population":92562,"ecs":1,"machineType":"Machine 1","lguMachines":97,"ecMachines":1,"totalMachines":98,"costPrice":107800000,"sellRevenue":215600000,"grossMargin":107800000},{"city":"Cauayan City","region":"Region II","province":"Isabela","population":133872,"ecs":2,"machineType":"Machine 1","lguMachines":140,"ecMachines":1,"totalMachines":141,"costPrice":155100000,"sellRevenue":310200000,"grossMargin":155100000},{"city":"Ilagan City","region":"Region II","province":"Isabela","population":133871,"ecs":3,"machineType":"Machine 1","lguMachines":140,"ecMachines":1,"totalMachines":141,"costPrice":155100000,"sellRevenue":310200000,"grossMargin":155100000},{"city":"Santiago City","region":"Region II","province":"Isabela","population":131442,"ecs":1,"machineType":"Machine 1","lguMachines":137,"ecMachines":1,"totalMachines":138,"costPrice":151800000,"sellRevenue":303600000,"grossMargin":151800000},{"city":"Tuguegarao City","region":"Region II","province":"Cagayan","population":167967,"ecs":1,"machineType":"Machine 1","lguMachines":175,"ecMachines":1,"totalMachines":176,"costPrice":193600000,"sellRevenue":387200000,"grossMargin":193600000},{"city":"Angeles City","region":"Region III","province":"Pampanga","population":462928,"ecs":5,"machineType":"Machine 2","lguMachines":2043,"ecMachines":1,"totalMachines":2044,"costPrice":2963800000,"sellRevenue":5927600000,"grossMargin":2963800000},{"city":"Balanga City","region":"Region III","province":"Bataan","population":107668,"ecs":1,"machineType":"Machine 1","lguMachines":113,"ecMachines":1,"totalMachines":114,"costPrice":125400000,"sellRevenue":250800000,"grossMargin":125400000},{"city":"Cabanatuan City","region":"Region III","province":"Nueva Ecija","population":329590,"ecs":4,"machineType":"Machine 2","lguMachines":1455,"ecMachines":1,"totalMachines":1456,"costPrice":2111200000,"sellRevenue":4222400000,"grossMargin":2111200000},{"city":"Gapan City","region":"Region III","province":"Nueva Ecija","population":117547,"ecs":3,"machineType":"Machine 1","lguMachines":123,"ecMachines":1,"totalMachines":124,"costPrice":136400000,"sellRevenue":272800000,"grossMargin":136400000},{"city":"Malolos City","region":"Region III","province":"Bulacan","population":252074,"ecs":4,"machineType":"Machine 2","lguMachines":1113,"ecMachines":1,"totalMachines":1114,"costPrice":1615300000,"sellRevenue":3230600000,"grossMargin":1615300000},{"city":"Meycauayan City","region":"Region III","province":"Bulacan","population":281406,"ecs":2,"machineType":"Machine 2","lguMachines":1242,"ecMachines":1,"totalMachines":1243,"costPrice":1802350000,"sellRevenue":3604700000,"grossMargin":1802350000},{"city":"Muñoz City","region":"Region III","province":"Nueva Ecija","population":87809,"ecs":3,"machineType":"Machine 1","lguMachines":92,"ecMachines":1,"totalMachines":93,"costPrice":102300000,"sellRevenue":204600000,"grossMargin":102300000},{"city":"Olongapo City","region":"Region III","province":"Zambales","population":260619,"ecs":5,"machineType":"Machine 2","lguMachines":1150,"ecMachines":1,"totalMachines":1151,"costPrice":1668950000,"sellRevenue":3337900000,"grossMargin":1668950000},{"city":"Palayan City","region":"Region III","province":"Nueva Ecija","population":62167,"ecs":3,"machineType":"Machine 1","lguMachines":65,"ecMachines":1,"totalMachines":66,"costPrice":72600000,"sellRevenue":145200000,"grossMargin":72600000},{"city":"San Fernando City (Pampanga)","region":"Region III","province":"Pampanga","population":345890,"ecs":2,"machineType":"Machine 2","lguMachines":1526,"ecMachines":1,"totalMachines":1527,"costPrice":2214150000,"sellRevenue":4428300000,"grossMargin":2214150000},{"city":"San Jose del Monte City","region":"Region III","province":"Bulacan","population":651017,"ecs":7,"machineType":"Machine 3","lguMachines":136,"ecMachines":1,"totalMachines":137,"costPrice":308250000,"sellRevenue":616500000,"grossMargin":308250000},{"city":"Tarlac City","region":"Region III","province":"Tarlac","population":342493,"ecs":2,"machineType":"Machine 2","lguMachines":1511,"ecMachines":1,"totalMachines":1512,"costPrice":2192400000,"sellRevenue":4384800000,"grossMargin":2192400000},{"city":"Science City of Muñoz","region":"Region III","province":"Nueva Ecija","population":74433,"ecs":3,"machineType":"Machine 1","lguMachines":78,"ecMachines":1,"totalMachines":79,"costPrice":86900000,"sellRevenue":173800000,"grossMargin":86900000},{"city":"Antipolo City","region":"Region IV-A","province":"Rizal","population":887399,"ecs":6,"machineType":"Machine 3","lguMachines":185,"ecMachines":1,"totalMachines":186,"costPrice":418500000,"sellRevenue":837000000,"grossMargin":418500000},{"city":"Batangas City","region":"Region IV-A","province":"Batangas","population":352971,"ecs":4,"machineType":"Machine 2","lguMachines":1558,"ecMachines":1,"totalMachines":1559,"costPrice":2260550000,"sellRevenue":4521100000,"grossMargin":2260550000},{"city":"Biñan City","region":"Region IV-A","province":"Laguna","population":399780,"ecs":3,"machineType":"Machine 2","lguMachines":1764,"ecMachines":1,"totalMachines":1765,"costPrice":2559250000,"sellRevenue":5118500000,"grossMargin":2559250000},{"city":"Calamba City","region":"Region IV-A","province":"Laguna","population":539671,"ecs":4,"machineType":"Machine 3","lguMachines":113,"ecMachines":1,"totalMachines":114,"costPrice":256500000,"sellRevenue":513000000,"grossMargin":256500000},{"city":"Cavite City","region":"Region IV-A","province":"Cavite","population":110182,"ecs":1,"machineType":"Machine 1","lguMachines":115,"ecMachines":1,"totalMachines":116,"costPrice":127600000,"sellRevenue":255200000,"grossMargin":127600000},{"city":"Dasmarinas City","region":"Region IV-A","province":"Cavite","population":703141,"ecs":5,"machineType":"Machine 3","lguMachines":147,"ecMachines":1,"totalMachines":148,"costPrice":333000000,"sellRevenue":666000000,"grossMargin":333000000},{"city":"Lipa City","region":"Region IV-A","province":"Batangas","population":332386,"ecs":4,"machineType":"Machine 2","lguMachines":1467,"ecMachines":1,"totalMachines":1468,"costPrice":2128600000,"sellRevenue":4257200000,"grossMargin":2128600000},{"city":"Lucena City","region":"Region IV-A","province":"Quezon","population":266629,"ecs":2,"machineType":"Machine 2","lguMachines":1177,"ecMachines":1,"totalMachines":1178,"costPrice":1708100000,"sellRevenue":3416200000,"grossMargin":1708100000},{"city":"San Pablo City","region":"Region IV-A","province":"Laguna","population":269706,"ecs":3,"machineType":"Machine 2","lguMachines":1190,"ecMachines":1,"totalMachines":1191,"costPrice":1726950000,"sellRevenue":3453900000,"grossMargin":1726950000},{"city":"San Pedro City","region":"Region IV-A","province":"Laguna","population":325809,"ecs":2,"machineType":"Machine 2","lguMachines":1438,"ecMachines":1,"totalMachines":1439,"costPrice":2086550000,"sellRevenue":4173100000,"grossMargin":2086550000},{"city":"Santa Rosa City","region":"Region IV-A","province":"Laguna","population":353767,"ecs":5,"machineType":"Machine 2","lguMachines":1561,"ecMachines":1,"totalMachines":1562,"costPrice":2264900000,"sellRevenue":4529800000,"grossMargin":2264900000},{"city":"Tagaytay City","region":"Region IV-A","province":"Cavite","population":78729,"ecs":2,"machineType":"Machine 1","lguMachines":83,"ecMachines":1,"totalMachines":84,"costPrice":92400000,"sellRevenue":184800000,"grossMargin":92400000},{"city":"Tayabas City","region":"Region IV-A","province":"Quezon","population":122767,"ecs":4,"machineType":"Machine 1","lguMachines":128,"ecMachines":1,"totalMachines":129,"costPrice":141900000,"sellRevenue":283800000,"grossMargin":141900000},{"city":"Trece Martires City","region":"Region IV-A","province":"Cavite","population":158487,"ecs":3,"machineType":"Machine 1","lguMachines":166,"ecMachines":1,"totalMachines":167,"costPrice":183700000,"sellRevenue":367400000,"grossMargin":183700000},{"city":"General Trias City","region":"Region IV-A","province":"Cavite","population":340799,"ecs":3,"machineType":"Machine 2","lguMachines":1504,"ecMachines":1,"totalMachines":1505,"costPrice":2182250000,"sellRevenue":4364500000,"grossMargin":2182250000},{"city":"Imus City","region":"Region IV-A","province":"Cavite","population":497940,"ecs":4,"machineType":"Machine 2","lguMachines":2197,"ecMachines":1,"totalMachines":2198,"costPrice":3187100000,"sellRevenue":6374200000,"grossMargin":3187100000},{"city":"Calapan City","region":"Region IV-B","province":"Oriental Mindoro","population":133091,"ecs":3,"machineType":"Machine 1","lguMachines":139,"ecMachines":1,"totalMachines":140,"costPrice":154000000,"sellRevenue":308000000,"grossMargin":154000000},{"city":"Puerto Princesa City","region":"Region IV-B","province":"Palawan","population":307079,"ecs":3,"machineType":"Machine 2","lguMachines":1355,"ecMachines":1,"totalMachines":1356,"costPrice":1966200000,"sellRevenue":3932400000,"grossMargin":1966200000},{"city":"Iriga City","region":"Region V","province":"Camarines Sur","population":111166,"ecs":3,"machineType":"Machine 1","lguMachines":116,"ecMachines":1,"totalMachines":117,"costPrice":128700000,"sellRevenue":257400000,"grossMargin":128700000},{"city":"Legazpi City","region":"Region V","province":"Albay","population":209533,"ecs":2,"machineType":"Machine 2","lguMachines":925,"ecMachines":1,"totalMachines":926,"costPrice":1342700000,"sellRevenue":2685400000,"grossMargin":1342700000},{"city":"Ligao City","region":"Region V","province":"Albay","population":83673,"ecs":3,"machineType":"Machine 1","lguMachines":88,"ecMachines":1,"totalMachines":89,"costPrice":97900000,"sellRevenue":195800000,"grossMargin":97900000},{"city":"Masbate City","region":"Region V","province":"Masbate","population":92981,"ecs":3,"machineType":"Machine 1","lguMachines":97,"ecMachines":1,"totalMachines":98,"costPrice":107800000,"sellRevenue":215600000,"grossMargin":107800000},{"city":"Naga City","region":"Region V","province":"Camarines Sur","population":196212,"ecs":2,"machineType":"Machine 1","lguMachines":205,"ecMachines":1,"totalMachines":206,"costPrice":226600000,"sellRevenue":453200000,"grossMargin":226600000},{"city":"Sorsogon City","region":"Region V","province":"Sorsogon","population":151454,"ecs":2,"machineType":"Machine 1","lguMachines":158,"ecMachines":1,"totalMachines":159,"costPrice":174900000,"sellRevenue":349800000,"grossMargin":174900000},{"city":"Tabaco City","region":"Region V","province":"Albay","population":125103,"ecs":2,"machineType":"Machine 1","lguMachines":131,"ecMachines":1,"totalMachines":132,"costPrice":145200000,"sellRevenue":290400000,"grossMargin":145200000},{"city":"Bacolod City","region":"Region VI","province":"Negros Occidental","population":600783,"ecs":7,"machineType":"Machine 3","lguMachines":126,"ecMachines":1,"totalMachines":127,"costPrice":285750000,"sellRevenue":571500000,"grossMargin":285750000},{"city":"Cadiz City","region":"Region VI","province":"Negros Occidental","population":161964,"ecs":4,"machineType":"Machine 1","lguMachines":169,"ecMachines":1,"totalMachines":170,"costPrice":187000000,"sellRevenue":374000000,"grossMargin":187000000},{"city":"Escalante City","region":"Region VI","province":"Negros Occidental","population":87109,"ecs":2,"machineType":"Machine 1","lguMachines":91,"ecMachines":1,"totalMachines":92,"costPrice":101200000,"sellRevenue":202400000,"grossMargin":101200000},{"city":"Himamaylan City","region":"Region VI","province":"Negros Occidental","population":96805,"ecs":3,"machineType":"Machine 1","lguMachines":101,"ecMachines":1,"totalMachines":102,"costPrice":112200000,"sellRevenue":224400000,"grossMargin":112200000},{"city":"Iloilo City","region":"Region VI","province":"Iloilo","population":457626,"ecs":3,"machineType":"Machine 2","lguMachines":2019,"ecMachines":1,"totalMachines":2020,"costPrice":2929000000,"sellRevenue":5858000000,"grossMargin":2929000000},{"city":"Kabankalan City","region":"Region VI","province":"Negros Occidental","population":190632,"ecs":3,"machineType":"Machine 1","lguMachines":199,"ecMachines":1,"totalMachines":200,"costPrice":220000000,"sellRevenue":440000000,"grossMargin":220000000},{"city":"La Carlota City","region":"Region VI","province":"Negros Occidental","population":67439,"ecs":1,"machineType":"Machine 1","lguMachines":71,"ecMachines":1,"totalMachines":72,"costPrice":79200000,"sellRevenue":158400000,"grossMargin":79200000},{"city":"Roxas City","region":"Region VI","province":"Capiz","population":167994,"ecs":2,"machineType":"Machine 1","lguMachines":175,"ecMachines":1,"totalMachines":176,"costPrice":193600000,"sellRevenue":387200000,"grossMargin":193600000},{"city":"Sagay City","region":"Region VI","province":"Negros Occidental","population":145650,"ecs":1,"machineType":"Machine 1","lguMachines":152,"ecMachines":1,"totalMachines":153,"costPrice":168300000,"sellRevenue":336600000,"grossMargin":168300000},{"city":"San Carlos City (Neg. Occ.)","region":"Region VI","province":"Negros Occidental","population":133906,"ecs":3,"machineType":"Machine 1","lguMachines":140,"ecMachines":1,"totalMachines":141,"costPrice":155100000,"sellRevenue":310200000,"grossMargin":155100000},{"city":"Silay City","region":"Region VI","province":"Negros Occidental","population":130477,"ecs":4,"machineType":"Machine 1","lguMachines":136,"ecMachines":1,"totalMachines":137,"costPrice":150700000,"sellRevenue":301400000,"grossMargin":150700000},{"city":"Sipalay City","region":"Region VI","province":"Negros Occidental","population":65684,"ecs":2,"machineType":"Machine 1","lguMachines":69,"ecMachines":1,"totalMachines":70,"costPrice":77000000,"sellRevenue":154000000,"grossMargin":77000000},{"city":"Talisay City (Neg. Occ.)","region":"Region VI","province":"Negros Occidental","population":124948,"ecs":1,"machineType":"Machine 1","lguMachines":131,"ecMachines":1,"totalMachines":132,"costPrice":145200000,"sellRevenue":290400000,"grossMargin":145200000},{"city":"Victorias City","region":"Region VI","province":"Negros Occidental","population":99932,"ecs":1,"machineType":"Machine 1","lguMachines":105,"ecMachines":1,"totalMachines":106,"costPrice":116600000,"sellRevenue":233200000,"grossMargin":116600000},{"city":"Bogo City","region":"Region VII","province":"Cebu","population":87479,"ecs":3,"machineType":"Machine 1","lguMachines":92,"ecMachines":1,"totalMachines":93,"costPrice":102300000,"sellRevenue":204600000,"grossMargin":102300000},{"city":"Carcar City","region":"Region VII","province":"Cebu","population":143568,"ecs":3,"machineType":"Machine 1","lguMachines":150,"ecMachines":1,"totalMachines":151,"costPrice":166100000,"sellRevenue":332200000,"grossMargin":166100000},{"city":"Cebu City","region":"Region VII","province":"Cebu","population":964169,"ecs":5,"machineType":"Machine 3","lguMachines":201,"ecMachines":1,"totalMachines":202,"costPrice":454500000,"sellRevenue":909000000,"grossMargin":454500000},{"city":"Danao City","region":"Region VII","province":"Cebu","population":119590,"ecs":4,"machineType":"Machine 1","lguMachines":125,"ecMachines":1,"totalMachines":126,"costPrice":138600000,"sellRevenue":277200000,"grossMargin":138600000},{"city":"Dumaguete City","region":"Region VII","province":"Negros Oriental","population":136000,"ecs":4,"machineType":"Machine 1","lguMachines":142,"ecMachines":1,"totalMachines":143,"costPrice":157300000,"sellRevenue":314600000,"grossMargin":157300000},{"city":"Lapu-Lapu City","region":"Region VII","province":"Cebu","population":497604,"ecs":5,"machineType":"Machine 2","lguMachines":2196,"ecMachines":1,"totalMachines":2197,"costPrice":3185650000,"sellRevenue":6371300000,"grossMargin":3185650000},{"city":"Mandaue City","region":"Region VII","province":"Cebu","population":364116,"ecs":3,"machineType":"Machine 2","lguMachines":1607,"ecMachines":1,"totalMachines":1608,"costPrice":2331600000,"sellRevenue":4663200000,"grossMargin":2331600000},{"city":"Naga City (Cebu)","region":"Region VII","province":"Cebu","population":147929,"ecs":3,"machineType":"Machine 1","lguMachines":155,"ecMachines":1,"totalMachines":156,"costPrice":171600000,"sellRevenue":343200000,"grossMargin":171600000},{"city":"Tagbilaran City","region":"Region VII","province":"Bohol","population":105637,"ecs":2,"machineType":"Machine 1","lguMachines":111,"ecMachines":1,"totalMachines":112,"costPrice":123200000,"sellRevenue":246400000,"grossMargin":123200000},{"city":"Talisay City (Cebu)","region":"Region VII","province":"Cebu","population":221893,"ecs":3,"machineType":"Machine 2","lguMachines":979,"ecMachines":1,"totalMachines":980,"costPrice":1421000000,"sellRevenue":2842000000,"grossMargin":1421000000},{"city":"Toledo City","region":"Region VII","province":"Cebu","population":187951,"ecs":3,"machineType":"Machine 1","lguMachines":196,"ecMachines":1,"totalMachines":197,"costPrice":216700000,"sellRevenue":433400000,"grossMargin":216700000},{"city":"Bayawan City","region":"Region VII","province":"Negros Oriental","population":100328,"ecs":4,"machineType":"Machine 1","lguMachines":105,"ecMachines":1,"totalMachines":106,"costPrice":116600000,"sellRevenue":233200000,"grossMargin":116600000},{"city":"Tanjay City","region":"Region VII","province":"Negros Oriental","population":73490,"ecs":3,"machineType":"Machine 1","lguMachines":77,"ecMachines":1,"totalMachines":78,"costPrice":85800000,"sellRevenue":171600000,"grossMargin":85800000},{"city":"Baybay City","region":"Region VIII","province":"Leyte","population":109432,"ecs":4,"machineType":"Machine 1","lguMachines":114,"ecMachines":1,"totalMachines":115,"costPrice":126500000,"sellRevenue":253000000,"grossMargin":126500000},{"city":"Borongan City","region":"Region VIII","province":"Eastern Samar","population":51024,"ecs":2,"machineType":"Machine 1","lguMachines":54,"ecMachines":1,"totalMachines":55,"costPrice":60500000,"sellRevenue":121000000,"grossMargin":60500000},{"city":"Calbayog City","region":"Region VIII","province":"Western Samar","population":183247,"ecs":2,"machineType":"Machine 1","lguMachines":191,"ecMachines":1,"totalMachines":192,"costPrice":211200000,"sellRevenue":422400000,"grossMargin":211200000},{"city":"Catbalogan City","region":"Region VIII","province":"Western Samar","population":101142,"ecs":2,"machineType":"Machine 1","lguMachines":106,"ecMachines":1,"totalMachines":107,"costPrice":117700000,"sellRevenue":235400000,"grossMargin":117700000},{"city":"Maasin City","region":"Region VIII","province":"Southern Leyte","population":88966,"ecs":3,"machineType":"Machine 1","lguMachines":93,"ecMachines":1,"totalMachines":94,"costPrice":103400000,"sellRevenue":206800000,"grossMargin":103400000},{"city":"Ormoc City","region":"Region VIII","province":"Leyte","population":245047,"ecs":5,"machineType":"Machine 2","lguMachines":1082,"ecMachines":1,"totalMachines":1083,"costPrice":1570350000,"sellRevenue":3140700000,"grossMargin":1570350000},{"city":"Tacloban City","region":"Region VIII","province":"Leyte","population":251881,"ecs":2,"machineType":"Machine 2","lguMachines":1112,"ecMachines":1,"totalMachines":1113,"costPrice":1613850000,"sellRevenue":3227700000,"grossMargin":1613850000},{"city":"Dapitan City","region":"Region IX","province":"Zamboanga del Norte","population":87109,"ecs":1,"machineType":"Machine 1","lguMachines":91,"ecMachines":1,"totalMachines":92,"costPrice":101200000,"sellRevenue":202400000,"grossMargin":101200000},{"city":"Dipolog City","region":"Region IX","province":"Zamboanga del Norte","population":131966,"ecs":1,"machineType":"Machine 1","lguMachines":138,"ecMachines":1,"totalMachines":139,"costPrice":152900000,"sellRevenue":305800000,"grossMargin":152900000},{"city":"Isabela City","region":"Region IX","province":"Basilan","population":101058,"ecs":2,"machineType":"Machine 1","lguMachines":106,"ecMachines":1,"totalMachines":107,"costPrice":117700000,"sellRevenue":235400000,"grossMargin":117700000},{"city":"Pagadian City","region":"Region IX","province":"Zamboanga del Sur","population":197936,"ecs":2,"machineType":"Machine 1","lguMachines":207,"ecMachines":1,"totalMachines":208,"costPrice":228800000,"sellRevenue":457600000,"grossMargin":228800000},{"city":"Zamboanga City","region":"Region IX","province":"Zamboanga del Sur","population":977234,"ecs":7,"machineType":"Machine 3","lguMachines":204,"ecMachines":1,"totalMachines":205,"costPrice":461250000,"sellRevenue":922500000,"grossMargin":461250000},{"city":"Cagayan de Oro City","region":"Region X","province":"Misamis Oriental","population":728402,"ecs":4,"machineType":"Machine 3","lguMachines":152,"ecMachines":1,"totalMachines":153,"costPrice":344250000,"sellRevenue":688500000,"grossMargin":344250000},{"city":"Gingoog City","region":"Region X","province":"Misamis Oriental","population":110369,"ecs":4,"machineType":"Machine 1","lguMachines":115,"ecMachines":1,"totalMachines":116,"costPrice":127600000,"sellRevenue":255200000,"grossMargin":127600000},{"city":"Iligan City","region":"Region X","province":"Lanao del Norte","population":363115,"ecs":5,"machineType":"Machine 2","lguMachines":1602,"ecMachines":1,"totalMachines":1603,"costPrice":2324350000,"sellRevenue":4648700000,"grossMargin":2324350000},{"city":"Malaybalay City","region":"Region X","province":"Bukidnon","population":172377,"ecs":4,"machineType":"Machine 1","lguMachines":180,"ecMachines":1,"totalMachines":181,"costPrice":199100000,"sellRevenue":398200000,"grossMargin":199100000},{"city":"Oroquieta City","region":"Region X","province":"Misamis Occidental","population":70553,"ecs":3,"machineType":"Machine 1","lguMachines":74,"ecMachines":1,"totalMachines":75,"costPrice":82500000,"sellRevenue":165000000,"grossMargin":82500000},{"city":"Ozamiz City","region":"Region X","province":"Misamis Occidental","population":141575,"ecs":3,"machineType":"Machine 1","lguMachines":148,"ecMachines":1,"totalMachines":149,"costPrice":163900000,"sellRevenue":327800000,"grossMargin":163900000},{"city":"Tangub City","region":"Region X","province":"Misamis Occidental","population":57332,"ecs":3,"machineType":"Machine 1","lguMachines":60,"ecMachines":1,"totalMachines":61,"costPrice":67100000,"sellRevenue":134200000,"grossMargin":67100000},{"city":"Valencia City","region":"Region X","province":"Bukidnon","population":205518,"ecs":2,"machineType":"Machine 2","lguMachines":907,"ecMachines":1,"totalMachines":908,"costPrice":1316600000,"sellRevenue":2633200000,"grossMargin":1316600000},{"city":"El Salvador City","region":"Region X","province":"Misamis Oriental","population":61820,"ecs":3,"machineType":"Machine 1","lguMachines":65,"ecMachines":1,"totalMachines":66,"costPrice":72600000,"sellRevenue":145200000,"grossMargin":72600000},{"city":"Davao City","region":"Region XI","province":"Davao del Sur","population":1776949,"ecs":6,"machineType":"Machine 3","lguMachines":371,"ecMachines":1,"totalMachines":372,"costPrice":837000000,"sellRevenue":1674000000,"grossMargin":837000000},{"city":"Digos City","region":"Region XI","province":"Davao del Sur","population":196264,"ecs":3,"machineType":"Machine 1","lguMachines":205,"ecMachines":1,"totalMachines":206,"costPrice":226600000,"sellRevenue":453200000,"grossMargin":226600000},{"city":"Island Garden City of Samal","region":"Region XI","province":"Davao de Oro","population":124284,"ecs":3,"machineType":"Machine 1","lguMachines":130,"ecMachines":1,"totalMachines":131,"costPrice":144100000,"sellRevenue":288200000,"grossMargin":144100000},{"city":"Mati City","region":"Region XI","province":"Davao Oriental","population":139364,"ecs":1,"machineType":"Machine 1","lguMachines":146,"ecMachines":1,"totalMachines":147,"costPrice":161700000,"sellRevenue":323400000,"grossMargin":161700000},{"city":"Panabo City","region":"Region XI","province":"Davao del Norte","population":178451,"ecs":3,"machineType":"Machine 1","lguMachines":186,"ecMachines":1,"totalMachines":187,"costPrice":205700000,"sellRevenue":411400000,"grossMargin":205700000},{"city":"Tagum City","region":"Region XI","province":"Davao del Norte","population":296202,"ecs":5,"machineType":"Machine 2","lguMachines":1307,"ecMachines":1,"totalMachines":1308,"costPrice":1896600000,"sellRevenue":3793200000,"grossMargin":1896600000},{"city":"Samal City","region":"Region XI","province":"Davao del Norte","population":124284,"ecs":2,"machineType":"Machine 1","lguMachines":130,"ecMachines":1,"totalMachines":131,"costPrice":144100000,"sellRevenue":288200000,"grossMargin":144100000},{"city":"Cotabato City","region":"Region XII","province":"Maguindanao","population":325079,"ecs":5,"machineType":"Machine 2","lguMachines":1435,"ecMachines":1,"totalMachines":1436,"costPrice":2082200000,"sellRevenue":4164400000,"grossMargin":2082200000},{"city":"General Santos City","region":"Region XII","province":"South Cotabato","population":697315,"ecs":4,"machineType":"Machine 3","lguMachines":146,"ecMachines":1,"totalMachines":147,"costPrice":330750000,"sellRevenue":661500000,"grossMargin":330750000},{"city":"Kidapawan City","region":"Region XII","province":"Cotabato","population":162286,"ecs":3,"machineType":"Machine 1","lguMachines":170,"ecMachines":1,"totalMachines":171,"costPrice":188100000,"sellRevenue":376200000,"grossMargin":188100000},{"city":"Koronadal City","region":"Region XII","province":"South Cotabato","population":181576,"ecs":2,"machineType":"Machine 1","lguMachines":190,"ecMachines":1,"totalMachines":191,"costPrice":210100000,"sellRevenue":420200000,"grossMargin":210100000},{"city":"Tacurong City","region":"Region XII","province":"Sultan Kudarat","population":87756,"ecs":3,"machineType":"Machine 1","lguMachines":92,"ecMachines":1,"totalMachines":93,"costPrice":102300000,"sellRevenue":204600000,"grossMargin":102300000},{"city":"Bislig City","region":"Region XIII","province":"Surigao del Sur","population":102813,"ecs":1,"machineType":"Machine 1","lguMachines":108,"ecMachines":1,"totalMachines":109,"costPrice":119900000,"sellRevenue":239800000,"grossMargin":119900000},{"city":"Butuan City","region":"Region XIII","province":"Agusan del Norte","population":372910,"ecs":4,"machineType":"Machine 2","lguMachines":1646,"ecMachines":1,"totalMachines":1647,"costPrice":2388150000,"sellRevenue":4776300000,"grossMargin":2388150000},{"city":"Cabadbaran City","region":"Region XIII","province":"Agusan del Norte","population":57024,"ecs":3,"machineType":"Machine 1","lguMachines":60,"ecMachines":1,"totalMachines":61,"costPrice":67100000,"sellRevenue":134200000,"grossMargin":67100000},{"city":"Bayugan City","region":"Region XIII","province":"Agusan del Sur","population":61764,"ecs":3,"machineType":"Machine 1","lguMachines":65,"ecMachines":1,"totalMachines":66,"costPrice":72600000,"sellRevenue":145200000,"grossMargin":72600000},{"city":"Surigao City","region":"Region XIII","province":"Surigao del Norte","population":171107,"ecs":2,"machineType":"Machine 1","lguMachines":179,"ecMachines":1,"totalMachines":180,"costPrice":198000000,"sellRevenue":396000000,"grossMargin":198000000},{"city":"Tandag City","region":"Region XIII","province":"Surigao del Sur","population":57028,"ecs":1,"machineType":"Machine 1","lguMachines":60,"ecMachines":1,"totalMachines":61,"costPrice":67100000,"sellRevenue":134200000,"grossMargin":67100000},{"city":"Marawi City","region":"BARMM","province":"Lanao del Sur","population":201785,"ecs":4,"machineType":"Machine 2","lguMachines":891,"ecMachines":1,"totalMachines":892,"costPrice":1293400000,"sellRevenue":2586800000,"grossMargin":1293400000},{"city":"Lamitan City","region":"BARMM","province":"Basilan","population":69003,"ecs":1,"machineType":"Machine 1","lguMachines":72,"ecMachines":1,"totalMachines":73,"costPrice":80300000,"sellRevenue":160600000,"grossMargin":80300000}];

// ─── HELPERS ────────────────────────────────────────────────────────────────
const fmtN = n => Number(n||0).toLocaleString("en-PH");
const fmtB = n => "₱" + (Number(n||0)/1e9).toFixed(2) + "B";
const fmtM = n => "₱" + (Number(n||0)/1e6).toFixed(1) + "M";
const fmtBn = n => (Number(n||0)/1e9).toFixed(2);
const MTYPE_COLOR = { "Machine 1":"#1E88E5", "Machine 2":"#43A047", "Machine 3":"#E53935" };
const MTYPE_BG = { "Machine 1":"#E3F2FD", "Machine 2":"#E8F5E9", "Machine 3":"#FFEBEE" };

// ─── GOOGLE FONTS ────────────────────────────────────────────────────────────
const FontLink = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');`}</style>
);

// ─── BADGE ───────────────────────────────────────────────────────────────────
const Badge = ({ type }) => (
  <span style={{
    display:"inline-block", fontSize:10, fontWeight:700, padding:"2px 8px",
    borderRadius:12, background: MTYPE_BG[type], color: MTYPE_COLOR[type],
    fontFamily:"IBM Plex Sans, sans-serif", letterSpacing:.3
  }}>{type}</span>
);

// ─── KPI CARD ────────────────────────────────────────────────────────────────
const KpiCard = ({ label, value, sub, accent, icon }) => (
  <div style={{
    background: accent ? "#0B3D6B" : "#fff",
    border: `1px solid ${accent ? "#0B3D6B" : "#e2eaf3"}`,
    borderRadius:12, padding:"18px 20px",
    boxShadow: accent ? "0 4px 20px rgba(11,61,107,.3)" : "0 1px 4px rgba(0,0,0,.05)"
  }}>
    {icon && <div style={{fontSize:22, marginBottom:6}}>{icon}</div>}
    <div style={{fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:.7,
      color: accent ? "rgba(255,255,255,.6)" : "#7b93b0", marginBottom:4}}>{label}</div>
    <div style={{fontSize:26, fontWeight:700, fontFamily:"DM Serif Display, serif",
      color: accent ? "#fff" : "#0B3D6B", lineHeight:1}}>{value}</div>
    {sub && <div style={{fontSize:11, color: accent ? "rgba(255,255,255,.5)" : "#96aabf", marginTop:5}}>{sub}</div>}
  </div>
);

// ─── SECTION CARD ────────────────────────────────────────────────────────────
const Card = ({ children, style={} }) => (
  <div style={{background:"#fff", border:"1px solid #e2eaf3", borderRadius:12,
    padding:"18px 20px", boxShadow:"0 1px 4px rgba(0,0,0,.04)", ...style}}>
    {children}
  </div>
);

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(SEED_DATA);
  const [tab, setTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [filterMtype, setFilterMtype] = useState("");
  const [sortKey, setSortKey] = useState("totalMachines");
  const [uploadMsg, setUploadMsg] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const fileRef = useRef(null);

  // Load from persistent storage on mount
  useEffect(() => {
    (async () => {
      try {
        const saved = await window.storage.get("ph_water_data");
        if (saved) {
          const parsed = JSON.parse(saved.value);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setData(parsed);
          }
        }
        const meta = await window.storage.get("ph_water_meta");
        if (meta) {
          const m = JSON.parse(meta.value);
          setUploadDate(m.date || "");
        }
      } catch {}
    })();
  }, []);

  // ── Excel Upload ────────────────────────────────────────────────────────
  const handleFile = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const XLSX = window.XLSX;
        if (!XLSX) { setUploadMsg("❌ XLSX library not loaded yet. Please try again in a moment."); return; }
        const wb = XLSX.read(new Uint8Array(ev.target.result), { type:"array" });
        // Try '📋 LGU DATA' first, else first sheet
        const sn = wb.SheetNames.find(s => s.includes("LGU DATA")) || wb.SheetNames[0];
        const rows = XLSX.utils.sheet_to_json(wb.Sheets[sn], { defval:"" });
        // Smart column detection
        if (rows.length === 0) { setUploadMsg("❌ No data found in Excel."); return; }
        const keys = Object.keys(rows[0]);
        const find = (patterns) => keys.find(k => patterns.some(p => k.toLowerCase().includes(p.toLowerCase()))) || "";
        const cityCol = find(["city","City / Mun"]);
        const regCol = find(["region","Region"]);
        const provCol = find(["province","Province"]);
        const popCol = find(["population","Population","PSA"]);
        const ecCol = find(["evac","ECs","ec "]);
        const mtCol = find(["machine\ntype","machineType","Machine\nType","Machine Type"]);
        const lguCol = find(["LGU Machines","lguMachines","LGU\nMachines"]);
        const ecMCol = find(["EC Machines","ecMachines","EC\nMachines"]);
        const totMCol = find(["TOTAL\nMachines","totalMachines","Total Machines"]);
        const costCol = find(["Cost Price","costPrice","Cost\n"]);
        const revCol = find(["Selling Rev","sellRevenue","Sell Revenue"]);
        const margCol = find(["Gross\nMargin","grossMargin","Gross Margin"]);

        const cleaned = rows
          .filter(r => r[cityCol] && typeof r[cityCol]==="string" && r[cityCol].length > 2 && !r[cityCol].includes("TOTAL") && !r[cityCol].includes("City / M"))
          .map(r => ({
            city: String(r[cityCol]||"").trim(),
            region: String(r[regCol]||"").trim(),
            province: String(r[provCol]||"").trim(),
            population: parseInt(r[popCol]||0)||0,
            ecs: parseInt(r[ecCol]||0)||0,
            machineType: String(r[mtCol]||"Machine 1").trim().replace(/\s+/," "),
            lguMachines: parseInt(r[lguCol]||0)||0,
            ecMachines: parseInt(r[ecMCol]||0)||0,
            totalMachines: parseInt(r[totMCol]||0)||0,
            costPrice: parseInt(r[costCol]||0)||0,
            sellRevenue: parseInt(r[revCol]||0)||0,
            grossMargin: parseInt(r[margCol]||0)||0,
          }))
          .filter(r => r.city.length > 1);

        if (cleaned.length === 0) { setUploadMsg("❌ Could not parse data. Check column names."); return; }

        setData(cleaned);
        const now = new Date().toLocaleString("en-PH");
        setUploadDate(now);
        setUploadMsg(`✅ ${cleaned.length} cities imported successfully!`);
        // Persist
        await window.storage.set("ph_water_data", JSON.stringify(cleaned));
        await window.storage.set("ph_water_meta", JSON.stringify({ date: now, count: cleaned.length }));
        setTimeout(() => setUploadMsg(""), 5000);
      } catch (err) {
        setUploadMsg("❌ Error: " + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  }, []);

  // ── Export Excel ───────────────────────────────────────────────────────
  const exportExcel = useCallback(() => {
    const XLSX = window.XLSX;
    if (!XLSX) { alert("XLSX library loading..."); return; }
    const ws = XLSX.utils.json_to_sheet(data.map(d => ({
      "City": d.city, "Region": d.region, "Province": d.province,
      "Population": d.population, "Evac Centers": d.ecs,
      "Machine Type": d.machineType, "LGU Machines": d.lguMachines,
      "EC Machines": d.ecMachines, "Total Machines": d.totalMachines,
      "Cost Price (₱)": d.costPrice, "Sell Revenue (₱)": d.sellRevenue,
      "Gross Margin (₱)": d.grossMargin
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "LGU DATA");
    XLSX.writeFile(wb, "PH_Water_Export.xlsx");
  }, [data]);

  // ── Export PDF (print) ─────────────────────────────────────────────────
  const exportPDF = useCallback(() => { window.print(); }, []);

  // ── Aggregate helpers ──────────────────────────────────────────────────
  const totals = {
    machines: data.reduce((a,d) => a+d.totalMachines, 0),
    lgu: data.reduce((a,d) => a+d.lguMachines, 0),
    ec: data.reduce((a,d) => a+d.ecMachines, 0),
    cost: data.reduce((a,d) => a+d.costPrice, 0),
    rev: data.reduce((a,d) => a+d.sellRevenue, 0),
    margin: data.reduce((a,d) => a+d.grossMargin, 0),
  };
  const SOP=.15, MONEY=.10, MKTG=.05, SHARE=.25;
  const netRev = totals.rev*(1-SOP-MONEY-MKTG-SHARE);

  const regions = [...new Set(data.map(d => d.region).filter(Boolean))].sort();
  const regData = regions.map(r => {
    const c = data.filter(d => d.region===r);
    return {
      r: r.replace("Region ","R."),
      region: r,
      lgu: c.reduce((a,d)=>a+d.lguMachines,0),
      ec: c.reduce((a,d)=>a+d.ecMachines,0),
      m1: c.filter(d=>d.machineType==="Machine 1").length,
      m2: c.filter(d=>d.machineType==="Machine 2").length,
      m3: c.filter(d=>d.machineType==="Machine 3").length,
      cost: c.reduce((a,d)=>a+d.costPrice,0),
      rev: c.reduce((a,d)=>a+d.sellRevenue,0),
      margin: c.reduce((a,d)=>a+d.grossMargin,0),
      cities: c.length,
    };
  });

  const pieData = [
    { name:"Machine 1 (<200K)", value: data.filter(d=>d.machineType==="Machine 1").length, color:"#1E88E5" },
    { name:"Machine 2 (200K-500K)", value: data.filter(d=>d.machineType==="Machine 2").length, color:"#43A047" },
    { name:"Machine 3 (>500K)", value: data.filter(d=>d.machineType==="Machine 3").length, color:"#E53935" },
  ];

  // City table filter
  const cityRows = [...data]
    .filter(d => (!search || d.city.toLowerCase().includes(search.toLowerCase()) || d.region.toLowerCase().includes(search.toLowerCase()))
      && (!filterRegion || d.region===filterRegion)
      && (!filterMtype || d.machineType===filterMtype))
    .sort((a,b) => sortKey==="city" ? a.city.localeCompare(b.city) : (b[sortKey]||0)-(a[sortKey]||0));

  // ── TABS ───────────────────────────────────────────────────────────────
  const TABS = [
    { id:"dashboard", label:"📊 Dashboard" },
    { id:"regions", label:"🗺 By Region" },
    { id:"cities", label:"🏙 By City" },
    { id:"financial", label:"💰 Financial" },
    { id:"params", label:"⚙️ Parameters" },
  ];

  const S = {
    wrap: { fontFamily:"IBM Plex Sans, sans-serif", background:"#f0f4f9", minHeight:"100vh", color:"#1a2535" },
    header: { background:"#0B3D6B", color:"#fff", padding:"0 20px" },
    headerInner: { display:"flex", alignItems:"center", justifyContent:"space-between", height:58 },
    nav: { background:"#fff", borderBottom:"1px solid #e2eaf3", padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between", overflowX:"auto" },
    navTabs: { display:"flex", gap:0 },
    navTab: (active) => ({
      padding:"14px 16px", fontSize:13, fontWeight:500, cursor:"pointer",
      borderBottom: active ? "2px solid #1565C0" : "2px solid transparent",
      color: active ? "#0B3D6B" : "#7b93b0", background:"none", border:"none",
      borderBottom: active ? "2px solid #1565C0" : "2px solid transparent",
      fontFamily:"IBM Plex Sans, sans-serif", whiteSpace:"nowrap",
    }),
    actions: { display:"flex", gap:8, alignItems:"center", flexShrink:0 },
    btn: (color="#006064") => ({
      padding:"7px 14px", fontSize:12, background:color, color:"#fff",
      border:"none", borderRadius:8, cursor:"pointer", fontWeight:600,
      fontFamily:"IBM Plex Sans, sans-serif", whiteSpace:"nowrap"
    }),
    page: { padding:"20px" },
    grid2: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 },
    grid5: { display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:16 },
    sectionTitle: { fontSize:13, fontWeight:700, color:"#0B3D6B", marginBottom:4 },
    sectionSub: { fontSize:11, color:"#96aabf", marginBottom:12 },
  };

  return (
    <div style={S.wrap}>
      <FontLink />
      {/* Load SheetJS */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js" />

      {/* HEADER */}
      <header style={S.header}>
        <div style={S.headerInner}>
          <div style={{display:"flex", alignItems:"center", gap:12}}>
            <div style={{width:36,height:36,background:"#1565C0",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>💧</div>
            <div>
              <div style={{fontSize:15, fontWeight:700, fontFamily:"DM Serif Display, serif", letterSpacing:-.3}}>Philippines Water Purifying Machine System</div>
              <div style={{fontSize:11, color:"rgba(255,255,255,.55)"}}>LGU & Evacuation Center Procurement Dashboard — PSA 2020 | RA 12076</div>
            </div>
          </div>
          <div style={{display:"flex", gap:20, fontSize:11, color:"rgba(255,255,255,.6)"}}>
            <span><b style={{color:"#fff"}}>{data.length}</b> cities</span>
            <span><b style={{color:"#fff"}}>{fmtN(totals.machines)}</b> machines</span>
            <span><b style={{color:"#fff"}}>{fmtB(totals.cost)}</b> cost</span>
            {uploadDate && <span style={{color:"rgba(255,255,255,.4)"}}>Updated: {uploadDate}</span>}
          </div>
        </div>
      </header>

      {/* NAV */}
      <nav style={S.nav}>
        <div style={S.navTabs}>
          {TABS.map(t => (
            <button key={t.id} style={S.navTab(tab===t.id)} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
        <div style={S.actions}>
          {uploadMsg && <span style={{fontSize:12, color: uploadMsg.startsWith("✅") ? "#2e7d32" : "#c62828"}}>{uploadMsg}</span>}
          <button style={S.btn("#1565C0")} onClick={() => fileRef.current?.click()}>📤 Upload Excel</button>
          <button style={S.btn("#2e7d32")} onClick={exportExcel}>⬇ Excel</button>
          <button style={S.btn("#6a1b9a")} onClick={exportPDF}>🖨 PDF</button>
          <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" style={{display:"none"}} onChange={handleFile} />
        </div>
      </nav>

      {/* PAGES */}
      <div style={S.page}>

        {/* ── DASHBOARD ── */}
        {tab==="dashboard" && (
          <div>
            <div style={S.grid5}>
              <KpiCard accent label="Total Machines" value={fmtN(totals.machines)} sub="LGU + Evacuation Centers" />
              <KpiCard label="LGU Machines" value={fmtN(totals.lgu)} sub="50 L/person/day" icon="🏙" />
              <KpiCard label="EC Machines" value={fmtN(totals.ec)} sub="100 L/day × 5,000 ppl" icon="🏛" />
              <KpiCard label="Procurement Cost" value={fmtB(totals.cost)} sub="Total buying price" icon="💰" />
              <KpiCard label="Selling Revenue" value={fmtB(totals.rev)} sub={`Margin: ${fmtB(totals.margin)}`} icon="📈" />
            </div>

            <div style={S.grid2}>
              <Card>
                <div style={S.sectionTitle}>Machines by Region — LGU vs EC</div>
                <div style={S.sectionSub}>Stacked by deployment type</div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={regData} margin={{top:0,right:0,left:-10,bottom:40}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f9" />
                    <XAxis dataKey="r" tick={{fontSize:9}} angle={-45} textAnchor="end" interval={0} />
                    <YAxis tick={{fontSize:9}} />
                    <Tooltip formatter={(v,n) => [fmtN(v), n]} />
                    <Bar dataKey="lgu" name="LGU" stackId="a" fill="#1565C0" radius={[0,0,0,0]} />
                    <Bar dataKey="ec" name="EC" stackId="a" fill="#00897B" radius={[3,3,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <div style={S.sectionTitle}>Machine Type Distribution</div>
                <div style={S.sectionSub}>Cities by population tier</div>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${(percent*100).toFixed(0)}%`}>
                      {pieData.map((e,i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Legend iconType="circle" iconSize={10} formatter={(v) => <span style={{fontSize:11}}>{v}</span>} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div style={S.grid2}>
              <Card>
                <div style={S.sectionTitle}>Procurement Cost by Region (₱B)</div>
                <div style={S.sectionSub}>Cost vs Revenue vs Margin</div>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={regData} margin={{top:0,right:0,left:-10,bottom:40}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f9" />
                    <XAxis dataKey="r" tick={{fontSize:9}} angle={-45} textAnchor="end" interval={0} />
                    <YAxis tick={{fontSize:9}} tickFormatter={v=>"₱"+v+"B"} />
                    <Tooltip formatter={(v,n) => ["₱"+Number(v).toFixed(2)+"B", n]} />
                    <Bar dataKey="cost" name="Cost" fill="#5C6BC0" radius={[2,2,0,0]} />
                    <Bar dataKey="rev" name="Revenue" fill="#26A69A" radius={[2,2,0,0]} />
                    <Bar dataKey="margin" name="Margin" fill="#FFA726" radius={[2,2,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <div style={S.sectionTitle}>Machine Type by Region</div>
                <div style={S.sectionSub}>Cities per machine tier per region</div>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={regData} margin={{top:0,right:0,left:-10,bottom:40}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f9" />
                    <XAxis dataKey="r" tick={{fontSize:9}} angle={-45} textAnchor="end" interval={0} />
                    <YAxis tick={{fontSize:9}} />
                    <Tooltip />
                    <Bar dataKey="m1" name="Machine 1" stackId="a" fill="#1E88E5" />
                    <Bar dataKey="m2" name="Machine 2" stackId="a" fill="#43A047" />
                    <Bar dataKey="m3" name="Machine 3" stackId="a" fill="#E53935" radius={[3,3,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>
        )}

        {/* ── REGIONS ── */}
        {tab==="regions" && (
          <div>
            <div style={{fontSize:16, fontWeight:700, fontFamily:"DM Serif Display, serif", color:"#0B3D6B", marginBottom:4}}>Regional Breakdown</div>
            <div style={{fontSize:12, color:"#7b93b0", marginBottom:16}}>All {regions.length} regions • {data.length} cities total</div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:12}}>
              {regData.map(r => {
                const total = r.m1+r.m2+r.m3 || 1;
                return (
                  <Card key={r.region} style={{cursor:"default"}}>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
                      <div style={{fontSize:14, fontWeight:700, color:"#0B3D6B"}}>{r.region}</div>
                      <div style={{fontSize:11, color:"#7b93b0"}}>{r.cities} cities</div>
                    </div>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:10}}>
                      {[
                        ["LGU Machines", fmtN(r.lgu)],
                        ["EC Machines", fmtN(r.ec)],
                        ["Cost", fmtB(r.cost)],
                        ["Revenue", fmtB(r.rev)],
                      ].map(([label,val]) => (
                        <div key={label} style={{background:"#f8fafd", borderRadius:7, padding:"6px 8px"}}>
                          <div style={{fontSize:10, color:"#7b93b0"}}>{label}</div>
                          <div style={{fontSize:13, fontWeight:700, color:"#0B3D6B"}}>{val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{display:"flex", height:6, borderRadius:3, overflow:"hidden", gap:2, marginBottom:6}}>
                      <div style={{background:"#1E88E5", width:`${r.m1/total*100}%`, borderRadius:2}} />
                      <div style={{background:"#43A047", width:`${r.m2/total*100}%`, borderRadius:2}} />
                      <div style={{background:"#E53935", width:`${r.m3/total*100}%`, borderRadius:2}} />
                    </div>
                    <div style={{fontSize:10, color:"#7b93b0"}}>
                      M1: {r.m1} &nbsp;|&nbsp; M2: {r.m2} &nbsp;|&nbsp; M3: {r.m3}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ── CITIES ── */}
        {tab==="cities" && (
          <Card style={{padding:0}}>
            {/* Toolbar */}
            <div style={{display:"flex", gap:8, padding:"12px 16px", borderBottom:"1px solid #e2eaf3", flexWrap:"wrap", alignItems:"center"}}>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="🔍 Search city or region..."
                style={{padding:"6px 12px", border:"1px solid #e2eaf3", borderRadius:7, fontSize:12, width:200, fontFamily:"IBM Plex Sans, sans-serif"}} />
              <select value={filterRegion} onChange={e=>setFilterRegion(e.target.value)}
                style={{padding:"6px 10px", border:"1px solid #e2eaf3", borderRadius:7, fontSize:12, fontFamily:"IBM Plex Sans, sans-serif"}}>
                <option value="">All Regions</option>
                {regions.map(r => <option key={r}>{r}</option>)}
              </select>
              <select value={filterMtype} onChange={e=>setFilterMtype(e.target.value)}
                style={{padding:"6px 10px", border:"1px solid #e2eaf3", borderRadius:7, fontSize:12, fontFamily:"IBM Plex Sans, sans-serif"}}>
                <option value="">All Machine Types</option>
                <option>Machine 1</option><option>Machine 2</option><option>Machine 3</option>
              </select>
              <select value={sortKey} onChange={e=>setSortKey(e.target.value)}
                style={{padding:"6px 10px", border:"1px solid #e2eaf3", borderRadius:7, fontSize:12, fontFamily:"IBM Plex Sans, sans-serif"}}>
                <option value="totalMachines">Sort: Total Machines</option>
                <option value="costPrice">Sort: Cost</option>
                <option value="population">Sort: Population</option>
                <option value="city">Sort: City Name</option>
              </select>
              <span style={{marginLeft:"auto", fontSize:12, color:"#7b93b0"}}>{cityRows.length} cities</span>
            </div>
            {/* Table */}
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%", borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{background:"#f8fafd"}}>
                    {["City","Region","Type","Population","ECs","LGU Mach","EC Mach","Total Mach","Cost","Revenue","Margin"].map(h => (
                      <th key={h} style={{padding:"8px 12px", textAlign: h==="City"||h==="Region"||h==="Type" ? "left" : "right",
                        fontSize:10, fontWeight:700, color:"#7b93b0", textTransform:"uppercase", letterSpacing:.5,
                        borderBottom:"1px solid #e2eaf3", whiteSpace:"nowrap"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cityRows.map((d,i) => (
                    <tr key={i} style={{background: i%2===0 ? "#fff" : "#fafcff"}}>
                      <td style={{padding:"7px 12px", fontSize:12, fontWeight:600, color:"#0B3D6B", whiteSpace:"nowrap"}}>
                        {d.city}
                        <div style={{fontSize:10, color:"#96aabf", fontWeight:400}}>{d.province}</div>
                      </td>
                      <td style={{padding:"7px 12px", fontSize:11, color:"#4a6080"}}>{d.region}</td>
                      <td style={{padding:"7px 12px"}}><Badge type={d.machineType} /></td>
                      <td style={{padding:"7px 12px", fontSize:12, textAlign:"right"}}>{fmtN(d.population)}</td>
                      <td style={{padding:"7px 12px", fontSize:12, textAlign:"right"}}>{d.ecs}</td>
                      <td style={{padding:"7px 12px", fontSize:12, textAlign:"right"}}>{fmtN(d.lguMachines)}</td>
                      <td style={{padding:"7px 12px", fontSize:12, textAlign:"right"}}>{fmtN(d.ecMachines)}</td>
                      <td style={{padding:"7px 12px", fontSize:12, textAlign:"right", fontWeight:700, color:"#0B3D6B"}}>{fmtN(d.totalMachines)}</td>
                      <td style={{padding:"7px 12px", fontSize:11, textAlign:"right", color:"#5C6BC0"}}>{fmtM(d.costPrice)}</td>
                      <td style={{padding:"7px 12px", fontSize:11, textAlign:"right", color:"#00897B"}}>{fmtM(d.sellRevenue)}</td>
                      <td style={{padding:"7px 12px", fontSize:11, textAlign:"right", color:"#F57C00"}}>{fmtM(d.grossMargin)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ── FINANCIAL ── */}
        {tab==="financial" && (
          <div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16}}>
              <KpiCard label="Procurement Cost" value={fmtB(totals.cost)} icon="💸" />
              <KpiCard label="Selling Revenue" value={fmtB(totals.rev)} icon="💰" />
              <KpiCard label="Gross Margin" value={fmtB(totals.margin)} icon="📊" />
              <KpiCard accent label="Net Revenue (after deductions)" value={fmtB(netRev)} sub="SOP 15% + Money 10% + Mktg 5% + Share 25%" />
            </div>

            <div style={S.grid2}>
              <Card>
                <div style={S.sectionTitle}>Revenue vs Cost by Region (₱B)</div>
                <div style={S.sectionSub}>Total procurement and selling comparison</div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={regData} margin={{top:0,right:0,left:-5,bottom:40}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f9" />
                    <XAxis dataKey="r" tick={{fontSize:9}} angle={-45} textAnchor="end" interval={0} />
                    <YAxis tick={{fontSize:9}} tickFormatter={v=>"₱"+v+"B"} />
                    <Tooltip formatter={(v,n) => ["₱"+Number(v).toFixed(2)+"B", n]} />
                    <Bar dataKey="cost" name="Cost" fill="#5C6BC0" radius={[2,2,0,0]} />
                    <Bar dataKey="rev" name="Revenue" fill="#26A69A" radius={[2,2,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <div style={S.sectionTitle}>Financial Deduction Waterfall — Per ₱2.9M Machine 2</div>
                <div style={S.sectionSub}>How selling price flows to net revenue</div>
                <div style={{display:"flex", gap:6, alignItems:"flex-end", height:200, marginTop:12, padding:"0 8px"}}>
                  {[
                    { label:"Sell Price", val:2900000, color:"#26A69A" },
                    { label:"SOP 15%", val:-2900000*0.15, color:"#EF5350" },
                    { label:"Money 10%", val:-2900000*0.10, color:"#EF5350" },
                    { label:"Mktg 5%", val:-2900000*0.05, color:"#EF5350" },
                    { label:"Share 25%", val:-2900000*0.25, color:"#EF5350" },
                    { label:"Net Rev", val:2900000*0.45, color:"#2E7D32" },
                  ].map((s,i) => {
                    const maxV = 2900000;
                    const h = Math.round(Math.abs(s.val)/maxV*150)+10;
                    return (
                      <div key={i} style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4}}>
                        <div style={{fontSize:9, fontWeight:700, color:s.color}}>{s.val>0?"+":" "}₱{Math.round(Math.abs(s.val)/1000)}K</div>
                        <div style={{width:"80%", borderRadius:"3px 3px 0 0", background:s.color, height:h}} />
                        <div style={{fontSize:8, color:"#7b93b0", textAlign:"center", lineHeight:1.3}}>{s.label}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{marginTop:16, padding:"10px 12px", background:"#f0f9f0", borderRadius:8, fontSize:12}}>
                  <div style={{fontWeight:700, color:"#2E7D32", marginBottom:4}}>Net = 45% of selling price</div>
                  <div style={{color:"#4a6080", fontSize:11}}>Per unit M2: ₱1,305,000 net &nbsp;|&nbsp; M1: ₱990,000 &nbsp;|&nbsp; M3: ₱2,025,000</div>
                </div>
              </Card>
            </div>

            <Card style={{marginTop:0}}>
              <div style={S.sectionTitle}>Financial Summary by Machine Type</div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%", borderCollapse:"collapse"}}>
                  <thead>
                    <tr style={{background:"#f8fafd"}}>
                      {["Machine Type","Cities","Total Machines","Cost","Revenue","Gross Margin","Net Revenue (45%)"].map(h => (
                        <th key={h} style={{padding:"8px 14px", textAlign: h==="Machine Type" ? "left" : "right",
                          fontSize:10, fontWeight:700, color:"#7b93b0", textTransform:"uppercase",
                          borderBottom:"1px solid #e2eaf3", whiteSpace:"nowrap"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {["Machine 1","Machine 2","Machine 3"].map((mt,i) => {
                      const sub = data.filter(d=>d.machineType===mt);
                      const cost = sub.reduce((a,d)=>a+d.costPrice,0);
                      const rev = sub.reduce((a,d)=>a+d.sellRevenue,0);
                      const margin = sub.reduce((a,d)=>a+d.grossMargin,0);
                      return (
                        <tr key={mt} style={{background: i%2===0 ? "#fff" : "#fafcff"}}>
                          <td style={{padding:"9px 14px"}}><Badge type={mt} /></td>
                          <td style={{padding:"9px 14px", textAlign:"right", fontSize:12}}>{sub.length}</td>
                          <td style={{padding:"9px 14px", textAlign:"right", fontSize:12, fontWeight:700}}>{fmtN(sub.reduce((a,d)=>a+d.totalMachines,0))}</td>
                          <td style={{padding:"9px 14px", textAlign:"right", fontSize:12, color:"#5C6BC0"}}>{fmtB(cost)}</td>
                          <td style={{padding:"9px 14px", textAlign:"right", fontSize:12, color:"#00897B"}}>{fmtB(rev)}</td>
                          <td style={{padding:"9px 14px", textAlign:"right", fontSize:12, color:"#F57C00"}}>{fmtB(margin)}</td>
                          <td style={{padding:"9px 14px", textAlign:"right", fontSize:12, fontWeight:700, color:"#2E7D32"}}>{fmtB(rev*0.45)}</td>
                        </tr>
                      );
                    })}
                    <tr style={{background:"#f0f4f9", fontWeight:700}}>
                      <td style={{padding:"9px 14px", fontSize:12, color:"#0B3D6B"}}>NATIONAL TOTAL</td>
                      <td style={{padding:"9px 14px", textAlign:"right", fontSize:12}}>{data.length}</td>
                      <td style={{padding:"9px 14px", textAlign:"right", fontSize:12}}>{fmtN(totals.machines)}</td>
                      <td style={{padding:"9px 14px", textAlign:"right", fontSize:12, color:"#5C6BC0"}}>{fmtB(totals.cost)}</td>
                      <td style={{padding:"9px 14px", textAlign:"right", fontSize:12, color:"#00897B"}}>{fmtB(totals.rev)}</td>
                      <td style={{padding:"9px 14px", textAlign:"right", fontSize:12, color:"#F57C00"}}>{fmtB(totals.margin)}</td>
                      <td style={{padding:"9px 14px", textAlign:"right", fontSize:12, color:"#2E7D32"}}>{fmtB(netRev)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* ── PARAMETERS ── */}
        {tab==="params" && (
          <div>
            <div style={{fontSize:16, fontWeight:700, fontFamily:"DM Serif Display, serif", color:"#0B3D6B", marginBottom:4}}>System Parameters</div>
            <div style={{fontSize:12, color:"#7b93b0", marginBottom:16}}>All formulas and calculations derive from these values. Upload a new Excel to update data.</div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14}}>

              <Card style={{borderColor:"#1565C0"}}>
                <div style={{fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:.7, color:"#1565C0", marginBottom:10}}>Machine Specifications</div>
                {[
                  ["Machine 1 Capacity","7,200 L/day"], ["Machine 1 Cost","₱1,100,000"], ["Machine 1 Sell","₱2,200,000"],
                  ["Machine 2 Capacity","1,700 L/day"], ["Machine 2 Cost","₱1,450,000"], ["Machine 2 Sell","₱2,900,000"],
                  ["Machine 3 Capacity","36,000 L/day"], ["Machine 3 Cost","₱2,250,000"], ["Machine 3 Sell","₱4,500,000"],
                ].map(([k,v]) => (
                  <div key={k} style={{display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #f0f4f9", fontSize:12}}>
                    <span style={{color:"#4a6080"}}>{k}</span>
                    <span style={{fontWeight:700, color:"#0B3D6B"}}>{v}</span>
                  </div>
                ))}
              </Card>

              <Card style={{borderColor:"#00897B"}}>
                <div style={{fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:.7, color:"#00897B", marginBottom:10}}>Water Demand Standards</div>
                {[
                  ["LGU Water Standard","50 L/person/day"], ["LGU Basis","Philippine LWUA"],
                  ["EC Water Standard","100 L/person/day"], ["EC Basis","WHO SPHERE Emergency"],
                  ["EC Population/Center","5,000 people"], ["EC Pop Basis","NDRRMC Standard"],
                  ["Period Duration","4 months (120 days)"],
                ].map(([k,v]) => (
                  <div key={k} style={{display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #f0f4f9", fontSize:12}}>
                    <span style={{color:"#4a6080"}}>{k}</span>
                    <span style={{fontWeight:700, color:"#0B3D6B"}}>{v}</span>
                  </div>
                ))}
              </Card>

              <Card style={{borderColor:"#E53935"}}>
                <div style={{fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:.7, color:"#E53935", marginBottom:10}}>Machine Selection Logic</div>
                {[
                  ["Machine 3 Threshold","Population > 500,000"],
                  ["Machine 2 Threshold","200,001 – 500,000"],
                  ["Machine 1 Threshold","Population ≤ 200,000"],
                ].map(([k,v]) => (
                  <div key={k} style={{display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #f0f4f9", fontSize:12}}>
                    <span style={{color:"#4a6080"}}>{k}</span>
                    <span style={{fontWeight:700, color:"#0B3D6B"}}>{v}</span>
                  </div>
                ))}
                <div style={{marginTop:10, padding:"8px 10px", background:"#fff5f5", borderRadius:7, fontSize:11, color:"#c62828", lineHeight:1.5}}>
                  <b>LGU:</b> ROUNDUP(Pop×50÷Cap, 0)<br/>
                  <b>EC:</b> ROUNDUP(ECs×5000×100÷Cap, 0)
                </div>
              </Card>

              <Card>
                <div style={{fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:.7, color:"#F57C00", marginBottom:10}}>Financial Deduction Rates</div>
                {[
                  ["SOP (Standard Operating)","15%"], ["Cost of Money","10%"],
                  ["Marketing & Misc","5%"], ["Share / Commission","25%"],
                  ["Total Deductions","55%"], ["Net Margin","45% of selling price"],
                ].map(([k,v]) => (
                  <div key={k} style={{display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #f0f4f9", fontSize:12}}>
                    <span style={{color:"#4a6080"}}>{k}</span>
                    <span style={{fontWeight:700, color: k==="Net Margin" ? "#2E7D32" : "#0B3D6B"}}>{v}</span>
                  </div>
                ))}
              </Card>

              <Card>
                <div style={{fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:.7, color:"#7b93b0", marginBottom:10}}>Coverage Statistics</div>
                {[
                  ["Total Cities", data.length],
                  ["Total Regions", regions.length],
                  ["Total Evac Centers", fmtN(data.reduce((a,d)=>a+d.ecs,0))],
                  ["Cities with Machine 1", data.filter(d=>d.machineType==="Machine 1").length + " cities"],
                  ["Cities with Machine 2", data.filter(d=>d.machineType==="Machine 2").length + " cities"],
                  ["Cities with Machine 3", data.filter(d=>d.machineType==="Machine 3").length + " cities"],
                  ["Data Source", "PSA Census 2020"],
                ].map(([k,v]) => (
                  <div key={k} style={{display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #f0f4f9", fontSize:12}}>
                    <span style={{color:"#4a6080"}}>{k}</span>
                    <span style={{fontWeight:700, color:"#0B3D6B"}}>{v}</span>
                  </div>
                ))}
              </Card>

              <Card>
                <div style={{fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:.7, color:"#4527A0", marginBottom:10}}>Legal Framework</div>
                {[
                  ["Primary Law","RA 12076"], ["Signed","December 2024"],
                  ["DRRM Law","RA 10121"], ["Implementing Agency","NDRRMC / OCD"],
                  ["LGU Responsibility","DILG Mandate"], ["Water Standard Auth","LWUA / WHO SPHERE"],
                ].map(([k,v]) => (
                  <div key={k} style={{display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid #f0f4f9", fontSize:12}}>
                    <span style={{color:"#4a6080"}}>{k}</span>
                    <span style={{fontWeight:700, color:"#0B3D6B"}}>{v}</span>
                  </div>
                ))}
                <div style={{marginTop:10}}>
                  <div style={{fontSize:11, fontWeight:700, color:"#7b93b0", marginBottom:4}}>Upload Status</div>
                  {uploadDate
                    ? <div style={{fontSize:11, color:"#2E7D32"}}>✅ Last updated: {uploadDate}</div>
                    : <div style={{fontSize:11, color:"#7b93b0"}}>Using embedded PSA 2020 seed data</div>}
                </div>
              </Card>
            </div>
          </div>
        )}

      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          nav, .no-print { display: none !important; }
          body { background: white; }
          header { background: #0B3D6B !important; print-color-adjust: exact; }
        }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #f0f4f9; }
        ::-webkit-scrollbar-thumb { background: #c0cfe0; border-radius: 3px; }
      `}</style>

      {/* Load XLSX */}
      <script dangerouslySetInnerHTML={{__html:`
        if (!window.XLSX) {
          var s = document.createElement('script');
          s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
          document.head.appendChild(s);
        }
      `}} />
    </div>
  );
}
