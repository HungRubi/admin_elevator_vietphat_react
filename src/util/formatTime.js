export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // YYYY-MM-DD
}
export function getToday () {
        const today = new Date();
        return formatDate(today);
    }
export function getYesterday() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return formatDate(yesterday);
    }
export function getStartOfWeek() {
        const today = new Date();
        const day = today.getDay();
        const diff = day === 0 ? 6 : day - 1;
        today.setDate(today.getDate() - diff);
        return formatDate(today);
    }
export function getEndOfWeek() {
        const today = new Date();
        const day = today.getDay();
        const diff = day === 0 ? 0 : 7 - day; // tiến tới Chủ nhật
        today.setDate(today.getDate() + diff);
        return formatDate(today);
    }
export function getStartOfMonth() {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1); // ngày đầu tháng
        return formatDate(firstDay);
    }
export function getEndOfMonth() {
        const today = new Date();
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0); // ngày 0 của tháng sau = ngày cuối tháng
        return formatDate(lastDay);
    }
export function getStartOfYear() {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), 0, 1);
        return formatDate(firstDay);
    }
export function getEndOfYear() {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), 11, 31); // 31/12
    return formatDate(lastDay);
}

