
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
                //console.log(data.reservations[i]);
                var text = `<tr>                    
                <td class="id">${data.reservations[i].id}</td>
                <td>${data.reservations[i].columns[2]}</td>
                <td>${data.reservations[i].startdate}</td>
                <td>${data.reservations[i].starttime}</td>
                <td>${data.reservations[i].endtime}</td>
                <td>${data.reservations[i].columns[7]}</td>
                <td class="info"><input type="text" disabled></td>
                </tr>`;

                $("#currentLessons").append(text);
               
                lesson.push({
                    "id": data.reservations[i].id,
                    "location": data.reservations[i].columns[2],
                    "startdate": data.reservations[i].startdate,
                    "starttime": data.reservations[i].starttime,
                    "endtime": data.reservations[i].endtime,
                    "description": data.reservations[i].columns[7],
                    "info": ""
                });
            }
        });
     
    } else {
    console.log("stop");
    }
}

function enableEdit() {
    var inputs = document.getElementsByClassName('info');
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].firstChild.disabled = false;
    }
}

function saveLessons() {
    var table = document.getElementById('currentLessons');
    // debugger;
    for(let row of table.rows) {
        // console.log(row);
        const id = row.querySelector('.id').innerHTML;
        let infoElement = row.querySelector('.info input');
        infoElement.disabled = true;
        let info = infoElement.value;

        for (let i = 0; i < lesson.length; i++) {
            if (id == lesson[i].id) {
                lesson[i].info = info;
            }
        }
    }

    console.log(lesson);
}


async function pushLesson() {
    const lessonList = await data.reservations.push({
        "Id": data.reservations[i].id,
        "Location": data.reservations[i].columns[2],
        "Startdate": data.reservations[i].startdate,
        "Starttime": data.reservations[i].starttime,
        "Endtime": data.reservations[i].endtime,
        "Description": data.reservations[i].columns[7],
        "Info": ""
    });

    window.alert(lessonList);
}