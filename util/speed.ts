const setspeed = (spind: number) => {
    let step, scspeed;

    if (spind < 1) spind = 1;
    if (spind > 16) spind = 16;

    switch (spind) {
        case 1:
            step = 1;
            scspeed = 50;
            break;
        case 2:
            step = 2;
            scspeed = 40;
            break;
        case 3:
            step = 2;
            scspeed = 30;
            break;
        case 4:
            step = 2;
            scspeed = 25;
            break;
        case 5:
            step = 2;
            scspeed = 20;
            break;
        case 6:
            step = 3;
            scspeed = 40;
            break;
        case 7:
            step = 3;
            scspeed = 30;
            break;
        case 8:
            step = 3;
            scspeed = 22;
            break;
        case 9:
            step = 3;
            scspeed = 15;
            break;
        case 10:
            step = 3;
            scspeed = 10;
            break;
        case 11:
            step = 4;
            scspeed = 15;
            break;
        case 12:
            step = 5;
            scspeed = 10;
            break;
        case 13:
            step = 5;
            scspeed = 5;
            break;
        case 14:
            step = 7;
            scspeed = 5;
            break;
        case 15:
            step = 10;
            scspeed = 5;
            break;
        case 16:
            step = 10;
            scspeed = 2;
            break;
    }

    return { step,scspeed } as {[key: string]: number};
}

export default setspeed;