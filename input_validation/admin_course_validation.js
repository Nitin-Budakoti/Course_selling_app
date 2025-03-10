const {z} = require('zod');
const admin_course_validation = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number().positive(),
    imageUrl: z.string(),
});
module.exports = admin_course_validation;