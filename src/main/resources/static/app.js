axios.defaults.headers.common['Authorization'] = "Bearer 3755~2k3u907tQT0DHEdWQWhjOe1thoYyJQvmHvB4U9X9WqRsUbDJItcKqS7toy9j90se";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const lesson = [];

function fetchData() {
    let currentLessons = document.getElementById('currentLessons').rows.length;
    if(currentLessons === 0) {
        let timeEditUrl = document.getElementById('timeEditUrl').value.replace('.html', '.json');

        if (!timeEditUrl.endsWith('.json')) timeEditUrl = timeEditUrl.concat('.json');  

       // window.alert(timeEditUrl);
       // https://cloud.timeedit.net/ltu/web/schedule1/ri105656X45Z0XQ6Z36g1Y40y3036Y32107gQY6Q547520876YQ83.html

        $.getJSON(timeEditUrl, function (data) {
            for (let i = 0; i < data.reservations.length; i++) {
                var text = `<tr>                    
                <td class="id">${data.reservations[i].id}</td>
                <td class="title"><input type="text" value="${data.reservations[i].columns[1]}" disabled></td>
                <td>${data.reservations[i].columns[2]}</td>
                <td>${data.reservations[i].startdate}</td>
                <td>${data.reservations[i].starttime}</td>
                <td>${data.reservations[i].endtime}</td>
    
                <td class="info"><input type="text" disabled></td>
                </tr>`;

                $("#currentLessons").append(text);
               
                lesson.push({
                    "id": data.reservations[i].id,
                    "title": data.reservations[i].columns[2],
                    "location": data.reservations[i].columns[2],
                    "startdate": data.reservations[i].startdate,
                    "starttime": data.reservations[i].starttime,
                    "endtime": data.reservations[i].endtime,

                    "info": ""
                });
            }
            // Hiding Id-column
            $('.id').hide();
        });
     
    } else {
    console.log("stop");
    }
}

function enableEdit() {
    const infoInput = document.getElementsByClassName('info');
    for(var i = 0; i < infoInput.length; i++) {
        infoInput[i].firstChild.disabled = false;
    }

    const title = document.getElementsByClassName('title');
    for(var i = 0; i < title.length; i++) {
        title[i].firstChild.disabled = false;
    }
}

function saveLessons() {
    var table = document.getElementById('currentLessons');
    for(let row of table.rows) {
        // Looping through all tables rows
        const id = row.querySelector('.id').innerHTML;
        let infoElement = row.querySelector('.info input');
        infoElement.disabled = true;
        let info = infoElement.value;

        let titleElement = row.querySelector('.title input');
        titleElement.disabled = true;
        let title = titleElement.value;

        // Saving info input to to lesson array
        for (let i = 0; i < lesson.length; i++) {
            if (id == lesson[i].id) {
                lesson[i].info = info;
                lesson[i].title = title;
            }
        }
    }
}

function postToCanvas () {
    //get params from lesson
    for (let i = 0; i < lesson.length; i++ ) {
        const params = new URLSearchParams();
        params.append('calendar_event[context_code]', 'user_79408');
        params.append('calendar_event[start_at]', lesson[i].startdate + 'T' + lesson[i].starttime + ':00'); //2023-01-10T10:15:00
        params.append('calendar_event[end_at]', lesson[i].startdate + 'T' + lesson[i].endtime + ':00'); //2023-01-10T12:00:00
        params.append('calendar_event[title]', lesson[i].title);
        params.append('calendar_event[location_name]', lesson[i].location);
        params.append('calendar_event[description]', lesson[i].info);

        // https://cors-anywhere.herokuapp.com/corsdemo
        const cors_proxy_url = "https://cors-anywhere.herokuapp.com/";
        const canvas_api_url = "https://ltu.instructure.com/api/v1/calendar_events.json";
        axios.post(cors_proxy_url + canvas_api_url, params)
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
    }

}
   // location.reload();