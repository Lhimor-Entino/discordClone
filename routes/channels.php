<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


Broadcast::channel('global_channel', function ($user) {
    if (Auth::check()) {
        return $user;
    }
});

Broadcast::channel('channel_{channel_id}', function ($user, $channel_id) {
    if (Auth::check()) {
        return $user;
    }
});


Broadcast::channel('conversation_{conversation_id}', function ($user, $channel_id) {
    if (Auth::check()) {
        return $user;
    }
});
