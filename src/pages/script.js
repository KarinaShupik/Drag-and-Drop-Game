const rows = 5;
const cols = 5;

const numImages = 25;

let usedImages = [];

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const table = document.getElementById('imageTable').getElementsByTagName('tbody')[0];
for (let i = 0; i < rows; i++) {
    const row = table.insertRow();
    for (let j = 0; j < cols; j++) {
        const cell = row.insertCell();
        let randomImageIndex;
        do {
            randomImageIndex = getRandomInt(1, numImages);
        } while (usedImages.includes(randomImageIndex));
        usedImages.push(randomImageIndex);
        const img = document.createElement('img');
        img.src = `${randomImageIndex}.jpg`;
        img.alt = `Image ${randomImageIndex}`;
        img.id = 'draggable';
        cell.appendChild(img);
    }
}


const cellEl = document.getElementById('cell');

const randomImageIndexCell = getRandomInt(1, numImages);

cellEl.style.backgroundImage = `url(${randomImageIndexCell}.jpg)`;
cellEl.id = "droppable"

$(function() {
    $('#imageTable img').draggable({
        revert: true // Snap back to original position if not dropped in droppable
    });

    $('#restartButton').on('click', function() {
        location.reload();
      });

    // Make cell_match droppable
    $('#cell_match').droppable({
        drop: function(event, ui) {
            const droppedImageId = parseInt(ui.draggable.attr('src').match(/(\d+)\.jpg/)[1]); // Extract the image ID
            
            if (droppedImageId === randomImageIndexCell) {
                alert('You win!');
            } else {
                alert('Try again!');
            }
            
            resetGame();
        }
    });

    function resetGame() {
        // Clear the cell_match
        $('#cell').empty();
        $('#cell').css('background-image', '');

        // Shuffle images in imageTable
        $('#imageTable img').each(function() {
            $(this).css({ top: 0, left: 0 }); // Reset position
        });
    }
});



          

  
