<?php

namespace App\Http\Controllers;

use App\Events\MessageUpdateEvent;
use App\Events\NewChatMessageEvent;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($channel_id)
    {
        //
        $messages =  Message::withTrashed()->with(['user'])
            ->where('channel_id', $channel_id)
            ->orderBy("created_at", "desc")
            ->paginate(10);

        return $messages;
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
    public function store(Request $request, $channel_id)
    {
        //
        $request->validate([
            "file" => "mimes:jpeg,png,jpg,webp,pdf"
        ]);
        $new_msg = Message::create([
            "user_id" => Auth::id(),
            'channel_id' => $channel_id,
            "content" => $request->content ?? ""
        ]);

        $file =  $request->file("file");

        if ($file) {
            $file_name = $new_msg->id . "_" . $file->getClientOriginalName();
            $location = "uploads/images/server_" . strval($new_msg->id);
            $path = public_path($location);

            if (!file_exists($path)) {
                File::makeDirectory($path, 0777, true);
            }

            $new_file = $location . "/" . $file_name;


            $request->file("file")->move($path, $new_file);

            $new_msg->update([
                'file' => $new_file
            ]);
        }

        broadcast(new  NewChatMessageEvent($new_msg->load(['user'])));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {

        $request->validate([
            "file" => "mimes:jpeg,png,jpg,webp,pdf"
        ]);

        $msg = Message::find($request->message_id);
        $msg->update([
            'content' => $request->content ?? ""
        ]);

        broadcast(new  MessageUpdateEvent($msg->load(['user'])));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($message_id)
    {
        //
        $msg = Message::find($message_id);
        @unlink(public_path($msg->getAttributes()['file']));

        $msg->delete();
        broadcast(new MessageUpdateEvent(
            Message::with(['user'])
                ->withTrashed()
                ->where("id", $message_id)
                ->first()
        ));
    }
}
