<?php

use App\Http\Controllers\StudentsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource("/students", StudentsController::class);

Route::post("/login", function () {
    // ----------------------------------------
    $validator = validator(request()->all(), [
        "email" => "required",
        "password" => "required"
    ]);

    if ($validator->fails()) {
        return response()->json(["msg" => "fail", "error" => $validator->errors()]);
    }
    // ----------------------------------------
    $email = request()->email;
    $password = request()->password;

    $user = User::where("email", $email)->first();
    if ($user) {
        if (password_verify($password, $user->password)) {
            return response()->json(["msg" => "fine", "token" => $user->createToken("api")->plainTextToken,"user" => $user]);
        }
    }
    return response()->json(["msg" => "fail", "exit" => "fail"]);
});

Route::post("/register", function () {
    $validator = validator(request()->all(), [
        "name" => ["required", "string", "min:6", "max:50"],
        "email" => ["required", "string", "email", "unique:users"],
        "password" => ["required", "string", "min:8", "max:12"],
        "conpassword" => ["required", "string", "same:password"],
    ]);


    if($validator->fails()){
        return response()->json(["msg"=> "fail","error" => $validator->errors()]);
    }

    $user = new User();
    $user->name  = request()->name;
    $user->email = request()->email;
    $user->password = Hash::make(request()->password);
    $user->save();
    // return response()->json(["msg"=> "success",]);
    return response()->json(["msg" => "success", "token" => $user->createToken("api")->plainTextToken,"user" => $user]);
});

Route::middleware('auth:sanctum')->delete('/logout', function(Request $request) {
    $request->user()->tokens()->delete();

    return ['msg' => 'success'];
});
