const excelType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
const wordType = "application/vnd.google-apps.document"

export const teacherFolders = [
    {
        mainFolder: "إثراء المنهاج",
    },
    {
        mainFolder: "الخطة الدرسية",
        subFolders:[
            {
                folder: "الخطة الدرسية الفصلية",
            },
            {
                folder:"الخطة الدرسية الأسبوعية", 
            }
        ],
    },
    {
        mainFolder: "أوراق العمل",
        subFolders:[
            {
                folder: "الفصل الثاني",
            },
            {
                folder: "الفصل الأول",
            },
            {
                folder: "النادي الصيفي"
            },
        ],
    },
    {
        mainFolder: "تحضير الدروس",
    },
    {
        mainFolder: "تحليل نتائج الاختبارات",
    },
    {
        mainFolder: "تنمية المهارات والمواهب",
    },
]
export const manger = [
    {
        mainFolder: "إذن إنصراف",
    },
    {
        mainFolder: "استجواب",
    },
    {
        mainFolder: "استئذان موظف",
    },
    {
        mainFolder: "إقالة موظف",
    },
    {
        mainFolder: "التقويم الدراسي وجدول الفعاليات",
    },
    {
        mainFolder: "انفكاك موظف",
    },
    {
        mainFolder: "تعهد ولي أمر",
    },
    {
        mainFolder: "تقرير الإنجازات التربوية والأنشطة المدرسية",
    },
    {
        mainFolder: "تنبيه للمعلم كتابي",
    },
    {
        mainFolder: "قرار فصل طالب",
    },
    {
        mainFolder: "مباشرة عمل",
    },
    {
        mainFolder: "مكافات خاصة",
    },
]

export const psychologist = [
    {
        mainFolder: "جلسات الإرشاد الفردي و الجماعي",
    },
    {
        mainFolder: "خطة تعديل سلوك",
    },
    {
        mainFolder: "سجل المواقف اليومية الطارئة",
    },
    {
        mainFolder: "سجل زيارة أولياء الأمور",
    },
]
 export const superViser = [
    {
        mainFolder: "أرشيف الاختبارات",
    },  
    {
        mainFolder: "تقويم أداء المعلم",
    },  
    {
        mainFolder: "تقييم أسئلة الامتحان",
    },  
    {
        mainFolder: "توزيع الأنصبة والصفوف",
    },  
    {
        mainFolder: "خلاصة متابعة دفاتر التحضير",
    },  
    {
        mainFolder: "متابعة ملفات المعلمـين",
    },  
    {
        mainFolder: "مجمل اجتماعات المعلم الأول",
    },  
    {
        mainFolder: "مخطّطات الشعب والكادر",
    },  
 ]

 export const secretary = [
    {
        mainFolder: "التقارير",
        subFolders:[
            {
                folder: "التقارير الشهرية للإداريّين",
            },
            {
                folder: "التقارير ربع السنويّة للمدرسة",
            },
        ],
    }, 
    {
        mainFolder: "محاضر الاجتماعات",
    }, 
 ]