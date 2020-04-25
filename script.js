// Create map
map = L.map('mapDemo', {
  minZoom: 4,
  maxZoom: 6
});

// Place Zoom Control at screen bottom right of the screen
map.zoomControl.setPosition('bottomright');

// Define map bounds so that it fits data coordinates
var bounds = [[-10,-10], [10,10]];
map.fitBounds(bounds);

// Create a dictionary of markers, with IDs (key), coordinates and content (value)
var markers = {'id1':{'title':'Marker 1','coords':[1,0],'description':'Text for marker 1'}, 'id2':{'title':'Marker 2','coords':[4,2],'description':'Text for marker 2'}, 'id3':{'title':'Marker 3','coords':[8,8],'description':'Text for marker 3'}}

// Define all variables
var layers = L.layerGroup().addTo(map);
var titlesList = [];  
var idToLayer = {};
var titleToId = {};
var idToTitle = {};
var idToText = {};

// Declare updatePanel: open panel, update panel button inner HTML and update content with updateContent(), depending on mId
var updatePanel = function(mId){
  // Open panel
  $('#panel').addClass('active');
  // Update Open/Close Panel button on map
  $("#panelBtn").text('< Close Panel');
  // Store marker title and text in variables
  var markerTitle = idToTitle[mId];
  var markerText = idToText[mId];
  // Update panel content with marker title and text
  $('#panelTitle').text(markerTitle);
  $('#panelText').text(markerText);
};

// Declare markerOnClick: 
var markerOnClick = function(){
  // Store markerId
  var mId = this.options.markerId;
  // Store marker title & update seach placeholder
  var markerTitle = idToTitle[mId];
  $('#searchTerm').val(markerTitle);
  // Update Panel
  updatePanel(mId);
};

// Loop through the dictionary, define coordinates & marker options and add markers to the map
$.each(markers, function(key, val) {
  var markerOptions = {markerId: key,
                       markerTitle: val['title'],
                       markerText: val['description']};

  // Plot markers on the map 
  var marker = L.marker(val['coords'], markerOptions).addTo(map);

  // Set popup options
  var popupContent = val['title'];
  // Bind popup to marker click
  marker.bindPopup(popupContent);

  // Create a list of marker titles 
  titlesList.push(val['title']);

  // Call markerOnClick when event click on marker 
  marker.on('click', markerOnClick);

  // Create a layer for each marker that is part of the feature group of layers  
  layers.addLayer(marker)

  // -- Append dictionaries --
  //{key:'title',value:id}  
  titleToId[val['title']] = key;
  //{key:id,value:'title'} 
  idToTitle[key] = val['title'];  
  // {key:id,value:'text'}  
  idToText[key] = val['description'];

});

// loup through and append dictionnary of {key:id,value:layerId} 
$.each(layers._layers, function(key,val){
  idToLayer[val.options.markerId] = key;
});  

// SEARCH
$(function() {
   $("#searchTerm").autocomplete({
     source: titlesList,
     minLength: 1, // minimum number of characters required to trigger autocomplete
     select: function(event, ui) { // update the input field and run the search function on select
       $("#searchTerm").val(ui.item.label);
       console.log(ui.item.label);
       search();
     }
   });
 });

// Search function
var search = function(){
   $("#searchTerm").blur(); //close autocomplete after click event
   // get value from search field
   var markerTitle = $("#searchTerm").val();
   var markerId = titleToId[markerTitle];

   // find the corresponding layer and open the marker popup on the map
   var layerId = idToLayer[markerId];
   var layer = layers._layers[layerId];
   layer.openPopup();

   // open panel and display marker info
   updatePanel(markerId);
}

// Open/Close button (map): toggle panel & update #panelBtn
var togglePanel = function() {
  $('#panel').toggleClass('active'); 
  $("#panelBtn").text(($("#panelBtn").text() == 'Open Panel >') ? '< Close Panel' : 'Open Panel >'); 
}

// Close button (panel): close panel & update #panelBtn
var closePanel = function() {
  $('#panel').removeClass('active');
  $('#panelBtn').text('Open Panel >');
}