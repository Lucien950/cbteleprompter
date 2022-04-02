import speedType from "../types/speed"

const minSpeed = 1
const maxSpeed = 19
const setspeed = (spind: number): speedType => {
    let step, scspeed;
    // clamp
    spind = Math.min(Math.max(spind, minSpeed), maxSpeed)
    switch (spind) {
        case 1: step = 1; scspeed = 50; break; // 20 px/sec
        case 2: step = 1; scspeed = 40; break; // 25 px/sec
        case 3: step = 1; scspeed = 33; break; // 33 px/sec
        case 4: step = 1; scspeed = 25; break; // 40 px/sec 
        case 5: step = 2; scspeed = 40; break; // 50 px/sec
        case 6: step = 2; scspeed = 30; break; // 66.6px/sec
        case 7: step = 3; scspeed = 40; break; // 75 px/sec
        case 8: step = 2; scspeed = 25; break; // 80 px/sec
        case 9: step = 2; scspeed = 20; break; // 100 px/sec
        case 10: step = 3; scspeed = 30; break; // 100 px/sec
        case 11: step = 3; scspeed = 22; break; // 136.36 px/sec
        case 12: step = 3; scspeed = 15; break; // 200 px/sec
        case 13: step = 3; scspeed = 10; break;// 300px/sec
        case 14: step = 4; scspeed = 15; break;// 266.66px/sec
        case 15: step = 5; scspeed = 10; break;// 500px/sec
        case 16: step = 5; scspeed = 5; break; // 1000px/sec
        case 17: step = 7; scspeed = 5; break; // 1400px/sec
        case 18: step = 10; scspeed = 5; break;// 2000px/sec
        case 19: step = 10; scspeed = 2; break;// 5000px/sec
    }
    return { step,scspeed } as speedType;
}

export default setspeed;
export { minSpeed, maxSpeed };