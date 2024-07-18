const schedule = [
    { start: "09:00", end: "09:41", lesson: "1. Ders" },
    { start: "09:41", end: "09:50", lesson: "Teneffüs Arası" },
    { start: "09:50", end: "10:31", lesson: "2. Ders" },
    { start: "10:31", end: "10:40", lesson: "Teneffüs Arası" },
    { start: "10:40", end: "11:21", lesson: "3. Ders" },
    { start: "11:21", end: "11:30", lesson: "Teneffüs Arası" },
    { start: "11:30", end: "12:11", lesson: "4. Ders" },
    { start: "12:11", end: "12:59", lesson: "Öğle Arası" },
    { start: "13:00", end: "13:41", lesson: "5. Ders" },
    { start: "13:41", end: "13:50", lesson: "Teneffüs Arası" },
    { start: "13:50", end: "14:31", lesson: "6. Ders" },
    { start: "14:31", end: "23:59", lesson: "Gün Sonu" }
];

export const getCurrentLesson = () => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    for (let i = 0; i < schedule.length; i++) {
        const { start, end, lesson } = schedule[i];
        if (currentTime >= start && currentTime < end) {
            return { lesson, nextUpdate: new Date(`${now.toDateString()} ${end}`) };
        }
    }
    return { lesson: "Şu an ders yok", nextUpdate: new Date(`${now.toDateString()} 09:00`).setDate(now.getDate() + 1) };
};

export const getLessonIndex = (lesson) => {
    return schedule.findIndex((s) => s.lesson === lesson);
};
