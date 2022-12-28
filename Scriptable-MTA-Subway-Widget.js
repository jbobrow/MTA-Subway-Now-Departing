/* 
 * "Now Departing" a scriptable widget
 * by Jonathan Bobrow
 * December 25, 2022
 *
 * Description: This is simple utility widget for New Yorkers that ride the same Subway stop daily
 *   The Widget will inform you the # of minutes until the next Subway at 1 stop. That's it.
 *   
 *   To Use: Edit Widget and set the parameters to the following:
 *   <Route>,<Station>,<Direction> (i.e. G,Classon Av,N)
 *   !!Note: commas separate, but no spaces between
 *
 * Loads the latest MTA Transit data from
 * https://api.wheresthefuckingtrain.com/by-route/
 *
 */
const API_URL = 'https://api.wheresthefuckingtrain.com';

// get parameter for route
// get parameter for station
// get parameter for direction (N or S)
const params = args.widgetParameter ? args.widgetParameter.split(",") : [];
const route = params[0] ? params[0] : "G";
const station = params[1] ? params[1] : "Classon Av";
const direction = params[2] ? params[2] : "N";

let url = API_URL + "/by-route/" + route;
let req = new Request(url);
let json = await req.loadJSON();


// PARSE THE JSON
// look for station in JSON
const stationJSON = getStationFromJSON(station,json); 
//console.log(stationJSON);
// then look for N or S and only at values for the route
const times = getTimesForRouteAndDirection(route, direction, stationJSON);
//console.log(times);

// -----------------
// START DRAW WIDGET
// -----------------
let w = new ListWidget();
w.setPadding(0,20,0,20);
w.backgroundColor = new Color('#000000');
w.refreshAfterDate = new Date(Date.now()+1000*60);	// set this to refresh every minute...


// DRAW BIG LETTER (MTA Train logo)
const row = w.addStack();
row.layoutHorizontally();

const routeStack = row.addStack();
routeStack.centerAlignContent();
routeStack.setPadding(2,0,0,0);
routeStack.size = new Size(60,60);
routeStack.cornerRadius = 30;
routeStack.backgroundColor = getColorForRoute(route);
const routeText = routeStack.addText(route);
routeText.font = new Font("Helvetica-Bold", 40);
routeText.textColor = new Color('#FFFFFF');

// routeStack.borderWidth = 1;
// routeStack.borderColor = new Color('#0000FF');


// DRAW LAST UPDATED TIME
let updatedDate = new Date(json.updated);
let updatedTimeText = formatTime(updatedDate);
// SHOW MINUTES SINCE LAST UPDATE (if this is static, it's not useful)
// let timeSinceUpdate = new Date(Date.now() - updatedDate);
// let minSinceUpdate = timeSinceUpdate.getMinutes();
// let minSinceUpdateText = minSinceUpdate + " min ago";


const lastUpdatedStack = row.addStack();
lastUpdatedStack.setPadding(0, 0, 0, 0);
lastUpdatedStack.layoutVertically();
// lastUpdatedStack.borderWidth = 1;
// lastUpdatedStack.borderColor = new Color('#0000FF');


const lastUpdatedStackTop = lastUpdatedStack.addStack();
lastUpdatedStackTop.layoutHorizontally();
lastUpdatedStackTop.addSpacer();
const lastUpdatedText = lastUpdatedStackTop.addText("Updated");
lastUpdatedText.font = Font.mediumSystemFont(10);
lastUpdatedText.textColor = new Color('#FFFFFF');
lastUpdatedText.lineLimit = 1;
// lastUpdatedStackTop.borderWidth = 1;
// lastUpdatedStackTop.borderColor = new Color('#FF00FF');


const lastUpdatedStackBottom = lastUpdatedStack.addStack();
lastUpdatedStackBottom.layoutHorizontally();
lastUpdatedStackBottom.addSpacer();
const minText = lastUpdatedStackBottom.addText(updatedTimeText);	// TODO: time or minutes
minText.font = Font.mediumSystemFont(10);
minText.textColor = new Color('#00FF66');
// lastUpdatedStackBottom.borderWidth = 1;
// lastUpdatedStackBottom.borderColor = new Color('#FF00FF');


// DRAW TIMES
const timeStack = w.addStack();
timeStack.setPadding(2, 0, 0, 0);
timeStack.layoutVertically();

const bigTimeStack = timeStack.addStack();
bigTimeStack.addSpacer();	// used to center the text (1 of 2)
bigTimeStack.centerAlignContent();
bigTimeStack.setPadding(0, 0, 0, 0);
bigTimeStack.layoutHorizontally();
// timeStack.borderWidth = 1;
// timeStack.borderColor = new Color('#FF00FF');

var timeIndex = 0;

if(getMinutesTil(times[timeIndex]) > 55) {	
	// This means the train has departed
	// I've only witnessed 59 minutes, but really anything over 30 shouldn't be in the feed
	// skip ahead to the next train
	timeIndex = 1;
	// in theory this should be iterative, but in practice, no need
}

let minutesTilText = times[timeIndex] ? getMinutesTilText(times[timeIndex]) : "- min";

const bigTimeText = bigTimeStack.addText(minutesTilText);
bigTimeText.font = new Font("Helvetica-Bold", 28);
bigTimeText.textColor = new Color('#FFFFFF');
bigTimeText.lineLimit = 1;
bigTimeText.minimumScaleFactor = 0.5;
bigTimeStack.addSpacer();	// used to center the text (2 of 2)

// DRAW ALT TIMES
const altTimeStack = timeStack.addStack();
altTimeStack.addSpacer();	// used to center the text (1 of 2)
altTimeStack.centerAlignContent();
altTimeStack.setPadding(0, 0, 0, 0);
altTimeStack.layoutHorizontally();
// altTimeStack.borderWidth = 1;
// altTimeStack.borderColor = new Color('#FF00FF');

for(var i = timeIndex+1; i < times.length; i++) {
	
	var altMinutesTilText;
	
	if(i != timeIndex+1 ) {
		altMinutesTilText = ", " + getMinutesTilText(times[i]);
	}
	else {
		altMinutesTilText = getMinutesTilText(times[i]);
	}
	
	const altTimeText = altTimeStack.addText(altMinutesTilText);
	altTimeText.font = new Font("Helvetica-Bold", 12);
	altTimeText.textColor = new Color('#666666');
	altTimeText.lineLimit = 1;
	altTimeText.minimumScaleFactor = 0.75;
}

altTimeStack.addSpacer();	// used to center the text (2 of 2)



// DRAW STATION
const stationStack = w.addStack();
stationStack.addSpacer();	// used to center the text (1 of 2)
stationStack.centerAlignContent();
stationStack.setPadding(0, 0, 0, 0);
// stationStack.borderWidth = 1;
// stationStack.borderColor = new Color('#FF00FF');
const stationText = stationStack.addText(station);
stationText.font = new Font("Helvetica", 14);
stationText.textColor = new Color('#FFFFFF');
stationText.lineLimit = 1;
stationText.minimumScaleFactor = 0.5;
stationStack.addSpacer();	// used to center the text (2 of 2)


// ---------------
// END DRAW WIDGET
// ---------------


Script.setWidget(w);
Script.complete();

// RUN WIDGET
w.presentSmall();


/*
 *  Returns a number with minutes til a specific time (i.e. "3")
 */

function getMinutesTil(date) {

	let minutesTil = new Date (date - Date.now());

	return minutesTil.getMinutes();
}


/*
 *  Returns a string with minutes til a specific time (i.e. "3 min")
 *  note: returns "Departing" if 0 minutes til
 */

function getMinutesTilText(date) {
	
	if( getMinutesTil(date) === 0 ) {
		return "Departing";
	}

	return getMinutesTil(date) + " min";
}

/*
 *  Returns a time formatted with hh:mm and AM or PM accordingly (i.e. 12:34 AM)
 */
function formatTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  
  var ampm = hours >= 12 ? "PM" : "AM";
  
  // convert from 24h time
  hours %= 12;
  
  // display 0 as 12
  hours = hours == 0 ? 12 : hours;

  // display minutes in :07 format
  minutes = minutes < 10 ? "0" + minutes : minutes;
  
  return hours + ":" + minutes + " " + ampm;
}


/*
 *	Returns a Color object with the hex value of the specified route 
 */
function getColorForRoute(route) {

	var hexColor;
	
	switch(route) {
		case "G": hexColor = "#6CBE45"; break;
		case "A":
		case "C":
		case "E": hexColor = "#0039A6"; break;
		case "B":
		case "D":
		case "F":
		case "M": hexColor = "#FF6319"; break;
		case "J":
		case "Z": hexColor = "#996633"; break;
		case "L": hexColor = "#A7A9AC"; break;
		case "N":
		case "Q":
		case "R":
		case "W": hexColor = "#FCCC0A"; break;
		case "S": hexColor = "#808183"; break;
		case "1":
		case "2":
		case "3": hexColor = "#EE352E"; break;			
		case "4":
		case "5":
		case "6": hexColor = "#00933C"; break;
		case "7": hexColor = "#B933AD"; break;

		default: hexColor = "#333333"; break;	
	}

	return new Color(hexColor);
}


/*
 *	Returns JSON for a specific station a list of all stations
 */
function getStationFromJSON(s, json) {

	let stations = json.data;

	for(var i = 0; i < stations.length; i++) {
		let station = stations[i];
		if( station.name === s ) {
			return station;
		}
	}

	return {"name":"not found"};
}


/*
 *  Returns an array of times for a specific route and direction at this station
 */ 
function getTimesForRouteAndDirection(r, dir, station) {
	
	if( station.name === "not found") {
		return ["no times"]
	}

	var times = [];
	var allTrains;
	if(dir === "N") {
		allTrains = station.N;
	}
	else {
		allTrains = station.S;	
	}

	for(var i = 0; i < allTrains.length; i++) {
		let train = allTrains[i];
		if( train.route === r ) {
			times.push(standardizeDate(train.time));
		}
	}

	return times;
}

/*
 * Returns the date from the MTAPI in a format that is standardized (removes the "-05:00")
 */
function standardizeDate(date) {
	return new Date(date.slice(0, -6));
}
