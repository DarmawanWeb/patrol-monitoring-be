import Component from './Component.js';
import ComponentDetail from './ComponentDetail.js';
import ComponentMaintenanceLog from './ComponentMaintenanceLog.js';
import ComponentType from './ComponentType.js';

Component.belongsTo(ComponentType, {
  foreignKey: 'typeId',
  as: 'type',
});
ComponentType.hasMany(Component, {
  foreignKey: 'typeId',
  as: 'components',
});

ComponentDetail.belongsTo(Component, {
  foreignKey: 'componentsId',
  as: 'component',
});
Component.hasMany(ComponentDetail, {
  foreignKey: 'componentsId',
  as: 'details',
});

ComponentMaintenanceLog.belongsTo(ComponentDetail, {
  foreignKey: 'componentSerialNumber',
  targetKey: 'serialNumber',
  as: 'componentDetail',
});
ComponentDetail.hasMany(ComponentMaintenanceLog, {
  foreignKey: 'componentSerialNumber',
  sourceKey: 'serialNumber',
  as: 'maintenanceLogs',
});

export { Component, ComponentType, ComponentDetail, ComponentMaintenanceLog };
