document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      height: '700px', //캘린더 높이 설정
      expandRows: true, //화면에 맞게 높이 재설정
      slotMinTime: '08:00', //DAY 캘린더에서 시작 시간
      slotMaxTime: '20:00', //DAY 캘린더에서 종료 시간

      customButtons:{
        myCustomButton:{
            text:"일정 추가",
            click : function(){
                //부트스트랩 모달 열기
                $("#calendarModal").modal("show"); // 여기에 맞는 ID로 수정
            }
        },
        mySaveButton:{
            text:"저장"
        }
      },

      //헤더에 표시할 툴바
      headerToolbar: {
        left: 'prev,next today,myCustomButton,mySaveButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      navLinks: true,
      editable: true,
      selectable: true,
      nowIndicator: true,
      dayMaxEvents: true,
      locale: 'ko',
      eventAdd: function(obj) { 
        console.log(obj);
      },
      eventChange: function(obj) { 
        console.log(obj);
      },
      eventRemove: function(obj){ 
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
          })
        }
        calendar.unselect();
      },
      events: [
        {
          title: 'All Day Event',
          start: '2021-07-01',
        },
        {
          title: 'Long Event',
          start: '2021-07-07',
          end: '2021-07-10'
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2021-07-09T16:00:00'
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2021-07-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2021-07-11',
          end: '2021-07-13'
        },
        {
          title: 'Meeting',
          start: '2021-07-12T10:30:00',
          end: '2021-07-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2021-07-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2021-07-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2021-07-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2021-07-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2021-07-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2021-07-28'
        }
      ]
    });
  
    // 사용자 프로바이더에 따라 캘린더 이벤트 소스 설정
    if (userProvider === 'google') {
      calendar.addEventSource({
        googleCalendarApiKey: 'YOUR_GOOGLE_CALENDAR_API_KEY',
        googleCalendarId: 'primary',
        className: 'gcal-event'
      });
    } else if (userProvider === 'naver') {
      $.ajax({
        url: '/path/to/your/naver/api',
        method: 'GET',
        headers: {
          'Authorization': 'Bearer YOUR_NAVER_ACCESS_TOKEN'
        },
        success: function(data) {
          var events = [];
          data.items.forEach(function(item) {
            events.push({
              title: item.title,
              start: item.start,
              end: item.end
            });
          });
          calendar.addEventSource(events);
        }
      });
    }
  
    // 캘린더 랜더링
    calendar.render();
});
