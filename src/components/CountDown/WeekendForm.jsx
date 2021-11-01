import { useEffect, useState } from "react";

function WeekendForm() {
    const [date, setDate] = useState(new Date());
    function submitHandler() {
        console.log(date);
        localStorage.setItem("weekendTime", date);
    }

    useEffect(() => {
        const localDate = localStorage.getItem("weekendTime");
        if (localDate) {
            setDate(localDate);
        }
    }, []);

    return (
        <div>
            <h4>Add your weekend</h4>
            <div className="my-3">
                <label>When is weekend?</label>
                <input
                    className="form-control"
                    type="time"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div>
                <button
                    onClick={submitHandler}
                    className="btn btn-primary btn-block"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
export default WeekendForm;
