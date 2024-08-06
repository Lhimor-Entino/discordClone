<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DirectMessage extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded = [];

    public function user()
    {
        return  $this->belongsTo(User::class);
    }

    public function conversation()
    {
        return  $this->belongsTo(Conversation::class);
    }

    public function getFileAttribute($value)
    {
        if ($value &&  str_contains(strtolower($value), 'http')) return $value;
        if (!$value) return null;
        return url("/") . "/" . $value;
    }
}
