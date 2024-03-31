const visitModel=require('../models/visitCounterSchema')
const incrementPageVisit = async (pageUrl) => {
    try {
        let visitCounter = await visitModel.findOne({ pageUrl });

        if (!visitCounter) {
            visitCounter = new visitModel({
                pageUrl,
                visits: 1
            });
        } else {
            // إذا تم العثور على العنصر، زد الزيارات بواحد
            visitCounter.visits++;
        }

        // حفظ التغييرات في قاعدة البيانات
        await visitCounter.save();

        // إرجاع عدد الزيارات بعد التحديث
        return visitCounter.visits;
    } catch (error) {
        // إذا حدث خطأ أثناء البحث أو الحفظ، فإرجاع -1 كرمز للخطأ
        console.error('Error incrementing page visit:', error);
        return -1;
    }
};

module.exports = {
    incrementPageVisit
};