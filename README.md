# RoadLight

Control your Philips Hue lights' color with your cycling powermeter over Bluetooth Low Energy (BLE)!

![screencast 2022-01-13 07-45-31](https://user-images.githubusercontent.com/33756113/149333016-a8bfb6fe-397e-4980-9559-e5740b6e6dac.gif)

Requirements:

- [Philips Hue Bridge](https://www.philips-hue.com/en-us/p/hue-bridge/046677458478)

## Philips Hue Bridge Details

In order to connect to the Philips Hue Bridge you will need the bridge's IP address and username. You will enter those values in the interface after running the app. The instructions for obtaining those credentials can be found on the [Getting Started page](https://developers.meethue.com/develop/get-started-2/) on the Hue Developers Forum.

## To Run Locally

```bash
# Clone this repository
git clone https://github.com/tcampb/roadlight-web

# Go into the repository
cd roadlight-web
# Install dependencies
npm install
# Run the app
npm start
```
Once running, visit https://localhost:3030

## Customizing Bulb Colors

It is possible to customize bulb colors by altering the source code. If you are comfortable in a text editor, the bulb color settings for each power zone are set in `public/js/constants.js`

An easy way to determine the proper color value is to load the configuration settings for your lights by visiting `https://bridgeipaddress/api/bridgeusername/lights`. From there you will see all of the lights associated with your bridge. You can pull up an individual light by appending the light's number on the end (example: `https://bridgeipaddress/api/bridgeusername/lights/5`). As you change the hue values using the Philips Hue app, refresh the page. The value that you can use in `constants.js` can be found under `"hue"`.