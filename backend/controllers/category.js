const Category =require('../models/categorySchema ')
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.status(400).json({ success: false, message: 'اسم الفئة موجود بالفعل' });
        }

        const newCategory = new Category({
            name,
            description
        });

        await newCategory.save();

        res.status(201).json({ success: true, message: 'تم إنشاء الفئة بنجاح', category: newCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: 'حدث خطأ أثناء إنشاء الفئة', error: error.message });
    }
};

const getAllcaetgories = async (req, res) => {
    try {

        const category = await Category.find();

        if (!category.length) {
            return res.status(404).json({
                success: false,
                message : "no catigories exist"
            });
        }

        res.status(200).json({
            success: true,
            categories: category,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `خطأ في الخادم`,
            error: err.message,
        });
    }
};

module.exports = {
    createCategory,
    getAllcaetgories
};