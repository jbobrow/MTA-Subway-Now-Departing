# 🚇 "Now Departing" a Scriptable Widget
A simple widget for getting realtime data on a train of your choice
![Now-Departing-Widget](https://user-images.githubusercontent.com/772799/209726229-ec5e5157-37dd-4229-99c9-1e1a65c145f1.png)

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
![iphonex-mockup-now-departing-combined-settings](https://user-images.githubusercontent.com/772799/209751830-a6126c6e-cf77-4d0e-8694-a04fe4f65e56.png)
The screenshot on the left shows the Widget in action and on the right shows the Widget settings including parameters to set your train. If the widget is not showing the latest (since Apple only updates widgets irregularly), simply click on the widget to run it and it will update quickly.  

Thanks [realvjy](https://dribbble.com/realvjy) for the simple iPhone PSD template. It's easier on my eyes than a big screenshot w/o border.
