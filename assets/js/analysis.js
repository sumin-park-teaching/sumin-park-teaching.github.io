// 1. 본문에서 단어들의 배열을 얻기
function getWords(text) {
    return text
        .toLowerCase()
        .replace(/[.,!?;:'"‘’“”()\[\]_*]/g, " ")
        .split(/\s+/)
        .filter(w => w.length > 0);
}

// 2. 단어들의 배열에서 불용어를 제거한 배열 얻기
function removeStopwords(words, stopwords) {
    return words.filter(w => !stopwords.includes(w));
}

// 3. 단어들의 배열을 {단어: 빈도} 꼴의 객체로 만들기
function countWords(words) { // words: 단어들의 배열
    const counts = {}; // 빈 객체 초기화
    for (const word of words) {
        counts[word] = (counts[word] || 0) + 1;
    }
    return counts;
}

// 4. {단어: 빈도} 객체에서 상위 n개의 배열 얻기
function topN(counts, n) { // counts: 객체
    return Object.entries(counts) // 객체 --> 배열로 변환
        .sort((a, b) => b[1] - a[1]) // 빈도가 높은 순서대로 정렬
        .slice(0, n); // 상위 n개
}

// top: 상위 n개의 배열
function drawChart(selector, top, color) {
    const canvas = document.querySelector(selector);
    return new Chart(canvas, {
        type: "bar",
        data: {
            labels: top.map(item => item[0]), // 단어
            datasets: [{
                label: "빈도",
                data: top.map(item => item[1]), // 빈도
                backgroundColor: color // 색깔
            }]
        },
        options: {
            indexAxis: "y", // 가로로 긴 막대
            maintainAspectRatio: false, // 비율 보존 안 함 --> 아래로 긴 그림
            scales: {
                x: { beginAtZero: true }, // 막대그래프 옵션: 0부터 시작
                y: { ticks: { autoSkip: false } }
            }
        }
    });
}