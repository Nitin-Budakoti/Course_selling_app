const {z} = require('zod');
const admin_validation = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string(),
});
module.exports = admin_validation;