<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function initiator()
    {
        return  $this->belongsTo(User::class, 'initiator_id', 'id');
    }

    public function receiver()
    {
        return  $this->belongsTo(User::class, 'receiver_id', 'id');
    }
    public function direct_message()
    {
        return  $this->hasMany(DirectMessage::class);
    }
}
