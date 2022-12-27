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
![iphonex-mockup-now-departing-combined](https://user-images.githubusercontent.com/772799/209721780-61d58e9b-72dc-48ec-80ce-e1c3170d6984.png)
The screenshot on the right shows the departing feature as well as the flaw of not being dynamic. At least the last updated time confirms that it is not up to date, but best case would be to simply have a working widget 😉. Simply click on the widget to run it and it will update quickly.  

Thanks [realvjy](https://dribbble.com/realvjy) for the simply iPhone PSD template. It's easier on my eyes than a big screenshot w/o border.
