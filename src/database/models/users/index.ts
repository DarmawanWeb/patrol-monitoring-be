import OverheatDetection from '../patrol/OverheatDetection.js';
import RefreshToken from './RefreshToken.js';
import User from './User.js';

/* User 1 ── n RefreshToken */
User.hasMany(RefreshToken, { foreignKey: 'userId', as: 'refreshTokens' });
RefreshToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });

/* User 1 ── n OverheatDetection (as confirmer) */
User.hasMany(OverheatDetection, {
  foreignKey: 'confirmedBy',
  as: 'confirmedOverheatDetections',
});
OverheatDetection.belongsTo(User, {
  foreignKey: 'confirmedBy',
  as: 'confirmingUser',
});

export { User, RefreshToken };
