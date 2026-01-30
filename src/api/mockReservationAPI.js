import dayjs from "dayjs";

export const TIMESLOTS = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

export function getAvailableTimeslots(date) {
    if (!date) return [];

    const selectedDate = dayjs(date, "DD/MM/YYYY");

    const isToday = selectedDate.isSame(dayjs(), "day");

    if (!isToday) return TIMESLOTS;

    const minValidTime = dayjs().add(30, "minutes");

    return TIMESLOTS.filter((slot) => {
        const [h, m] = slot.split(":");
        const slotTime = dayjs().set("hour", parseInt(h)).set("minute", parseInt(m)).set("second", 0);

        return slotTime.isAfter(minValidTime) || slotTime.isSame(minValidTime);
    });
}

export async function searchAvailability({ guests, date, time, tableLocation }) {
    // Giả lập mạng chậm
    await new Promise((resolve) => setTimeout(resolve, 200));

    // 1. Lọc bàn đủ sức chứa + vị trí
    const tables = TABLES.filter((table) => table.capacity >= guests && (table.location === tableLocation || tableLocation === "All"));

    // Không có bàn nào đủ chỗ
    if (tables.length === 0) {
        return {
            found: false,
            otherOption: [],
            reason: "NO_TABLE_CAPACITY",
        };
    }

    // Hàm kiểm tra bàn có trống giờ đó không
    const isSameDate = (mockDate, inputDate) => dayjs(mockDate, "DD/MM/YYYY").isSame(dayjs(inputDate, "DD/MM/YYYY"), "day");

    const isTableAvailable = (tableId, slot) => {
        const reservation = RESERVATIONS.find((b) => b.tableId === tableId && isSameDate(b.date, date));

        if (!reservation) return true;

        return !reservation.time.includes(slot);
    };

    // 2. Kiểm tra giờ người dùng chọn có bàn trống không
    const availableNow = tables.find((table) => isTableAvailable(table.id, time));

    if (availableNow) {
        return {
            found: true,
            table: availableNow,
            date,
            time,
            heldMinutes: 5,
        };
    }

    // 3. Nếu không có → tìm các khung giờ khác còn trống
    const availableSlot = getAvailableTimeslots(date);

    const alternatives = availableSlot
        .filter((slot) => slot !== time)
        .map((slot) => {
            const freeTable = tables.find((table) => isTableAvailable(table.id, slot));
            return freeTable
                ? {
                      table: freeTable,
                      time: slot,
                  }
                : null;
        })
        .filter(Boolean);

    return {
        found: false,
        otherOption: alternatives,
        reason: "NO_TABLE_THIS_TIME",
    };
}
