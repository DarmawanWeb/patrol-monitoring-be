import RefreshToken from './RefreshToken.js';
import User from './User.js';

User.hasMany(RefreshToken, { foreignKey: 'userId', as: 'refreshTokens' });
RefreshToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { User, RefreshToken };
