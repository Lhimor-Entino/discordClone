<?php

namespace App\Http\Controllers;

use Agence104\LiveKit\AccessToken;
use Agence104\LiveKit\AccessTokenOptions;
use Agence104\LiveKit\VideoGrant;
use Illuminate\Http\Request;

class LiveKitController extends Controller
{
    //
    public function generate(Request $request, $chat_id)
    {
        $token_options = (new AccessTokenOptions())->setIdentity($request->user()->name);
        $video_grant = (new VideoGrant())
            ->setRoomJoin()
            ->setRoomName($chat_id);
        $token = (new AccessToken(env('LIVEKIT_API_KEY'), env('LIVEKIT_SECRET_KEY')))
            ->init($token_options)
            ->setGrant($video_grant)
            ->toJwt();

        return $token;
    }
}
