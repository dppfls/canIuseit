const express = require('express');
const router = express.Router();
const axios = require('axios');
const calendarController = require('../controllers/calendarController');

// POST 라우트: 클라이언트에서 전달된 캘린더 이벤트를 저장 및 네이버 캘린더에 동기화
router.post('/', async (req, res) => {
  try {
    // Full Calendar 일정 저장 로직 실행
    await calendarController.calendar(req, res);

    const accessToken = req.session.accessToken;

    if (!accessToken) {
      return res.status(401).json({ error: 'You need to log in via Naver first' });
    }

    // iCalendar 데이터 생성
    const { title, start, end } = req.body;
    const uid = accessToken.substring(0, 15);
    const scheduleIcalString = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:Naver Calendar\nCALSCALE:GREGORIAN\nBEGIN:VTIMEZONE\nTZID:Asia/Seoul\nBEGIN:STANDARD\nDTSTART:19700101T000000\nTZNAME:GMT+09:00\nTZOFFSETFROM:+0900\nTZOFFSETTO:+0900\nEND:STANDARD\nEND:VTIMEZONE\nBEGIN:VEVENT\nUID:${uid}\nDTSTART;TZID=Asia/Seoul:${start}\nDTEND;TZID=Asia/Seoul:${end}\nSUMMARY:${title}\nEND:VEVENT\nEND:VCALENDAR`;

    // 네이버 캘린더에 일정 추가
    const response = await axios.post(
      'https://openapi.naver.com/calendar/createSchedule.json',
      {
        calendarId: 'defaultCalendarId',
        scheduleIcalString: scheduleIcalString,
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.result === 'success') {
      res.status(200).json({ message: 'Event successfully saved and synced with Naver Calendar.' });
    } else {
      res.status(500).json({ error: 'Failed to sync with Naver Calendar.' });
    }
  } catch (error) {
    console.error('Error syncing with Naver Calendar:', error);
    res.status(500).json({ error: 'An error occurred while saving the event.' });
  }
});

module.exports = router;
