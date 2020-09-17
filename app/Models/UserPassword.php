<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPassword extends Model
{
    protected $connection = "ipc_central";
    protected $table = "ipc_central.password_tab";
    protected $primaryKey = "id";

   
}
