const mongoose = require('mongoose');

const visitCounterSchema = new mongoose.Schema({
  pageUrl: {
    type: String,
    required: true,
    unique: true // تأكيد أن كل عنوان URL يكون فريدًا
  },
  visits: {
    type: Number,
    default: 0 // القيمة الافتراضية لعداد الزيارات
  }
});

// تصدير الموديل المناسب ل schema
module.exports = mongoose.model('VisitCounter', visitCounterSchema);