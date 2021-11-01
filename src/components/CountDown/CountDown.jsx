import { useEffect, useState } from "react";
import WeekendForm from "./WeekendForm";

function CountDown() {
    const [currentTime, setCurrentTime] = useState();
    const [weekendTime, setWeekendTime] = useState();
    const [countDown, setCountDown] = useState();

    const DAYS = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    const MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    function getUserWeekend() {
        return localStorage.getItem("weekendTime");
    }

    function getWeekendData() {
        const dateObj = new Date();
        const userWeekendTime = getUserWeekend();
        const todaysDay = dateObj.getDay();
        const daysUntilWeekend = 5 - todaysDay;
        let year = dateObj.getFullYear();
        let month = getMonthForWeekend();
        let date = dateObj.getDate() + daysUntilWeekend;
        let hours = 16,
            minutes = 0;
        if (userWeekendTime) {
            const hoursMinutesArr = userWeekendTime.split(":");
            hours = +hoursMinutesArr[0];
            minutes = +hoursMinutesArr[1];
        }
        return { year, month, date, hours, minutes };
    }

    function getDaysUntilWeekend() {
        getDateForWeekend();
        const { year, month, date, hours, minutes } = getWeekendData();
        const dateObj = new Date();
        const now = dateObj.getTime();
        const weekend = new Date(year, month, date, hours, minutes);
        const timeUntilWeekend = weekend.getTime() - now;
        setWeekendTime(formatTimeToString(weekend));
        return timeUntilWeekend;
    }

    function formatTimeToString(time) {
        return `${DAYS[time.getDay() - 1]} ${formatTime(
            time.getHours()
        )}:${formatTime(time.getMinutes())}:${formatTime(time.getSeconds())}`;
    }

    function getDaysInMonth(year, month) {
        // Month in JavaScript is 0-indexed (January is 0, February is 1, etc),
        // but by using 0 as the day it will give us the last day of the prior
        // month. So passing in 1 as the month number will return the last day
        // of January, not February
        return new Date(year, month, 0).getDate();
    }

    // Check to see if weekend is next month
    function getMonthForWeekend() {
        let monthForWeekend;
        // Get current date
        const todaysDateObject = new Date();
        monthForWeekend = todaysDateObject.getMonth();
        const dateForWeekend = getDateForWeekend();

        // IF dateForweekend 5 and todaysDateObject is 29 --> weekend is next month
        // If date for weekend is 25 and current date is 23, weekend is this month

        if (dateForWeekend < todaysDateObject.getDate()) {
            monthForWeekend = todaysDateObject.getMonth() + 1;
        }
        console.log(
            monthForWeekend,
            dateForWeekend,
            todaysDateObject.getDate()
        );
        // Get length of month
        return monthForWeekend;
    }

    function getDateForWeekend() {
        // Get current date
        // Get length of month
        let dateForWeekend;
        const todaysDateObject = new Date();
        const daysInCurrentMonth = getDaysInMonth(
            todaysDateObject.getFullYear(),
            todaysDateObject.getMonth() + 1
        );
        const currentDay = todaysDateObject.getDay();
        const currentDate = todaysDateObject.getDate();
        const weekend = 5;
        const daysUntilWeekend = weekend - currentDay;
        dateForWeekend = currentDate + daysUntilWeekend;
        if (currentDate + daysUntilWeekend > daysInCurrentMonth) {
            // Example: today is monday 29th of November and weekend is 3d of November
            // Weekend = (29 + 4) - 30 = 3 Of december is weekend

            dateForWeekend =
                currentDate + daysUntilWeekend - daysInCurrentMonth;
        }
        return dateForWeekend;
    }

    // Gets the time until weekend in ms
    function formatCountDown(distance) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        return (
            days +
            "d " +
            hours +
            "h " +
            minutes +
            "m " +
            seconds +
            "s until weekend!"
        );
    }

    function formatTime(time) {
        let timeString = time;
        if (time < 10) {
            timeString = `0${time}`;
        }
        return timeString;
    }

    useEffect(() => {
        const timeInterval = setInterval(() => {
            const now = new Date();
            const currentTimeString = formatTimeToString(now);
            setCurrentTime(currentTimeString);
            const countDownTime = getDaysUntilWeekend();
            if (countDownTime > 0) {
                setCountDown(formatCountDown(getDaysUntilWeekend()));
            } else {
                setCountDown("It is weekend!");
            }
        }, 1000);
        return () => clearInterval(timeInterval);
    }, []);

    return (
        <div>
            <h1>{countDown}</h1>
            <hr />
            <h4>Today it is </h4>
            <p>{currentTime}</p>
            <hr />
            <h4>Weekend</h4>
            <p>{weekendTime}</p>

            <WeekendForm />
        </div>
    );
}
export default CountDown;
