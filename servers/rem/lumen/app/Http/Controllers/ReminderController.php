<?php

namespace App\Http\Controllers;

use App\Reminder;
use Illuminate\Http\Request;

class ReminderController extends Controller
{

    public function showAllReminders()
    {
        return response()->json(Reminder::all());
    }

    public function showOneReminder($id)
    {
        return response()->json(Reminder::find($id));
    }

    public function create(Request $request)
    {
        $Reminder = Reminder::create($request->all());

        return response()->json($Reminder, 201);
    }

    public function update($id, Request $request)
    {
        $Reminder = Reminder::findOrFail($id);
        $Reminder->update($request->all());

        return response()->json($Reminder, 200);
    }

    public function delete($id)
    {
        Reminder::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}