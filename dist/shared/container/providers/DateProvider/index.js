"use strict";

var _tsyringe = require("tsyringe");

var _DayJsDateprovider = require("./implementations/DayJsDateprovider");

_tsyringe.container.registerSingleton('DateProvider', _DayJsDateprovider.DayJsDateprovider);