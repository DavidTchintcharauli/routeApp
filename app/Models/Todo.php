<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = ['task', 'creator_user_id', 'done'];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_user_id');
    }
}
