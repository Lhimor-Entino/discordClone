<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    //

    public function role_change(Request $request)
    {

        $member = Member::where('user_id', $request->user_id)->where("server_id", $request->server_id)->first();
        $member->update([
            'member_role' => $request->role
        ]);
    }

    public function kick(Request $request)
    {
        $member = Member::where('user_id', $request->user_id)->where("server_id", $request->server_id)->first();
        $member->delete();
    }
}
