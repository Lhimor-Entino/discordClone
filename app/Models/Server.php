<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Server extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $with = ['channels', 'users'];

    public function channels()
    {
        return  $this->hasMany(Channel::class);
    }



    public function getImageAttribute($value)
    {
        if ($value &&  str_contains(strtolower($value), 'http')) return $value;
        return url("/") . "/" . $value;
    }

    public function users()
    {
        return $this->belongsToMany(User::class, Member::class)->withPivot("member_role");
    }
}
