export interface SLACalculationInput {
  sentDate?: string | Date | null;
  responseDate?: string | Date | null;
  processingTime?: number | string | null;
  slaTime?: string | null;
  letterType?: string | null;
  refCode?: string | null;
  [key: string]: any;
}

export const calculateSLA = <T extends SLACalculationInput>(row: T): T => {
  let pTime = row.processingTime;
  let sTime = row.slaTime;

  // Auto-calculate processingTime if sentDate exists
  if (row.sentDate) {
    const start = new Date(row.sentDate);
    // If responseDate is set, use it. If not set (ongoing letter), calculate up to current date!
    const end = row.responseDate ? new Date(row.responseDate) : new Date();
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const diff = end.getTime() - start.getTime();
      pTime = Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
    }
  }

  // Auto-calculate SLA status based on Excel Column M formula
  if (pTime !== null && pTime !== undefined && pTime !== "") {
    const pTimeNum = typeof pTime === 'string' ? parseInt(pTime, 10) : pTime;
    if (!isNaN(pTimeNum)) {
      const lType = row.letterType || "";
      const rCode = String(row.refCode || "").trim().toLowerCase();

      if (rCode === "2" || lType === "داواکاری کاندیدکردن") {
        if (pTimeNum > 12) sTime = "زیاتر لە 12 ڕۆژ";
        else if (pTimeNum >= 8) sTime = "بەپێی کاتی ڕێنمایی";
        else sTime = "کەمتر لە 8 ڕۆژ";
      } 
      else if (rCode === "4" || lType === "داواکاری زیاد کردنی ڕاژە") {
        if (pTimeNum > 15) sTime = "زیاتر لە 15 ڕۆژ";
        else if (pTimeNum >= 12) sTime = "بەپێی کاتی ڕێنمایی";
        else sTime = "کەمتر لە 12 ڕۆژ";
      } 
      else if (rCode === "7" || lType === "داواکاریی گۆڕانکاریی پۆست") {
        if (pTimeNum > 12) sTime = "زیاتر لە 12 ڕۆژ";
        else if (pTimeNum >= 8) sTime = "بەپێی کاتی ڕێنمایی";
        else sTime = "کەمتر لە 8 ڕۆژ";
      } 
      else if (rCode === "1a") {
        if (pTimeNum > 10) sTime = "زیاتر لە 10 ڕۆژ";
        else if (pTimeNum >= 5) sTime = "کەمتر لە 10 ڕۆژ";
        else sTime = "کەمتر لە5 ڕۆژ";
      } 
      else {
        if (pTimeNum > 15) sTime = "زیاتر لە 15 ڕۆژ";
        else if (pTimeNum >= 5) sTime = "بەپێی کاتی ئاسایی بۆ نووسراوی گشتیی";
        else sTime = "کەمتر لە 5 ڕۆژ";
      }
    }
  } else {
    sTime = "-";
  }

  return { ...row, processingTime: pTime, slaTime: sTime };
};
