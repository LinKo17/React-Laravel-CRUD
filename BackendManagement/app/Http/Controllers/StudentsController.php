<?php

namespace App\Http\Controllers;

use App\Models\Students;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use PHPUnit\Framework\MockObject\Builder\Stub;

class StudentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __construct()
    {
        return  $this->middleware('auth:sanctum');
    }
    public function index()
    {
        $students = Students::all();
        return response()->json(["students" => $students], 200);
        // return response()->json($students,200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $message = [
            "required" => "The :attribute field is required"
        ];

        $validator = Validator::make($request->all(), [
            'name' => "required",
            'phone' => ["required", "numeric"],
            'class' => "required",
            'register' => "required"
        ], $message);

        if ($validator->fails()) {
            return response()->json(['error_message' => $validator->errors(), 'msg' => "fail"]);
        } else {
            $student = new Students();
            $student->name = request()->name;
            $student->phone =  request()->phone;
            $student->class = request()->class;
            $student->registed_by = request()->register;
            $student->save();
            return response()->json(['student' => $student, 'msg' => 'success']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $student = Students::find($id);
        if ($student) {
            // return "no error";
            return response()->json(["msg" => "no error","student" => $student], 200);
        } else {
            // return "error";
            return response()->json(['msg' => 'error'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = validator(request()->all(),[
            "name" => "required",
            "phone" => ["required", "numeric"],
            "class" => "required",
            'register' => "required"
        ]);
        if($validator->fails()){
            return response()->json(["msg" => "edit fail","error"=>$validator->errors()]);
        }
        $student = Students::find($id);
        $student->name = request()->name;
        $student->phone = request()->phone;
        $student->class = request()->class;
        $student->registed_by = request()->register;
        $student->save();
        return response()->json(["msg" => "edit success","student"=>$student]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $student = Students::findorFail($id);
        $student->delete();
        return response()->json(["msg" => "delete"]);
    }
}
