
function createLine(x1, y1, x2, y2,color) {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', color); 
    line.setAttribute('stroke-width', 1);
    return line;
}

function createRect(x, y, width, height) {
  var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', x);
  rect.setAttribute('y', y);
  rect.setAttribute('width', width);
  rect.setAttribute('height', height);
  return rect;
}

function createPolygon(points) {
  var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', points);
  return polygon;
}

function createConfigurationDiv(){
  var divId = "map_config";
  var targetDiv = document.getElementById(divId);
  var pMapHeight = document.createElement("p");
  var pMapWidth = document.createElement("p");
  pMapHeight.textContent = `mapHeight : ${mapHeight}`;
  pMapWidth.textContent = `mapWidth : ${mapWidth}`;
  targetDiv.appendChild(pMapHeight);
  targetDiv.appendChild(pMapWidth);
}

function createSVGMap(width, height, lines, polygonFilledAreas=null,rectFillAreas=null) {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);

  lines.forEach(function(line) {
    var x1 = line.startX * width;
    var y1 = line.startY * height;
    var x2 = line.endX * width;
    var y2 = line.endY * height;
    var lineColor = line.color ? line.color : 'black';
    var svgLine = createLine(x1, y1, x2, y2, lineColor);
    svg.appendChild(svgLine);
  });


  polygonFilledAreas !== null && polygonFilledAreas.forEach(function(area) {
    var points = area.map(function(point) {
      return point.x * width + ',' + point.y * height;
    }).join(' ');

    var svgPolygon = createPolygon(points);
    svg.appendChild(svgPolygon);
  });

  rectFillAreas !== null &&rectFillAreas.forEach(function(area) {
      var x = area.x * width;
      var y = area.y * height;
      var rectWidth = area.width * width;
      var rectHeight = area.height * height;
  
      var svgRect = createRect(x, y, rectWidth, rectHeight);
      svg.appendChild(svgRect);
  });

  return svg;
}

function downloadSVG(svg, filename) {
  var clonedSvg = svg.cloneNode(true);
  var styles = Array.from(document.styleSheets).reduce(function (acc, sheet) {
    if (sheet.cssRules) {
      acc += Array.from(sheet.cssRules).reduce(function (rules, rule) {
        rules += rule.cssText;
        return rules;
      }, '');
    }
    return acc;
  }, '');

  var styleElement = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  styleElement.textContent = styles;

  clonedSvg.insertBefore(styleElement, clonedSvg.firstChild);

  var svgData = new XMLSerializer().serializeToString(clonedSvg);
  var blob = new Blob([svgData], { type: 'image/svg+xml' });

  var link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

function meterToPercentages(meters,mapAxisMeterSize){
  var ratio = meters / mapAxisMeterSize;
  return ratio
}

function convertCoordinatesToPercentages(coordinates, mapMeterWidth, mapMeterHeight,paddingTopLeft=0.3) {
  return coordinates.map(coord => ({
      color: coord.color,
      startX: meterToPercentages(coord.startX + paddingTopLeft, mapMeterWidth),
      startY: meterToPercentages(coord.startY + paddingTopLeft, mapMeterHeight),
      endX: meterToPercentages(coord.endX + paddingTopLeft, mapMeterWidth),
      endY: meterToPercentages(coord.endY + paddingTopLeft, mapMeterHeight),
  }));
}

function addDownload(filename){
  document.getElementById('downloadButton').addEventListener('click', function() {
    downloadSVG(svgMap, filename);
  });
}

