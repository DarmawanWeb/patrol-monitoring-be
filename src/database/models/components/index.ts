import Component from './Component.js';
import ComponentDetail from './ComponentDetail.js';
import ComponentMaintenanceLog from './ComponentMaintenanceLog.js';
import ComponentType from './ComponentType.js';

/* ComponentType 1 ── n Component */
Component.belongsTo(ComponentType, { foreignKey: 'typeId', as: 'type' });
ComponentType.hasMany(Component, { foreignKey: 'typeId', as: 'components' });

/* Component 1 ── n ComponentDetail */
Component.hasMany(ComponentDetail, {
  foreignKey: 'componentId',
  as: 'details',
});
ComponentDetail.belongsTo(Component, {
  foreignKey: 'componentId',
  as: 'component',
});

/* ComponentDetail 1 ── n ComponentMaintenanceLog */
ComponentDetail.hasMany(ComponentMaintenanceLog, {
  foreignKey: 'componentSerialNumber',
  sourceKey: 'serialNumber',
  as: 'maintenanceLogs',
});
ComponentMaintenanceLog.belongsTo(ComponentDetail, {
  foreignKey: 'componentSerialNumber',
  targetKey: 'serialNumber',
  as: 'componentDetail',
});

export { Component, ComponentType, ComponentDetail, ComponentMaintenanceLog };
