// Associations.js
import { Request } from "./Request.js";
import { User } from "./User.js";
import { Transition } from "./Transition.js";
// Define associations
User.hasMany(Request, { foreignKey: 'studentID', as: 'studentRequests' });
User.hasMany(Request, { foreignKey: 'professorID', as: 'professorRequests' });

Request.belongsTo(User, { foreignKey: 'studentID', as: 'student' });
Request.belongsTo(User, { foreignKey: 'professorID', as: 'professor' });
Request.hasMany(Transition);

export { User, Request, Transition };
