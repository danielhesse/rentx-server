"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarImages1624112257502 = void 0;

var _typeorm = require("typeorm");

class CreateCarImages1624112257502 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'car_images',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'car_id',
        type: 'uuid'
      }, {
        name: 'image_name',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'FKCarImage',
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        columnNames: ['car_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('car_images');
  }

}

exports.CreateCarImages1624112257502 = CreateCarImages1624112257502;