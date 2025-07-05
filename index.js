let count = 0;

const countDisplay = document.getElementById('count');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');
const clearBtn = document.getElementById("clearBtn");

increaseBtn.addEventListener('click', () => { //click () => = Take action when click
    count++;
    countDisplay.textContent = count;
});

decreaseBtn.addEventListener('click', () => { //click () => = Take action when click
    if(count > 0){
        count--;
        countDisplay.textContent = count;
    }
    else{
        alert("ตอนนี้ 0 แล้วห้ามกดอีก")
    }
});

clearBtn.addEventListener('click', () => { //click () => = Take action when click
    if(count != 0){
        count = 0;
        countDisplay.textContent = count;
        alert("รีเซ็ตให้เรียบร้อย");
    }
    
    else{
        alert("กดได้แค่ครั้งเดียวเท่านั้น");
    }
})
