# homebridge-purple-powerbase

Simple HTTP Homebridge plugin for the Reverie Purple Powerbase
_________________________________________

## Installation
Please read through the README for the Python Flask API that is required for this plugin to work:  [here](https://github.com/jbyerline/flask-purple-powerbase).

Once that is completed you can update your config file to match the pattern below.

## Device Configuration
```
{
    "accessory": "Purple Powerbase",
    "name": "Purple Powerbase",
    "base_url": "http://10.0.0.214:8000"
    "led_type": "bluetooth"
}
```

## Configuration Params
|             Parameter            |                       Description                       | Required |
| -------------------------------- | ------------------------------------------------------- |:--------:|
| `accessory`                      | name of the plugin (must be Purple Powerbase)           |     ✓    |
| `name`                           | name of the accessory in Home app                       |     ✓    |
| `base_url`                       | url endpoint for whatever is receiving these requests   |     ✓    |
| `led_type`                       | bluetooth or GPIO                                       |     ✓    |


## Help
- Make sure specify a port (probably 8000). (i.e. `"base_url" : "http://192.168.X.XXX:8000"`)
