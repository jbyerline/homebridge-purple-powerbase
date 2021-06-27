'use strict';

var Service;
var Characteristic;
var request = require('request');

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory('homebridge-purple-powerbase', 'Purple Powerbase', Powerbase);
};

function Powerbase(log, config) {
    this.log = log;
    this.name = config.name;
    this.baseUrl = config.base_url;
    this.ledType = config.led_type;
}

Powerbase.prototype = {

    getUpperHeight: function (callback) {
        request(this.baseUrl + "/getUpperHeight", (err, resp, body) => {
            if(err){
                this.log(err)
            }
            callback(null, parseInt(body))
        });
    },
    setUpperHeight: function (value, callback) {
        this.log('setting upper height ', value)
        request(this.baseUrl + "/moveUpper/" + value, (err, resp, body) => {
            callback(null, value)
        })
    },
    getUpperHeightStatus: function (callback) {
        request(this.baseUrl + "/getUpperHeight", (err, resp, body) => {
            if(body == 0){
                this.isOn = false
            } else {
                this.log()
                this.isOn = true
            }
            callback(null, this.isOn)
        })
    },

    getLowerHeight: function (callback) {
        request(this.baseUrl + "/getLowerHeight", (err, resp, body) => {
            if(err){
                this.log(err)
            }
            callback(null, parseInt(body))
        });
    },
    setLowerHeight: function (value, callback) {
        this.log('setting lower height ', value)
        request(this.baseUrl + "/moveLower/" + value, (err, resp, body) => {
            callback(null, value)
        })
    },
    getLowerHeightStatus: function (callback) {
        request(this.baseUrl + "/getLowerHeight", (err, resp, body) => {
            if(body == 0){
                this.isOn = false
            } else {
                this.log()
                this.isOn = true
            }
            callback(null, this.isOn)
        })
    },

    getUpperVib: function (callback) {
        request(this.baseUrl + "/getUpperVib", (err, resp, body) => {
            if(err){
                this.log(err)
            }
            callback(null, parseInt(body))
        });
    },
    setUpperVib: function (value, callback) {
        this.log('setting setUpperVib ', value)
        request(this.baseUrl + "/setUpperVib/" + value, (err, resp, body) => {
            callback(null, value)
        })
    },
    getUpperVibStatus: function (callback) {
        request(this.baseUrl + "/getUpperVib", (err, resp, body) => {
            if(body == 0){
                this.isOn = false
            } else {
                this.log()
                this.isOn = true
            }
            callback(null, this.isOn)
        })
    },

    getLowerVib: function (callback) {
        request(this.baseUrl + "/getUpperVib", (err, resp, body) => {
            if(err){
                this.log(err)
            }
            callback(null, parseInt(body))
        });
    },
    setLowerVib: function (value, callback) {
        this.log('setting lower vib ', value)
        request(this.baseUrl + "/setLowerVib/" + value, (err, resp, body) => {
            callback(null, value)
        })
    },
    getLowerVibStatus: function (callback) {
        request(this.baseUrl + "/getLowerVib", (err, resp, body) => {
            if(body == 0){
                this.isOn = false
            } else {
                this.log()
                this.isOn = true
            }
            callback(null, this.isOn)
        })
    },

    setBluetoothLight: function (value, callback) {
        this.isOn = value
        if(value === true){
            request(this.baseUrl + "/light/on", (err, resp, body) => {
                callback(null)
            })
        } else {
            request(this.baseUrl + "/light/off", (err, resp, body) => {
                callback(null)
            })
        }
    },
    getBluetoothLight: function (callback) {
        request(this.baseUrl + "/light/status", (err, resp, body) => {
            if(body == 0){
                this.isOn = false
            } else {
                this.log()
                this.isOn = true
            }
            callback(null, this.isOn)
        })
    },

    setGPIOLight: function (value, callback) {
        this.isOn = value
        if(value === true){
            request(this.baseUrl + "/GPIOlight/on", (err, resp, body) => {
                callback(null)
            })
        } else {
            request(this.baseUrl + "/GPIOlight/off", (err, resp, body) => {
                callback(null)
            })
        }
    },
    getGPIOLight: function (callback) {
        request(this.baseUrl + "/GPIOlight/status", (err, resp, body) => {
            if(body == 0){
                this.isOn = false
            } else {
                this.log()
                this.isOn = true
            }
            callback(null, this.isOn)
        })
    },

    getServices: function () {
        this.services = [];

        // Create Information Service
        var informationService = new Service.AccessoryInformation();
        informationService
            .setCharacteristic(Characteristic.Manufacturer, 'Purple')
            .setCharacteristic(Characteristic.Model, 'Powerbase');

        // Create bed services
        var headRaiseService = new Service.Lightbulb("Move Head", "Move Head");
        var footRaiseService = new Service.Lightbulb("Move Foot", "Move Foot");
        var headVibService = new Service.Lightbulb("Massage Head", "Massage Head");
        var footVibService = new Service.Lightbulb("Massage Foot", "Massage Foot");
        var lightService = new Service.Lightbulb("Night Light", "Night Light");

        headRaiseService.getCharacteristic(Characteristic.On)
            .on('get', this.getUpperHeightStatus.bind(this))
        headRaiseService.getCharacteristic(Characteristic.Brightness)
            .on('get', this.getUpperHeight.bind(this))
            .on('set', this.setUpperHeight.bind(this));

        footRaiseService.getCharacteristic(Characteristic.On)
            .on('get', this.getLowerHeightStatus.bind(this))
        footRaiseService.getCharacteristic(Characteristic.Brightness)
            .on('get', this.getLowerHeight.bind(this))
            .on('set', this.setLowerHeight.bind(this));

        headVibService.getCharacteristic(Characteristic.On)
            .on('get', this.getUpperVibStatus.bind(this))
        headVibService.getCharacteristic(Characteristic.Brightness)
            .on('get', this.getUpperVib.bind(this))
            .on('set', this.setUpperVib.bind(this));

        footVibService.getCharacteristic(Characteristic.On)
            .on('get', this.getLowerVibStatus.bind(this))
        footVibService.getCharacteristic(Characteristic.Brightness)
            .on('get', this.getLowerVib.bind(this))
            .on('set', this.setLowerVib.bind(this));

        if(this.ledType === "bluetooth"){
            lightService.getCharacteristic(Characteristic.On)
                .on('get', this.getBluetoothLight.bind(this))
                .on('set', this.setBluetoothLight.bind(this))
        }
        else if(this.ledType === "GPIO"){
            lightService.getCharacteristic(Characteristic.On)
                .on('get', this.getGPIOLight.bind(this))
                .on('set', this.setGPIOLight.bind(this))
        }

        // Add bed services to service array
        this.services.push(informationService);
        this.services.push(headRaiseService);
        this.services.push(headVibService);
        this.services.push(footVibService);
        this.services.push(footRaiseService);
        this.services.push(lightService);

        return this.services;
    }
};
