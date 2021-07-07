"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SESMailProvider = void 0;

var _awsSdk = require("aws-sdk");

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SESMailProvider {
  constructor() {
    this.client = void 0;
    this.client = _nodemailer.default.createTransport({
      SES: new _awsSdk.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION
      })
    });
  }

  async sendMail({
    to,
    subject,
    variables,
    path
  }) {
    const templateFileContent = _fs.default.readFileSync(path).toString('utf-8');

    const templateParse = _handlebars.default.compile(templateFileContent);

    const templateHTML = templateParse(variables);
    await this.client.sendMail({
      to,
      from: 'Rentx <contato@sharbe.com.br>',
      subject,
      html: templateHTML
    });
  }

}

exports.SESMailProvider = SESMailProvider;