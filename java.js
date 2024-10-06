document.addEventListener("DOMContentLoaded", function () {
    const bingoCard = document.getElementById("bingo-card");
    const generateCardBtn = document.getElementById("generate-card");
    const resetCardBtn = document.getElementById("reset-card");
    const bingoStatus = document.getElementById("bingo-status");

    const generateBingoCard = () => {
        const numbers = generateBingoNumbers();
        bingoCard.innerHTML = "";
        let numberIndex = 0;

        for (let row = 0; row < 5; row++) {
            const tr = document.createElement("tr");
            for (let col = 0; col < 5; col++) {
                const td = document.createElement("td");
                if (row === 2 && col === 2) {
                    td.innerHTML = "Free";
                    td.classList.add("marked"); // Mark the center as free
                } else {
                    td.innerHTML = numbers[numberIndex++];
                    td.addEventListener("click", markNumber);
                }
                tr.appendChild(td);
            }
            bingoCard.appendChild(tr);
        }
    };

    const generateBingoNumbers = () => {
        const bingoNumbers = [];
        while (bingoNumbers.length < 24) {
            const num = Math.floor(Math.random() * 75) + 1;
            if (!bingoNumbers.includes(num)) {
                bingoNumbers.push(num);
            }
        }
        return bingoNumbers;
    };

    const markNumber = (event) => {
        const td = event.target;
        if (!td.classList.contains("marked")) {
            td.classList.add("marked");
            checkForBingo();
        }
    };

    const resetCard = () => {
        const cells = document.querySelectorAll("td");
        cells.forEach(cell => cell.classList.remove("marked"));
        bingoStatus.innerHTML = "";
    };

    const checkForBingo = () => {
        const rows = bingoCard.getElementsByTagName("tr");
        const cols = [[], [], [], [], []];
        const markedRows = [];

        for (let i = 0; i < rows.length; i++) {
            const tds = rows[i].getElementsByTagName("td");
            let markedRow = true;

            for (let j = 0; j < tds.length; j++) {
                cols[j].push(tds[j]);

                if (!tds[j].classList.contains("marked")) {
                    markedRow = false;
                }
            }
            markedRows.push(markedRow);
        }

        const diagonal1 = [rows[0].cells[0], rows[1].cells[1], rows[2].cells[2], rows[3].cells[3], rows[4].cells[4]];
        const diagonal2 = [rows[0].cells[4], rows[1].cells[3], rows[2].cells[2], rows[3].cells[1], rows[4].cells[0]];

        if (
            markedRows.includes(true) ||
            cols.some(col => col.every(cell => cell.classList.contains("marked"))) ||
            diagonal1.every(cell => cell.classList.contains("marked")) ||
            diagonal2.every(cell => cell.classList.contains("marked"))
        ) {
            bingoStatus.innerHTML = "Bingo!";
        }
    };

    generateCardBtn.addEventListener("click", generateBingoCard);
    resetCardBtn.addEventListener("click", resetCard);

    // Generate a card on page load
    generateBingoCard();
});
