const {z} = require("zod");

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string(),
    lastName: z.string()
});
module.exports = userSchema;