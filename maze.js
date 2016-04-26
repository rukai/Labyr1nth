function init() {
    flipper = 0;

    newGame();

    document.addEventListener('keydown', function(event) {
        keyDown(event.keyCode);
    });
    document.addEventListener('keyup', function(event) {
        keyUp(event.keyCode);
    });
}

function newGame() {
    map = [
        // Key:
        //   - empty
        // x - wall
        // p - Player
        // g - grue
        // f - finish
        ['x','x','x','x','x','x','x',' ',' ',' '],
        ['x',' ','x','x',' ',' ','x',' ','x',' '],
        ['x',' ',' ','x',' ','x','x',' ',' ',' '],
        ['x',' ',' ',' ',' ','x','x',' ','x','x'],
        ['x',' ',' ','x',' ',' ',' ',' ',' ','x'],
        ['x','x',' ','x','x',' ','x','x',' ','g'],
        ['x','g',' ',' ','x',' ','x','x','x','x'],
        ['x','x','x',' ','x',' ',' ',' ','x','x'],
        ['x','x','f',' ','g',' ','p',' ','x','x'],
        ['x','x','x','x','x',' ',' ',' ',' ',' '],
    ]
    
    clearInterval(flipper);
    disable_movement = false;
    player_x = -1;
    player_y = -1;
    for (y = 0; y < map.length; y++) {
        for (x = 0; x < map[y].length; x++) {
            if (map[y][x] == 'p') {
                player_y = y;
                player_x = x;
            }
        }
    }
    console.assert(player_x != -1 && player_y != -1);
    game_over = false;
    pixel = false;
    left_held = false;
    up_held = false;
    right_held = false;
    down_held = false;
    draw_pixel();
}

function move() {
    if (left_held) {
        if (location_empty(player_x-1, player_y))
            player_x--;
        else
            pixel = true;
    }
    else if (up_held) {
        if (location_empty(player_x, player_y-1))
            player_y--;
        else
            pixel = true;
    }
    else if (right_held) {
        if (location_empty(player_x+1, player_y))
            player_x++;
        else
            pixel = true;
    }
    else if (down_held) {
        if (location_empty(player_x, player_y+1))
            player_y++;
        else
            pixel = true;
    }

    if (map[player_y][player_x] == 'f')
        win();
    else if (map[player_y][player_x] == 'g')
        lose();

    console.log(player_x + ", " + player_y);
}

function keyDown(dir) {
    if (dir == 82) {
        newGame();
    }

    if (left_held || up_held || right_held || down_held || game_over)
        return;

    if (dir == 37) {
        left_held = true;
    }
    else if (dir == 38) {
        up_held = true;
    }
    else if (dir == 39) {
        right_held = true;
    }
    else if (dir == 40) {
        down_held = true;
    }
    
    move();
    draw_pixel();
}

function keyUp(dir) {
    if (game_over)
        return;

    if (dir == 37 && left_held) {
        left_held = false;
    }
    else if (dir == 38 && up_held) {
        up_held = false;
    }
    else if (dir == 39 && right_held) {
        right_held = false;
    }
    else if (dir == 40 && down_held) {
        down_held = false;
    }
    else {
        return;
    }

    pixel = false;
    draw_pixel();
}

function location_empty(x, y) {
    if (y >= map.length || y < 0 || x >= map[y].length || x < 0)
        return false;
    return map[y][x] != 'x';
}

function win() {
    game_over = true;
    pixel = true;
}

function lose() {
    game_over = true;
    flipper = setInterval(flip_pixel, 300);
}

function flip_pixel() {
    pixel = !pixel;
    draw_pixel();
}

function draw_pixel() {
    if (pixel)
        document.body.style.background = "#000000";
    else
        document.body.style.background = "#FFFFFF";
}

window.onload = init;
