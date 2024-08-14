const Calendar = require('../models/Calendar');


/*캘린더 이벤트 저장 (POST 요청): /calendar 에서 처리.
캘린더 이벤트 조회 (GET 요청): /calendar/events 에서 처리*/
exports.calendar = async (req, res) => {
    try {
        const userId = req.user.id; // 세션 또는 인증된 유저 정보에서 가져옴
        const events = Array.isArray(req.body) ? req.body : [req.body];

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

exports.getCalendarEvents = async (req, res) => {
    try {
        const userId = req.user.id; // 현재 로그인한 유저의 ID
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
