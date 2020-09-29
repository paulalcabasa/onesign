<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApprovalApi extends Model
{
    protected $connection = "onesign_db";
    protected $table = "pending_approval_apis";
    protected $primaryKey = "id";
}
