document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("searchForm");
    const examRoundSelect = document.getElementById("examRound");
    const scoreInput = document.getElementById("score");
    const methodSelect = document.getElementById("methodSelect");
    const loadingOverlay = document.getElementById("loadingOverlay");
    const outputSection = document.getElementById("outputSection");
    const chartBox = document.getElementById("chartBox");

    const apiExamURL = "https://script.google.com/macros/s/AKfycbz0u9Vdwi6-lApfuQkw-LCqK2XYKXqD1BwdEB2pzWw8LT1Ta5Imda773ZvTo4tbdO6chA/exec";
    const apiScoreURL = "https://script.google.com/macros/s/AKfycbyS-XDebeXE8ds_wpSndA3ftHac6a0l3bZirscr0JSvJ8FzFO-5y9SCi3kDAxLexbHsiw/exec";

    let fetchedExamData = {};
    let scoreData = [];

    // Danh sách top TSA
    const topTSA = [
        { stt: 1, name: 'Vũ Minh Đức', province: 'Bắc Ninh', score: 98.61 },
        { stt: 2, name: 'Nguyễn Đức Minh', province: 'Bắc Ninh', score: 92.69 },
        { stt: 3, name: 'Lê Quảng Minh', province: 'Bắc Ninh', score: 92.56 },
        { stt: 4, name: 'Trương Ngọc Vinh', province: 'Hà Nội', score: 92.02 },
        { stt: 5, name: 'Bùi Thu Hà', province: 'Hải Phòng', score: 91.72 },
        { stt: 6, name: 'Nguyễn Đức Lương', province: 'Nghệ An', score: 91.29 },
        { stt: 7, name: 'Nguyễn Trường Giang', province: 'Vĩnh Phúc', score: 91.19 },
        { stt: 8, name: 'Vũ Hồng Quân', province: 'Vĩnh Phúc', score: 91.13 },
        { stt: 9, name: 'Lê Cao Sơn', province: 'Thanh Hóa', score: 91.06 },
        { stt: 10, name: 'Nguyễn Duy Phong', province: 'Hà Nội', score: 90.54 },
        { stt: 11, name: 'Trần Phú Thọ', province: 'Hà Tĩnh', score: 90.45 },
        { stt: 12, name: 'Phạm Đức Huy', province: 'Hải Phòng', score: 89.87 },
        { stt: 13, name: 'Đào Bá Hùng', province: 'Hải Phòng', score: 89.77 },
        { stt: 14, name: 'Lê Vĩnh Dương', province: 'Thanh Hóa', score: 89.76 },
        { stt: 15, name: 'Lê Vĩnh Phước', province: 'Hà Nội', score: 89.74 },
        { stt: 16, name: 'Bùi Nhật Quang', province: 'Vĩnh Phúc', score: 89.64 },
        { stt: 17, name: 'Lê Minh Đạt', province: 'Hà Nội', score: 88.92 },
        { stt: 18, name: 'Nguyễn Đức Minh', province: 'Bắc Ninh', score: 88.82 },
        { stt: 19, name: 'Vũ Tiến Mười', province: 'Hưng Yên', score: 88.73 },
        { stt: 20, name: 'Phan Trung Kiên', province: 'Nghệ An', score: 88.44 },
        { stt: 21, name: 'Lương Thanh Bình', province: 'Thái Bình', score: 88.34 },
        { stt: 22, name: 'Lê Đức Anh', province: 'Thanh Hoá', score: 88.18 },
        { stt: 23, name: 'Lê Anh Duy', province: 'Quảng Ninh', score: 88.04 },
        { stt: 24, name: 'Nguyễn Đức Trung', province: 'Bắc Ninh', score: 88.02 },
        { stt: 25, name: 'Kiều Anh Văn', province: 'Hà Nội', score: 87.78 },
        { stt: 26, name: 'Đặng Đức Minh', province: 'Hải Dương', score: 87.72 },
        { stt: 27, name: 'Lê Minh Hiếu', province: 'Hưng Yên', score: 87.67 },
        { stt: 28, name: 'Tạ Hữu Cường', province: 'Bắc Ninh', score: 87.35 },
        { stt: 29, name: 'Phạm Ngân An', province: 'Hà Nội', score: 87.18 },
        { stt: 30, name: 'Trịnh Doanh', province: 'Thanh Hóa', score: 87.15 },
        { stt: 31, name: 'Trần Quang Minh', province: 'Hải Dương', score: 87.04 },
        { stt: 32, name: 'Phạm Trần An Huy', province: 'Hà Nội', score: 86.53 },
        { stt: 33, name: 'Nguyễn Đình Hoàng', province: 'Nam Định', score: 86.42 },
        { stt: 34, name: 'Hoàng Đức Đại', province: 'Nam Định', score: 86.26 },
        { stt: 35, name: 'Hoàng Anh Tú', province: 'Thanh Hóa', score: 86.05 },
        { stt: 36, name: 'Phạm Bảo Duy và Trần Việt Dũng', province: 'Nghệ An và Hà Nội', score: 85.9 },
        // { stt: 37, name: 'Phạm Bảo Duy', province: 'Nghệ An', score: 85.9 },
        { stt: 38, name: 'Vũ Việt Tiến', province: 'Thanh Hóa', score: 85.86 },
        { stt: 39, name: 'Nguyễn Trọng Khôi', province: 'Hà Nội', score: 85.7 },
        { stt: 40, name: 'Nguyễn Khánh Nam', province: 'Bắc Giang', score: 85.69 },
        { stt: 41, name: 'Trần Anh Đức', province: 'Hải Dương', score: 85.54 },
        { stt: 42, name: 'Hồ Ngọc Việt', province: 'Nghệ An', score: 85.53 },
        { stt: 43, name: 'Ma Vũ Duy', province: 'Tuyên Quang', score: 85.49 },
        { stt: 44, name: 'Nguyễn Khắc Thành Tôn', province: 'Thanh Hóa', score: 85.49 },
        { stt: 45, name: 'Phạm Ngọc Bảo Duy', province: 'Thanh Hoá', score: 85.43 },
        { stt: 46, name: 'Mai Kim Thái Bảo', province: 'Phú Thọ', score: 85.35 },
        { stt: 47, name: 'Nguyễn Ngọc Quang', province: 'Thái Bình', score: 85.33 },
        { stt: 48, name: 'Nguyễn Hữu Phúc Anh', province: 'Hưng Yên', score: 85.32 },
        { stt: 49, name: 'Nguyễn Trọng Khôi', province: 'Hà Nội', score: 85.23 },
        { stt: 50, name: 'Vũ Minh Hiển', province: 'Hải Phòng', score: 85.21 },
        { stt: 51, name: 'Ngô Trường Giang', province: 'Phú Thọ', score: 85.09 },
        { stt: 52, name: 'Phan Viết Bách', province: 'Bắc Ninh', score: 85.01 },
        { stt: 53, name: 'Nguyễn Cảnh Quân', province: 'Nghệ An', score: 85 },
        { stt: 54, name: 'Phạm Xuân Huy', province: 'Hải Dương', score: 84.98 },
        { stt: 55, name: 'Dương Đăng Khoa', province: 'Hải Phòng', score: 84.76 },
        { stt: 56, name: 'Đinh Quang Khải', province: 'Phú Thọ', score: 84.75 },
        { stt: 57, name: 'Nguyễn Hữu Anh Đức', province: 'Thái Bình', score: 84.74 },
        { stt: 58, name: 'Nguyễn Hoàng Anh', province: 'Hà Nội', score: 84.64 },
        { stt: 59, name: 'Lê Vĩnh Phước', province: 'Hà Nội', score: 84.61 },
        { stt: 60, name: 'Nguyễn Tiến Thành', province: 'Thái Bình', score: 84.54 },
        { stt: 61, name: 'Tăng Phú Quý', province: 'Hải Phòng', score: 84.49 },
        { stt: 62, name: 'Uông Văn Thịnh', province: 'Hà Nội', score: 84.41 },
        { stt: 63, name: 'Chu Quang Minh', province: 'Bắc Ninh', score: 84.29 },
        { stt: 64, name: 'Đinh Xuân Minh', province: 'Hải Phòng', score: 84.28 },
        { stt: 65, name: 'Nguyễn Huy Thành', province: 'Thái Bình', score: 84.09 }
    ];

    // Fetch danh sách phương thức và đợt thi
    fetch(apiExamURL)
        .then(res => res.json())
        .then(data => {
            fetchedExamData = data;
            renderMethodOptions(data);
            // Ẩn 2 ô select: Phương thức và Đợt thi
            methodSelect.style.display = 'none';
            examRoundSelect.style.display = 'none';
        })
        .catch(err => {
            console.error("Lỗi fetch phương thức thi:", err);
            alert("Không thể tải dữ liệu phương thức thi. Vui lòng thử lại sau.");
        });

    // Fetch phổ điểm
    fetch(apiScoreURL)
        .then(res => res.json())
        .then(data => {
            scoreData = data;
        })
        .catch(err => {
            console.error("Lỗi fetch phổ điểm:", err);
            alert("Không thể tải dữ liệu phổ điểm. Vui lòng thử lại sau.");
        });

    function renderMethodOptions(data) {
        methodSelect.innerHTML = '';
        Object.keys(data).forEach(phuongThuc => {
            const opt = document.createElement("option");
            opt.value = phuongThuc;
            opt.textContent = phuongThuc;
            methodSelect.appendChild(opt);
        });
        // Mặc định chọn phương thức và đợt thi
        const defaultMethod = "Điểm Đánh giá Tư duy";
        const defaultExamRound = "TSA (3 đợt 2025)";
        if (data.hasOwnProperty(defaultMethod)) {
            methodSelect.value = defaultMethod;
            renderExamRoundOptions(defaultMethod, defaultExamRound);
        } else {
            const methods = Object.keys(data);
            if (methods.length > 0) {
                methodSelect.value = methods[0];
                renderExamRoundOptions(methods[0]);
            }
        }
    }

    function renderExamRoundOptions(phuongThuc, selectedDotThi = "") {
        const rounds = fetchedExamData[phuongThuc] || [];
        examRoundSelect.innerHTML = '<option value="">Chọn đợt thi</option>';
        rounds.forEach(dotThi => {
            const opt = document.createElement("option");
            opt.value = dotThi;
            opt.textContent = dotThi;
            examRoundSelect.appendChild(opt);
        });
        if (selectedDotThi) {
            examRoundSelect.value = selectedDotThi;
        }
    }

    function findRangeIndex(score, ranges) {
        for (let i = 0; i < ranges.length; i++) {
            const {range, phuongthuc} = ranges[i];
            const [min, max] = range.replace(/s/g, '').split('-').map(Number);

            const isDgnlHCM = phuongthuc.toLowerCase().includes("đgnl hcm");

            if (isDgnlHCM) {
                if (score >= min && score <= max) return i;
            } else {
                if (score > min && score <= max) return i;
            }
        }
        return -1;
    }

    function drawChart(ranges, userScore) {
        const labels = ranges.map(r => r.range);
        const data = ranges.map(r => r.count);
        const userIndex = findRangeIndex(userScore, ranges);
        const backgroundColors = ranges.map((_, idx) => idx === userIndex ? '#1976d2' : '#e74c3c');

        if (window.scoreChart && typeof window.scoreChart.destroy === 'function') {
            window.scoreChart.destroy();
        }

        const ctx = document.getElementById('scoreChart').getContext('2d');
        window.scoreChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Số thí sinh',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: ctx => `${ctx.raw.toLocaleString()} thí sinh`
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 60,
                            minRotation: 45
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: val => val.toLocaleString()
                        }
                    }
                }
            },
            plugins: [{
                id: 'arrowPlugin',
                afterDatasetsDraw: function(chart) {
                    if (userIndex === -1) return; // Không vẽ nếu không tìm thấy điểm của thí sinh
                    const {ctx, chartArea: {top, bottom, left, right}, scales: {x, y}} = chart;

                    // Tính toán vị trí của cột điểm thí sinh
                    const barX = x.getPixelForValue(userIndex);
                    const barY = y.getPixelForValue(data[userIndex]);

                    // Vẽ mũi tên
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(barX, barY - 5); // Điểm bắt đầu của mũi tên (giảm kích thước)
                    ctx.lineTo(barX - 7, barY - 20); // Đường chéo trái (giảm kích thước)
                    ctx.lineTo(barX + 7, barY - 20); // Đường chéo phải (giảm kích thước)
                    ctx.closePath();
                    ctx.fillStyle = '#000'; // Màu đen đậm
                    ctx.fill();

                    // Vẽ thân mũi tên
                    ctx.beginPath();
                    ctx.moveTo(barX, barY - 20);
                    ctx.lineTo(barX - 2, top + 15); // Kéo mũi tên hơi nghiêng sang trái
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#000'; // Màu đen đậm
                    ctx.stroke();
                    ctx.restore();
                }
            }]
        });
    }

    function drawGaugeChart(lowerCount, total, stt = null) {
        // Nếu có stt (topTSA), tính phần trăm theo công thức đặc biệt
        let percent = stt
            ? (total - stt) / total
            : lowerCount / total;

        const ctx = document.getElementById('gaugeChart').getContext('2d');
        if (window.gaugeChart && typeof window.gaugeChart.destroy === 'function') {
            window.gaugeChart.destroy();
        }
        window.gaugeChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [percent, 1 - percent],
                    backgroundColor: ['#1976d2', '#e0e0e0'],
                    borderWidth: 0
                }]
            },
            options: {
                rotation: 0,
                circumference: 360,
                cutout: '75%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                },
            },
            plugins: [{
                id: 'centerText',
                afterDraw: function(chart) {
                    const {ctx, chartArea: {width, height}} = chart;
                    ctx.save();
                    ctx.font = 'bold 38px Segoe UI, Arial';
                    ctx.fillStyle = '#1976d2';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    const percentValue = (chart.data.datasets[0].data[0] * 100).toFixed(2) + '%';
                    ctx.fillText(percentValue, width / 2, height / 2);
                    ctx.restore();
                }
            }]
        });
    }

    function showResult(examType, examRound, score) {
        const ranges = scoreData.filter(item => 
            item.phuongthuc === examType && 
            item.dotthi === examRound
        );

        if (!ranges.length) {
            alert("Không tìm thấy phổ điểm!");
            return;
        }

        // Kiểm tra nếu điểm >= 84.09
        if (score >= 84.09) {
            const found = topTSA.find(item => Math.abs(item.score - score) < 0.01);
            if (!found) {
                alert("Không tồn tại điểm này trên hệ thống!");
                return;
            }
        }

        const idx = findRangeIndex(score, ranges);
        if (idx === -1) {
            alert("Điểm ngoài khoảng phổ điểm!");
            return;
        }

        const range = ranges[idx].range;
        const sameCount = ranges[idx].count;
        const lowerCount = ranges.slice(0, idx).reduce((sum, r) => sum + r.count, 0);
        const higherCount = ranges.slice(idx + 1).reduce((sum, r) => sum + r.count, 0);

        // Hiện output và biểu đồ khi có dữ liệu
        outputSection.style.display = "grid";
        document.getElementById("submittedInfo").style.display = "block";
        document.getElementById("scoreResult").style.display = "block";
        chartBox.style.display = "flex";

        drawChart(ranges, score);

        // Hiện gauge chart
        document.getElementById('gaugeSection').style.display = 'flex';
        drawGaugeChart(lowerCount, 28657);

        // Chúc mừng nếu là Điểm đánh giá tư duy và trùng điểm top TSA
        const congratDivId = 'tsa-congrat';
        let congratDiv = document.getElementById(congratDivId);
        if (congratDiv) congratDiv.remove();

        // Các dòng thống kê
        const rangeRow = document.getElementById('range').parentElement.parentElement;
        const sameCountRow = document.getElementById('sameCount').parentElement.parentElement;
        const lowerCountRow = document.getElementById('lowerCount').parentElement.parentElement;
        const higherCountRow = document.getElementById('higherCount').parentElement.parentElement;

        // Hiện lại các dòng thống kê mặc định
        rangeRow.style.display = '';
        sameCountRow.style.display = '';
        lowerCountRow.style.display = '';
        higherCountRow.style.display = '';

        if (examType.trim().toLowerCase() === 'điểm đánh giá tư duy') {
            const found = topTSA.find(item => Math.abs(item.score - score) < 0.01);
            if (found) {
                // Tạo thông báo chúc mừng, chỉ những thông tin tên, điểm, stt được in đỏ
                congratDiv = document.createElement('div');
                congratDiv.id = congratDivId;
                congratDiv.style.marginTop = '16px';
                congratDiv.style.padding = '12px';
                congratDiv.style.background = '#fffbe6';
                congratDiv.style.border = '1px solid #ffe58f';
                congratDiv.style.borderRadius = '8px';
                congratDiv.style.fontWeight = 'bold';
                congratDiv.style.color = 'rgb(212, 136, 6)'; // Màu chữ mặc định là vàng
                congratDiv.innerHTML = `🎉 Chúc mừng thí sinh <span style="color: red;">${found.name}</span> đến từ ${found.province} đã đạt điểm số <span style="color: red;">${found.score}</span>, đứng thứ <span style="color: red;">${found.stt}</span> toàn quốc!`;
                document.getElementById("scoreResult").appendChild(congratDiv);
                document.getElementById('gaugeSection').style.display = 'flex';
                drawGaugeChart(lowerCount, 28657, found.stt);

                // Hiển thị điểm cho phần "Thông tin bạn vừa nhập"
                document.getElementById("info-score").innerText = score;
                // Ẩn các dòng thông tin thống kê
                rangeRow.style.display = 'none';
                sameCountRow.style.display = 'none';
                lowerCountRow.style.display = 'none';
                higherCountRow.style.display = 'none';
                return;
            }
        }

        // Nếu không phải top TSA thì hiển thị thống kê như cũ
        document.getElementById("range").innerText = range;
        document.getElementById("sameCount").innerText = sameCount.toLocaleString();
        document.getElementById("lowerCount").innerText = lowerCount.toLocaleString();
        document.getElementById("higherCount").innerText = higherCount.toLocaleString();
        document.getElementById("info-type").innerText = "Đại học Bách khoa Hà Nội";
        document.getElementById("info-round").innerText = "Toàn bộ kì thi TSA 2025";
        document.getElementById("info-score").innerText = score;
    }

    function showLoading() {
        loadingOverlay.style.display = "flex";
        setTimeout(() => loadingOverlay.classList.add("active"), 10);
    }

    function hideLoading() {
        loadingOverlay.classList.remove("active");
        setTimeout(() => loadingOverlay.style.display = "none", 500);
    }

    function restoreForm(examType, examRound, score) {
        methodSelect.value = examType;
        renderExamRoundOptions(examType, examRound);
        scoreInput.value = score;
    }

    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const examType = methodSelect.value;
        const examRound = examRoundSelect.value;
        const score = parseFloat(scoreInput.value.trim());

        if (!examType || !examRound || isNaN(score)) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        if (score < 0) {
            alert("Điểm không được nhỏ hơn 0!");
            return;
        }

        showLoading();

        try {
            // Fetch exam data from API
            const examResponse = await fetch(apiExamURL);
            if (!examResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const examData = await examResponse.json();

            // Validate exam round exists in API data
            const validExamRound = examData[examType]?.includes(examRound);
            if (!validExamRound) {
                throw new Error('Invalid exam round');
            }

            hideLoading();
            showResult(examType, examRound, score);
            restoreForm(examType, examRound, score);

        } catch (error) {
            hideLoading();
            console.error('Error:', error);
            alert('Có lỗi xảy ra khi xử lý dữ liệu. Vui lòng thử lại sau.');
        }
    });

    methodSelect.addEventListener('change', function() {
        renderExamRoundOptions(this.value);
    });
});

// Chặn F12, chuột phải, Ctrl+S, Ctrl+P, Ctrl+Shift+I và Ctrl+Shift+J
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (e.keyCode === 123) { // F12
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) { // Ctrl+Shift+I
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) { // Ctrl+Shift+J
        e.preventDefault();
    }
    if (e.ctrlKey && e.keyCode === 83) { // Ctrl+S
        e.preventDefault();
    }
    if (e.ctrlKey && e.keyCode === 80) { // Ctrl+P
        e.preventDefault();
    }
});