var calendar;  // calendar 객체를 전역 변수로 선언

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    // calendar 객체 초기화
    calendar = new FullCalendar.Calendar(calendarEl, {
      height: '700px', // 캘린더 높이 설정
      expandRows: true, // 화면에 맞게 높이 재설정
      slotMinTime: '08:00', // DAY 캘린더에서 시작 시간
      slotMaxTime: '20:00', // DAY 캘린더에서 종료 시간

      customButtons: {
        myCustomButton: {
          text: "일정 추가",
          click: function() {
            // 부트스트랩 모달 열기
            $("#calendarModal").modal("show"); // 모달을 열 때 맞는 ID로 수정
          }
        },// 이벤트 저장 버튼 클릭 시

        mySaveButton: {
          text: "저장",
          click: async function () {
            if (confirm("저장하시겠습니까?")){
              var allEvent = calendar.getEvents();
              const eventData = allEvent.map(event => ({
                alias: event.title,
                start: event.start.toISOString(),
                backgroundColor: event.backgroundColor
              }));
        
              // 이벤트 저장하기
              const saveEvent = await axios.post('/calendar', eventData);
              console.log('Event saved:', saveEvent);
            }
          }
        }
      },

      // 헤더에 표시할 툴바
      headerToolbar: {
        left: 'prev,next today,myCustomButton,mySaveButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      navLinks: true, // 날짜를 클릭하면 그 날짜로 이동
      editable: true, // 이벤트를 드래그할 수 있음
      selectable: true, // 날짜를 클릭하여 선택할 수 있음
      nowIndicator: true, // 현재 시간을 표시
      dayMaxEvents: true, // 하루에 표시할 최대 이벤트 수
      locale: 'ko', // 한국어 로케일 설정



      eventAdd: function(obj) { 
        console.log(obj);
      },
      eventChange: function(obj) { 
        console.log(obj);
      },
      eventRemove: function(obj) { 
        console.log(obj);
      },
      select: function(arg) { 
        var title = prompt('Event Title:');
        if (title) {
          calendar.addEvent({
            title: title,
            start: arg.start,
            end: arg.end,
            allDay: arg.allDay
          });
        }
        calendar.unselect();
      }
    });

    // 페이지 로드 시 이벤트 가져오기
    fetchNaverEvents();
  
    // 캘린더 렌더링
    calendar.render();
});

// 네이버 이벤트를 가져오는 함수 -> 사용자 이벤트를 가져오는 함수로 수정
async function fetchNaverEvents() {
  try {
    const response = await axios.get('/calendar/events');  // 서버에 요청 보내기
    const events = response.data.map(event => ({
      title: event.alias,  // alias를 title로 매핑
      start: event.start,
      backgroundColor: event.backgroundColor,
    }));
    console.log('Fetched events from server:', events); // 추가된 로그
    calendar.addEventSource(events);  // 캘린더에 이벤트 추가
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

