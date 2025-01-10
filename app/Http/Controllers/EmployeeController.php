<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {   

        // ปรับ query ให้สามารถค้นหาข้อมูลได้
        $query = $request->input('search');  //หาข้อความได้ทั้งชื่อfirstnameหรือนามสกุลlastname

        $orderColumn = $request->input('order_column', 'emp_no');  //เรียงข้อมูลตามคอลัมน์ emp_no
        $orderDirection = $request->input('order_direction', 'asc'); //เรียงข้อมูลจากน้อยไปมาก

        $employees = DB::table('employees') //ดึงข้อมูลจากฐานข้อมูล -> เรียกใช้ตาราง employees
        ->Where('first_name', 'like', '%' . $query . '%') //ค้นหาfirst_nameลจาก query ที่เราใส่ คำสั่งคล้าย where ใน sql
        ->orWhere('last_name', 'like', '%' . $query . '%') //หรือค้นหาlast_nameจาก query ที่เราใส่
        ->orWhere('emp_no', '=' , $query)
        ->orWhere('gender', '=' , $query)
        ->orderBy($orderColumn, $orderDirection) //เรียงข้อมูลตาม orderColumn และ orderDirection
        ->paginate(10) //แบ่งข้อมูลที่ดึงมาออกเป็นหน้าๆ โดยแสดง 10 รายการต่อหน้า
        ->appends([
            'search' => $query,
            'order_column' => $orderColumn,
            'order_direction' => $orderDirection,
        ]);

        return Inertia::render('Employee/index', [
            'employees' => $employees, //รายการพนักงานที่ดึงมา แล้วแบ่งหน้า
            'query' => $query, //คำที่ผู้ใช้ป้อนใน search
            'hasResults' => $employees->total() > 0, //ตรวจสอบว่ามีข้อมูลหรือไม่ เช่น ค้นหาพนักงานแล้วไม่เจอ
            'orderColumn' => $orderColumn, //คอลัมน์ที่ใช้เรียงข้อมูล
            'orderDirection' => $orderDirection, //ทิศทางการเรียงข้อมูล เช่น asc หรือ desc
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
