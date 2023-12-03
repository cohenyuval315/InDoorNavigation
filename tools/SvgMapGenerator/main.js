  
var mapWidth = 600;
var mapHeight = 600;

const yuvalfirstfloorhousesvg = createYuvalHouseFirstFloor(mapWidth,mapHeight);

const svgmapsToDisplay = [yuvalfirstfloorhousesvg];

function createYuvalHouseFirstFloor(mapWidth, mapHeight){
  const filename = 'yuval_first_floor.svg'
  const mapMeterWidth = 30 //9.55;
  const mapMeterHeight = 30 //28.03;

  // var originalLineCoordinates = [
  //     { startX: 0, startY: 0, endX: 7.15, endY: 0 },
  //     { startX: 7.15, startY: 0, endX: 7.15, endY: 4.15 },
  //     { startX: 7.15, startY: 4.15, endX: 1.4, endY: 5.5 },
  //     { startX: 1.4, startY: 5.5, endX: 1.65, endY: 5.75 },
  //     { startX: 1.65, startY: 5.75, endX: 2.5, endY: 5.75 },
  //     { startX: 2.5, startY: 5.75, endX: 2.5, endY: 8.4 },
  //     { startX: 2.5, startY: 8.4, endX: 1.65, endY: 8.4 },
  //     { startX: 1.65, startY: 8.4, endX: 1.65, endY: 11.65 },
  //     { startX: 2.15, startY: 11.65, endX: 5, endY: 11.65 },
  //     { startX: 5, startY: 11.65, endX: 5, endY: 14.9 },
  //     { startX: 2.15, startY: 14.9, endX: 4.55, endY: 14.9 },
  //   ];
  var color_map = {
      door : "green",
      wall : "black",
  }
  var originalLineCoordinates = [
      // horizontal by height
      {color: 'red', startX: 0, startY: 0, endX: 7.15, endY: 0},
      {color: 'blue', startX: 7.15, startY: 4.15, endX: 9.55, endY: 4.15 },
      {color: 'blue', startX: 1.4, startY: 5.5, endX: 7.15, endY: 5.5 },
      {color: 'blue', startX: 1.4 + 0.25, startY: 5.5 + 0.25, endX: 7.15 - 0.25, endY: 5.5 + 0.25},
      {color: 'black', startX: 1.4 + 0.25 , startY: 5.5 + 0.25 + 2.65, endX: 2.5, endY: 5.5 + 0.25 + 2.65},

      {color: 'green', startX: 2.5 , startY: 5.5 + 0.25 + 1, endX: 2.5, endY: 5.5 + 0.25 + 2.65},
      
      {color: 'purple', startX: 2.5 , startY: 6.75, endX: 5, endY: 6.75},

      {color: 'pink', startX: 5 , startY: 6.75, endX: 5, endY: 9},

      {color: 'red', startX: 5 , startY: 9, endX: 5 + 2.5 - 1, endY: 9},
      {color: 'green', startX: 6.5 , startY: 9, endX: 7.5, endY: 9},

      {color: 'blue', startX: 5.5 , startY: 9 + 0.78, endX: 7.5, endY: 9 +0.78},

      {color: 'gray', startX: 5.5 , startY: 9.78, endX: 5.5, endY: 14},

      {color: 'red', startX: 5.5 , startY: 9.78 + 0.90, endX: 7.1, endY: 9.78 + 0.90},
      // {color: 'black', startX: 1.4 + 0.25 + 0.85, startY: 5.5 + 0.25 + 1, endX: 1.4 + 0.25 + 0.85 + 2.5, endY: 5.5 + 0.25 + 1},

      // {color: 'black', startX: 1.4 + 0.25 + 0.85, startY: 5.5 + 0.25 + 1, endX: 1.4 + 0.25 + 0.85 + 2.5, endY: 5.5 + 0.25 + 1},
      
      // {color: 'black', startX: 1.4 + 0.25 + 0.85 + 2.5 , startY: 5.5 + 0.25 + 1 + 3.25, endX: 1.4 + 0.25 + 0.85 + 2.5 + 2.85, endY: 5.5 + 0.25 + 1 + 3.25},
      



      // vertical by height
      {color: 'black', startX: 7.15 , startY: 4.15 + 1.35 , endX: 7.15, endY: 4.15 + 1.35 + 0.25 +1 + 3.25 + 0.78 +0.9  },
      {color: 'black', startX: 7.4 , startY: 4.15 + 1.35 , endX: 7.4, endY: 4.15 + 1.35 + 0.25 +1 + 3.25 + 0.78 +0.9  },
      {color: 'black', startX: 7.15 , startY: 0 , endX: 7.15, endY: 4.15 },
      {color: 'black', startX: 9.55 , startY: 4.15 , endX: 9.55, endY: 4.15 + 7 },
      {color: 'green', startX: 0 , startY: 0, endX: 0, endY: 24.83},

      {color: 'green', startX: 1.4 , startY: 5.5, endX: 1.4, endY: 12},

      {color: 'red', startX: 1.4 , startY: 12, endX: 1.4, endY: 12.85}, // door 0.85

      {color: 'blue', startX: 1.4 , startY: 12.85, endX: 1.4, endY: 13.85}, // between door and stairs wall 1

      {color: 'gray', startX: 1.4 + 0.25, startY: 13.85, endX: 5.32, endY: 13.85}, // side start of stairs and wall
      {color: 'gray', startX: 1.4 + 0.25 , startY: 14.85, endX: 5.32, endY: 14.85}, // side end of stairs 

      {color: 'purple', startX: 1.4 , startY: 13.85, endX: 1.4, endY: 17}, // between door and grama gate minus stairs 4.1 - 1 = 3.1

      {color: 'red', startX: 1.4 , startY: 17, endX: 1.4, endY: 18.5}, // grama gate   1.5
      {color: 'pink', startX: 1.4 , startY: 18.5, endX: 1.4, endY: 25}, // grama gate to the main gate

      {color: 'black', startX: 0 , startY: 5.5 + 6.48 + 0.85 + 4.10 + 1.45 + 6.45 + 0.1, endX: 0, endY: 5.5 + 6.48 + 0.85 + 4.10 + 1.45 + 6.45 + 0.1 + 3.10},
      {color: 'black', startX: 1.4 , startY: 5.5, endX: 1.4, endY: 5.5 + 6.48},
      
      // {color: 'black', startX: 1.4 , startY: 5.5, endX: 1.4, endY: 5.5 + 6.48},

      {color: 'black', startX: 1.4 + 0.25 , startY: 5.5, endX: 1.4 + 0.25, endY: 5.5 + 6.48 + 0.85 + 4.10 + 1.45 + 6.45},
      {color: 'black', startX: 1.4 , startY:  5.5 + 6.48 + 0.85 + 4.10 + 1.45 + 6.45 + 0.1, endX: 1.4, endY: 5.5 + 6.48 + 0.85 + 4.10 + 1.45 + 6.45 + 0.1 + 3.10},

      

  ];
  var convertedLineCoordinates = convertCoordinatesToPercentages(originalLineCoordinates, mapMeterWidth, mapMeterHeight);
  var svgMap = createSVGMap(mapWidth, mapHeight, convertedLineCoordinates);
  addDownload(filename);
  return svgMap;
}

function createAfekaFirstFloor(){

}

function createAfekaSecondFloor(){

}

//   var lineCoordinates = [
//     { startX: 0, startY: 0, endX: 0.1, endY: 0.6 },
//     { startX: 0.1, startY: 0.2, endX: 0.8, endY: 0.7 },
//     { startX: 0.2, startY: 0.4, endX: 0.6, endY: 0.9 },
//     // Add more lines as needed
//   ];
//   var rectFillAreas = [
//     { x: 0.1, y: 0.1, width: 0.3, height: 0.2 },
//   ]
//   var polygonFilledAreas = [
//     [
//       { x: 0.1, y: 0.1 },
//       { x: 0.4, y: 0.2 },
//       { x: 0.3, y: 0.4 },
//       { x: 0.1, y: 0.3 }
//     ],
//   ];
  
// var svgMap = createSVGMap(mapWidth, mapHeight, lineCoordinates, polygonFilledAreas,rectFillAreas);



// document.getElementById('downloadButton').addEventListener('click', function() {
//     downloadSVG(svgMap, filename);
// });





createConfigurationDiv()
var divId = "map_wrapper";
var targetDiv = document.getElementById(divId);
svgmapsToDisplay.map((map)=>{
  targetDiv.appendChild(map);
})


// targetDiv.appendChild(svgmap.cloneNode(true));
