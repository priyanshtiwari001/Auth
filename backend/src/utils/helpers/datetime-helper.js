function comparedateTime(timeString1,timeString2){
    const departureTime = new Date(timeString1);
    const arrivalTime = new Date(timeString2);

    return departureTime.getTime() < arrivalTime.getTime();

}

module.exports={
    comparedateTime
}