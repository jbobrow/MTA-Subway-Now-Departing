# 🚇 "Now Departing" a Scriptable Widget
A simple widget for getting realtime data on a train of your choice

## How to Install
1. Download [Scriptable for iOS](https://apps.apple.com/us/app/scriptable/id1405459188)
2. Add a new Script called "Now Departing"
3. Copy and Paste the contents of [Scriptable-MTA-Subway-Widget.js](https://raw.githubusercontent.com/jbobrow/MTA-Subway-Now-Departing/main/Scriptable-MTA-Subway-Widget.js)
4. Add a Scriptable Widget to your homescreen
5. Set the Widget Parameter to: [Train],[Station],[Direction] (i.e. G,Classon Av,N) 

## ToDo
- ✅ If time is "0 min" either show next train or "departing"
- ✅ Additional times (currently only shows the latest, could be nice to show 2-3 times)
- 🔲 Pull data directly from MTA rather than the very friendly JSON source I found that drives [wheresthef***ingtrain.com](https://wheresthefuckingtrain.com/)
- 🔲 Dynamic update (this is currently only possible for a native widget in Swift with Dynamic Dates)

## Screenshot
![Screenshot of Now Departing iOS Widget](https://user-images.githubusercontent.com/772799/209711308-7a1a8f78-fe67-4ea4-b548-2fbe0dc10695.jpeg)
I love that this screenshot shows what happens when the requested JSON source is not responding... a severely out of sync widget. At least the last updated time confirms this, but best case would be to simply have a working widget 😉  
