const express = require('express');
const router = express.Router();
const axios = require('axios');
const calendarController = require('../controllers/calendarController');

// POST 라우트: 클라이언트에서 전달된 캘린더 이벤트를 저장
router.post('/calendar', calendarController.calendar);

// 캘린더 이벤트 조회
router.get('/calendar/events', calendarController.getCalendarEvents);


// 네이버 캘린더 API에서 이벤트를 가져오는 GET 라우트
router.get('/naver/events', async (req, res) => {
  const accessToken = req.session.accessToken;

  if (!accessToken) {
    return res.status(401).json({ error: 'You need to log in via Naver first' });
  }

  try {
    const response = await axios.get('https://openapi.naver.com/calendar/api/v1/events', {  // 네이버 API 엔드포인트 사용
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const events = response.data.items.map(item => ({
      title: item.title,
      start: item.start,
      end: item.end
    }));

    res.json(events);  // 클라이언트에 이벤트 데이터 반환
  } catch (error) {
    console.error('Error fetching events from Naver API:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

module.exports = router;
