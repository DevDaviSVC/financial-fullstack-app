import { useState } from "react"
import useAddItem from "../../hooks/useAddItem";
import { useDashboardContext } from "../../contexts/dashboardContext";

export default function AddItemForm () {
    const {dashboard} = useDashboardContext();
    const [item, setItem] = useState({
        name: "",
        value: 0,
        type: "profit"
    });
    const {addItem, loading} = useAddItem();

    const handleChange = (e) => {
        setItem({...item, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addItem(item);
    };

    return (
        <div className="bg-slate-700 bg-opacity-50 p-4 rounded-lg">
            <h3 className="mb-4 text-xl font-medium">Add new item to the dashboard</h3>
            <form className="flex gap-4 items-end flex-wrap" onSubmit={handleSubmit}>
                <div>
                    <label className="label label-text">Name</label>
                    <input 
                        className="input input-sm" 
                        name="name"
                        type="text"
                        value={item.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="label label-text">Value</label>
                    <input 
                        className="input input-sm" 
                        name="value"
                        type="number"
                        value={item.value}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="label label-text">Type</label>
                    <select name="type" className="select select-sm" onChange={handleChange} defaultValue={"profit"}>
                        <option value="profit">Profit</option>
                        <option value="debit">Debit</option>
                    </select>
                </div>
                <button className="btn btn-sm btn-info">
                    {loading ? <span className="loading loading-spin"></span> : "Add item"}
                </button>
            </form>
        </div>
    )
}