// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs } = require("firebase/firestore");

const app = express();
const PORT = 3000;

// Firebase 설정
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Firebase 초기화
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

app.use(cors());
app.use(express.json());

// 앨범 저장
app.post('/albums', async (req, res) => {
    const { image, title, date, content } = req.body;
    try {
        await addDoc(collection(db, "albums"), { image, title, date, content });
        res.json({ success: true, message: "앨범 저장 성공!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 앨범 가져오기
app.get('/albums', async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, "albums"));
        const albums = querySnapshot.docs.map(doc => doc.data());
        res.json(albums);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


$("#postingbtn").click(async function () {
    let image = $('#image').val();
    let title = $('#title').val();
    let date = $('#date').val();
    let content = $('#content').val();

    let doc = {
        'image': image,
        'title': title,
        'date': date,
        'content': content
    };
    await addDoc(collection(db, "albums"), doc);
    alert('저장완료');
    window.location.reload();
})

let url = 'http://spartacodingclub.shop/sparta_api/seoulair';
fetch(url).then(res => res.json()).then(data => {
    let mise = data['RealtimeCityAir']['row'][0]['IDEX_NM'];
    $('#msg').text(mise);
})

$('#savebtn').click(async function () {
    $('#postingbox').toggle();
})

let docs = await getDocs(collection(db, "albums"));
docs.forEach((doc) => {
    let row = doc.data();
    console.log(row);

    let image = row['image'];
    let title = row['title'];
    let date = row['date'];
    let content = row['content'];

    let temp_html = `
            <div class="col">
                <div class="card h-100">
                    <img src="${image}"
                        class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${content}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-body-secondary">${date}</small>
                    </div>
                </div>
            </div>`;

    $('#card').append(temp_html);
});

console.log(API_KEY);
let num = 109;

let areas = {
    '서울 및 수도권': 109,
    '경상남도': 159,
    '경상북도': 143,
    '전라남도': 156,
    '전라북도': 146,
    '충청남도': 133,
    '충청북도': 131,
    '강원도': 105,
    '제주도': 184
}

const selectElement = document.getElementById('area');

// 딕셔너리 내용을 <option> 요소로 추가
for (const [areaName, value] of Object.entries(areas)) {
    const option = document.createElement('option');
    option.value = value; // 값으로 딕셔너리의 value를 사용
    option.textContent = areaName; // 화면에 보이는 텍스트로 key를 사용
    selectElement.appendChild(option);
}
//let weather_url = `http://apis.data.go.kr/1360000/VilageFcstMsgService/getWthrSituation?
//serviceKey=${API_KEY}&numOfRows=10&pageNo=1&dataType=JSON&stnId=${num}`;
//fetch(weather_url).then(res => res.json()).then(data => {
//console.log(data);
//})