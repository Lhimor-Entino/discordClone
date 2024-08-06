<?php

namespace App\Http\Controllers;

use App\Events\DirectMessageUpdateEvent;
use App\Events\NewChatMessageEvent;
use App\Events\NewDirectMessageEvent;
use App\Models\Channel;
use App\Models\Conversation;
use App\Models\DirectMessage;
use App\Models\Member;
use App\Models\Server;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($conversation_id)
    {
        //

        $conversation = Conversation::findOrFail($conversation_id);
        if ($conversation->initiator_id !== Auth::id() && $conversation->receiver_id !== Auth::id()) {
            return abort(403);
        }

        $member =  Member::where('user_id', Auth::id())->first();
        $server =  Server::findOrFail($member->server_id);
        Inertia::share("current_server", $server->load('users'));
        Inertia::share("current_channel", Channel::where('server_id', $server->id)->first());
        Inertia::share("current_conversation", $conversation->load(['initiator', 'receiver']));
        return Inertia::render('Conversation');
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
    public function store(Request $request, $conversation_id)
    {
        //
        $request->validate([
            "file" => "mimes:jpeg,png,jpg,webp,pdf"
        ]);

        $new_msg = DirectMessage::create([
            "user_id" => Auth::id(),
            'conversation_id' => $conversation_id,
            "content" => $request->content ?? ""
        ]);

        $file =  $request->file("file");

        if ($file) {
            $file_name = $new_msg->id . "_" . $file->getClientOriginalName();
            $location = "uploads/images/conversation_" . strval($new_msg->id);
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

        broadcast(new NewDirectMessageEvent($new_msg->load(['user'])));
    }

    /**
     * Display the specified resource.
     */
    public function show($conversation_id)
    {
        //

        return DirectMessage::withTrashed()
            ->with(['user'])
            ->where('conversation_id', $conversation_id)
            ->orderBy('created_at', 'desc')->paginate(10);
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
        //

        $msg = DirectMessage::find($request->message_id);

        $msg->update([
            'content' => $request->content ?? ""
        ]);
        broadcast(new  DirectMessageUpdateEvent($msg->load(['user'])));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($direct_message_id)
    {
        //

        $msg = DirectMessage::find($direct_message_id);
        @unlink(public_path($msg->getAttributes()['file']));
        $msg->delete();
        broadcast(new DirectMessageUpdateEvent(
            DirectMessage::with(['user'])
                ->withTrashed()
                ->where("id", $direct_message_id)
                ->first()
        ));
    }

    public function initiate(Request $request)
    {
        $user_id =  $request->user_id;
        $auth_id = Auth::id();
        $conversation = Conversation::where(function ($q) use ($user_id, $auth_id) {
            $q->where("initiator_id", $auth_id)->where("receiver_id", $user_id);
        })->orWhere(function ($q) use ($user_id, $auth_id) {
            $q->where("receiver_id", $auth_id)->where("initiator_id", $user_id);
        })->first();

        if ($conversation) {
            //TODO REDIRECT TO CONVERSATION
            return redirect()->route('conversation.index', $conversation->id);
        }

        $new_conversation = Conversation::create([
            'initiator_id' => $auth_id,
            'receiver_id' => $user_id
        ]);
        //TODO REDIRECT TO CONVERSATION
        return redirect()->route('conversation.index', $new_conversation->id);
    }
}
