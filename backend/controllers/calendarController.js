const Calendar = require('../models/Calendar');

/* 캘린더 이벤트 저장 (POST 요청): /calendar 에서 처리 */
exports.calendar = async (req, res) => {
    try {
        if (!req.user) {  // req.user가 undefined인지 확인
            return res.status(401).send('Unauthorized');
        }

        const userId = req.user.userId; // userId로 수정
        console.log('Current User ID:', userId);  // userId가 잘 전달되는지 확인
        const events = Array.isArray(req.body) ? req.body : [req.body];
        console.log('Received events:', events); // 디버깅 로그 추가

        for (const event of events) {
            await Calendar.create({
                alias: event.alias,
                start: event.start,
                userId: userId,  // 현재 유저의 ID를 저장
                backgroundColor: event.backgroundColor,
            });
        }
        res.status(200).send('Calendar events created successfully');
    } catch (error) {
        console.error('Error creating calendar events:', error);
        res.status(500).send('Failed to create calendar events');
    }
};

/* 캘린더 이벤트 조회 (GET 요청): /calendar/events 에서 처리 */
exports.getCalendarEvents = async (req, res) => {
    try {
        if (!req.user) {  // req.user가 undefined인지 확인
            return res.status(401).send('Unauthorized');
        }

        console.log('Fetching events for User ID:', req.user.userId);
        const userId = req.user.userId; // userId로 수정
        const events = await Calendar.findAll({
            where: {
                userId: userId // 해당 유저의 일정만 조회
            }
        });
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        res.status(500).send('Failed to fetch calendar events');
    }
};
