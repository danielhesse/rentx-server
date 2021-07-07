"use strict";

var _bcrypt = require("bcrypt");

var _uuid = require("uuid");

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create() {
  const connection = await (0, _typeorm.default)('localhost');
  const id = (0, _uuid.v4)();
  const password = await (0, _bcrypt.hash)('admin', 8);
  await connection.query(`INSERT INTO USERS(id, name, email, password, "is_admin", created_at, driver_license)
    values('${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'xxxxx')
    `);
  await connection.close();
}

create().then(() => console.log('User admin created!'));