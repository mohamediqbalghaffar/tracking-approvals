import { DashboardData, SentLetterData, IncomingLetterData } from "../utils/parser";

export const mockReceivedData: DashboardData[] = [
  {
    "id": 1,
    "subject": "داواکاری دابینکردنی پێداویستی تەکنیکی بۆ ئۆفیسی سەرەکی - ژمارە (101)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی وردبینی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی وردبینی",
    "dept3": null,
    "refCode": "1a",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-01-16",
    "responseDate": null,
    "processingTime": 620,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 2,
    "subject": "ڕەزامەندی لەسەر خەرجکردنی بوودجەی ڕاهێنانی کارمەندان - ژمارە (102)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی پەیوەندییەکان",
      "بەشی دارایی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی پەیوەندییەکان",
    "dept3": "بەشی دارایی",
    "refCode": "2",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-02-04",
    "responseDate": "2025-02-26",
    "processingTime": 22,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 3,
    "subject": "داواکاری پەسەندکردنی پشووی ساڵانەی ستافی پشتیوانی - ژمارە (103)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی لۆجستی",
    "dept3": null,
    "refCode": "3",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-02-06",
    "responseDate": "2025-03-06",
    "processingTime": 28,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 4,
    "subject": "فەرمانی کارگێڕی تایبەت بە کاندیدکردنی بەڕێوەبەری پڕۆژە - ژمارە (104)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی",
      "بەشی وردبینی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": "بەشی وردبینی",
    "dept3": null,
    "refCode": "4",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-02-09",
    "responseDate": null,
    "processingTime": 596,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 5,
    "subject": "داواکاری کڕینی ئامێرەکانی پەیوەندی و سێرڤەر - ژمارە (105)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": null,
    "dept3": null,
    "refCode": "5",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-02-11",
    "responseDate": "2025-03-05",
    "processingTime": 22,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 6,
    "subject": "پەسەندکردنی گرێبەستی خزمەتگوزاری ئینتەرنێت - ژمارە (106)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": null,
    "dept3": null,
    "refCode": "6",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-02-11",
    "responseDate": "2025-03-11",
    "processingTime": 28,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 7,
    "subject": "داواکاری پێداچوونەوە بە میلاکی بەشی یاسایی - ژمارە (107)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "dept3": null,
    "refCode": "7",
    "letterType": "پێشنیار",
    "sentDate": "2025-02-23",
    "responseDate": null,
    "processingTime": 582,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 8,
    "subject": "نووسراوی سوپاس و پێزانین بۆ تیمەکانی ئۆپەراسیۆن - ژمارە (108)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی تەکنیکی",
      "بەشی یاسایی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی تەکنیکی",
    "dept3": "بەشی یاسایی",
    "refCode": "8",
    "letterType": "ئاگاداری",
    "sentDate": "2025-02-25",
    "responseDate": "2025-03-25",
    "processingTime": 28,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 9,
    "subject": "داواکاری نوێکردنەوەی مۆڵەتی نەرمەکاڵاکان بۆ ساڵی ٢٠٢٦ - ژمارە (109)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی دارایی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "dept3": "بەشی دارایی",
    "refCode": "9",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-02-27",
    "responseDate": "2025-03-06",
    "processingTime": 7,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 10,
    "subject": "ڕاپۆرتی مانگانەی دەوامی کارمەندانی باڵەخانەی سەرەکی - ژمارە (110)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی وردبینی"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی وردبینی",
    "dept3": null,
    "refCode": "10",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-03-08",
    "responseDate": null,
    "processingTime": 569,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 11,
    "subject": "پێشنیاری کەمکردنەوەی خەرجییە ناپێویستەکانی کارگێڕی - ژمارە (111)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی پەیوەندییەکان",
    "dept3": null,
    "refCode": "GEN-2026",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-03-16",
    "responseDate": "2025-03-21",
    "processingTime": 5,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 12,
    "subject": "داواکاری زیادکردنی ڕاژەی فەرمانبەرانی گرێبەست - ژمارە (112)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": null,
    "dept3": null,
    "refCode": "ADM-104",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-03-18",
    "responseDate": "2025-03-21",
    "processingTime": 3,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 13,
    "subject": "ئاگاداری سەبارەت بە کۆبوونەوەی دەستەی کارگێڕی - ژمارە (113)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": null,
    "dept3": null,
    "refCode": "FIN-201",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-03-22",
    "responseDate": null,
    "processingTime": 555,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 14,
    "subject": "داواکاری نۆژەنکردنەوەی هۆڵی کۆنفرانسەکان - ژمارە (114)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "dept3": null,
    "refCode": "TECH-505",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-03-24",
    "responseDate": "2025-04-15",
    "processingTime": 22,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 15,
    "subject": "ڕەوانەکردنی لیستی شایستە داراییەکانی مانگی ڕابردوو - ژمارە (115)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": null,
    "dept3": null,
    "refCode": "HR-77",
    "letterType": "پێشنیار",
    "sentDate": "2025-03-31",
    "responseDate": "2025-04-07",
    "processingTime": 7,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 16,
    "subject": "داواکاری دابینکردنی پاسەوانی بۆ باڵەخانەی نوێ - ژمارە (116)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی یاسایی",
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی یاسایی",
    "dept3": "بەشی سەرچاوە مرۆییەکان",
    "refCode": "1a",
    "letterType": "ئاگاداری",
    "sentDate": "2025-04-01",
    "responseDate": null,
    "processingTime": 545,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 17,
    "subject": "پێداچوونەوە بە ڕێنماییەکانی سەلامەتی و تەندروستی کار - ژمارە (117)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "dept3": null,
    "refCode": "2",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-04-09",
    "responseDate": "2025-04-27",
    "processingTime": 18,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 18,
    "subject": "داواکاری کاندیدکردنی دوو ئەندازیار بۆ خولی دەرەوە - ژمارە (118)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "dept3": "بەشی لۆجستی",
    "refCode": "3",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-04-13",
    "responseDate": "2025-04-22",
    "processingTime": 9,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 19,
    "subject": "ڕاپۆرتی سەردانی مەیدانی بۆ لقی دهۆک و هەولێر - ژمارە (119)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "dept3": null,
    "refCode": "4",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-04-14",
    "responseDate": null,
    "processingTime": 532,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 20,
    "subject": "داواکاری کڕینی مۆلیدەی کارەبایی یەدەگ بۆ وێستگەکە - ژمارە (120)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "dept3": null,
    "refCode": "5",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-04-15",
    "responseDate": "2025-04-20",
    "processingTime": 5,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 21,
    "subject": "ڕەزامەندی لەسەر نوێکردنەوەی بیمەی تەندروستی - ژمارە (121)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی کارگێڕی",
    "dept3": null,
    "refCode": "6",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-04-19",
    "responseDate": "2025-04-24",
    "processingTime": 5,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 22,
    "subject": "فەرمانی دەستبەکاربوونی ستافی نوێی تاقیگە - ژمارە (122)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "dept3": "بەشی تەکنەلۆژیای زانیاری",
    "refCode": "7",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-04-23",
    "responseDate": null,
    "processingTime": 523,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 23,
    "subject": "داواکاری پێدانی قەرزی کارمەندان بەپێی ڕێنمایی نوێ - ژمارە (123)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی دارایی",
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی دارایی",
    "dept3": "بەشی سەرچاوە مرۆییەکان",
    "refCode": "8",
    "letterType": "پێشنیار",
    "sentDate": "2025-04-24",
    "responseDate": "2025-04-29",
    "processingTime": 5,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 24,
    "subject": "ڕاپۆرتی وردبینی دارایی بۆ وەرزی دووەمی ساڵ - ژمارە (124)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": "بەشی کارگێڕی",
    "dept3": null,
    "refCode": "9",
    "letterType": "ئاگاداری",
    "sentDate": "2025-04-24",
    "responseDate": "2025-04-27",
    "processingTime": 3,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 25,
    "subject": "داواکاری هەموارکردنەوەی ناونیشانی وەزیفی چەند فەرمانبەرێک - ژمارە (125)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": null,
    "dept3": null,
    "refCode": "10",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-05-02",
    "responseDate": null,
    "processingTime": 514,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 26,
    "subject": "ئامادەکاری بۆ بەستنی وۆرکشۆپی بەڕێوەبردنی داتا - ژمارە (126)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": null,
    "dept3": null,
    "refCode": "GEN-2026",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-05-04",
    "responseDate": "2025-05-26",
    "processingTime": 22,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 27,
    "subject": "داواکاری دابینکردنی کەلوپەلی ئۆفیس و چاپەمەنی - ژمارە (127)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "سەرپەرشتیاری گشتی",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "سەرپەرشتیاری گشتی",
    "dept3": "بەشی تەکنیکی",
    "refCode": "ADM-104",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-05-17",
    "responseDate": "2025-05-24",
    "processingTime": 7,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 28,
    "subject": "نووسراوی هاوبەش لەگەڵ هۆبەی پەیوەندییە گشتییەکان - ژمارە (128)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی تەکنیکی",
    "dept3": null,
    "refCode": "FIN-201",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-05-31",
    "responseDate": null,
    "processingTime": 485,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 29,
    "subject": "داواکاری درێژکردنەوەی گرێبەستی کۆمپانیای خاوێنکەرەوە - ژمارە (129)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی لۆجستی",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی لۆجستی",
    "dept3": "بەشی پەیوەندییەکان",
    "refCode": "TECH-505",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-06-01",
    "responseDate": "2025-06-06",
    "processingTime": 5,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 30,
    "subject": "ڕاپۆرتی هەڵسەنگاندنی ئەدای کارکردنی شەش مانگی ڕابردوو - ژمارە (130)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی دارایی"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی دارایی",
    "dept3": null,
    "refCode": "HR-77",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-06-01",
    "responseDate": "2025-06-19",
    "processingTime": 18,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 31,
    "subject": "داواکاری دابینکردنی پێداویستی تەکنیکی بۆ ئۆفیسی سەرەکی - ژمارە (131)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": null,
    "dept3": null,
    "refCode": "1a",
    "letterType": "پێشنیار",
    "sentDate": "2025-06-05",
    "responseDate": null,
    "processingTime": 480,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 32,
    "subject": "ڕەزامەندی لەسەر خەرجکردنی بوودجەی ڕاهێنانی کارمەندان - ژمارە (132)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": null,
    "dept3": null,
    "refCode": "2",
    "letterType": "ئاگاداری",
    "sentDate": "2025-06-15",
    "responseDate": "2025-06-29",
    "processingTime": 14,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 33,
    "subject": "داواکاری پەسەندکردنی پشووی ساڵانەی ستافی پشتیوانی - ژمارە (133)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": null,
    "dept3": null,
    "refCode": "3",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-06-18",
    "responseDate": "2025-06-27",
    "processingTime": 9,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 34,
    "subject": "فەرمانی کارگێڕی تایبەت بە کاندیدکردنی بەڕێوەبەری پڕۆژە - ژمارە (134)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی",
      "بەشی یاسایی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": "بەشی یاسایی",
    "dept3": null,
    "refCode": "4",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-06-22",
    "responseDate": null,
    "processingTime": 463,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 35,
    "subject": "داواکاری کڕینی ئامێرەکانی پەیوەندی و سێرڤەر - ژمارە (135)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "سەرپەرشتیاری گشتی",
    "dept3": null,
    "refCode": "5",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-06-22",
    "responseDate": "2025-06-29",
    "processingTime": 7,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 36,
    "subject": "پەسەندکردنی گرێبەستی خزمەتگوزاری ئینتەرنێت - ژمارە (136)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "dept3": null,
    "refCode": "6",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-06-25",
    "responseDate": "2025-06-30",
    "processingTime": 5,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 37,
    "subject": "داواکاری پێداچوونەوە بە میلاکی بەشی یاسایی - ژمارە (137)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "dept3": null,
    "refCode": "7",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-06-26",
    "responseDate": null,
    "processingTime": 459,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 38,
    "subject": "نووسراوی سوپاس و پێزانین بۆ تیمەکانی ئۆپەراسیۆن - ژمارە (138)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": null,
    "dept3": null,
    "refCode": "8",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-07-04",
    "responseDate": "2025-07-07",
    "processingTime": 3,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 39,
    "subject": "داواکاری نوێکردنەوەی مۆڵەتی نەرمەکاڵاکان بۆ ساڵی ٢٠٢٦ - ژمارە (139)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی وردبینی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی وردبینی",
    "dept3": null,
    "refCode": "9",
    "letterType": "پێشنیار",
    "sentDate": "2025-07-25",
    "responseDate": "2025-08-01",
    "processingTime": 7,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 40,
    "subject": "ڕاپۆرتی مانگانەی دەوامی کارمەندانی باڵەخانەی سەرەکی - ژمارە (140)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "dept3": null,
    "refCode": "10",
    "letterType": "ئاگاداری",
    "sentDate": "2025-08-01",
    "responseDate": null,
    "processingTime": 423,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 41,
    "subject": "پێشنیاری کەمکردنەوەی خەرجییە ناپێویستەکانی کارگێڕی - ژمارە (141)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": null,
    "dept3": null,
    "refCode": "GEN-2026",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-08-12",
    "responseDate": "2025-08-15",
    "processingTime": 3,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 42,
    "subject": "داواکاری زیادکردنی ڕاژەی فەرمانبەرانی گرێبەست - ژمارە (142)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی پەیوەندییەکان",
    "dept3": null,
    "refCode": "ADM-104",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-08-14",
    "responseDate": "2025-08-17",
    "processingTime": 3,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 43,
    "subject": "ئاگاداری سەبارەت بە کۆبوونەوەی دەستەی کارگێڕی - ژمارە (143)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی وردبینی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی وردبینی",
    "dept3": null,
    "refCode": "FIN-201",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-08-15",
    "responseDate": null,
    "processingTime": 409,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 44,
    "subject": "داواکاری نۆژەنکردنەوەی هۆڵی کۆنفرانسەکان - ژمارە (144)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "dept3": null,
    "refCode": "TECH-505",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-08-18",
    "responseDate": "2025-09-09",
    "processingTime": 22,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 45,
    "subject": "ڕەوانەکردنی لیستی شایستە داراییەکانی مانگی ڕابردوو - ژمارە (145)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": null,
    "dept3": null,
    "refCode": "HR-77",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-08-21",
    "responseDate": "2025-09-02",
    "processingTime": 12,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 46,
    "subject": "داواکاری دابینکردنی پاسەوانی بۆ باڵەخانەی نوێ - ژمارە (146)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی دارایی"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "dept3": "بەشی دارایی",
    "refCode": "1a",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-08-22",
    "responseDate": null,
    "processingTime": 402,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 47,
    "subject": "پێداچوونەوە بە ڕێنماییەکانی سەلامەتی و تەندروستی کار - ژمارە (147)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "dept3": null,
    "refCode": "2",
    "letterType": "پێشنیار",
    "sentDate": "2025-08-22",
    "responseDate": "2025-08-25",
    "processingTime": 3,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 48,
    "subject": "داواکاری کاندیدکردنی دوو ئەندازیار بۆ خولی دەرەوە - ژمارە (148)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی یاسایی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "dept3": "بەشی یاسایی",
    "refCode": "3",
    "letterType": "ئاگاداری",
    "sentDate": "2025-08-23",
    "responseDate": "2025-09-14",
    "processingTime": 22,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 49,
    "subject": "ڕاپۆرتی سەردانی مەیدانی بۆ لقی دهۆک و هەولێر - ژمارە (149)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی کارگێڕی",
      "بەشی یاسایی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی کارگێڕی",
    "dept3": "بەشی یاسایی",
    "refCode": "4",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-08-26",
    "responseDate": null,
    "processingTime": 398,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 50,
    "subject": "داواکاری کڕینی مۆلیدەی کارەبایی یەدەگ بۆ وێستگەکە - ژمارە (150)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی تەکنیکی",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی تەکنیکی",
    "dept3": "بەشی لۆجستی",
    "refCode": "5",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-08-31",
    "responseDate": "2025-09-05",
    "processingTime": 5,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 51,
    "subject": "ڕەزامەندی لەسەر نوێکردنەوەی بیمەی تەندروستی - ژمارە (151)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی کارگێڕی",
      "بەشی یاسایی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی کارگێڕی",
    "dept3": "بەشی یاسایی",
    "refCode": "6",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-09-01",
    "responseDate": "2025-09-10",
    "processingTime": 9,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 52,
    "subject": "فەرمانی دەستبەکاربوونی ستافی نوێی تاقیگە - ژمارە (152)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "dept3": "بەشی لۆجستی",
    "refCode": "7",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-09-05",
    "responseDate": null,
    "processingTime": 388,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 53,
    "subject": "داواکاری پێدانی قەرزی کارمەندان بەپێی ڕێنمایی نوێ - ژمارە (153)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی لۆجستی",
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی لۆجستی",
    "dept3": "بەشی سەرچاوە مرۆییەکان",
    "refCode": "8",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-09-05",
    "responseDate": "2025-09-14",
    "processingTime": 9,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 54,
    "subject": "ڕاپۆرتی وردبینی دارایی بۆ وەرزی دووەمی ساڵ - ژمارە (154)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "dept3": null,
    "refCode": "9",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-09-17",
    "responseDate": "2025-10-05",
    "processingTime": 18,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 55,
    "subject": "داواکاری هەموارکردنەوەی ناونیشانی وەزیفی چەند فەرمانبەرێک - ژمارە (155)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "بەشی لۆجستی",
    "dept3": null,
    "refCode": "10",
    "letterType": "پێشنیار",
    "sentDate": "2025-09-17",
    "responseDate": null,
    "processingTime": 376,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 56,
    "subject": "ئامادەکاری بۆ بەستنی وۆرکشۆپی بەڕێوەبردنی داتا - ژمارە (156)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی کارگێڕی",
    "dept3": null,
    "refCode": "GEN-2026",
    "letterType": "ئاگاداری",
    "sentDate": "2025-09-19",
    "responseDate": "2025-09-22",
    "processingTime": 3,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 57,
    "subject": "داواکاری دابینکردنی کەلوپەلی ئۆفیس و چاپەمەنی - ژمارە (157)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "dept3": null,
    "refCode": "ADM-104",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-10-06",
    "responseDate": "2025-11-03",
    "processingTime": 28,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 58,
    "subject": "نووسراوی هاوبەش لەگەڵ هۆبەی پەیوەندییە گشتییەکان - ژمارە (158)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی یاسایی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی یاسایی",
    "dept3": null,
    "refCode": "FIN-201",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-10-07",
    "responseDate": null,
    "processingTime": 356,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 59,
    "subject": "داواکاری درێژکردنەوەی گرێبەستی کۆمپانیای خاوێنکەرەوە - ژمارە (159)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": null,
    "dept3": null,
    "refCode": "TECH-505",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-10-08",
    "responseDate": "2025-10-13",
    "processingTime": 5,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 60,
    "subject": "ڕاپۆرتی هەڵسەنگاندنی ئەدای کارکردنی شەش مانگی ڕابردوو - ژمارە (160)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "dept3": null,
    "refCode": "HR-77",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-10-10",
    "responseDate": "2025-10-22",
    "processingTime": 12,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 61,
    "subject": "داواکاری دابینکردنی پێداویستی تەکنیکی بۆ ئۆفیسی سەرەکی - ژمارە (161)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی پەیوەندییەکان",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی پەیوەندییەکان",
    "dept3": "بەشی کارگێڕی",
    "refCode": "1a",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-10-11",
    "responseDate": null,
    "processingTime": 352,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 62,
    "subject": "ڕەزامەندی لەسەر خەرجکردنی بوودجەی ڕاهێنانی کارمەندان - ژمارە (162)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی یاسایی",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی یاسایی",
    "dept3": "بەشی تەکنیکی",
    "refCode": "2",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-10-13",
    "responseDate": "2025-10-25",
    "processingTime": 12,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 63,
    "subject": "داواکاری پەسەندکردنی پشووی ساڵانەی ستافی پشتیوانی - ژمارە (163)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": null,
    "dept3": null,
    "refCode": "3",
    "letterType": "پێشنیار",
    "sentDate": "2025-10-18",
    "responseDate": "2025-10-23",
    "processingTime": 5,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 64,
    "subject": "فەرمانی کارگێڕی تایبەت بە کاندیدکردنی بەڕێوەبەری پڕۆژە - ژمارە (164)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "dept3": null,
    "refCode": "4",
    "letterType": "ئاگاداری",
    "sentDate": "2025-10-21",
    "responseDate": null,
    "processingTime": 342,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 65,
    "subject": "داواکاری کڕینی ئامێرەکانی پەیوەندی و سێرڤەر - ژمارە (165)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی تەکنیکی",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "بەشی تەکنیکی",
    "dept3": "بەشی لۆجستی",
    "refCode": "5",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-10-21",
    "responseDate": "2025-11-02",
    "processingTime": 12,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 66,
    "subject": "پەسەندکردنی گرێبەستی خزمەتگوزاری ئینتەرنێت - ژمارە (166)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "سەرپەرشتیاری گشتی",
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "سەرپەرشتیاری گشتی",
    "dept3": "بەشی سەرچاوە مرۆییەکان",
    "refCode": "6",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-10-21",
    "responseDate": "2025-11-02",
    "processingTime": 12,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 67,
    "subject": "داواکاری پێداچوونەوە بە میلاکی بەشی یاسایی - ژمارە (167)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "dept3": null,
    "refCode": "7",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-11-02",
    "responseDate": null,
    "processingTime": 330,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 68,
    "subject": "نووسراوی سوپاس و پێزانین بۆ تیمەکانی ئۆپەراسیۆن - ژمارە (168)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": null,
    "dept3": null,
    "refCode": "8",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-11-06",
    "responseDate": "2025-11-18",
    "processingTime": 12,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 69,
    "subject": "داواکاری نوێکردنەوەی مۆڵەتی نەرمەکاڵاکان بۆ ساڵی ٢٠٢٦ - ژمارە (169)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": null,
    "dept3": null,
    "refCode": "9",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-11-28",
    "responseDate": "2025-12-12",
    "processingTime": 14,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 70,
    "subject": "ڕاپۆرتی مانگانەی دەوامی کارمەندانی باڵەخانەی سەرەکی - ژمارە (170)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "dept3": null,
    "refCode": "10",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-11-29",
    "responseDate": null,
    "processingTime": 303,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 71,
    "subject": "پێشنیاری کەمکردنەوەی خەرجییە ناپێویستەکانی کارگێڕی - ژمارە (171)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی وردبینی",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی وردبینی",
    "dept3": "بەشی کارگێڕی",
    "refCode": "GEN-2026",
    "letterType": "پێشنیار",
    "sentDate": "2025-12-08",
    "responseDate": "2026-01-05",
    "processingTime": 28,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 72,
    "subject": "داواکاری زیادکردنی ڕاژەی فەرمانبەرانی گرێبەست - ژمارە (172)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی تەکنیکی",
      "بەشی دارایی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی تەکنیکی",
    "dept3": "بەشی دارایی",
    "refCode": "ADM-104",
    "letterType": "ئاگاداری",
    "sentDate": "2025-12-20",
    "responseDate": "2025-12-25",
    "processingTime": 5,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 73,
    "subject": "ئاگاداری سەبارەت بە کۆبوونەوەی دەستەی کارگێڕی - ژمارە (173)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "dept3": "بەشی تەکنیکی",
    "refCode": "FIN-201",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-12-24",
    "responseDate": null,
    "processingTime": 278,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 74,
    "subject": "داواکاری نۆژەنکردنەوەی هۆڵی کۆنفرانسەکان - ژمارە (174)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "dept3": null,
    "refCode": "TECH-505",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-12-28",
    "responseDate": "2026-01-04",
    "processingTime": 7,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 75,
    "subject": "ڕەوانەکردنی لیستی شایستە داراییەکانی مانگی ڕابردوو - ژمارە (175)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": null,
    "dept3": null,
    "refCode": "HR-77",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-01-08",
    "responseDate": "2026-01-22",
    "processingTime": 14,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 76,
    "subject": "داواکاری دابینکردنی پاسەوانی بۆ باڵەخانەی نوێ - ژمارە (176)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": null,
    "dept3": null,
    "refCode": "1a",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-01-12",
    "responseDate": null,
    "processingTime": 259,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 77,
    "subject": "پێداچوونەوە بە ڕێنماییەکانی سەلامەتی و تەندروستی کار - ژمارە (177)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "dept3": null,
    "refCode": "2",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-01-15",
    "responseDate": "2026-01-20",
    "processingTime": 5,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 78,
    "subject": "داواکاری کاندیدکردنی دوو ئەندازیار بۆ خولی دەرەوە - ژمارە (178)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": null,
    "dept3": null,
    "refCode": "3",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-01-15",
    "responseDate": "2026-01-22",
    "processingTime": 7,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 79,
    "subject": "ڕاپۆرتی سەردانی مەیدانی بۆ لقی دهۆک و هەولێر - ژمارە (179)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": null,
    "dept3": null,
    "refCode": "4",
    "letterType": "پێشنیار",
    "sentDate": "2026-01-18",
    "responseDate": null,
    "processingTime": 253,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 80,
    "subject": "داواکاری کڕینی مۆلیدەی کارەبایی یەدەگ بۆ وێستگەکە - ژمارە (180)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "dept3": null,
    "refCode": "5",
    "letterType": "ئاگاداری",
    "sentDate": "2026-01-24",
    "responseDate": "2026-01-27",
    "processingTime": 3,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 81,
    "subject": "ڕەزامەندی لەسەر نوێکردنەوەی بیمەی تەندروستی - ژمارە (181)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "dept3": "بەشی پەیوەندییەکان",
    "refCode": "6",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-02-01",
    "responseDate": "2026-02-19",
    "processingTime": 18,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 82,
    "subject": "فەرمانی دەستبەکاربوونی ستافی نوێی تاقیگە - ژمارە (182)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی یاسایی",
      "بەشی وردبینی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی یاسایی",
    "dept3": "بەشی وردبینی",
    "refCode": "7",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-02-02",
    "responseDate": null,
    "processingTime": 238,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 83,
    "subject": "داواکاری پێدانی قەرزی کارمەندان بەپێی ڕێنمایی نوێ - ژمارە (183)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": null,
    "dept3": null,
    "refCode": "8",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-02-03",
    "responseDate": "2026-02-25",
    "processingTime": 22,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 84,
    "subject": "ڕاپۆرتی وردبینی دارایی بۆ وەرزی دووەمی ساڵ - ژمارە (184)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": "بەشی پەیوەندییەکان",
    "dept3": null,
    "refCode": "9",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-02-03",
    "responseDate": "2026-02-25",
    "processingTime": 22,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 85,
    "subject": "داواکاری هەموارکردنەوەی ناونیشانی وەزیفی چەند فەرمانبەرێک - ژمارە (185)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": null,
    "dept3": null,
    "refCode": "10",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-02-19",
    "responseDate": null,
    "processingTime": 221,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 86,
    "subject": "ئامادەکاری بۆ بەستنی وۆرکشۆپی بەڕێوەبردنی داتا - ژمارە (186)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی لۆجستی",
    "dept3": null,
    "refCode": "GEN-2026",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-02-22",
    "responseDate": "2026-03-03",
    "processingTime": 9,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 87,
    "subject": "داواکاری دابینکردنی کەلوپەلی ئۆفیس و چاپەمەنی - ژمارە (187)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "بەشی پەیوەندییەکان",
    "dept3": null,
    "refCode": "ADM-104",
    "letterType": "پێشنیار",
    "sentDate": "2026-02-24",
    "responseDate": "2026-03-01",
    "processingTime": 5,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 88,
    "subject": "نووسراوی هاوبەش لەگەڵ هۆبەی پەیوەندییە گشتییەکان - ژمارە (188)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "dept3": null,
    "refCode": "FIN-201",
    "letterType": "ئاگاداری",
    "sentDate": "2026-03-15",
    "responseDate": null,
    "processingTime": 197,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 89,
    "subject": "داواکاری درێژکردنەوەی گرێبەستی کۆمپانیای خاوێنکەرەوە - ژمارە (189)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": null,
    "dept3": null,
    "refCode": "TECH-505",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-03-18",
    "responseDate": "2026-03-21",
    "processingTime": 3,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 90,
    "subject": "ڕاپۆرتی هەڵسەنگاندنی ئەدای کارکردنی شەش مانگی ڕابردوو - ژمارە (190)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی دارایی"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "dept3": "بەشی دارایی",
    "refCode": "HR-77",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-03-18",
    "responseDate": "2026-03-25",
    "processingTime": 7,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 91,
    "subject": "داواکاری دابینکردنی پێداویستی تەکنیکی بۆ ئۆفیسی سەرەکی - ژمارە (191)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی وردبینی",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی وردبینی",
    "dept3": "بەشی لۆجستی",
    "refCode": "1a",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-03-18",
    "responseDate": null,
    "processingTime": 194,
    "slaTime": "12 ڕۆژ"
  },
  {
    "id": 92,
    "subject": "ڕەزامەندی لەسەر خەرجکردنی بوودجەی ڕاهێنانی کارمەندان - ژمارە (192)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی یاسایی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "dept3": "بەشی یاسایی",
    "refCode": "2",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-03-24",
    "responseDate": "2026-04-11",
    "processingTime": 18,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 93,
    "subject": "داواکاری پەسەندکردنی پشووی ساڵانەی ستافی پشتیوانی - ژمارە (193)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی دارایی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی دارایی",
    "dept3": null,
    "refCode": "3",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-04-14",
    "responseDate": "2026-04-23",
    "processingTime": 9,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 94,
    "subject": "فەرمانی کارگێڕی تایبەت بە کاندیدکردنی بەڕێوەبەری پڕۆژە - ژمارە (194)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "dept3": null,
    "refCode": "4",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-04-19",
    "responseDate": null,
    "processingTime": 162,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 95,
    "subject": "داواکاری کڕینی ئامێرەکانی پەیوەندی و سێرڤەر - ژمارە (195)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی تەکنیکی",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "بەشی تەکنیکی",
    "dept3": "بەشی لۆجستی",
    "refCode": "5",
    "letterType": "پێشنیار",
    "sentDate": "2026-04-24",
    "responseDate": "2026-05-22",
    "processingTime": 28,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 96,
    "subject": "پەسەندکردنی گرێبەستی خزمەتگوزاری ئینتەرنێت - ژمارە (196)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی لۆجستی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی لۆجستی",
    "dept3": "بەشی تەکنەلۆژیای زانیاری",
    "refCode": "6",
    "letterType": "ئاگاداری",
    "sentDate": "2026-04-25",
    "responseDate": "2026-04-30",
    "processingTime": 5,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 97,
    "subject": "داواکاری پێداچوونەوە بە میلاکی بەشی یاسایی - ژمارە (197)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "dept3": "بەشی تەکنەلۆژیای زانیاری",
    "refCode": "7",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-04-28",
    "responseDate": null,
    "processingTime": 153,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 98,
    "subject": "نووسراوی سوپاس و پێزانین بۆ تیمەکانی ئۆپەراسیۆن - ژمارە (198)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "dept3": null,
    "refCode": "8",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-05-30",
    "responseDate": "2026-06-13",
    "processingTime": 14,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 99,
    "subject": "داواکاری نوێکردنەوەی مۆڵەتی نەرمەکاڵاکان بۆ ساڵی ٢٠٢٦ - ژمارە (199)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": null,
    "dept3": null,
    "refCode": "9",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-06-05",
    "responseDate": "2026-06-12",
    "processingTime": 7,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 100,
    "subject": "ڕاپۆرتی مانگانەی دەوامی کارمەندانی باڵەخانەی سەرەکی - ژمارە (200)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی لۆجستی",
      "بەشی یاسایی"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی لۆجستی",
    "dept3": "بەشی یاسایی",
    "refCode": "10",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-06-11",
    "responseDate": null,
    "processingTime": 109,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 101,
    "subject": "پێشنیاری کەمکردنەوەی خەرجییە ناپێویستەکانی کارگێڕی - ژمارە (201)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "dept3": null,
    "refCode": "GEN-2026",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-06-15",
    "responseDate": "2026-06-27",
    "processingTime": 12,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 102,
    "subject": "داواکاری زیادکردنی ڕاژەی فەرمانبەرانی گرێبەست - ژمارە (202)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "dept3": null,
    "refCode": "ADM-104",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-07-10",
    "responseDate": "2026-07-22",
    "processingTime": 12,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 103,
    "subject": "ئاگاداری سەبارەت بە کۆبوونەوەی دەستەی کارگێڕی - ژمارە (203)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی لۆجستی",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی لۆجستی",
    "dept3": "سەرپەرشتیاری گشتی",
    "refCode": "FIN-201",
    "letterType": "پێشنیار",
    "sentDate": "2026-07-13",
    "responseDate": null,
    "processingTime": 77,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 104,
    "subject": "داواکاری نۆژەنکردنەوەی هۆڵی کۆنفرانسەکان - ژمارە (204)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی",
      "بەشی سەرچاوە مرۆییەکان",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "dept3": "سەرپەرشتیاری گشتی",
    "refCode": "TECH-505",
    "letterType": "ئاگاداری",
    "sentDate": "2026-07-15",
    "responseDate": "2026-08-06",
    "processingTime": 22,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 105,
    "subject": "ڕەوانەکردنی لیستی شایستە داراییەکانی مانگی ڕابردوو - ژمارە (205)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "dept3": null,
    "refCode": "HR-77",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-07-22",
    "responseDate": "2026-07-27",
    "processingTime": 5,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 106,
    "subject": "داواکاری دابینکردنی پاسەوانی بۆ باڵەخانەی نوێ - ژمارە (206)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی کارگێڕی",
    "dept3": null,
    "refCode": "1a",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-07-22",
    "responseDate": null,
    "processingTime": 68,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 107,
    "subject": "پێداچوونەوە بە ڕێنماییەکانی سەلامەتی و تەندروستی کار - ژمارە (207)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "dept3": null,
    "refCode": "2",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-07-29",
    "responseDate": "2026-08-10",
    "processingTime": 12,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 108,
    "subject": "داواکاری کاندیدکردنی دوو ئەندازیار بۆ خولی دەرەوە - ژمارە (208)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": null,
    "dept3": null,
    "refCode": "3",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-08-03",
    "responseDate": "2026-08-10",
    "processingTime": 7,
    "slaTime": "7 ڕۆژ"
  },
  {
    "id": 109,
    "subject": "ڕاپۆرتی سەردانی مەیدانی بۆ لقی دهۆک و هەولێر - ژمارە (209)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": null,
    "dept3": null,
    "refCode": "4",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-08-07",
    "responseDate": null,
    "processingTime": 52,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 110,
    "subject": "داواکاری کڕینی مۆلیدەی کارەبایی یەدەگ بۆ وێستگەکە - ژمارە (210)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی لۆجستی",
    "dept3": null,
    "refCode": "5",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-08-07",
    "responseDate": "2026-08-12",
    "processingTime": 5,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 111,
    "subject": "ڕەزامەندی لەسەر نوێکردنەوەی بیمەی تەندروستی - ژمارە (211)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی وردبینی",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی وردبینی",
    "dept3": "سەرپەرشتیاری گشتی",
    "refCode": "6",
    "letterType": "پێشنیار",
    "sentDate": "2026-08-13",
    "responseDate": "2026-08-22",
    "processingTime": 9,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 112,
    "subject": "فەرمانی دەستبەکاربوونی ستافی نوێی تاقیگە - ژمارە (212)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": null,
    "dept3": null,
    "refCode": "7",
    "letterType": "ئاگاداری",
    "sentDate": "2026-08-24",
    "responseDate": null,
    "processingTime": 35,
    "slaTime": "10 ڕۆژ"
  },
  {
    "id": 113,
    "subject": "داواکاری پێدانی قەرزی کارمەندان بەپێی ڕێنمایی نوێ - ژمارە (213)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": null,
    "dept3": null,
    "refCode": "8",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-08-30",
    "responseDate": "2026-09-02",
    "processingTime": 3,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 114,
    "subject": "ڕاپۆرتی وردبینی دارایی بۆ وەرزی دووەمی ساڵ - ژمارە (214)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "dept3": null,
    "refCode": "9",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-08-31",
    "responseDate": "2026-09-09",
    "processingTime": 9,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 115,
    "subject": "داواکاری هەموارکردنەوەی ناونیشانی وەزیفی چەند فەرمانبەرێک - ژمارە (215)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی دارایی"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "بەشی دارایی",
    "dept3": null,
    "refCode": "10",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-09-05",
    "responseDate": null,
    "processingTime": 23,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 116,
    "subject": "ئامادەکاری بۆ بەستنی وۆرکشۆپی بەڕێوەبردنی داتا - ژمارە (216)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": null,
    "dept3": null,
    "refCode": "GEN-2026",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-09-06",
    "responseDate": "2026-09-15",
    "processingTime": 9,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 117,
    "subject": "داواکاری دابینکردنی کەلوپەلی ئۆفیس و چاپەمەنی - ژمارە (217)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "dept3": null,
    "refCode": "ADM-104",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-09-12",
    "responseDate": "2026-09-19",
    "processingTime": 7,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 118,
    "subject": "نووسراوی هاوبەش لەگەڵ هۆبەی پەیوەندییە گشتییەکان - ژمارە (218)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی پەیوەندییەکان",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی پەیوەندییەکان",
    "dept3": "سەرپەرشتیاری گشتی",
    "refCode": "FIN-201",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-09-18",
    "responseDate": null,
    "processingTime": 10,
    "slaTime": "20 ڕۆژ"
  },
  {
    "id": 119,
    "subject": "داواکاری درێژکردنەوەی گرێبەستی کۆمپانیای خاوێنکەرەوە - ژمارە (219)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "dept3": null,
    "refCode": "TECH-505",
    "letterType": "پێشنیار",
    "sentDate": "2026-09-20",
    "responseDate": null,
    "processingTime": null,
    "slaTime": "15 ڕۆژ"
  },
  {
    "id": 120,
    "subject": "ڕاپۆرتی هەڵسەنگاندنی ئەدای کارکردنی شەش مانگی ڕابردوو - ژمارە (220)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی وردبینی",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی وردبینی",
    "dept3": "سەرپەرشتیاری گشتی",
    "refCode": "HR-77",
    "letterType": "ئاگاداری",
    "sentDate": "2026-09-25",
    "responseDate": null,
    "processingTime": null,
    "slaTime": "12 ڕۆژ"
  }
];

export const mockSentData: SentLetterData[] = [
  {
    "id": 1,
    "subject": "ڕەوانەکردنی ڕاپۆرتی وەرزی بۆ ئەنجومەنی کارگێڕی - دەرچوو (501)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": null,
    "refCode": "1a",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-01-16"
  },
  {
    "id": 2,
    "subject": "وەڵامدانەوەی نووسراوی وەزارەتی گواستنەوە و گەیاندن - دەرچوو (502)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی پەیوەندییەکان",
    "refCode": "2",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-01-29"
  },
  {
    "id": 3,
    "subject": "ناردنی پڕۆژە پێشنیاری پەرەپێدانی تۆڕی داتا - دەرچوو (503)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی تەکنیکی",
    "refCode": "3",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-01-30"
  },
  {
    "id": 4,
    "subject": "ئاگادارکردنەوەی لایەنە پەیوەندیدارەکان سەبارەت بە گۆڕانکاری نرخ - دەرچوو (504)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "refCode": "4",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-01-30"
  },
  {
    "id": 5,
    "subject": "ڕەوانەکردنی داتای مانگانەی بەکارهێنەران بۆ بەشی پلاندانان - دەرچوو (505)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": null,
    "refCode": "5",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-02-06"
  },
  {
    "id": 6,
    "subject": "وەڵامی فەرمی لەبارەی داواکاری وردبینی دارایی - دەرچوو (506)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی کارگێڕی",
    "refCode": "6",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-02-06"
  },
  {
    "id": 7,
    "subject": "ناردنی گرێبەستی پەسەندکراوی دابینکەرانی کەلوپەل - دەرچوو (507)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "refCode": "7",
    "letterType": "پێشنیار",
    "sentDate": "2025-02-08"
  },
  {
    "id": 8,
    "subject": "ڕەوانەکردنی لیستی مووچەی شایستە بۆ لقی باکوور - دەرچوو (508)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی لۆجستی",
    "refCode": "8",
    "letterType": "ئاگاداری",
    "sentDate": "2025-02-10"
  },
  {
    "id": 9,
    "subject": "ئاگاداری فەرمی بۆ تەواوکردنی پڕۆژەی فایبەر ئۆپتیک - دەرچوو (509)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی تەکنیکی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی تەکنیکی",
    "refCode": "9",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-02-20"
  },
  {
    "id": 10,
    "subject": "وەڵامدانەوەی نووسراوی پارێزگا سەبارەت بە مۆڵەتی کارکردن - دەرچوو (510)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "refCode": "10",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-03-02"
  },
  {
    "id": 11,
    "subject": "ڕەوانەکردنی پلانی ساڵانەی مەشق و ڕاهێنان - دەرچوو (511)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": null,
    "refCode": "GEN-2026",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-03-04"
  },
  {
    "id": 12,
    "subject": "ناردنی ئامارەکانی پەیوەندی و خزمەتگوزاری بەشەکان - دەرچوو (512)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": null,
    "refCode": "ADM-104",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-03-14"
  },
  {
    "id": 13,
    "subject": "وەڵامی داواکاری هاوکاری تەکنیکی لەگەڵ کۆمپانیا هاوبەشەکان - دەرچوو (513)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی کارگێڕی",
    "refCode": "FIN-201",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-03-16"
  },
  {
    "id": 14,
    "subject": "ڕەوانەکردنی ڕێنمایی نوێی دەوام و مۆڵەتەکان - دەرچوو (514)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "refCode": "TECH-505",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-03-21"
  },
  {
    "id": 15,
    "subject": "ناردنی لیستی ناوی بەشداربووانی کۆنفرانسی ساڵانە - دەرچوو (515)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "refCode": "HR-77",
    "letterType": "پێشنیار",
    "sentDate": "2025-03-30"
  },
  {
    "id": 16,
    "subject": "ڕەوانەکردنی ڕاپۆرتی وەرزی بۆ ئەنجومەنی کارگێڕی - دەرچوو (516)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی لۆجستی",
    "refCode": "1a",
    "letterType": "ئاگاداری",
    "sentDate": "2025-04-02"
  },
  {
    "id": 17,
    "subject": "وەڵامدانەوەی نووسراوی وەزارەتی گواستنەوە و گەیاندن - دەرچوو (517)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "refCode": "2",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-04-03"
  },
  {
    "id": 18,
    "subject": "ناردنی پڕۆژە پێشنیاری پەرەپێدانی تۆڕی داتا - دەرچوو (518)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی دارایی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی دارایی",
    "refCode": "3",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-04-05"
  },
  {
    "id": 19,
    "subject": "ئاگادارکردنەوەی لایەنە پەیوەندیدارەکان سەبارەت بە گۆڕانکاری نرخ - دەرچوو (519)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی وردبینی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی وردبینی",
    "refCode": "4",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-05-07"
  },
  {
    "id": 20,
    "subject": "ڕەوانەکردنی داتای مانگانەی بەکارهێنەران بۆ بەشی پلاندانان - دەرچوو (520)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "refCode": "5",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-05-19"
  },
  {
    "id": 21,
    "subject": "وەڵامی فەرمی لەبارەی داواکاری وردبینی دارایی - دەرچوو (521)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی لۆجستی",
    "refCode": "6",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-05-20"
  },
  {
    "id": 22,
    "subject": "ناردنی گرێبەستی پەسەندکراوی دابینکەرانی کەلوپەل - دەرچوو (522)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی تەکنیکی",
    "refCode": "7",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-05-28"
  },
  {
    "id": 23,
    "subject": "ڕەوانەکردنی لیستی مووچەی شایستە بۆ لقی باکوور - دەرچوو (523)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی تەکنیکی",
    "refCode": "8",
    "letterType": "پێشنیار",
    "sentDate": "2025-05-31"
  },
  {
    "id": 24,
    "subject": "ئاگاداری فەرمی بۆ تەواوکردنی پڕۆژەی فایبەر ئۆپتیک - دەرچوو (524)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "refCode": "9",
    "letterType": "ئاگاداری",
    "sentDate": "2025-06-13"
  },
  {
    "id": 25,
    "subject": "وەڵامدانەوەی نووسراوی پارێزگا سەبارەت بە مۆڵەتی کارکردن - دەرچوو (525)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "سەرپەرشتیاری گشتی",
    "refCode": "10",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-06-15"
  },
  {
    "id": 26,
    "subject": "ڕەوانەکردنی پلانی ساڵانەی مەشق و ڕاهێنان - دەرچوو (526)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "refCode": "GEN-2026",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-06-15"
  },
  {
    "id": 27,
    "subject": "ناردنی ئامارەکانی پەیوەندی و خزمەتگوزاری بەشەکان - دەرچوو (527)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "بەشی تەکنیکی",
    "refCode": "ADM-104",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-06-28"
  },
  {
    "id": 28,
    "subject": "وەڵامی داواکاری هاوکاری تەکنیکی لەگەڵ کۆمپانیا هاوبەشەکان - دەرچوو (528)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": null,
    "refCode": "FIN-201",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-07-15"
  },
  {
    "id": 29,
    "subject": "ڕەوانەکردنی ڕێنمایی نوێی دەوام و مۆڵەتەکان - دەرچوو (529)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی وردبینی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی وردبینی",
    "refCode": "TECH-505",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-08-02"
  },
  {
    "id": 30,
    "subject": "ناردنی لیستی ناوی بەشداربووانی کۆنفرانسی ساڵانە - دەرچوو (530)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "refCode": "HR-77",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-08-09"
  },
  {
    "id": 31,
    "subject": "ڕەوانەکردنی ڕاپۆرتی وەرزی بۆ ئەنجومەنی کارگێڕی - دەرچوو (531)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی وردبینی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی وردبینی",
    "refCode": "1a",
    "letterType": "پێشنیار",
    "sentDate": "2025-08-14"
  },
  {
    "id": 32,
    "subject": "وەڵامدانەوەی نووسراوی وەزارەتی گواستنەوە و گەیاندن - دەرچوو (532)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی دارایی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی دارایی",
    "refCode": "2",
    "letterType": "ئاگاداری",
    "sentDate": "2025-08-17"
  },
  {
    "id": 33,
    "subject": "ناردنی پڕۆژە پێشنیاری پەرەپێدانی تۆڕی داتا - دەرچوو (533)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی لۆجستی",
    "refCode": "3",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-08-22"
  },
  {
    "id": 34,
    "subject": "ئاگادارکردنەوەی لایەنە پەیوەندیدارەکان سەبارەت بە گۆڕانکاری نرخ - دەرچوو (534)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "refCode": "4",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-08-23"
  },
  {
    "id": 35,
    "subject": "ڕەوانەکردنی داتای مانگانەی بەکارهێنەران بۆ بەشی پلاندانان - دەرچوو (535)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "بەشی تەکنیکی",
    "refCode": "5",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-08-27"
  },
  {
    "id": 36,
    "subject": "وەڵامی فەرمی لەبارەی داواکاری وردبینی دارایی - دەرچوو (536)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "refCode": "6",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-09-03"
  },
  {
    "id": 37,
    "subject": "ناردنی گرێبەستی پەسەندکراوی دابینکەرانی کەلوپەل - دەرچوو (537)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "refCode": "7",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-09-07"
  },
  {
    "id": 38,
    "subject": "ڕەوانەکردنی لیستی مووچەی شایستە بۆ لقی باکوور - دەرچوو (538)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "refCode": "8",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-09-11"
  },
  {
    "id": 39,
    "subject": "ئاگاداری فەرمی بۆ تەواوکردنی پڕۆژەی فایبەر ئۆپتیک - دەرچوو (539)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": null,
    "refCode": "9",
    "letterType": "پێشنیار",
    "sentDate": "2025-09-11"
  },
  {
    "id": 40,
    "subject": "وەڵامدانەوەی نووسراوی پارێزگا سەبارەت بە مۆڵەتی کارکردن - دەرچوو (540)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "refCode": "10",
    "letterType": "ئاگاداری",
    "sentDate": "2025-09-20"
  },
  {
    "id": 41,
    "subject": "ڕەوانەکردنی پلانی ساڵانەی مەشق و ڕاهێنان - دەرچوو (541)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": null,
    "refCode": "GEN-2026",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-09-20"
  },
  {
    "id": 42,
    "subject": "ناردنی ئامارەکانی پەیوەندی و خزمەتگوزاری بەشەکان - دەرچوو (542)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": null,
    "refCode": "ADM-104",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-09-25"
  },
  {
    "id": 43,
    "subject": "وەڵامی داواکاری هاوکاری تەکنیکی لەگەڵ کۆمپانیا هاوبەشەکان - دەرچوو (543)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "سەرپەرشتیاری گشتی",
    "refCode": "FIN-201",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-10-03"
  },
  {
    "id": 44,
    "subject": "ڕەوانەکردنی ڕێنمایی نوێی دەوام و مۆڵەتەکان - دەرچوو (544)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "refCode": "TECH-505",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-10-15"
  },
  {
    "id": 45,
    "subject": "ناردنی لیستی ناوی بەشداربووانی کۆنفرانسی ساڵانە - دەرچوو (545)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "سەرپەرشتیاری گشتی",
    "refCode": "HR-77",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-10-16"
  },
  {
    "id": 46,
    "subject": "ڕەوانەکردنی ڕاپۆرتی وەرزی بۆ ئەنجومەنی کارگێڕی - دەرچوو (546)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی دارایی"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی دارایی",
    "refCode": "1a",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-10-18"
  },
  {
    "id": 47,
    "subject": "وەڵامدانەوەی نووسراوی وەزارەتی گواستنەوە و گەیاندن - دەرچوو (547)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "refCode": "2",
    "letterType": "پێشنیار",
    "sentDate": "2025-10-20"
  },
  {
    "id": 48,
    "subject": "ناردنی پڕۆژە پێشنیاری پەرەپێدانی تۆڕی داتا - دەرچوو (548)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی تەکنیکی",
    "refCode": "3",
    "letterType": "ئاگاداری",
    "sentDate": "2025-10-21"
  },
  {
    "id": 49,
    "subject": "ئاگادارکردنەوەی لایەنە پەیوەندیدارەکان سەبارەت بە گۆڕانکاری نرخ - دەرچوو (549)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی تەکنیکی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی تەکنیکی",
    "refCode": "4",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-10-29"
  },
  {
    "id": 50,
    "subject": "ڕەوانەکردنی داتای مانگانەی بەکارهێنەران بۆ بەشی پلاندانان - دەرچوو (550)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی پەیوەندییەکان",
    "refCode": "5",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-11-11"
  },
  {
    "id": 51,
    "subject": "وەڵامی فەرمی لەبارەی داواکاری وردبینی دارایی - دەرچوو (551)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "refCode": "6",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-12-03"
  },
  {
    "id": 52,
    "subject": "ناردنی گرێبەستی پەسەندکراوی دابینکەرانی کەلوپەل - دەرچوو (552)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی وردبینی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی وردبینی",
    "refCode": "7",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-12-10"
  },
  {
    "id": 53,
    "subject": "ڕەوانەکردنی لیستی مووچەی شایستە بۆ لقی باکوور - دەرچوو (553)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی لۆجستی",
    "refCode": "8",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-12-11"
  },
  {
    "id": 54,
    "subject": "ئاگاداری فەرمی بۆ تەواوکردنی پڕۆژەی فایبەر ئۆپتیک - دەرچوو (554)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": "بەشی پەیوەندییەکان",
    "refCode": "9",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-12-14"
  },
  {
    "id": 55,
    "subject": "وەڵامدانەوەی نووسراوی پارێزگا سەبارەت بە مۆڵەتی کارکردن - دەرچوو (555)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "بەشی پەیوەندییەکان",
    "refCode": "10",
    "letterType": "پێشنیار",
    "sentDate": "2025-12-19"
  },
  {
    "id": 56,
    "subject": "ڕەوانەکردنی پلانی ساڵانەی مەشق و ڕاهێنان - دەرچوو (556)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": null,
    "refCode": "GEN-2026",
    "letterType": "ئاگاداری",
    "sentDate": "2025-12-20"
  },
  {
    "id": 57,
    "subject": "ناردنی ئامارەکانی پەیوەندی و خزمەتگوزاری بەشەکان - دەرچوو (557)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "refCode": "ADM-104",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-12-21"
  },
  {
    "id": 58,
    "subject": "وەڵامی داواکاری هاوکاری تەکنیکی لەگەڵ کۆمپانیا هاوبەشەکان - دەرچوو (558)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": null,
    "refCode": "FIN-201",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-01-03"
  },
  {
    "id": 59,
    "subject": "ڕەوانەکردنی ڕێنمایی نوێی دەوام و مۆڵەتەکان - دەرچوو (559)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی کارگێڕی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی کارگێڕی",
    "refCode": "TECH-505",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-01-05"
  },
  {
    "id": 60,
    "subject": "ناردنی لیستی ناوی بەشداربووانی کۆنفرانسی ساڵانە - دەرچوو (560)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "refCode": "HR-77",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-02-02"
  },
  {
    "id": 61,
    "subject": "ڕەوانەکردنی ڕاپۆرتی وەرزی بۆ ئەنجومەنی کارگێڕی - دەرچوو (561)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": null,
    "refCode": "1a",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-02-02"
  },
  {
    "id": 62,
    "subject": "وەڵامدانەوەی نووسراوی وەزارەتی گواستنەوە و گەیاندن - دەرچوو (562)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": null,
    "refCode": "2",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-02-03"
  },
  {
    "id": 63,
    "subject": "ناردنی پڕۆژە پێشنیاری پەرەپێدانی تۆڕی داتا - دەرچوو (563)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی پەیوەندییەکان",
    "refCode": "3",
    "letterType": "پێشنیار",
    "sentDate": "2026-02-06"
  },
  {
    "id": 64,
    "subject": "ئاگادارکردنەوەی لایەنە پەیوەندیدارەکان سەبارەت بە گۆڕانکاری نرخ - دەرچوو (564)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": "بەشی کارگێڕی",
    "refCode": "4",
    "letterType": "ئاگاداری",
    "sentDate": "2026-02-12"
  },
  {
    "id": 65,
    "subject": "ڕەوانەکردنی داتای مانگانەی بەکارهێنەران بۆ بەشی پلاندانان - دەرچوو (565)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": null,
    "refCode": "5",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-02-12"
  },
  {
    "id": 66,
    "subject": "وەڵامی فەرمی لەبارەی داواکاری وردبینی دارایی - دەرچوو (566)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی تەکنیکی",
    "refCode": "6",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-02-13"
  },
  {
    "id": 67,
    "subject": "ناردنی گرێبەستی پەسەندکراوی دابینکەرانی کەلوپەل - دەرچوو (567)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "بەشی یاسایی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "بەشی یاسایی",
    "refCode": "7",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-02-17"
  },
  {
    "id": 68,
    "subject": "ڕەوانەکردنی لیستی مووچەی شایستە بۆ لقی باکوور - دەرچوو (568)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی دارایی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی دارایی",
    "refCode": "8",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-02-28"
  },
  {
    "id": 69,
    "subject": "ئاگاداری فەرمی بۆ تەواوکردنی پڕۆژەی فایبەر ئۆپتیک - دەرچوو (569)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": null,
    "refCode": "9",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-03-03"
  },
  {
    "id": 70,
    "subject": "وەڵامدانەوەی نووسراوی پارێزگا سەبارەت بە مۆڵەتی کارکردن - دەرچوو (570)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی دارایی"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی دارایی",
    "refCode": "10",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-03-10"
  },
  {
    "id": 71,
    "subject": "ڕەوانەکردنی پلانی ساڵانەی مەشق و ڕاهێنان - دەرچوو (571)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": null,
    "refCode": "GEN-2026",
    "letterType": "پێشنیار",
    "sentDate": "2026-03-11"
  },
  {
    "id": 72,
    "subject": "ناردنی ئامارەکانی پەیوەندی و خزمەتگوزاری بەشەکان - دەرچوو (572)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی تەکنیکی",
    "refCode": "ADM-104",
    "letterType": "ئاگاداری",
    "sentDate": "2026-03-15"
  },
  {
    "id": 73,
    "subject": "وەڵامی داواکاری هاوکاری تەکنیکی لەگەڵ کۆمپانیا هاوبەشەکان - دەرچوو (573)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی کارگێڕی",
    "refCode": "FIN-201",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-03-16"
  },
  {
    "id": 74,
    "subject": "ڕەوانەکردنی ڕێنمایی نوێی دەوام و مۆڵەتەکان - دەرچوو (574)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "refCode": "TECH-505",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-03-17"
  },
  {
    "id": 75,
    "subject": "ناردنی لیستی ناوی بەشداربووانی کۆنفرانسی ساڵانە - دەرچوو (575)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "سەرپەرشتیاری گشتی",
    "refCode": "HR-77",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-03-24"
  },
  {
    "id": 76,
    "subject": "ڕەوانەکردنی ڕاپۆرتی وەرزی بۆ ئەنجومەنی کارگێڕی - دەرچوو (576)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "سەرپەرشتیاری گشتی",
    "refCode": "1a",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-04-01"
  },
  {
    "id": 77,
    "subject": "وەڵامدانەوەی نووسراوی وەزارەتی گواستنەوە و گەیاندن - دەرچوو (577)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "بەشی یاسایی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "بەشی یاسایی",
    "refCode": "2",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-04-05"
  },
  {
    "id": 78,
    "subject": "ناردنی پڕۆژە پێشنیاری پەرەپێدانی تۆڕی داتا - دەرچوو (578)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": null,
    "refCode": "3",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-04-20"
  },
  {
    "id": 79,
    "subject": "ئاگادارکردنەوەی لایەنە پەیوەندیدارەکان سەبارەت بە گۆڕانکاری نرخ - دەرچوو (579)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی وردبینی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی وردبینی",
    "refCode": "4",
    "letterType": "پێشنیار",
    "sentDate": "2026-04-27"
  },
  {
    "id": 80,
    "subject": "ڕەوانەکردنی داتای مانگانەی بەکارهێنەران بۆ بەشی پلاندانان - دەرچوو (580)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "refCode": "5",
    "letterType": "ئاگاداری",
    "sentDate": "2026-05-02"
  },
  {
    "id": 81,
    "subject": "وەڵامی فەرمی لەبارەی داواکاری وردبینی دارایی - دەرچوو (581)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": null,
    "refCode": "6",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-05-03"
  },
  {
    "id": 82,
    "subject": "ناردنی گرێبەستی پەسەندکراوی دابینکەرانی کەلوپەل - دەرچوو (582)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "سەرپەرشتیاری گشتی",
    "refCode": "7",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-05-06"
  },
  {
    "id": 83,
    "subject": "ڕەوانەکردنی لیستی مووچەی شایستە بۆ لقی باکوور - دەرچوو (583)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": null,
    "refCode": "8",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-05-09"
  },
  {
    "id": 84,
    "subject": "ئاگاداری فەرمی بۆ تەواوکردنی پڕۆژەی فایبەر ئۆپتیک - دەرچوو (584)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "refCode": "9",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-05-13"
  },
  {
    "id": 85,
    "subject": "وەڵامدانەوەی نووسراوی پارێزگا سەبارەت بە مۆڵەتی کارکردن - دەرچوو (585)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": null,
    "refCode": "10",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-05-21"
  },
  {
    "id": 86,
    "subject": "ڕەوانەکردنی پلانی ساڵانەی مەشق و ڕاهێنان - دەرچوو (586)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": null,
    "refCode": "GEN-2026",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-05-22"
  },
  {
    "id": 87,
    "subject": "ناردنی ئامارەکانی پەیوەندی و خزمەتگوزاری بەشەکان - دەرچوو (587)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "بەشی کارگێڕی",
    "refCode": "ADM-104",
    "letterType": "پێشنیار",
    "sentDate": "2026-05-24"
  },
  {
    "id": 88,
    "subject": "وەڵامی داواکاری هاوکاری تەکنیکی لەگەڵ کۆمپانیا هاوبەشەکان - دەرچوو (588)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": null,
    "refCode": "FIN-201",
    "letterType": "ئاگاداری",
    "sentDate": "2026-06-27"
  },
  {
    "id": 89,
    "subject": "ڕەوانەکردنی ڕێنمایی نوێی دەوام و مۆڵەتەکان - دەرچوو (589)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": null,
    "refCode": "TECH-505",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-07-10"
  },
  {
    "id": 90,
    "subject": "ناردنی لیستی ناوی بەشداربووانی کۆنفرانسی ساڵانە - دەرچوو (590)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی تەکنیکی",
    "refCode": "HR-77",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-07-15"
  },
  {
    "id": 91,
    "subject": "ڕەوانەکردنی ڕاپۆرتی وەرزی بۆ ئەنجومەنی کارگێڕی - دەرچوو (591)",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "سەرپەرشتیاری گشتی",
    "refCode": "1a",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-07-16"
  },
  {
    "id": 92,
    "subject": "وەڵامدانەوەی نووسراوی وەزارەتی گواستنەوە و گەیاندن - دەرچوو (592)",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی پەیوەندییەکان",
    "refCode": "2",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-07-17"
  },
  {
    "id": 93,
    "subject": "ناردنی پڕۆژە پێشنیاری پەرەپێدانی تۆڕی داتا - دەرچوو (593)",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی پەیوەندییەکان",
    "refCode": "3",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-07-19"
  },
  {
    "id": 94,
    "subject": "ئاگادارکردنەوەی لایەنە پەیوەندیدارەکان سەبارەت بە گۆڕانکاری نرخ - دەرچوو (594)",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "refCode": "4",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-07-23"
  },
  {
    "id": 95,
    "subject": "ڕەوانەکردنی داتای مانگانەی بەکارهێنەران بۆ بەشی پلاندانان - دەرچوو (595)",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": null,
    "refCode": "5",
    "letterType": "پێشنیار",
    "sentDate": "2026-08-10"
  },
  {
    "id": 96,
    "subject": "وەڵامی فەرمی لەبارەی داواکاری وردبینی دارایی - دەرچوو (596)",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": null,
    "refCode": "6",
    "letterType": "ئاگاداری",
    "sentDate": "2026-08-10"
  },
  {
    "id": 97,
    "subject": "ناردنی گرێبەستی پەسەندکراوی دابینکەرانی کەلوپەل - دەرچوو (597)",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "refCode": "7",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-08-22"
  },
  {
    "id": 98,
    "subject": "ڕەوانەکردنی لیستی مووچەی شایستە بۆ لقی باکوور - دەرچوو (598)",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی کارگێڕی",
    "refCode": "8",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-08-31"
  },
  {
    "id": 99,
    "subject": "ئاگاداری فەرمی بۆ تەواوکردنی پڕۆژەی فایبەر ئۆپتیک - دەرچوو (599)",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": null,
    "refCode": "9",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-09-08"
  },
  {
    "id": 100,
    "subject": "وەڵامدانەوەی نووسراوی پارێزگا سەبارەت بە مۆڵەتی کارکردن - دەرچوو (600)",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "refCode": "10",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-09-19"
  }
];

export const mockIncomingData: IncomingLetterData[] = [
  {
    "id": 1,
    "subject": "نووسراوی وەزارەت سەبارەت بە ڕێنماییە نوێیەکانی پەیوەندی - هاتوو (801)",
    "sender": "وەزارەتی گواستنەوە و گەیاندن",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "سەرپەرشتیاری گشتی",
    "refCode": "1a",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-01-11"
  },
  {
    "id": 2,
    "subject": "داواکاری هاوئاهەنگی بۆ پڕۆژەی تۆڕی نیشتمانی - هاتوو (802)",
    "sender": "پارێزگای سلێمانی",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": null,
    "refCode": "2",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-01-12"
  },
  {
    "id": 3,
    "subject": "ئاگاداری لە پارێزگاوە سەبارەت بە مەرجەکانی ژینگەپارێزی - هاتوو (803)",
    "sender": "بەڕێوەبەرایەتی باجەکان",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": null,
    "refCode": "3",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-01-31"
  },
  {
    "id": 4,
    "subject": "داواکاری پێشکەشکردنی داتای ئاماری لەلایەن دەستەی ئامار - هاتوو (804)",
    "sender": "بانکی ناوەندی هەرێم",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "refCode": "4",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-02-05"
  },
  {
    "id": 5,
    "subject": "نووسراوی بانکی ناوەندی لەبارەی مامەڵە ئەلیکترۆنییەکان - هاتوو (805)",
    "sender": "کۆمپانیای ئاسیاسێڵ",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": null,
    "refCode": "5",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-02-12"
  },
  {
    "id": 6,
    "subject": "داواکاری نوێکردنەوەی تۆماری بازرگانی بۆ ساڵی نوێ - هاتوو (806)",
    "sender": "کۆمپانیای کۆڕەک تیلی کۆم",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "سەرپەرشتیاری گشتی",
    "refCode": "6",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-02-16"
  },
  {
    "id": 7,
    "subject": "بانگهێشتنامەی بەشداریکردن لە پیشانگای نێودەوڵەتی تەکنەلۆژیا - هاتوو (807)",
    "sender": "ژووری بازرگانی و پیشەسازی",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "بەشی کارگێڕی",
    "refCode": "7",
    "letterType": "پێشنیار",
    "sentDate": "2025-02-19"
  },
  {
    "id": 8,
    "subject": "نووسراوی فەرمی کۆمپانیای دابینکەری هێڵی ئینتەرنێت - هاتوو (808)",
    "sender": "فەرمانگەی تەندروستی سلێمانی",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": null,
    "refCode": "8",
    "letterType": "ئاگاداری",
    "sentDate": "2025-02-20"
  },
  {
    "id": 9,
    "subject": "ئاگادارکردنەوە سەبارەت بە پشکنینی وەرزی باڵەخانەکان - هاتوو (809)",
    "sender": "بەڕێوەبەرایەتی تۆماری کۆمپانیاکان",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": null,
    "refCode": "9",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-03-06"
  },
  {
    "id": 10,
    "subject": "داواکاری تەرخانکردنی نوێنەر بۆ لیژنەی باڵای هەماهەنگی - هاتوو (810)",
    "sender": "ئەنجومەنی وەزیران - فەرمانگەی هەماهەنگی",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "refCode": "10",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-03-12"
  },
  {
    "id": 11,
    "subject": "نووسراوی دەستەی دەستپاکی سەبارەت بە ڕێکارە داراییەکان - هاتوو (811)",
    "sender": "کۆمپانیای نەوتی باکوور",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "refCode": "GEN-2026",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-03-23"
  },
  {
    "id": 12,
    "subject": "پێشنیاری گرێبەستی خزمەتگوزاری لەلایەن کەرتی تایبەتەوە - هاتوو (812)",
    "sender": "بەڕێوەبەرایەتی گشتی گومرگ",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": null,
    "refCode": "ADM-104",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-03-24"
  },
  {
    "id": 13,
    "subject": "نووسراوی وەزارەت سەبارەت بە ڕێنماییە نوێیەکانی پەیوەندی - هاتوو (813)",
    "sender": "وەزارەتی گواستنەوە و گەیاندن",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی کارگێڕی",
    "refCode": "FIN-201",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-03-27"
  },
  {
    "id": 14,
    "subject": "داواکاری هاوئاهەنگی بۆ پڕۆژەی تۆڕی نیشتمانی - هاتوو (814)",
    "sender": "پارێزگای سلێمانی",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "refCode": "TECH-505",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-04-02"
  },
  {
    "id": 15,
    "subject": "ئاگاداری لە پارێزگاوە سەبارەت بە مەرجەکانی ژینگەپارێزی - هاتوو (815)",
    "sender": "بەڕێوەبەرایەتی باجەکان",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": null,
    "refCode": "HR-77",
    "letterType": "پێشنیار",
    "sentDate": "2025-04-10"
  },
  {
    "id": 16,
    "subject": "داواکاری پێشکەشکردنی داتای ئاماری لەلایەن دەستەی ئامار - هاتوو (816)",
    "sender": "بانکی ناوەندی هەرێم",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی کارگێڕی",
    "refCode": "1a",
    "letterType": "ئاگاداری",
    "sentDate": "2025-04-13"
  },
  {
    "id": 17,
    "subject": "نووسراوی بانکی ناوەندی لەبارەی مامەڵە ئەلیکترۆنییەکان - هاتوو (817)",
    "sender": "کۆمپانیای ئاسیاسێڵ",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "refCode": "2",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-04-13"
  },
  {
    "id": 18,
    "subject": "داواکاری نوێکردنەوەی تۆماری بازرگانی بۆ ساڵی نوێ - هاتوو (818)",
    "sender": "کۆمپانیای کۆڕەک تیلی کۆم",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "refCode": "3",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-04-27"
  },
  {
    "id": 19,
    "subject": "بانگهێشتنامەی بەشداریکردن لە پیشانگای نێودەوڵەتی تەکنەلۆژیا - هاتوو (819)",
    "sender": "ژووری بازرگانی و پیشەسازی",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی لۆجستی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی لۆجستی",
    "refCode": "4",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-05-07"
  },
  {
    "id": 20,
    "subject": "نووسراوی فەرمی کۆمپانیای دابینکەری هێڵی ئینتەرنێت - هاتوو (820)",
    "sender": "فەرمانگەی تەندروستی سلێمانی",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی وردبینی"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی وردبینی",
    "refCode": "5",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-05-08"
  },
  {
    "id": 21,
    "subject": "ئاگادارکردنەوە سەبارەت بە پشکنینی وەرزی باڵەخانەکان - هاتوو (821)",
    "sender": "بەڕێوەبەرایەتی تۆماری کۆمپانیاکان",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": null,
    "refCode": "6",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-05-17"
  },
  {
    "id": 22,
    "subject": "داواکاری تەرخانکردنی نوێنەر بۆ لیژنەی باڵای هەماهەنگی - هاتوو (822)",
    "sender": "ئەنجومەنی وەزیران - فەرمانگەی هەماهەنگی",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "refCode": "7",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-06-04"
  },
  {
    "id": 23,
    "subject": "نووسراوی دەستەی دەستپاکی سەبارەت بە ڕێکارە داراییەکان - هاتوو (823)",
    "sender": "کۆمپانیای نەوتی باکوور",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": null,
    "refCode": "8",
    "letterType": "پێشنیار",
    "sentDate": "2025-06-11"
  },
  {
    "id": 24,
    "subject": "پێشنیاری گرێبەستی خزمەتگوزاری لەلایەن کەرتی تایبەتەوە - هاتوو (824)",
    "sender": "بەڕێوەبەرایەتی گشتی گومرگ",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی",
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "refCode": "9",
    "letterType": "ئاگاداری",
    "sentDate": "2025-06-19"
  },
  {
    "id": 25,
    "subject": "نووسراوی وەزارەت سەبارەت بە ڕێنماییە نوێیەکانی پەیوەندی - هاتوو (825)",
    "sender": "وەزارەتی گواستنەوە و گەیاندن",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": null,
    "refCode": "10",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-06-23"
  },
  {
    "id": 26,
    "subject": "داواکاری هاوئاهەنگی بۆ پڕۆژەی تۆڕی نیشتمانی - هاتوو (826)",
    "sender": "پارێزگای سلێمانی",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": null,
    "refCode": "GEN-2026",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-06-28"
  },
  {
    "id": 27,
    "subject": "ئاگاداری لە پارێزگاوە سەبارەت بە مەرجەکانی ژینگەپارێزی - هاتوو (827)",
    "sender": "بەڕێوەبەرایەتی باجەکان",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "بەشی وردبینی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "بەشی وردبینی",
    "refCode": "ADM-104",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-07-06"
  },
  {
    "id": 28,
    "subject": "داواکاری پێشکەشکردنی داتای ئاماری لەلایەن دەستەی ئامار - هاتوو (828)",
    "sender": "بانکی ناوەندی هەرێم",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "refCode": "FIN-201",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-07-08"
  },
  {
    "id": 29,
    "subject": "نووسراوی بانکی ناوەندی لەبارەی مامەڵە ئەلیکترۆنییەکان - هاتوو (829)",
    "sender": "کۆمپانیای ئاسیاسێڵ",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی دارایی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی دارایی",
    "refCode": "TECH-505",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-07-14"
  },
  {
    "id": 30,
    "subject": "داواکاری نوێکردنەوەی تۆماری بازرگانی بۆ ساڵی نوێ - هاتوو (830)",
    "sender": "کۆمپانیای کۆڕەک تیلی کۆم",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "refCode": "HR-77",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-07-21"
  },
  {
    "id": 31,
    "subject": "بانگهێشتنامەی بەشداریکردن لە پیشانگای نێودەوڵەتی تەکنەلۆژیا - هاتوو (831)",
    "sender": "ژووری بازرگانی و پیشەسازی",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی تەکنیکی",
    "refCode": "1a",
    "letterType": "پێشنیار",
    "sentDate": "2025-07-31"
  },
  {
    "id": 32,
    "subject": "نووسراوی فەرمی کۆمپانیای دابینکەری هێڵی ئینتەرنێت - هاتوو (832)",
    "sender": "فەرمانگەی تەندروستی سلێمانی",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "refCode": "2",
    "letterType": "ئاگاداری",
    "sentDate": "2025-08-28"
  },
  {
    "id": 33,
    "subject": "ئاگادارکردنەوە سەبارەت بە پشکنینی وەرزی باڵەخانەکان - هاتوو (833)",
    "sender": "بەڕێوەبەرایەتی تۆماری کۆمپانیاکان",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی لۆجستی",
    "refCode": "3",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-09-01"
  },
  {
    "id": 34,
    "subject": "داواکاری تەرخانکردنی نوێنەر بۆ لیژنەی باڵای هەماهەنگی - هاتوو (834)",
    "sender": "ئەنجومەنی وەزیران - فەرمانگەی هەماهەنگی",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "refCode": "4",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-09-04"
  },
  {
    "id": 35,
    "subject": "نووسراوی دەستەی دەستپاکی سەبارەت بە ڕێکارە داراییەکان - هاتوو (835)",
    "sender": "کۆمپانیای نەوتی باکوور",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "سەرپەرشتیاری گشتی",
    "refCode": "5",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-09-06"
  },
  {
    "id": 36,
    "subject": "پێشنیاری گرێبەستی خزمەتگوزاری لەلایەن کەرتی تایبەتەوە - هاتوو (836)",
    "sender": "بەڕێوەبەرایەتی گشتی گومرگ",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی تەکنیکی",
    "refCode": "6",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-09-23"
  },
  {
    "id": 37,
    "subject": "نووسراوی وەزارەت سەبارەت بە ڕێنماییە نوێیەکانی پەیوەندی - هاتوو (837)",
    "sender": "وەزارەتی گواستنەوە و گەیاندن",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "refCode": "7",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-09-25"
  },
  {
    "id": 38,
    "subject": "داواکاری هاوئاهەنگی بۆ پڕۆژەی تۆڕی نیشتمانی - هاتوو (838)",
    "sender": "پارێزگای سلێمانی",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی تەکنیکی",
    "refCode": "8",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-10-07"
  },
  {
    "id": 39,
    "subject": "ئاگاداری لە پارێزگاوە سەبارەت بە مەرجەکانی ژینگەپارێزی - هاتوو (839)",
    "sender": "بەڕێوەبەرایەتی باجەکان",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی دارایی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی دارایی",
    "refCode": "9",
    "letterType": "پێشنیار",
    "sentDate": "2025-10-09"
  },
  {
    "id": 40,
    "subject": "داواکاری پێشکەشکردنی داتای ئاماری لەلایەن دەستەی ئامار - هاتوو (840)",
    "sender": "بانکی ناوەندی هەرێم",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی وردبینی"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی وردبینی",
    "refCode": "10",
    "letterType": "ئاگاداری",
    "sentDate": "2025-10-12"
  },
  {
    "id": 41,
    "subject": "نووسراوی بانکی ناوەندی لەبارەی مامەڵە ئەلیکترۆنییەکان - هاتوو (841)",
    "sender": "کۆمپانیای ئاسیاسێڵ",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی وردبینی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی وردبینی",
    "refCode": "GEN-2026",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-10-15"
  },
  {
    "id": 42,
    "subject": "داواکاری نوێکردنەوەی تۆماری بازرگانی بۆ ساڵی نوێ - هاتوو (842)",
    "sender": "کۆمپانیای کۆڕەک تیلی کۆم",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": null,
    "refCode": "ADM-104",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-10-21"
  },
  {
    "id": 43,
    "subject": "بانگهێشتنامەی بەشداریکردن لە پیشانگای نێودەوڵەتی تەکنەلۆژیا - هاتوو (843)",
    "sender": "ژووری بازرگانی و پیشەسازی",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی دارایی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی دارایی",
    "refCode": "FIN-201",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-10-26"
  },
  {
    "id": 44,
    "subject": "نووسراوی فەرمی کۆمپانیای دابینکەری هێڵی ئینتەرنێت - هاتوو (844)",
    "sender": "فەرمانگەی تەندروستی سلێمانی",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "refCode": "TECH-505",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-11-01"
  },
  {
    "id": 45,
    "subject": "ئاگادارکردنەوە سەبارەت بە پشکنینی وەرزی باڵەخانەکان - هاتوو (845)",
    "sender": "بەڕێوەبەرایەتی تۆماری کۆمپانیاکان",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "بەشی کارگێڕی",
    "refCode": "HR-77",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-11-01"
  },
  {
    "id": 46,
    "subject": "داواکاری تەرخانکردنی نوێنەر بۆ لیژنەی باڵای هەماهەنگی - هاتوو (846)",
    "sender": "ئەنجومەنی وەزیران - فەرمانگەی هەماهەنگی",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی کارگێڕی"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی کارگێڕی",
    "refCode": "1a",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-11-01"
  },
  {
    "id": 47,
    "subject": "نووسراوی دەستەی دەستپاکی سەبارەت بە ڕێکارە داراییەکان - هاتوو (847)",
    "sender": "کۆمپانیای نەوتی باکوور",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "بەشی دارایی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "بەشی دارایی",
    "refCode": "2",
    "letterType": "پێشنیار",
    "sentDate": "2025-11-04"
  },
  {
    "id": 48,
    "subject": "پێشنیاری گرێبەستی خزمەتگوزاری لەلایەن کەرتی تایبەتەوە - هاتوو (848)",
    "sender": "بەڕێوەبەرایەتی گشتی گومرگ",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": null,
    "refCode": "3",
    "letterType": "ئاگاداری",
    "sentDate": "2025-11-17"
  },
  {
    "id": 49,
    "subject": "نووسراوی وەزارەت سەبارەت بە ڕێنماییە نوێیەکانی پەیوەندی - هاتوو (849)",
    "sender": "وەزارەتی گواستنەوە و گەیاندن",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی یاسایی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی یاسایی",
    "refCode": "4",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2025-11-20"
  },
  {
    "id": 50,
    "subject": "داواکاری هاوئاهەنگی بۆ پڕۆژەی تۆڕی نیشتمانی - هاتوو (850)",
    "sender": "پارێزگای سلێمانی",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "refCode": "5",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2025-11-28"
  },
  {
    "id": 51,
    "subject": "ئاگاداری لە پارێزگاوە سەبارەت بە مەرجەکانی ژینگەپارێزی - هاتوو (851)",
    "sender": "بەڕێوەبەرایەتی باجەکان",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی دارایی",
    "dept2": "بەشی پەیوەندییەکان",
    "refCode": "6",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2025-12-04"
  },
  {
    "id": 52,
    "subject": "داواکاری پێشکەشکردنی داتای ئاماری لەلایەن دەستەی ئامار - هاتوو (852)",
    "sender": "بانکی ناوەندی هەرێم",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی وردبینی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی وردبینی",
    "refCode": "7",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2025-12-06"
  },
  {
    "id": 53,
    "subject": "نووسراوی بانکی ناوەندی لەبارەی مامەڵە ئەلیکترۆنییەکان - هاتوو (853)",
    "sender": "کۆمپانیای ئاسیاسێڵ",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": null,
    "refCode": "8",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2025-12-07"
  },
  {
    "id": 54,
    "subject": "داواکاری نوێکردنەوەی تۆماری بازرگانی بۆ ساڵی نوێ - هاتوو (854)",
    "sender": "کۆمپانیای کۆڕەک تیلی کۆم",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "refCode": "9",
    "letterType": "ڕاپۆرت",
    "sentDate": "2025-12-13"
  },
  {
    "id": 55,
    "subject": "بانگهێشتنامەی بەشداریکردن لە پیشانگای نێودەوڵەتی تەکنەلۆژیا - هاتوو (855)",
    "sender": "ژووری بازرگانی و پیشەسازی",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "بەشی لۆجستی",
    "refCode": "10",
    "letterType": "پێشنیار",
    "sentDate": "2025-12-17"
  },
  {
    "id": 56,
    "subject": "نووسراوی فەرمی کۆمپانیای دابینکەری هێڵی ئینتەرنێت - هاتوو (856)",
    "sender": "فەرمانگەی تەندروستی سلێمانی",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی تەکنەلۆژیای زانیاری",
    "refCode": "GEN-2026",
    "letterType": "ئاگاداری",
    "sentDate": "2026-01-01"
  },
  {
    "id": 57,
    "subject": "ئاگادارکردنەوە سەبارەت بە پشکنینی وەرزی باڵەخانەکان - هاتوو (857)",
    "sender": "بەڕێوەبەرایەتی تۆماری کۆمپانیاکان",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "refCode": "ADM-104",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-01-15"
  },
  {
    "id": 58,
    "subject": "داواکاری تەرخانکردنی نوێنەر بۆ لیژنەی باڵای هەماهەنگی - هاتوو (858)",
    "sender": "ئەنجومەنی وەزیران - فەرمانگەی هەماهەنگی",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": null,
    "refCode": "FIN-201",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-02-24"
  },
  {
    "id": 59,
    "subject": "نووسراوی دەستەی دەستپاکی سەبارەت بە ڕێکارە داراییەکان - هاتوو (859)",
    "sender": "کۆمپانیای نەوتی باکوور",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": null,
    "refCode": "TECH-505",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-02-26"
  },
  {
    "id": 60,
    "subject": "پێشنیاری گرێبەستی خزمەتگوزاری لەلایەن کەرتی تایبەتەوە - هاتوو (860)",
    "sender": "بەڕێوەبەرایەتی گشتی گومرگ",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی تەکنیکی",
    "refCode": "HR-77",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-02-27"
  },
  {
    "id": 61,
    "subject": "نووسراوی وەزارەت سەبارەت بە ڕێنماییە نوێیەکانی پەیوەندی - هاتوو (861)",
    "sender": "وەزارەتی گواستنەوە و گەیاندن",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": null,
    "refCode": "1a",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-03-04"
  },
  {
    "id": 62,
    "subject": "داواکاری هاوئاهەنگی بۆ پڕۆژەی تۆڕی نیشتمانی - هاتوو (862)",
    "sender": "پارێزگای سلێمانی",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی یاسایی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی یاسایی",
    "refCode": "2",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-03-04"
  },
  {
    "id": 63,
    "subject": "ئاگاداری لە پارێزگاوە سەبارەت بە مەرجەکانی ژینگەپارێزی - هاتوو (863)",
    "sender": "بەڕێوەبەرایەتی باجەکان",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": null,
    "refCode": "3",
    "letterType": "پێشنیار",
    "sentDate": "2026-03-07"
  },
  {
    "id": 64,
    "subject": "داواکاری پێشکەشکردنی داتای ئاماری لەلایەن دەستەی ئامار - هاتوو (864)",
    "sender": "بانکی ناوەندی هەرێم",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی",
      "بەشی یاسایی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": "بەشی یاسایی",
    "refCode": "4",
    "letterType": "ئاگاداری",
    "sentDate": "2026-03-09"
  },
  {
    "id": 65,
    "subject": "نووسراوی بانکی ناوەندی لەبارەی مامەڵە ئەلیکترۆنییەکان - هاتوو (865)",
    "sender": "کۆمپانیای ئاسیاسێڵ",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی دارایی"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "بەشی دارایی",
    "refCode": "5",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-03-21"
  },
  {
    "id": 66,
    "subject": "داواکاری نوێکردنەوەی تۆماری بازرگانی بۆ ساڵی نوێ - هاتوو (866)",
    "sender": "کۆمپانیای کۆڕەک تیلی کۆم",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": null,
    "refCode": "6",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-03-28"
  },
  {
    "id": 67,
    "subject": "بانگهێشتنامەی بەشداریکردن لە پیشانگای نێودەوڵەتی تەکنەلۆژیا - هاتوو (867)",
    "sender": "ژووری بازرگانی و پیشەسازی",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "بەشی دارایی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "بەشی دارایی",
    "refCode": "7",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-04-01"
  },
  {
    "id": 68,
    "subject": "نووسراوی فەرمی کۆمپانیای دابینکەری هێڵی ئینتەرنێت - هاتوو (868)",
    "sender": "فەرمانگەی تەندروستی سلێمانی",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی پەیوەندییەکان",
    "refCode": "8",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-04-03"
  },
  {
    "id": 69,
    "subject": "ئاگادارکردنەوە سەبارەت بە پشکنینی وەرزی باڵەخانەکان - هاتوو (869)",
    "sender": "بەڕێوەبەرایەتی تۆماری کۆمپانیاکان",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی لۆجستی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی لۆجستی",
    "refCode": "9",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-04-04"
  },
  {
    "id": 70,
    "subject": "داواکاری تەرخانکردنی نوێنەر بۆ لیژنەی باڵای هەماهەنگی - هاتوو (870)",
    "sender": "ئەنجومەنی وەزیران - فەرمانگەی هەماهەنگی",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "refCode": "10",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-04-07"
  },
  {
    "id": 71,
    "subject": "نووسراوی دەستەی دەستپاکی سەبارەت بە ڕێکارە داراییەکان - هاتوو (871)",
    "sender": "کۆمپانیای نەوتی باکوور",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": null,
    "refCode": "GEN-2026",
    "letterType": "پێشنیار",
    "sentDate": "2026-04-16"
  },
  {
    "id": 72,
    "subject": "پێشنیاری گرێبەستی خزمەتگوزاری لەلایەن کەرتی تایبەتەوە - هاتوو (872)",
    "sender": "بەڕێوەبەرایەتی گشتی گومرگ",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی تەکنیکی",
    "refCode": "ADM-104",
    "letterType": "ئاگاداری",
    "sentDate": "2026-04-19"
  },
  {
    "id": 73,
    "subject": "نووسراوی وەزارەت سەبارەت بە ڕێنماییە نوێیەکانی پەیوەندی - هاتوو (873)",
    "sender": "وەزارەتی گواستنەوە و گەیاندن",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": null,
    "refCode": "FIN-201",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-04-20"
  },
  {
    "id": 74,
    "subject": "داواکاری هاوئاهەنگی بۆ پڕۆژەی تۆڕی نیشتمانی - هاتوو (874)",
    "sender": "پارێزگای سلێمانی",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "refCode": "TECH-505",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-04-28"
  },
  {
    "id": 75,
    "subject": "ئاگاداری لە پارێزگاوە سەبارەت بە مەرجەکانی ژینگەپارێزی - هاتوو (875)",
    "sender": "بەڕێوەبەرایەتی باجەکان",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": null,
    "refCode": "HR-77",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-05-04"
  },
  {
    "id": 76,
    "subject": "داواکاری پێشکەشکردنی داتای ئاماری لەلایەن دەستەی ئامار - هاتوو (876)",
    "sender": "بانکی ناوەندی هەرێم",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی تەکنیکی",
    "refCode": "1a",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-05-06"
  },
  {
    "id": 77,
    "subject": "نووسراوی بانکی ناوەندی لەبارەی مامەڵە ئەلیکترۆنییەکان - هاتوو (877)",
    "sender": "کۆمپانیای ئاسیاسێڵ",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "بەشی یاسایی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "بەشی یاسایی",
    "refCode": "2",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-05-06"
  },
  {
    "id": 78,
    "subject": "داواکاری نوێکردنەوەی تۆماری بازرگانی بۆ ساڵی نوێ - هاتوو (878)",
    "sender": "کۆمپانیای کۆڕەک تیلی کۆم",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": null,
    "refCode": "3",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-05-06"
  },
  {
    "id": 79,
    "subject": "بانگهێشتنامەی بەشداریکردن لە پیشانگای نێودەوڵەتی تەکنەلۆژیا - هاتوو (879)",
    "sender": "ژووری بازرگانی و پیشەسازی",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "refCode": "4",
    "letterType": "پێشنیار",
    "sentDate": "2026-05-28"
  },
  {
    "id": 80,
    "subject": "نووسراوی فەرمی کۆمپانیای دابینکەری هێڵی ئینتەرنێت - هاتوو (880)",
    "sender": "فەرمانگەی تەندروستی سلێمانی",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "refCode": "5",
    "letterType": "ئاگاداری",
    "sentDate": "2026-05-30"
  },
  {
    "id": 81,
    "subject": "ئاگادارکردنەوە سەبارەت بە پشکنینی وەرزی باڵەخانەکان - هاتوو (881)",
    "sender": "بەڕێوەبەرایەتی تۆماری کۆمپانیاکان",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": null,
    "refCode": "6",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-06-01"
  },
  {
    "id": 82,
    "subject": "داواکاری تەرخانکردنی نوێنەر بۆ لیژنەی باڵای هەماهەنگی - هاتوو (882)",
    "sender": "ئەنجومەنی وەزیران - فەرمانگەی هەماهەنگی",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی پەیوەندییەکان",
    "refCode": "7",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-06-06"
  },
  {
    "id": 83,
    "subject": "نووسراوی دەستەی دەستپاکی سەبارەت بە ڕێکارە داراییەکان - هاتوو (883)",
    "sender": "کۆمپانیای نەوتی باکوور",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": null,
    "refCode": "8",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-06-20"
  },
  {
    "id": 84,
    "subject": "پێشنیاری گرێبەستی خزمەتگوزاری لەلایەن کەرتی تایبەتەوە - هاتوو (884)",
    "sender": "بەڕێوەبەرایەتی گشتی گومرگ",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "refCode": "9",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-06-24"
  },
  {
    "id": 85,
    "subject": "نووسراوی وەزارەت سەبارەت بە ڕێنماییە نوێیەکانی پەیوەندی - هاتوو (885)",
    "sender": "وەزارەتی گواستنەوە و گەیاندن",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "بەشی لۆجستی",
    "refCode": "10",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-06-25"
  },
  {
    "id": 86,
    "subject": "داواکاری هاوئاهەنگی بۆ پڕۆژەی تۆڕی نیشتمانی - هاتوو (886)",
    "sender": "پارێزگای سلێمانی",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان",
      "بەشی وردبینی"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": "بەشی وردبینی",
    "refCode": "GEN-2026",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-07-16"
  },
  {
    "id": 87,
    "subject": "ئاگاداری لە پارێزگاوە سەبارەت بە مەرجەکانی ژینگەپارێزی - هاتوو (887)",
    "sender": "بەڕێوەبەرایەتی باجەکان",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی",
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": "سەرپەرشتیاری گشتی",
    "refCode": "ADM-104",
    "letterType": "پێشنیار",
    "sentDate": "2026-07-19"
  },
  {
    "id": 88,
    "subject": "داواکاری پێشکەشکردنی داتای ئاماری لەلایەن دەستەی ئامار - هاتوو (888)",
    "sender": "بانکی ناوەندی هەرێم",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی تەکنیکی",
    "refCode": "FIN-201",
    "letterType": "ئاگاداری",
    "sentDate": "2026-07-21"
  },
  {
    "id": 89,
    "subject": "نووسراوی بانکی ناوەندی لەبارەی مامەڵە ئەلیکترۆنییەکان - هاتوو (889)",
    "sender": "کۆمپانیای ئاسیاسێڵ",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی",
      "بەشی وردبینی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": "بەشی وردبینی",
    "refCode": "TECH-505",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-07-27"
  },
  {
    "id": 90,
    "subject": "داواکاری نوێکردنەوەی تۆماری بازرگانی بۆ ساڵی نوێ - هاتوو (890)",
    "sender": "کۆمپانیای کۆڕەک تیلی کۆم",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": null,
    "refCode": "HR-77",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-07-29"
  },
  {
    "id": 91,
    "subject": "بانگهێشتنامەی بەشداریکردن لە پیشانگای نێودەوڵەتی تەکنەلۆژیا - هاتوو (891)",
    "sender": "ژووری بازرگانی و پیشەسازی",
    "department": "بەشی دارایی",
    "departments": [
      "بەشی دارایی"
    ],
    "dept1": "بەشی دارایی",
    "dept2": null,
    "refCode": "1a",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-08-15"
  },
  {
    "id": 92,
    "subject": "نووسراوی فەرمی کۆمپانیای دابینکەری هێڵی ئینتەرنێت - هاتوو (892)",
    "sender": "فەرمانگەی تەندروستی سلێمانی",
    "department": "بەشی کارگێڕی",
    "departments": [
      "بەشی کارگێڕی",
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی کارگێڕی",
    "dept2": "بەشی لۆجستی",
    "refCode": "2",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-08-22"
  },
  {
    "id": 93,
    "subject": "ئاگادارکردنەوە سەبارەت بە پشکنینی وەرزی باڵەخانەکان - هاتوو (893)",
    "sender": "بەڕێوەبەرایەتی تۆماری کۆمپانیاکان",
    "department": "بەشی یاسایی",
    "departments": [
      "بەشی یاسایی",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی یاسایی",
    "dept2": "بەشی پەیوەندییەکان",
    "refCode": "3",
    "letterType": "نووسراوی ئاسایی",
    "sentDate": "2026-08-23"
  },
  {
    "id": 94,
    "subject": "داواکاری تەرخانکردنی نوێنەر بۆ لیژنەی باڵای هەماهەنگی - هاتوو (894)",
    "sender": "ئەنجومەنی وەزیران - فەرمانگەی هەماهەنگی",
    "department": "بەشی تەکنیکی",
    "departments": [
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنیکی",
    "dept2": null,
    "refCode": "4",
    "letterType": "ڕاپۆرت",
    "sentDate": "2026-09-01"
  },
  {
    "id": 95,
    "subject": "نووسراوی دەستەی دەستپاکی سەبارەت بە ڕێکارە داراییەکان - هاتوو (895)",
    "sender": "کۆمپانیای نەوتی باکوور",
    "department": "بەشی سەرچاوە مرۆییەکان",
    "departments": [
      "بەشی سەرچاوە مرۆییەکان",
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی سەرچاوە مرۆییەکان",
    "dept2": "بەشی پەیوەندییەکان",
    "refCode": "5",
    "letterType": "پێشنیار",
    "sentDate": "2026-09-03"
  },
  {
    "id": 96,
    "subject": "پێشنیاری گرێبەستی خزمەتگوزاری لەلایەن کەرتی تایبەتەوە - هاتوو (896)",
    "sender": "بەڕێوەبەرایەتی گشتی گومرگ",
    "department": "بەشی پەیوەندییەکان",
    "departments": [
      "بەشی پەیوەندییەکان"
    ],
    "dept1": "بەشی پەیوەندییەکان",
    "dept2": null,
    "refCode": "6",
    "letterType": "ئاگاداری",
    "sentDate": "2026-09-05"
  },
  {
    "id": 97,
    "subject": "نووسراوی وەزارەت سەبارەت بە ڕێنماییە نوێیەکانی پەیوەندی - هاتوو (897)",
    "sender": "وەزارەتی گواستنەوە و گەیاندن",
    "department": "بەشی لۆجستی",
    "departments": [
      "بەشی لۆجستی"
    ],
    "dept1": "بەشی لۆجستی",
    "dept2": null,
    "refCode": "7",
    "letterType": "داواکاری کاندیدکردن",
    "sentDate": "2026-09-10"
  },
  {
    "id": 98,
    "subject": "داواکاری هاوئاهەنگی بۆ پڕۆژەی تۆڕی نیشتمانی - هاتوو (898)",
    "sender": "پارێزگای سلێمانی",
    "department": "بەشی وردبینی",
    "departments": [
      "بەشی وردبینی",
      "بەشی سەرچاوە مرۆییەکان"
    ],
    "dept1": "بەشی وردبینی",
    "dept2": "بەشی سەرچاوە مرۆییەکان",
    "refCode": "8",
    "letterType": "داواکاری زیاد کردنی ڕاژە",
    "sentDate": "2026-09-11"
  },
  {
    "id": 99,
    "subject": "ئاگاداری لە پارێزگاوە سەبارەت بە مەرجەکانی ژینگەپارێزی - هاتوو (899)",
    "sender": "بەڕێوەبەرایەتی باجەکان",
    "department": "سەرپەرشتیاری گشتی",
    "departments": [
      "سەرپەرشتیاری گشتی"
    ],
    "dept1": "سەرپەرشتیاری گشتی",
    "dept2": null,
    "refCode": "9",
    "letterType": "داواکاریی گۆڕانکاریی پۆست",
    "sentDate": "2026-09-14"
  },
  {
    "id": 100,
    "subject": "داواکاری پێشکەشکردنی داتای ئاماری لەلایەن دەستەی ئامار - هاتوو (900)",
    "sender": "بانکی ناوەندی هەرێم",
    "department": "بەشی تەکنەلۆژیای زانیاری",
    "departments": [
      "بەشی تەکنەلۆژیای زانیاری",
      "بەشی تەکنیکی"
    ],
    "dept1": "بەشی تەکنەلۆژیای زانیاری",
    "dept2": "بەشی تەکنیکی",
    "refCode": "10",
    "letterType": "فەرمانی کارگێڕی",
    "sentDate": "2026-09-20"
  }
];
