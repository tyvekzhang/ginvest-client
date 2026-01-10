export const formatAccounting = (value: any) => {
    if (value === null || value === undefined || value === '') return "-";

    // 将字符串转换为数字进行格式化
    const num = parseFloat(value);
    if (isNaN(num)) return value;

    return new Intl.NumberFormat('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
};