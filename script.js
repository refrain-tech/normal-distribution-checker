'use strict';
class HTMLGraphElement extends HTMLCanvasElement {
  #convertY = value => this.height - value;
  constructor (width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  adoptedCallback () { }
  attributeChangedCallback (attrName, oldVal, newVal) {
    if (oldVal !== newVal) this[attrName] = newVal;
  }
  connectedCallback () { }
  disconnectedCallback () { }
  static get observedAttributes () {
    return [ 'height', 'width' ];
  }
  drawLine (startX, startY, endX, endY) {
    const context = this.getContext('2d');
    context.beginPath();
    context.moveTo(startX, this.#convertY(startY));
    context.lineTo(endX, this.#convertY(endY));
    context.closePath();
    context.stroke();
  }
  drawLines (positions) {
    positions.forEach(({ startX, startY, endX, endY }) =>  this.drawLine(startX, startY, endX, endY));
  }
  draw (positions, fill = false) {
    const context = this.getContext('2d');
    context.beginPath();
    const { x, y } = positions[0];
    context.moveTo(x, this.#convertY(y));
    positions.forEach((position, index) => {
      if (index) {
        const { x, y } = position;
        context.lineTo(x, this.#convertY(y));
      }
    });
    context.closePath();
    fill ? context.fill() : context.stroke();
  }
  drawSquare (x, y, width, height, fill = false) {
    const context = this.getContext('2d');
    fill ? context.fillRect(x, this.#convertY(y + height), width, height) : context.strokeRect(x, this.#convertY(y + height), width, height);
  }
}
customElements.define('x-graph', HTMLGraphElement, { extends: 'canvas' });
// ai_map[データ数 - 2][データ順序]で対象の値を取得
const ai_map = [
  [ 0.7071 ],
  [ 0.7071, 0.0000 ],
  [ 0.6872, 0.1667 ],
  [ 0.6646, 0.2413, 0.0000 ],
  [ 0.6431, 0.2806, 0.0875 ],
  [ 0.6233, 0.3031, 0.1401, 0.0000 ],
  [ 0.6052, 0.3164, 0.1743, 0.0561 ],
  [ 0.5885, 0.3244, 0.1976, 0.0947, 0.0000 ],
  [ 0.5739, 0.3291, 0.2141, 0.1224, 0.0399 ],
  [ 0.5601, 0.3315, 0.2260, 0.1429, 0.0695, 0.0000 ],
  [ 0.5475, 0.3325, 0.2347, 0.1586, 0.0922, 0.0303 ],
  [ 0.5359, 0.3325, 0.2412, 0.1707, 0.1099, 0.0539, 0.0000 ],
  [ 0.5251, 0.3318, 0.2460, 0.1802, 0.1240, 0.0727, 0.0240 ],
  [ 0.5150, 0.3306, 0.2495, 0.1878, 0.1353, 0.0880, 0.0433, 0.0000 ],
  [ 0.5056, 0.3290, 0.2521, 0.1939, 0.1449, 0.1005, 0.0593, 0.0196 ],
  [ 0.4968, 0.3273, 0.2540, 0.1988, 0.1524, 0.1109, 0.0725, 0.0359, 0.0000 ],
  [ 0.4886, 0.3253, 0.2553, 0.2027, 0.1587, 0.1197, 0.0837, 0.0496, 0.0163 ],
  [ 0.4808, 0.3232, 0.2561, 0.2059, 0.1641, 0.1271, 0.0932, 0.0612, 0.0303, 0.0000 ],
  [ 0.4734, 0.3211, 0.2565, 0.2085, 0.1686, 0.1334, 0.1013, 0.0711, 0.0422, 0.0140 ],
  [ 0.4643, 0.3185, 0.2578, 0.2119, 0.1736, 0.1399, 0.1092, 0.0804, 0.0530, 0.0263, 0.0000 ],
  [ 0.4590, 0.3156, 0.2571, 0.2131, 0.1764, 0.1443, 0.1150, 0.0878, 0.0618, 0.0368, 0.0122 ],
  [ 0.4542, 0.3126, 0.2563, 0.2139, 0.1787, 0.1480, 0.1201, 0.0941, 0.0696, 0.0459, 0.0228, 0.0000 ],
  [ 0.4493, 0.3098, 0.2554, 0.2145, 0.1807, 0.1512, 0.1245, 0.0997, 0.0764, 0.0539, 0.0321, 0.0107 ],
  [ 0.4450, 0.3069, 0.2543, 0.2148, 0.1822, 0.1539, 0.1283, 0.1046, 0.0823, 0.0610, 0.0403, 0.0200, 0.0000 ],
  [ 0.4407, 0.3043, 0.2533, 0.2151, 0.1836, 0.1563, 0.1316, 0.1089, 0.0876, 0.0672, 0.0476, 0.0284, 0.0094 ],
  [ 0.4366, 0.3018, 0.2522, 0.2152, 0.1848, 0.1584, 0.1346, 0.1128, 0.0923, 0.0728, 0.0540, 0.0358, 0.0178, 0.0000 ],
  [ 0.4328, 0.2992, 0.2510, 0.2151, 0.1857, 0.1601, 0.1372, 0.1162, 0.0965, 0.0778, 0.0598, 0.0424, 0.0253, 0.0084 ],
  [ 0.4291, 0.2968, 0.2499, 0.2150, 0.1864, 0.1616, 0.1395, 0.1192, 0.1002, 0.0822, 0.0650, 0.0483, 0.0320, 0.0159, 0.0000 ],
  [ 0.4254, 0.2944, 0.2487, 0.2148, 0.1870, 0.1630, 0.1415, 0.1219, 0.1036, 0.0862, 0.0697, 0.0537, 0.0381, 0.0227, 0.0076 ],
  [ 0.4220, 0.2921, 0.2475, 0.2145, 0.1874, 0.1641, 0.1433, 0.1243, 0.1066, 0.0899, 0.0739, 0.0585, 0.0435, 0.0289, 0.0144, 0.0000 ],
  [ 0.4188, 0.2898, 0.2462, 0.2141, 0.1878, 0.1651, 0.1449, 0.1265, 0.1093, 0.0931, 0.0777, 0.0629, 0.0485, 0.0344, 0.0206, 0.0068 ],
  [ 0.4156, 0.2876, 0.2451, 0.2137, 0.1880, 0.1660, 0.1463, 0.1284, 0.1118, 0.0961, 0.0812, 0.0699, 0.0530, 0.0395, 0.0262, 0.0131, 0.0000 ],
  [ 0.4127, 0.2854, 0.2439, 0.2132, 0.1882, 0.1667, 0.1475, 0.1301, 0.1140, 0.0988, 0.0844, 0.0706, 0.0572, 0.0441, 0.0314, 0.0187, 0.0062 ],
  [ 0.4096, 0.2834, 0.2427, 0.2127, 0.1883, 0.1673, 0.1487, 0.1317, 0.1160, 0.1013, 0.0873, 0.0739, 0.0610, 0.0484, 0.0361, 0.0239, 0.0119, 0.0000 ],
  [ 0.4068, 0.2813, 0.2415, 0.2121, 0.1833, 0.1678, 0.1496, 0.1331, 0.1179, 0.1036, 0.0900, 0.0770, 0.0645, 0.0523, 0.0404, 0.0287, 0.0172, 0.0057 ],
  [ 0.4040, 0.2794, 0.2403, 0.2116, 0.1883, 0.1683, 0.1505, 0.1344, 0.1196, 0.1056, 0.0924, 0.0798, 0.0677, 0.0559, 0.0444, 0.0331, 0.0220, 0.0110, 0.0000 ],
  [ 0.4015, 0.2774, 0.2391, 0.2110, 0.1881, 0.1686, 0.1513, 0.1356, 0.1211, 0.1075, 0.0947, 0.0824, 0.0706, 0.0592, 0.0481, 0.0372, 0.0264, 0.0158, 0.0053 ],
  [ 0.3989, 0.2755, 0.2380, 0.2104, 0.1880, 0.1689, 0.1520, 0.1366, 0.1225, 0.1092, 0.0967, 0.0848, 0.0733, 0.0622, 0.0515, 0.0409, 0.0305, 0.0203, 0.0101, 0.0000 ],
  [ 0.3964, 0.2737, 0.2368, 0.2098, 0.1878, 0.1691, 0.1526, 0.1376, 0.1237, 0.1108, 0.0986, 0.0870, 0.0759, 0.0651, 0.0546, 0.0444, 0.0343, 0.0244, 0.0146, 0.0049 ],
  [ 0.3940, 0.2719, 0.2357, 0.2091, 0.1876, 0.1693, 0.1531, 0.1384, 0.1249, 0.1123, 0.1004, 0.0891, 0.0782, 0.0677, 0.0575, 0.0476, 0.0379, 0.0283, 0.0188, 0.0094, 0.0000 ],
  [ 0.6917, 0.2701, 0.2345, 0.2085, 0.1874, 0.1694, 0.1535, 0.1392, 0.1259, 0.1136, 0.1020, 0.0909, 0.0804, 0.0701, 0.0602, 0.0506, 0.0411, 0.0318, 0.0227, 0.0136, 0.0045 ],
  [ 0.3894, 0.2684, 0.2334, 0.2078, 0.1871, 0.1695, 0.1539, 0.1398, 0.1269, 0.1149, 0.1035, 0.0927, 0.0824, 0.0724, 0.0628, 0.0534, 0.0422, 0.0352, 0.0263, 0.0175, 0.0087, 0.0000 ],
  [ 0.3872, 0.2667, 0.2323, 0.2072, 0.1868, 0.1695, 0.1542, 0.1405, 0.1278, 0.1160, 0.1049, 0.0943, 0.0842, 0.0745, 0.0651, 0.0560, 0.0471, 0.0383, 0.0296, 0.0211, 0.0126, 0.0042 ],
  [ 0.3850, 0.2651, 0.2313, 0.2065, 0.1865, 0.1695, 0.1545, 0.1410, 0.1286, 0.1170, 0.1062, 0.0959, 0.0860, 0.0765, 0.0673, 0.0584, 0.0497, 0.0412, 0.0328, 0.0245, 0.0163, 0.0081, 0.0000 ],
  [ 0.3830, 0.2635, 0.2302, 0.2058, 0.1862, 0.1695, 0.1548, 0.1415, 0.1293, 0.1180, 0.1073, 0.0972, 0.0876, 0.0783, 0.0694, 0.0607, 0.0522, 0.0439, 0.0357, 0.0277, 0.0197, 0.0118, 0.0039 ],
  [ 0.3808, 0.2620, 0.2291, 0.2052, 0.1859, 0.1695, 0.1550, 0.1420, 0.1300, 0.1189, 0.1085, 0.0986, 0.0892, 0.0801, 0.0713, 0.0628, 0.0546, 0.0465, 0.0385, 0.0307, 0.0229, 0.0153, 0.0076, 0.0000 ],
  [ 0.3789, 0.2604, 0.2281, 0.2045, 0.1855, 0.1693, 0.1551, 0.1423, 0.1306, 0.1197, 0.1095, 0.0998, 0.0906, 0.0817, 0.0731, 0.0648, 0.0568, 0.0489, 0.0411, 0.0355, 0.0259, 0.0185, 0.0111, 0.0037 ],
  [ 0.3770, 0.2589, 0.2271, 0.2038, 0.1851, 0.1692, 0.1553, 0.1427, 0.1312, 0.1205, 0.1105, 0.1010, 0.0919, 0.0832, 0.0748, 0.0667, 0.0588, 0.0511, 0.0436, 0.0361, 0.0288, 0.0215, 0.0143, 0.0071, 0.0000 ],
  [ 0.3751, 0.2574, 0.2260, 0.2032, 0.1847, 0.1691, 0.1554, 0.1430, 0.1317, 0.1212, 0.1113, 0.1020, 0.0932, 0.0846, 0.0764, 0.0685, 0.0608, 0.0532, 0.0459, 0.0386, 0.0314, 0.0244, 0.0174, 0.0104, 0.0035 ]
 ];
const context = graph.getContext('2d');
const fontSize = 20;
/*
 * 1. 入力フォームのデータを取得・変換する
 * 2. 数値を算出する
 *    1. データ数を取得
 *    2. データの平均値を取得
 *    3. データの最小値・最大値を取得
 *    4. データの中央値を取得
 *       |>併せて第一・第三四分位数、四分位偏差を取得
 *    5. データの平方和を取得
 *    6. データの分散を取得
 *       |>S/(n-1)
 *    7. データの標準偏差を取得
 *       |>√V
 *    8. データの工程能力を取得
 *    9. データの歪度を取得
 *       |>Σ(Xi-μ)³/(nσ³)
 *    10. データの尖度を取得
 *        |>Σ(Xi-μ)⁴/(nσ⁴)
 *    11. シャピロ-ウィルク検定の実施
 * 3. キャンバスを初期化する
 *    1. キャンバスの幅・高さのいずれかを変更
 *    2. 背景を塗り潰す
 * 4. ヒストグラムを描画する
 *    1. データを任意の間隔の配列に変換
 *    2. 補正値を取得
 *    3. ヒストグラムを描画
 *    4. 目盛りを描画
 *    5. 正規分布を描画
 *    6. LSL / USLを描画
 *    7. 平均値を描画
 *    8. ±3σを描画
 *    9. 箱ひげ図を描画
 * 5. データを出力する
 *    1. データの表示・非表示を切り替える
 *    2. テーブルにデータを出力
 *    3. キャンバスを画像に変換
 */
function main (event) {
  /**
   * 入力フォームから値を受け取り、以下の流れでデータを整形する
   * 1. スペースの除去
   * 2. カンマで区切る
   * 3. 数値以外を除去
   * 4. 小数に変換
   * 5. 小さい順にソート
   */
  const elements = o0wW1dZt.value.replace(/\s/g, '')
                                 .split(',')
                                 .filter(currentValue => isNumber(Number(currentValue)))
                                 .map(parseFloat).sort();
  const n = elements.length;
  if (n < 2 || n > 50) return;
  const μ = Math.average.apply(null, elements);
  const minimum = Math.min.apply(null, elements);
  const maximum = Math.max.apply(null, elements);
  const χ = Math.median.apply(null, elements);
  // データの中央値の順番
  const centerIndex = Math.floor(n / 2);
  const Q1 = Math.median.apply(null, elements.slice(0, centerIndex));
  const Q3 = Math.median.apply(null, elements.slice(centerIndex + n % 2, n));
  const QD = Q3 - Q1;
  const Qσ = QD / 2;
  const S = Math.sum.apply(null, elements.map(currentValue => (currentValue - μ) ** 2));
  const V = S / (n - 1);
  const σ = V ** 0.5;
  // 規格上下限値
  const lsl = parseFloat(uSVk70ah.value);
  const usl = parseFloat(LkpAPpSF.value);
  // 下限から上限までの範囲
  const ltu = usl - lsl;
  const cp = ltu / (6 * σ);
  const cpl = (μ - lsl) / (3 * σ);
  const cpu = (usl - μ) / (3 * σ);
  const k = Math.abs((usl + lsl) / 2 - μ) / (ltu / 2);
  const cpk = cp * (1 - k);
  const γ1 = Math.sum.apply(null, elements.map(currentValue => ((currentValue - μ) ** 3) / (n * σ ** 3)));
  const γ2 = Math.sum.apply(null, elements.map(currentValue => ((currentValue - μ) ** 4) / (n * σ ** 4)));
  const W = elements.filter((element, index) => index < centerIndex).map((currentValue, index) => elements[n - 1 - index] - currentValue).reduce((accumulator, currentValue, currentIndex) => accumulator + ai_map[n - 2][currentIndex] * currentValue, 0) ** 2 / S;
  const f = t => Math.exp(-1 * ((t - μ) ** 2) / (2 * σ ** 2)) / (Math.sqrt(2 * Math.PI) * σ);
  const { height, width } = graph;
  // 幅・高さを変えてリセットする
  graph.width = width;
  graph.height = height;
  context.fillStyle = 'white';
  graph.drawSquare(0, 0, width, height, true);
  context.strokeStyle = 'black';
  graph.drawSquare(0, 0, width, height);
  const label_span = parseFloat(ZWX7XxxQ.value);
  const lower = parseFloat(jGaOPogr.value);
  const label_position = label_span / 2;
  const histogram_height = height - 50;
  const array = [ ];
  elements.forEach(currentValue => {
    const index = Math.floor(currentValue / label_span);
    if (!array[index]) array[index] = [ ];
    array[index].push(currentValue);
  });
  const maximum_position = Math.max(maximum, usl) - lower + label_span;
  const x_scale = width / maximum_position;
  const y_scale = histogram_height / Math.max.apply(null, array.filter(currentValue => currentValue).map(currentValue => currentValue.length));
  const f_scale = histogram_height / f(μ);
  context.fillStyle = 'rgb(0, 127, 255)';
  array.forEach((currentValue, index) => graph.drawSquare((index * label_span - lower + label_span / 5) * x_scale, 0, (label_span * 3 / 5) * x_scale, currentValue.length * y_scale, true));
  for (let x = 0; x <= maximum_position; x += label_span) graph.drawLine(x * x_scale, 0, x * x_scale, fontSize);
  let  t2;
  for (let t = 0; t <= width; t++) {
    t2 = t + 1;
    graph.drawLine(t, f(t / x_scale - label_position + lower) * f_scale, t2, f(t2 / x_scale - label_position + lower) * f_scale);
  }
  let x;
  let y = histogram_height - fontSize;
  let ty = fontSize + 50;
  context.font = `${fontSize}px monospace`;
  context.textAlign = 'center';
  if (isNumber(lsl)) {
    x = (lsl + label_position - lower) * x_scale;
    context.fillStyle = 'blue';
    context.strokeStyle = 'blue';
    graph.drawLine(x, 0, x, y);
    context.fillText('LSL', x, ty);
  }
  if (isNumber(usl)) {
    x = (usl + label_position - lower) * x_scale;
    context.fillStyle = 'red';
    context.strokeStyle = 'red';
    graph.drawLine(x, 0, x, y);
    context.fillText('USL', x, ty);
  }
  x = (μ + label_position - lower) * x_scale;
  context.fillStyle = 'green';
  context.strokeStyle = 'green';
  graph.drawLine(x, 0, x, y);
  context.fillText('μ',  x, ty);
  x = (μ - 3 * σ + label_position - lower) * x_scale;
  y = histogram_height / 2 - fontSize;
  context.fillStyle = 'purple';
  context.strokeStyle = 'purple';
  graph.drawLine(x, 0, x, y);
  context.fillText('-3σ', x, histogram_height / 2 + ty);
  x = (μ + 3 * σ + label_position - lower) * x_scale;
  context.fillStyle = 'orange';
  context.strokeStyle = 'orange';
  graph.drawLine(x, 0, x, y);
  context.fillText('+3σ', x, histogram_height / 2 + ty);
  context.strokeStyle = 'black';
  graph.drawSquare((Q1 + label_position - lower) * x_scale, histogram_height, QD * x_scale, 50);
  const min_x = (minimum + label_position - lower) * x_scale;
  const χ_x = (χ + label_position - lower) * x_scale;
  const max_x = (maximum + label_position - lower) * x_scale;
  graph.drawLines([
    { startX: min_x, startY: histogram_height, endX: min_x, endY: height },
    { startX: χ_x, startY: histogram_height, endX: χ_x, endY: height },
    { startX: max_x, startY: histogram_height, endX: max_x, endY: height },
    { startX: min_x, startY: histogram_height + 25, endX: max_x, endY: histogram_height + 25 }
  ]);
  let DATA_SHOW = xI2sfRms.hasAttribute('show');
  if (event.target === xI2sfRms) {
    if (DATA_SHOW) {
      xI2sfRms.removeAttribute('show');
      xI2sfRms.textContent = 'データを表示する';
    } else {
      xI2sfRms.setAttribute('show', '');
      xI2sfRms.textContent = 'データを表示しない';
    }
    DATA_SHOW = !DATA_SHOW;
  }
  context.fillStyle = 'black';
  context.textAlign = 'start';
  result.innerHTML = '';
  const digit = parseInt(hAHihR4z.value);
  const data = [
    [ '項目', '記号', '値' ],
    [ 'データ数', 'n', n.toFixed(digit) ],
    [ '平均値', 'μ',  μ.toFixed(digit) ],
    [ '最小値', 'min', minimum.toFixed(digit) ],
    [ '最大値', 'max', maximum.toFixed(digit) ],
    [ '中央値', 'χ', χ.toFixed(digit) ],
    [ '第一四分位数', 'Q1', Q1.toFixed(digit) ],
    [ '第三四分位数', 'Q3', Q3.toFixed(digit) ],
    [ '四分位偏差', 'Qσ', Qσ.toFixed(digit) ],
    [ '平方和', 'S', S.toFixed(digit) ],
    [ '分散', 'V', V.toFixed(digit) ],
    [ '標準偏差', 'σ', σ.toFixed(digit) ],
    [ '平均+3σ', 'μ+3σ', (μ + 3 * σ).toFixed(digit) ],
    [ '平均-3σ', 'μ-3σ', (μ - 3 * σ).toFixed(digit) ],
    [ '下限規格', 'LSL', isNumber(lsl) ? lsl.toFixed(digit) : '-' ],
    [ '上限規格', 'USL', isNumber(usl) ? usl.toFixed(digit) : '-' ],
    [ '工程能力', 'Cp', isNumber(cp) ? cp.toFixed(digit) : '-' ],
    [ '工程能力(下側規格)', 'Cpl', isNumber(cpl) ? cpl.toFixed(digit) : '-' ],
    [ '工程能力(上側規格)', 'Cpu', isNumber(cpu) ? cpu.toFixed(digit) : '-' ],
    [ '工程能力', 'Cpk', isNumber(cpk) ? cpk.toFixed(digit) : '-' ],
    [ '歪度', 'γ1', γ1.toFixed(digit) ],
    [ '尖度', 'γ2', γ2.toFixed(digit) ],
    [ 'シャピロ-ウィルク検定', 'W', W.toFixed(digit) ]
  ];
  const length = [
    Math.max.apply(null, data.map(currentValue => currentValue[1].length)),
    Math.max.apply(null, data.map(currentValue => currentValue[2].length))
  ];
  let tag;
  data.forEach((currentValue, index) => {
    if (index > 0 && DATA_SHOW) context.fillText(`${currentValue[1]}${' '.repeat(length[0] - currentValue[1].length)} = ${' '.repeat(length[1] - currentValue[2].length) + currentValue[2]}`, fontSize, fontSize * (index+ 1));
    tag = index ? 'td' : 'th';
    result.innerHTML += `<tr>
  <${tag}>${currentValue[0]}</${tag}>
  <${tag} align = 'center'>${currentValue[1]}</${tag}>
  <${tag} ${index ? 'align = \'right\'' : ''}>${currentValue[2]}</${tag}>
</tr>`;
  });
}
window.addEventListener('load', main, false);
o0wW1dZt.addEventListener('change', main, false);
LkpAPpSF.addEventListener('change', main, false);
uSVk70ah.addEventListener('change', main, false);
ZWX7XxxQ.addEventListener('change', main, false);
jGaOPogr.addEventListener('change', main, false);
hAHihR4z.addEventListener('change', main, false);
xI2sfRms.addEventListener('click', main, false);
cTVruYhe.addEventListener('click', event => {
  const a = document.createElement('a');
  a.download = Date.now();
  a.href = graph.toDataURL();
  a.click();
}, false);
