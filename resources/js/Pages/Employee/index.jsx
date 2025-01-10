import { useState } from "react";
import { router } from "@inertiajs/react";

// query = ค่าของการค้นหาที่ส่งกลับมาจาก Controller
// employees = ข้อมูลพนักงานที่ส่งกลับมาจาก Controller

export default function Index({
    employees,
    query,
    orderColumn,
    orderDirection,
}) {
    // setsearch เผื่อให้ค้นหาอัตโนมัติ ไม่ต้องคลิกปุ่ม enter
    const [search, setSearch] = useState(query || "");
    const [sortColumn, setSortColumn] = useState(orderColumn || "id"); //เรียงจาก id
        const [sortDirection, setSortDirection] = useState(
            orderDirection || "asc" //เรียงจากน้อยไปมาก
        );

    const handleSearch = (e) => {
        // break เพื่อให้มันทำงานฟังก์ชันด้านล่าง แล้วค่อยไป
        e.preventDefault();
        // search คือค่าที่เราพิมพ์ในช่อง input
        router.get("/employee", {
            search,
            order_column: sortColumn,
            order_direction: sortDirection,
        });

    };

    const handleSort = (column) => {
        const newDirection =
            sortColumn === column && sortDirection === "asc" ? "desc" : "asc"; //ถ้าเรากดครั้งที่ 2 จะเปลี่ยนจากน้อยไปมากเป็นมากไปน้อย
        setSortColumn(column); 
        setSortDirection(newDirection); 
        router.get("/employee", {
            search,
            order_column: column, 
            order_direction: newDirection, 
        });
    };

    return (
        <div className="bg-slate-100 min-h-screen p-4">
            <h1 className="flex justify-center my-5 font-bold font-serif text-3xl">
                - Employee List -
            </h1>

            <form
                from
                onSubmit={handleSearch} //เมื่อกดปุ่ม search จะค้นหา Employee ที่ต้องการในฟังก์ชัน handleSearch
                className="flex justify-self-center"
            >
                {/* แสดงช่องค้นหา และปุ่มค้นหา */}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-md  w-80 mr-5"
                    placeholder="ค้นหาชื่อพนักงานที่คุณต้องการ..."
                />
                <button
                    type="submit"
                    className="bg-sky-900 hover:bg-sky-700 text-white py-2 px-4 rounded-md"
                >
                    Search
                </button>
            </form>

            <br />
            {employees.data.length === 0 ? (
                <p className="flex justify-center text-2xl font-bold my-4">
                    ไม่พบข้อมูลที่คุณค้นหา
                </p>
            ) : (
                <div className="flex justify-center items-center">
                    <table className="table-auto border-collapse border border-gray-200 ">
                        <thead>
                            <tr className="bg-sky-700  text-white font-serif">
                                {[
                                    "emp_no",
                                    "first_name",
                                    "last_name",
                                    "gender",
                                    "birth_date",
                                ].map((column) => (
                                    <th
                                        key={column}
                                        className="px-10 py-2 border border-sky-950 cursor-pointer"
                                        style={{ width: "250px" }}
                                        onClick={() => handleSort(column)}
                                    >
                                        {column.replace("_", " ").toUpperCase()} 
                                        {sortColumn === column && (
                                            <span>
                                                {sortDirection === "asc"
                                                    ? " ▲"
                                                    : " ▼"}
                                            </span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="table-auto mb-5 mt-3 justify-center">
                            {employees.data.map((employee, index) => (
                                <tr key={index}>
                                    <td className="px-10 py-2 border bg-sky-100 border-sky-200">
                                        {employee.emp_no}
                                    </td>
                                    <td className="px-10 py-2 border bg-sky-50 border-sky-200">
                                        {employee.first_name}
                                    </td>
                                    <td className="px-10 py-2 border bg-sky-100 border-sky-200">
                                        {employee.last_name}
                                    </td>
                                    <td className="px-10 py-2 border bg-sky-50 border-sky-200">
                                        {employee.gender == "M"
                                            ? "Male"
                                            : "Female"}
                                    </td>
                                    <td className="px-4 py-2 border bg-sky-100 border-sky-200">
                                        {employee.birth_date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex justify-around space-x-4 mt-6">
                <button
                    className="bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded w-28"
                    disabled={!employees.prev_page_url}
                    onClick={() =>
                        (window.location.href = employees.prev_page_url)
                    }
                >
                    Previous
                </button>
                <span className="text-sky-900 font-semibold font-serif">
                   - Page {employees.current_page} of {employees.last_page} -
                </span>
                <button
                    className="bg-sky-500 hover:bg-sky-400 text-white py-2 px-4 rounded w-28"
                    disabled={!employees.next_page_url}
                    onClick={() =>
                        (window.location.href = employees.next_page_url)
                    }
                >
                    Next
                </button>
            </div>
        </div>
    );
}
