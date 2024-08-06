<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function messages()
    {
        return  $this->hasMany(Message::class);
    }
    public function server()
    {
        return "hello";
        return $this->belongsTo(Server::class);
    }
}
