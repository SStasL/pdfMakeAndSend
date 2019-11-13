let username,
    password,
    txt1,
    txtPosition,
    txt2,
    txt3,
    txt4,
    dateIn,
    dateOut,
    transport,
    transportCost,
    hotelCost,
    dayPayment,
    typeOfCar,
    typeOfCarToPrint,
    ticketsFile,
    noTickets;

let transportObj = document.getElementById("transport");
let noTicketsObj = document.querySelector("#noTickets");


let now = new Date().toLocaleString('uk', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

//Изменение стиля для для отображения и скрытия поля типа автомобиля
transportObj.addEventListener("change", function() {
    let transportCost = document.getElementsByClassName("transportCostStytle");
    transportCost[0].style.display = "block";
    transportCost[1].style.display = "block";
    let typeOfCar = document.getElementById("typeOfCarStytle");
    typeOfCar.style.display = "none";
    if (transport = document.getElementById("transport").value == "Автомобілем") {
        transportCost[0].style.display = "none";
        transportCost[1].style.display = "none";
        typeOfCar.style.display = "block";
    } else {
        transportCost[0].style.display = "block";
        transportCost[1].style.display = "block";
        typeOfCar.style.display = "none";
    }
});

//Изменение стиля для для отображения и скрытия поля для загрузки билетов
noTicketsObj.addEventListener("change", function() {
    noTicketsStyle = document.querySelector(".noTicketsStytle");
    noTicketsStyle.style.display = "block";

    if (noTicketsObj.checked) {
        noTicketsStyle.style.display = "none";
    } else {
        noTicketsStyle.style.display = "block";
    }
});


function dateInterval(dateInput, dateOutput) {
    dateInput = dateInput;
    let year1 = dateInput.slice(0, 4);
    let month1 = parseInt(dateInput.slice(5, 7)) - 1;
    let day1 = dateInput.slice(8, 10);

    dateOutput = dateOutput;
    let year2 = dateOutput.slice(0, 4);
    let month2 = parseInt(dateOutput.slice(5, 7)) - 1;
    let day2 = dateOutput.slice(8, 10);

    let date1 = new Date(year1, month1, day1);

    let date2 = new Date(year2, month2, day2);

    let result = Math.round((((date2 - date1) / (1000 * 60 * 60)) / 24) + 1);
    if (result >= 1) {
        return result;
    } else {
        alert('ПОМИЛКА ДАТИ');
        return 'ПОМИЛКА ДАТИ';
    }
}

function createData() {
    username = document.getElementById("inEmail").value;
    password = document.getElementById("inPassword").value;
    txt1 = document.getElementById("in1").value;
    txtPosition = document.getElementById("position").value;
    txt2 = document.getElementById("in2").value;
    txt3 = document.getElementById("in3").value;
    txt4 = document.getElementById("in4").value;
    dateIn = document.getElementById("dateIn").value;
    dateOut = document.getElementById("dateOut").value;
    duration = dateInterval(dateIn, dateOut);
    postfix = createPostfix(duration);
    transport = document.getElementById("transport").value;
    transportCost = document.getElementById("transportCost").value;
    hotelCost = document.getElementById("hotelCost").value;
    dayPayment = document.getElementById("dayPayment").value;
    typeOfCar = document.getElementById("typeOfCar").value;
    ticketsFile = document.querySelector('#ticketsFile').files[0];
}

function createPostfix(duration) {
    duration = duration;
    //Массив для доба
    mass1 = [1, 21, 31, 41, 51, 61, 71, 81, 91, 101];
    //Массив для доби
    mass2 = [2, 3, 4, 22, 23, 24, 32, 33, 34,
        42, 43, 44, 52, 53, 54,
        62, 63, 64, 72, 73, 74,
        82, 83, 84, 92, 93, 94,
        102, 103, 104
    ];
    if (mass1.includes(duration)) {
        return 'доба';
    } else if (mass2.includes(duration)) {
        return 'доби';
    } else {
        return 'діб';
    }
}

function usePdf(base64Data) {
    console.log(base64Data);
}

function createReport() {
    //Для правильного вывода типа транспорта
    if (transport == "Автомобілем") {
        typeOfCarToPrint = typeOfCar;
        transportCost = 0;
    } else {
        typeOfCarToPrint = "";
    }
    var docInfo = {
        info: {
            title: 'Текстовый документ PDF',
            author: 'Stas',
            subject: 'Theme',
            keywords: 'Ключевые слова'
        },

        pageSize: 'A4',
        pageOrientation: 'portrait', //'portrait' 'landscape'
        pageMargins: [50, 50, 30, 60],

        header: function(currentPage, pageCount) {
            return {
                //text: '',// text: currentPage.toString() + ' из ' + pageCount,
                image: 'data:image/png;base64,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',
                // aligment: 'right',
                margin: [20, 20, 10, 50]
            }
        },

        footer: [{
            text: '',
            aligment: 'center' //'left' 'right'
        }],

        styles: {
            header: {
                fontSize: 25,
                bold: true,
                italics: true,
                aligment: 'right'
            },
            varTxt: {
                fontSize: 14,
                bold: false,
                italics: true
            }
        },

        content: [{
                columns: [{
                        width: '30%',
                        text: ''
                    },
                    {
                        width: '30%',
                        text: ''
                    },
                    {
                        width: '40%',
                        text: '«ПОГОДЖЕНО»',
                        alignment: 'center'
                    }
                ],
            },

            {
                columns: [{
                        width: '30%',
                        text: ''
                    },
                    {
                        width: '30%',
                        text: ''
                    },
                    {
                        width: '40%',
                        text: 'Директор ТОВ «ЕКСТРІМ ЛТД»',
                        alignment: 'center'
                    }
                ]
            },

            {
                columns: [{
                        width: '30%',
                        text: ''
                    },
                    {
                        width: '30%',
                        text: ''
                    },
                    {
                        width: '40%',
                        text: '\n' + '___________________________',
                        alignment: 'center'
                    }
                ]
            },

            {
                columns: [{
                        width: '30%',
                        text: ''
                    },
                    {
                        width: '30%',
                        text: ''
                    },
                    {
                        width: '40%',
                        text: 'В.А. Немировський',
                        alignment: 'right'
                    }
                ]
            },

            {
                columns: [{
                        width: '30%',
                        text: ''
                    },
                    {
                        width: '30%',
                        text: ''
                    },
                    {
                        width: '40%',
                        text: '\n' + now,
                        alignment: 'center'
                    }
                ]
            },

            {
                margin: [0, 100, 0, 0],
                columns: [{
                    width: '100%',
                    fontSize: 20,
                    bold: true,
                    text: 'Завдання-кошторис',
                    alignment: 'center'
                }]
            },

            {
                margin: [0, 50, 0, 0],
                columns: [{
                        width: '40%',
                        fontSize: 14,
                        bold: false,
                        text: 'На відрядження:',
                        alignment: 'left'
                    },

                    {
                        style: 'varTxt',
                        width: '60%',
                        fontSize: 14,
                        bold: false,
                        text: txt1,
                        alignment: 'left'
                    }
                ]
            },

            {
                columns: [{
                        width: '40%',
                        fontSize: 14,
                        bold: false,
                        text: 'Посада:',
                        alignment: 'left'
                    },

                    {
                        style: 'varTxt',
                        width: '60%',
                        fontSize: 14,
                        bold: false,
                        text: txtPosition,
                        alignment: 'left'
                    }
                ]
            },

            {
                columns: [{
                        width: '40%',
                        fontSize: 14,
                        bold: false,
                        text: 'На підприємство:',
                        alignment: 'left'
                    },

                    {
                        style: 'varTxt',
                        width: '60%',
                        fontSize: 14,
                        bold: false,
                        text: txt2,
                        alignment: 'left'
                    }
                ]
            },

            {
                columns: [{
                        width: '40%',
                        fontSize: 14,
                        bold: false,
                        text: 'Адреса відрядження:',
                        alignment: 'left'
                    },

                    {
                        style: 'varTxt',
                        width: '60%',
                        fontSize: 14,
                        bold: false,
                        text: txt3,
                        alignment: 'left'
                    }
                ]
            },

            {
                columns: [{
                        width: '40%',
                        fontSize: 14,
                        bold: false,
                        text: 'Мета відрядження:',
                        alignment: 'left'
                    },

                    {
                        style: 'varTxt',
                        width: '60%',
                        fontSize: 14,
                        bold: false,
                        text: txt4,
                        alignment: 'left'
                    }
                ]
            },

            {
                columns: [{
                        width: '40%',
                        fontSize: 14,
                        bold: false,
                        text: 'Термін відрядження:',
                        alignment: 'left'
                    },

                    {
                        style: 'varTxt',
                        width: '60%',
                        fontSize: 14,
                        bold: false,
                        text: duration + ' ' + postfix,
                        alignment: 'center'
                    }
                ]
            },

            {
                columns: [{
                        width: '40%',
                        fontSize: 14,
                        bold: false,
                        text: 'Дата вибуття/прибуття:',
                        alignment: 'left'
                    },

                    {
                        columns: [{
                                style: 'varTxt',
                                width: '50%',
                                fontSize: 14,
                                bold: false,
                                text: dateIn,
                                alignment: 'center'
                            },

                            {
                                style: 'varTxt',
                                width: '50%',
                                fontSize: 14,
                                bold: false,
                                text: dateOut,
                                alignment: 'center'
                            },
                        ]
                    },
                ]
            },

            {
                columns: [{
                        width: '40%',
                        fontSize: 14,
                        bold: false,
                        text: 'Проїзд до місця' + '\n' + 'відрядження здійснюється:',
                        alignment: 'left'
                    },

                    {
                        style: 'varTxt',
                        width: '60%',
                        fontSize: 14,
                        bold: false,
                        text: '\n' + transport + ' ' + typeOfCarToPrint,
                        alignment: 'left'
                    }
                ]
            },

            {
                margin: [0, 30, 0, 0],
                columns: [{
                    width: '100%',
                    fontSize: 20,
                    bold: true,
                    text: 'Кошторис витрат',
                    alignment: 'center'
                }]
            },

            {
                table: {
                    widths: [200, 70, 75, 45, 75],
                    body: [
                        ['Найменування витрат', 'Од. виміру', 'Ціна за од. виміру, грн.', 'Кіл-ть', 'Сума, грн.'],
                        ['Проживання', 'доба', hotelCost, (duration - 1), (hotelCost * (duration - 1))],
                        ['Проїзд', 'грн', transportCost, '', transportCost],
                        ['Добові', 'доба', dayPayment, duration, (dayPayment * duration)]
                    ]
                }
            },

            {
                margin: [0, -1, 0, 0],
                table: {
                    widths: [417, 75],
                    body: [
                        ['Всього:', (parseInt(hotelCost * (duration - 1)) + parseInt(transportCost) + parseInt(dayPayment * duration))]
                    ]
                }
            },

            {
                columns: [{
                        width: '30%',
                        text: '\n\n'
                    },
                    {
                        width: '30%',
                        text: '\n\n'
                    },
                    {
                        width: '40%',
                        text: '\n\n'
                    }
                ]
            },

            {
                columns: [{
                        width: '50%',
                        text: txtPosition
                    },
                    {
                        width: '30%',
                        text: '___________________________',
                        alignment: 'right'
                    },
                    {
                        width: '20%',
                        text: txt1,
                        alignment: 'right'
                    }
                ]
            }
        ]
    };
    let pdfDocGenerator = pdfMake.createPdf(docInfo);
    let promiseObject = pdfDocGenerator.getBase64((base64Data) => {});
    promiseObject.then(function(resultMoney) {
        if (!noTickets) {
            toBase64(ticketsFile).then(function(resultInputFile) {
                console.log(resultInputFile);
                console.log(resultMoney);
                console.log(noTickets);
                send2(resultMoney, "Кошторис", resultInputFile, "Квитки");
            })
        } else {
            send1(resultMoney, "Кошторис");
        }
    });
}

function send1(sendFile1, nameOfSendFile1) {
    Email.send({
        Host: "mailServer",
        Username: username,
        Password: password,
        To: 'recipient@gmail.com',
        From: "sender",
        Subject: "Відрядження " + txt1,
        Body: "<h1><font color='red'>" + txt1 + " їде у відрядження</font><h1><hr>",
        Attachments: [{
                name: nameOfSendFile1 + ".pdf",
                data: sendFile1
            },
            {
                name: nameOfSendFile2 + ".pdf",
                data: sendFile2
            }
        ]
    }).then(
        message => alert(message)
    );
}


function send2(sendFile1, nameOfSendFile1, sendFile2, nameOfSendFile2) {
    Email.send({
        Host: "mailServer",
        Username: username,
        Password: password,
        To: 'recipient@gmail.com',
        From: "sender",
        Subject: "Відрядження " + txt1,
        Body: "<h1><font color='red'>" + txt1 + " їде у відрядження</font><h1><hr>",
        Attachments: [{
                name: nameOfSendFile1 + ".pdf",
                data: sendFile1
            },
            {
                name: nameOfSendFile2 + ".pdf",
                data: sendFile2
            }
        ]
    }).then(
        message => alert(message)
    );
}


//преобразование файла полкченного через input в base64
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});