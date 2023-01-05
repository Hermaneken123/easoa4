
const lesson = [];

function fetchData() {
    let currentLessons = document.getElementById('currentLessons').rows.length;
    if(currentLessons === 0) {
        let timeEditUrl = document.getElementById('timeEditUrl').value.replace('.html', '.json');

        if (!timeEditUrl.endsWith('.json')) timeEditUrl = timeEditUrl.concat('.json');  

       // window.alert(timeEditUrl); 

        $.getJSON(timeEditUrl, function (data) {
            for (let i = 0; i < data.reservations.length; i++) {
                //console.log(data.reservations[i]);
                var text = `<tr>                    
                <td>${data.reservations[i].id}</td>
                <td>${data.reservations[i].columns[2]}</td>
                <td>${data.reservations[i].startdate}</td>
                <td>${data.reservations[i].starttime}</td>
                <td>${data.reservations[i].endtime}</td>
                <td>${data.reservations[i].columns[7]}</td>
                <td class="tcell"><input type="text" disabled></td>
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
            // for(let i=0; i< lesson.length; i++) {
            //     console.log(lesson[i]);
            //     lesson[i].info = "irgor";
           // }   
        });
      
    } else {
    console.log("stop");
    }     
}

function enableEdit() {
    var inputs = document.getElementsByClassName('tcell');
    for(var i = 0; i < inputs.length; i++) {
    inputs[i].firstChild.disabled = false;
   // console.log(inputs[i].firstChild);
    }
}

function saveLessons() {
    var table = document.getElementById('currentLessons');
    var inputs = document.getElementsByClassName('tcell');
    // for(var i = 0; i < table.rows[i]; i++) {
    //     //console.log(table.rows[i]);
    //     if(lesson.info !== "" && currentLessons.id == lesson[id] ) {
    //         lesson[i].info = "gdgdg";
    //     }
        for(let i=0; i< lesson.length; i++) {
            while(lesson.info == !null && currentLessons.id == lesson.id ) {
            lesson.info = '';
        }     
        console.log(lesson.info);
    }
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].firstChild.disabled = true;
    }
    for(let row of table.rows) {
       //console.log(row);
       
        
    }
}

// för varje rad i tabellen där man lägger till ett värde "info" måste man spara id:t från den raden för att kunna matcha mot arrayen(lesson)
// if info != empty check if id=id []lesson
//when match update = lesson[i].info = "";
// därefter måste man loopa igenom lesson-arrayen, matcha id"828528) if id==id []; från tabellen med id från arrayen
// och när de matchar så uppdaterar du info-proertyn med lesson[i].info = "foo" 


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

//storeLesson();
//how to create js object