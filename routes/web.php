<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\LiveKitController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServerController;
use App\Models\Channel;
use App\Models\Member;
use App\Models\Server;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

Route::middleware(['auth'])->get("/dashboard", function () {
    return  redirect()->route("welcome");
})->name("dashboard");

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware(['auth'])->post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::middleware(['auth'])->get("/setup", function () {
    return Inertia::render('SetUp');
})->name('setup');

Route::middleware(['auth'])->get('/{server_id?}/{channel_id?}', function ($server_id = null, $channel_id = null) {
    if (!$server_id) {
        $member = Member::where('user_id', Auth::id())->first();
        if (!$member) return redirect()->route('setup');

        $server = Server::findOrFail($member->server_id);
        Inertia::share('current_server', $server);
        Inertia::share('current_channel', Channel::where('server_id', $server->id)->first());
    }


    if ($server_id && !$channel_id) {
        $check =  Member::where('server_id', $server_id)->where("user_id", Auth::id())->first();

        if (!$check) {
            abort(403);
        }
        $server =  Server::findOrFail($server_id);
        Inertia::share('current_server', $server);
        Inertia::share("current_channel", Channel::where("server_id", $server_id)->first());
    }

    if ($server_id && $channel_id) {

        $check =  Member::where('server_id', $server_id)->where("user_id", Auth::id())->first();
        if (!$check) {
            abort(403);
        }
        $server =  Server::findOrFail($server_id);
        Inertia::share('current_server', $server);
        Inertia::share("current_channel", Channel::findOrFail($channel_id));
    }

    return Inertia::render('Welcome');
})->name("welcome");


Route::middleware(['auth'])->get('livekit/generate/{chat_id}', [LiveKitController::class, 'generate'])->name("livekit.generate");

Route::middleware(['auth'])->prefix('servers')->name("servers.")->group(function () {

    Route::get("/{id}", [ServerController::class, 'index'])->name("index");
    Route::get("invite/{invite_code}", [ServerController::class, 'invite'])->name("invite");

    Route::post("store", [ServerController::class, 'store'])->name("store");

    Route::post("update", [ServerController::class, 'update'])->name("update");

    Route::post("destroy", [ServerController::class, 'destroy'])->name("destroy");
    Route::post("generate", [ServerController::class, 'generate'])->name("generate");

    Route::prefix('channels')->name("channels.")->group(function () {
        Route::post("store", [ChannelController::class, 'store'])->name("store");
        Route::post("update", [ChannelController::class, 'update'])->name("update");
        Route::post("destroy/{channel_id}", [ChannelController::class, 'destroy'])->name("destroy");
    });


    Route::prefix('member')->name("member.")->group(function () {
        Route::post("/role_change", [MemberController::class, 'role_change'])->name("role_change");
        Route::post("/kick", [MemberController::class, 'kick'])->name("kick");
    });

    Route::post("leave", [ServerController::class, 'leave'])->name("leave");
});
Route::middleware('auth')->prefix("message")->name("message.")->group(function () {
    Route::get("index/{channel_id}", [MessageController::class, 'index'])->name("index");
    Route::post("store/{channel_id}", [MessageController::class, 'store'])->name("store");
    Route::post("update", [MessageController::class, 'update'])->name("update");
    Route::post("destroy/{message_id}", [MessageController::class, 'destroy'])->name("destroy");
});

Route::middleware('auth')->prefix("conversation")->name("conversation.")->group(function () {
    Route::post("initiate", [ConversationController::class, 'initiate'])->name("initiate");
    Route::post("store/{conversation_id}", [ConversationController::class, 'store'])->name("store");
    Route::post("update", [ConversationController::class, 'update'])->name("update");

    Route::post("destroy{direct_message_id}", [ConversationController::class, 'destroy'])->name("destroy");
    Route::get("index/{conversation_id}", [ConversationController::class, 'index'])->name("index");
    Route::get("show/{conversation_id}", [ConversationController::class, 'show'])->name("show");
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



// require __DIR__ . '/auth.php';
